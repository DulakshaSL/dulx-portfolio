// src/data/skills.js
import { Layers3, Database, BrainCircuit } from "lucide-react";

export const skills = [
  {
    title: "Full-Stack Web Applications",
    icon: Layers3,
    level: "Strong",
    description:
      "Designing and building scalable web applications end-to-end — from frontend UI to backend logic and deployment.",
    items: [
      "Authentication & authorization systems",
      "Secure API architecture & backend logic",
      "Role-based access control (RBAC)",
      "CRUD systems & admin dashboards",
      "Responsive UI & clean component structure",
      "Production-ready deployment setup",
    ],
    chips: ["React.js", "Node.js", "HTML", "CSS", "PHP", "Tailwind"],
  },

  {
    title: "Databases & Data Layer",
    icon: Database,
    level: "Good",
    description:
      "Designing and integrating relational and NoSQL databases efficiently within modern applications.",
    items: [
      "Schema design & normalization",
      "Optimized query writing & indexing",
      "Relational (MySQL) & NoSQL (MongoDB)",
      "API ↔ Database integration",
      "Data validation & integrity handling",
      "Efficient CRUD data operations",
    ],
    chips: ["MySQL", "MongoDB", "Schema Design", "Query Optimization"],
  },

  {
    title: "Machine Learning (Applied)",
    icon: BrainCircuit,
    level: "Moderate",
    description:
      "Applying machine learning workflows and integrating trained models into real-world applications.",
    items: [
      "Model training & hyperparameter tuning",
      "Evaluation using RMSE / R² metrics",
      "Feature engineering & preprocessing",
      "Model comparison & selection",
      "Integrating ML models into web systems",
    ],
    chips: [], // as requested — no chips
  },
];
