import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { animate, scroll } from 'motion';
import { ACHIEVEMENTS, EDUCATION, ROLES } from '../../data/portfolio.data';
import { prefersReducedMotion } from '../../core/motion';
import { RevealDirective, RevealGroupDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';

@Component({
  selector: 'app-experience',
  imports: [NgOptimizedImage, RevealDirective, RevealGroupDirective, SpotlightDirective],
  templateUrl: './experience.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly roles = ROLES;
  protected readonly education = EDUCATION;
  protected readonly achievements = ACHIEVEMENTS;

  private readonly timeline = viewChild.required<ElementRef<HTMLElement>>('timeline');
  private readonly line = viewChild.required<ElementRef<HTMLElement>>('line');

  constructor() {
    const destroyRef = inject(DestroyRef);

    // The timeline rail draws itself as the section scrolls through the viewport.
    afterNextRender(() => {
      const line = this.line().nativeElement;
      if (prefersReducedMotion()) {
        line.style.transform = 'scaleY(1)';
        return;
      }
      const stop = scroll(animate(line, { scaleY: [0, 1] }, { ease: 'linear' }), {
        target: this.timeline().nativeElement,
        offset: ['start 75%', 'end 60%'],
      });
      destroyRef.onDestroy(stop);
    });
  }
}
