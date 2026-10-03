import {
  Achievement,
  Capability,
  Education,
  NavLink,
  Principle,
  Project,
  Role,
  SkillGroup,
  Stat,
} from './portfolio.models';

export const PROFILE = {
  name: 'Rahi Patel',
  initials: 'RP',
  title: 'Senior Flutter Developer',
  tagline:
    'Building scalable, production-grade Flutter applications with clean architecture and performance-focused engineering.',
  location: 'Ahmedabad, India',
  email: 'rahi34499@gmail.com',
  phone: '+91 9537209998',
  phoneHref: 'tel:+919537209998',
  linkedin: 'http://linkedin.com/in/rahi-patel-656178186/',
  resume: 'rahi-patel-resume.pdf',
  photo: 'images/rahi-profile.png',
} as const;

export const NAV_LINKS: NavLink[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const STATS: Stat[] = [
  { value: 5, suffix: '+', label: 'Years building apps' },
  { value: 12, suffix: '+', label: 'Featured products' },
  { value: 3, suffix: '', label: 'Platforms: Android · iOS · Web' },
  { value: 4, suffix: '', label: 'Awards & community events' },
];

export const ABOUT_LEAD =
  'Experienced Flutter Developer with 5+ years of hands-on expertise in designing, developing, and maintaining high-quality cross-platform applications for Android, iOS, and Web.';

export const ABOUT_PARAGRAPHS: string[] = [
  'Strong proficiency in Dart, Flutter Web, and modern architectural patterns guided by SOLID principles, Clean Architecture, and the BLoC pattern, ensuring scalable, maintainable, and testable codebase with comprehensive unit and widget testing.',
  'Proven track record in building and delivering production-grade product applications, including e-commerce platforms, with deep experience integrating Firebase services, GraphQL APIs, and complex business logic. Well-versed in Git-based version control and the complete deployment process for Google Play Store and Apple App Store.',
  'Adept at implementing smooth animations, responsive layouts, and UX-focused interfaces, leveraging Material 3 design principles to enhance user engagement and performance across platforms.',
  'Highly collaborative team player with experience working in agile environments, effectively using Jira, Microsoft Teams, Cursor, and Antigravity to communicate, plan, and deliver features on schedule. Passionate about clean code, continuous improvement, and translating product requirements into elegant technical solutions.',
  'Additionally, possess basic working knowledge of JavaScript, Python, and MongoDB enabling effective collaboration across full-stack environments and better integration with backend systems.',
];

export const CAPABILITIES: Capability[] = [
  {
    icon: 'devices',
    title: 'Cross-platform apps',
    description: 'One Dart codebase shipped to Android, iOS and the Web without compromising native feel.',
  },
  {
    icon: 'account_tree',
    title: 'Scalable architecture',
    description: 'Clean Architecture, BLoC and SOLID principles, backed by unit and widget tests.',
  },
  {
    icon: 'animation',
    title: 'Motion & UX',
    description: 'Smooth animations, responsive layouts and Material 3 interfaces users enjoy.',
  },
  {
    icon: 'rocket_launch',
    title: 'Ship & deliver',
    description: 'End-to-end releases to Google Play and the App Store inside agile teams.',
  },
];

export const TECH_MARQUEE: string[] = [
  'Flutter',
  'Dart',
  'Flutter Web',
  'BLoC',
  'Clean Architecture',
  'Firebase',
  'GraphQL',
  'Material 3',
  'Android',
  'iOS',
  'Okta',
  'Twilio Voice',
  'Stripe',
  'Razorpay',
  'Git',
  'Jira',
  'Claude Code',
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Flutter & Mobile',
    icon: 'smartphone',
    featured: true,
    skills: ['Flutter', 'Flutter Web', 'Dart', 'Material 3', 'Animations', 'Responsive Layouts', 'Android', 'iOS'],
  },
  {
    category: 'Programming Languages',
    icon: 'code',
    skills: ['Dart', 'Python', 'JavaScript'],
  },
  {
    category: 'Architecture & Design Patterns',
    icon: 'architecture',
    skills: ['Clean Architecture', 'BLoC', 'MVVM', 'SOLID'],
  },
  {
    category: 'Backend & Cloud Services',
    icon: 'cloud',
    skills: ['Firebase', 'Firebase Hosting', 'GraphQL APIs'],
  },
  {
    category: 'Integrations & Payments',
    icon: 'extension',
    skills: ['Razorpay', 'Stripe Financial Connections', 'Twilio Voice SDK', 'Okta', 'Uber Health', 'Claude AI'],
  },
  {
    category: 'Databases',
    icon: 'storage',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    category: 'Testing',
    icon: 'fact_check',
    skills: ['Unit Testing', 'Widget Testing'],
  },
  {
    category: 'Version Control & Release',
    icon: 'commit',
    skills: ['Git', 'Bitbucket', 'GitLab', 'Azure', 'Play Store', 'App Store'],
  },
  {
    category: 'Project Management & Methodologies',
    icon: 'groups',
    skills: ['Agile Methodology', 'Jira', 'Basecamp', 'Microsoft Teams'],
  },
  {
    category: 'AI Tools / Models / CLI',
    icon: 'psychology',
    featured: true,
    skills: ['Cursor', 'Antigravity', 'Claude Code', 'Opus / Sonnet', 'Gemini 3'],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: 'topspin',
    name: 'TopSpin Club App',
    category: 'Sports & Fitness',
    summary:
      'Indoor sports & gym booking platform featuring a social timeline feed, QR-based activity entry, and a club wallet for peer-to-peer transfers.',
    highlights: ['Social timeline feed', 'QR-based activity entry', 'Club wallet with P2P transfers', 'Razorpay payments'],
    platforms: ['Android', 'iOS'],
    tags: ['Flutter', 'Razorpay', 'Firebase'],
    image: 'images/topspin.jpg',
    thumb: 'images/topspin-sm.jpg',
    accent: '#a3e635',
  },
  {
    slug: 'valet',
    name: 'TopSpin Valet',
    category: 'Enterprise',
    summary:
      'Enterprise admin companion application for operational management, event inquiries, and request tracking.',
    highlights: ['Operational management', 'Event inquiries', 'Request tracking'],
    platforms: ['Android', 'iOS'],
    tags: ['Flutter', 'Enterprise'],
    image: 'images/valet.jpg',
    thumb: 'images/valet-sm.jpg',
    accent: '#22c55e',
  },
  {
    slug: 'exp-realty',
    name: 'My Exp – Exp Realty',
    category: 'Real Estate',
    summary:
      'Real estate product platform built with Clean Architecture & BLoC. Features Web + Mobile responsiveness and secure Okta authentication.',
    highlights: ['Clean Architecture + BLoC', 'Responsive Web & Mobile', 'Secure Okta SSO'],
    platforms: ['Web', 'Android', 'iOS'],
    tags: ['Flutter Web', 'BLoC', 'Okta'],
    image: 'images/realty.jpg',
    thumb: 'images/realty-sm.jpg',
    accent: '#22d3ee',
  },
  {
    slug: 'moon-dialer',
    name: 'Moon Dialer',
    category: 'Communication',
    summary:
      'VOIP application featuring Twilio Voice SDK integration, call recordings, advanced contact management, and a subscription payment model.',
    highlights: ['Twilio Voice SDK calling', 'Call recordings', 'Advanced contact management', 'Subscription payments'],
    platforms: ['Android', 'iOS'],
    tags: ['Flutter', 'Twilio', 'VOIP'],
    image: 'images/dialer.jpg',
    thumb: 'images/dialer-sm.jpg',
    accent: '#a855f7',
  },
  {
    slug: 'trial-time',
    name: 'Trial Time',
    category: 'Healthcare',
    summary:
      'Healthcare application enabling patients to book appointments, track daily medication doses, complete check-ins, schedule rides through Uber Health, chat with doctors and staff, view appointment details, manage their wallet, earn rewards, and securely link bank accounts using Stripe Financial Connections.',
    highlights: ['Appointments & medication tracking', 'Uber Health ride scheduling', 'Doctor & staff chat', 'Wallet, rewards & Stripe bank linking'],
    platforms: ['Android', 'iOS'],
    tags: ['Flutter', 'Uber Health', 'Stripe', 'Claude AI', 'BLoC', 'Firebase'],
    image: 'images/trialtime.jpg',
    thumb: 'images/trialtime-sm.jpg',
    accent: '#14b8a6',
  },
  {
    slug: 'portfolio',
    name: 'Personal Portfolio',
    category: 'Web',
    summary:
      'A responsive portfolio application built with Flutter Web, showcasing projects and experience, deployed seamlessly using Firebase Hosting.',
    highlights: ['Responsive Flutter Web UI', 'Firebase Hosting deployment'],
    platforms: ['Web'],
    tags: ['Flutter Web', 'Firebase'],
    image: 'images/portfolio.jpg',
    thumb: 'images/portfolio-sm.jpg',
    accent: '#f59e0b',
  },
];

export const ROLES: Role[] = [
  {
    title: 'Senior Flutter Developer',
    company: 'Indianic Infotech Ltd',
    location: 'Ahmedabad, India',
    period: '02/2022 – Present',
    current: true,
    points: [
      'Build and ship production-grade Flutter apps for Android, iOS and Web across sports, real estate, VOIP and healthcare.',
      'Architect features with Clean Architecture, BLoC and SOLID principles, covered by unit and widget tests.',
      'Integrate Firebase, GraphQL APIs and SDKs such as Okta, Twilio Voice, Razorpay, Stripe and Uber Health.',
      'Own Play Store & App Store releases in agile sprints using Jira and Microsoft Teams.',
    ],
  },
  {
    title: 'Jr Android + Flutter Developer',
    company: 'Moon Technolabs',
    location: 'Ahmedabad, India',
    period: '01/2021 – 12/2021',
    points: [
      'Developed Android and Flutter app features, growing from native Android into cross-platform Flutter.',
      'Built responsive UIs and integrated APIs and Firebase services.',
      'Collaborated in agile teams with Git-based version control.',
    ],
  },
];

export const EDUCATION: Education[] = [
  { institution: 'Parul University', location: 'Vadodara, Gujarat', period: '2016 – 2020' },
];

export const ACHIEVEMENTS: Achievement[] = [
  { title: 'Pride of the Month', issuer: 'Indianic Infotech Ltd.', icon: 'emoji_events' },
  { title: 'Flutter Forward Extended', issuer: 'Ahmedabad', icon: 'flutter_dash' },
  { title: 'GDG DevFest 2022', issuer: 'Google Developer Groups', icon: 'groups' },
  { title: 'Flutter Crash Course', issuer: 'Angela Yu (Udemy)', icon: 'school' },
];

export const PRINCIPLES: Principle[] = [
  { quote: 'Design is how it works.', author: 'Steve Jobs', role: 'Co-founder, Apple Inc.' },
  { quote: 'Good programmers write code that humans can understand.', author: 'Martin Fowler', role: 'Software Engineer' },
  { quote: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman', role: 'Author' },
  { quote: 'First, solve the problem. Then, write the code.', author: 'John Johnson', role: 'Developer' },
  { quote: 'Make it work, make it right, make it fast.', author: 'Kent Beck', role: 'Software Engineer' },
];
