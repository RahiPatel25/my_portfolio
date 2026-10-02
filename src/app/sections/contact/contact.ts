import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';
import { RevealDirective, RevealGroupDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { MagneticDirective } from '../../shared/magnetic.directive';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective, RevealGroupDirective, SpotlightDirective, MagneticDirective],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly profile = PROFILE;
  protected readonly copied = signal(false);
  private resetTimer?: ReturnType<typeof setTimeout>;

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.profile.email);
      this.copied.set(true);
      clearTimeout(this.resetTimer);
      this.resetTimer = setTimeout(() => this.copied.set(false), 2200);
    } catch {
      window.location.href = `mailto:${this.profile.email}`;
    }
  }
}
