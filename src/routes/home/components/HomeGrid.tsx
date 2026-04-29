import type { HomeVersion } from "../home-types";
import { HomeMainFeature } from "./HomeMainFeature";
import { HomeTile } from "./HomeTile";

type HomeGridProps = {
  version: HomeVersion;
};

export function HomeGrid({ version }: HomeGridProps) {
  return (
    <div className="home-grid">
      <div className="home-column-left">
        {version.leftTiles.map((tile) => (
          <HomeTile key={tile.id} tile={tile} />
        ))}
      </div>
      <HomeMainFeature feature={version.mainFeature} />
      <div className="home-column-right">
        {version.rightTiles.map((tile) => (
          <HomeTile key={tile.id} tile={tile} />
        ))}
      </div>
    </div>
  );
}

