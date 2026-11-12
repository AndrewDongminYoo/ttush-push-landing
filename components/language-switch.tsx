"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isLocale, type Locale } from "@/lib/i18n";

export function LanguageSwitch({
  locale,
  label,
  className = "hover:text-ink",
  children,
}: {
  locale: Locale;
  label: string;
  className?: string;
  /** What the link shows instead of `label`, such as a short "EN". */
  children?: ReactNode;
}) {
  const pathname = usePathname();
  const targetLocale: Locale = locale === "ko" ? "en" : "ko";
  const segments = pathname?.split("/") ?? [];
  const href =
    pathname && isLocale(segments[1] ?? "")
      ? `/${targetLocale}${pathname.slice(segments[1].length + 1)}`
      : `/${targetLocale}`;

  return (
    <Link className={className} href={href} hrefLang={targetLocale} lang={targetLocale}>
      {children ?? label}
    </Link>
  );
}
