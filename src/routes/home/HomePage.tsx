import { useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import type { SiteLayoutOutletContext } from "../../app/shell/SiteLayout";
import { homeLayout } from "./home-data";

const HOME_FOOTER_TRIGGER_START = 0.9;

function getHomeScrollProgress(homePageElement: HTMLElement) {
  const scrollRoot = document.scrollingElement ?? document.documentElement;
  const scrollTop = Math.max(scrollRoot.scrollTop, window.scrollY);
  const pageTop = homePageElement.offsetTop;
  const pageBottom = pageTop + homePageElement.offsetHeight;
  const minScroll = pageTop;
  const maxScroll = Math.max(pageBottom - window.innerHeight, minScroll + 1);
  const totalScrollable = maxScroll - minScroll;

  if (totalScrollable <= 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, (scrollTop - minScroll) / totalScrollable));
}

export function HomePage() {
  const { setHomeFooterInView } = useOutletContext<SiteLayoutOutletContext>();
  const homePageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const homePageElement = homePageRef.current;
    if (typeof window === "undefined") {
      return;
    }
    if (!homePageElement) {
      return;
    }

    const syncFooterVisibility = () => {
      const progress = getHomeScrollProgress(homePageElement);
      setHomeFooterInView(progress >= HOME_FOOTER_TRIGGER_START);
    };

    syncFooterVisibility();
    window.addEventListener("scroll", syncFooterVisibility, { passive: true });
    window.addEventListener("resize", syncFooterVisibility);

    return () => {
      window.removeEventListener("scroll", syncFooterVisibility);
      window.removeEventListener("resize", syncFooterVisibility);
      setHomeFooterInView(false);
    };
  }, [setHomeFooterInView]);

  return (
    <section ref={homePageRef} className="home-page" aria-label="Editorial home">
      <div className="home-grid">
        <div className="home-column-left">
          {homeLayout.left.map((block) => (
            <Link
              key={block.to}
              to={block.to}
              className="home-block"
            >
              <span>{block.title}</span>
            </Link>
          ))}
        </div>
        <Link to={homeLayout.main.to} className="home-main">
          <span>{homeLayout.main.title}</span>
        </Link>
        <div className="home-column-right">
          {homeLayout.right.map((block) => (
            <Link
              key={block.to}
              to={block.to}
              className="home-block"
            >
              <span>{block.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="home-footer-zone" aria-hidden="true">
        <div className="home-footer-zone-sentinel" />
      </div>
    </section>
  );
}
