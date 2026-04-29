import { Link } from "react-router-dom";
import type { HomeTile as HomeTileData } from "../home-types";

type HomeTileProps = {
  tile: HomeTileData;
};

export function HomeTile({ tile }: HomeTileProps) {
  return (
    <Link to={tile.href} className="home-block" aria-label={`${tile.label}: ${tile.title}`}>
      <img src={tile.imageSrc} alt={tile.imageAlt} className="home-tile-image" loading="lazy" />
      <span className="home-block-label">{tile.label}</span>
      <span>{tile.title}</span>
    </Link>
  );
}

