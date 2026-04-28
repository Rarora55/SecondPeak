export type ReleaseTagType =
  | "genre"
  | "subgenre"
  | "mechanic"
  | "mood"
  | "platform";

export type PublicationStatus = "draft" | "published" | "archived";

export type SocialLinkKind = "social" | "rss" | "community" | "store" | "other";

export type Studio = {
  id: string;
  name: string;
  slug: string;
};

export type ReleaseTag = {
  id: string;
  name: string;
  slug: string;
  type: ReleaseTagType;
};

export type SocialLink = {
  id: string;
  releaseId: string;
  label: string;
  url: string;
  kind: SocialLinkKind;
};

export type GameRelease = {
  id: string;
  slug: string;
  title: string;
  releaseDate: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  studioId: string;
  tagIds: string[];
  quote: string | null;
  synopsis: string;
  socialLinkIds: string[];
  steamUrl: string | null;
  publicationStatus: PublicationStatus;
};

export type CalendarDayGroup = {
  dayKey: string;
  displayLabel: string;
  releaseIds: string[];
};

export type SupabaseReleaseIndexRecord = {
  releaseId: string;
  releaseSlug: string;
  title: string;
  releaseDate: string;
  studioId: string;
  tagIds: string[];
  platformTagIds: string[];
  hasSteamUrl: boolean;
  publicationStatus: PublicationStatus;
  sourceUpdatedAt: string;
};

export type CalendarSelectionState = {
  selectedGameSlug: string | null;
  selectedReleaseId: string | null;
  viewMode: "timeline_only" | "desktop_master_detail" | "mobile_detail_page";
  isValidSelection: boolean;
};

export type CalendarDataBundle = {
  releases: GameRelease[];
  studios: Studio[];
  tags: ReleaseTag[];
  socialLinks: SocialLink[];
  supabaseIndex: SupabaseReleaseIndexRecord[];
};

export type ResolvedGameRelease = GameRelease & {
  studio: Studio;
  tags: ReleaseTag[];
  socialLinks: SocialLink[];
};
