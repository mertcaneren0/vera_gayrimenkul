import "./globals.css";
import type { Metadata } from "next";
import { Lato } from "next/font/google";

import RootLayoutClient from "@/components/layout/RootLayoutClient";


const lato = Lato({ 
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Vera Grup Gayrimenkul",
  description: "Vera Grup Gayrimenkul - Profesyonel Gayrimenkul Danışmanlığı",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/36.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={lato.className}>
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
