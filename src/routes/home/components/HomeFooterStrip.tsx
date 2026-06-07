import type { HomeVersion } from "../home-types";

type HomeFooterStripProps = {
  version: HomeVersion;
};

export function HomeFooterStrip({ version }: HomeFooterStripProps) {
  return <footer className="home-footer-strip-legacy" data-home-version={version.slug} hidden />;
}
