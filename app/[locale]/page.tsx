import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BoardReplay } from "@/components/board-replay";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";
import { ogImage, siteUrl } from "@/lib/site";

const facings = ["up", "left", "right", "down"] as const;
const teamIds = ["azure", "ember"] as const;

const footholdArt = [
  "/board/foothold-intact.png",
  "/board/foothold-damaged.png",
  "/board/foothold-hole.png",
];

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
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Ttush Push",
    description: dict.meta.description,
    url: new URL(`/${locale}`, siteUrl).toString(),
    image: new URL(ogImage.path, siteUrl).toString(),
    inLanguage: ["ko", "en"],
    genre: "Abstract strategy",
    gamePlatform: ["Android"],
    numberOfPlayers: { "@type": "QuantitativeValue", value: 2 },
    applicationCategory: "Game",
    author: { "@type": "Person", name: "Dongmin Yu", email: "ydm2790@gmail.com" },
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        // Static object, no user input — the standard Next.js JSON-LD pattern.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero. The board is the argument: three moves of a real round, played
          on the app's own sky. Nothing else on the page moves. */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/sky/air-ruins-twilight.png"
          alt=""
          fill
          priority
          sizes="100vw"
          // The horizon sits about two thirds down the painting; pulling the
          // crop to it keeps the warm band of cloud in frame at every height.
          className="-z-10 object-cover object-[center_62%]"
        />
        {/* Two scrims, each doing one job: the vertical one hands the section
            off to the page below, the horizontal one buys contrast for the
            headline without dimming the sky behind the board. */}
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(11,13,18,0.45),rgba(11,13,18,0.1)_38%,rgba(11,13,18,0.8)_86%,var(--void))]"
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(11,13,18,0.3),rgba(11,13,18,0.05))] lg:bg-[linear-gradient(to_right,rgba(11,13,18,0.86),rgba(11,13,18,0.28)_48%,transparent_72%)]"
          aria-hidden
        />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 pb-16 pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-20 lg:pb-20 lg:pt-28">
          <div className="max-w-xl">
            <h1 className="text-[2.6rem] font-bold leading-[1.08] tracking-[-0.035em] sm:text-6xl">
              {dict.hero.tagline}
            </h1>
            <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-ink-dim">
              {dict.hero.sub}
            </p>
          </div>

          <figure className="m-0">
            <BoardReplay label={dict.hero.boardAlt} stillLabel={dict.hero.boardStill} />
            <figcaption className="mt-5 text-center text-sm text-ink-dim">
              {dict.hero.boardCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* The foothold vocabulary the rules below depend on, shown with the
          sprites the game actually draws. */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-24">
        <h2 className="text-3xl font-semibold tracking-[-0.02em]">{dict.footholds.title}</h2>
        <p className="mt-4 max-w-[58ch] leading-relaxed text-ink-dim">{dict.footholds.sub}</p>
        <ul className="mt-12 grid gap-10 sm:grid-cols-3">
          {dict.footholds.states.map((state, i) => (
            <li key={state.name} className="flex flex-col items-start gap-4">
              <Image
                src={footholdArt[i]}
                alt=""
                width={512}
                height={512}
                sizes="(max-width: 640px) 42vw, 200px"
                className="w-36 sm:w-44"
              />
              <div>
                <h3 className="font-semibold">{state.name}</h3>
                <p className="mt-1 max-w-[34ch] text-sm leading-relaxed text-ink-dim">
                  {state.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Rules. Separate statements, not a sequence — a hairline between each,
          no step numbers. */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20 lg:pb-24">
        <h2 className="text-3xl font-semibold tracking-[-0.02em]">{dict.rules.title}</h2>
        <ul className="mt-8 grid gap-x-14 lg:grid-cols-2">
          {dict.rules.items.map((rule) => (
            <li
              key={rule}
              className="border-t border-edge py-5 text-[0.9375rem] leading-relaxed text-ink-dim"
            >
              {rule}
            </li>
          ))}
        </ul>
      </section>

      {/* Explorers. Four directions each, which is the whole sprite set — the
          turnaround is the point, so the row is the illustration. */}
      <section className="border-t border-edge">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-24">
          <h2 className="text-3xl font-semibold tracking-[-0.02em]">{dict.explorers.title}</h2>
          <p className="mt-4 max-w-[58ch] leading-relaxed text-ink-dim">{dict.explorers.sub}</p>
          <div className="mt-14 grid gap-14 sm:grid-cols-2">
            {dict.explorers.teams.map((team, i) => (
              <div key={team.name}>
                {/* A grid rather than a flex row: the four cells hold their
                    width while the sprites are still loading, so the row does
                    not reflow underneath the reader. */}
                <div className="grid grid-cols-4 items-end gap-2" aria-hidden>
                  {facings.map((facing) => (
                    <Image
                      key={facing}
                      src={`/board/${teamIds[i]}-${facing}.png`}
                      alt=""
                      width={512}
                      height={512}
                      sizes="(max-width: 640px) 22vw, 120px"
                      className="h-auto w-full"
                    />
                  ))}
                </div>
                <h3
                  className={`mt-6 border-t pt-5 font-semibold ${
                    teamIds[i] === "azure"
                      ? "border-azure-ink/45 text-azure-ink"
                      : "border-ember-ink/45 text-ember-ink"
                  }`}
                >
                  {team.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-dim">{team.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two closing statements, both quiet: what decides the rules, and what
          a visitor can actually do today. */}
      <section className="border-t border-edge">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <h2 className="text-xl font-semibold">{dict.engine.title}</h2>
            <p className="mt-4 max-w-[54ch] leading-relaxed text-ink-dim">{dict.engine.body}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{dict.status.title}</h2>
            <p className="mt-4 max-w-[54ch] leading-relaxed text-ink-dim">{dict.status.body}</p>
            <a
              className="mt-6 inline-block border-b border-brass/60 pb-1 text-brass transition-colors hover:border-brass"
              href="mailto:ydm2790@gmail.com?subject=Ttush%20Push"
            >
              {dict.status.contactLabel}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
