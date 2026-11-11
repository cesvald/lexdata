"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Send, X } from "lucide-react";
import PrivacyButton from "./PrivacyButton";
import { track } from "@/lib/analytics";
import { ACTIVIDADES, MAX_CONSULTA } from "@/lib/lead";

// Los precios se muestran en la página (app/page.tsx); aquí solo el resumen de cada nivel.
const NIVELES = [
  { value: "Base", price: "$200 / mes" },
  { value: "Estándar", price: "$400 / mes" },
  { value: "Complejo", price: "desde $800 / mes" },
  { value: "Aún no sé", price: "" },
];

export default function LeadForm() {
  const [nivel, setNivel] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  // Los botones de cada nivel de la página preseleccionan el nivel en el formulario.
  useEffect(() => {
    const onNivel = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (NIVELES.some((n) => n.value === value)) setNivel(value);
    };
    window.addEventListener("dpd:nivel", onNivel);
    return () => window.removeEventListener("dpd:nivel", onNivel);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const avisos = fd.get("avisos") === "on";
    const consulta = String(fd.get("consulta") ?? "").trim();

    if (!avisos && !consulta) {
      setError("Marca el aviso de apertura o escribe tu consulta.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: fd.get("nombre"),
          empresa: fd.get("empresa"),
          email: fd.get("email"),
          actividad: fd.get("actividad"),
          nivel: fd.get("nivel"),
          avisos,
          consulta,
          consentimiento: fd.get("consentimiento") === "on",
          website: fd.get("website"), // honeypot
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No pudimos enviar tu registro.");
      form.reset();
      // Sin datos personales: solo el nivel y qué pidió (no su contenido).
      track("generate_lead", { nivel: String(fd.get("nivel") ?? ""), aviso: avisos, consulta: consulta.length > 0 });
      setNivel("");
      setStatus("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
      setStatus("error");
    }
  }

  const input =
    "w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition";

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
      >
        {/* Honeypot anti-spam: los humanos no lo ven */}
        <div className="hidden" aria-hidden="true">
          <label>
            Sitio web
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div>
          <label htmlFor="nombre" className="block text-sm font-bold text-slate-200 mb-2">
            Nombre completo *
          </label>
          <input id="nombre" name="nombre" required maxLength={100} placeholder="Tu nombre y apellido" className={input} />
        </div>

        <div>
          <label htmlFor="empresa" className="block text-sm font-bold text-slate-200 mb-2">
            Empresa u organización *
          </label>
          <input id="empresa" name="empresa" required maxLength={150} placeholder="Nombre comercial o razón social" className={input} />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-200 mb-2">
            Correo electrónico *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            placeholder="tu@empresa.ec"
            className={input}
          />
        </div>

        <div>
          <label htmlFor="actividad" className="block text-sm font-bold text-slate-200 mb-2">
            ¿A qué se dedica tu organización? *
          </label>
          <select id="actividad" name="actividad" required defaultValue="" className={input}>
            <option value="" disabled>
              Elige la opción más cercana
            </option>
            {ACTIVIDADES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500 mt-2">
            Solo para saber si tu actividad está entre las que la SPDP obliga a designar DPD. No es un diagnóstico.
          </p>
        </div>

        <fieldset>
          <legend className="block text-sm font-bold text-slate-200 mb-2">¿Qué nivel se parece más a tu caso? *</legend>
          <div className="space-y-3">
            {NIVELES.map((n, i) => (
              <label
                key={n.value}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="nivel"
                    value={n.value}
                    required={i === 0}
                    checked={nivel === n.value}
                    onChange={() => setNivel(n.value)}
                    className="w-4 h-4 accent-cyan-500"
                  />
                  <span className="text-sm font-medium text-slate-200">{n.value}</span>
                </div>
                {n.price && (
                  <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950 border border-cyan-800 px-2.5 py-1 rounded-md">
                    {n.price}
                  </span>
                )}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="space-y-4 border-t border-slate-800 pt-6">
          <p className="text-sm font-bold text-slate-200">¿Qué quieres de nosotros? (elige al menos una)</p>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" name="avisos" className="mt-1 w-4 h-4 accent-cyan-500 shrink-0" />
            <span className="text-sm text-slate-300 leading-normal">
              Quiero que me avisen cuando abran el servicio.
            </span>
          </label>

          <div>
            <label htmlFor="consulta" className="block text-sm text-slate-300 mb-2">
              Tengo una consulta o quiero más información:
            </label>
            <textarea
              id="consulta"
              name="consulta"
              rows={4}
              maxLength={MAX_CONSULTA}
              placeholder="Cuéntanos qué quieres saber. No incluyas datos personales de terceros ni información sensible."
              className={input}
            />
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer pt-2">
          <input type="checkbox" name="consentimiento" required className="mt-1 w-4 h-4 accent-cyan-500 shrink-0" />
          <span className="text-xs text-slate-400 leading-normal">
            He leído la{" "}
            <PrivacyButton className="text-cyan-400 underline font-semibold hover:text-cyan-300">
              Política de Privacidad
            </PrivacyButton>{" "}
            y acepto que DataPrivo trate mis datos para responder mi consulta y, si lo marqué arriba, enviarme el
            aviso de apertura. *
          </span>
        </label>

        {status === "error" && (
          <p role="alert" className="text-sm text-rose-300 bg-rose-950/50 border border-rose-800 rounded-xl p-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full py-4 bg-sky-600 hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl shadow-lg shadow-sky-600/20 transition duration-200 flex items-center justify-center gap-2"
        >
          {status === "sending" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          <span>{status === "sending" ? "Enviando..." : "Enviar"}</span>
        </button>
        <p className="text-xs text-slate-500 text-center">Te escribiremos a la brevedad al correo que dejaste.</p>
      </form>

      {status === "ok" && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setStatus("idle")}
              aria-label="Cerrar"
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-white text-center mb-3">
              ¡Gracias! Recibimos tu registro.
            </h3>
            <p className="text-sm text-slate-300 text-center leading-relaxed">
              Te escribiremos a la brevedad al correo que dejaste. Si pediste el aviso de apertura, te avisaremos
              cuando abramos el servicio.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="w-full mt-6 py-2.5 border border-slate-700 text-slate-300 font-semibold text-sm rounded-xl hover:bg-slate-800 transition"
            >
              Cerrar ventana
            </button>
          </div>
        </div>
      )}
    </>
  );
}
