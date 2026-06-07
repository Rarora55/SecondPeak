import type { CSSProperties } from "react";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import imageAndTitle from "../../../../ImagesContent/Home/ImageAndTitle.png";
import type { HomeVersion } from "../home-types";
import { HomeTopicLink } from "./HomeTopicLink";

type HomeCoverHeroProps = {
  version: HomeVersion;
};

export function HomeCoverHero({ version }: HomeCoverHeroProps) {
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const topicsId = useId();
  const stateClassName = expanded ? " is-expanded" : "";

  return (
    <motion.div
      className="home-cover-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={prefersReducedMotion ? { duration: 0.12 } : { duration: 1.6, ease: "easeOut" }}
      style={
        {
          "--home-cover-width-collapsed": version.image.widthPreference.collapsed,
          "--home-cover-width-expanded": version.image.widthPreference.expanded,
          "--home-cover-width-narrow": version.image.widthPreference.narrow
        } as CSSProperties
      }
    >
      <header className="home-cover-header" aria-label="Issue cover header">
        <div className="home-cover-brand-row">
          <Link to={version.brandHref} className="home-cover-brand-link" aria-label="Go to SecondPeak home">
            <span className="home-cover-brand">{version.publicationTitle}</span>
            <span className="home-cover-brand-dot" aria-hidden="true">
              .
            </span>
          </Link>
          <div className="home-cover-meta" aria-label="Issue metadata">
            <span>{version.issueNumber}</span>
            <span className="home-cover-meta-separator" aria-hidden="true" />
            <span>{version.issueDateLabel}</span>
          </div>
        </div>
        <div className="home-cover-header-line" aria-hidden="true" />
      </header>

      <main className={`home-cover-main${stateClassName}`}>
        <div className={`home-cover-hero${stateClassName}`} data-state={expanded ? "expanded" : "collapsed"}>
          <div className={`home-cover-figure${stateClassName}`}>
            <h1 className="sr-only">{version.coverTitle}</h1>
            <img src={imageAndTitle} alt={version.image.alt} className="home-cover-image" />
          </div>

          <button
            type="button"
            className={`home-cover-toggle${stateClassName}`}
            aria-expanded={expanded}
            aria-controls={topicsId}
            aria-label={expanded ? "Hide issue topics" : "Reveal issue topics"}
            onClick={() => setExpanded((value) => !value)}
          >
            <span className={`home-cover-chevron${stateClassName}`} aria-hidden="true">
              <span className="home-cover-chevron-line home-cover-chevron-line-left" />
              <span className="home-cover-chevron-line home-cover-chevron-line-right" />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                id={topicsId}
                className={`home-cover-topics${stateClassName}`}
                aria-label="Issue topics"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={prefersReducedMotion ? { duration: 0.1 } : { duration: 0.45, ease: "easeOut" }}
              >
                {version.topics.map((topic) => (
                  <HomeTopicLink key={topic.id} topic={topic} />
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
}
