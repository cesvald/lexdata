"use client";

import { useEffect, useState } from "react";
import PrivacyButton from "./PrivacyButton";

// Google Tag Manager (y Google Analytics dentro de él) solo se carga si la persona acepta.
// La decisión se guarda en el navegador para no volver a preguntar.
const GTM_ID = "GTM-N4XDVR36";
const KEY = "dp_cookies";
// El modal aparece al bajar la mitad de la página o tras este tiempo (ms) en la web.
const TIEMPO_MOSTRAR_MS = 45000;
const PROFUNDIDAD_MOSTRAR = 0.5;

function cargarGtm() {
  if (document.getElementById("gtm-script")) return;
  const w = window as unknown as { dataLayer: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const s = document.createElement("script");
  s.id = "gtm-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

export default function CookieConsent() {
  const [estado, setEstado] = useState<"cargando" | "pendiente" | "aceptado" | "rechazado">("cargando");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let guardado: string | null = null;
    try {
      guardado = localStorage.getItem(KEY);
    } catch {
      // Si el navegador bloquea el almacenamiento, se vuelve a preguntar en cada visita.
    }
    if (guardado === "aceptado") {
      cargarGtm();
      setEstado("aceptado");
    } else if (guardado === "rechazado") {
      setEstado("rechazado");
    } else {
      setEstado("pendiente");
    }
  }, []);

  // Mostrar el modal tras scroll considerable o tiempo en la página, solo si aún no decidió.
  useEffect(() => {
    if (estado !== "pendiente") return;
    const mostrar = () => setVisible(true);
    const timer = window.setTimeout(mostrar, TIEMPO_MOSTRAR_MS);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= PROFUNDIDAD_MOSTRAR) mostrar();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [estado]);

  // Mientras el modal está abierto, la página no se desplaza detrás.
  useEffect(() => {
    if (!visible || estado !== "pendiente") return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previo;
    };
  }, [visible, estado]);

  function decidir(valor: "aceptado" | "rechazado") {
    try {
      localStorage.setItem(KEY, valor);
    } catch {
      // Sin almacenamiento, la decisión dura solo esta visita.
    }
    if (valor === "aceptado") cargarGtm();
    setVisible(false);
    setEstado(valor);
  }

  if (estado !== "pendiente" || !visible) return null;

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookies-titulo"
        className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl"
      >
        <h2 id="cookies-titulo" className="text-2xl font-extrabold text-white mb-4">
          Antes de continuar: tu decisión sobre cookies
        </h2>
        <p className="text-base text-slate-300 leading-relaxed mb-4">
          Usamos cookies de medición (Google Tag Manager y Google Analytics) para entender cómo se usa esta web. Solo se
          activan si aceptas.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          También medimos visitas con Cloudflare Web Analytics, que no usa cookies. Más detalles en la{" "}
          <PrivacyButton className="text-cyan-400 underline font-semibold hover:text-cyan-300">
            Política de Privacidad
          </PrivacyButton>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => decidir("rechazado")}
            className="flex-1 py-3 bg-slate-800 border border-slate-600 hover:bg-slate-700 text-white font-bold text-base rounded-xl transition"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => decidir("aceptado")}
            className="flex-1 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-base rounded-xl transition"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
