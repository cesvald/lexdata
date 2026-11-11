import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Solicitud de eliminación de datos del titular.
// No borra el registro: lo anonimiza (nombre y correo se reemplazan, la consulta se vacía) y guarda
// solo un hash SHA-256 del correo como constancia de que se hizo la solicitud.

type Env = {
  DB: {
    prepare: (sql: string) => { bind: (...args: unknown[]) => { run: () => Promise<unknown> } };
    batch: (statements: unknown[]) => Promise<unknown>;
  };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  // Honeypot anti-bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 200) : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Escribe un correo válido." }, { status: 400 });
  }

  const { env } = (await getCloudflareContext({ async: true })) as unknown as { env: Env };
  const hash = await sha256Hex(email);

  try {
    // Se responde igual exista o no el correo, para no revelar quién se registró.
    await env.DB.batch([
      env.DB.prepare("INSERT INTO solicitudes_eliminacion (email_hash) VALUES (?)").bind(hash),
      env.DB.prepare(
        "UPDATE leads SET nombre = '[ELIMINADO]', email = 'eliminado-' || id || '@invalid.local', consulta = NULL, anonimizado_en = datetime('now') WHERE lower(email) = ? AND anonimizado_en IS NULL",
      ).bind(email),
    ]);
  } catch (err) {
    console.error("D1 eliminación falló", err);
    return NextResponse.json({ error: "No pudimos procesar tu solicitud. Intenta de nuevo." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
