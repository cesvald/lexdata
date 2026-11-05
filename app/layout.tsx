import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "DataPrivo | Protección de datos para pymes en Ecuador",
  description:
    "Evalúa el riesgo de tu pyme frente a la LOPDP y recibe documentos personalizados para organizar tu cumplimiento.",
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
