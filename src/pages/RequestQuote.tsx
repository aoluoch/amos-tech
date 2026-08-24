import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { FormLabel } from "../components/ui/FormLabel";
import { PageHero } from "../components/ui/PageHero";
import { Seo } from "../components/ui/Seo";
import { useManagedPage } from "../hooks/useManagedPage";
import { useContentfulList } from "../hooks/useContentfulList";
import { contentful } from "../lib/contentful";
import { submitQuoteRequest } from "../lib/forms";

export function RequestQuote() {
  const { page } = useManagedPage("quote");
  const { items: serviceItems } = useContentfulList(contentful.services);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const note = page.sections[0];

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = new FormData(event.currentTarget);
    const selectedServices = form.getAll("services").map(String);
    const phone = String(form.get("phone") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const projectType = String(form.get("projectType") ?? "").trim();
    const timeline = String(form.get("timeline") ?? "").trim();
    const contactMethod = String(form.get("contactMethod") ?? "").trim();

    if (!phone || !company || !projectType || !timeline || !contactMethod) {
      setError("Please complete all required fields.");
      return;
    }

    if (selectedServices.length === 0) {
      setError("Please select at least one required service.");
      return;
    }

    setSubmitting(true);

    try {
      await submitQuoteRequest({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        phone,
        company,
        services: selectedServices,
        projectType,
        timeline,
        projectDescription: String(form.get("projectDescription") ?? ""),
        desiredFeatures: String(form.get("desiredFeatures") ?? ""),
        existingUrl: String(form.get("existingUrl") ?? ""),
        contactMethod,
        additionalInfo: String(form.get("additionalInfo") ?? "")
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit quote request.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Seo title="Request a Quote" description={page.description} />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        cta={false}
        variant="quote"
        actions={
          <>
            <span className="badge">No fixed packages</span>
            <span className="badge">Response within 1 business day</span>
          </>
        }
      />
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="card h-fit p-6">
            <h2 className="text-2xl font-extrabold">{note?.title || "Quote factors"}</h2>
            {note?.body ? <p className="mt-3 leading-7 text-steel">{note.body}</p> : null}
            <div className="mt-5 grid gap-3">
              {(page.quoteFactors ?? []).map((item) => (
                <p className="flex items-center gap-3" key={item}>
                  <CheckCircle2 className="text-brand" /> {item}
                </p>
              ))}
            </div>
          </aside>
          {submitted ? (
            <div className="card grid place-items-center p-10 text-center">
              <CheckCircle2 className="mb-5 text-brand" size={48} />
              <h2 className="text-3xl font-extrabold">{page.successMessage?.title || "Request received."}</h2>
              <p className="mt-4 max-w-xl leading-7 text-steel">
                {page.successMessage?.body || "Thanks for your details. Our team will follow up soon."}
              </p>
            </div>
          ) : (
            <form className="card grid gap-4 p-6" onSubmit={onSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FormLabel required>Full name</FormLabel>
                  <input className="field mt-2" name="name" required />
                </div>
                <div>
                  <FormLabel required>Email</FormLabel>
                  <input className="field mt-2" name="email" type="email" required />
                </div>
                <div>
                  <FormLabel required>Phone</FormLabel>
                  <input className="field mt-2" name="phone" type="tel" required />
                </div>
                <div>
                  <FormLabel required>Company/business</FormLabel>
                  <input className="field mt-2" name="company" required />
                </div>
              </div>
              <fieldset className="grid gap-3">
                <legend className="font-bold">
                  Services required <span className="text-brand" aria-hidden="true">*</span>
                </legend>
                <div className="grid gap-2 md:grid-cols-2">
                  {serviceItems.map((service) => (
                    <label className="flex items-center gap-3 rounded-md border border-ink p-3" key={service.slug}>
                      <input type="checkbox" name="services" value={service.slug} /> {service.title}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FormLabel required>Project type</FormLabel>
                  <input className="field mt-2" name="projectType" placeholder="New build, redesign, integration..." required />
                </div>
                <div>
                  <FormLabel required>Estimated timeline</FormLabel>
                  <select className="field mt-2" name="timeline" defaultValue="" required>
                    <option value="" disabled>
                      Select a timeline
                    </option>
                    <option>Flexible</option>
                    <option>1-2 months</option>
                    <option>3-6 months</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>
              <div>
                <FormLabel required>Project description</FormLabel>
                <textarea className="field mt-2 min-h-32" name="projectDescription" required />
              </div>
              <div>
                <FormLabel>Desired features</FormLabel>
                <textarea className="field mt-2 min-h-28" name="desiredFeatures" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FormLabel>Existing website/app URL</FormLabel>
                  <input className="field mt-2" name="existingUrl" type="url" />
                </div>
                <div>
                  <FormLabel required>Preferred contact method</FormLabel>
                  <select className="field mt-2" name="contactMethod" defaultValue="" required>
                    <option value="" disabled>
                      Select a contact method
                    </option>
                    <option>Email</option>
                    <option>Phone</option>
                    <option>WhatsApp</option>
                  </select>
                </div>
              </div>
              <div>
                <FormLabel>Additional information</FormLabel>
                <textarea className="field mt-2 min-h-28" name="additionalInfo" />
              </div>
              <p className="text-sm text-steel">
                Fields marked with <span className="font-bold text-brand">*</span> are required.
              </p>
              {error ? <p className="rounded-md border border-ink bg-teal/40 px-3 py-2 text-sm font-semibold">{error}</p> : null}
              <button className="btn btn-primary justify-self-start" type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
