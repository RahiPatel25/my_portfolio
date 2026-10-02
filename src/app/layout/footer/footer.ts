import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NAV_LINKS, PROFILE } from '../../data/portfolio.data';
import { ScrollStateService } from '../../core/scroll-state.service';
import { ResumeViewerService } from '../../core/resume-viewer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly profile = PROFILE;
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();
  protected readonly resume = inject(ResumeViewerService);
  private readonly scrollState = inject(ScrollStateService);

  protected go(event: Event, id: string): void {
    event.preventDefault();
    this.scrollState.scrollTo(id);
  }
}
