import type { HomeVersion } from "./home-types";
import mainImage from "../../../ImagesContent/Home/MainImage.jpg";

type ValidationResult = {
  isValid: boolean;
  issues: string[];
};

const SILENCE_ISSUE: HomeVersion = {
  slug: "silence",
  isActive: true,
  publicationTitle: "SecondPeak",
  brandHref: "/home",
  issueNumber: "Issue 01",
  issueDateLabel: "Julio 2026",
  coverTitle: "SILENCE",
  theme: {
    backgroundColor: "#ead8c5",
    textColor: "#1f1c18",
    accentColor: "#b96718",
    titleColor: "rgba(255, 255, 255, 0.42)"
  },
  image: {
    src: mainImage,
    alt: "A weathered sail vehicle crossing a quiet horizon beneath heavy clouds.",
    widthPreference: {
      collapsed: "min(860px, 58vw)",
      expanded: "min(760px, 50vw)",
      narrow: "90vw"
    },
    aspectRatio: "16 / 9",
    treatment: "paper-faded"
  },
  topics: [
    {
      id: "far-lone-sails",
      title: "El silencio de Far: Lone Sails",
      description:
        "Cómo el videojuego enseña preguntas que somos nosotros quienes tendremos que responder.",
      href: "/reviews/far-lone-sails/intro",
      section: "reviews"
    },
    {
      id: "terror-en-2d",
      title: "El terror en 2d",
      description:
        "El viaje a la solución de una mecánica complicada, los rebeldes del teatro.",
      href: "/features/el-terror-en-2d",
      section: "features"
    },
    {
      id: "wych-elm-silver-pines",
      title: "Quiénes son los nuevos",
      description: "Hablamos de Wych Elm y su nuevo juego Silver Pines.",
      href: "/interviews/wych-elm-silver-pines",
      section: "interviews"
    }
  ],
  fallbackHref: "/home",
  seo: {
    title: "SILENCE | SecondPeak",
    description:
      "Issue 01 of SecondPeak opens on a quiet editorial cover and expands into three linked stories about silence, horror, and emerging voices.",
    canonicalPath: "/home/silence"
  }
};

const registry = [SILENCE_ISSUE] as const;

function validateVersion(version: HomeVersion): ValidationResult {
  const issues: string[] = [];
  if (!version.slug.trim()) issues.push("missing slug");
  if (!version.publicationTitle.trim()) issues.push(`missing publicationTitle for ${version.slug}`);
  if (!version.coverTitle.trim()) issues.push(`missing coverTitle for ${version.slug}`);
  if (!version.issueNumber.trim()) issues.push(`missing issueNumber for ${version.slug}`);
  if (!version.issueDateLabel.trim()) issues.push(`missing issueDateLabel for ${version.slug}`);
  if (!version.image.src.trim()) issues.push(`missing image src for ${version.slug}`);
  if (!version.image.alt.trim()) issues.push(`missing image alt for ${version.slug}`);
  if (version.topics.length !== 3) issues.push(`topics must have exactly 3 items for ${version.slug}`);

  for (const topic of version.topics) {
    const requiredFields = ["id", "title", "description", "href", "section"] as const;
    for (const field of requiredFields) {
      if (!String(topic[field] ?? "").trim()) {
        issues.push(`missing ${field} in topic ${topic.id || "<unknown>"} (${version.slug})`);
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
