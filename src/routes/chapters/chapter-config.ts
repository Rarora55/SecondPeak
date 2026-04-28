export type ChapterPage = {
  slug: string;
  title: string;
  summary: string;
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
      summary: "Opening frame for the chapter."
    },
    {
      slug: "gameplay",
      title: "Gameplay",
      summary: "Interaction systems and pacing."
    },
    {
      slug: "art-direction",
      title: "Art Direction",
      summary: "Visual language and world-building."
    },
    {
      slug: "conclusion",
      title: "Conclusion",
      summary: "Final editorial verdict and closure."
    }
  ]
};

export const chapterRegistry = {
  farLoneSails
};
