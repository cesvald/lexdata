import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Preguntas frecuentes sobre el DPD y la LOPDP Ecuador | DataPrivo",
  description:
    "Respuestas claras sobre el Delegado de Protección de Datos en Ecuador: quién debe designarlo, qué hace y qué no hace un DPD externo, precios de referencia y plazos.",
  alternates: { canonical: `${SITE_URL}/preguntas-frecuentes` },
};

const FAQ = [
  {
    q: "¿Qué es la LOPDP?",
    a: "La Ley Orgánica de Protección de Datos Personales de Ecuador regula cómo las organizaciones recogen, usan, guardan y comparten datos personales. También reconoce derechos a las personas, como acceder a sus datos, corregirlos, eliminarlos y oponerse a ciertos usos.",
  },
  {
    q: "¿Mi organización necesita un Delegado de Protección de Datos (DPD)?",
    a: "Depende de la actividad, no del tamaño: ni la ley ni sus reglamentos fijan un mínimo de empleados o de ingresos. Deben designarlo el sector público, quienes realizan un control permanente y sistematizado por su volumen, naturaleza, alcance o finalidad, quienes tratan a gran escala categorías especiales de datos, y quienes se dedican de forma habitual a alguna de las 14 actividades del art. 10 de la Res. SPDP-SPD-2025-0028-R (educación, salud, finanzas, seguros, telecomunicaciones, entre otras). Esta información es orientativa; si tienes dudas, déjanos tu consulta.",
  },
  {
    q: "¿Qué hace un DPD externo y qué no hace?",
    a: "Supervisa y asesora: informa a tu organización de sus obligaciones, vigila los plazos, revisa que tu equipo atienda las solicitudes de los titulares y sirve de punto de contacto con la SPDP. No implementa el cumplimiento en la organización que supervisa, no atiende por ti las solicitudes, no hace tu análisis de riesgos ni te representa ante la SPDP (Res. 0028, arts. 14, 15 y 18). Si necesitas implementación, la hace tu equipo o un tercero distinto de tu DPD.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Los precios de referencia del piloto, en dólares, son: nivel Base $200 al mes (5 horas) con arranque de $600; nivel Estándar $400 al mes (10 horas) con arranque de $1.000; y nivel Complejo desde $800 al mes (20 horas o más) con arranque cotizado. El nivel depende de la complejidad del tratamiento, no del número de empleados. Se confirman en una propuesta según tu caso, y las horas adicionales y los eventos se cotizan aparte.",
  },
  {
    q: "¿El servicio ya está disponible?",
    a: "Estamos abriendo cupos limitados del piloto. Puedes dejar tus datos para que te avisemos cuando abramos, o escribirnos una consulta; te respondemos a la brevedad. Dejar tus datos no te compromete a nada.",
  },
  {
    q: "¿Quién inscribe el nombramiento del DPD en la SPDP?",
    a: "Lo inscribe tu organización, a través del portal de la SPDP, dentro de 15 días término desde la fecha de designación (Res. 0028, art. 5). El DPD te acompaña y verifica que se haga dentro del plazo. Inscribirlo tarde se considera incumplimiento de una medida de seguridad de carácter jurídico.",
  },
  {
    q: "¿Qué pasa si una organización incumple la LOPDP?",
    a: "La SPDP puede sancionar las infracciones. Las multas se calculan con una metodología publicada por la Superintendencia, según la gravedad de la infracción, y pueden expresarse como un porcentaje del volumen de negocio. Revisa el texto oficial de la normativa para conocer el detalle. Contratar un DPD no promete que no habrá sanciones: la responsabilidad de cumplir es de la organización.",
  },
  {
    q: "¿Qué derechos tienen las personas sobre sus datos?",
    a: "Acceder a sus datos, rectificarlos, eliminarlos, oponerse a ciertos tratamientos, solicitar su portabilidad, suspender el tratamiento y no ser objeto de decisiones basadas únicamente en valoraciones automatizadas.",
  },
  {
    q: "¿Cómo puedo eliminar mis datos si me registré en este sitio?",
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
          Preguntas frecuentes sobre el DPD y la LOPDP
        </h1>
        <p className="text-slate-300 leading-relaxed mb-10">
          Respuestas breves para organizaciones ecuatorianas. Esta información es orientativa y no constituye asesoría legal.
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
          <p className="text-slate-200 font-semibold mb-3">¿Tienes otra duda o quieres el aviso de apertura?</p>
          <Link href="/#registro" className="inline-block bg-sky-600 hover:bg-sky-500 text-white font-bold px-5 py-3 rounded-xl transition">
            Dejar mis datos
          </Link>
        </div>
      </div>
    </main>
  );
}
