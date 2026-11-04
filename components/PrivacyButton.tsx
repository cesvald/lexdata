"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function PrivacyButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Política de Privacidad"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">Política de Privacidad</h3>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              <p>En cumplimiento de la LOPDP de Ecuador:</p>
              <p>
                <strong>Responsable:</strong> Proyecto DataPrivo Ecuador.{" "}
                {/* TODO: completar razón social / nombre legal, RUC y dirección */}
              </p>
              <p>
                <strong>Finalidad:</strong> Tratar los datos capturados únicamente para enviar
                información del estado de desarrollo de la plataforma e invitaciones de acceso
                anticipado.
              </p>
              <p>
                <strong>Datos tratados:</strong> nombre, correo electrónico, tamaño de empresa y plan
                de interés.
              </p>
              <p>
                <strong>Conservación:</strong> Conservamos tus datos hasta que solicites su eliminación.
              </p>
              <p>
                <strong>Transferencia internacional:</strong> Tus datos se almacenan y procesan con
                proveedores de infraestructura ubicados en Estados Unidos (Cloudflare para la base de datos y
                Resend para el correo). Al aceptar, autorizas esta transferencia.
              </p>
              <p>
                <strong>Cookies:</strong> Este sitio no usa cookies de seguimiento ni publicidad. Los
                servicios de seguridad de la infraestructura pueden usar cookies técnicas estrictamente
                necesarias.
              </p>
              <p>
                <strong>Derechos:</strong> Puedes solicitar acceso, rectificación, eliminación, oposición y
                portabilidad de tus datos escribiendo a{" "}
                <a className="underline text-cyan-400" href="mailto:contacto@dataprivo.com">
                  contacto@dataprivo.com
                </a>{" "}
                o desde la página{" "}
                <a className="underline text-cyan-400" href="/eliminar-datos">
                  Eliminar mis datos
                </a>
                . Si consideras que tus derechos no fueron atendidos, puedes presentar un reclamo ante la
                Superintendencia de Protección de Datos Personales.
              </p>
              <p>
                <strong>Carácter voluntario:</strong> Entregar estos datos es voluntario. Sin ellos no podemos
                enviarte la información de acceso anticipado.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 w-full py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
