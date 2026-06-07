import type { CSSProperties } from "react";
import type { HomeVersion } from "../home-types";
import { HomeCoverHero } from "./HomeCoverHero";

type HomeShellProps = {
  version: HomeVersion | null;
};

export function HomeShell({ version }: HomeShellProps) {
  if (!version) {
    return (
      <section className="home-cover-page" aria-label="Editorial home">
        <div className="home-cover-stage home-cover-stage-fallback">
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
      className="home-cover-page home-cover-shell"
      aria-label={`Editorial home: ${version.coverTitle}`}
      style={
        {
          "--home-accent": version.theme.accentColor,
          "--home-bg": version.theme.backgroundColor,
          "--home-fg": version.theme.textColor,
          "--home-title-color": version.theme.titleColor
        } as CSSProperties
      }
    >
      <HomeCoverHero version={version} />
    </section>
  );
}
