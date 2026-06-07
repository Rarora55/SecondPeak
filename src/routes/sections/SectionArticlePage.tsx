import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { applyRouteSeo } from "../../app/seo";
import {
  getSectionArticleBySlug,
  type SectionArticleFamily
} from "./section-article-registry";

const NOT_FOUND_SEO = {
  title: "Article unavailable | SecondPeak",
  description: "The requested editorial destination could not be found.",
  canonicalPath: "/home"
};

type SectionArticlePageProps = {
  section: SectionArticleFamily;
};

export function SectionArticlePage({ section }: SectionArticlePageProps) {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const article = articleSlug ? getSectionArticleBySlug(section, articleSlug) : null;

  useEffect(() => {
    if (article) {
      applyRouteSeo(article.seo);
      return;
    }

    applyRouteSeo(NOT_FOUND_SEO);
  }, [article]);

  if (!article) {
    return (
      <section className="section-article-page">
        <div className="section-article-shell section-article-shell-fallback" aria-live="polite">
          <p className="section-article-eyebrow">Editorial destination</p>
          <h1>Article unavailable</h1>
          <p>
            The requested story could not be resolved. Return to the current issue to
            continue reading.
          </p>
          <Link to="/home" className="section-article-link">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-article-page">
      <article className="section-article-shell">
        <p className="section-article-eyebrow">{article.eyebrow}</p>
        <header className="section-article-header">
          <h1>{article.title}</h1>
          <p className="section-article-description">{article.description}</p>
        </header>
        <p className="section-article-intro">{article.intro}</p>
        <div className="section-article-body">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Link to="/home" className="section-article-link">
          Return to the issue cover
        </Link>
      </article>
    </section>
  );
}
