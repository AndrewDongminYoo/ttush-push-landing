import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Locale } from "@/lib/i18n";

/**
 * Legal text stays Markdown and gets its heading hierarchy from the `.policy`
 * block in `app/globals.css`. Tailwind's preflight strips heading styles, and
 * this project does not carry the typography plugin, so the styles have to be
 * written somewhere — this is that somewhere.
 */
export async function PolicyLayout({ locale, doc }: { locale: Locale; doc: "privacy" }) {
  const markdown = await fs.readFile(
    path.join(process.cwd(), "content", "legal", `${doc}.${locale}.md`),
    "utf8"
  );
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16 pt-16">
      <Link
        href={`/${locale}`}
        className="text-sm text-ink-dim underline-offset-4 hover:text-ink hover:underline"
      >
        Ttush Push
      </Link>
      <article className="policy mt-10">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>
    </main>
  );
}
