import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Flutter mark (Simple Icons path), decorative. */
@Component({
  selector: 'app-flutter-logo',
  template: `<svg viewBox="0 0 24 24" class="h-full w-full" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
  </svg>`,
  host: { class: 'inline-block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlutterLogo {}
