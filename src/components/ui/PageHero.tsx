import { Link } from "react-router-dom";

export type HeroVariant =
  | "home"
  | "about"
  | "contact"
  | "technologies"
  | "quote"
  | "services"
  | "service"
  | "projects"
  | "project"
  | "blog"
  | "events"
  | "event";

type HeroPanel = {
  code: string;
  chips: string[];
};

const heroPanels: Record<HeroVariant, HeroPanel> = {
  home: {
    code: `const solution = {
  design: "clear",
  systems: "scalable",
  realtime: true,
  brand: "Amos Tech"
};`,
    chips: ["API", "CMS", "AI", "APP", "DB", "UX"]
  },
  about: {
    code: `const studio = {
  mission: "dependable systems",
  approach: "iterative",
  craft: "practical",
  partner: true
};`,
    chips: ["TEAM", "PLAN", "BUILD", "SHIP", "CARE", "GROW"]
  },
  contact: {
    code: `const outreach = {
  channel: "direct",
  response: "practical",
  intake: "open",
  nextStep: "mapped"
};`,
    chips: ["MAIL", "CALL", "CHAT", "BRIEF", "SCOPE", "BOOK"]
  },
  technologies: {
    code: `const stack = {
  frontend: "React",
  backend: "APIs",
  data: "Appwrite",
  delivery: "maintainable"
};`,
    chips: ["REACT", "NODE", "SQL", "CLOUD", "AI", "AUTO"]
  },
  quote: {
    code: `const quote = {
  scope: "defined",
  complexity: "assessed",
  timeline: "aligned",
  estimate: "custom"
};`,
    chips: ["SCOPE", "TIME", "STACK", "COST", "RISK", "PLAN"]
  },
  services: {
    code: `const services = {
  web: true,
  mobile: true,
  automation: true,
  creative: true
};`,
    chips: ["WEB", "APP", "AI", "AUTO", "DESIGN", "VIDEO"]
  },
  service: {
    code: `const delivery = {
  discovery: "first",
  build: "modular",
  quality: "checked",
  handoff: "clear"
};`,
    chips: ["DISC", "DESIGN", "BUILD", "QA", "LAUNCH", "SUPPORT"]
  },
  projects: {
    code: `const portfolio = {
  focus: "real workflows",
  proof: "demo-ready",
  outcomes: "measurable",
  reuse: true
};`,
    chips: ["CASE", "FLOW", "STACK", "UX", "DATA", "LIVE"]
  },
  project: {
    code: `const caseStudy = {
  challenge: "mapped",
  solution: "built",
  result: "validated",
  next: "scale"
};`,
    chips: ["NEED", "BUILD", "TEST", "SHIP", "LEARN", "SCALE"]
  },
  blog: {
    code: `const article = {
  topic: "practical tech",
  audience: "business teams",
  depth: "actionable",
  format: "clear"
};`,
    chips: ["IDEA", "DRAFT", "EDIT", "SHIP", "SHARE", "LEARN"]
  },
  events: {
    code: `const session = {
  format: "workshop",
  focus: "systems",
  style: "hands-on",
  outcome: "usable"
};`,
    chips: ["TALK", "DEMO", "LAB", "Q&A", "NETWORK", "NOTES"]
  },
  event: {
    code: `const agenda = {
  intro: "context",
  demo: "live",
  practice: "guided",
  close: "next steps"
};`,
    chips: ["WHEN", "WHERE", "TOPIC", "HOST", "SEATS", "JOIN"]
  }
};

function HeroVisual({ variant }: { variant: HeroVariant }) {
  const panel = heroPanels[variant] ?? heroPanels.home;

  return (
    <div className="tech-panel min-h-[320px] p-6">
      <div className="relative z-10 grid h-full gap-4">
        <div className="rounded-md border border-ink bg-paper p-4">
          <div className="mb-3 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-teal" />
            <span className="h-3 w-3 rounded-full bg-brand" />
            <span className="h-3 w-3 rounded-full bg-ink" />
          </div>
          <pre className="overflow-hidden text-xs leading-6 text-steel">{panel.code}</pre>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {panel.chips.map((item) => (
            <div key={item} className="rounded-md border border-ink bg-teal/80 p-4 text-center font-mono font-bold">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  cta = true,
  variant = "home"
}: {
  eyebrow: string;
  title: string;
  description: string;
  cta?: boolean;
  variant?: HeroVariant;
}) {
  return (
    <section className="section border-b border-ink">
      <div className="container grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-4 text-brand">{title}</h1>
          <p className="lede mt-6 max-w-3xl">{description}</p>
          {cta && (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/request-quote" className="btn btn-primary">
                Request a Quote
              </Link>
              <Link to="/services" className="btn btn-secondary">
                Explore Services
              </Link>
            </div>
          )}
        </div>
        <HeroVisual variant={variant} />
      </div>
    </section>
  );
}
