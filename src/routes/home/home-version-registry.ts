import type { HomeTile, HomeVersion } from "./home-types";

type ValidationResult = {
  isValid: boolean;
  issues: string[];
};

const FAR_LONE_SAILS: HomeVersion = {
  slug: "far-lone-sails",
  isActive: true,
  title: "Far: Lone Sails",
  issueNumber: "Issue 05",
  season: "Spring",
  month: "April",
  year: 2026,
  footerText: "Where motion becomes memory.",
  theme: {
    accentColor: "#000000",
    backgroundColor: "#ffffff",
    textColor: "#000000"
  },
  mainFeature: {
    coverLabel: "Cover Story",
    title: "Far: Lone Sails",
    subtitle: "A silent odyssey across a rusted horizon.",
    imageSrc: "/images/home/far-lone-sails-main.jpg",
    imageAlt: "Vehicle crossing a desolate landscape in Far: Lone Sails",
    href: "/reviews/far-lone-sails/intro"
  },
  leftTiles: [
    makeTile("far-gameplay", "Review", "Gameplay", "/reviews/far-lone-sails/gameplay"),
    makeTile("far-art", "Review", "Art Direction", "/reviews/far-lone-sails/art-direction"),
    makeTile("far-conclusion", "Review", "Conclusion", "/reviews/far-lone-sails/conclusion")
  ],
  rightTiles: [
    makeTile("features", "Desk", "Features", "/features"),
    makeTile("interviews", "Desk", "Interviews", "/interviews"),
    makeTile("manifesto", "Editorial", "Manifesto", "/manifesto")
  ]
};

const SIGNALIS: HomeVersion = {
  slug: "signalis",
  isActive: false,
  title: "Signalis",
  issueNumber: "Issue 04",
  season: "Winter",
  month: "February",
  year: 2026,
  footerText: "Echoes from the red corridor.",
  theme: {
    accentColor: "#a00f17",
    backgroundColor: "#f8f3f3",
    textColor: "#1f1212"
  },
  mainFeature: {
    coverLabel: "Archive Cover",
    title: "Signalis",
    subtitle: "Memory, horror, and repetition in orbit.",
    imageSrc: "/images/home/signalis-main.jpg",
    imageAlt: "Red-lit corridor inspired by Signalis visual identity",
    href: "/features"
  },
  leftTiles: [
    makeTile("signalis-structure", "Analysis", "Narrative Structure", "/features"),
    makeTile("signalis-tone", "Analysis", "Tone and Atmosphere", "/features"),
    makeTile("signalis-legacy", "Analysis", "Legacy", "/features")
  ],
  rightTiles: [
    makeTile("signalis-calendar", "Discover", "Release Calendar", "/calendar"),
    makeTile("signalis-contact", "Community", "Contact", "/contact"),
    makeTile("signalis-manifesto", "Editorial", "Manifesto", "/manifesto")
  ]
};

const registry = [FAR_LONE_SAILS, SIGNALIS] as const;

function makeTile(id: string, label: string, title: string, href: string): HomeTile {
  return {
    id,
    label,
    title,
    href,
    imageSrc: "/images/home/tile-placeholder.jpg",
    imageAlt: `${title} section tile`
  };
}

function validateVersion(version: HomeVersion): ValidationResult {
  const issues: string[] = [];
  if (!version.slug.trim()) issues.push("missing slug");
  if (!version.title.trim()) issues.push(`missing title for ${version.slug}`);
  if (!version.mainFeature.imageAlt.trim()) issues.push(`missing main alt for ${version.slug}`);
  if (version.leftTiles.length !== 3) issues.push(`leftTiles must have exactly 3 items for ${version.slug}`);
  if (version.rightTiles.length !== 3) issues.push(`rightTiles must have exactly 3 items for ${version.slug}`);

  const requiredTileFields = ["id", "label", "title", "imageSrc", "imageAlt", "href"] as const;
  for (const tile of [...version.leftTiles, ...version.rightTiles]) {
    for (const field of requiredTileFields) {
      if (!String(tile[field] ?? "").trim()) {
        issues.push(`missing ${field} in tile ${tile.id || "<unknown>"} (${version.slug})`);
      }
    }
  }

  return { isValid: issues.length === 0, issues };
}

function collectRegistryIssues(): string[] {
  const issues: string[] = [];
  const slugSet = new Set<string>();
  let activeCount = 0;

  for (const version of registry) {
    if (slugSet.has(version.slug)) {
      issues.push(`duplicate slug: ${version.slug}`);
    }
    slugSet.add(version.slug);
    if (version.isActive) activeCount += 1;
    const result = validateVersion(version);
    issues.push(...result.issues);
  }

  if (activeCount !== 1) {
    issues.push(`expected exactly one active version, found ${activeCount}`);
  }

  return issues;
}

export function getRegistryDiagnostics(): string[] {
  return collectRegistryIssues();
}

function isValidVersion(version: HomeVersion): boolean {
  return validateVersion(version).isValid;
}

export function listPublicVersions(): HomeVersion[] {
  return registry.filter(isValidVersion);
}

export function getVersionBySlug(slug: string): HomeVersion | null {
  const version = registry.find((item) => item.slug === slug);
  if (!version || !isValidVersion(version)) {
    return null;
  }
  return version;
}

export function getActiveVersion(): HomeVersion | null {
  const diagnostics = collectRegistryIssues();
  if (diagnostics.length > 0) {
    if (import.meta.env.DEV) {
      console.warn("[home-version-registry] validation issues", diagnostics);
    }
    return null;
  }

  const active = registry.find((item) => item.isActive);
  return active && isValidVersion(active) ? active : null;
}

