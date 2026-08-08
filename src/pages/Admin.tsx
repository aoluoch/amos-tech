import { FormEvent, useEffect, useState, type ReactNode } from "react";
import { Inbox, LockKeyhole, LogOut, Plus, Save, ShieldCheck, Trash2, Wifi } from "lucide-react";
import { AdminMessages } from "../components/admin/AdminMessages";
import { Seo } from "../components/ui/Seo";
import { managedPageSeeds } from "../data/managedPageSeeds";
import { useAuth } from "../hooks/useAuth";
import { appwriteConfigured, getManagedPage, saveManagedPage, subscribeToManagedPages } from "../lib/appwrite";
import { emptyManagedPage } from "../lib/managedPage";
import type {
  ManagedCollectionHeader,
  ManagedCta,
  ManagedFaq,
  ManagedListSection,
  ManagedPage,
  ManagedPageKey,
  ManagedSection,
  ManagedTechGroup
} from "../types/content";

const editableKeys: ManagedPageKey[] = ["home", "about", "contact", "technologies", "quote", "site"];

const pageLabels: Record<ManagedPageKey, string> = {
  home: "Home",
  about: "About",
  contact: "Contact",
  technologies: "Technologies",
  quote: "Request Quote",
  site: "Site / Footer / CTA"
};

type AdminView = "pages" | "messages";

function LoginPanel() {
  const { login, configured, timedOut, clearTimedOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    clearTimedOut();
    setSubmitting(true);

    try {
      if (!configured) {
        throw new Error("Appwrite is not configured. Add the VITE_APPWRITE_* values to your .env file.");
      }
      await login(email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to sign in.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section">
      <div className="container max-w-xl">
        <div className="mb-8">
          <p className="eyebrow">Secure admin</p>
          <h1 className="heading mt-3">Sign in to manage site content</h1>
          <p className="lede mt-3">
            Appwrite email/password authentication protects every write. Sessions end after 3 minutes of inactivity. Services, Blog, Projects, and Events stay in Contentful.
          </p>
        </div>
        <form className="card grid gap-5 p-6" onSubmit={onSubmit}>
          {timedOut ? (
            <p className="rounded-md border border-ink bg-teal/40 px-3 py-2 text-sm font-semibold">
              Your admin session ended after 3 minutes of inactivity. Sign in again to continue.
            </p>
          ) : null}
          <label>
            Email
            <input
              className="field mt-2"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Password
            <input
              className="field mt-2"
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error ? <p className="rounded-md border border-ink bg-teal/40 px-3 py-2 text-sm font-semibold">{error}</p> : null}
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            <LockKeyhole size={18} />
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-semibold">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function EditorPanel() {
  const { user, logout } = useAuth();
  const [view, setView] = useState<AdminView>("pages");
  const [selected, setSelected] = useState<ManagedPageKey>("home");
  const [page, setPage] = useState<ManagedPage>(() => emptyManagedPage("home"));
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    getManagedPage(selected).then(setPage);
  }, [selected]);

  useEffect(() => {
    return subscribeToManagedPages((nextPage) => {
      if (nextPage.key === selected) {
        setPage(nextPage);
        setStatus("Realtime update received");
      }
    });
  }, [selected]);

  function updateSection(index: number, field: keyof ManagedSection, value: string) {
    setPage((current) => ({
      ...current,
      sections: current.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [field]: value } : section
      )
    }));
  }

  function addSection() {
    setPage((current) => ({
      ...current,
      sections: [
        ...current.sections,
        { id: `section-${Date.now()}`, title: "New section", body: "Section body" }
      ]
    }));
  }

  function removeSection(index: number) {
    setPage((current) => ({
      ...current,
      sections: current.sections.filter((_, sectionIndex) => sectionIndex !== index)
    }));
  }

  function updateListSection(index: number, patch: Partial<ManagedListSection>) {
    setPage((current) => ({
      ...current,
      listSections: (current.listSections ?? []).map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, ...patch } : section
      )
    }));
  }

  function addListSection() {
    setPage((current) => ({
      ...current,
      listSections: [
        ...(current.listSections ?? []),
        { id: `list-${Date.now()}`, eyebrow: "Section", title: "New list section", description: "", items: ["Item one"] }
      ]
    }));
  }

  function removeListSection(index: number) {
    setPage((current) => ({
      ...current,
      listSections: (current.listSections ?? []).filter((_, sectionIndex) => sectionIndex !== index)
    }));
  }

  function updateFaq(index: number, field: keyof ManagedFaq, value: string) {
    setPage((current) => ({
      ...current,
      faqs: (current.faqs ?? []).map((faq, faqIndex) => (faqIndex === index ? { ...faq, [field]: value } : faq))
    }));
  }

  function addFaq() {
    setPage((current) => ({
      ...current,
      faqs: [...(current.faqs ?? []), { question: "New question?", answer: "Answer" }]
    }));
  }

  function removeFaq(index: number) {
    setPage((current) => ({
      ...current,
      faqs: (current.faqs ?? []).filter((_, faqIndex) => faqIndex !== index)
    }));
  }

  function updateTechGroup(index: number, patch: Partial<ManagedTechGroup>) {
    setPage((current) => ({
      ...current,
      techGroups: (current.techGroups ?? []).map((group, groupIndex) =>
        groupIndex === index ? { ...group, ...patch } : group
      )
    }));
  }

  function addTechGroup() {
    setPage((current) => ({
      ...current,
      techGroups: [...(current.techGroups ?? []), { category: "New category", items: ["Tool"] }]
    }));
  }

  function removeTechGroup(index: number) {
    setPage((current) => ({
      ...current,
      techGroups: (current.techGroups ?? []).filter((_, groupIndex) => groupIndex !== index)
    }));
  }

  function updateCta(field: keyof ManagedCta, value: string) {
    setPage((current) => ({
      ...current,
      cta: {
        eyebrow: current.cta?.eyebrow ?? "",
        title: current.cta?.title ?? "",
        body: current.cta?.body ?? "",
        buttonLabel: current.cta?.buttonLabel ?? "Request a Quote",
        [field]: value
      }
    }));
  }

  function updateCollectionHeader(
    key: keyof NonNullable<ManagedPage["collectionHeaders"]>,
    field: keyof ManagedCollectionHeader,
    value: string
  ) {
    setPage((current) => ({
      ...current,
      collectionHeaders: {
        ...current.collectionHeaders,
        [key]: {
          eyebrow: current.collectionHeaders?.[key]?.eyebrow ?? "",
          title: current.collectionHeaders?.[key]?.title ?? "",
          description: current.collectionHeaders?.[key]?.description ?? "",
          [field]: value
        }
      }
    }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("Saving...");
    try {
      await saveManagedPage(page);
      setStatus("Saved to Appwrite");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Save failed";
      setStatus(message);
    }
  }

  function loadSeedIntoEditor() {
    const seed = managedPageSeeds[selected];
    if (!seed) return;
    setPage(seed);
    setStatus("Seed loaded into editor. Save to push it to Appwrite.");
  }

  const showHero = selected !== "site";
  const showBanner = selected === "home";
  const showHighlight = selected === "home";
  const showSections = selected !== "site";
  const showListSections = selected === "home" || selected === "about";
  const showFaqs = selected === "contact";
  const showTechGroups = selected === "technologies";
  const showQuoteExtras = selected === "quote";
  const showCollectionHeaders = selected === "home" || selected === "technologies";
  const showCta = selected === "home" || selected === "about" || selected === "contact" || selected === "technologies" || selected === "site";
  const showSiteFields = selected === "site" || selected === "contact";

  return (
    <section className="section">
      <div className="container">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="heading mt-3">Full site content editor</h1>
            <p className="lede mt-3 max-w-3xl">
              Manage Appwrite-backed page content and review form submissions. Services, Blog, Projects, and Events remain in Contentful.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge gap-2">
              <ShieldCheck size={14} /> {user?.email}
            </span>
            <span className="badge gap-2">
              <Wifi size={14} /> {appwriteConfigured ? "Appwrite realtime" : "Appwrite not configured"}
            </span>
            <button className="btn" type="button" onClick={() => logout()}>
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <button className={`btn ${view === "pages" ? "btn-secondary" : ""}`} type="button" onClick={() => setView("pages")}>
            Pages
          </button>
          <button className={`btn ${view === "messages" ? "btn-secondary" : ""}`} type="button" onClick={() => setView("messages")}>
            <Inbox size={16} /> Messages
          </button>
        </div>

        {view === "messages" ? (
          <AdminMessages />
        ) : (
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="card h-fit p-4">
            <h2 className="mb-3 font-extrabold">Pages</h2>
            <div className="grid gap-2">
              {editableKeys.map((key) => (
                <button
                  className={`btn justify-start ${selected === key ? "btn-secondary" : ""}`}
                  type="button"
                  key={key}
                  onClick={() => setSelected(key)}
                >
                  {pageLabels[key]}
                </button>
              ))}
            </div>
            <button className="btn mt-4 w-full justify-start" type="button" onClick={loadSeedIntoEditor}>
              Load seed into editor
            </button>
          </aside>
          <form className="card grid gap-8 p-6" onSubmit={onSubmit}>
            {showHero ? (
              <div className="grid gap-5">
                <h2 className="text-xl font-extrabold">Hero</h2>
                <Field label="Eyebrow">
                  <input
                    className="field"
                    value={page.eyebrow}
                    onChange={(event) => setPage({ ...page, eyebrow: event.target.value })}
                  />
                </Field>
                <Field label="Title">
                  <input
                    className="field"
                    value={page.title}
                    onChange={(event) => setPage({ ...page, title: event.target.value })}
                  />
                </Field>
                <Field label="Description">
                  <textarea
                    className="field min-h-28"
                    value={page.description}
                    onChange={(event) => setPage({ ...page, description: event.target.value })}
                  />
                </Field>
              </div>
            ) : (
              <div className="grid gap-5">
                <h2 className="text-xl font-extrabold">Site identity</h2>
                <Field label="Brand / site title">
                  <input
                    className="field"
                    value={page.title}
                    onChange={(event) => setPage({ ...page, title: event.target.value })}
                  />
                </Field>
                <Field label="Description">
                  <textarea
                    className="field min-h-24"
                    value={page.description}
                    onChange={(event) => setPage({ ...page, description: event.target.value })}
                  />
                </Field>
              </div>
            )}

            {showBanner ? (
              <Field label="Banner strip text">
                <input
                  className="field"
                  value={page.bannerText ?? ""}
                  onChange={(event) => setPage({ ...page, bannerText: event.target.value })}
                />
              </Field>
            ) : null}

            {showHighlight ? (
              <div className="grid gap-4 rounded-md border border-ink p-4">
                <h2 className="text-xl font-extrabold">Highlight card</h2>
                <Field label="Title">
                  <input
                    className="field"
                    value={page.highlight?.title ?? ""}
                    onChange={(event) =>
                      setPage({
                        ...page,
                        highlight: {
                          id: page.highlight?.id ?? "highlight",
                          title: event.target.value,
                          body: page.highlight?.body ?? ""
                        }
                      })
                    }
                  />
                </Field>
                <Field label="Body">
                  <textarea
                    className="field min-h-24"
                    value={page.highlight?.body ?? ""}
                    onChange={(event) =>
                      setPage({
                        ...page,
                        highlight: {
                          id: page.highlight?.id ?? "highlight",
                          title: page.highlight?.title ?? "",
                          body: event.target.value
                        }
                      })
                    }
                  />
                </Field>
              </div>
            ) : null}

            {showSections ? (
              <div className="grid gap-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-extrabold">Content cards / sections</h2>
                  <button className="btn" type="button" onClick={addSection}>
                    <Plus size={16} /> Add section
                  </button>
                </div>
                {page.sections.map((section, index) => (
                  <div className="rounded-md border border-ink p-4" key={section.id}>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="font-mono text-xs uppercase text-steel">Section {index + 1}</p>
                      <button className="btn" type="button" onClick={() => removeSection(index)}>
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                    <Field label="Section title">
                      <input
                        className="field"
                        value={section.title}
                        onChange={(event) => updateSection(index, "title", event.target.value)}
                      />
                    </Field>
                    <div className="mt-3">
                      <Field label="Section body">
                        <textarea
                          className="field min-h-24"
                          value={section.body}
                          onChange={(event) => updateSection(index, "body", event.target.value)}
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {showListSections ? (
              <div className="grid gap-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-extrabold">List sections</h2>
                  <button className="btn" type="button" onClick={addListSection}>
                    <Plus size={16} /> Add list
                  </button>
                </div>
                {(page.listSections ?? []).map((section, index) => (
                  <div className="rounded-md border border-ink p-4" key={section.id}>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="font-mono text-xs uppercase text-steel">List {index + 1}</p>
                      <button className="btn" type="button" onClick={() => removeListSection(index)}>
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3">
                      <Field label="Eyebrow">
                        <input
                          className="field"
                          value={section.eyebrow ?? ""}
                          onChange={(event) => updateListSection(index, { eyebrow: event.target.value })}
                        />
                      </Field>
                      <Field label="Title">
                        <input
                          className="field"
                          value={section.title}
                          onChange={(event) => updateListSection(index, { title: event.target.value })}
                        />
                      </Field>
                      <Field label="Description">
                        <textarea
                          className="field min-h-20"
                          value={section.description ?? ""}
                          onChange={(event) => updateListSection(index, { description: event.target.value })}
                        />
                      </Field>
                      <Field label="Items (one per line)">
                        <textarea
                          className="field min-h-32"
                          value={section.items.join("\n")}
                          onChange={(event) =>
                            updateListSection(index, {
                              items: event.target.value
                                .split("\n")
                                .map((item) => item.trim())
                                .filter(Boolean)
                            })
                          }
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {showFaqs ? (
              <div className="grid gap-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-extrabold">FAQs</h2>
                  <button className="btn" type="button" onClick={addFaq}>
                    <Plus size={16} /> Add FAQ
                  </button>
                </div>
                {(page.faqs ?? []).map((faq, index) => (
                  <div className="rounded-md border border-ink p-4" key={`${faq.question}-${index}`}>
                    <div className="mb-3 flex justify-end">
                      <button className="btn" type="button" onClick={() => removeFaq(index)}>
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                    <Field label="Question">
                      <input
                        className="field"
                        value={faq.question}
                        onChange={(event) => updateFaq(index, "question", event.target.value)}
                      />
                    </Field>
                    <div className="mt-3">
                      <Field label="Answer">
                        <textarea
                          className="field min-h-24"
                          value={faq.answer}
                          onChange={(event) => updateFaq(index, "answer", event.target.value)}
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {showTechGroups ? (
              <div className="grid gap-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-extrabold">Technology groups</h2>
                  <button className="btn" type="button" onClick={addTechGroup}>
                    <Plus size={16} /> Add group
                  </button>
                </div>
                {(page.techGroups ?? []).map((group, index) => (
                  <div className="rounded-md border border-ink p-4" key={`${group.category}-${index}`}>
                    <div className="mb-3 flex justify-end">
                      <button className="btn" type="button" onClick={() => removeTechGroup(index)}>
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                    <Field label="Category">
                      <input
                        className="field"
                        value={group.category}
                        onChange={(event) => updateTechGroup(index, { category: event.target.value })}
                      />
                    </Field>
                    <div className="mt-3">
                      <Field label="Tools (one per line)">
                        <textarea
                          className="field min-h-28"
                          value={group.items.join("\n")}
                          onChange={(event) =>
                            updateTechGroup(index, {
                              items: event.target.value
                                .split("\n")
                                .map((item) => item.trim())
                                .filter(Boolean)
                            })
                          }
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {showQuoteExtras ? (
              <div className="grid gap-5">
                <h2 className="text-xl font-extrabold">Quote page extras</h2>
                <Field label="Quote factors (one per line)">
                  <textarea
                    className="field min-h-32"
                    value={(page.quoteFactors ?? []).join("\n")}
                    onChange={(event) =>
                      setPage({
                        ...page,
                        quoteFactors: event.target.value
                          .split("\n")
                          .map((item) => item.trim())
                          .filter(Boolean)
                      })
                    }
                  />
                </Field>
                <Field label="Success title">
                  <input
                    className="field"
                    value={page.successMessage?.title ?? ""}
                    onChange={(event) =>
                      setPage({
                        ...page,
                        successMessage: {
                          title: event.target.value,
                          body: page.successMessage?.body ?? ""
                        }
                      })
                    }
                  />
                </Field>
                <Field label="Success body">
                  <textarea
                    className="field min-h-24"
                    value={page.successMessage?.body ?? ""}
                    onChange={(event) =>
                      setPage({
                        ...page,
                        successMessage: {
                          title: page.successMessage?.title ?? "",
                          body: event.target.value
                        }
                      })
                    }
                  />
                </Field>
              </div>
            ) : null}

            {showCollectionHeaders ? (
              <div className="grid gap-5">
                <h2 className="text-xl font-extrabold">Section headers</h2>
                {(selected === "home"
                  ? (["services", "projects", "insights"] as const)
                  : (["stack"] as const)
                ).map((key) => (
                  <div className="rounded-md border border-ink p-4" key={key}>
                    <p className="mb-3 font-mono text-xs uppercase text-steel">{key}</p>
                    <div className="grid gap-3">
                      <Field label="Eyebrow">
                        <input
                          className="field"
                          value={page.collectionHeaders?.[key]?.eyebrow ?? ""}
                          onChange={(event) => updateCollectionHeader(key, "eyebrow", event.target.value)}
                        />
                      </Field>
                      <Field label="Title">
                        <input
                          className="field"
                          value={page.collectionHeaders?.[key]?.title ?? ""}
                          onChange={(event) => updateCollectionHeader(key, "title", event.target.value)}
                        />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {showSiteFields ? (
              <div className="grid gap-5">
                <h2 className="text-xl font-extrabold">{selected === "site" ? "Footer & contact" : "Contact details"}</h2>
                {selected === "site" ? (
                  <Field label="Footer blurb">
                    <textarea
                      className="field min-h-28"
                      value={page.footerBlurb ?? ""}
                      onChange={(event) => setPage({ ...page, footerBlurb: event.target.value })}
                    />
                  </Field>
                ) : null}
                <Field label="Contact email">
                  <input
                    className="field"
                    value={page.contactEmail ?? ""}
                    onChange={(event) => setPage({ ...page, contactEmail: event.target.value })}
                  />
                </Field>
                <Field label="Contact phone">
                  <input
                    className="field"
                    value={page.contactPhone ?? ""}
                    onChange={(event) => setPage({ ...page, contactPhone: event.target.value })}
                  />
                </Field>
              </div>
            ) : null}

            {showCta ? (
              <div className="grid gap-4 rounded-md border border-ink p-4">
                <h2 className="text-xl font-extrabold">Call to action</h2>
                <Field label="Eyebrow">
                  <input className="field" value={page.cta?.eyebrow ?? ""} onChange={(event) => updateCta("eyebrow", event.target.value)} />
                </Field>
                <Field label="Title">
                  <input className="field" value={page.cta?.title ?? ""} onChange={(event) => updateCta("title", event.target.value)} />
                </Field>
                <Field label="Body">
                  <textarea
                    className="field min-h-24"
                    value={page.cta?.body ?? ""}
                    onChange={(event) => updateCta("body", event.target.value)}
                  />
                </Field>
                <Field label="Button label">
                  <input
                    className="field"
                    value={page.cta?.buttonLabel ?? ""}
                    onChange={(event) => updateCta("buttonLabel", event.target.value)}
                  />
                </Field>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-4">
              <button className="btn btn-primary" type="submit">
                <Save size={18} /> Save Page
              </button>
              <span className="font-mono text-sm text-steel">{status}</span>
            </div>
          </form>
        </div>
        )}
      </div>
    </section>
  );
}

export function Admin() {
  const { user, loading } = useAuth();

  return (
    <>
      <Seo title="Admin" description="Secure Appwrite admin for Amos Tech Solutions managed pages." />
      {loading ? (
        <section className="section">
          <div className="container">
            <p className="lede">Checking session...</p>
          </div>
        </section>
      ) : user ? (
        <EditorPanel />
      ) : (
        <LoginPanel />
      )}
    </>
  );
}
