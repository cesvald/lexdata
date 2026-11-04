import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Bindings y variables (ver wrangler.jsonc):
//   DB               (D1)       -> base donde se guardan los leads (obligatorio)
//   RESEND_API_KEY   (secreto)  -> opcional: si existe, envía un aviso por correo
//   LEAD_TO_EMAIL    (variable) -> destino del aviso
//   LEAD_FROM_EMAIL  (variable) -> remitente verificado en Resend

type Env = {
  DB: {
    prepare: (sql: string) => { bind: (...args: unknown[]) => { run: () => Promise<unknown> } };
  };
  RESEND_API_KEY?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
};

const SIZES = ["1-10", "11-50", "50+"];
const PLANS = ["Autogestión guiada", "Revisión de documentos por DPO", "DPO como servicio", "Aún no sé"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

async function notifyByEmail(env: Env, lead: { nombre: string; email: string; tamano: string; interes: string; fecha: string }) {
  if (!env.RESEND_API_KEY || !env.LEAD_TO_EMAIL || !env.LEAD_FROM_EMAIL) return;
  const { nombre, email, tamano, interes, fecha } = lead;
  const html = `
    <h2>Nuevo registro de acceso anticipado</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td><b>Nombre</b></td><td>${esc(nombre)}</td></tr>
      <tr><td><b>Correo</b></td><td>${esc(email)}</td></tr>
      <tr><td><b>Tamaño</b></td><td>${esc(tamano)}</td></tr>
      <tr><td><b>Plan de interés</b></td><td>${esc(interes)}</td></tr>
      <tr><td><b>Fecha (Ecuador)</b></td><td>${esc(fecha)}</td></tr>
    </table>`;
  const text = `Nuevo registro\nNombre: ${nombre}\nCorreo: ${email}\nTamaño: ${tamano}\nPlan: ${interes}\nFecha: ${fecha}`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.LEAD_FROM_EMAIL,
        to: [env.LEAD_TO_EMAIL],
        reply_to: email,
        subject: `Nuevo lead DataPrivo: ${nombre} (${interes})`,
        html,
        text,
      }),
    });
    if (!res.ok) console.error("Resend error", res.status, await res.text());
  } catch (err) {
    console.error("Resend fetch failed", err);
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot: si un bot llena este campo, fingimos éxito y no guardamos nada.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const nombre = typeof body.nombre === "string" ? oneLine(body.nombre).slice(0, 100) : "";
  const email = typeof body.email === "string" ? oneLine(body.email).slice(0, 200) : "";
  const tamano = typeof body.tamano === "string" ? body.tamano : "";
  const interes = typeof body.interes === "string" ? body.interes : "";
  const consentimiento = body.consentimiento === true;

  if (!nombre || !EMAIL_RE.test(email) || !SIZES.includes(tamano) || !PLANS.includes(interes)) {
    return NextResponse.json({ error: "Revisa los datos del formulario." }, { status: 400 });
  }
  if (!consentimiento) {
    return NextResponse.json({ error: "Debes aceptar la Política de Privacidad." }, { status: 400 });
  }

  const { env } = (await getCloudflareContext({ async: true })) as unknown as { env: Env };

  try {
    await env.DB.prepare(
      "INSERT INTO leads (nombre, email, tamano, interes, consentimiento) VALUES (?, ?, ?, ?, 1)",
    )
      .bind(nombre, email, tamano, interes)
      .run();
  } catch (err) {
    console.error("D1 insert failed", err);
    return NextResponse.json({ error: "No pudimos guardar tu registro. Intenta de nuevo." }, { status: 500 });
  }

  const fecha = new Date().toLocaleString("es-EC", { timeZone: "America/Guayaquil" });
  await notifyByEmail(env, { nombre, email, tamano, interes, fecha });

  return NextResponse.json({ ok: true });
}
