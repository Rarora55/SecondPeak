export type HomeTheme = {
  accentColor: string;
  backgroundColor: string;
  textColor: string;
};

export type HomeTile = {
  id: string;
  label: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export type HomeMainFeature = {
  coverLabel: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export type HomeVersion = {
  slug: string;
  isActive: boolean;
  title: string;
  issueNumber: string;
  season: string;
  month: string;
  year: number;
  footerText: string;
  theme: HomeTheme;
  mainFeature: HomeMainFeature;
  leftTiles: [HomeTile, HomeTile, HomeTile];
  rightTiles: [HomeTile, HomeTile, HomeTile];
};

