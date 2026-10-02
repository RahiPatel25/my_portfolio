import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { animate, scroll, stagger } from 'motion';
import { PROFILE, PROJECTS } from '../../data/portfolio.data';
import { ScrollStateService } from '../../core/scroll-state.service';
import { ResumeViewerService } from '../../core/resume-viewer.service';
import { EASE_OUT_EXPO, isFinePointer, prefersReducedMotion } from '../../core/motion';
import { MagneticDirective } from '../../shared/magnetic.directive';
import { FlutterLogo } from '../../shared/flutter-logo';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, MagneticDirective, FlutterLogo],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly profile = PROFILE;
  protected readonly apps = PROJECTS.slice(0, 3);
  protected readonly resume = inject(ResumeViewerService);
  private readonly scrollState = inject(ScrollStateService);

  private readonly section = viewChild.required<ElementRef<HTMLElement>>('section');
  private readonly rig = viewChild.required<ElementRef<HTMLElement>>('rig');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const section = this.section().nativeElement;
      const rig = this.rig().nativeElement;
      if (prefersReducedMotion()) {
        section.querySelectorAll<HTMLElement>('[data-hero]').forEach((el) => (el.style.opacity = '1'));
        return;
      }

      // Entrance sequence
      const items = section.querySelectorAll('[data-hero]');
      const device = section.querySelector('[data-hero-device]')!;
      animate(items, { opacity: [0, 1], y: [36, 0] }, { duration: 1.1, ease: EASE_OUT_EXPO, delay: stagger(0.09, { startDelay: 0.1 }) });
      animate(device, { opacity: [0, 1], y: [120, 0], scale: [0.9, 1] }, { duration: 1.6, ease: EASE_OUT_EXPO, delay: 0.35 });

      // Device rotates and lifts as the hero scrolls away.
      const stopScroll = scroll((p: number) => rig.style.setProperty('--sp', p.toFixed(3)), {
        target: section,
        offset: ['start start', 'end start'],
      });
      destroyRef.onDestroy(stopScroll);

      // Device follows the pointer anywhere in the hero.
      if (isFinePointer()) {
        let frame = 0;
        const onMove = (e: PointerEvent) => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            rig.style.setProperty('--ry', `${(x * 16).toFixed(2)}deg`);
            rig.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`);
          });
        };
        section.addEventListener('pointermove', onMove, { passive: true });
        destroyRef.onDestroy(() => section.removeEventListener('pointermove', onMove));
      }
    });
  }

  protected go(event: Event, id: string): void {
    event.preventDefault();
    this.scrollState.scrollTo(id);
  }
}
