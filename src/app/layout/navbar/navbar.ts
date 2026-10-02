import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { animate, scroll } from 'motion';
import { NAV_LINKS, PROFILE } from '../../data/portfolio.data';
import { ScrollStateService } from '../../core/scroll-state.service';
import { ThemeService } from '../../core/theme.service';
import { ResumeViewerService } from '../../core/resume-viewer.service';
import { EASE_OUT_EXPO, prefersReducedMotion } from '../../core/motion';

@Component({
  selector: 'app-navbar',
  imports: [A11yModule],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class Navbar {
  protected readonly links = NAV_LINKS;
  protected readonly profile = PROFILE;
  protected readonly scrollState = inject(ScrollStateService);
  protected readonly theme = inject(ThemeService);
  protected readonly resume = inject(ResumeViewerService);
  protected readonly menuOpen = signal(false);
  protected readonly isDark = computed(() => this.theme.theme() === 'dark');

  private readonly linkEls = viewChildren<ElementRef<HTMLAnchorElement>>('navLink');
  private readonly indicator = viewChild<ElementRef<HTMLSpanElement>>('indicator');
  private readonly progress = viewChild.required<ElementRef<HTMLDivElement>>('progress');
  private readonly bar = viewChild.required<ElementRef<HTMLElement>>('bar');

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Slide the active-link pill under whichever link matches the section in view.
    afterRenderEffect(() => {
      const active = this.scrollState.activeSection();
      const pill = this.indicator()?.nativeElement;
      if (!pill) return;
      const link = this.linkEls().find((l) => l.nativeElement.dataset['id'] === active)?.nativeElement;
      if (!link) {
        pill.style.opacity = '0';
        return;
      }
      pill.style.opacity = '1';
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.transform = `translateX(${link.offsetLeft}px)`;
    });

    afterNextRender(() => {
      const stopProgress = scroll(animate(this.progress().nativeElement, { scaleX: [0, 1] }, { ease: 'linear' }));
      destroyRef.onDestroy(stopProgress);
      if (!prefersReducedMotion()) {
        animate(this.bar().nativeElement, { opacity: [0, 1], y: [-24, 0] }, { duration: 1, ease: EASE_OUT_EXPO, delay: 0.9 });
      }
    });
  }

  protected go(event: Event, id: string): void {
    event.preventDefault();
    this.menuOpen.set(false);
    this.scrollState.scrollTo(id);
  }

  protected openResume(event: MouseEvent): void {
    this.menuOpen.set(false);
    this.resume.handleClick(event);
  }

  protected toggleTheme(event: MouseEvent): void {
    this.theme.toggle({ x: event.clientX, y: event.clientY });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
