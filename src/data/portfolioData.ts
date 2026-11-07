export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'ai' | 'fullstack' | 'systems';
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  architectureHighlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillItem {
  name: string;
  level: number;
  highlight?: string;
}

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
    bio: "Computer Engineering student and versatile Full-Stack Developer & AI Engineer with hands-on experience delivering web and mobile applications across the MERN and Next.js ecosystems, automated cloud infrastructure (GCP, Terraform, Cloud Run), and scalable data systems (PostgreSQL, Prisma, Firebase GraphQL, MongoDB).",
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

  skills: {
    frontend: {
      title: "Frontend & Mobile Engineering",
      description: "Modern, reactive web and mobile interfaces built with TypeScript and state-of-the-art frameworks.",
      skills: [
        { name: "React & Next.js", level: 92, highlight: "App router, SSR, client-server components, state hooks" },
        { name: "React Native & Expo", level: 88, highlight: "Cross-platform mobile applications for iOS & Android" },
        { name: "TypeScript & JavaScript", level: 90, highlight: "Strict typing, ES6+ asynchronous workflows" },
        { name: "HTML5 & Modern CSS / Tailwind", level: 92, highlight: "Responsive layouts, mobile-first design systems" },
      ],
    },
    backend: {
      title: "Backend & API Development",
      description: "Scalable backend services, RESTful APIs, and GraphQL query layers.",
      skills: [
        { name: "Node.js & Express.js", level: 90, highlight: "REST APIs, middleware pipelines, MVC architecture" },
        { name: "GraphQL & Firebase Data Connect", level: 85, highlight: "Declarative schemas, mutations, and queries" },
        { name: "MVC Architectural Pattern", level: 88, highlight: "Clean separation of business logic, models & routing" },
      ],
    },
    cloud: {
      title: "Cloud, Databases & DevOps",
      description: "Cloud-native deployments, infrastructure as code, and relational / document databases.",
      skills: [
        { name: "Google Cloud Platform (GCP) & Cloud Run", level: 84, highlight: "Containerized deployment, Cloud Build CI/CD" },
        { name: "Terraform (Infrastructure as Code)", level: 82, highlight: "Cloud resource orchestration, declarative configs" },
        { name: "PostgreSQL & Prisma ORM", level: 88, highlight: "Relational data modeling, schema migrations, ACID" },
        { name: "MongoDB (MERN Stack)", level: 88, highlight: "NoSQL document storage, aggregation pipelines" },
        { name: "Git & Agile Workflow", level: 92, highlight: "Branching strategies, sprint planning, PR reviews" },
      ],
    },
    languages: {
      title: "Languages & Core Tools",
      description: "Multi-paradigm programming languages and CMS engineering.",
      skills: [
        { name: "Python", level: 88, highlight: "Data scripting, web backend, and AI integration" },
        { name: "C++", level: 82, highlight: "Systems programming, algorithms, and performance" },
        { name: "Java", level: 80, highlight: "Object-oriented design patterns and multi-threading" },
        { name: "WordPress CMS", level: 85, highlight: "Custom theme customization, layout architecture" },
      ],
    },
  },

  // Projects kept empty as instructed
  projects: [] as Project[],

  experience: [
    {
      period: "01/2026 - 04/2026",
      role: "Full-Stack Developer Intern",
      company: "Codebrave",
      location: "Beirut, Lebanon",
      type: "Internship",
      description: "Engineered core modules for a comprehensive student and training management system serving students, teachers, and trainers across Lebanon.",
      achievements: [
        "Contributed to building and scaling a student and training management portal with full role-based access for students, teachers, and trainers.",
        "Configured GCP, Cloud Run, and Cloud Build pipelines for automated, containerized continuous deployment.",
        "Wrote and maintained Terraform scripts for Infrastructure as Code (IaC) and reliable cloud resource orchestration.",
        "Designed PostgreSQL database schemas with Prisma ORM, later spearheading migration to Firebase Data Connect to leverage GraphQL capabilities.",
      ],
      technologies: ["GCP", "Cloud Run", "Cloud Build", "Terraform", "PostgreSQL", "Prisma", "Firebase Data Connect", "GraphQL", "TypeScript"],
    },
    {
      period: "01/2026 - 04/2026",
      role: "Full-Stack Developer Intern",
      company: "The Agile Labs",
      location: "Online / Remote",
      type: "Internship",
      description: "Developed web and cross-platform mobile applications utilizing the MERN stack in an intensive Agile team environment.",
      achievements: [
        "Built responsive mobile and web applications utilizing MongoDB, Express.js, React, React Native, and Node.js.",
        "Collaborated with developers in high-velocity Agile sprints, participating in daily standups, sprint planning, and iterative shipping.",
        "Structured application logic adhering to strict Model-View-Controller (MVC) architecture for clean maintainability.",
        "Managed version control, merge requests, and code quality workflows using Git.",
      ],
      technologies: ["React", "React Native", "Node.js", "Express.js", "MongoDB", "MERN", "Git", "MVC Architecture"],
    },
    {
      period: "04/2025 - 08/2025",
      role: "WordPress Intern",
      company: "CONCAT Tech",
      location: "Online / Remote",
      type: "Internship",
      description: "Collaborated in an international engineering cohort on client web delivery, layout organization, and performance.",
      achievements: [
        "Developed and launched the Musana Yoga website using WordPress.",
        "Partnered with co-interns on end-to-end design layout, typography, navigation, and responsiveness.",
        "Proposed and organized weekly technical coordination meetings to align on requirements, review pull requests, and solve blockers ahead of deadlines.",
      ],
      technologies: ["WordPress", "HTML & CSS", "Responsive Web Design", "Team Leadership"],
    },
  ] as Experience[],

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
      answer: "At Codebrave, Yousef contributed to a student and training management system for students, teachers, and trainers. He deployed applications to GCP Cloud Run using Cloud Build, managed infrastructure with Terraform, and migrated from PostgreSQL/Prisma to Firebase Data Connect for GraphQL capabilities.",
    },
    {
      question: "What did Yousef build at The Agile Labs?",
      answer: "At The Agile Labs, Yousef built web and mobile applications using the MERN stack (MongoDB, Express, React, Node.js) and React Native, implementing clean MVC architectures within an Agile/Scrum team.",
    },
    {
      question: "How can I contact Yousef for an interview or opportunity?",
      answer: "You can email Yousef directly at yousef.abdallah.lbx@gmail.com, call +961 70646225, or submit a message through the contact form on this portfolio.",
    },
  ],
};
