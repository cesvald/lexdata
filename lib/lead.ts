// Datos y validación del formulario de interés. Sin dependencias de servidor:
// lo usan el formulario (cliente), la página y la API.

// Actividades del art. 10 de la Res. SPDP-SPD-2025-0028-R (designación obligatoria de DPD),
// agrupadas para que la persona se ubique sin leer la norma. No es un diagnóstico legal.
export const ACTIVIDADES = [
  "Educación inicial, básica o bachillerato, o datos de menores de edad",
  "Educación superior",
  "Actividades financieras",
  "Seguros, reaseguros o intermediarios",
  "Publicidad, prospección comercial o investigación de mercados con perfiles",
  "Salud (historias clínicas)",
  "Sector farmacéutico",
  "Seguridad privada o administración de conjuntos residenciales",
  "Federación, club o academia deportiva",
  "Colegio o gremio de profesionales",
  "Telecomunicaciones",
  "Videovigilancia, geolocalización, tecnologías de la información o inteligencia artificial",
  "Concesionaria de servicios públicos",
  "Otra actividad",
  "No estoy seguro",
] as const;

export const NIVELES = ["Base", "Estándar", "Complejo", "Aún no sé"] as const;

export const MAX_CONSULTA = 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export type Lead = {
  nombre: string;
  empresa: string;
  email: string;
  actividad: string;
  nivel: string;
  consulta: string;
  avisos: boolean;
};

export type LeadResult = { ok: true; lead: Lead } | { ok: false; error: string };

export function parseLead(body: Record<string, unknown>): LeadResult {
  const str = (v: unknown) => (typeof v === "string" ? v : "");

  const nombre = oneLine(str(body.nombre)).slice(0, 100);
  const empresa = oneLine(str(body.empresa)).slice(0, 150);
  const email = oneLine(str(body.email)).slice(0, 200);
  const actividad = str(body.actividad);
  const nivel = str(body.nivel);
  // La consulta conserva los saltos de línea; se limpian caracteres de control y se acota.
  const consulta = str(body.consulta)
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, MAX_CONSULTA);
  const avisos = body.avisos === true;

  if (
    !nombre ||
    !empresa ||
    !EMAIL_RE.test(email) ||
    !(ACTIVIDADES as readonly string[]).includes(actividad) ||
    !(NIVELES as readonly string[]).includes(nivel)
  ) {
    return { ok: false, error: "Revisa los datos del formulario." };
  }
  if (body.consentimiento !== true) {
    return { ok: false, error: "Debes aceptar la Política de Privacidad." };
  }
  if (!avisos && !consulta) {
    return { ok: false, error: "Marca el aviso de apertura o escribe tu consulta." };
  }

  return { ok: true, lead: { nombre, empresa, email, actividad, nivel, consulta, avisos } };
}
