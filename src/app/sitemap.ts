import { listPublicVersions } from "../routes/home/home-version-registry";

export function getSitemapPaths() {
  const homePaths = ["/home", ...listPublicVersions().map((version) => `/home/${version.slug}`)];
  return Array.from(new Set(homePaths));
}

