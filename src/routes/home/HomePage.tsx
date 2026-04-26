import { useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import type { SiteLayoutOutletContext } from "../../app/shell/SiteLayout";
import { homeLayout } from "./home-data";

export function HomePage() {
  const { setHomeFooterInView } = useOutletContext<SiteLayoutOutletContext>();
  const footerZoneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const zone = footerZoneRef.current;
    if (!zone || typeof window === "undefined") {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setHomeFooterInView(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHomeFooterInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(zone);

    return () => {
      observer.disconnect();
      setHomeFooterInView(false);
    };
  }, [setHomeFooterInView]);

  return (
    <section className="home-page" aria-label="Editorial home">
      <div className="home-grid">
        <div className="home-column-left">
          {homeLayout.left.map((block) => (
            <Link
              key={block.to}
              to={block.to}
              className="home-block"
              style={{ backgroundColor: block.color }}
            >
              <span>{block.title}</span>
            </Link>
          ))}
        </div>
        <Link
          to={homeLayout.main.to}
          className="home-main"
          style={{ backgroundColor: homeLayout.main.color }}
        >
          <span>{homeLayout.main.title}</span>
        </Link>
        <div className="home-column-right">
          {homeLayout.right.map((block) => (
            <Link
              key={block.to}
              to={block.to}
              className="home-block"
              style={{ backgroundColor: block.color }}
            >
              <span>{block.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div ref={footerZoneRef} className="home-footer-zone" aria-hidden="true">
        <div className="home-footer-zone-sentinel" />
      </div>
    </section>
  );
}
