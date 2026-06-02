export const EBENEZER_GRANT_DEADLINE_UTC = Date.parse("2026-06-05T22:59:00.000Z");

export function isEbenezerGrantClosed() {
  return Date.now() > EBENEZER_GRANT_DEADLINE_UTC;
}
