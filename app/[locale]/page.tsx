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

// The three states step down the page as they decay. The offset is the content:
// a foothold that has been left twice is further down than one nobody has left.
// Mobile drops the offsets and reads as a plain sequence.
const footholdDrop = ["", "sm:mt-20", "sm:mt-40"];

const contactHref = "mailto:ydm2790@gmail.com?subject=Ttush%20Push";

/**
 * The page's one action, and therefore its one button shape.
 *
 * Radius is 0 here and everywhere else on the page: the game's world is cut
 * stone and the board is square, so a rounded control would be the only soft
 * edge on the site. Off-white on the page's own near-black rather than a third
 * accent, since azure and ember are already spoken for by the two teams.
 */
function JoinCta({ label }: { label: string }) {
  return (
    <a
      href={contactHref}
      className="inline-block bg-ink px-7 py-3.5 font-semibold text-void transition-transform active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      {label}
    </a>
  );
}

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
        // Static object, no user input. The standard Next.js JSON-LD pattern.
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

        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-14 pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-20 lg:pb-24 lg:pt-24">
          <div className="max-w-xl">
            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-[-0.035em] sm:text-5xl lg:text-[3.4rem]">
              {dict.hero.tagline}
            </h1>
            <p className="mt-6 max-w-[42ch] text-pretty text-lg leading-relaxed text-ink-dim">
              {dict.hero.sub}
            </p>
            <div className="mt-9">
              <JoinCta label={dict.hero.cta} />
            </div>
          </div>

          <figure className="m-0">
            <BoardReplay label={dict.hero.boardAlt} stillLabel={dict.hero.boardStill} />
            <figcaption className="mt-5 text-center text-sm text-ink-dim">
              {dict.hero.boardCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* The foothold vocabulary the rules depend on, arranged as the descent
          it describes rather than as three equal columns. */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24 lg:py-28">
        <h2 className="max-w-[24ch] text-balance text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
          {dict.footholds.title}
        </h2>
        <p className="mt-5 max-w-[52ch] text-pretty leading-relaxed text-ink-dim">
          {dict.footholds.sub}
        </p>
        <ol className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {dict.footholds.states.map((state, i) => (
            <li key={state.name} className={`flex flex-col items-start ${footholdDrop[i]}`}>
              <Image
                src={footholdArt[i]}
                alt=""
                width={512}
                height={512}
                sizes="(max-width: 640px) 46vw, 240px"
                className="w-40 sm:w-full sm:max-w-[220px]"
              />
              <h3 className="mt-6 font-semibold">{state.name}</h3>
              <p className="mt-1.5 max-w-[30ch] text-sm leading-relaxed text-ink-dim">
                {state.desc}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Rules. Reference material, so the heading is smaller than its
          neighbours and the two groups carry one hairline each rather than a
          border under every row. */}
      <section className="border-t border-edge">
        <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:py-28">
          <h2 className="text-xl font-semibold tracking-[-0.01em] sm:text-2xl">
            {dict.rules.title}
          </h2>
          <div className="mt-10 grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            {dict.rules.groups.map((group) => (
              <div key={group.name}>
                {/* The group name recedes rather than competing: the hairline
                    above it already marks the boundary, and one white heading
                    per section is what makes that heading findable. */}
                <h3 className="border-t border-edge pt-4 text-sm font-medium text-ink-dim">
                  {group.name}
                </h3>
                <ul className="mt-6 space-y-6">
                  {group.items.map((rule) => (
                    <li
                      key={rule}
                      className="max-w-[58ch] text-pretty text-[0.9375rem] leading-relaxed text-ink-dim"
                    >
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-16 max-w-[62ch] text-pretty border-l-2 border-azure-ink/40 pl-5 text-[0.9375rem] leading-relaxed text-ink-dim">
            {dict.rules.engine}
          </p>
        </div>
      </section>

      {/* Explorers. The whole four-direction sprite set runs edge to edge,
          because the facing is a real rule and the art is the argument. */}
      <section className="border-t border-edge py-24 lg:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
            {dict.explorers.title}
          </h2>
          <p className="mt-5 max-w-[58ch] text-pretty leading-relaxed text-ink-dim">
            {dict.explorers.sub}
          </p>
        </div>
        <div className="mx-auto mt-16 grid w-full max-w-[1500px] grid-cols-1 gap-12 px-6 sm:grid-cols-2 sm:gap-0">
          {dict.explorers.teams.map((team, i) => (
            <div key={team.name}>
              <div className="grid grid-cols-4" aria-hidden>
                {facings.map((facing) => (
                  <Image
                    key={facing}
                    src={`/board/${teamIds[i]}-${facing}.png`}
                    alt=""
                    width={512}
                    height={512}
                    sizes="(max-width: 640px) 25vw, 19vw"
                    className="h-auto w-full"
                  />
                ))}
              </div>
              <h3
                className={`mt-5 border-t pt-4 font-semibold ${
                  teamIds[i] === "azure"
                    ? "border-azure-ink/45 text-azure-ink"
                    : "border-ember-ink/45 text-ember-ink"
                }`}
              >
                {team.name}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{team.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The page ends where it opened, in the ruins. One statement, one
          action, and the same label the hero used. */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/sky/air-ruins-twilight.png"
          alt=""
          fill
          sizes="100vw"
          // A higher crop than the hero's, so the bookend is the same place
          // seen from further up rather than the same picture again.
          className="-z-10 object-cover object-[center_18%]"
        />
        <div
          // Opens and closes on the page's own ground so the section joins the
          // rules above and the footer below without a tonal seam.
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--void),rgba(11,13,18,0.5)_42%,var(--void))]"
          aria-hidden
        />
        <div className="mx-auto w-full max-w-6xl px-6 py-28 lg:py-36">
          <h2 className="max-w-[20ch] text-balance text-4xl font-bold leading-[1.12] tracking-[-0.03em] sm:text-5xl">
            {dict.closing.title}
          </h2>
          <p className="mt-6 max-w-[48ch] text-pretty text-lg leading-relaxed text-ink-dim">
            {dict.closing.status}
          </p>
          <div className="mt-10">
            <JoinCta label={dict.closing.cta} />
          </div>
        </div>
      </section>
    </main>
  );
}
