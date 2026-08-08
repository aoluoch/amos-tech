import { useEffect, useState } from "react";
import { Archive, CheckCheck, Inbox, Trash2 } from "lucide-react";
import {
  deleteMessage,
  formsConfigured,
  listContactMessages,
  listQuoteRequests,
  subscribeToFormMessages,
  updateMessageStatus
} from "../../lib/forms";
import type { ContactMessage, FormInboxKind, MessageStatus, QuoteRequest } from "../../types/forms";

type InboxTab = FormInboxKind;

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export function AdminMessages() {
  const [tab, setTab] = useState<InboxTab>("contact");
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState("Ready");
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      const [nextContacts, nextQuotes] = await Promise.all([listContactMessages(), listQuoteRequests()]);
      setContacts(nextContacts);
      setQuotes(nextQuotes);
      setStatus(formsConfigured ? "Inbox synced" : "Form tables are not configured");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Unable to load messages");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    const unsubContact = subscribeToFormMessages("contact", () => {
      listContactMessages().then(setContacts).catch(() => undefined);
    });
    const unsubQuote = subscribeToFormMessages("quote", () => {
      listQuoteRequests().then(setQuotes).catch(() => undefined);
    });
    return () => {
      unsubContact();
      unsubQuote();
    };
  }, []);

  const items = tab === "contact" ? contacts : quotes;
  const selected =
    tab === "contact"
      ? contacts.find((item) => item.$id === selectedId) ?? contacts[0] ?? null
      : quotes.find((item) => item.$id === selectedId) ?? quotes[0] ?? null;

  async function setMessageStatus(nextStatus: MessageStatus) {
    if (!selected) return;
    await updateMessageStatus(tab, selected.$id, nextStatus);
    await refresh();
    setSelectedId(selected.$id);
  }

  async function removeSelected() {
    if (!selected) return;
    await deleteMessage(tab, selected.$id);
    setSelectedId(null);
    await refresh();
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold">Form messages</h2>
          <p className="mt-2 max-w-2xl text-steel">
            Contact and quote submissions are stored in separate Appwrite tables so you can review them by category.
          </p>
        </div>
        <span className="badge gap-2">
          <Inbox size={14} /> {status}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className={`btn ${tab === "contact" ? "btn-secondary" : ""}`} type="button" onClick={() => { setTab("contact"); setSelectedId(null); }}>
          Contact ({contacts.length})
        </button>
        <button className={`btn ${tab === "quote" ? "btn-secondary" : ""}`} type="button" onClick={() => { setTab("quote"); setSelectedId(null); }}>
          Quote requests ({quotes.length})
        </button>
        <button className="btn" type="button" onClick={() => refresh()}>
          Refresh
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="card grid max-h-[70vh] gap-2 overflow-auto p-3">
          {loading ? <p className="p-3 text-sm text-steel">Loading messages...</p> : null}
          {!loading && items.length === 0 ? <p className="p-3 text-sm text-steel">No messages in this category yet.</p> : null}
          {items.map((item) => {
            const active = (selected?.$id ?? "") === item.$id;
            return (
              <button
                key={item.$id}
                type="button"
                className={`rounded-md border border-ink p-3 text-left ${active ? "bg-teal/50" : "bg-paper"}`}
                onClick={() => setSelectedId(item.$id)}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-extrabold">{item.name}</p>
                  <span className="badge">{item.status}</span>
                </div>
                <p className="mt-1 text-sm text-steel">{item.email}</p>
                <p className="mt-2 font-mono text-xs text-steel">{formatDate(item.$createdAt)}</p>
              </button>
            );
          })}
        </aside>

        <div className="card p-6">
          {!selected ? (
            <p className="text-steel">Select a message to review the full submission.</p>
          ) : tab === "contact" ? (
            <ContactDetail
              message={selected as ContactMessage}
              onMarkRead={() => setMessageStatus("read")}
              onArchive={() => setMessageStatus("archived")}
              onDelete={removeSelected}
            />
          ) : (
            <QuoteDetail
              message={selected as QuoteRequest}
              onMarkRead={() => setMessageStatus("read")}
              onArchive={() => setMessageStatus("archived")}
              onDelete={removeSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function MessageActions({
  onMarkRead,
  onArchive,
  onDelete
}: {
  onMarkRead: () => void;
  onArchive: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button className="btn" type="button" onClick={onMarkRead}>
        <CheckCheck size={16} /> Mark read
      </button>
      <button className="btn" type="button" onClick={onArchive}>
        <Archive size={16} /> Archive
      </button>
      <button className="btn" type="button" onClick={onDelete}>
        <Trash2 size={16} /> Delete
      </button>
    </div>
  );
}

function ContactDetail({
  message,
  onMarkRead,
  onArchive,
  onDelete
}: {
  message: ContactMessage;
  onMarkRead: () => void;
  onArchive: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Contact message</p>
          <h3 className="mt-2 text-2xl font-extrabold">{message.name}</h3>
          <p className="mt-1 text-steel">{message.email}</p>
          <p className="mt-1 text-steel">{message.phone || "No phone provided"}</p>
          <p className="mt-2 font-mono text-xs text-steel">{formatDate(message.$createdAt)}</p>
        </div>
        <MessageActions onMarkRead={onMarkRead} onArchive={onArchive} onDelete={onDelete} />
      </div>
      <div className="rounded-md border border-ink p-4">
        <p className="font-bold">Message</p>
        <p className="mt-3 whitespace-pre-wrap leading-7 text-steel">{message.message}</p>
      </div>
    </div>
  );
}

function QuoteDetail({
  message,
  onMarkRead,
  onArchive,
  onDelete
}: {
  message: QuoteRequest;
  onMarkRead: () => void;
  onArchive: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Quote request</p>
          <h3 className="mt-2 text-2xl font-extrabold">{message.name}</h3>
          <p className="mt-1 text-steel">{message.email}</p>
          <p className="mt-2 font-mono text-xs text-steel">{formatDate(message.$createdAt)}</p>
        </div>
        <MessageActions onMarkRead={onMarkRead} onArchive={onArchive} onDelete={onDelete} />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Detail label="Phone" value={message.phone || "—"} />
        <Detail label="Company" value={message.company || "—"} />
        <Detail label="Project type" value={message.projectType || "—"} />
        <Detail label="Timeline" value={message.timeline || "—"} />
        <Detail label="Contact method" value={message.contactMethod || "—"} />
        <Detail label="Existing URL" value={message.existingUrl || "—"} />
      </div>
      <Detail label="Services" value={message.services.length ? message.services.join(", ") : "—"} />
      <Detail label="Project description" value={message.projectDescription || "—"} multiline />
      <Detail label="Desired features" value={message.desiredFeatures || "—"} multiline />
      <Detail label="Additional information" value={message.additionalInfo || "—"} multiline />
    </div>
  );
}

function Detail({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="rounded-md border border-ink p-4">
      <p className="font-bold">{label}</p>
      <p className={`mt-2 text-steel ${multiline ? "whitespace-pre-wrap leading-7" : ""}`}>{value}</p>
    </div>
  );
}
