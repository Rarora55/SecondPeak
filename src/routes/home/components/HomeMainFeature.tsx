type HomeMainFeatureProps = {
  title: string;
};

export function HomeMainFeature({ title }: HomeMainFeatureProps) {
  return <div className="home-main-legacy" data-home-main-title={title} hidden />;
}
