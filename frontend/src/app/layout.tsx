import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/layout/Footer";
import RootLayoutClient from "@/components/layout/RootLayoutClient";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vera Grup Gayrimenkul",
  description: "Vera Grup Gayrimenkul - Profesyonel Gayrimenkul Danışmanlığı",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
        <Footer />
      </body>
    </html>
  );
}
