import type { Models } from "appwrite";

const ADMIN_LABEL = "admin";

function allowedAdminEmails() {
  const raw = (import.meta.env.VITE_ADMIN_ALLOWED_EMAILS as string | undefined) ?? "";
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAuthorizedAdmin(user: Models.User<Models.Preferences> | null | undefined) {
  if (!user?.email) return false;

  const email = user.email.trim().toLowerCase();
  const allowlist = allowedAdminEmails();
  const labels = user.labels ?? [];
  const hasAdminLabel = labels.includes(ADMIN_LABEL);
  const emailAllowed = allowlist.length === 0 ? false : allowlist.includes(email);

  // Require both an allowlisted email and the Appwrite "admin" label.
  return emailAllowed && hasAdminLabel;
}

export const ADMIN_ACCESS_DENIED_MESSAGE = "Invalid credentials.";
