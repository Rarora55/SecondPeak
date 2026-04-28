import { Link } from "react-router-dom";
import type { ReleaseTag, Studio } from "../calendar-types";
import { buildCalendarSearchParams } from "../calendar-query";

type ReleaseTagsProps = {
  studio: Studio;
  tags: ReleaseTag[];
  activeStudioSlug: string | null;
  activeTagSlug: string | null;
};

export function ReleaseTags({
  studio,
  tags,
  activeStudioSlug,
  activeTagSlug
}: ReleaseTagsProps) {
  return (
    <div className="release-tags-wrap">
      <div className="release-studio">
        <Link
          to={{
            pathname: "/calendar",
            search: buildCalendarSearchParams({
              studio: studio.slug,
              tag: activeTagSlug
            }).toString()
          }}
          className={`release-entity-link${activeStudioSlug === studio.slug ? " is-active" : ""}`}
        >
          {studio.name}
        </Link>
      </div>
      <ul className="release-tags-list" aria-label="Game tags">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link
              to={{
                pathname: "/calendar",
                search: buildCalendarSearchParams({
                  studio: activeStudioSlug,
                  tag: tag.slug
                }).toString()
              }}
              className={`release-entity-link release-tag-link${activeTagSlug === tag.slug ? " is-active" : ""}`}
            >
              <span className="release-tag-type">{tag.type}</span>
              <span>{tag.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
