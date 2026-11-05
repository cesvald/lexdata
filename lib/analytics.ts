// Eventos de analítica para Google Tag Manager (dataLayer).
// No envía datos personales: solo nombres de evento y parámetros genéricos
// (plan elegido, número de pregunta, respuesta sí/no).
// GTM solo se carga si el visitante acepta cookies (ver CookieConsent).

export type EventParams = Record<string, string | number | boolean>;

export function track(event: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, ...params });
  } catch {
    // El analítica nunca debe romper la página.
  }
}
