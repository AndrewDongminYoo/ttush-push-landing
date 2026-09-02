import type { Metadata } from "next";
import { Gothic_A1, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, locales } from "@/lib/i18n";
import { ogImage, siteUrl } from "@/lib/site";
import "../globals.css";

// Poppins is the face the app itself ships and licenses under the OFL
// (`assets/fonts/` and `assets/licenses/poppins/` in ttush_push), so the page
// and a screenshot of the game set type the same way.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Poppins has no Hangul, and Korean is the default locale — this is the
// primary reading face for most visitors, not a fallback. Gothic A1 is
// geometric where Noto Sans KR is humanist, which is what keeps it next to
// Poppins rather than beside it.
const gothicA1 = Gothic_A1({
  variable: "--font-gothic-a1",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: siteUrl,
    title: { default: dict.meta.title, template: "%s · Ttush Push" },
    description: dict.meta.description,
    openGraph: {
      type: "website",
      siteName: "Ttush Push",
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      images: [
        {
          url: ogImage.path,
          width: ogImage.width,
          height: ogImage.height,
          alt: dict.meta.ogAlt,
        },
      ],
    },
    twitter: { card: "summary_large_image" },
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
    <html lang={locale} className={`${poppins.variable} ${gothicA1.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-void font-sans text-ink">
        {children}
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
