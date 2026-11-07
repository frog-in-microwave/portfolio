# ⚡ High-Impact Full-Stack Web Developer & AI Engineer Portfolio

A modern, high-performance developer portfolio engineered specifically for **Full Stack Web Developers & AI Systems Engineers**. Designed to showcase both deep software engineering craftsmanship (responsive client architecture, distributed backends, microservices) and state-of-the-art machine learning capabilities (autonomous agents, LangGraph, RAG pipelines, vector retrieval).

Built with **React 19, TypeScript, Tailwind CSS, Vite, and Framer Motion**.

---

## 🌟 Key Features

1. **Dynamic Neural Background Canvas**
   - Lightweight, hardware-accelerated interactive canvas that renders neural nodes and synaptic connections reacting in real-time to cursor movement.

2. **Hero Section with Live AI Pipeline Sandbox**
   - Dynamic typewriter effect highlighting core competencies.
   - Interactive **"Run Trace"** sandbox that demonstrates an end-to-end full-stack AI execution flow: API Gateway -> Hybrid Vector Search (Milvus) -> LangGraph Agent Reasoning DAG -> Reactive WebSocket Token Streaming.

3. **Full-Stack System Architecture Explorer**
   - Interactive 5-layer system design breakdown demonstrating how you architect production-scale systems:
     - *Layer 01*: Reactive Client & UI Layer (React 19, Next.js, WebSockets, Zustand)
     - *Layer 02*: Edge Gateway & Distributed Routing (FastAPI / Go, sliding window rate limits, JWT)
     - *Layer 03*: Agentic Orchestration & Reasoning DAG (LangGraph, cyclic state, guardrails)
     - *Layer 04*: Hybrid Vector & Semantic Memory (Milvus dense search, BM25 lexical, Redis semantic cache)
     - *Layer 05*: Cloud Infrastructure & MLOps Observability (Kubernetes, Docker, ArgoCD, ClickHouse)

4. **Conversational AI Portfolio Copilot (`Ask AI Copilot`)**
   - Interactive modal simulating an intelligent AI assistant trained on your background, technical philosophies, and projects.
   - Realistic token streaming effect, pre-configured quick prompts, and dynamic responses.

5. **Developer CLI Terminal Mode (`vance-cli v2.4`)**
   - Accessible via keyboard shortcut (`Ctrl + K` or `Cmd + K`) or navigation button.
   - Interactive shell supporting commands: `help`, `whoami`, `skills`, `projects`, `experience`, `contact`, `cat resume.md`, `clear`, and `exit`.

6. **Filterable Production Projects & Case Study Modal**
   - Categorized by **AI & LLM Architectures**, **Full-Stack Web**, and **Distributed Systems**.
   - Deep-dive modal for each project displaying the engineering problem, architectural solution, technical innovations, and impact metrics.

7. **Interactive Skills Matrix**
   - Filterable tabs across AI & ML, Frontend, Backend & Systems, and Cloud/MLOps.
   - Visual proficiency indicators and practical production highlights for every technology.

8. **Career Milestones & Social Proof**
   - Timeline with quantifiable achievements and role badges.
   - Endorsements from engineering leaders and research collaborators.

9. **Interactive Contact Form with Confetti Blast**
   - One-click copy email button with instant feedback.
   - Direct inquiry submission with celebratory confetti explosion (`canvas-confetti`).
   - Live HQ timezone clock in the footer.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized static bundle in the `dist/` directory ready for instant zero-config deployment.

---

## ⚙️ How to Customize with Your Own Information

All personal data, projects, skills, and links are centralized in a single file:
👉 **[`src/data/portfolioData.ts`](src/data/portfolioData.ts)**

### Step 1: Update Your Profile Info
Open `src/data/portfolioData.ts` and edit the `portfolioData.profile` object:
- `name`: Your full name.
- `role`: Your headline (e.g., *"Full Stack Web Developer & AI Engineer"*).
- `location`: Your city / country / remote status.
- `bio` & `aboutLong`: Your engineering philosophy and introduction.
- `email`, `github`, `linkedin`, `twitter`: Your links.
- `resumeUrl`: Link to your hosted PDF resume or LinkedIn.

### Step 2: Customize Projects
In the `portfolioData.projects` array, replace or add your own projects. Each project supports:
- `title`, `tagline`, `description`
- `category`: `'ai' | 'fullstack' | 'systems'`
- `metrics`: Quantifiable metrics (e.g. `[{ label: "Latency", value: "< 40ms" }]`)
- `problem` & `solution`: Detailed case study breakdown
- `architectureHighlights`: Key bullet points
- `githubUrl` & `liveUrl`

### Step 3: Customize Skills & Work Experience
- Adjust skill levels (1-100) and production highlights in `portfolioData.skills`.
- Update your timeline roles, achievements, and companies in `portfolioData.experience`.

---

## 📦 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages
You can configure a GitHub Action to deploy `dist/` directly on push to `main`.
