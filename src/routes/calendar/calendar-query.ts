const GAME_PARAM = "game";
const STUDIO_PARAM = "studio";
const TAG_PARAM = "tag";
const MONTH_PARAM = "month";
const HIDE_EMPTY_PARAM = "hideEmpty";

export function normalizeQueryValue(value: string | null) {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function parseSelectedGameSlug(searchParams: URLSearchParams) {
  return normalizeQueryValue(searchParams.get(GAME_PARAM));
}

export function parseStudioSlug(searchParams: URLSearchParams) {
  return normalizeQueryValue(searchParams.get(STUDIO_PARAM));
}

export function parseTagSlug(searchParams: URLSearchParams) {
  return normalizeQueryValue(searchParams.get(TAG_PARAM));
}

export function parseCalendarMonth(searchParams: URLSearchParams) {
  const raw = normalizeQueryValue(searchParams.get(MONTH_PARAM));
  if (!raw) {
    return null;
  }
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(raw) ? raw : null;
}

export function parseHideEmptyDays(searchParams: URLSearchParams) {
  return searchParams.get(HIDE_EMPTY_PARAM) === "true";
}

export function buildCalendarSearchParams(options: {
  game?: string | null;
  studio?: string | null;
  tag?: string | null;
  month?: string | null;
  hideEmpty?: boolean;
}) {
  const params = new URLSearchParams();
  if (options.month) {
    params.set(MONTH_PARAM, options.month);
  }
  if (options.hideEmpty) {
    params.set(HIDE_EMPTY_PARAM, "true");
  }
  if (options.studio) {
    params.set(STUDIO_PARAM, options.studio);
  }
  if (options.tag) {
    params.set(TAG_PARAM, options.tag);
  }
  if (options.game) {
    params.set(GAME_PARAM, options.game);
  }
  return params;
}
