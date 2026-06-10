import "./globals.css";
import { Toaster } from "sonner";
import { LenisProvider } from "@/components/site/lenis-provider";
import { headers } from "next/headers";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { Inter, Outfit } from "next/font/google";
import type { Locale } from "@/types/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata = {
  title: "Mohamed Bouliani — Portfolio",
  description: "Professional creative portfolio for brand, web, and visual systems"
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const
};

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const reqHeaders = await headers();
  const locale = (reqHeaders.get("x-locale") || "fr") as Locale;

  return (
    <html lang={locale} dir="ltr" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-body bg-mb-bg text-white antialiased overflow-x-hidden selection:bg-mb-gold/30 selection:text-white`}>
        <LanguageProvider initialLocale={locale}>
          <LenisProvider>
            {children}
            <Toaster theme="dark" />
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
