import { Link } from "react-router-dom";

type SectionLandingPageProps = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaTo: string;
};

export function SectionLandingPage({
  title,
  description,
  ctaLabel,
  ctaTo
}: SectionLandingPageProps) {
  return (
    <section className="section-page">
      <div className="section-page-inner">
        <h1>{title}</h1>
        <p>{description}</p>
        <Link to={ctaTo} className="section-page-link">
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
