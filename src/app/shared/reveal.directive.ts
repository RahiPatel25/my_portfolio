import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { animate, inView, stagger } from 'motion';
import { EASE_OUT_EXPO, prefersReducedMotion } from '../core/motion';

type RevealVariant = 'up' | 'fade' | 'scale' | 'left' | 'right';

const FROM: Record<RevealVariant, Record<string, [number | string, number | string]>> = {
  up: { opacity: [0, 1], y: [40, 0] },
  fade: { opacity: [0, 1] },
  scale: { opacity: [0, 1], scale: [0.94, 1] },
  left: { opacity: [0, 1], x: [-40, 0] },
  right: { opacity: [0, 1], x: [40, 0] },
};

/**
 * Reveals the host once it scrolls into view. Elements start hidden via the
 * `.js [data-reveal]` rule in styles.css, so content stays visible without JS.
 */
@Directive({
  selector: '[appReveal]',
  host: { 'data-reveal': '' },
})
export class RevealDirective {
  readonly appReveal = input<RevealVariant | ''>('');
  readonly revealDelay = input(0);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (prefersReducedMotion()) {
        el.style.opacity = '1';
        return;
      }
      const stop = inView(
        el,
        () => {
          animate(el, FROM[this.appReveal() || 'up'], { duration: 0.9, ease: EASE_OUT_EXPO, delay: this.revealDelay() });
        },
        { amount: 0.15 },
      );
      destroyRef.onDestroy(stop);
    });
  }
}

/**
 * Staggers every `[data-reveal-item]` descendant into view together.
 */
@Directive({
  selector: '[appRevealGroup]',
})
export class RevealGroupDirective {
  readonly revealStagger = input(0.08);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const items = el.querySelectorAll<HTMLElement>('[data-reveal-item]');
      if (prefersReducedMotion()) {
        items.forEach((item) => (item.style.opacity = '1'));
        return;
      }
      const stop = inView(
        el,
        () => {
          animate(items, { opacity: [0, 1], y: [28, 0] }, { delay: stagger(this.revealStagger()), duration: 0.7, ease: EASE_OUT_EXPO });
        },
        { amount: 0.1 },
      );
      destroyRef.onDestroy(stop);
    });
  }
}
