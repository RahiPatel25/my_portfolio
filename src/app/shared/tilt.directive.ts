import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute } from '@angular/core';
import { isFinePointer, prefersReducedMotion } from '../core/motion';

/**
 * Pointer-driven 3D tilt. Writes `--rx`, `--ry` (degrees) and `--mx`, `--my`
 * (percent, for glare/spotlight) on the host; the `.tilt` class in styles.css
 * turns them into a transform. Disabled for touch and reduced motion.
 */
@Directive({
  selector: '[appTilt]',
  host: { class: 'tilt' },
})
export class TiltDirective {
  /** Maximum rotation in degrees. */
  readonly appTilt = input(8, { transform: (v: unknown) => numberAttribute(v, 8) });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!isFinePointer() || prefersReducedMotion()) return;

      let frame = 0;
      const onMove = (e: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          const max = this.appTilt();
          el.style.setProperty('--rx', `${((0.5 - py) * max * 2).toFixed(2)}deg`);
          el.style.setProperty('--ry', `${((px - 0.5) * max * 2).toFixed(2)}deg`);
          el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
          el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
        });
      };
      const onEnter = () => el.classList.add('is-tilting');
      const onLeave = () => {
        cancelAnimationFrame(frame);
        el.classList.remove('is-tilting');
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      };

      el.addEventListener('pointerenter', onEnter);
      el.addEventListener('pointermove', onMove, { passive: true });
      el.addEventListener('pointerleave', onLeave);
      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        el.removeEventListener('pointerenter', onEnter);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      });
    });
  }
}
