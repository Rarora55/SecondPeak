import type { HomeVersion } from "../home-types";

type HomeGridProps = {
  version: HomeVersion;
};

export function HomeGrid({ version }: HomeGridProps) {
  return <div className="home-grid-legacy" data-home-version={version.slug} hidden />;
}
