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
    a: "La Ley Orgánica de Protección de Datos Personales de Ecuador regula cómo las organizaciones recogen, usan, guardan y comparten datos personales. También reconoce derechos a las personas, como acceder a sus datos, corregirlos, eliminarlos y oponerse a ciertos usos. La Superintendencia de Protección de Datos Personales (SPDP) es la autoridad que la controla.",
  },
  {
    q: "¿Mi organización necesita un Delegado de Protección de Datos (DPD)?",
    a: "Depende de la actividad, no del tamaño: ni la ley ni sus reglamentos fijan un mínimo de empleados o de ingresos. La LOPDP (art. 48) exige designarlo al sector público, a quienes realizan un control permanente y sistematizado de personas, y a quienes tratan a gran escala categorías especiales de datos. Además, la Res. SPDP-SPD-2025-0028-R (art. 10) obliga a quienes se dediquen de forma habitual a alguna de 14 actividades, aunque no tengan fin de lucro: educación o datos de menores, salud, finanzas, seguros, publicidad con perfiles, farmacias, seguridad privada y conjuntos residenciales, deporte profesional, gremios, telecomunicaciones, tecnologías de la información, y concesionarias de servicios públicos. Varios numerales hablan de personas jurídicas, y los profesionales de la salud que ejercen de forma particular están exceptuados. Esta información es orientativa: si tienes dudas, déjanos tu consulta.",
  },
  {
    q: "¿Quién puede ser DPD?",
    a: "Una persona natural que esté en goce de sus derechos políticos, sea mayor de edad, tenga un título de tercer nivel en derecho, sistemas de información, comunicación o tecnologías, y al menos cinco años de experiencia profesional (Reglamento de la LOPDP, art. 55). No puede ser a la vez oficial de seguridad de la información ni oficial de cumplimiento de la organización (Res. 0028, art. 16). Desde el 1 de enero de 2029 también deberá aprobar el programa profesionalizante de la SPDP (art. 11 y Disposición Transitoria Séptima). Inscribir el nombramiento no valida por sí solo la idoneidad: la SPDP puede verificar los requisitos en cualquier momento (art. 6).",
  },
  {
    q: "¿Puedo contratar un DPD externo?",
    a: "Sí. La Res. 0028 (art. 12) permite contar con un DPD mediante un contrato de prestación de servicios técnicos especializados, siempre que mantenga total independencia e imparcialidad. El DPD es siempre una persona natural. Tu organización debe evaluar cada año su independencia (contacto con la alta dirección, recursos, observaciones hechas e informes de cumplimiento); esa evaluación no la hace el DPD (art. 22).",
  },
  {
    q: "¿Qué hace un DPD externo y qué no hace?",
    a: "Informa a tu organización de sus obligaciones, supervisa su cumplimiento, coopera con la SPDP y sirve de punto de contacto con ella. Asesora y supervisa el análisis de riesgos, la evaluación de impacto, las medidas de seguridad, la atención de solicitudes, la gestión de brechas y el registro de actividades de tratamiento (Res. 0028, art. 13). No implementa el cumplimiento en la organización que supervisa, no atiende por ti las solicitudes de los titulares, no ejecuta tu análisis de riesgos, no decide sobre tus datos y no te representa ante la SPDP (arts. 14, 15 y 18). Si necesitas implementación, la hace tu equipo o un tercero distinto de tu DPD. El DPD no responde por las decisiones finales de tu organización si demuestra que actuó con diligencia (art. 13).",
  },
  {
    q: "¿Quién inscribe el nombramiento del DPD y en qué plazo?",
    a: "Lo inscribe tu organización, por el portal de la SPDP, dentro de un término de 15 días desde la fecha de designación (Res. 0028, art. 5); según la regla general del Código Orgánico Administrativo, los términos se cuentan en días hábiles. Se acepta el registro tardío, pero se considera incumplimiento de una medida de seguridad de carácter jurídico. Para el sector privado que ya debía tener DPD, la primera ventana de registro cerró el 31 de diciembre de 2025 (Disposición Transitoria Tercera). Nuestro servicio incluye el acompañamiento hasta que quede inscrito.",
  },
  {
    q: "¿Qué plazos tengo para atender solicitudes y notificar brechas?",
    a: "Las solicitudes de las personas sobre sus datos se responden en un término de 10 días (LOPDP, art. 62). Una brecha de seguridad se notifica en un término de 5 días desde que se tiene constancia a la SPDP, al organismo de regulación y control competente y al CSIRT correspondiente (LOPDP, art. 43, reformado por la Ley de Ciberseguridad de mayo de 2026), y a la persona afectada en 3 días cuando corresponde (art. 46). Estas gestiones las hace tu organización; el DPD supervisa que se hagan a tiempo.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Los precios de referencia, en dólares, son: nivel Base $200 al mes (5 horas) con arranque de $600; nivel Estándar $400 al mes (10 horas) con arranque de $1.000; y nivel Complejo desde $800 al mes (20 horas o más) con arranque cotizado. El nivel depende de la complejidad del tratamiento, no del número de empleados. Se confirman en una propuesta según tu caso, y las horas adicionales y los eventos se cotizan aparte.",
  },
  {
    q: "¿El servicio ya está disponible?",
    a: "Todavía no: el servicio abre próximamente y la atención será gradual, porque cada organización requiere horas dedicadas de su DPD. Puedes dejar tus datos para que te avisemos cuando abramos, o escribirnos una consulta; te respondemos a la brevedad. Dejar tus datos no te compromete a nada.",
  },
  {
    q: "¿Qué pasa si una organización incumple la LOPDP?",
    a: "No designar DPD cuando es obligatorio es una infracción grave, igual que no aplicar medidas de seguridad, no notificar brechas o no inscribir las bases de datos en el Registro Nacional (LOPDP, art. 68). Las multas son de entre 0,1% y 0,7% del volumen de negocio del ejercicio anterior para las leves, y de entre 0,7% y 1% para las graves (arts. 71 a 73). En infracciones graves, la SPDP aplica primero medidas correctivas y multa si no se cumplen o se cumplen tarde (art. 66). Contratar un DPD no promete que no habrá sanciones: la responsabilidad de cumplir es de la organización.",
  },
  {
    q: "¿Qué derechos tienen las personas sobre sus datos?",
    a: "Acceder a sus datos, rectificarlos, eliminarlos, oponerse a ciertos tratamientos, solicitar su portabilidad, suspender el tratamiento y no ser objeto de decisiones basadas únicamente en valoraciones automatizadas. Si no se atiende una solicitud, la persona puede reclamar ante la SPDP.",
  },
  {
    q: "¿Cómo puedo eliminar mis datos si me registré en este sitio?",
    a: "Puedes solicitarlo desde la página Eliminar mis datos de este sitio, o escribiendo a contacto@dataprivo.com indicando el correo con el que te registraste. Reemplazamos tu nombre y tu correo por datos anónimos y borramos el texto de tu consulta.",
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
