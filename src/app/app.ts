import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { NAV_LINKS } from './data/portfolio.data';
import { ScrollStateService } from './core/scroll-state.service';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';
import { Hero } from './sections/hero/hero';
import { TechMarquee } from './sections/tech-marquee/tech-marquee';
import { About } from './sections/about/about';
import { Skills } from './sections/skills/skills';
import { Work } from './sections/work/work';
import { Principles } from './sections/principles/principles';
import { Experience } from './sections/experience/experience';
import { Contact } from './sections/contact/contact';
import { ResumeViewer } from './shared/resume-viewer/resume-viewer';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, Hero, TechMarquee, About, Skills, Work, Principles, Experience, Contact, ResumeViewer],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  constructor() {
    const scrollState = inject(ScrollStateService);
    afterNextRender(() => scrollState.init(NAV_LINKS.map((link) => link.id)));
  }
}
