"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Lock, MessageCircle, X } from "lucide-react";
import PrivacyButton from "./PrivacyButton";
import { track } from "@/lib/analytics";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

const SIZES = ["1-10", "11-50", "50+"];
const PLANS = [
  { value: "Autogestión guiada", price: "$20 / mes", key: "auto" },
  { value: "Revisión de documentos por DPO", price: "$300 único + $20 / mes", key: "revision" },
  { value: "DPO como servicio", price: "$500 / mes + $20 / mes", key: "dpo" },
  { value: "Evaluación gratuita", price: "Gratis", key: "free" },
  { value: "Aún no sé", price: "", key: "unknown" },
];

export default function LeadForm() {
  const [plan, setPlan] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onPlan = (e: Event) => {
      const key = (e as CustomEvent<string>).detail;
      const p = PLANS.find((x) => x.key === key);
      if (p) setPlan(p.value);
    };
    window.addEventListener("lopdp:plan", onPlan);
    return () => window.removeEventListener("lopdp:plan", onPlan);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
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
          tamano: fd.get("tamano"),
          interes: fd.get("interes"),
          consentimiento: fd.get("consentimiento") === "on",
          website: fd.get("website"), // honeypot
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No pudimos enviar tu registro.");
      form.reset();
      track("generate_lead", { interes: String(fd.get("interes") ?? "") });
      setPlan("");
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
            Empresa o negocio *
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

        <fieldset>
          <legend className="block text-sm font-bold text-slate-200 mb-2">Tamaño de empresa *</legend>
          <div className="grid grid-cols-3 gap-3">
            {SIZES.map((s, i) => (
              <label key={s} className="cursor-pointer">
                <input type="radio" name="tamano" value={s} required={i === 0} className="peer sr-only" />
                <div className="p-3 text-center rounded-xl border border-slate-800 bg-slate-950 peer-checked:border-cyan-500 peer-checked:bg-cyan-950 peer-checked:text-cyan-300 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-500 font-semibold text-sm transition hover:bg-slate-800">
                  {s}
                </div>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="block text-sm font-bold text-slate-200 mb-2">¿Qué plan te interesa más? *</legend>
          <div className="space-y-3">
            {PLANS.map((p, i) => (
              <label
                key={p.key}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="interes"
                    value={p.value}
                    required={i === 0}
                    checked={plan === p.value}
                    onChange={() => setPlan(p.value)}
                    className="w-4 h-4 accent-cyan-500"
                  />
                  <span className="text-sm font-medium text-slate-200">{p.value}</span>
                </div>
                {p.price && (
                  <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950 border border-cyan-800 px-2.5 py-1 rounded-md">
                    {p.price}
                  </span>
                )}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex items-start gap-3 cursor-pointer pt-2">
          <input type="checkbox" name="consentimiento" required className="mt-1 w-4 h-4 accent-cyan-500 shrink-0" />
          <span className="text-xs text-slate-400 leading-normal">
            Acepto el tratamiento de mis datos según la{" "}
            <PrivacyButton className="text-cyan-400 underline font-semibold hover:text-cyan-300">
              Política de Privacidad
            </PrivacyButton>{" "}
            para recibir información sobre este servicio.
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
          {status === "sending" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
          <span>{status === "sending" ? "Enviando..." : "Reservar mi lugar"}</span>
        </button>
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
              ¡Gracias! Te escribiremos cuando abramos los primeros accesos.
            </h3>

            {WHATSAPP_NUMBER && (
              <div className="bg-slate-950 border border-cyan-800 rounded-xl p-5 my-6 text-left">
                <p className="text-sm text-cyan-200 leading-relaxed mb-4">
                  Si quieres ayudarnos a validar la idea, ¿podemos hacerte 3 preguntas por WhatsApp o
                  videollamada (10 minutos)?
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hola, registré mi empresa en DataPrivo y puedo ayudarles con las 3 preguntas.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Sí, agendar</span>
                </a>
              </div>
            )}

            <button
              onClick={() => setStatus("idle")}
              className="w-full mt-4 py-2.5 border border-slate-700 text-slate-300 font-semibold text-sm rounded-xl hover:bg-slate-800 transition"
            >
              Cerrar ventana
            </button>
          </div>
        </div>
      )}
    </>
  );
}
