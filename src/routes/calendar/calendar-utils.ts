import type { ResolvedGameRelease } from "./calendar-types";

const FALLBACK_MONTH = "2026-01";
const SUPPORTED_MONTHS = Array.from({ length: 12 }, (_, index) => {
  const month = String(index + 1).padStart(2, "0");
  return `2026-${month}`;
});

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

export function getSupportedCalendarMonths() {
  return SUPPORTED_MONTHS;
}

export function getDefaultCalendarMonth(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const candidate = `${year}-${month}`;
  return SUPPORTED_MONTHS.includes(candidate) ? candidate : FALLBACK_MONTH;
}

export function resolveCalendarMonth(monthParam: string | null, now = new Date()) {
  if (monthParam && SUPPORTED_MONTHS.includes(monthParam)) {
    return monthParam;
  }
  return getDefaultCalendarMonth(now);
}

export function groupReleasesByMonthDays(
  monthKey: string,
  releases: ResolvedGameRelease[],
  hideEmptyDays: boolean
) {
  const [yearPart, monthPart] = monthKey.split("-");
  const year = Number(yearPart);
  const monthIndex = Number(monthPart) - 1;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const groupedByDate = new Map<string, ResolvedGameRelease[]>();

  for (const release of sortReleasesByDateAndTitle(releases)) {
    if (!release.releaseDate.startsWith(`${monthKey}-`)) {
      continue;
    }
    const existing = groupedByDate.get(release.releaseDate);
    if (existing) {
      existing.push(release);
    } else {
      groupedByDate.set(release.releaseDate, [release]);
    }
  }

  const result = [];
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dayKey = `${monthKey}-${String(day).padStart(2, "0")}`;
    const dayReleases = groupedByDate.get(dayKey) ?? [];
    if (hideEmptyDays && dayReleases.length === 0) {
      continue;
    }
    result.push({
      dayKey,
      displayLabel: formatDayLabel(dayKey),
      releases: dayReleases
    });
  }

  return result;
}
