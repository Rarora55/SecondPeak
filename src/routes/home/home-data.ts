export type HomeBlock = {
  title: string;
  to: string;
  color: string;
};

export const homeLayout = {
  main: {
    title: "Main Feature",
    to: "/reviews/far-lone-sails/intro",
    color: "#22c55e"
  } satisfies HomeBlock,
  left: [
    {
      title: "Gameplay",
      to: "/reviews/far-lone-sails/gameplay",
      color: "#ef4444"
    },
    {
      title: "Art Direction",
      to: "/reviews/far-lone-sails/art-direction",
      color: "#f97316"
    },
    {
      title: "Conclusion",
      to: "/reviews/far-lone-sails/conclusion",
      color: "#eab308"
    }
  ] satisfies HomeBlock[],
  right: [
    {
      title: "Features",
      to: "/features",
      color: "#06b6d4"
    },
    {
      title: "Interviews",
      to: "/interviews",
      color: "#6366f1"
    },
    {
      title: "Manifesto",
      to: "/manifesto",
      color: "#ec4899"
    }
  ] satisfies HomeBlock[]
};
