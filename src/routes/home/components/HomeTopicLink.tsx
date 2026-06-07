import { Link } from "react-router-dom";
import type { HomeCoverTopic } from "../home-types";

type HomeTopicLinkProps = {
  topic: HomeCoverTopic;
};

export function HomeTopicLink({ topic }: HomeTopicLinkProps) {
  return (
    <Link to={topic.href} className="home-topic-link" aria-label={`Open topic: ${topic.title}`}>
      <article className="home-topic-card">
        <h2 className="home-topic-title">{topic.title}</h2>
        <p className="home-topic-description">{topic.description}</p>
      </article>
    </Link>
  );
}
