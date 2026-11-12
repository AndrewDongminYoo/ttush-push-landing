import Image from "next/image";
import Link from "next/link";
import appIcon from "@/app/icon.png";
import { BoardReplay } from "@/components/board-replay";
import { LanguageSwitch } from "@/components/language-switch";
import { StoreLinks } from "@/components/store-links";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export function LandingHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <header className="landing-header">
      <div className="landing-container header-inner">
        <Link className="brand" href={`/${locale}`} aria-label="Ttush Push">
          <Image src={appIcon} alt="" width={38} height={38} />
          <span>
            ttush<span className="brand-light">push</span>
            <span className="brand-period">.</span>
          </span>
        </Link>
        <nav className="main-nav" aria-label={dict.landing.navigation}>
          <a href="#about">{dict.landing.nav.about}</a>
          <a href="#how-to-play">{dict.landing.nav.how}</a>
          <a href="#faq">{dict.landing.nav.faq}</a>
        </nav>
        <div className="header-actions">
          <LanguageSwitch locale={locale} label={dict.footer.language} className="language-link">
            <span aria-hidden="true">◎</span> {dict.landing.languageShort}
          </LanguageSwitch>
          <a className="button button-small" href="#stores">
            {dict.landing.nav.download}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function LandingHero({ dict }: { dict: Dictionary }) {
  return (
    <>
      <section className="landing-hero" id="about" aria-labelledby="hero-title">
        <Image
          src="/sky/air-ruins-twilight.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className="hero-sky"
        />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="landing-container hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">
              {dict.landing.heroLines[0]}
              <br />
              {dict.landing.heroLines[1]}
            </h1>
            <p className="hero-lead">{dict.hero.sub}</p>
            <div className="hero-actions">
              <a className="button" href="#stores">
                {dict.hero.cta}
                <span aria-hidden="true">↗</span>
              </a>
              <a className="text-action" href="#how-to-play">
                <span className="play-symbol" aria-hidden="true">
                  ▷
                </span>
                {dict.landing.nav.how}
              </a>
            </div>
            <p className="hero-platforms">{dict.landing.platforms}</p>
          </div>
          <figure className="hero-board">
            <BoardReplay
              label={dict.hero.boardAlt}
              stillLabel={dict.hero.boardStill}
              controls={dict.landing.replay}
            />
            <figcaption>{dict.hero.boardCaption}</figcaption>
          </figure>
        </div>
        <div className="hero-bottom landing-container">
          <span>Ttush Push</span>
          <a href="#how-to-play">
            {dict.landing.discover}
            <span aria-hidden="true">↓</span>
          </a>
          <span>{dict.landing.genre}</span>
        </div>
      </section>
      <div className="game-facts">
        <ul className="landing-container facts-inner">
          {dict.landing.facts.map((fact) => (
            <li key={fact.title}>
              <strong>{fact.title}</strong>
              <span>{fact.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function GameGuide({ dict }: { dict: Dictionary }) {
  return (
    <section
      className="landing-container guide-section"
      id="how-to-play"
      aria-labelledby="guide-title"
    >
      <div className="section-intro">
        <h2 id="guide-title">
          {dict.landing.guideTitle[0]}
          <br />
          {dict.landing.guideTitle[1]}
        </h2>
        <p>{dict.landing.guideIntro}</p>
      </div>
      <div className="terrain-story">
        <div className="terrain-copy">
          <h3>{dict.landing.terrainTitle}</h3>
          <p>{dict.footholds.sub}</p>
          <div className="move-legend">
            <span>
              <i className="move-dot" aria-hidden="true" />
              {dict.landing.moveLabel}
            </span>
            <span>
              <i className="push-ring" aria-hidden="true" />
              {dict.landing.pushLabel}
            </span>
          </div>
          <p className="legend-note">{dict.landing.legendNote}</p>
        </div>
        <ol className="terrain-sequence">
          {dict.footholds.states.map((state, index) => (
            <li key={state.name}>
              <Image
                src={`/board/foothold-${["intact", "damaged", "hole"][index]}.png`}
                alt=""
                width={512}
                height={512}
                sizes="(max-width: 700px) 28vw, 200px"
              />
              <h4>{state.name}</h4>
              <p>{state.desc}</p>
              {index < 2 && (
                <span className="terrain-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <div className="winning-story">
        <div className="win-art" aria-hidden="true">
          <Image
            src="/board/foothold-intact.png"
            alt=""
            width={512}
            height={512}
            className="win-tile"
            sizes="220px"
          />
          <Image
            src="/board/azure-right.png"
            alt=""
            width={512}
            height={512}
            className="win-explorer"
            sizes="220px"
          />
          <Image
            src="/board/foothold-hole.png"
            alt=""
            width={512}
            height={512}
            className="win-hole"
            sizes="200px"
          />
          <span className="win-arrow">→</span>
        </div>
        <div className="win-copy">
          <h3>{dict.landing.winTitle}</h3>
          <p>{dict.landing.winBody}</p>
          <p className="win-condition">{dict.landing.winCondition}</p>
        </div>
      </div>
      <details className="full-rules">
        <summary>
          {dict.landing.detailedRules}
          <span aria-hidden="true">+</span>
        </summary>
        <div className="rules-columns">
          {dict.rules.groups.map((group) => (
            <div key={group.name}>
              <h3>{group.name}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="rules-engine">{dict.rules.engine}</p>
      </details>
    </section>
  );
}

export function Opponents({ dict }: { dict: Dictionary }) {
  return (
    <section className="opponents-section" aria-labelledby="opponents-title">
      <div className="landing-container opponents-grid">
        <div className="opponents-heading">
          <h2 id="opponents-title">
            {dict.landing.opponentsTitle[0]}
            <br />
            {dict.landing.opponentsTitle[1]}
          </h2>
          <p>{dict.landing.opponentsIntro}</p>
          <div className="expeditions" aria-hidden="true">
            <Image src="/board/azure-down.png" alt="" width={512} height={512} sizes="160px" />
            <span>{dict.landing.versus}</span>
            <Image src="/board/ember-down.png" alt="" width={512} height={512} sizes="160px" />
          </div>
          <div className="team-names">
            <span>{dict.landing.teams[0]}</span>
            <span>{dict.landing.teams[1]}</span>
          </div>
        </div>
        <div className="opponent-options">
          <article>
            <div className="option-heading">
              <h3>{dict.landing.localTitle}</h3>
              <span>{dict.landing.localTag}</span>
            </div>
            <p>{dict.landing.localBody}</p>
          </article>
          <article>
            <div className="option-heading">
              <h3>{dict.landing.aiTitle}</h3>
              <span>{dict.landing.aiTag}</span>
            </div>
            <p>{dict.landing.aiBody}</p>
            <ul className="difficulty-list">
              {dict.landing.difficulties.map((level, i) => (
                <li key={level}>
                  <span className="difficulty-bars" aria-hidden="true">
                    {[0, 1, 2, 3].map((bar) => (
                      <i key={bar} className={bar <= i ? "lit" : ""} />
                    ))}
                  </span>
                  {level}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

export function GameFaq({ dict }: { dict: Dictionary }) {
  return (
    <section className="landing-container faq-section" id="faq" aria-labelledby="faq-title">
      <div>
        <h2 id="faq-title">{dict.landing.faqTitle}</h2>
        <p>{dict.landing.faqIntro}</p>
        <a className="text-action" href="mailto:ydm2790@gmail.com">
          {dict.footer.contact}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="faq-list">
        {dict.landing.questions.map((question) => (
          <details key={question.question}>
            <summary>
              {question.question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{question.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function DownloadSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section className="download-section" id="stores" aria-labelledby="download-title">
      <Image
        src="/sky/air-ruins-twilight.png"
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        className="download-sky"
      />
      <div className="download-scrim" aria-hidden="true" />
      <div className="landing-container download-inner">
        <Image src={appIcon} alt="" width={76} height={76} />
        <h2 id="download-title">{dict.landing.downloadTitle}</h2>
        <p>{dict.landing.downloadBody}</p>
        <StoreLinks dict={dict} locale={locale} />
        <p className="download-note">{dict.landing.downloadNote}</p>
      </div>
    </section>
  );
}
