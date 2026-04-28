import type { ResolvedGameRelease } from "./calendar-types";

export function filterPublicReleases(releases: ResolvedGameRelease[]) {
  return releases.filter((release) => release.publicationStatus === "published");
}

export function filterReleasesByStudio(releases: ResolvedGameRelease[], studioSlug: string | null) {
  if (!studioSlug) {
    return releases;
  }
  return releases.filter((release) => release.studio.slug === studioSlug);
}

export function filterReleasesByTag(releases: ResolvedGameRelease[], tagSlug: string | null) {
  if (!tagSlug) {
    return releases;
  }
  return releases.filter((release) => release.tags.some((tag) => tag.slug === tagSlug));
}

export function resolvePublishedReleaseBySlug(
  releases: ResolvedGameRelease[],
  slug: string | null
) {
  if (!slug) {
    return null;
  }
  return (
    releases.find(
      (release) => release.slug === slug && release.publicationStatus === "published"
    ) ?? null
  );
}
