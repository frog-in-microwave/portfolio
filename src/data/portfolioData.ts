import skillsRaw from './skills.json';
import experiencesRaw from './experiences.json';
import projectsRaw from './projects.json';

// ==========================================
// Skills Type Definitions
// ==========================================
export interface SkillItem {
  name: string;
  highlight?: string;
  order: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  order: number;
  skills: SkillItem[];
}

// ==========================================
// Experience Type Definitions
// ==========================================
export interface Experience {
  id: string;
  order: number;
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

// ==========================================
// Projects Type Definitions
// ==========================================
export interface ProjectSubcategory {
  id: string;
  name: string;
  order: number;
}

export interface ProjectCategory {
  id: string;
  name: string;
  order: number;
  subcategories: ProjectSubcategory[];
}

export interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
  caption: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  docs?: string;
  demo?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  order: number;
  categoryId: string;
  subcategoryId: string;
  featured: boolean;
  role: string;
  timeline: string;
  badge?: string;
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  metrics: ProjectMetric[];
  technologies: string[];
  architectureHighlights: string[];
  keyFeatures: string[];
  media: ProjectMedia[];
  links: ProjectLinks;
}

export interface ProjectsData {
  categories: ProjectCategory[];
  projects: Project[];
}

// ==========================================
// Profile & Education Definitions
// ==========================================
export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description?: string;
}

export interface Training {
  title: string;
  institution: string;
}

// ==========================================
// Data Sorting & Retrieval Helpers
// ==========================================

/**
 * Returns skill categories sorted by category.order ascending,
 * with each category's skills sorted by skill.order ascending.
 */
export function getSortedSkills(): SkillCategory[] {
  const categories = [...(skillsRaw as SkillCategory[])];
  return categories
    .sort((a, b) => a.order - b.order)
    .map((cat) => ({
      ...cat,
      skills: [...cat.skills].sort((a, b) => a.order - b.order),
    }));
}

/**
 * Returns work experiences sorted by order ascending.
 */
export function getSortedExperiences(): Experience[] {
  const experiences = [...(experiencesRaw as Experience[])];
  return experiences.sort((a, b) => a.order - b.order);
}

/**
 * Returns project categories sorted by category.order ascending,
 * with subcategories sorted by subcategory.order ascending.
 */
export function getSortedProjectCategories(): ProjectCategory[] {
  const categories = [...(projectsRaw.categories as ProjectCategory[])];
  return categories
    .sort((a, b) => a.order - b.order)
    .map((cat) => ({
      ...cat,
      subcategories: [...cat.subcategories].sort((a, b) => a.order - b.order),
    }));
}

/**
 * Returns all projects sorted by project.order ascending.
 */
export function getSortedProjects(): Project[] {
  const projects = [...(projectsRaw.projects as unknown as Project[])];
  return projects.sort((a, b) => a.order - b.order);
}

/**
 * Finds a specific project by id.
 */
export function getProjectById(id: string): Project | undefined {
  const projects = projectsRaw.projects as unknown as Project[];
  return projects.find((p) => p.id === id);
}

// ==========================================
// Unified Portfolio Export
// ==========================================
export const portfolioData = {
  profile: {
    name: "Yousef Abdallah",
    role: "Full-Stack Web Developer & AI Engineer",
    secondaryTitle: "Next.js • React / React Native • Node.js • Cloud & DevOps • Python",
    location: "Beirut / Saida, Lebanon (Open to Remote)",
    phone: "+961 70646225",
    email: "yousef.abdallah.lbx@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    resumeUrl: "/resume.pdf",
    statusBadge: "Available for Full-Stack & AI Engineering Opportunities",
    isAvailable: true,
    bio: "Computer Engineering student and Full-Stack Developer crafting fast, scalable web and mobile applications with Next.js, React Native, and GCP or AWS cloud infrastructure.",
    stats: [
      { label: "Completed Projects & Deployments", value: "8+" },
      { label: "Engineering Disciplines", value: "Full-Stack & Cloud" },
      { label: "Cloud Platforms", value: "GCP & Terraform" },
      { label: "Methodology", value: "Agile & CI/CD" },
    ],
  },

  education: [
    {
      degree: "Computer Engineering",
      institution: "Lebanese International University - Saida",
      period: "09/2025 - 06/2028",
      location: "Lebanon",
      description: "Rigorous engineering curriculum covering computer architecture, algorithms, data structures, software engineering, and systems programming.",
    },
  ] as Education[],

  trainings: [
    {
      title: "Codebrave Python and Web-Dev Program",
      institution: "Codebrave",
    },
  ] as Training[],

  // Loaded from JSON
  skills: getSortedSkills(),
  experience: getSortedExperiences(),
  projects: getSortedProjects(),
  projectCategories: getSortedProjectCategories(),

  aiCopilotKnowledge: [
    {
      question: "What is Yousef Abdallah's educational background?",
      answer: "Yousef is studying Computer Engineering at the Lebanese International University (LIU) in Saida (2025-2028). He also completed the Codebrave Python and Web-Dev Program.",
    },
    {
      question: "What is Yousef's core tech stack?",
      answer: "Yousef specializes in full-stack engineering and cloud deployment: React, Next.js, React Native, TypeScript, Node.js, Express.js, GraphQL, PostgreSQL with Prisma, MongoDB, GCP (Cloud Run, Cloud Build), and Terraform (IaC). He is also proficient in Python, C++, Java, and WordPress.",
    },
    {
      question: "What has Yousef achieved at Codebrave?",
      answer: "At Codebrave, Yousef worked as a Full-Stack Developer Intern contributing to a student and training management system for students, teachers, and trainers. He deployed applications to GCP Cloud Run using Cloud Build, managed infrastructure with Terraform, and migrated from PostgreSQL/Prisma to Firebase Data Connect for GraphQL capabilities.",
    },
    {
      question: "What did Yousef build at The Agile Labs?",
      answer: "At The Agile Labs, Yousef built web and mobile applications using the MERN stack (MongoDB, Express, React, Node.js) and React Native, implementing clean MVC architectures within an Agile/Scrum team.",
    },
    {
      question: "What projects has Yousef worked on?",
      answer: "Yousef has developed several featured systems including the EduBrave Learning Portal (Next.js 16, GraphQL, PostgreSQL), the TerraRun Cloud Orchestrator (Terraform IaC and GCP Cloud Run zero-downtime pipelines), and PulseAI Copilot & Knowledge Engine (hybrid vector search and SSE token streaming).",
    },
    {
      question: "How can I contact Yousef for an interview or opportunity?",
      answer: "You can email Yousef directly at yousef.abdallah.lbx@gmail.com, call +961 70646225, or submit a message through the contact form on this portfolio.",
    },
  ],
};
