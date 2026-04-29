import { useEffect, useMemo, useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import type { SiteLayoutOutletContext } from "../../app/shell/SiteLayout";
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

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!element) {
    element = document.createElement(
      selector.startsWith("link") ? "link" : "meta"
    ) as HTMLMetaElement | HTMLLinkElement;
    document.head.appendChild(element);
  }

  for (const [key, value] of Object.entries(attrs)) {
    element.setAttribute(key, value);
  }
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
    const resolvedPath = version ? `/home/${version.slug}` : "/home";
    const absoluteUrl = `${window.location.origin}${resolvedPath}`;
    const title = version
      ? `${version.title} | SecondPeak`
      : "Home | SecondPeak";
    const description = version
      ? `${version.title}. ${version.mainFeature.subtitle}`
      : "Editorial home issue unavailable.";

    document.title = title;
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description
    });
    upsertMeta('link[rel="canonical"]', {
      rel: "canonical",
      href: absoluteUrl
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: absoluteUrl
    });
  }, [version]);

  return (
    <div ref={homePageRef}>
      <HomeShell version={version} />
    </div>
  );
}
