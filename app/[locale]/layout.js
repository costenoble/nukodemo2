import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { SiteFooter } from "@/components/site-footer";
import { routing } from "@/i18n/routing";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "CST | Define Your Standard",
  description: "Vêtements premium en édition limitée. Fabriqués au Portugal, pensés pour durer. Drop 01 disponible maintenant.",
  openGraph: {
    title: "CST — Define Your Standard",
    description: "Drop 01 disponible. Quatre pièces premium en édition limitée. Fabriqués au Portugal.",
    url: "https://cst-brand.fr",
    siteName: "CST",
    images: [{ url: "/images/hearth-home.jpg", width: 1200, height: 630, alt: "CST — Define Your Standard" }],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "CST — Define Your Standard",
    description: "Drop 01 disponible. Vêtements premium édition limitée.",
    images: ["/images/hearth-home.jpg"]
  }
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme — runs before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('cst-theme');if(t==='dark'||(t==null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()` }} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppShell>
            {children}
            <SiteFooter />
          </AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
