import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ChapterDefinition } from "./chapter-config";

const desktopQuery = "(min-width: 900px)";
const wheelCooldownMs = 450;
const railMotionSpring = {
  type: "spring" as const,
  stiffness: 190,
  damping: 32,
  mass: 1
};
const railMotionDuration = 0.55;

type ChapterShellProps = {
  chapter: ChapterDefinition;
  activeSlug: string;
};

export function ChapterShell({ chapter, activeSlug }: ChapterShellProps) {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollAnimationRef = useRef<number | null>(null);
  const cooldownRef = useRef(0);
  const routeSyncRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia(desktopQuery).matches
  );
  const [leftRailCount, setLeftRailCount] = useState(() => {
    const initialIndex = chapter.pages.findIndex((page) => page.slug === activeSlug);
    const safeIndex = initialIndex < 0 ? 0 : initialIndex;
    return Math.min(safeIndex + 1, chapter.pages.length);
  });

  const activeIndex = useMemo(
    () => chapter.pages.findIndex((page) => page.slug === activeSlug),
    [chapter.pages, activeSlug]
  );
  const safeActiveIndex = activeIndex < 0 ? 0 : activeIndex;
  const activePage = chapter.pages[safeActiveIndex];
  const indexedPages = useMemo(
    () => chapter.pages.map((page, index) => ({ page, index })),
    [chapter.pages]
  );
  const railTransition = prefersReducedMotion
    ? { layout: { duration: 0 }, opacity: { duration: 0 } }
    : { layout: { ...railMotionSpring }, opacity: { duration: 0 } };

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    const onChange = () => setIsDesktop(media.matches);

    onChange();
    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isDesktop || !trackRef.current || activeIndex < 0) {
      return;
    }

    const track = trackRef.current;
    if (scrollAnimationRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }

    const targetLeft = track.clientWidth * activeIndex;
    const startLeft = track.scrollLeft;
    const distance = targetLeft - startLeft;

    if (Math.abs(distance) < 1) {
      routeSyncRef.current = false;
      return;
    }

    routeSyncRef.current = true;

    if (prefersReducedMotion) {
      track.scrollLeft = targetLeft;
      routeSyncRef.current = false;
      return;
    }

    const duration = Math.max(
      420,
      Math.min(760, railMotionDuration * 1000 + Math.abs(distance) * 0.16)
    );
    const startTime = window.performance.now();
    const easeInOutCubic = (progress: number) =>
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    const animateTrack = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      track.scrollLeft = startLeft + distance * easedProgress;

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(animateTrack);
        return;
      }

      scrollAnimationRef.current = null;
      routeSyncRef.current = false;
    };

    scrollAnimationRef.current = window.requestAnimationFrame(animateTrack);

    return () => {
      if (scrollAnimationRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationRef.current);
        scrollAnimationRef.current = null;
      }
      routeSyncRef.current = false;
    };
  }, [activeIndex, isDesktop, prefersReducedMotion]);

  const goToIndex = (nextIndex: number, replace = false) => {
    const target = chapter.pages[nextIndex];
    if (!target) {
      return;
    }

    if (isDesktop && nextIndex !== safeActiveIndex) {
      routeSyncRef.current = true;
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
      setLeftRailCount((current) => Math.max(current, Math.min(safeActiveIndex + 2, chapter.pages.length)));
      goToIndex(safeActiveIndex + 1);
      cooldownRef.current = now;
      return;
    }

    if (event.deltaY < -30) {
      setLeftRailCount((current) => Math.min(current, Math.max(safeActiveIndex, 0)));
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
      setLeftRailCount((current) => {
        const targetCount = Math.min(boundedIndex + 1, chapter.pages.length);
        return boundedIndex > safeActiveIndex
          ? Math.max(current, targetCount)
          : Math.min(current, targetCount);
      });
      goToIndex(boundedIndex, true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setLeftRailCount((current) => Math.max(current, Math.min(safeActiveIndex + 2, chapter.pages.length)));
      goToIndex(safeActiveIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setLeftRailCount((current) => Math.min(current, Math.max(safeActiveIndex, 0)));
      goToIndex(safeActiveIndex - 1);
    }
  };

  const hasPrevious = safeActiveIndex > 0;
  const hasNext = safeActiveIndex < chapter.pages.length - 1;
  const promoteSelectedRailBar = isDesktop && chapter.pages.length > 1;
  const clampedLeftRailCount = Math.min(Math.max(leftRailCount, 0), chapter.pages.length);
  const leftRailPages = promoteSelectedRailBar
    ? indexedPages.filter(({ index }) => index < clampedLeftRailCount)
    : [];
  const rightRailPages = promoteSelectedRailBar
    ? indexedPages.filter(({ index }) => index >= clampedLeftRailCount)
    : indexedPages;

  return (
    <section
      className={`chapter-shell${promoteSelectedRailBar ? " chapter-shell-selected-left" : ""}`}
      aria-label={`${chapter.title} chapter`}
    >
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
              <article key={page.slug} className="chapter-panel">
                <motion.div
                  className="chapter-panel-content"
                  initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                >
                  <p className="chapter-panel-eyebrow">{chapter.section}</p>
                  <h1>{page.title}</h1>
                  <p>{page.summary}</p>
                </motion.div>
              </article>
            ))}
          </div>
        ) : (
          <article className="chapter-panel chapter-panel-mobile">
            <motion.div
              key={activeSlug}
              className="chapter-panel-content"
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            >
              <p className="chapter-panel-eyebrow">{chapter.section}</p>
              <h1>{activePage?.title}</h1>
              <p>{activePage?.summary}</p>
            </motion.div>
          </article>
        )}
      </div>

      <LayoutGroup id={`chapter-rails-${chapter.basePath}`}>
        {promoteSelectedRailBar ? (
          <motion.aside
            layout
            transition={railTransition}
            className="chapter-selected-rail chapter-rail"
            aria-label="Selected chapter page"
          >
            <motion.div layout transition={railTransition} className="chapter-rail-track" role="list">
              {leftRailPages.map(({ page, index }) => {
                const isActive = index === safeActiveIndex;
                return (
                  <motion.button
                    layout="position"
                    layoutId={`chapter-rail-bar-${page.slug}`}
                    transition={railTransition}
                    key={page.slug}
                    type="button"
                    className={`chapter-rail-bar${isActive ? " is-active" : ""}`}
                    onClick={() => {
                      const nextIndex = Math.max(index - 1, 0);
                      setLeftRailCount((current) => Math.min(current, index));
                      goToIndex(nextIndex);
                    }}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={`Open ${page.title}`}
                    title={page.title}
                  >
                    <span className="chapter-rail-bar-label">{index + 1}</span>
                    <span className="sr-only">{page.title}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.aside>
        ) : null}

        <motion.aside
          layout
          transition={railTransition}
          className="chapter-rail chapter-rail-right chapter-rail-seamless"
          aria-label="Chapter progress"
        >
          <motion.div
            layout
            transition={railTransition}
            className="chapter-rail-track chapter-rail-track-seamless"
            role="list"
          >
            {rightRailPages.map(({ page, index }) => {
              const isActive = index === safeActiveIndex;
              return (
                <motion.button
                  layout="position"
                  layoutId={`chapter-rail-bar-${page.slug}`}
                  transition={railTransition}
                  key={page.slug}
                  type="button"
                  className={`chapter-rail-bar${isActive ? " is-active" : ""}`}
                  onClick={() => {
                    setLeftRailCount((current) => Math.max(current, index + 1));
                    goToIndex(index);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Open ${page.title}`}
                  title={page.title}
                >
                  <span className="chapter-rail-bar-label">{index + 1}</span>
                  <span className="sr-only">{page.title}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.aside>
      </LayoutGroup>

      <nav className="chapter-bottom-nav" aria-label="Chapter page controls">
        <div className="chapter-bottom-nav-side">
          {hasPrevious ? (
            <Link
              to={`${chapter.basePath}/${chapter.pages[safeActiveIndex - 1].slug}`}
              onClick={() =>
                setLeftRailCount((current) => Math.min(current, Math.max(safeActiveIndex, 0)))
              }
            >
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
            <Link
              to={`${chapter.basePath}/${chapter.pages[safeActiveIndex + 1].slug}`}
              onClick={() =>
                setLeftRailCount((current) =>
                  Math.max(current, Math.min(safeActiveIndex + 2, chapter.pages.length))
                )
              }
            >
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
