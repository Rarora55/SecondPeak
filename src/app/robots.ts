import { getSitemapPaths } from "./sitemap";

export function getRobotsRules() {
  const allowedHomePaths = getSitemapPaths();
  return {
    userAgent: "*",
    allow: allowedHomePaths
  };
}
