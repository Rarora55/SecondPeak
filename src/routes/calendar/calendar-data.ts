import type {
  CalendarDataBundle,
  GameRelease,
  ReleaseTag,
  ResolvedGameRelease,
  SocialLink,
  Studio
} from "./calendar-types";
import { createSupabaseReleaseIndex } from "./calendar-projection";

type SanityStudioDoc = Studio;
type SanityTagDoc = ReleaseTag;
type SanitySocialLinkDoc = Omit<SocialLink, "releaseId"> & { releaseSlug: string };
type SanityReleaseDoc = Omit<GameRelease, "socialLinkIds">;

const studios: SanityStudioDoc[] = [
  { id: "studio-supergiant", name: "Supergiant Games", slug: "supergiant-games" },
  { id: "studio-team-cherry", name: "Team Cherry", slug: "team-cherry" },
  { id: "studio-poncle", name: "poncle", slug: "poncle" }
];

const tags: SanityTagDoc[] = [
  { id: "tag-roguelike", name: "Roguelike", slug: "roguelike", type: "genre" },
  { id: "tag-metroidvania", name: "Metroidvania", slug: "metroidvania", type: "genre" },
  { id: "tag-survivor", name: "Survivor", slug: "survivor", type: "subgenre" },
  { id: "tag-soulslike", name: "Soulslike", slug: "soulslike", type: "subgenre" },
  { id: "tag-fast-combat", name: "Fast Combat", slug: "fast-combat", type: "mechanic" },
  { id: "tag-atmospheric", name: "Atmospheric", slug: "atmospheric", type: "mood" },
  { id: "tag-pc", name: "PC", slug: "pc", type: "platform" },
  { id: "tag-switch", name: "Switch", slug: "switch", type: "platform" }
];

const releases: SanityReleaseDoc[] = [
  {
    id: "release-hades-ii-1",
    slug: "hades-ii-1-0",
    title: "Hades II 1.0",
    releaseDate: "2026-05-05",
    thumbnailUrl:
      "https://upload.wikimedia.org/wikipedia/en/0/0c/Hades_2_cover_art.jpeg",
    thumbnailAlt: "Heroic fantasy scene with glowing blades",
    studioId: "studio-supergiant",
    tagIds: ["tag-roguelike", "tag-fast-combat", "tag-pc"],
    quote: "A roguelike sprint where every failed run sharpens the next rebellion.",
    synopsis:
      "The full release reframes each descent as a strategic duel between speed, precision, and improvisation.",
    steamUrl: "https://store.steampowered.com/app/1145350/Hades_II/",
    publicationStatus: "published"
  },
  {
    id: "release-hollow-knight-silksong",
    slug: "hollow-knight-silksong",
    title: "Temtem: Astral Campaign",
    releaseDate: "2026-05-13",
    thumbnailUrl:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/745920/header.jpg?t=1773698361",
    thumbnailAlt: "Dark cavern landscape lit by pale neon",
    studioId: "studio-team-cherry",
    tagIds: ["tag-metroidvania", "tag-soulslike", "tag-atmospheric", "tag-pc", "tag-switch"],
    quote: "A metroidvania climb where motion is both weapon and language.",
    synopsis:
      "Silksong turns vertical traversal into a rhythm game of commitment, map memory, and precise retaliation.",
    steamUrl: "https://store.steampowered.com/app/1030300/Hollow_Knight_Silksong/",
    publicationStatus: "published"
  },
  {
    id: "release-Signalis-Signalis",
    slug: "signalis-II",
    title: "Signalius: Signalis II",
    releaseDate: "2026-05-13",
    thumbnailUrl:
      "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_Signalis_image1600w.jpg",
    thumbnailAlt: "Dark cavern landscape lit by pale neon",
    studioId: "studio-team-cherry",
    tagIds: ["tag-metroidvania", "tag-soulslike", "tag-atmospheric", "tag-pc", "tag-switch"],
    quote: "A metroidvania climb where motion is both weapon and language.",
    synopsis:
      "Silksong turns vertical traversal into a rhythm game of commitment, map memory, and precise retaliation.",
    steamUrl: "https://store.steampowered.com/app/1030300/Hollow_Knight_Silksong/",
    publicationStatus: "published"
  },
  {
    id: "release-vampire-survivors-campaign",
    slug: "vampire-survivors-astral-campaign",
    title: "Vampire Survivors: Astral Campaign",
    releaseDate: "2026-05-12",
    thumbnailUrl:
      "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/2x1_NSwitchDS_VampireSurvivors.jpg",
    thumbnailAlt: "Pixel-like nebula colors against a black background",
    studioId: "studio-poncle",
    tagIds: ["tag-survivor", "tag-roguelike", "tag-pc"],
    quote: "A survivor surge where chaos is tuned into choreography.",
    synopsis:
      "New progression arcs and enemy swarms push build-crafting into a constant risk-reward puzzle.",
    steamUrl: null,
    publicationStatus: "published"
  }
];

const socialLinks: SanitySocialLinkDoc[] = [
  {
    id: "social-hades-devlog",
    label: "Devlog RSS",
    url: "https://www.supergiantgames.com/feed",
    kind: "rss",
    releaseSlug: "hades-ii-1-0"
  },
  {
    id: "social-hades-x",
    label: "X / Twitter",
    url: "https://x.com/SupergiantGames",
    kind: "social",
    releaseSlug: "hades-ii-1-0"
  },
  {
    id: "social-silksong-site",
    label: "Official Site",
    url: "https://www.teamcherry.com.au/",
    kind: "community",
    releaseSlug: "hollow-knight-silksong"
  },
  {
    id: "social-vs-news",
    label: "News Feed",
    url: "https://poncle.games/news/",
    kind: "rss",
    releaseSlug: "vampire-survivors-astral-campaign"
  }
];

function mapSanityToResolvedReleases(): ResolvedGameRelease[] {
  const studioById = new Map(studios.map((studio) => [studio.id, studio]));
  const tagById = new Map(tags.map((tag) => [tag.id, tag]));
  const socialBySlug = new Map<string, SanitySocialLinkDoc[]>();

  for (const link of socialLinks) {
    const existing = socialBySlug.get(link.releaseSlug);
    if (existing) {
      existing.push(link);
    } else {
      socialBySlug.set(link.releaseSlug, [link]);
    }
  }

  return releases.map((release) => {
    const studio = studioById.get(release.studioId);
    if (!studio) {
      throw new Error(`Missing studio reference for release ${release.slug}`);
    }

    const resolvedTags = release.tagIds.map((id) => {
      const tag = tagById.get(id);
      if (!tag) {
        throw new Error(`Missing tag reference ${id} for release ${release.slug}`);
      }
      return tag;
    });

    const releaseSocial = (socialBySlug.get(release.slug) ?? []).map((link) => ({
      id: link.id,
      releaseId: release.id,
      label: link.label,
      url: link.url,
      kind: link.kind
    }));

    return {
      ...release,
      studio,
      tags: resolvedTags,
      socialLinks: releaseSocial,
      socialLinkIds: releaseSocial.map((link) => link.id)
    };
  });
}

export async function loadCalendarData(): Promise<CalendarDataBundle & { resolvedReleases: ResolvedGameRelease[] }> {
  const resolvedReleases = mapSanityToResolvedReleases();
  const sourceUpdatedAt = new Date().toISOString();
  const normalizedReleases = resolvedReleases.map(
    ({ studio, tags: resolvedTags, socialLinks, ...release }) => release
  );

  return {
    releases: normalizedReleases,
    studios,
    tags,
    socialLinks: resolvedReleases.flatMap((release) => release.socialLinks),
    supabaseIndex: createSupabaseReleaseIndex(resolvedReleases, sourceUpdatedAt),
    resolvedReleases
  };
}
