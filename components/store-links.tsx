import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { appStoreUrl, playStoreUrl } from "@/lib/site";

// Unmodified official artwork; preserve aspect ratios, clear space, and App Store first.
// Apple: https://developer.apple.com/app-store/marketing/guidelines/
// Google: https://partnermarketinghub.withgoogle.com/brands/google-play/google-play/lockups-icons-badges/?folder=86718
export function StoreLinks({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <div className="store-links">
      {appStoreUrl && (
        <a className="store-link" href={appStoreUrl}>
          <Image
            src={`/store-badges/app-store-${locale}.svg`}
            alt={dict.closing.appStore}
            width={locale === "ko" ? 129.70071 : 119.66407}
            height={40}
            unoptimized
          />
        </a>
      )}
      {playStoreUrl && (
        <a className="store-link" href={playStoreUrl}>
          <Image
            src={`/store-badges/google-play-${locale}.svg`}
            alt={dict.closing.playStore}
            width={238.96}
            height={70.87}
            unoptimized
          />
        </a>
      )}
    </div>
  );
}
