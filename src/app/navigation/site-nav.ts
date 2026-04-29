export type SiteNavItem = {
  to: string;
  label: string;
};

export const siteNavLinks: SiteNavItem[] = [
  { to: "/home", label: "Home" },
  { to: "/reviews", label: "Reviews" },
  { to: "/features", label: "Features" },
  { to: "/interviews", label: "Interviews" },
  { to: "/calendar", label: "Calendar" },
  { to: "/reviews/far-lone-sails/intro", label: "Far: Lone Sails" },
  { to: "/manifesto", label: "Manifesto" },
  { to: "/contact", label: "Contact" }
];
