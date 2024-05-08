import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Noto_Sans } from "next/font/google";


import HeaderBar from "./_components/HeaderBar";
import "./globals.css";

const noto = Noto_Sans({
  subsets: ["latin-ext"],
  weight: ["400", "700"],
  variable: "--noto-sans",
});


export const metadata: Metadata = {
  title: "ePicBook",
  description: "Generated by create next app",
  icons: "/IMazon.ico",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <SessionProvider>
          <HeaderBar/>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
