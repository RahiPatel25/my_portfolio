import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { animate, inView } from 'motion';
import { EASE_OUT_EXPO, prefersReducedMotion } from '../core/motion';

/**
 * Counts from 0 to the host's value when it scrolls into view. The final value
 * is rendered server-side, so the number is correct without JS.
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective {
  readonly appCountUp = input.required<number>();

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (prefersReducedMotion()) return;
      const target = this.appCountUp();
      el.textContent = '0';
      const stop = inView(el, () => {
        animate(0, target, {
          duration: 1.6,
          ease: EASE_OUT_EXPO,
          onUpdate: (v) => (el.textContent = Math.round(v).toString()),
        });
      });
      destroyRef.onDestroy(stop);
    });
  }
}
