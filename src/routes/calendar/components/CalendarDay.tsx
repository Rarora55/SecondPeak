import { motion } from "motion/react";
import type { ResolvedGameRelease } from "../calendar-types";
import { ReleaseMiniCard } from "./ReleaseMiniCard";

type CalendarDayProps = {
  dayKey: string;
  displayLabel: string;
  releases: ResolvedGameRelease[];
  selectedSlug: string | null;
  onSelect: (release: ResolvedGameRelease) => void;
  activeStudioSlug: string | null;
  activeTagSlug: string | null;
};

export function CalendarDay({
  dayKey,
  displayLabel,
  releases,
  selectedSlug,
  onSelect,
  activeStudioSlug,
  activeTagSlug
}: CalendarDayProps) {
  return (
    <section className="calendar-day" aria-labelledby={`calendar-day-${dayKey}`}>
      <h2 id={`calendar-day-${dayKey}`} className="calendar-day-title">
        {displayLabel}
      </h2>
      <div className="calendar-day-list">
        {releases.map((release) => (
          <motion.div key={release.id} layout>
            <ReleaseMiniCard
              release={release}
              isSelected={selectedSlug === release.slug}
              onSelect={onSelect}
              activeStudioSlug={activeStudioSlug}
              activeTagSlug={activeTagSlug}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
