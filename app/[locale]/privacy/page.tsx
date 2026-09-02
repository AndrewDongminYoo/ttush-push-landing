import { readFile } from "node:fs/promises";
import path from "node:path";
import Markdown from "react-markdown";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { SiteFooter } from "@/components/site-footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const source = await readFile(
    path.join(process.cwd(), "content", "legal", `privacy.${locale}.md`),
    "utf8",
  );

  return (
    <main className="prose prose-invert max-w-none">
      <Markdown>{source}</Markdown>
      <SiteFooter locale={locale} />
    </main>
  );
}
