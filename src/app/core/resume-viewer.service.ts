import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Opens the resume in the in-page PDF viewer. Resume links keep a real `href`,
 * so modified clicks and browsers that can't embed PDFs (most phones) still
 * fall through to opening the file in a new tab.
 */
@Injectable({ providedIn: 'root' })
export class ResumeViewerService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly isOpen = signal(false);

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  handleClick(event: MouseEvent): void {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!this.canEmbedPdf()) return;
    event.preventDefault();
    this.open();
  }

  private canEmbedPdf(): boolean {
    if (!this.isBrowser) return false;
    if (navigator.pdfViewerEnabled === false) return false;
    // Mobile browsers only show the first page (or nothing) inside an iframe.
    return !window.matchMedia('(pointer: coarse) and (max-width: 767px)').matches;
  }
}
