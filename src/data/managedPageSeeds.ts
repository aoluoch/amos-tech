import type { ManagedPage, ManagedPageKey } from "../types/content";

const defaultCta = {
  eyebrow: "Project intake",
  title: "Ready to scope a website, app, automation, or AI workflow?",
  body: "Share the problem, timeline, and must-have features. We will respond with a practical next step rather than a generic package.",
  buttonLabel: "Request a Quote"
};

/** Seed payloads written to Appwrite. Not used as runtime page fallbacks. */
export const managedPageSeeds: Record<ManagedPageKey, ManagedPage> = {
  home: {
    key: "home",
    eyebrow: "Digital systems studio",
    title: "Building digital solutions that move businesses forward.",
    description:
      "Amos Tech Solutions designs and develops websites, apps, software, AI workflows, automations, and creative digital assets for teams that need technology to work cleanly.",
    bannerText: "React • TypeScript • Appwrite Realtime • Contentful CMS • AI • Automation • Creative Systems",
    sections: [
      {
        id: "philosophy",
        title: "Engineering with a creative edge",
        body: "We combine careful system thinking with polished design so the final product feels useful, reliable, and distinctly yours."
      },
      {
        id: "proof",
        title: "Built for real operations",
        body: "From quote forms to realtime dashboards, every interface is shaped around the work people actually need to complete."
      }
    ],
    highlight: {
      id: "highlight",
      title: "From idea to launch system",
      body: "We connect strategy, design, engineering, and content operations into one delivery path."
    },
    collectionHeaders: {
      services: {
        eyebrow: "Services",
        title: "Digital services for teams that need more than a template."
      },
      projects: {
        eyebrow: "Featured Projects",
        title: "Example builds shaped around real workflows."
      },
      insights: {
        eyebrow: "Insights & Events",
        title: "Useful thinking and upcoming technical sessions."
      }
    },
    listSections: [
      {
        id: "engineering",
        eyebrow: "Engineering",
        title: "Built with maintainability in view.",
        description:
          "Readable interfaces, structured content, secure forms, and realtime admin updates keep the website useful after launch.",
        items: [
          "Reusable components",
          "Contentful collections for blog, services, events, and projects",
          "Appwrite database for managed page copy",
          "Realtime page refresh for admin changes"
        ]
      }
    ],
    cta: defaultCta
  },
  about: {
    key: "about",
    eyebrow: "About Amos Tech Solutions",
    title: "A practical technology partner for modern businesses.",
    description:
      "We help organizations plan, design, and build digital systems that are maintainable, usable, and ready for the next stage of growth.",
    sections: [
      {
        id: "mission",
        title: "Mission",
        body: "To make strong technology accessible to businesses that need dependable digital systems, not generic templates."
      },
      {
        id: "vision",
        title: "Vision",
        body: "To become a trusted technology partner for teams transforming their operations through software, automation, AI, and design."
      },
      {
        id: "values",
        title: "Values",
        body: "Clarity, reliability, creativity, technical discipline, and honest communication guide every project."
      }
    ],
    listSections: [
      {
        id: "approach",
        eyebrow: "Development approach",
        title: "Clear discovery, iterative delivery, maintainable systems.",
        items: [
          "We identify user journeys before choosing technology.",
          "We design components around content that will change.",
          "We build with accessibility, performance, and future admin workflows in mind.",
          "We keep claims grounded and project scopes transparent."
        ]
      }
    ],
    cta: defaultCta
  },
  contact: {
    key: "contact",
    eyebrow: "Contact",
    title: "Let’s map the right technology path for your project.",
    description: "Share the challenge, workflow, or idea you want to improve. We will help define the next useful step.",
    sections: [
      { id: "email", title: "Email", body: "hello@amostechsolutions.com" },
      { id: "phone", title: "Phone", body: "+254 700 000 000" },
      {
        id: "location",
        title: "Location",
        body: "Remote-first technology services with support for local and international clients."
      }
    ],
    faqs: [
      {
        question: "How soon can a project start?",
        answer: "Share the project context and we will recommend a practical next step based on scope and availability."
      },
      {
        question: "Can we request multiple services?",
        answer: "Share the project context and we will recommend a practical next step based on scope and availability."
      },
      {
        question: "Do you provide support after launch?",
        answer: "Share the project context and we will recommend a practical next step based on scope and availability."
      }
    ],
    contactEmail: "hello@amostechsolutions.com",
    contactPhone: "+254 700 000 000",
    cta: defaultCta
  },
  technologies: {
    key: "technologies",
    eyebrow: "Technology stack",
    title: "Tools selected for maintainable, modern delivery.",
    description: "We choose proven technologies that let teams move quickly without creating fragile systems.",
    sections: [
      {
        id: "approach",
        title: "Stack philosophy",
        body: "Prefer dependable tools, clear ownership boundaries, and architectures that can grow with the product."
      }
    ],
    collectionHeaders: {
      stack: {
        eyebrow: "Stack",
        title: "Engineering categories"
      }
    },
    techGroups: [
      { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Vite"] },
      { category: "Backend", items: ["Node.js", "REST APIs", "Appwrite", "Serverless"] },
      { category: "Mobile", items: ["React Native", "Expo", "Flutter"] },
      { category: "Databases", items: ["PostgreSQL", "Appwrite DB", "SQLite", "Supabase"] },
      { category: "Cloud", items: ["Vercel", "Cloudflare", "Contentful", "Object Storage"] },
      { category: "AI", items: ["OpenAI", "RAG", "Vector Search", "Evaluation"] },
      { category: "Design", items: ["Figma", "Adobe Creative Suite", "Motion Systems"] },
      { category: "Automation", items: ["n8n", "Zapier", "Make", "Webhooks"] }
    ],
    cta: defaultCta
  },
  quote: {
    key: "quote",
    eyebrow: "Request a quote",
    title: "Tell us what you want to build.",
    description:
      "Every project is assessed individually based on scope, features, complexity, timeline, integrations, and support needs.",
    sections: [
      {
        id: "note",
        title: "No fixed packages",
        body: "We do not publish generic pricing because the right solution depends on the project details."
      }
    ],
    quoteFactors: ["Scope", "Complexity", "Features", "Timeline", "Technology requirements", "Integration requirements"],
    successMessage: {
      title: "Request received.",
      body: "Thanks for your details. Our team will review the request and follow up with a practical next step."
    }
  },
  site: {
    key: "site",
    eyebrow: "Site settings",
    title: "Amos Tech Solutions",
    description: "Shared website content used across the footer and global calls to action.",
    sections: [],
    footerBlurb:
      "Websites, software, AI, automation, and creative technology services for businesses moving into sharper digital operations.",
    contactEmail: "hello@amostechsolutions.com",
    contactPhone: "+254 700 000 000",
    cta: defaultCta
  }
};

