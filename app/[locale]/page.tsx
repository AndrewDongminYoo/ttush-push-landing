import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { SiteFooter } from "@/components/site-footer";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dictionary = getDictionary(locale);

  return (
    <main>
      <h1 className="text-4xl font-bold">Ttush Push</h1>
      <p className="mt-2 text-lg text-white/70">{dictionary.tagline}</p>
      <p className="mt-8 leading-relaxed">{dictionary.intro}</p>

      <h2 className="mt-12 text-2xl font-semibold">
        {dictionary.rulesHeading}
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed">
        {dictionary.rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>

      <h2 className="mt-12 text-2xl font-semibold">
        {dictionary.statusHeading}
      </h2>
      <p className="mt-4 leading-relaxed">{dictionary.status}</p>

      <SiteFooter locale={locale} />
    </main>
  );
}
