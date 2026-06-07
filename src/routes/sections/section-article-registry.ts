import type { RouteSeo } from "../home/home-types";

export type SectionArticleFamily = "features" | "interviews";

export type SectionArticle = {
  section: SectionArticleFamily;
  slug: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  body: string[];
  seo: RouteSeo;
};

const registry: SectionArticle[] = [
  {
    section: "features",
    slug: "el-terror-en-2d",
    href: "/features/el-terror-en-2d",
    eyebrow: "Feature",
    title: "El terror en 2d",
    description:
      "El viaje a la solución de una mecánica complicada, los rebeldes del teatro.",
    intro:
      "Un recorrido editorial por el terror bidimensional y por las decisiones mecánicas que sostienen su tensión.",
    body: [
      "La puesta en escena del terror en 2D depende menos del sobresalto y más de la precisión. El encuadre, la velocidad de lectura y el control del vacío funcionan como herramientas dramáticas.",
      "Cuando una mecánica complicada encuentra su forma final, deja de sentirse como sistema y empieza a sentirse como ritmo. Esa frontera entre diseño y emoción es el centro de este texto.",
      "También observamos a los rebeldes del teatro: juegos que entienden el escenario como una superficie frágil donde el jugador completa lo que no se muestra."
    ],
    seo: {
      title: "El terror en 2d | SecondPeak",
      description:
        "Una lectura editorial sobre el terror en 2D, la resolución de mecánicas difíciles y los rebeldes del teatro.",
      canonicalPath: "/features/el-terror-en-2d"
    }
  },
  {
    section: "interviews",
    slug: "wych-elm-silver-pines",
    href: "/interviews/wych-elm-silver-pines",
    eyebrow: "Interview",
    title: "Quiénes son los nuevos",
    description: "Hablamos de Wych Elm y su nuevo juego Silver Pines.",
    intro:
      "Una conversación con Wych Elm sobre los comienzos de estudio, la identidad de Silver Pines y el tono que quieren construir.",
    body: [
      "Silver Pines aparece como una primera declaración de intenciones: una obra que no necesita gritar para fijar su presencia. Esa serenidad es también una posición estética.",
      "Wych Elm describe un proceso de trabajo donde el misterio importa tanto como la claridad. La entrevista se mueve entre influencias, herramientas y el valor de dejar espacio para la interpretación.",
      "La pregunta de fondo no es solo quiénes son los nuevos, sino qué clase de sensibilidad llegan a defender en una escena cada vez más ruidosa."
    ],
    seo: {
      title: "Quiénes son los nuevos | SecondPeak",
      description:
        "Wych Elm habla con SecondPeak sobre su nuevo juego Silver Pines y la sensibilidad editorial detrás del estudio.",
      canonicalPath: "/interviews/wych-elm-silver-pines"
    }
  }
];

export function getSectionArticleBySlug(
  section: SectionArticleFamily,
  slug: string
) {
  return registry.find((article) => article.section === section && article.slug === slug) ?? null;
}

export function listSectionArticlePaths() {
  return registry.map((article) => article.href);
}
