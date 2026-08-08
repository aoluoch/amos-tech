import { blogPosts, events, projects, services } from "../data/fallbackContent";
import type { BlogPost, Event, Project, Service } from "../types/content";

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string | undefined;
const token = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN as string | undefined;
const environment = (import.meta.env.VITE_CONTENTFUL_ENVIRONMENT as string | undefined) ?? "master";

type ContentType = "service" | "blogPost" | "event" | "project";

async function fetchEntries<T>(contentType: ContentType, fallback: T[]): Promise<T[]> {
  if (!space || !token) return fallback;

  const url = new URL(`https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries`);
  url.searchParams.set("access_token", token);
  url.searchParams.set("content_type", contentType);

  try {
    const response = await fetch(url);
    if (!response.ok) return fallback;
    const json = await response.json();
    const entries = json.items?.map((item: { fields: T }) => item.fields).filter(Boolean);
    return entries?.length ? entries : fallback;
  } catch {
    return fallback;
  }
}

export const contentful = {
  services: () => fetchEntries<Service>("service", services),
  blogPosts: () => fetchEntries<BlogPost>("blogPost", blogPosts),
  events: () => fetchEntries<Event>("event", events),
  projects: () => fetchEntries<Project>("project", projects)
};
