
const shownPagesSet = new Set<string>();

export function hasShownPopupForPage(pageKey: string): boolean {
  if (!pageKey) return false;
  return shownPagesSet.has(pageKey);
}

export function markPopupShownForPage(pageKey: string): void {
  if (!pageKey) return;
  shownPagesSet.add(pageKey);
}

export function resetPopupSession(): void {
  shownPagesSet.clear();
}

export function getShownPopupPages(): string[] {
  return Array.from(shownPagesSet);
}
