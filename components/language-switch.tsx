"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";

export function LanguageSwitch({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const targetLocale: Locale = locale === "ko" ? "en" : "ko";
  const segments = pathname?.split("/") ?? [];
  const href =
    pathname && isLocale(segments[1] ?? "")
      ? `/${targetLocale}${pathname.slice(segments[1].length + 1)}`
      : `/${targetLocale}`;

  return (
    <Link className="hover:text-ink" href={href} hrefLang={targetLocale}>
      {label}
    </Link>
  );
}
