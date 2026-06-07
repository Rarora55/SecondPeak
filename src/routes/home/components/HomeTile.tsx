type HomeTileProps = {
  title: string;
};

export function HomeTile({ title }: HomeTileProps) {
  return <div className="home-tile-legacy" data-home-tile-title={title} hidden />;
}
