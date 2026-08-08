import {
  Bot,
  BrainCircuit,
  Clapperboard,
  Code2,
  Cpu,
  Database,
  LayoutTemplate,
  MonitorCog,
  Palette,
  Smartphone,
  Workflow
} from "lucide-react";
import type { BlogPost, Event, Project, Service } from "../types/content";

const techImage = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Design & Development",
    shortDescription: "Responsive websites, portals, and digital platforms built for speed and clarity.",
    description:
      "We design and engineer websites that combine brand expression, performance, accessibility, and practical business workflows.",
    icon: Code2,
    image: techImage("photo-1461749280684-dccba630e2f6"),
    features: ["UX and interface design", "Frontend and backend development", "CMS integration", "Performance optimization"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Contentful"],
    process: ["Discovery and sitemap", "Wireframes and UI direction", "Component build", "QA and launch support"],
    faqs: [
      { question: "Can you redesign an existing website?", answer: "Yes. We can audit the current site, preserve useful content, and rebuild the experience around clearer journeys." },
      { question: "Do you handle content management?", answer: "Yes. We can connect Contentful, Appwrite, or another CMS depending on the content workflow." }
    ]
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    shortDescription: "Brand assets, campaign visuals, pitch materials, and digital graphics.",
    description: "We create clean, flexible visual systems for businesses that need polished communication across channels.",
    icon: Palette,
    image: techImage("photo-1558655146-d09347e92766"),
    features: ["Brand identity", "Social media graphics", "Presentation decks", "Marketing collateral"],
    technologies: ["Figma", "Adobe Illustrator", "Photoshop", "Canva"],
    process: ["Creative brief", "Visual exploration", "Design production", "Delivery kit"],
    faqs: [{ question: "Can you match an existing brand?", answer: "Yes. We can extend your current identity without forcing a full rebrand." }]
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    shortDescription: "Sharp, professional videos for products, training, campaigns, and social platforms.",
    description: "We edit footage into focused stories with pacing, sound, captions, graphics, and platform-ready exports.",
    icon: Clapperboard,
    image: techImage("photo-1574717024653-61fd2cf4d44d"),
    features: ["Product videos", "Social clips", "Training content", "Motion overlays"],
    technologies: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    process: ["Footage review", "Story assembly", "Motion and sound pass", "Revision and export"],
    faqs: [{ question: "Can you create short-form edits?", answer: "Yes. We prepare vertical, square, and landscape cuts for different channels." }]
  },
  {
    slug: "animation-motion-graphics",
    title: "Animation & Motion Graphics",
    shortDescription: "Explainers, interface motion, logo animation, and technical visual storytelling.",
    description: "We turn abstract technology ideas into motion sequences that are easy to understand and pleasant to watch.",
    icon: MonitorCog,
    image: techImage("photo-1516321318423-f06f85e504b3"),
    features: ["Explainer animations", "Logo motion", "UI animation", "Presentation loops"],
    technologies: ["After Effects", "Lottie", "Rive", "Figma"],
    process: ["Script and storyboard", "Style frames", "Animation", "Export and handoff"],
    faqs: [{ question: "Can animations be used on a website?", answer: "Yes. We can deliver optimized Lottie or video assets for web use." }]
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDescription: "Cross-platform mobile apps with usable interfaces and maintainable architecture.",
    description: "We build mobile applications for business workflows, customer engagement, and data-backed services.",
    icon: Smartphone,
    image: techImage("photo-1512941937669-90a1b58e7e9c"),
    features: ["iOS and Android apps", "API integration", "Authentication", "Offline-aware flows"],
    technologies: ["React Native", "Expo", "Flutter", "Firebase", "Appwrite"],
    process: ["Product definition", "Prototype", "MVP build", "Testing and deployment"],
    faqs: [{ question: "Do you build Android and iOS?", answer: "Yes. We typically use cross-platform tooling unless a native build is the better choice." }]
  },
  {
    slug: "desktop-app-development",
    title: "Desktop App Development",
    shortDescription: "Internal desktop tools, dashboards, and workflow applications.",
    description: "We create desktop applications for teams that need reliable local workflows and connected business systems.",
    icon: Cpu,
    image: techImage("photo-1518770660439-4636190af475"),
    features: ["Cross-platform desktop apps", "Data dashboards", "File workflows", "System integrations"],
    technologies: ["Electron", "Tauri", "React", "SQLite"],
    process: ["Workflow mapping", "Interface design", "App build", "Packaging and support"],
    faqs: [{ question: "Can desktop apps sync with cloud systems?", answer: "Yes. We can design secure sync and API integrations where needed." }]
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortDescription: "Business systems built around your operations instead of generic templates.",
    description: "We design custom platforms, portals, dashboards, and automation tools that match the way your team works.",
    icon: Database,
    image: techImage("photo-1558494949-ef010cbdcc31"),
    features: ["Internal tools", "APIs", "Dashboards", "Role-based systems"],
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "Appwrite", "Supabase"],
    process: ["Requirements", "Architecture", "Iterative delivery", "Documentation"],
    faqs: [{ question: "Can you start with an MVP?", answer: "Yes. We prefer proving the workflow first, then expanding carefully." }]
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    shortDescription: "AI-assisted workflows, intelligent search, chat experiences, and content automation.",
    description: "We help teams use AI practically: reducing repetitive work, surfacing knowledge, and improving service experiences.",
    icon: BrainCircuit,
    image: techImage("photo-1677442136019-21780ecad995"),
    features: ["AI assistants", "Knowledge search", "Document workflows", "Prompt and evaluation systems"],
    technologies: ["OpenAI", "Vector databases", "Python", "TypeScript"],
    process: ["Use-case selection", "Data and risk review", "Prototype", "Operational rollout"],
    faqs: [{ question: "Do you review AI risk?", answer: "Yes. We consider data privacy, accuracy, and human review before rollout." }]
  },
  {
    slug: "automation-solutions",
    title: "Automation Solutions",
    shortDescription: "Workflow automation that connects tools, teams, and data.",
    description: "We automate repetitive processes using integrations, dashboards, notifications, and approvals.",
    icon: Workflow,
    image: techImage("photo-1518186285589-2f7649de83e0"),
    features: ["CRM workflows", "Reporting pipelines", "Notifications", "Approval systems"],
    technologies: ["Make", "Zapier", "n8n", "APIs", "Webhooks"],
    process: ["Process audit", "Automation map", "Build and test", "Monitoring"],
    faqs: [{ question: "Can automation connect existing tools?", answer: "Yes. Most projects begin by connecting the software a team already uses." }]
  },
  {
    slug: "technology-consulting",
    title: "Technology Consulting",
    shortDescription: "Technical planning, system audits, architecture reviews, and digital strategy.",
    description: "We help teams make clear technology decisions before they spend time and budget building.",
    icon: Bot,
    image: techImage("photo-1551288049-bebda4e38f71"),
    features: ["System audits", "Architecture planning", "Vendor selection", "Roadmaps"],
    technologies: ["Cloud", "Databases", "APIs", "Security reviews"],
    process: ["Discovery", "Technical assessment", "Recommendations", "Implementation plan"],
    faqs: [{ question: "Can consulting happen before development?", answer: "Yes. It is often the best way to de-risk a larger build." }]
  }
];

export const blogPosts: BlogPost[] = [
  {
    slug: "building-business-websites-that-scale",
    title: "Building Business Websites That Scale Beyond the First Launch",
    excerpt: "A practical look at architecture, CMS structure, performance, and maintainability.",
    content:
      "A strong website is not only a visual surface. It needs content workflows, reusable components, fast pages, accessible forms, analytics readiness, and room for future services. The best builds start with a clear map of user journeys and business operations, then turn that into a maintainable component system.",
    image: techImage("photo-1498050108023-c5249f4df085"),
    category: "Web Development",
    author: "Amos Tech Solutions",
    publishedAt: "2026-02-12",
    readingTime: "5 min read",
    tags: ["Web", "CMS", "Performance"]
  },
  {
    slug: "automation-before-custom-software",
    title: "When Automation Should Come Before Custom Software",
    excerpt: "Some workflow problems can be solved faster by connecting the tools you already have.",
    content:
      "Not every operational problem needs a full custom platform on day one. Automation can validate a workflow, expose edge cases, and reduce manual effort quickly. Once the process is proven, custom software can consolidate the experience into something more reliable and tailored.",
    image: techImage("photo-1516321497487-e288fb19713f"),
    category: "Automation",
    author: "Amos Tech Solutions",
    publishedAt: "2026-03-18",
    readingTime: "4 min read",
    tags: ["Automation", "Operations", "Strategy"]
  },
  {
    slug: "practical-ai-for-small-teams",
    title: "Practical AI Workflows for Small and Growing Teams",
    excerpt: "How to identify useful AI opportunities without turning every process into an experiment.",
    content:
      "Good AI projects begin with a narrow, measurable workflow. Teams should start with repetitive tasks, documented knowledge, or support flows where human review remains possible. The implementation should include logging, evaluations, and clear escalation paths.",
    image: techImage("photo-1620712943543-bcc4688e7485"),
    category: "AI",
    author: "Amos Tech Solutions",
    publishedAt: "2026-04-07",
    readingTime: "6 min read",
    tags: ["AI", "Workflow", "Operations"]
  }
];

export const events: Event[] = [
  {
    slug: "digital-systems-readiness-clinic",
    title: "Digital Systems Readiness Clinic",
    description: "A practical session for businesses planning a new website, portal, or automation workflow.",
    image: techImage("photo-1519389950473-47ba0277781c"),
    date: "2026-09-18",
    time: "10:00 AM",
    location: "Online",
    category: "Workshop",
    status: "upcoming",
    agenda: ["Workflow mapping", "Content and data readiness", "Technology stack choices", "Q&A"]
  },
  {
    slug: "ai-automation-demo-day",
    title: "AI & Automation Demo Day",
    description: "Live demos of document workflows, internal assistants, and automated reporting pipelines.",
    image: techImage("photo-1550751827-4bd374c3f58b"),
    date: "2026-10-24",
    time: "2:00 PM",
    location: "Hybrid",
    category: "Demo",
    status: "upcoming",
    agenda: ["AI assistant demo", "Automation pipeline demo", "Implementation checklist"]
  }
];

export const projects: Project[] = [
  {
    slug: "service-business-portal",
    title: "Service Business Portal",
    description: "A demo client portal concept for quote requests, project updates, and document sharing.",
    image: techImage("photo-1551434678-e076c223a692"),
    category: "Custom Software",
    technologies: ["React", "Appwrite", "TypeScript", "Tailwind CSS"],
    features: ["Secure login", "Request tracking", "Admin dashboard", "Realtime updates"],
    industry: "Professional Services",
    challenge: "Service teams need one place to manage client requests and project communication.",
    solution: "A role-based portal connects intake forms, project status, and admin workflows.",
    results: ["Example outcome: fewer scattered messages", "Example outcome: clearer request status"],
    gallery: [techImage("photo-1551434678-e076c223a692"), techImage("photo-1553877522-43269d4ea984")]
  },
  {
    slug: "automation-command-center",
    title: "Automation Command Center",
    description: "A dashboard concept for monitoring integrations, approvals, and operational events.",
    image: techImage("photo-1460925895917-afdab827c52f"),
    category: "Automation",
    technologies: ["n8n", "Node.js", "PostgreSQL", "React"],
    features: ["Webhook monitoring", "Approval queue", "Status reporting", "Failure alerts"],
    industry: "Operations",
    challenge: "Automations can become difficult to trust when teams cannot see what happened.",
    solution: "A centralized dashboard exposes automation status and failed tasks.",
    results: ["Example outcome: faster troubleshooting", "Example outcome: better process visibility"],
    gallery: [techImage("photo-1460925895917-afdab827c52f"), techImage("photo-1551288049-bebda4e38f71")]
  }
];
