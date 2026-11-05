"use client";

import { track, type EventParams } from "@/lib/analytics";

// Enlace que registra un evento de analítica al hacer clic.
// Existe porque los Server Components no pueden pasar onClick.
export default function TrackedLink({
  href,
  event,
  params,
  className,
  children,
}: {
  href: string;
  event: string;
  params?: EventParams;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => track(event, params)}>
      {children}
    </a>
  );
}
