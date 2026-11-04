import {
  ArrowRight,
  Award,
  Banknote,
  Building2,
  CheckCircle,
  Code,
  Compass,
  FileCode2,
  Flag,
  Info,
  Scale,
  Settings2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Quiz from "@/components/Quiz";
import LeadForm from "@/components/LeadForm";
import PrivacyButton from "@/components/PrivacyButton";

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
                Ecuador LegalTech Platform
              </span>
            </div>
          </div>
          <a
            href="#registro"
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-sky-600/20 transition duration-200"
          >
            <Sparkles className="w-4 h-4 text-sky-100" />
            <span>Acceso Anticipado</span>
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
                <span>Hecho para la LOPDP de Ecuador</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Pon al día la protección de datos de tu empresa{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                  sin pagar una consultoría de miles de dólares.
                </span>
              </h1>
              <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                Estamos construyendo una herramienta guiada para que tu pyme genere sus políticas, su registro de
                tratamientos y sus avisos legales paso a paso. Súmate a la lista de acceso anticipado.
              </p>
              <div className="flex items-center justify-center mb-4">
                <a
                  href="#registro"
                  className="w-full sm:w-auto px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-sky-600/20 transition duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                >
                  <span>Quiero acceso anticipado</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </a>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium flex items-center justify-center gap-2 mb-10">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Sin costo. Sin compromiso. Te avisamos cuando abramos.
              </p>
            </div>

            <div className="mt-8 max-w-4xl mx-auto bg-slate-950/80 rounded-2xl border border-cyan-500/40 p-6 sm:p-8 glow-cyan-lg backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <span className="text-sm font-bold text-white">Qué incluye la plataforma</span>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Asistente Guiado Inteligente</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                {[
                  { n: "01", c: "text-cyan-400", t: "Políticas de Privacidad", d: "Genera avisos y políticas adaptadas a tu sitio web y operación." },
                  { n: "02", c: "text-sky-400", t: "Registro de Tratamientos", d: "Crea el inventario obligatorio de bases de datos exigido por la SPDP." },
                  { n: "03", c: "text-emerald-400", t: "Avisos Legales", d: "Textos de consentimiento para clientes, trabajadores y proveedores." },
                ].map((m) => (
                  <div key={m.n} className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                    <div className={`text-xs font-mono mb-1 ${m.c}`}>Módulo {m.n}</div>
                    <h4 className="text-sm font-bold text-white mb-2">{m.t}</h4>
                    <p className="text-xs text-slate-400">{m.d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-start gap-2 text-left">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <strong>Nota:</strong> Es una herramienta de apoyo. No constituye asesoría legal, no garantiza el
                  cumplimiento normativo ni te exime de responsabilidad frente a la ley.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Problema */}
        <section id="problema" className="py-16 lg:py-24 bg-slate-950 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950 border border-cyan-800/80 uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                🏛️ Contexto Regulatorio en Ecuador
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4">La SPDP ya está sancionando.</h2>
              <p className="text-slate-300 text-base sm:text-lg">
                La Ley Orgánica de Protección de Datos Personales se encuentra activa y la autoridad de control ya
                emite resoluciones formales.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-16 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 text-white p-6 sm:p-8 border border-cyan-500/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <Scale className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex px-3 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold mb-3">
                    Precedente Normativo de la SPDP
                  </div>
                  <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed">
                    &ldquo;En diciembre de 2025, la SPDP sancionó a <strong className="text-white">LIGAPRO</strong> y a la{" "}
                    <strong className="text-white">Federación Ecuatoriana de Fútbol</strong> con un total de{" "}
                    <span className="text-cyan-300 font-extrabold underline decoration-cyan-500/50">USD 454.500,17</span>{" "}
                    por infracciones graves. Las multas pueden llegar al{" "}
                    <strong className="text-amber-300 font-bold">1% del volumen de negocio</strong> por cada
                    infracción.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { I: Banknote, c: "amber", t: "Asesoría tradicional cara", d: "Muchas pymes ecuatorianas no pueden costear una consultoría legal jurídica completa que supera los miles de dólares." },
                { I: FileCode2, c: "cyan", t: "Lenguaje legal difícil", d: "Resulta extremadamente complejo traducir los reglamentos técnicos de la ley a las operaciones diarias de tu empresa." },
                { I: Compass, c: "sky", t: "No saber por dónde empezar", d: "Falta de claridad sobre si debes nombrar un DPO, registrar tus bases de datos o actualizar contratos con clientes." },
              ].map(({ I, c, t, d }) => (
                <div key={t} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition duration-300">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${
                      c === "amber"
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        : c === "cyan"
                          ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                          : "bg-sky-500/10 border-sky-500/30 text-sky-400"
                    }`}
                  >
                    <I className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solución */}
        <section id="solucion" className="py-16 lg:py-24 bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 uppercase tracking-widest px-3 py-1 rounded-full">
                Software LegalTech Especializado
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
                Cumplimiento guiado, a la medida de tu empresa.
              </h2>
              <p className="text-slate-300 text-base sm:text-lg">
                Diseñado específicamente para que las pequeñas y medianas empresas ecuatorianas estén en regla
                fácilmente.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-slate-950/90 rounded-2xl p-8 hover:border-cyan-400 transition duration-300 flex flex-col justify-between tech-border-glow">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center">
                      <Settings2 className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-white">$20</span>
                      <span className="text-xs text-slate-400 font-mono"> / mes</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Autogestión guiada</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Documentos personalizados para tu empresa, a partir de tus propias respuestas. Tú decides si los
                    usas, los ajustas y los validas con un experto legal.
                  </p>
                </div>
                <ul className="space-y-3 border-t border-slate-800 pt-5 text-xs text-slate-300 font-medium">
                  {[
                    "Políticas de privacidad y avisos generados con los datos de tu empresa",
                    "Registro de tratamientos a partir de tus respuestas",
                    "Checklist de tareas y acciones prioritarias",
                    "Aviso cuando hay cambios normativos que requieren nuevas acciones",
                  ].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400" /> {x}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-8 hover:border-sky-500/40 transition duration-300 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-sky-500/20 border border-sky-500/40 text-sky-300 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  Revisión puntual
                </div>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="text-right pt-8">
                      <span className="text-2xl font-black text-white">$300</span>
                      <span className="text-xs text-slate-400 font-mono"> / pago único</span>
                      <div className="text-xs text-cyan-300 font-mono mt-1">+ $20 / mes de plataforma</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Revisión de documentos por DPO</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Incluye el uso de la plataforma ($20 al mes) más una revisión puntual de tus documentos por un
                    DPO certificado ($300, pago único). No incluye la designación formal como DPO de tu empresa.
                  </p>
                </div>
                <ul className="space-y-3 border-t border-slate-800 pt-5 text-xs text-slate-300 font-medium">
                  {["Uso de la plataforma de Autogestión ($20 / mes)", "Revisión puntual de tus documentos por un DPO certificado ($300, pago único)"].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" /> {x}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  Servicio mensual
                </div>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="text-right pt-8">
                      <span className="text-2xl font-black text-white">$500</span>
                      <span className="text-xs text-slate-400 font-mono"> / mes</span>
                      <div className="text-xs text-cyan-300 font-mono mt-1">+ $20 / mes de plataforma</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">DPO como servicio</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Contratas a un Delegado de Protección de Datos certificado que asume formalmente el rol para tu
                    empresa. La plataforma ($20 al mes) se cobra aparte.
                  </p>
                </div>
                <ul className="space-y-3 border-t border-slate-800 pt-5 text-xs text-slate-300 font-medium">
                  {["Designación formal como Delegado de Protección de Datos", "Punto de contacto con la SPDP y con los titulares", "Plataforma de Autogestión aparte ($20 / mes)"].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mt-12 bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <strong>Nota:</strong> Es una herramienta de apoyo. No constituye asesoría legal, no garantiza el
                  cumplimiento normativo ni te exime de responsabilidad frente a la ley.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section id="equipo" className="py-16 lg:py-20 bg-slate-950 border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                <ShieldCheck className="w-80 h-80 text-cyan-400" />
              </div>
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold mb-4">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Respaldado por Especialistas</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  Equipo multiprofesional de tecnología y derecho
                </h3>
                <p className="text-slate-300 text-base leading-relaxed mb-6">
                  Desarrollamos esta solución combinando más de 10 años de experiencia técnica en arquitectura de
                  software con el acompañamiento directo de profesionales certificados como Delegados de Protección
                  de Datos (DPO) especializados en la normativa LOPDP de Ecuador.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Nuestro objetivo es simplificar los requerimientos regulatorios complejos en flujos automatizados,
                  seguros y accesibles para las pequeñas y medianas empresas del país.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  {[
                    { I: Code, t: "Desarrollo Tecnológico", s: "+10 años de experiencia", c: "cyan" },
                    { I: Award, t: "Especialistas DPO", s: "Certificados en protección", c: "emerald" },
                    { I: Flag, t: "100% LOPDP Ecuador", s: "Normativa local vigente", c: "sky" },
                  ].map(({ I, t, s, c }) => (
                    <div key={t} className="flex items-center gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                      <div
                        className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
                          c === "cyan"
                            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                            : c === "emerald"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                              : "bg-sky-500/10 border-sky-500/30 text-sky-400"
                        }`}
                      >
                        <I className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-white">{t}</span>
                        <span className="text-[11px] text-slate-400">{s}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section id="quiz-dpo" className="py-16 lg:py-24 bg-slate-900 border-t border-slate-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 px-3 py-1 rounded-full uppercase tracking-wider">
                Evaluación Rápida LOPDP
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-3">¿Debes nombrar un DPO?</h2>
              <p className="text-slate-400 text-sm mt-2">
                Guía gratuita de 5 preguntas para evaluar la necesidad de un Delegado de Protección de Datos.
              </p>
            </div>
            <Quiz />
          </div>
        </section>

        {/* Registro */}
        <section id="registro" className="py-16 lg:py-24 bg-slate-950 border-t border-slate-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 px-3 py-1 rounded-full uppercase tracking-wider">
                Acceso Anticipado
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Súmate a la lista de acceso anticipado
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">
                Asegura tu lugar para probar la herramienta en primicia.
              </p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="max-w-2xl mx-auto">
            Servicio en desarrollo. No constituye asesoría legal. |{" "}
            <PrivacyButton className="underline hover:text-cyan-400">Política de Privacidad</PrivacyButton> |{" "}
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
