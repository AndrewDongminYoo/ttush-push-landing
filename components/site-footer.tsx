import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <footer className="site-footer">
      <div className="landing-container footer-inner">
        <div className="footer-brand">
          <Link className="brand" href={`/${locale}`}>
            ttush<span className="brand-light">push</span>
            <span className="brand-period">.</span>
          </Link>
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
        <nav
          className="footer-nav"
          aria-label={locale === "ko" ? "사이트 정보" : "Site information"}
        >
          <Link className="hover:text-ink" href={`/${locale}/privacy`}>
            {dict.footer.privacy}
          </Link>
          <a
            className="hover:text-ink"
            href="https://github.com/AndrewDongminYoo/ttush_push"
          >
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
      <p className="pb-8 text-center text-xs text-ink-dim/85">
        © 2026 Dongmin Yu
      </p>
    </footer>
  );
}
