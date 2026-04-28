import { motion } from "motion/react";
import type { ResolvedGameRelease } from "../calendar-types";
import { ReleaseTags } from "./ReleaseTags";

type ReleaseMiniCardProps = {
  release: ResolvedGameRelease;
  isSelected: boolean;
  onSelect: (release: ResolvedGameRelease) => void;
  activeStudioSlug: string | null;
  activeTagSlug: string | null;
};

export function ReleaseMiniCard({
  release,
  isSelected,
  onSelect,
  activeStudioSlug,
  activeTagSlug
}: ReleaseMiniCardProps) {
  const handleClick = () => {
    onSelect(release);
  };

  return (
    <article className="release-mini-card">
      <motion.button
        layout
        type="button"
        className={`release-mini-button${isSelected ? " is-selected" : ""}`}
        onClick={handleClick}
        data-release-slug={release.slug}
        aria-pressed={isSelected}
        aria-label={`Open release details for ${release.title}`}
      >
        <img
          src={release.thumbnailUrl}
          alt={release.thumbnailAlt}
          className="release-mini-thumb"
          loading="lazy"
        />
        <div className="release-mini-content">
          <h3 className="release-mini-title">{release.title}</h3>
        </div>
      </motion.button>
      <ReleaseTags
        studio={release.studio}
        tags={release.tags}
        activeStudioSlug={activeStudioSlug}
        activeTagSlug={activeTagSlug}
      />
    </article>
  );
}
