export interface NavLink {
  id: string;
  label: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Capability {
  icon: string;
  title: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
  /** Featured groups span two bento columns. */
  featured?: boolean;
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  summary: string;
  highlights: string[];
  platforms: string[];
  tags: string[];
  image: string;
  /** Small square thumbnail (160px). */
  thumb: string;
  /** Hex accent used for glows, borders and tag tints. */
  accent: string;
}

export interface Role {
  title: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  points: string[];
}

export interface Education {
  institution: string;
  location: string;
  period: string;
}

export interface Achievement {
  title: string;
  issuer: string;
  icon: string;
  /** Small square thumbnail (160px). */
  image?: string;
}

export interface Principle {
  quote: string;
  author: string;
  role: string;
}
