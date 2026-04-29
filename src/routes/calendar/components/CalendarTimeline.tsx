import { motion } from "motion/react";
import type { ResolvedGameRelease } from "../calendar-types";
import { CalendarDay } from "./CalendarDay";

type DayGroup = {
  dayKey: string;
  displayLabel: string;
  releases: ResolvedGameRelease[];
};

type CalendarTimelineProps = {
  groups: DayGroup[];
  selectedSlug: string | null;
  onSelect: (release: ResolvedGameRelease) => void;
  activeStudioSlug: string | null;
  activeTagSlug: string | null;
};

export function CalendarTimeline({
  groups,
  selectedSlug,
  onSelect,
  activeStudioSlug,
  activeTagSlug
}: CalendarTimelineProps) {
  if (groups.length === 0) {
    return (
      <section className="calendar-empty" aria-live="polite">
        <h2>No days to display</h2>
        <p>Try changing the month or turning off hide empty days.</p>
      </section>
    );
  }

  return (
    <motion.div layout className="calendar-timeline">
      {groups.map((group) => (
        <CalendarDay
          key={group.dayKey}
          dayKey={group.dayKey}
          displayLabel={group.displayLabel}
          releases={group.releases}
          selectedSlug={selectedSlug}
          onSelect={onSelect}
          activeStudioSlug={activeStudioSlug}
          activeTagSlug={activeTagSlug}
        />
      ))}
    </motion.div>
  );
}
