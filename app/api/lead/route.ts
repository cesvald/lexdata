import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { parseLead, type Lead } from "@/lib/lead";

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

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Qué pidió la persona, en una frase corta para el asunto y el cuerpo del aviso.
function pedido(lead: Lead) {
  const partes = [];
  if (lead.avisos) partes.push("aviso de apertura");
  if (lead.consulta) partes.push("consulta");
  return partes.join(" + ");
}

async function notifyByEmail(env: Env, lead: Lead, fecha: string) {
  if (!env.RESEND_API_KEY || !env.LEAD_TO_EMAIL || !env.LEAD_FROM_EMAIL) return;
  const { nombre, empresa, email, actividad, nivel, consulta } = lead;
  const queQuiere = pedido(lead);
  const html = `
    <h2>Nuevo registro de interés</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td><b>Nombre</b></td><td>${esc(nombre)}</td></tr>
      <tr><td><b>Empresa</b></td><td>${esc(empresa)}</td></tr>
      <tr><td><b>Correo</b></td><td>${esc(email)}</td></tr>
      <tr><td><b>Actividad</b></td><td>${esc(actividad)}</td></tr>
      <tr><td><b>Nivel de interés</b></td><td>${esc(nivel)}</td></tr>
      <tr><td><b>Pidió</b></td><td>${esc(queQuiere)}</td></tr>
      <tr><td><b>Consulta</b></td><td>${esc(consulta || "(sin consulta)").replace(/\n/g, "<br>")}</td></tr>
      <tr><td><b>Fecha (Ecuador)</b></td><td>${esc(fecha)}</td></tr>
    </table>`;
  const text = `Nuevo registro\nNombre: ${nombre}\nEmpresa: ${empresa}\nCorreo: ${email}\nActividad: ${actividad}\nNivel: ${nivel}\nPidió: ${queQuiere}\nConsulta: ${consulta || "(sin consulta)"}\nFecha: ${fecha}`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.LEAD_FROM_EMAIL,
        to: [env.LEAD_TO_EMAIL],
        reply_to: email,
        subject: `Nuevo lead DataPrivo: ${empresa} - ${nombre} (${queQuiere})`.replace(/[\r\n]+/g, " "),
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

  const parsed = parseLead(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const { lead } = parsed;

  const { env } = (await getCloudflareContext({ async: true })) as unknown as { env: Env };

  try {
    // `tamano` sigue siendo NOT NULL en la tabla original; ya no se pregunta y se guarda vacío.
    // `interes` guarda el nivel de servicio que le interesa.
    await env.DB.prepare(
      "INSERT INTO leads (nombre, empresa, email, tamano, interes, actividad, consulta, acepta_avisos, consentimiento) VALUES (?, ?, ?, '', ?, ?, ?, ?, 1)",
    )
      .bind(lead.nombre, lead.empresa, lead.email, lead.nivel, lead.actividad, lead.consulta, lead.avisos ? 1 : 0)
      .run();
  } catch (err) {
    console.error("D1 insert failed", err);
    return NextResponse.json({ error: "No pudimos guardar tu registro. Intenta de nuevo." }, { status: 500 });
  }

  const fecha = new Date().toLocaleString("es-EC", { timeZone: "America/Guayaquil" });
  await notifyByEmail(env, lead, fecha);

  return NextResponse.json({ ok: true });
}
