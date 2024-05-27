import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lava Rapido Galp",
  description: "Fechamento de folha para Lava Rapidos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="bg-[#E7E6E4] text-[#403C3D]">
        {children}
      </body>
    </html>
  );
}
