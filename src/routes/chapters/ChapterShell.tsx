import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ChapterDefinition } from "./chapter-config";

const desktopQuery = "(min-width: 900px)";
const wheelCooldownMs = 450;
const railGrayMin = 22;
const railGrayMax = 64;

type ChapterShellProps = {
  chapter: ChapterDefinition;
  activeSlug: string;
};

function getRailGrayTone(index: number, total: number) {
  if (total <= 1) {
    return railGrayMin;
  }

  const step = (railGrayMax - railGrayMin) / (total - 1);
  return Math.round(railGrayMin + step * index);
}

export function ChapterShell({ chapter, activeSlug }: ChapterShellProps) {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cooldownRef = useRef(0);
  const routeSyncRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia(desktopQuery).matches
  );

  const activeIndex = useMemo(
    () => chapter.pages.findIndex((page) => page.slug === activeSlug),
    [chapter.pages, activeSlug]
  );
  const safeActiveIndex = activeIndex < 0 ? 0 : activeIndex;
  const activePage = chapter.pages[safeActiveIndex];

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    const onChange = () => setIsDesktop(media.matches);

    onChange();
    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop || !trackRef.current || activeIndex < 0) {
      return;
    }

    const track = trackRef.current;
    routeSyncRef.current = true;
    track.scrollTo({
      left: track.clientWidth * activeIndex,
      behavior: "smooth"
    });

    const timeoutId = window.setTimeout(() => {
      routeSyncRef.current = false;
    }, 450);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, isDesktop]);

  const goToIndex = (nextIndex: number, replace = false) => {
    const target = chapter.pages[nextIndex];
    if (!target) {
      return;
    }

    navigate(`${chapter.basePath}/${target.slug}`, { replace });
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!isDesktop) {
      return;
    }

    event.preventDefault();
    const now = Date.now();
    if (now - cooldownRef.current < wheelCooldownMs) {
      return;
    }

    if (event.deltaY > 30) {
      goToIndex(safeActiveIndex + 1);
      cooldownRef.current = now;
      return;
    }

    if (event.deltaY < -30) {
      goToIndex(safeActiveIndex - 1);
      cooldownRef.current = now;
    }
  };

  const handleScroll = () => {
    if (!isDesktop || !trackRef.current || routeSyncRef.current) {
      return;
    }

    const track = trackRef.current;
    const width = Math.max(track.clientWidth, 1);
    const nextIndex = Math.round(track.scrollLeft / width);
    const boundedIndex = Math.min(
      Math.max(nextIndex, 0),
      chapter.pages.length - 1
    );

    if (boundedIndex !== safeActiveIndex) {
      goToIndex(boundedIndex, true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToIndex(safeActiveIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToIndex(safeActiveIndex - 1);
    }
  };

  const hasPrevious = safeActiveIndex > 0;
  const hasNext = safeActiveIndex < chapter.pages.length - 1;

  return (
    <section className="chapter-shell" aria-label={`${chapter.title} chapter`}>
      <div className="chapter-content-region" onWheel={handleWheel}>
        {isDesktop ? (
          <div
            ref={trackRef}
            className="chapter-track"
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label="Horizontal chapter pages"
          >
            {chapter.pages.map((page) => (
              <article
                key={page.slug}
                className="chapter-panel"
                style={{ backgroundColor: page.color }}
              >
                <motion.div
                  className="chapter-panel-content"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="chapter-panel-eyebrow">{chapter.section}</p>
                  <h1>{page.title}</h1>
                  <p>{page.summary}</p>
                </motion.div>
              </article>
            ))}
          </div>
        ) : (
          <article
            className="chapter-panel chapter-panel-mobile"
            style={{ backgroundColor: activePage?.color }}
          >
            <motion.div
              key={activeSlug}
              className="chapter-panel-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p className="chapter-panel-eyebrow">{chapter.section}</p>
              <h1>{activePage?.title}</h1>
              <p>{activePage?.summary}</p>
            </motion.div>
          </article>
        )}
      </div>

      <aside className="chapter-rail" aria-label="Chapter progress">
        <div className="chapter-rail-track" role="list">
          {chapter.pages.map((page, index) => {
            const isActive = index === safeActiveIndex;
            const railTone = getRailGrayTone(index, chapter.pages.length);
            const railStyle = {
              "--rail-tone": `${railTone}`
            } as CSSProperties;

            return (
              <button
                key={page.slug}
                type="button"
                className={`chapter-rail-bar${isActive ? " is-active" : ""}`}
                style={railStyle}
                onClick={() => goToIndex(index)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Open ${page.title}`}
                title={page.title}
              >
                <span className="sr-only">{page.title}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <nav className="chapter-bottom-nav" aria-label="Chapter page controls">
        <div className="chapter-bottom-nav-side">
          {hasPrevious ? (
            <Link to={`${chapter.basePath}/${chapter.pages[safeActiveIndex - 1].slug}`}>
              Previous
            </Link>
          ) : (
            <span className="is-disabled">Previous</span>
          )}
        </div>
        <div className="chapter-bottom-nav-status">
          {safeActiveIndex + 1} / {chapter.pages.length}
        </div>
        <div className="chapter-bottom-nav-side">
          {hasNext ? (
            <Link to={`${chapter.basePath}/${chapter.pages[safeActiveIndex + 1].slug}`}>
              Next
            </Link>
          ) : (
            <span className="is-disabled">Next</span>
          )}
        </div>
      </nav>
    </section>
  );
}
