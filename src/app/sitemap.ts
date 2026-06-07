import { listPublicVersions } from "../routes/home/home-version-registry";
import { listSectionArticlePaths } from "../routes/sections/section-article-registry";

export function getSitemapPaths() {
  const homePaths = ["/home", ...listPublicVersions().map((version) => `/home/${version.slug}`)];
  return Array.from(new Set([...homePaths, ...listSectionArticlePaths()]));
}
