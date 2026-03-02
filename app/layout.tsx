import type { Metadata } from "next";
import "./globals.css"
import { Space_Grotesk } from "next/font/google";
import Providers from "@/components/providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Rashmi Tiwari",
  description: "Rashmi Tiwari is a full stack developer specializing in React, Next.js, and modern web technologies based in India. View featured projects, technical expertise, and development experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
