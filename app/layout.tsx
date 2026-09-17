import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "VENOM CODE — Tecnologia com presença predadora",
  description:
    "Sites, e-commerce, sistemas e automações construídos para transformar presença digital em resultado real.",
  metadataBase: new URL("https://venomcode.com.br"),
  openGraph: {
    title: "VENOM CODE",
    description: "Estratégia, design e tecnologia para negócios que querem avançar.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/images/venom-brand-study.webp", width: 1536, height: 1024, alt: "VENOM CODE — Estratégia, identidade e tecnologia" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}

