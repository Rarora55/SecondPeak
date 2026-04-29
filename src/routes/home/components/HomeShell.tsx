import type { CSSProperties } from "react";
import type { HomeVersion } from "../home-types";
import { HomeFooterStrip } from "./HomeFooterStrip";
import { HomeGrid } from "./HomeGrid";

type HomeShellProps = {
  version: HomeVersion | null;
};

export function HomeShell({ version }: HomeShellProps) {
  if (!version) {
    return (
      <section className="home-page" aria-label="Editorial home">
        <div className="home-grid">
          <article className="home-fallback" aria-live="polite">
            <h1>Version not found</h1>
            <p>The requested issue is unavailable.</p>
            <a href="/home" className="home-fallback-link">
              Go to current issue
            </a>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section
      className="home-page"
      aria-label={`Editorial home: ${version.title}`}
      style={
        {
          "--home-accent": version.theme.accentColor,
          "--home-bg": version.theme.backgroundColor,
          "--home-fg": version.theme.textColor
        } as CSSProperties
      }
    >
      <HomeGrid version={version} />
      <HomeFooterStrip version={version} />
    </section>
  );
}
