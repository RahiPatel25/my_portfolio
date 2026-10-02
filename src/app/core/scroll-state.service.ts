import { Injectable, NgZone, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { prefersReducedMotion } from './motion';

/**
 * Tracks page scroll and which section is currently in view.
 * Listeners are passive and only update signals when values change.
 */
@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;

  readonly scrolled = signal(false);
  readonly activeSection = signal<string>('hero');

  init(sectionIds: string[]): void {
    if (!this.isBrowser || this.observer || typeof IntersectionObserver === 'undefined') return;

    this.zone.runOutsideAngular(() => {
      const onScroll = () => {
        const scrolled = window.scrollY > 40;
        if (scrolled !== this.scrolled()) this.scrolled.set(scrolled);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // A thin band across the middle of the viewport decides the active section.
      // Track every section inside the band and pick the last one in page order,
      // so fast scrolls that deliver several entries at once resolve correctly.
      const ids = ['hero', ...sectionIds];
      const visible = new Set<string>();
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          }
          const active = ids.filter((id) => visible.has(id)).pop();
          if (active) this.activeSection.set(active);
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) this.observer.observe(el);
      }
    });
  }

  scrollTo(id: string): void {
    if (!this.isBrowser) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }
}
