import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google"; // Import Inter and Montserrat
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Bridgems - Talento Futbolístico Panameño",
  description: "Conectando jugadores con clubes y oportunidades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased font-sans bg-[#FFFCF2] text-[#403D39]`}
      >
        {children}
      </body>
    </html>
  );
}
