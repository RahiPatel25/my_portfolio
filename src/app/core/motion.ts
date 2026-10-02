/** Shared motion constants and helpers. */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

function matches(query: string): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(query).matches;
}

export function prefersReducedMotion(): boolean {
  return matches('(prefers-reduced-motion: reduce)');
}

export function isFinePointer(): boolean {
  return matches('(hover: hover) and (pointer: fine)');
}
