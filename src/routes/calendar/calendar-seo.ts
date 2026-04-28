export type CalendarMetaOptions = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogTitle?: string;
  ogDescription?: string;
};

const DEFAULT_TITLE = "Calendar | SecondPeak";
const DEFAULT_DESCRIPTION =
  "Track upcoming and recent videogame releases in a vertical editorial calendar.";

const CANONICAL_REL = "canonical";

function getOrigin() {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.origin;
}

function upsertMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property=\"${name}\"]` : `meta[name=\"${name}\"]`;
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    if (property) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector(`link[rel=\"${CANONICAL_REL}\"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", CANONICAL_REL);
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function applyCalendarSeo(options: CalendarMetaOptions = {}) {
  const title = options.title ?? DEFAULT_TITLE;
  const description = options.description ?? DEFAULT_DESCRIPTION;
  const canonicalPath = options.canonicalPath ?? "/calendar";
  const canonical = `${getOrigin()}${canonicalPath}`;

  document.title = title;
  upsertMeta("description", description);
  upsertCanonical(canonical);
  upsertMeta("og:title", options.ogTitle ?? title, true);
  upsertMeta("og:description", options.ogDescription ?? description, true);
  upsertMeta("og:url", canonical, true);
}
