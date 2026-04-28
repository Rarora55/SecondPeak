import type { ResolvedGameRelease } from "./calendar-types";

export function sortReleasesByDateAndTitle(releases: ResolvedGameRelease[]) {
  return [...releases].sort((a, b) => {
    const dateCompare = a.releaseDate.localeCompare(b.releaseDate);
    if (dateCompare !== 0) {
      return dateCompare;
    }
    return a.title.localeCompare(b.title);
  });
}

export function formatDayLabel(dayKey: string) {
  const parsed = new Date(`${dayKey}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return dayKey;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(parsed);
}

export function groupReleasesByDay(releases: ResolvedGameRelease[]) {
  const groups = new Map<string, ResolvedGameRelease[]>();
  for (const release of sortReleasesByDateAndTitle(releases)) {
    const key = release.releaseDate;
    const current = groups.get(key);
    if (current) {
      current.push(release);
    } else {
      groups.set(key, [release]);
    }
  }

  return [...groups.entries()].map(([dayKey, dayReleases]) => ({
    dayKey,
    displayLabel: formatDayLabel(dayKey),
    releases: dayReleases
  }));
}
