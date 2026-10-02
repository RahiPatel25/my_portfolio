import { DOCUMENT, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { prefersReducedMotion } from './motion';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'rp-theme';

/**
 * Owns the light/dark theme. The initial class is applied by the inline
 * script in index.html (to avoid a flash), this service just stays in sync.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>(this.readInitial());

  toggle(origin?: { x: number; y: number }): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    if (!this.isBrowser) return;

    const root = this.document.documentElement;
    const apply = () => {
      root.classList.toggle('dark', next === 'dark');
      this.theme.set(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable */
      }
    };

    const reduce = prefersReducedMotion();
    const doc = this.document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

    if (!doc.startViewTransition || reduce) {
      root.classList.add('theme-transition');
      apply();
      window.setTimeout(() => root.classList.remove('theme-transition'), 400);
      return;
    }

    // Circular reveal from the toggle button.
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    doc.startViewTransition(apply).ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
  }

  private readInitial(): Theme {
    if (!this.isBrowser) return 'light';
    return this.document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }
}
