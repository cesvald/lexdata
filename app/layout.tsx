import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "DataPrivo - Delegado de Protección de Datos (DPD) externo en Ecuador",
  description:
    "Servicio de Delegado de Protección de Datos externo para organizaciones obligadas por la LOPDP en Ecuador: designación, informe de cumplimiento y plazos vigilados cada mes. Próxima apertura; precios de referencia.",
  keywords: [
    "LOPDP Ecuador",
    "protección de datos personales Ecuador",
    "delegado de protección de datos Ecuador",
    "DPD externo Ecuador",
    "DPO Ecuador",
    "designar delegado de protección de datos",
    "SPDP",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${mono.variable} font-sans bg-slate-900 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
