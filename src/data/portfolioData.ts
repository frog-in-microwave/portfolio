import skillsRaw from './skills.json';
import experiencesRaw from './experiences.json';
import projectsRaw from './projects.json';
import projectCategoriesRaw from './projectCategories.json';
import educationRaw from './education.json';
import coursesRaw from './courses.json';

// ==========================================
// Skills Type Definitions
// ==========================================
export interface SkillItem {
  name: string;
  highlight?: string;
  badge?: string;
  level?: string;
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
  technologies: string[];
  thumbnail?: string;
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

export interface Course {
  id: string;
  order: number;
  title: string;
  institution: string;
  period: string;
  badge?: string;
  description: string;
  skills: string[];
  certificateImage: string;
  credentialUrl?: string;
  featured?: boolean;
}

export type Training = Course;

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
  const categories = [...(projectCategoriesRaw as ProjectCategory[])];
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
  const projects = [...(projectsRaw as unknown as Project[])];
  return projects.sort((a, b) => a.order - b.order);
}

/**
 * Finds a specific project by id.
 */
export function getProjectById(id: string): Project | undefined {
  const projects = projectsRaw as unknown as Project[];
  return projects.find((p) => p.id === id);
}

/**
 * Returns courses & certifications sorted by course.order ascending.
 */
export function getSortedCourses(): Course[] {
  const courses = [...(coursesRaw as Course[])];
  return courses.sort((a, b) => a.order - b.order);
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

  education: educationRaw.education as Education[],
  courses: getSortedCourses(),
  trainings: getSortedCourses(), // backward compatibility alias

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
      answer: "Yousef specializes in full-stack engineering, cloud architecture, and AI: React, Next.js, React Native, TypeScript, Node.js, Express.js, PostgreSQL with Prisma, MongoDB, AWS (Certified Cloud Practitioner), GCP (Cloud Run, Cloud Build), and Terraform (IaC). He is also proficient in Python (PyTorch), C++, Java, and WordPress.",
    },
    {
      question: "What has Yousef achieved at Codebrave?",
      answer: "At Codebrave, Yousef worked as a Full-Stack Developer Intern contributing to a student and training management system for students, teachers, and trainers. He deployed containerized microservices to GCP Cloud Run using Cloud Build, managed cloud infrastructure with Terraform, and designed robust PostgreSQL database schemas using Prisma ORM.",
    },
    {
      question: "What did Yousef build at The Agile Labs?",
      answer: "At The Agile Labs, Yousef built web and mobile applications using the MERN stack (MongoDB, Express, React, Node.js) and React Native, implementing clean MVC architectures within an Agile/Scrum team.",
    },
    {
      question: "What projects has Yousef worked on?",
      answer: "Yousef has developed featured systems including the Miami Sunshine Summer Store (full-stack MERN e-commerce with Redux Toolkit and Stripe) and the Leaf Diagnostics Tomato Disease Classifier (custom PyTorch deep CNN & FastAPI reaching 95.1% validation accuracy).",
    },
    {
      question: "Tell me about the Miami Sunshine Summer Store project.",
      answer: "Miami Sunshine Summer Store is a full-stack MERN e-commerce application engineered with React 18, Vite, Redux Toolkit, Node.js, Express 5, MongoDB with Mongoose, and Stripe Checkout Sessions. It features an expressive neo-brutalist coastal aesthetic, JWT bearer token authentication, infinite-scroll product catalog with regex search and category filtering, Redux-managed cart persistence, user profile customization with status badges, and rate-limited payment processing.",
    },
    {
      question: "Tell me about the Tomato Disease Classifier project.",
      answer: "Leaf Diagnostics is an AI-powered tomato leaf disease classifier developed by Yousef Abdallah for the LebNet Tech Fellows AI course. It uses a custom 5-stage PyTorch CNN trained on 10,900+ images from PlantVillage and the Pakistan Tomato Leaf dataset, achieving 95.1% validation accuracy. It distinguishes healthy leaves from 5 pathologies (Early Blight, Late Blight, Leaf Mold, Tomato Yellow Leaf Curl Virus, and Septoria Leaf Spot) and is deployed with a FastAPI backend and a responsive Netlify web app with live camera capture and test sample support.",
    },
    {
      question: "How can I contact Yousef for an interview or opportunity?",
      answer: "You can email Yousef directly at yousef.abdallah.lbx@gmail.com, call +961 70646225, or submit a message through the contact form on this portfolio.",
    },
  ],
};
