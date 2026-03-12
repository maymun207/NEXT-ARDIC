import { Inter, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "600", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["400", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* App version from git tag — injected by Vercel build command */}
        <meta
          name="app-version"
          content={process.env.NEXT_PUBLIC_APP_VERSION ?? "dev"}
        />
      </head>
      <body className={`${inter.variable} ${sourceSans.variable}`}>
        {children}
        {/* Vercel Analytics — tracks page views and custom events */}
        <Analytics />
        {/* Vercel Speed Insights — Core Web Vitals (LCP, FID, CLS) */}
        <SpeedInsights />
      </body>
    </html>
  );
}
