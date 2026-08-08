import type { ManagedPage, ManagedPageKey } from "../types/content";

export function emptyManagedPage(key: ManagedPageKey | string): ManagedPage {
  return {
    key,
    title: "",
    eyebrow: "",
    description: "",
    sections: [],
    listSections: [],
    faqs: [],
    techGroups: [],
    quoteFactors: [],
    collectionHeaders: {}
  };
}

export function normalizeManagedPage(key: string, remote: Partial<ManagedPage>): ManagedPage {
  const base = emptyManagedPage(key);
  return {
    ...base,
    ...remote,
    key,
    title: remote.title ?? "",
    eyebrow: remote.eyebrow ?? "",
    description: remote.description ?? "",
    sections: remote.sections ?? [],
    listSections: remote.listSections ?? [],
    faqs: remote.faqs ?? [],
    techGroups: remote.techGroups ?? [],
    quoteFactors: remote.quoteFactors ?? [],
    collectionHeaders: remote.collectionHeaders ?? {},
    bannerText: remote.bannerText,
    highlight: remote.highlight,
    successMessage: remote.successMessage,
    cta: remote.cta,
    footerBlurb: remote.footerBlurb,
    contactEmail: remote.contactEmail,
    contactPhone: remote.contactPhone,
    updatedAt: remote.updatedAt
  };
}
