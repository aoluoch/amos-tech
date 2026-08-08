import { Account, Channel, Client, ID, Query, TablesDB } from "appwrite";
import type { Models } from "appwrite";
import type { ManagedPage } from "../types/content";
import { emptyManagedPage, normalizeManagedPage } from "./managedPage";

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT as string | undefined;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID as string | undefined;
export const appwriteDatabaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID as string | undefined;
export const appwritePagesTableId =
  (import.meta.env.VITE_APPWRITE_PAGES_TABLE_ID as string | undefined) ??
  (import.meta.env.VITE_APPWRITE_PAGES_COLLECTION_ID as string | undefined);

export const appwriteConfigured = Boolean(endpoint && projectId && appwriteDatabaseId && appwritePagesTableId);

export const client = new Client();

if (endpoint && projectId) {
  client.setEndpoint(endpoint).setProject(projectId);
}

export const account = new Account(client);
export const tablesDB = new TablesDB(client);

type PageRow = Models.DefaultRow & {
  key?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  sections?: string | unknown;
  updatedAt?: string;
  data?: Record<string, unknown>;
};

type StoredSections = {
  version: 2;
  sections: ManagedPage["sections"];
  bannerText?: ManagedPage["bannerText"];
  highlight?: ManagedPage["highlight"];
  listSections?: ManagedPage["listSections"];
  faqs?: ManagedPage["faqs"];
  techGroups?: ManagedPage["techGroups"];
  quoteFactors?: ManagedPage["quoteFactors"];
  successMessage?: ManagedPage["successMessage"];
  cta?: ManagedPage["cta"];
  collectionHeaders?: ManagedPage["collectionHeaders"];
  footerBlurb?: ManagedPage["footerBlurb"];
  contactEmail?: ManagedPage["contactEmail"];
  contactPhone?: ManagedPage["contactPhone"];
};

function encodeSections(page: ManagedPage) {
  const payload: StoredSections = {
    version: 2,
    sections: page.sections,
    bannerText: page.bannerText,
    highlight: page.highlight,
    listSections: page.listSections,
    faqs: page.faqs,
    techGroups: page.techGroups,
    quoteFactors: page.quoteFactors,
    successMessage: page.successMessage,
    cta: page.cta,
    collectionHeaders: page.collectionHeaders,
    footerBlurb: page.footerBlurb,
    contactEmail: page.contactEmail,
    contactPhone: page.contactPhone
  };
  return JSON.stringify(payload);
}

function decodeSections(raw: unknown): Partial<ManagedPage> {
  if (typeof raw !== "string" && !Array.isArray(raw) && typeof raw !== "object") {
    return { sections: [] };
  }

  const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;

  if (Array.isArray(parsed)) {
    return { sections: parsed as ManagedPage["sections"] };
  }

  if (parsed && typeof parsed === "object" && "version" in parsed) {
    const data = parsed as StoredSections;
    return {
      sections: data.sections ?? [],
      bannerText: data.bannerText,
      highlight: data.highlight,
      listSections: data.listSections,
      faqs: data.faqs,
      techGroups: data.techGroups,
      quoteFactors: data.quoteFactors,
      successMessage: data.successMessage,
      cta: data.cta,
      collectionHeaders: data.collectionHeaders,
      footerBlurb: data.footerBlurb,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone
    };
  }

  return { sections: [] };
}

const toRow = (page: ManagedPage) => ({
  key: page.key,
  title: page.title,
  eyebrow: page.eyebrow,
  description: page.description,
  sections: encodeSections(page),
  updatedAt: new Date().toISOString()
});

const fromRow = (row: PageRow): Partial<ManagedPage> => {
  const source = (row.data ?? row) as Record<string, unknown>;
  const extras = decodeSections(source.sections);

  return {
    key: String(source.key ?? ""),
    title: String(source.title ?? ""),
    eyebrow: String(source.eyebrow ?? ""),
    description: String(source.description ?? ""),
    updatedAt: String(source.updatedAt ?? ""),
    ...extras
  };
};

export async function getCurrentUser() {
  if (!endpoint || !projectId) return null;
  try {
    return await account.get();
  } catch {
    return null;
  }
}

export async function loginWithEmailPassword(email: string, password: string) {
  return account.createEmailPasswordSession(email, password);
}

export async function logoutCurrentSession() {
  return account.deleteSession("current");
}

export async function getManagedPage(key: string): Promise<ManagedPage> {
  if (!appwriteConfigured) {
    return emptyManagedPage(key);
  }

  try {
    const response = await tablesDB.listRows({
      databaseId: appwriteDatabaseId!,
      tableId: appwritePagesTableId!,
      queries: [Query.equal("key", key), Query.limit(1)]
    });
    const row = response.rows[0] as PageRow | undefined;
    return row ? normalizeManagedPage(key, fromRow(row)) : emptyManagedPage(key);
  } catch {
    return emptyManagedPage(key);
  }
}

export async function saveManagedPage(page: ManagedPage) {
  if (!appwriteConfigured) {
    throw new Error("Appwrite is not configured. Managed pages can only be saved to Appwrite.");
  }

  const existing = await tablesDB.listRows({
    databaseId: appwriteDatabaseId!,
    tableId: appwritePagesTableId!,
    queries: [Query.equal("key", page.key), Query.limit(1)]
  });
  const row = existing.rows[0] as PageRow | undefined;
  const payload = toRow(page);

  if (row) {
    await tablesDB.updateRow({
      databaseId: appwriteDatabaseId!,
      tableId: appwritePagesTableId!,
      rowId: row.$id,
      data: payload
    });
    return page;
  }

  await tablesDB.createRow({
    databaseId: appwriteDatabaseId!,
    tableId: appwritePagesTableId!,
    rowId: ID.unique(),
    data: payload
  });
  return page;
}

export function subscribeToManagedPages(onUpdate: (page: ManagedPage) => void) {
  if (!appwriteConfigured) {
    return () => undefined;
  }

  const channel = Channel.tablesdb(appwriteDatabaseId!).table(appwritePagesTableId!);
  const unsubscribe = client.subscribe(channel, (message) => {
    const payload = message.payload as PageRow;
    const remote = fromRow(payload);
    if (!remote.key) return;
    onUpdate(normalizeManagedPage(remote.key, remote));
  });

  return () => {
    unsubscribe();
  };
}
