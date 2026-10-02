import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, effect, inject, viewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { animate } from 'motion';
import { PROFILE } from '../../data/portfolio.data';
import { ResumeViewerService } from '../../core/resume-viewer.service';
import { EASE_OUT_EXPO, prefersReducedMotion } from '../../core/motion';

/** Modal PDF viewer for the resume, built on the native <dialog> element. */
@Component({
  selector: 'app-resume-viewer',
  templateUrl: './resume-viewer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeViewer {
  protected readonly profile = PROFILE;
  protected readonly viewer = inject(ResumeViewerService);
  protected readonly src = inject(DomSanitizer).bypassSecurityTrustResourceUrl(`${PROFILE.resume}#view=FitH&navpanes=0`);

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    const restoreScroll = () => (document.documentElement.style.overflow = '');
    inject(DestroyRef).onDestroy(() => typeof document !== 'undefined' && restoreScroll());

    effect(() => {
      const dialog = this.dialog().nativeElement;
      if (this.viewer.isOpen()) {
        if (dialog.open) return;
        dialog.showModal();
        document.documentElement.style.overflow = 'hidden';
        if (!prefersReducedMotion()) {
          animate(dialog, { opacity: [0, 1], scale: [0.96, 1], y: [16, 0] }, { duration: 0.5, ease: EASE_OUT_EXPO });
        }
      } else if (dialog.open) {
        dialog.close();
        restoreScroll();
      }
    });
  }

  /** Esc and the close button both end up here via the dialog's `close` event. */
  protected onClose(): void {
    document.documentElement.style.overflow = '';
    this.viewer.close();
  }

  /** Clicks on the backdrop land on the <dialog> itself rather than its content. */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.viewer.close();
  }
}
