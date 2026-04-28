export type HomeBlock = {
  title: string;
  to: string;
};

export const homeLayout = {
  main: {
    title: "Main Feature",
    to: "/reviews/far-lone-sails/intro"
  } satisfies HomeBlock,
  left: [
    {
      title: "Gameplay",
      to: "/reviews/far-lone-sails/gameplay"
    },
    {
      title: "Art Direction",
      to: "/reviews/far-lone-sails/art-direction"
    },
    {
      title: "Conclusion",
      to: "/reviews/far-lone-sails/conclusion"
    }
  ] satisfies HomeBlock[],
  right: [
    {
      title: "Features",
      to: "/features"
    },
    {
      title: "Interviews",
      to: "/interviews"
    },
    {
      title: "Manifesto",
      to: "/manifesto"
    }
  ] satisfies HomeBlock[]
};
