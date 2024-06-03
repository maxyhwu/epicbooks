import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";


import HeaderBar from "./_components/HeaderBar";
import "./globals.css";

const noto = Noto_Serif({
  subsets: ["latin-ext"],
  weight: ["400", "700"],
  variable: "--noto-serif",
});

// const inika = Inika({
//   subsets: ["latin-ext"],
//   weight: ["400", "700"],
//   variable: "--inika",
// })


export const metadata: Metadata = {
  title: "ePicBooks",
  description: "Generated by create next app",
  icons: "/story_book.ico",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={noto.className}>
        {/* <SessionProvider> */}
          <HeaderBar/>
          {children}
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
