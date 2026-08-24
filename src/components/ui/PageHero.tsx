import type { ReactNode } from "react";
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
  | "post"
  | "events"
  | "event";

/** Fixed-length tuples keep every hero panel exactly the same size on every page. */
type HeroCode = [string, string, string, string, string, string];
type HeroChips = [string, string, string, string, string, string];

type HeroPanel = {
  code: HeroCode;
  chips: HeroChips;
};

const heroPanels: Record<HeroVariant, HeroPanel> = {
  home: {
    code: ["const solution = {", '  design: "clear",', '  systems: "scalable",', "  realtime: true,", '  brand: "Amos Tech"', "};"],
    chips: ["API", "CMS", "AI", "APP", "DB", "UX"]
  },
  about: {
    code: ["const studio = {", '  mission: "dependable",', '  approach: "iterative",', '  craft: "practical",', "  partner: true", "};"],
    chips: ["TEAM", "PLAN", "BUILD", "SHIP", "CARE", "GROW"]
  },
  contact: {
    code: ["const outreach = {", '  channel: "direct",', '  response: "practical",', '  intake: "open",', '  nextStep: "mapped"', "};"],
    chips: ["MAIL", "CALL", "CHAT", "BRIEF", "SCOPE", "BOOK"]
  },
  technologies: {
    code: ["const stack = {", '  frontend: "React",', '  backend: "APIs",', '  data: "Appwrite",', '  delivery: "stable"', "};"],
    chips: ["REACT", "NODE", "SQL", "CLOUD", "AI", "AUTO"]
  },
  quote: {
    code: ["const quote = {", '  scope: "defined",', '  complexity: "checked",', '  timeline: "aligned",', '  estimate: "custom"', "};"],
    chips: ["SCOPE", "TIME", "STACK", "COST", "RISK", "PLAN"]
  },
  services: {
    code: ["const services = {", "  web: true,", "  mobile: true,", "  automation: true,", "  creative: true", "};"],
    chips: ["WEB", "APP", "AI", "AUTO", "DESIGN", "VIDEO"]
  },
  service: {
    code: ["const delivery = {", '  discovery: "first",', '  build: "modular",', '  quality: "checked",', '  handoff: "clear"', "};"],
    chips: ["DISC", "DESIGN", "BUILD", "QA", "LAUNCH", "CARE"]
  },
  projects: {
    code: ["const portfolio = {", '  focus: "workflows",', '  proof: "demo-ready",', '  outcomes: "measured",', "  reuse: true", "};"],
    chips: ["CASE", "FLOW", "STACK", "UX", "DATA", "LIVE"]
  },
  project: {
    code: ["const caseStudy = {", '  challenge: "mapped",', '  solution: "built",', '  result: "validated",', '  next: "scale"', "};"],
    chips: ["NEED", "BUILD", "TEST", "SHIP", "LEARN", "SCALE"]
  },
  blog: {
    code: ["const article = {", '  topic: "practical",', '  audience: "teams",', '  depth: "actionable",', '  format: "clear"', "};"],
    chips: ["IDEA", "DRAFT", "EDIT", "SHIP", "SHARE", "LEARN"]
  },
  post: {
    code: ["const reading = {", '  topic: "systems",', '  format: "guide",', '  depth: "actionable",', '  takeaway: "usable"', "};"],
    chips: ["READ", "NOTES", "CODE", "TIPS", "SHARE", "NEXT"]
  },
  events: {
    code: ["const session = {", '  format: "workshop",', '  focus: "systems",', '  style: "hands-on",', '  outcome: "usable"', "};"],
    chips: ["TALK", "DEMO", "LAB", "Q&A", "NET", "NOTES"]
  },
  event: {
    code: ["const agenda = {", '  intro: "context",', '  demo: "live",', '  practice: "guided",', '  close: "next steps"', "};"],
    chips: ["WHEN", "WHERE", "TOPIC", "HOST", "SEATS", "JOIN"]
  }
};

function HeroVisual({ variant }: { variant: HeroVariant }) {
  const panel = heroPanels[variant] ?? heroPanels.home;

  return (
    <div className="tech-panel hero-visual p-6">
      <div className="relative z-10 grid h-full grid-rows-[1fr_auto] gap-4">
        <div className="rounded-md border border-ink bg-paper p-4">
          <div className="mb-3 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-teal" />
            <span className="h-3 w-3 rounded-full bg-brand" />
            <span className="h-3 w-3 rounded-full bg-ink" />
          </div>
          <pre className="overflow-hidden text-xs leading-6 text-steel">{panel.code.join("\n")}</pre>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {panel.chips.map((item) => (
            <div key={item} className="hero-chip rounded-md border border-ink bg-teal/80 px-2 font-mono text-xs font-bold sm:text-sm">
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
  variant = "home",
  actions
}: {
  eyebrow: string;
  title: string;
  description: string;
  cta?: boolean;
  variant?: HeroVariant;
  actions?: ReactNode;
}) {
  return (
    <section className="section border-b border-ink">
      <div className="container grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <p className="eyebrow hero-eyebrow">{eyebrow}</p>
          <h1 className="hero-title mt-4 text-brand">{title}</h1>
          <p className="hero-copy mt-6">{description}</p>
          <div className="hero-actions mt-8 flex flex-wrap items-center gap-3">
            {cta ? (
              <>
                <Link to="/request-quote" className="btn btn-primary">
                  Request a Quote
                </Link>
                <Link to="/services" className="btn btn-secondary">
                  Explore Services
                </Link>
              </>
            ) : (
              actions
            )}
          </div>
        </div>
        <HeroVisual variant={variant} />
      </div>
    </section>
  );
}
