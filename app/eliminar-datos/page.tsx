"use client";

import { useState } from "react";
import Link from "next/link";

export default function EliminarDatosPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/eliminar-datos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fd.get("email"), website: fd.get("website") }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No pudimos procesar tu solicitud.");
      form.reset();
      setStatus("ok");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
      setStatus("error");
    }
  }

  const input =
    "w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none";

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 px-4 py-16">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-sm text-cyan-400 underline">
          ← Volver al inicio
        </Link>

        <h1 className="text-3xl font-extrabold text-white mt-6 mb-3">Eliminar mis datos</h1>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Escribe el correo con el que te registraste. Reemplazaremos tu nombre y tu correo por datos
          anónimos. Guardamos únicamente una huella criptográfica de tu correo, que no permite recuperarlo,
          como constancia de que hiciste esta solicitud.
        </p>

        {status === "ok" ? (
          <div role="status" className="bg-emerald-950/50 border border-emerald-800 rounded-xl p-5 text-sm text-emerald-200">
            Recibimos tu solicitud. Si tu correo estaba registrado, tus datos ya fueron anonimizados.
            Si tienes dudas, escribe a{" "}
            <a className="underline" href="mailto:contacto@dataprivo.com">
              contacto@dataprivo.com
            </a>
            .
          </div>
        ) : (
          <form onSubmit={onSubmit} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5">
            {/* Honeypot anti-bots */}
            <div className="hidden" aria-hidden="true">
              <label>
                Sitio web
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-200 mb-2">
                Correo electrónico registrado *
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

            {status === "error" && (
              <p role="alert" className="text-sm text-rose-300 bg-rose-950/50 border border-rose-800 rounded-xl p-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3 bg-sky-600 hover:bg-sky-500 disabled:opacity-60 text-white font-bold rounded-xl transition"
            >
              {status === "sending" ? "Procesando..." : "Solicitar eliminación"}
            </button>
          </form>
        )}

        <p className="text-xs text-slate-500 mt-6">
          Responsable: DataPrivo Ecuador. Consultas: contacto@dataprivo.com.
        </p>
      </div>
    </main>
  );
}
