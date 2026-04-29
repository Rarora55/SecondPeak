import { Link } from "react-router-dom";
import type { HomeMainFeature as HomeMainFeatureData } from "../home-types";

type HomeMainFeatureProps = {
  feature: HomeMainFeatureData;
};

export function HomeMainFeature({ feature }: HomeMainFeatureProps) {
  return (
    <Link to={feature.href} className="home-main" aria-label={`${feature.coverLabel}: ${feature.title}`}>
      <img
        src={feature.imageSrc}
        alt={feature.imageAlt}
        className="home-main-image"
      />
      <span className="home-main-label">{feature.coverLabel}</span>
      <span>{feature.title}</span>
      <span className="home-main-subtitle">{feature.subtitle}</span>
    </Link>
  );
}

