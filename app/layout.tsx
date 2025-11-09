import type { Metadata } from "next";
import { Montserrat, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import HomeProvider from "./provider";

const primaryFont = Montserrat({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const secondaryFont = Outfit({
  variable: "--font-secondary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codexa AI",
  description:
    "Codexa adalah platform AI website builder revolusioner. Cukup berikan ide Anda, dan biarkan AI kami mendesain & membangun website profesional dalam hitungan menit. Tanpa koding, tanpa ribet. Mulai gratis hari ini!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${primaryFont.variable} ${secondaryFont.variable} antialiased dark`}
        >
          <HomeProvider>{children}</HomeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
