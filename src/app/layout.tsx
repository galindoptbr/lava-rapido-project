import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lava Rapido Galp",
  description: "Fechamento de folha para Lava Rapidos",
  manifest: "/webmanifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="bg-[#E7E6E4] text-[#403C3D]">{children}</body>
    </html>
  );
}
