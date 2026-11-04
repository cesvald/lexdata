import { NextResponse } from "next/server";

// Variables (configuradas en wrangler.jsonc o como secretos de Cloudflare):
//   RESEND_API_KEY   (secreto)  -> API key de Resend
//   LEAD_TO_EMAIL    (variable) -> correo donde recibes los registros
//   LEAD_FROM_EMAIL  (variable) -> remitente verificado en Resend

const SIZES = ["1-10", "11-50", "50+"];
const PLANS = ["Autogestión guiada", "Consultoría y aprobación por DPO", "Aún no sé"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot: si un bot llena este campo, fingimos éxito y no enviamos nada.
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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Faltan variables: RESEND_API_KEY / LEAD_TO_EMAIL / LEAD_FROM_EMAIL");
    return NextResponse.json({ error: "El servicio de correo no está configurado." }, { status: 500 });
  }

  const fecha = new Date().toLocaleString("es-EC", { timeZone: "America/Guayaquil" });
  const html = `
    <h2>Nuevo registro de acceso anticipado</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td><b>Nombre</b></td><td>${esc(nombre)}</td></tr>
      <tr><td><b>Correo</b></td><td>${esc(email)}</td></tr>
      <tr><td><b>Tamaño</b></td><td>${esc(tamano)}</td></tr>
      <tr><td><b>Plan de interés</b></td><td>${esc(interes)}</td></tr>
      <tr><td><b>Consentimiento</b></td><td>Aceptó la Política de Privacidad</td></tr>
      <tr><td><b>Fecha (Ecuador)</b></td><td>${esc(fecha)}</td></tr>
    </table>`;
  const text = `Nuevo registro\nNombre: ${nombre}\nCorreo: ${email}\nTamaño: ${tamano}\nPlan: ${interes}\nFecha: ${fecha}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Nuevo lead DataPrivo: ${nombre} (${interes})`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return NextResponse.json({ error: "No pudimos enviar tu registro. Intenta de nuevo." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
