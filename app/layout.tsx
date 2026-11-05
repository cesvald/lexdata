import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "DataPrivo - Protección de datos personales para pymes en Ecuador",
  description:
    "Evalúa gratis el riesgo de tu pyme frente a la LOPDP Ecuador. Recibe políticas de privacidad y registro de tratamientos personalizados, y conoce si necesitas un DPO.",
  keywords: [
    "LOPDP Ecuador",
    "protección de datos personales Ecuador",
    "políticas de privacidad Ecuador",
    "registro de tratamientos",
    "DPO Ecuador",
    "delegado de protección de datos Ecuador",
    "pymes Ecuador",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${mono.variable} font-sans bg-slate-900 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
