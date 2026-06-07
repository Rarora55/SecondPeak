export type RouteSeoOptions = {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
};

function getOrigin() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.origin;
}

function upsertMeta(name: string, content: string, useProperty = false) {
  const selector = useProperty
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    if (useProperty) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}

export function applyRouteSeo(options: RouteSeoOptions) {
  const canonicalUrl = `${getOrigin()}${options.canonicalPath}`;

  document.title = options.title;
  upsertMeta("description", options.description);
  upsertCanonical(canonicalUrl);
  upsertMeta("og:title", options.ogTitle ?? options.title, true);
  upsertMeta("og:description", options.ogDescription ?? options.description, true);
  upsertMeta("og:url", canonicalUrl, true);
}
