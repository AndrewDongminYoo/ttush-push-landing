import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  return (
    <footer className="mt-16 border-t border-white/10 pt-6 text-sm text-white/60">
      <Link className="underline" href={`/${locale}/privacy`}>
        {dictionary.privacy}
      </Link>
      <span className="mx-2">·</span>
      <Link className="underline" href={locale === "ko" ? "/en" : "/ko"}>
        {locale === "ko" ? "English" : "한국어"}
      </Link>
    </footer>
  );
}
