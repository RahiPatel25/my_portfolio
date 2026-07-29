import { Component, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { animate, inView, stagger, scroll } from 'motion';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  currentYear = new Date().getFullYear();
  isScrolled = false;
  isMobileMenuOpen = false;
  isDarkMode = false;

  quotes = [
    { 
      text: "Design is not just what it looks like and feels like. Design is how it works. It's about creating a seamless experience that empowers the user. When you truly understand the problem, the solution reveals itself in the most elegant way possible. We must strive for simplicity, not just for the sake of minimalism, but to remove the barriers between the user and their goals. Every pixel, every interaction, and every line of code must serve a purpose. The best designs are those that disappear, leaving only the pure utility and joy of the experience.", 
      author: "Steve Jobs", 
      role: "Co-founder, Apple Inc.", 
      highlight: "Design is how it works.", 
      image: "https://picsum.photos/seed/stevejobs/100/100", 
      color: "indigo" 
    },
    { 
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. The true craft of software engineering lies in communication—not just with the machine, but with the developers who will come after you. Code is read far more often than it is written. Therefore, clarity, maintainability, and expressiveness should always take precedence over cleverness. A well-structured codebase is like a well-written book: it tells a story, guides the reader, and leaves no room for ambiguity. Strive to write code that is a joy to read.", 
      author: "Martin Fowler", 
      role: "Software Engineer", 
      highlight: "Good programmers write code that humans can understand.", 
      image: "https://picsum.photos/seed/martinfowler/100/100", 
      color: "emerald" 
    },
    { 
      text: "Simplicity is the soul of efficiency. In a world cluttered with complex solutions and over-engineered systems, the ability to distill a problem down to its core essence is a superpower. When we build software, every added feature is a liability, every extra line of code is a potential bug. True mastery is knowing what to leave out. By focusing on the essential, we create systems that are robust, scalable, and easy to understand. The most profound innovations often stem from the simplest ideas, executed with unwavering precision and clarity.", 
      author: "Austin Freeman", 
      role: "Author", 
      highlight: "Simplicity is the soul of efficiency.", 
      image: "https://picsum.photos/seed/austin/100/100", 
      color: "blue" 
    },
    { 
      text: "First, solve the problem. Then, write the code. Too often, developers rush into writing syntax without fully grasping the domain they are modeling. This leads to fragile architectures and endless refactoring. Take a step back. Sketch the architecture, understand the user's pain points, and define the boundaries of your system. Code is merely the translation of your thought process into a language the machine can execute. If the thought process is flawed, the code will be too. A well-thought-out solution practically writes itself.", 
      author: "John Johnson", 
      role: "Developer", 
      highlight: "First, solve the problem. Then, write the code.", 
      image: "https://picsum.photos/seed/john/100/100", 
      color: "purple" 
    },
    { 
      text: "Make it work, make it right, make it fast. This mantra encapsulates the entire lifecycle of software development. First, focus on delivering value and proving the concept. Don't get bogged down in premature optimization. Once it works, refactor it. Apply design patterns, ensure it's testable, and make the architecture sound. Only then, if performance is an issue, should you optimize. Chasing milliseconds before the architecture is stable is a fool's errand. Build for correctness first, and speed will follow when necessary.", 
      author: "Kent Beck", 
      role: "Software Engineer", 
      highlight: "Make it work, make it right, make it fast.", 
      image: "https://picsum.photos/seed/kent/100/100", 
      color: "orange" 
    }
  ];

  skillCategories = [
    {
      category: 'Programming Languages',
      icon: 'code',
      skills: ['Dart', 'Python', 'JavaScript']
    },
    {
      category: 'App Development & Frameworks',
      icon: 'smartphone',
      skills: ['Flutter']
    },
    {
      category: 'Architecture & Design Patterns',
      icon: 'architecture',
      skills: ['MVVM', 'Clean Architecture']
    },
    {
      category: 'Backend & Cloud Services',
      icon: 'cloud',
      skills: ['Firebase']
    },
    {
      category: 'Databases',
      icon: 'storage',
      skills: ['MongoDB', 'MySQL']
    },
    {
      category: 'Testing',
      icon: 'fact_check',
      skills: ['Unit Testing / Widget Testing']
    },
    {
      category: 'Version Control',
      icon: 'account_tree',
      skills: ['Git', 'Bitbucket', 'GitLab', 'Azure']
    },
    {
      category: 'Project Management & Methodologies',
      icon: 'groups',
      skills: ['Agile Methodology', 'Jira', 'Basecamp', 'Microsoft Teams']
    },
    {
      category: 'AI Tools / Models / CLI',
      icon: 'psychology',
      skills: ['Cursor', 'Antigravity', 'Claude Code', 'Opus / Sonnet', 'Gemini 3']
    }
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      this.isDarkMode = false;
      this.applyTheme();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  private applyTheme() {
    if (typeof document !== 'undefined') {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  ngAfterViewInit() {
    if (typeof document !== 'undefined') {
      // Initial Load Animation Sequence
      animate('.hero-availability', { opacity: [0, 1], y: [20, 0] }, { duration: 1.2, ease: [0.22, 1, 0.36, 1] });
      
      animate('.hero-name', { opacity: [0, 1], y: [60, 0] }, { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 });
      
      animate('.hero-rest', { opacity: [0, 1], y: [30, 0] }, { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.8 });
      
      animate('.app-bar', { opacity: [0, 1], y: [-20, 0] }, { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.0 });

      inView('.animate-up', (element: Element) => {
        animate(element, { opacity: [0, 1], y: [40, 0] }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
      });

      inView('.animate-stagger', (element: Element) => {
        const children = element.querySelectorAll('.stagger-item');
        animate(children, { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.1), duration: 0.6, ease: 'easeOut' });
      });

      const workContainer = document.querySelector('#work');
      const workContent = document.querySelector('#work-horizontal-content');
      
      if (workContainer && workContent) {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        if (mediaQuery.matches) {
          scroll(
            animate(workContent, { transform: ['translateX(0%)', 'translateX(calc(-100% + 100vw))'] }),
            { target: workContainer }
          );
        }
      }
    }
  }

  scrollTo(sectionId: string) {
    this.isMobileMenuOpen = false;
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
