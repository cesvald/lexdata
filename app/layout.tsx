import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Cumplimiento LOPDP Ecuador | Plataforma de Protección de Datos",
  description:
    "Herramienta guiada para que tu pyme genere sus políticas, registro de tratamientos y avisos legales conforme a la LOPDP de Ecuador.",
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
