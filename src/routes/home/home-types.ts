export type EditorialSection = "reviews" | "features" | "interviews";

export type HomeCoverState = "collapsed" | "expanded";

export type HomeCoverTopicLayout = "three-column" | "stacked";

export type RouteSeo = {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
};

export type HomeCoverTheme = {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  titleColor: string;
};

export type HomeCoverImage = {
  src: string;
  alt: string;
  widthPreference: {
    collapsed: string;
    expanded: string;
    narrow: string;
  };
  aspectRatio: string;
  treatment: "paper-faded";
};

export type HomeCoverTopic = {
  id: string;
  title: string;
  description: string;
  href: string;
  section: EditorialSection;
  markerLabel?: string;
};

export type HomeVersion = {
  slug: string;
  isActive: boolean;
  publicationTitle: string;
  brandHref: string;
  issueNumber: string;
  issueDateLabel: string;
  coverTitle: string;
  theme: HomeCoverTheme;
  image: HomeCoverImage;
  topics: [HomeCoverTopic, HomeCoverTopic, HomeCoverTopic];
  fallbackHref: string;
  seo: RouteSeo;
};
