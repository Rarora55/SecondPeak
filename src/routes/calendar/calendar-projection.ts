import type {
  ReleaseTag,
  ResolvedGameRelease,
  SupabaseReleaseIndexRecord
} from "./calendar-types";

export function createSupabaseReleaseIndexRecord(
  release: ResolvedGameRelease,
  sourceUpdatedAt: string
): SupabaseReleaseIndexRecord {
  const platformTagIds = release.tags
    .filter((tag: ReleaseTag) => tag.type === "platform")
    .map((tag) => tag.id);

  return {
    releaseId: release.id,
    releaseSlug: release.slug,
    title: release.title,
    releaseDate: release.releaseDate,
    studioId: release.studioId,
    tagIds: release.tagIds,
    platformTagIds,
    hasSteamUrl: Boolean(release.steamUrl),
    publicationStatus: release.publicationStatus,
    sourceUpdatedAt
  };
}

export function createSupabaseReleaseIndex(
  releases: ResolvedGameRelease[],
  sourceUpdatedAt: string
) {
  return releases.map((release) =>
    createSupabaseReleaseIndexRecord(release, sourceUpdatedAt)
  );
}
