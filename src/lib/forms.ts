import { Channel, ID, Query } from "appwrite";
import type { Models } from "appwrite";
import {
  appwriteConfigured,
  appwriteDatabaseId,
  client,
  tablesDB
} from "./appwrite";
import type {
  ContactMessage,
  ContactMessageInput,
  FormInboxKind,
  MessageStatus,
  QuoteRequest,
  QuoteRequestInput
} from "../types/forms";

export const contactMessagesTableId =
  (import.meta.env.VITE_APPWRITE_CONTACT_TABLE_ID as string | undefined) ?? "contact_messages";
export const quoteRequestsTableId =
  (import.meta.env.VITE_APPWRITE_QUOTE_TABLE_ID as string | undefined) ?? "quote_requests";

export const formsConfigured = Boolean(
  appwriteConfigured && appwriteDatabaseId && contactMessagesTableId && quoteRequestsTableId
);

type Row = Models.DefaultRow & Record<string, unknown> & { data?: Record<string, unknown> };

function source(row: Row) {
  return (row.data ?? row) as Record<string, unknown>;
}

function parseServices(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value !== "string" || !value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

function parseDetails(value: unknown) {
  if (typeof value === "object" && value) return value as Record<string, unknown>;
  if (typeof value !== "string" || !value) return {};
  try {
    return JSON.parse(value) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function asContactMessage(row: Row): ContactMessage {
  const data = source(row);
  return {
    $id: row.$id,
    $createdAt: row.$createdAt,
    name: String(data.name ?? ""),
    email: String(data.email ?? ""),
    phone: String(data.phone ?? ""),
    message: String(data.message ?? ""),
    status: (String(data.status ?? "new") as MessageStatus) || "new"
  };
}

function asQuoteRequest(row: Row): QuoteRequest {
  const data = source(row);
  const details = parseDetails(data.details);
  return {
    $id: row.$id,
    $createdAt: row.$createdAt,
    name: String(data.name ?? ""),
    email: String(data.email ?? ""),
    phone: String(data.phone ?? ""),
    company: String(data.company ?? ""),
    services: parseServices(data.services),
    projectType: String(data.projectType ?? ""),
    timeline: String(data.timeline ?? ""),
    existingUrl: String(data.existingUrl ?? ""),
    contactMethod: String(data.contactMethod ?? "Email"),
    projectDescription: String(details.projectDescription ?? data.projectDescription ?? ""),
    desiredFeatures: String(details.desiredFeatures ?? data.desiredFeatures ?? ""),
    additionalInfo: String(details.additionalInfo ?? data.additionalInfo ?? ""),
    status: (String(data.status ?? "new") as MessageStatus) || "new"
  };
}

export async function submitContactMessage(input: ContactMessageInput) {
  if (!formsConfigured) {
    throw new Error("Form submissions are not configured. Add Appwrite form table IDs to .env.");
  }

  return tablesDB.createRow({
    databaseId: appwriteDatabaseId!,
    tableId: contactMessagesTableId,
    rowId: ID.unique(),
    data: {
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      message: input.message.trim(),
      status: "new"
    }
  });
}

export async function submitQuoteRequest(input: QuoteRequestInput) {
  if (!formsConfigured) {
    throw new Error("Form submissions are not configured. Add Appwrite form table IDs to .env.");
  }

  return tablesDB.createRow({
    databaseId: appwriteDatabaseId!,
    tableId: quoteRequestsTableId,
    rowId: ID.unique(),
    data: {
      name: input.name.trim(),
      email: input.email.trim(),
      phone: input.phone?.trim() ?? "",
      company: input.company?.trim() ?? "",
      services: JSON.stringify(input.services),
      projectType: input.projectType?.trim() ?? "",
      timeline: input.timeline?.trim() ?? "",
      existingUrl: input.existingUrl?.trim() ?? "",
      contactMethod: input.contactMethod?.trim() || "Email",
      details: JSON.stringify({
        projectDescription: input.projectDescription.trim(),
        desiredFeatures: input.desiredFeatures?.trim() ?? "",
        additionalInfo: input.additionalInfo?.trim() ?? ""
      }),
      status: "new"
    }
  });
}

export async function listContactMessages() {
  if (!formsConfigured) return [] as ContactMessage[];
  const response = await tablesDB.listRows({
    databaseId: appwriteDatabaseId!,
    tableId: contactMessagesTableId,
    queries: [Query.orderDesc("$createdAt"), Query.limit(100)]
  });
  return response.rows.map((row) => asContactMessage(row as Row));
}

export async function listQuoteRequests() {
  if (!formsConfigured) return [] as QuoteRequest[];
  const response = await tablesDB.listRows({
    databaseId: appwriteDatabaseId!,
    tableId: quoteRequestsTableId,
    queries: [Query.orderDesc("$createdAt"), Query.limit(100)]
  });
  return response.rows.map((row) => asQuoteRequest(row as Row));
}

export async function updateMessageStatus(kind: FormInboxKind, id: string, status: MessageStatus) {
  const tableId = kind === "contact" ? contactMessagesTableId : quoteRequestsTableId;
  return tablesDB.updateRow({
    databaseId: appwriteDatabaseId!,
    tableId,
    rowId: id,
    data: { status }
  });
}

export async function deleteMessage(kind: FormInboxKind, id: string) {
  const tableId = kind === "contact" ? contactMessagesTableId : quoteRequestsTableId;
  return tablesDB.deleteRow({
    databaseId: appwriteDatabaseId!,
    tableId,
    rowId: id
  });
}

export function subscribeToFormMessages(kind: FormInboxKind, onChange: () => void) {
  if (!formsConfigured || !appwriteDatabaseId) return () => undefined;
  const tableId = kind === "contact" ? contactMessagesTableId : quoteRequestsTableId;
  const channel = Channel.tablesdb(appwriteDatabaseId).table(tableId);
  return client.subscribe(channel, () => onChange());
}
