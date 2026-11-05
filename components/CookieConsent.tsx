"use client";

import { useEffect, useState } from "react";
import PrivacyButton from "./PrivacyButton";

// Google Tag Manager (y Google Analytics dentro de él) solo se carga si la persona acepta.
// La decisión se guarda en el navegador para no volver a preguntar.
const GTM_ID = "GTM-TH4GXLSP";
const KEY = "dp_cookies";

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

  function decidir(valor: "aceptado" | "rechazado") {
    try {
      localStorage.setItem(KEY, valor);
    } catch {
      // Sin almacenamiento, la decisión dura solo esta visita.
    }
    if (valor === "aceptado") cargarGtm();
    setEstado(valor);
  }

  if (estado !== "pendiente") return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-50 bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl"
    >
      <p className="text-sm text-slate-200 leading-relaxed mb-4">
        Usamos cookies de medición (Google Tag Manager y Google Analytics) para entender cómo se usa la web. Solo se
        activan si aceptas. Más detalles en la{" "}
        <PrivacyButton className="text-cyan-400 underline font-semibold">Política de Privacidad</PrivacyButton>.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => decidir("rechazado")}
          className="flex-1 py-2.5 border border-slate-700 text-slate-300 font-semibold text-sm rounded-xl hover:bg-slate-800 transition"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => decidir("aceptado")}
          className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm rounded-xl transition"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
