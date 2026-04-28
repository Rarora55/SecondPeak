import type { ResolvedGameRelease } from "../calendar-types";
import { ReleaseTags } from "./ReleaseTags";

type ReleaseDetailPanelProps = {
  release: ResolvedGameRelease;
  activeStudioSlug: string | null;
  activeTagSlug: string | null;
};

export function ReleaseDetailPanel({
  release,
  activeStudioSlug,
  activeTagSlug
}: ReleaseDetailPanelProps) {
  return (
    <article className="release-detail-panel" aria-labelledby="release-detail-title">
      <img
        src={release.thumbnailUrl}
        alt={release.thumbnailAlt}
        className="release-detail-image"
        loading="lazy"
      />
      <div className="release-detail-body">
        <p className="release-detail-date">{release.releaseDate}</p>
        <h2 id="release-detail-title" className="release-detail-title">
          {release.title}
        </h2>

        <ReleaseTags
          studio={release.studio}
          tags={release.tags}
          activeStudioSlug={activeStudioSlug}
          activeTagSlug={activeTagSlug}
        />

        {release.quote ? <blockquote className="release-detail-quote">“{release.quote}”</blockquote> : null}

        <p className="release-detail-synopsis">{release.synopsis}</p>

        <div className="release-social-links">
          <h3>Social and RSS</h3>
          {release.socialLinks.length > 0 ? (
            <ul>
              {release.socialLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No social links published yet.</p>
          )}
        </div>

        {release.steamUrl ? (
          <a
            href={release.steamUrl}
            target="_blank"
            rel="noreferrer"
            className="release-steam-cta"
          >
            View on Steam
          </a>
        ) : (
          <p className="release-steam-pending">Steam page coming soon.</p>
        )}
      </div>
    </article>
  );
}
