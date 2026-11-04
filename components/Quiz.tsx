"use client";

import { useState } from "react";
import { ArrowDown, CheckCircle, ChevronRight, ShieldAlert } from "lucide-react";

const QUESTIONS = [
  {
    q: "¿Tu empresa realiza tratamiento masivo o sistemático de datos personales?",
    yes: "Sí (Ej. miles de clientes, apps con analítica continua)",
    no: "No (Operaciones de pequeño alcance local)",
  },
  {
    q: "¿Procesas datos sensibles? (Salud, datos biométricos, financieros o de niños/adolescentes)",
    yes: "Sí, tratamos categorías especiales de datos",
    no: "No, solo datos de contacto básicos y facturación",
  },
  {
    q: "¿Perteneces al sector público o prestas servicios públicos delegados?",
    yes: "Sí",
    no: "No, somos una empresa totalmente privada",
  },
  {
    q: "¿Tu actividad implica un monitoreo permanente de personas? (videovigilancia, geolocalización, seguimiento de comportamiento)",
    yes: "Sí",
    no: "No",
  },
  {
    q: "¿Elaboras perfiles de usuario avanzados o evaluaciones automatizadas?",
    yes: "Sí",
    no: "No",
  },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const done = step >= QUESTIONS.length;
  const needsDPO = answers.some(Boolean);

  function answer(v: boolean) {
    setAnswers((a) => [...a, v]);
    setStep((s) => s + 1);
  }

  function goToForm() {
    window.dispatchEvent(
      new CustomEvent("lopdp:plan", { detail: needsDPO ? "dpo" : "auto" }),
    );
  }

  const progress = done ? 100 : ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
      <div className="w-full bg-slate-800 rounded-full h-2 mb-6">
        <div
          className="bg-sky-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!done ? (
        <div>
          <span className="text-xs font-mono font-semibold text-cyan-400">
            Pregunta {step + 1} de {QUESTIONS.length}
          </span>
          <h3 className="text-lg font-bold text-white mt-1 mb-4">{QUESTIONS[step].q}</h3>
          <div className="space-y-3">
            {[
              { v: true, label: QUESTIONS[step].yes },
              { v: false, label: QUESTIONS[step].no },
            ].map((o) => (
              <button
                key={String(o.v)}
                onClick={() => answer(o.v)}
                className="w-full text-left p-4 rounded-xl border border-slate-800 bg-slate-900 hover:border-cyan-500 hover:bg-slate-800 transition font-medium text-slate-200 flex justify-between items-center group"
              >
                <span>{o.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div
            className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 border shadow-lg ${
              needsDPO
                ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
            }`}
          >
            {needsDPO ? <ShieldAlert className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {needsDPO
              ? "Probablemente SÍ debas nombrar un DPO"
              : "Tu pyme aplica para la Autogestión Guiada"}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-2">
            {needsDPO
              ? "Según tus respuestas, tu actividad podría requerir un Delegado de Protección de Datos (DPO). Súmate a la lista de espera de nuestro plan con DPO."
              : "No pareces requerir obligatoriamente un DPO designado, pero sí debes generar tus políticas y registro de tratamientos. Nuestra herramienta de Autogestión es ideal para ti."}
          </p>
          <p className="text-slate-500 text-xs mb-6">
            Resultado orientativo; no constituye asesoría legal.
          </p>
          <a
            href="#registro"
            onClick={goToForm}
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold px-6 py-3 rounded-xl transition"
          >
            <span>Siguiente: Registrarme para mi solución</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
}
