import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "PatternForge // DSA Nexus 2099",
  description:
    "249 curated LeetCode problems, sorted into 25 patterns. Learn the pattern once, solve the category forever.",
  // 👇 Google Search Console verification meta tag
  verification: {
    google: "i4c4g7pu5VpsCqLyG1VVoGLTf57xG5OF6EljxmzTI0Q",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        <CustomCursor />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
