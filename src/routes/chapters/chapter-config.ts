export type ChapterPage = {
  slug: string;
  title: string;
  summary: string;
  color: string;
};

export type ChapterDefinition = {
  title: string;
  section: string;
  basePath: string;
  pages: ChapterPage[];
};

const farLoneSails: ChapterDefinition = {
  title: "FAR: Lone Sails",
  section: "Reviews",
  basePath: "/reviews/far-lone-sails",
  pages: [
    {
      slug: "intro",
      title: "Intro",
      summary: "Opening frame for the chapter.",
      color: "#1d4ed8"
    },
    {
      slug: "gameplay",
      title: "Gameplay",
      summary: "Interaction systems and pacing.",
      color: "#7c3aed"
    },
    {
      slug: "art-direction",
      title: "Art Direction",
      summary: "Visual language and world-building.",
      color: "#db2777"
    },
    {
      slug: "conclusion",
      title: "Conclusion",
      summary: "Final editorial verdict and closure.",
      color: "#ea580c"
    }
  ]
};

export const chapterRegistry = {
  farLoneSails
};
