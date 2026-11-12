import type { Dictionary } from "@/lib/dictionaries";
import { appStoreUrl, playStoreUrl } from "@/lib/site";

export function StoreLinks({ dict }: { dict: Dictionary }) {
  return (
    <div className="store-links">
      {appStoreUrl && (
        <a className="store-link" href={appStoreUrl}>
          <span>
            <small>{dict.landing.storePrompt}</small>
            <strong>App Store</strong>
          </span>
          <span aria-hidden="true">↗</span>
          <span className="sr-only">{dict.closing.appStore}</span>
        </a>
      )}
      {playStoreUrl && (
        <a className="store-link" href={playStoreUrl}>
          <span>
            <small>{dict.landing.storePrompt}</small>
            <strong>Google Play</strong>
          </span>
          <span aria-hidden="true">↗</span>
          <span className="sr-only">{dict.closing.playStore}</span>
        </a>
      )}
    </div>
  );
}
