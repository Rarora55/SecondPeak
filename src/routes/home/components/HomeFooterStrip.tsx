import type { HomeVersion } from "../home-types";

type HomeFooterStripProps = {
  version: HomeVersion;
};

export function HomeFooterStrip({ version }: HomeFooterStripProps) {
  return (
    <footer className="home-footer-strip" aria-label="Issue metadata">
      <p className="home-footer-meta">
        {version.issueNumber} · {version.season} {version.month} {version.year}
      </p>
      <p className="home-footer-slogan">{version.footerText}</p>
    </footer>
  );
}

