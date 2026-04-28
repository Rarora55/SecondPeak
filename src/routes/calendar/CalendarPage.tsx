import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { loadCalendarData } from "./calendar-data";
import { applyCalendarSeo } from "./calendar-seo";
import {
  buildCalendarSearchParams,
  parseSelectedGameSlug,
  parseStudioSlug,
  parseTagSlug
} from "./calendar-query";
import type { ResolvedGameRelease } from "./calendar-types";
import {
  filterPublicReleases,
  filterReleasesByStudio,
  filterReleasesByTag,
  resolvePublishedReleaseBySlug
} from "./calendar-visibility";
import { groupReleasesByDay } from "./calendar-utils";
import { CalendarTimeline } from "./components/CalendarTimeline";
import { ReleaseDetailPanel } from "./components/ReleaseDetailPanel";

const desktopQuery = "(min-width: 1024px)";

export function CalendarPage() {
  const prefersReducedMotion = useReducedMotion();
  const [searchParams, setSearchParams] = useSearchParams();
  const lastSelectedForFocusRef = useRef<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(desktopQuery).matches
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [releases, setReleases] = useState<ResolvedGameRelease[]>([]);

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    const onChange = () => setIsDesktop(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    loadCalendarData()
      .then((data) => {
        if (!mounted) {
          return;
        }
        setReleases(data.resolvedReleases);
      })
      .catch(() => {
        if (!mounted) {
          return;
        }
        setError("We could not load release data right now.");
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const activeStudioSlug = parseStudioSlug(searchParams);
  const activeTagSlug = parseTagSlug(searchParams);
  const selectedSlug = parseSelectedGameSlug(searchParams);

  const publicReleases = useMemo(() => filterPublicReleases(releases), [releases]);
  const filteredReleases = useMemo(() => {
    const byStudio = filterReleasesByStudio(publicReleases, activeStudioSlug);
    return filterReleasesByTag(byStudio, activeTagSlug);
  }, [publicReleases, activeStudioSlug, activeTagSlug]);

  const groups = useMemo(() => groupReleasesByDay(filteredReleases), [filteredReleases]);
  const selectedRelease = useMemo(
    () => resolvePublishedReleaseBySlug(publicReleases, selectedSlug),
    [publicReleases, selectedSlug]
  );
  const invalidSelectedSlug = Boolean(selectedSlug && !selectedRelease);

  useEffect(() => {
    const title = selectedRelease
      ? `${selectedRelease.title} | Calendar | SecondPeak`
      : "Calendar | SecondPeak";
    const description = selectedRelease
      ? `${selectedRelease.title} by ${selectedRelease.studio.name}. ${selectedRelease.synopsis}`
      : "Track upcoming and recent videogame releases in a vertical editorial calendar.";
    applyCalendarSeo({ title, description, canonicalPath: "/calendar" });
  }, [selectedRelease]);

  const onSelect = (release: ResolvedGameRelease) => {
    if (!isDesktop) {
      lastSelectedForFocusRef.current = release.slug;
    }
    const next = buildCalendarSearchParams({
      game: release.slug,
      studio: activeStudioSlug,
      tag: activeTagSlug
    });
    setSearchParams(next, { replace: false });
  };

  const clearSelected = () => {
    const next = buildCalendarSearchParams({ studio: activeStudioSlug, tag: activeTagSlug });
    setSearchParams(next, { replace: false });
  };

  useEffect(() => {
    if (selectedSlug || !lastSelectedForFocusRef.current) {
      return;
    }
    const target = document.querySelector<HTMLButtonElement>(
      `button[data-release-slug="${lastSelectedForFocusRef.current}"]`
    );
    if (target) {
      target.focus();
    }
    lastSelectedForFocusRef.current = null;
  }, [selectedSlug]);

  if (loading) {
    return (
      <section className="calendar-page">
        <div className="calendar-status" aria-live="polite">
          <h1>Calendar</h1>
          <p>Loading releases...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="calendar-page">
        <div className="calendar-status" aria-live="assertive">
          <h1>Calendar</h1>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  const shouldShowDesktopDetail = isDesktop && selectedRelease;
  const shouldShowMobileDetail = !isDesktop && selectedRelease;

  return (
    <section className="calendar-page" aria-label="Videogame release calendar">
      <div className="calendar-shell">
        <header className="calendar-header">
          <h1>Release Calendar</h1>
          <p>Published videogame launches in an editorial timeline.</p>
          {(activeStudioSlug || activeTagSlug || selectedSlug) && (
            <button type="button" className="calendar-clear-btn" onClick={clearSelected}>
              Clear filters
            </button>
          )}
        </header>

        {invalidSelectedSlug ? (
          <p className="calendar-status-inline" role="status">
            The selected release is not available. Browse the timeline to continue.
          </p>
        ) : null}

        {shouldShowMobileDetail ? (
          <div className="calendar-mobile-detail-view">
            <Link
              to={{
                pathname: "/calendar",
                search: buildCalendarSearchParams({
                  studio: activeStudioSlug,
                  tag: activeTagSlug
                }).toString()
              }}
              className="calendar-back-link"
            >
              Back to timeline
            </Link>
            <ReleaseDetailPanel
              release={selectedRelease}
              activeStudioSlug={activeStudioSlug}
              activeTagSlug={activeTagSlug}
            />
          </div>
        ) : (
          <motion.div
            layout
            className={`calendar-master-detail${shouldShowDesktopDetail ? " has-selection" : ""}`}
          >
            <motion.div layout className="calendar-master">
              <CalendarTimeline
                groups={groups}
                selectedSlug={selectedSlug}
                onSelect={onSelect}
                activeStudioSlug={activeStudioSlug}
                activeTagSlug={activeTagSlug}
              />
            </motion.div>

            <AnimatePresence initial={false}>
              {shouldShowDesktopDetail ? (
                <motion.aside
                  key={selectedRelease.slug}
                  className="calendar-detail"
                  initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.26 }}
                  aria-live="polite"
                >
                  <ReleaseDetailPanel
                    release={selectedRelease}
                    activeStudioSlug={activeStudioSlug}
                    activeTagSlug={activeTagSlug}
                  />
                </motion.aside>
              ) : null}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
