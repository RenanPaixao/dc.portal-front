import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from '@/components/Navbar/Navbar'

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PORTAL DC",
  description: "Portal para as disciplinas do departamento de computação da UFRPE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.className} antialiased`}>
      <body>
      <Navbar/>
        {children}
      </body>
    </html>
  );
}
