import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SKILL_GROUPS } from '../../data/portfolio.data';
import { RevealDirective, RevealGroupDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { FlutterLogo } from '../../shared/flutter-logo';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective, RevealGroupDirective, SpotlightDirective, FlutterLogo],
  templateUrl: './skills.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
}
