import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DownloadSection,
  GameFaq,
  GameGuide,
  LandingHeader,
  LandingHero,
  Opponents,
} from "@/components/landing-page";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { appStoreUrl, ogImage, playStoreUrl, siteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: { ko: "/ko", en: "/en", "x-default": "/ko" },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const installUrls = [appStoreUrl, playStoreUrl].filter((url): url is string => url !== null);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Ttush Push",
    description: dict.meta.description,
    url: new URL(`/${locale}`, siteUrl).toString(),
    image: new URL(ogImage.path, siteUrl).toString(),
    inLanguage: ["ko", "en"],
    genre: "Abstract strategy",
    gamePlatform: ["Android", "iOS"],
    // A range rather than a single value: one player against an AI level, or
    // two sharing the device. `value` would assert that two are required.
    numberOfPlayers: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2 },
    applicationCategory: "Game",
    author: {
      "@type": "Person",
      name: "Dongmin Yu",
      email: "ydm2790@gmail.com",
    },
    // `installUrl` is a SoftwareApplication property, which VideoGame inherits;
    // like any schema.org property it may carry more than one value.
    ...(installUrls.length > 0 ? { installUrl: installUrls } : {}),
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        {dict.landing.skipLink}
      </a>
      <LandingHeader dict={dict} locale={locale} />
      <main id="main-content" className="landing-main">
        <script
          type="application/ld+json"
          // Static object, no user input. The standard Next.js JSON-LD pattern.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <LandingHero dict={dict} />
        <GameGuide dict={dict} />
        <Opponents dict={dict} />
        <GameFaq dict={dict} />
        <DownloadSection dict={dict} locale={locale} />
      </main>
    </>
  );
}
