import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TECH_MARQUEE } from '../../data/portfolio.data';
import { FlutterLogo } from '../../shared/flutter-logo';

@Component({
  selector: 'app-tech-marquee',
  imports: [FlutterLogo],
  template: `
    <section aria-label="Core technologies" class="relative border-y border-line bg-surface/60 py-6">
      <ul class="sr-only">
        @for (tech of tech; track tech) {
          <li>{{ tech }}</li>
        }
      </ul>
      <div class="marquee [--marquee-duration:45s]" aria-hidden="true">
        @for (copy of [0, 1]; track copy) {
          <div class="marquee-track">
            @for (tech of tech; track tech) {
              <span class="flex items-center gap-6 px-6 font-display text-2xl font-medium tracking-tight text-muted transition-colors hover:text-ink md:text-3xl">
                {{ tech }}
                <app-flutter-logo class="h-4 w-4 text-brand-2/70" />
              </span>
            }
          </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechMarquee {
  protected readonly tech = TECH_MARQUEE;
}
