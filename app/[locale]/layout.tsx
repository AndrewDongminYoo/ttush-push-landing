import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { siteUrl } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dictionary = getDictionary(locale);
  return {
    metadataBase: siteUrl,
    title: `Ttush Push — ${dictionary.tagline}`,
    description: dictionary.intro,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((it) => [it, `/${it}`])),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className="mx-auto max-w-2xl px-6 py-16">{children}</body>
    </html>
  );
}

export type { Locale };
