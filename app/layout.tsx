import type { Metadata } from "next";
import { Montserrat, Outfit } from "next/font/google";
import "./globals.css";

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
  title: "AI Website Builder - Codexa",
  description:
    "Codexa adalah platform AI website builder revolusioner. Cukup berikan ide Anda, dan biarkan AI kami mendesain & membangun website profesional dalam hitungan menit. Tanpa koding, tanpa ribet. Mulai gratis hari ini!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${primaryFont.variable} ${secondaryFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
