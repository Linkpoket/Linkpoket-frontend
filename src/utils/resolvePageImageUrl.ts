export function resolvePageImageUrl(
  url: string | null | undefined,
  fallback: string
): string {
  if (!url) {
    return fallback;
  }

  const trimmed = url.trim();
  const lowerCased = trimmed.toLowerCase();
  if (!trimmed || lowerCased === 'null' || lowerCased === 'undefined') {
    return fallback;
  }

  return trimmed;
}
