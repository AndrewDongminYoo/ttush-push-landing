import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <footer className="mt-auto border-t border-edge">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-ink-dim sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p>{dict.footer.developer}</p>
          <p>
            {dict.footer.contact}:{" "}
            <a
              className="underline-offset-4 hover:text-ink hover:underline"
              href="mailto:ydm2790@gmail.com"
            >
              ydm2790@gmail.com
            </a>
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link className="hover:text-ink" href={`/${locale}/privacy`}>
            {dict.footer.privacy}
          </Link>
          <a className="hover:text-ink" href="https://github.com/AndrewDongminYoo/ttush_push">
            GitHub
          </a>
          <Link
            className="hover:text-ink"
            href={dict.footer.languageHref}
            hrefLang={locale === "ko" ? "en" : "ko"}
          >
            {dict.footer.language}
          </Link>
        </nav>
      </div>
      <p className="pb-8 text-center text-xs text-ink-dim/85">© 2026 Dongmin Yu</p>
    </footer>
  );
}
