import { useEffect, useMemo, useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import type { SiteLayoutOutletContext } from "../../app/shell/SiteLayout";
import { applyRouteSeo } from "../../app/seo";
import {
  getActiveVersion,
  getVersionBySlug
} from "./home-version-registry";
import { HomeShell } from "./components/HomeShell";

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

export function HomeVersionPage() {
  const { versionSlug } = useParams<{ versionSlug: string }>();
  const { setHomeFooterInView } = useOutletContext<SiteLayoutOutletContext>();
  const homePageRef = useRef<HTMLDivElement | null>(null);

  const version = useMemo(() => {
    if (versionSlug) {
      return getVersionBySlug(versionSlug);
    }
    return getActiveVersion();
  }, [versionSlug]);

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
  }, [setHomeFooterInView, version?.slug]);

  useEffect(() => {
    if (version) {
      applyRouteSeo({
        ...version.seo,
        canonicalPath: versionSlug ? version.seo.canonicalPath : "/home"
      });
      return;
    }

    applyRouteSeo({
      title: "Home unavailable | SecondPeak",
      description: "The requested issue could not be resolved. Return to the current Home cover.",
      canonicalPath: "/home"
    });
  }, [version, versionSlug]);

  return (
    <div ref={homePageRef} className="home-version-route">
      <HomeShell version={version} />
    </div>
  );
}
