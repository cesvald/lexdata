"use client";

import { track } from "@/lib/analytics";

// Botón de cada nivel: preselecciona ese nivel en el formulario y lleva al formulario.
export default function NivelCta({ nivel, label }: { nivel: "Base" | "Estándar" | "Complejo"; label: string }) {
  return (
    <a
      href="#registro"
      onClick={() => {
        track("clic_nivel", { nivel });
        window.dispatchEvent(new CustomEvent("dpd:nivel", { detail: nivel }));
      }}
      className="mt-6 block text-center bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm py-3 rounded-xl transition"
    >
      {label}
    </a>
  );
}
