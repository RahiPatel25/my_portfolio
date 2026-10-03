import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { scroll } from 'motion';
import { PROJECTS } from '../../data/portfolio.data';
import { ScrollStateService } from '../../core/scroll-state.service';
import { RevealDirective, RevealGroupDirective } from '../../shared/reveal.directive';
import { TiltDirective } from '../../shared/tilt.directive';

const PIN_QUERY = '(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)';

const PLATFORM_ICONS: Record<string, string> = {
  Android: 'android',
  iOS: 'phone_iphone',
  Web: 'language',
};

/**
 * Projects gallery. On large screens the section pins and the track scrolls
 * horizontally with the page; everywhere else it is a plain responsive grid.
 */
@Component({
  selector: 'app-work',
  imports: [RevealDirective, RevealGroupDirective, TiltDirective],
  templateUrl: './work.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Work {
  protected readonly projects = PROJECTS;
  protected readonly platformIcons = PLATFORM_ICONS;
  protected readonly pinned = signal(false);
  protected readonly sectionHeight = signal<string | null>(null);
  protected readonly scrollState = inject(ScrollStateService);

  private readonly section = viewChild.required<ElementRef<HTMLElement>>('section');
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly progress = viewChild<ElementRef<HTMLElement>>('progress');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof window.matchMedia !== 'function') return;
      const mq = window.matchMedia(PIN_QUERY);
      let stopScroll: VoidFunction | undefined;
      let distance = 0;

      const measure = () => {
        const track = this.track().nativeElement;
        // clientWidth excludes the scrollbar, so the track's end is never hidden behind it.
        distance = Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
        this.sectionHeight.set(`${distance + window.innerHeight}px`);
      };

      const setup = () => {
        stopScroll?.();
        stopScroll = undefined;
        const track = this.track().nativeElement;
        track.style.transform = '';
        this.pinned.set(mq.matches);
        if (!mq.matches) {
          this.sectionHeight.set(null);
          return;
        }
        // Wait a frame so the pinned layout is rendered before measuring.
        requestAnimationFrame(() => {
          measure();
          stopScroll = scroll(
            (p: number) => {
              track.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
              this.progress()?.nativeElement.style.setProperty('transform', `scaleX(${p})`);
            },
            { target: this.section().nativeElement, offset: ['start start', 'end end'] },
          );
        });
      };

      const onResize = () => mq.matches && measure();
      const resizeObserver = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(onResize);
      resizeObserver?.observe(this.track().nativeElement);
      setup();
      mq.addEventListener('change', setup);
      window.addEventListener('resize', onResize, { passive: true });
      destroyRef.onDestroy(() => {
        stopScroll?.();
        resizeObserver?.disconnect();
        mq.removeEventListener('change', setup);
        window.removeEventListener('resize', onResize);
      });
    });
  }

  protected go(event: Event, id: string): void {
    event.preventDefault();
    this.scrollState.scrollTo(id);
  }
}
