import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ABOUT_LEAD, ABOUT_PARAGRAPHS, CAPABILITIES, PROFILE, STATS } from '../../data/portfolio.data';
import { RevealDirective, RevealGroupDirective } from '../../shared/reveal.directive';
import { TiltDirective } from '../../shared/tilt.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { CountUpDirective } from '../../shared/count-up.directive';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, RevealDirective, RevealGroupDirective, TiltDirective, SpotlightDirective, CountUpDirective],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly profile = PROFILE;
  protected readonly lead = ABOUT_LEAD;
  protected readonly paragraphs = ABOUT_PARAGRAPHS;
  protected readonly capabilities = CAPABILITIES;
  protected readonly stats = STATS;
  protected readonly expanded = signal(false);
}
