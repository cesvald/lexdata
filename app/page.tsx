import TrackedLink from "@/components/TrackedLink";
import {
  ArrowRight,
  Ban,
  CalendarClock,
  CheckCircle,
  ClipboardCheck,
  FileText,
  Info,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import LeadForm from "@/components/LeadForm";
import PrivacyButton from "@/components/PrivacyButton";
import NivelCta from "@/components/NivelCta";
import { ACTIVIDADES } from "@/lib/lead";

// Niveles por complejidad del tratamiento, no por número de empleados.
// Precios de referencia del piloto, en USD; se confirman en la propuesta según el caso.
const NIVELES = [
  {
    nivel: "Base" as const,
    para: "Tratamiento simple y pocas bases de datos.",
    horas: "5 horas al mes",
    precio: "$200",
    desde: "",
    arranque: "Arranque único: $600",
    borde: "border-slate-800 hover:border-cyan-500/40",
  },
  {
    nivel: "Estándar" as const,
    para: "Datos sensibles o varios sistemas.",
    horas: "10 horas al mes",
    precio: "$400",
    desde: "",
    arranque: "Arranque único: $1.000",
    borde: "border-slate-800 hover:border-sky-500/40",
  },
  {
    nivel: "Complejo" as const,
    para: "Salud, finanzas, transferencias internacionales o gran volumen de datos.",
    horas: "20 horas al mes o más",
    precio: "$800",
    desde: "desde ",
    arranque: "Arranque: se cotiza según el caso",
    borde: "border-slate-800 hover:border-emerald-500/40",
  },
];

const ARRANQUE = [
  "Verificación de requisitos del DPD y declaración previa de conflictos de interés.",
  "Contrato de servicios y modelo de nombramiento para firma electrónica.",
  "Acompañamiento hasta la inscripción del nombramiento en el portal de la SPDP (la inscribe tu organización).",
  "Primer informe de nivel de cumplimiento a los 30 días.",
  "Lista de observaciones priorizada, con responsable y fecha de tu lado.",
];

const MENSUAL = [
  "Calendario de plazos con alertas: solicitudes de titulares, brechas y vencimientos.",
  "Supervisión de que tu equipo atienda a tiempo las solicitudes de los titulares.",
  "Consultas respondidas por escrito, en máximo 2 días hábiles, dentro de las horas incluidas.",
  "Bitácora de recomendaciones y de las respuestas de tu organización.",
  "Seguimiento de cambios normativos que te afecten.",
  "Informe de nivel de cumplimiento: resumido cada trimestre y completo cada año.",
];

export default function Home() {
  return (
    <>
      {/* HUD background */}
      <div className="absolute top-0 right-0 pointer-events-none z-0 opacity-40 md:opacity-65 overflow-hidden w-[350px] sm:w-[550px] h-[550px]">
        <svg className="w-full h-full text-cyan-400" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="450" cy="50" r="380" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1.5" strokeDasharray="8 8" />
          <circle cx="450" cy="50" r="320" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
          <circle cx="450" cy="50" r="260" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" className="hud-dash-line" />
          <circle cx="450" cy="50" r="190" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
          <circle cx="450" cy="50" r="120" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
          <path d="M 260 50 A 190 190 0 0 1 450 240" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.7" />
          <path d="M 130 50 A 320 320 0 0 1 450 370" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" strokeDasharray="20 10" />
          <path d="M 450 240 L 300 390 L 150 390" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
          <circle cx="300" cy="390" r="4" fill="#06b6d4" />
          <circle cx="150" cy="390" r="4" fill="#38bdf8" />
          <path d="M 450 320 L 380 390 L 380 470" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
          <circle cx="380" cy="390" r="3" fill="#06b6d4" />
          <circle cx="380" cy="470" r="5" fill="#10b981" />
          <circle cx="450" cy="50" r="8" fill="#06b6d4" fillOpacity="0.6" />
          <line x1="450" y1="20" x2="450" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="420" y1="50" x2="480" y2="50" stroke="#38bdf8" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/85 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-lg shadow-sky-600/20 border border-sky-400/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Data<span className="text-cyan-400">Privo</span>
              </span>
              <span className="block text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
                Delegado de Protección de Datos
              </span>
            </div>
          </div>
          <a
            href="#registro"
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-sky-600/20 transition duration-200"
          >
            <Sparkles className="w-4 h-4 text-sky-100" />
            <span>Dejar mis datos</span>
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 bg-tech-pattern z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-800/90 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner">
                <span className="text-base">🇪🇨</span>
                <span>Próximamente: abrimos cupos del piloto</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Delegado de Protección de Datos externo{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                  con resultados que puedes demostrar.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                Para organizaciones obligadas por la LOPDP de Ecuador a designar un DPD. Te acompañamos desde la
                designación hasta la inscripción, te entregamos tu primer informe de cumplimiento y vigilamos tus
                plazos cada mes.
              </p>
              <div className="flex items-center justify-center mb-4">
                <TrackedLink
                  href="#registro"
                  event="clic_cta_hero"
                  className="w-full sm:w-auto px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-sky-600/20 transition duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                >
                  <span>Quiero el aviso de apertura o consultar</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </TrackedLink>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium flex items-center justify-center gap-2 mb-10">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Sin costo. Sin compromiso. Te escribimos a la brevedad.
              </p>
            </div>

            <div className="mt-8 max-w-4xl mx-auto bg-slate-950/80 rounded-2xl border border-cyan-500/40 p-6 sm:p-8 glow-cyan-lg backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <span className="text-sm font-bold text-white">Lo que puedes verificar</span>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  <span>Resultados, no promesas</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                {[
                  { n: "15 días hábiles", c: "text-cyan-400", t: "DPD designado y acompañado hasta su inscripción", d: "Nombramiento firmado y acompañamiento para que tu organización lo inscriba en la SPDP dentro del término." },
                  { n: "30 días", c: "text-sky-400", t: "Primer informe de nivel de cumplimiento", d: "Con una lista de observaciones priorizada, con responsable y fecha." },
                  { n: "Cada mes", c: "text-emerald-400", t: "Plazos vigilados y consultas respondidas", d: "Calendario con alertas y respuesta escrita a tus consultas en máximo 2 días hábiles." },
                ].map((m) => (
                  <div key={m.n} className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                    <div className={`text-xs font-mono mb-1 ${m.c}`}>{m.n}</div>
                    <h4 className="text-sm font-bold text-white mb-2">{m.t}</h4>
                    <p className="text-xs text-slate-400">{m.d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-start gap-2 text-left">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <strong>Nota:</strong> El DPD supervisa y asesora. No constituye asesoría legal ni promete que no
                  habrá sanciones: la responsabilidad de cumplir sigue siendo de tu organización.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Quién está obligado */}
        <section id="obligacion" className="py-16 lg:py-24 bg-slate-950 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950 border border-cyan-800/80 uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                🏛️ Contexto regulatorio en Ecuador
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4">
                La obligación depende de tu actividad, no de tu tamaño.
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                Ni la ley ni sus reglamentos fijan un mínimo de empleados o de ingresos. Si tu organización se dedica
                de forma habitual a alguna de estas actividades, debe designar un DPD (Res. SPDP-SPD-2025-0028-R,
                art. 10):
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto mb-10">
              {ACTIVIDADES.slice(0, 13).map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-2 bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-sm text-slate-300"
                >
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>

            <p className="max-w-4xl mx-auto text-center text-sm text-slate-400 mb-10">
              También deben designarlo el sector público, quienes realizan un control permanente y sistematizado de
              personas por su volumen, naturaleza, alcance o finalidad, y quienes tratan a gran escala datos de
              categorías especiales. Varios numerales de la lista hablan de personas jurídicas. Si no estás seguro,
              déjanos tu consulta.
            </p>

            <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 text-white p-6 sm:p-8 border border-cyan-500/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <CalendarClock className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex px-3 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold mb-3">
                    Plazo de inscripción
                  </div>
                  <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed">
                    El nombramiento del DPD se inscribe en la SPDP dentro de 15 días término desde la designación. Para
                    el sector privado que ya debía tenerlo, el plazo de inscripción corrió hasta el 31 de diciembre de
                    2025, y registrar tarde se considera incumplimiento de una medida de seguridad de carácter jurídico.
                  </p>
                  <p className="text-xs text-slate-500 mt-3">
                    Fuente: Res. SPDP-SPD-2025-0028-R, art. 5 y Disposición Transitoria Tercera. Además, según el
                    estudio jurídico ECIJA, en diciembre de 2025 la SPDP sancionó a LigaPro y a la Federación
                    Ecuatoriana de Fútbol con USD 454.500,17 en total.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Qué incluye */}
        <section id="servicio" className="py-16 lg:py-24 bg-slate-900 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 uppercase tracking-widest px-3 py-1 rounded-full">
                El servicio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">Qué incluye el DPD externo</h2>
              <p className="text-slate-300 text-base sm:text-lg">
                Supervisión y asesoría continuas, con evidencia por escrito de cada recomendación y de cómo respondió
                tu organización.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { I: FileText, t: "Arranque (primeros 15 días hábiles)", items: ARRANQUE },
                { I: ClipboardCheck, t: "Cada mes, trimestre y año", items: MENSUAL },
              ].map(({ I, t, items }) => (
                <div key={t} className="bg-slate-950/90 border border-slate-800 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center">
                      <I className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{t}</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-300">
                    {items.map((x) => (
                      <li key={x} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" /> {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-slate-950/90 border border-amber-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
                  <Ban className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Lo que un DPD no hace</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                La norma pide que el DPD sea independiente: supervisa y asesora, pero no ejecuta el cumplimiento en la
                organización que supervisa (Res. 0028, arts. 14, 15 y 18). Por eso no atiende por ti las solicitudes
                de los titulares, no hace tu análisis de riesgos ni tus evaluaciones de impacto, no toma decisiones
                sobre tus datos y no te representa ante la SPDP.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Si necesitas implementar (registro de actividades de tratamiento, políticas, protocolo de brechas),
                lo hace tu equipo o un tercero distinto de tu DPD.
              </p>
            </div>
          </div>
        </section>

        {/* Niveles y precios */}
        <section id="precios" className="py-16 lg:py-24 bg-slate-950 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 uppercase tracking-widest px-3 py-1 rounded-full">
                Niveles y precios de referencia
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
                El nivel depende de la complejidad, no del número de empleados.
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                Se mide por categorías de datos, número de sistemas y encargados, transferencias internacionales y
                regulador sectorial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {NIVELES.map((n) => (
                <div
                  key={n.nivel}
                  className={`bg-slate-950/90 border rounded-2xl p-8 transition duration-300 flex flex-col justify-between ${n.borde}`}
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{n.nivel}</h3>
                    <p className="text-sm text-slate-400 mb-5">{n.para}</p>
                    <div className="mb-1">
                      <span className="text-xs text-slate-400 font-mono">{n.desde}</span>
                      <span className="text-4xl font-black text-white">{n.precio}</span>
                      <span className="text-xs text-slate-400 font-mono"> / mes</span>
                    </div>
                    <p className="text-sm text-cyan-300 font-mono mb-1">{n.horas}</p>
                    <p className="text-xs text-slate-400 mb-6">{n.arranque}</p>
                  </div>
                  <NivelCta nivel={n.nivel} label={`Me interesa el nivel ${n.nivel}`} />
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto mt-10 bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-400 flex items-start sm:items-center justify-center gap-2 text-left sm:text-center">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  Precios de referencia del piloto, en dólares, y se confirman en la propuesta según tu caso. Las
                  horas adicionales y los eventos (brechas, inspecciones, capacitaciones) se cotizan aparte. Aún no
                  estamos cobrando: abrimos cupos limitados.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Registro */}
        <section id="registro" className="py-16 lg:py-24 bg-slate-900 border-t border-slate-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950 border border-amber-800 px-3 py-1 rounded-full uppercase tracking-wider">
                Próximamente
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Deja tus datos y te escribimos
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">
                Para recibir el aviso cuando abramos cupos o para consultarnos sobre el servicio. Sin compromiso.
              </p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="max-w-2xl mx-auto">
            Servicio en preparación; precios de referencia. No constituye asesoría legal. |{" "}
            <PrivacyButton className="underline hover:text-cyan-400">Política de Privacidad</PrivacyButton> |{" "}
            <a href="/preguntas-frecuentes" className="underline hover:text-cyan-400">
              Preguntas frecuentes
            </a>{" "}
            |{" "}
            <a href="/eliminar-datos" className="underline hover:text-cyan-400">
              Eliminar mis datos
            </a>{" "}
            |{" "}
            <a href="mailto:contacto@dataprivo.com" className="underline hover:text-cyan-400">
              Contacto
            </a>
          </p>
          <div className="pt-2 text-slate-500 text-[11px] font-mono">
            © {new Date().getFullYear()} DataPrivo Ecuador 🇪🇨. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}
