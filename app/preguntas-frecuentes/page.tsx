import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Preguntas frecuentes sobre la LOPDP Ecuador | DataPrivo",
  description:
    "Respuestas claras sobre la Ley Orgánica de Protección de Datos Personales de Ecuador para pymes: DPO, derechos de las personas, sanciones y cumplimiento.",
  alternates: { canonical: `${SITE_URL}/preguntas-frecuentes` },
};

const FAQ = [
  {
    q: "¿Qué es la LOPDP?",
    a: "La Ley Orgánica de Protección de Datos Personales de Ecuador regula cómo las empresas recogen, usan, guardan y comparten datos personales. También reconoce derechos a las personas, como acceder a sus datos, corregirlos, eliminarlos y oponerse a ciertos usos.",
  },
  {
    q: "¿Mi pyme necesita un Delegado de Protección de Datos (DPO)?",
    a: "La ley exige designar un DPO en algunos casos: tratamientos del sector público, actividades de control permanente y sistematizado por su volumen, naturaleza, alcance o finalidad, tratamiento a gran escala de datos sensibles, y otros casos que determinen la ley o la Superintendencia de Protección de Datos Personales (SPDP). Una evaluación de riesgo ayuda a orientarte, pero la decisión final debe validarla un experto legal.",
  },
  {
    q: "¿Qué pasa si una empresa incumple la LOPDP?",
    a: "La SPDP puede sancionar las infracciones. Las multas se calculan con una metodología publicada por la Superintendencia, según la gravedad de la infracción, y pueden expresarse como un porcentaje del volumen de negocio de la empresa. Revisa el texto oficial de la normativa para conocer el detalle.",
  },
  {
    q: "¿Qué es el consentimiento y cuándo se necesita?",
    a: "Es la manifestación de la voluntad de la persona para que se usen sus datos. Debe ser libre, específico, informado e inequívoco, y la persona puede revocarlo. Tratar datos personales requiere una base legal, y con frecuencia esa base es el consentimiento.",
  },
  {
    q: "¿Qué derechos tienen las personas sobre sus datos?",
    a: "Acceder a sus datos, rectificarlos, eliminarlos, oponerse a ciertos tratamientos, solicitar su portabilidad, suspender el tratamiento y no ser objeto de decisiones basadas únicamente en valoraciones automatizadas.",
  },
  {
    q: "¿Basta con usar una plantilla o un checklist para cumplir?",
    a: "Una plantilla o un checklist organiza el trabajo, pero no confirma que una empresa cumple la ley. La responsabilidad de cumplir es de la organización, y se recomienda validar los documentos con un experto legal antes de usarlos.",
  },
  {
    q: "¿Cómo puedo eliminar mis datos de una empresa que me registró?",
    a: "Puedes solicitarlo desde la página Eliminar mis datos de este sitio, o escribiendo a contacto@dataprivo.com indicando el correo con el que te registraste.",
  },
];

export default function PreguntasFrecuentes() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-cyan-400 underline">
          ← Volver al inicio
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-6 mb-3">
          Preguntas frecuentes sobre la LOPDP
        </h1>
        <p className="text-slate-300 leading-relaxed mb-10">
          Respuestas breves para pymes ecuatorianas. Esta información es orientativa y no constituye asesoría legal.
        </p>

        <div className="space-y-8">
          {FAQ.map((f) => (
            <section key={f.q}>
              <h2 className="text-xl font-bold text-white mb-2">{f.q}</h2>
              <p className="text-slate-300 leading-relaxed">{f.a}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 bg-slate-950 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-200 font-semibold mb-3">¿Quieres saber el riesgo de tu empresa?</p>
          <Link href="/#quiz-dpo" className="inline-block bg-sky-600 hover:bg-sky-500 text-white font-bold px-5 py-3 rounded-xl transition">
            Ir a la evaluación
          </Link>
        </div>
      </div>
    </main>
  );
}
