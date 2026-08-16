import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clapperboard,
  Code2,
  Cpu,
  Database,
  MonitorCog,
  Palette,
  Smartphone,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BlogPost, Event, Project, Service } from "../types/content";

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string | undefined;
const token = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN as string | undefined;
const environment = (import.meta.env.VITE_CONTENTFUL_ENVIRONMENT as string | undefined) ?? "master";

type ContentType = "service" | "blogPost" | "event" | "project";

const icons: Record<string, LucideIcon> = {
  Bot,
  BrainCircuit,
  Clapperboard,
  Code2,
  Cpu,
  Database,
  MonitorCog,
  Palette,
  Smartphone,
  Workflow
};

type ContentfulService = Omit<Service, "icon"> & { icon?: string };

function asList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function mapService(fields: ContentfulService): Service {
  return {
    ...fields,
    icon: icons[fields.icon ?? ""] ?? CheckCircle2,
    features: asList(fields.features),
    technologies: asList(fields.technologies),
    process: asList(fields.process),
    faqs: Array.isArray(fields.faqs) ? fields.faqs : []
  };
}

function mapBlogPost(fields: BlogPost): BlogPost {
  return { ...fields, tags: asList(fields.tags) };
}

function mapEvent(fields: Event): Event {
  return { ...fields, agenda: asList(fields.agenda) };
}

function mapProject(fields: Project): Project {
  return {
    ...fields,
    technologies: asList(fields.technologies),
    features: asList(fields.features),
    results: asList(fields.results),
    gallery: asList(fields.gallery)
  };
}

async function fetchEntries<T>(contentType: ContentType): Promise<T[]> {
  if (!space || !token) return [];

  const url = new URL(`https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries`);
  url.searchParams.set("access_token", token);
  url.searchParams.set("content_type", contentType);
  url.searchParams.set("limit", "100");

  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const json = await response.json();
    return (json.items ?? []).map((item: { fields: T }) => item.fields).filter(Boolean);
  } catch {
    return [];
  }
}

export const contentful = {
  services: async () => (await fetchEntries<ContentfulService>("service")).map(mapService),
  blogPosts: async () => (await fetchEntries<BlogPost>("blogPost")).map(mapBlogPost),
  events: async () => (await fetchEntries<Event>("event")).map(mapEvent),
  projects: async () => (await fetchEntries<Project>("project")).map(mapProject)
};
