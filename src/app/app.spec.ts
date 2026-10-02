import {TestBed} from '@angular/core/testing';
import {App} from './app';
import {NAV_LINKS, PROJECTS} from './data/portfolio.data';
import {ThemeService} from './core/theme.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders every navigable section', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    for (const link of NAV_LINKS) {
      expect(el.querySelector(`section#${link.id}`)).not.toBeNull();
    }
  });

  it('renders a card for each project', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const titles = Array.from(fixture.nativeElement.querySelectorAll('#work article h3') as NodeListOf<HTMLElement>).map((h) => h.textContent?.trim());
    expect(titles).toEqual(PROJECTS.map((p) => p.name));
  });

  it('toggles the theme class on the document', () => {
    const theme = TestBed.inject(ThemeService);
    const before = document.documentElement.classList.contains('dark');
    theme.toggle();
    expect(document.documentElement.classList.contains('dark')).toBe(!before);
    expect(theme.theme()).toBe(before ? 'light' : 'dark');
  });
});
