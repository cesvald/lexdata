"use client";

// Botón de cada plan: preselecciona esa modalidad en el formulario de registro
// (guarda el interés del usuario) y lleva al formulario.
export default function PlanCta({
  plan,
  label,
}: {
  plan: "auto" | "revision" | "dpo" | "free";
  label: string;
}) {
  return (
    <a
      href="#registro"
      onClick={() => window.dispatchEvent(new CustomEvent("lopdp:plan", { detail: plan }))}
      className="mt-6 block text-center bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm py-3 rounded-xl transition"
    >
      {label}
    </a>
  );
}
