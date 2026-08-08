export type MessageStatus = "new" | "read" | "archived";

export type ContactMessage = {
  $id: string;
  $createdAt: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: MessageStatus;
};

export type QuoteRequest = {
  $id: string;
  $createdAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  projectType: string;
  timeline: string;
  existingUrl: string;
  contactMethod: string;
  projectDescription: string;
  desiredFeatures: string;
  additionalInfo: string;
  status: MessageStatus;
};

export type ContactMessageInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type QuoteRequestInput = {
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  projectType: string;
  timeline: string;
  existingUrl?: string;
  contactMethod: string;
  projectDescription: string;
  desiredFeatures?: string;
  additionalInfo?: string;
};

export type FormInboxKind = "contact" | "quote";
