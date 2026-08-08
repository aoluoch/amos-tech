import type { LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  image: string;
  features: string[];
  technologies: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
};

export type Event = {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time?: string;
  location?: string;
  category: string;
  status: "upcoming" | "ongoing" | "past";
  agenda: string[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  features: string[];
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  gallery: string[];
  liveUrl?: string;
};

export type ManagedSection = {
  id: string;
  title: string;
  body: string;
};

export type ManagedListSection = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: string[];
};

export type ManagedFaq = {
  question: string;
  answer: string;
};

export type ManagedTechGroup = {
  category: string;
  items: string[];
};

export type ManagedCta = {
  eyebrow: string;
  title: string;
  body: string;
  buttonLabel: string;
};

export type ManagedCollectionHeader = {
  eyebrow: string;
  title: string;
  description?: string;
};

export type ManagedPage = {
  key: string;
  title: string;
  eyebrow: string;
  description: string;
  sections: ManagedSection[];
  bannerText?: string;
  highlight?: ManagedSection;
  listSections?: ManagedListSection[];
  faqs?: ManagedFaq[];
  techGroups?: ManagedTechGroup[];
  quoteFactors?: string[];
  successMessage?: {
    title: string;
    body: string;
  };
  cta?: ManagedCta;
  collectionHeaders?: {
    services?: ManagedCollectionHeader;
    projects?: ManagedCollectionHeader;
    insights?: ManagedCollectionHeader;
    stack?: ManagedCollectionHeader;
  };
  footerBlurb?: string;
  contactEmail?: string;
  contactPhone?: string;
  updatedAt?: string;
};

export type ManagedPageKey = "home" | "about" | "contact" | "technologies" | "quote" | "site";
