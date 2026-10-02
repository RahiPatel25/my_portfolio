import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute } from '@angular/core';
import { animate } from 'motion';
import { isFinePointer, prefersReducedMotion } from '../core/motion';

/** Pulls the host slightly toward the pointer while hovered. */
@Directive({
  selector: '[appMagnetic]',
})
export class MagneticDirective {
  readonly appMagnetic = input(0.3, { transform: (v: unknown) => numberAttribute(v, 0.3) });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!isFinePointer() || prefersReducedMotion()) return;
      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const strength = this.appMagnetic();
        const x = (e.clientX - rect.left - rect.width / 2) * strength;
        const y = (e.clientY - rect.top - rect.height / 2) * strength;
        animate(el, { x, y }, { type: 'spring', stiffness: 300, damping: 20 });
      };
      const onLeave = () => animate(el, { x: 0, y: 0 }, { type: 'spring', stiffness: 200, damping: 15 });
      el.addEventListener('pointermove', onMove, { passive: true });
      el.addEventListener('pointerleave', onLeave);
      destroyRef.onDestroy(() => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      });
    });
  }
}
