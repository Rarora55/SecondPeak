import { Navigate, useParams } from "react-router-dom";
import type { ChapterDefinition } from "./chapter-config";
import { ChapterShell } from "./ChapterShell";

type ChapterRouteProps = {
  chapter: ChapterDefinition;
};

export function ChapterRoute({ chapter }: ChapterRouteProps) {
  const { pageSlug } = useParams();
  const resolvedPage = chapter.pages.find((page) => page.slug === pageSlug);

  if (!pageSlug || !resolvedPage) {
    return <Navigate to={`${chapter.basePath}/${chapter.pages[0].slug}`} replace />;
  }

  return <ChapterShell chapter={chapter} activeSlug={resolvedPage.slug} />;
}
