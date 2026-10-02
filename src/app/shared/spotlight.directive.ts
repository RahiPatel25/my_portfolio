import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';
import { isFinePointer } from '../core/motion';

/** Writes the pointer position as `--mx` / `--my` so `.spotlight` can follow it. */
@Directive({
  selector: '[appSpotlight]',
  host: { class: 'spotlight' },
})
export class SpotlightDirective {
  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!isFinePointer()) return;
      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        el.style.setProperty('--my', `${e.clientY - rect.top}px`);
      };
      el.addEventListener('pointermove', onMove, { passive: true });
      destroyRef.onDestroy(() => el.removeEventListener('pointermove', onMove));
    });
  }
}
