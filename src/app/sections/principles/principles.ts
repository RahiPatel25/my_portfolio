import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PRINCIPLES } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-principles',
  imports: [RevealDirective],
  template: `
    <section id="principles" aria-labelledby="principles-title" class="relative overflow-hidden py-28 md:py-32">
      <div appReveal class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p class="eyebrow justify-center">Inspiration</p>
        <h2 id="principles-title" class="section-title mt-5">Words to <span class="text-gradient">build by.</span></h2>
      </div>

      <div class="marquee mt-16 [--marquee-duration:70s]" tabindex="0" aria-label="Engineering principles">
        @for (copy of [0, 1]; track copy) {
          <ul class="marquee-track" [attr.aria-hidden]="copy === 1 ? 'true' : null">
            @for (p of principles; track p.author) {
              <li class="px-3">
                <figure class="card flex h-full w-[22rem] flex-col justify-between rounded-3xl p-8 transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 md:w-[26rem]">
                  <span class="font-display text-6xl leading-none text-brand-2/40" aria-hidden="true">“</span>
                  <blockquote class="mt-2 font-display text-2xl font-medium leading-snug tracking-tight text-ink md:text-[1.7rem]">
                    {{ p.quote }}
                  </blockquote>
                  <figcaption class="mt-8 flex items-center gap-3">
                    <span class="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand/20 to-accent/20 font-display text-sm font-semibold text-brand" aria-hidden="true">
                      {{ initials(p.author) }}
                    </span>
                    <span class="leading-tight">
                      <span class="block font-semibold text-ink">{{ p.author }}</span>
                      <span class="block text-sm text-muted">{{ p.role }}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            }
          </ul>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Principles {
  protected readonly principles = PRINCIPLES;

  protected initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('');
  }
}
