import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { CTASection } from "../components/ui/Cards";
import { FormLabel } from "../components/ui/FormLabel";
import { PageHero } from "../components/ui/PageHero";
import { Seo } from "../components/ui/Seo";
import { useManagedPage } from "../hooks/useManagedPage";
import { submitContactMessage } from "../lib/forms";

export function Contact() {
  const { page } = useManagedPage("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("");
    setSubmitting(true);
    try {
      await submitContactMessage({ name, email, phone, message });
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setStatus("Message sent. We will get back to you soon.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Unable to send message.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Seo title="Contact" description={page.description} />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        variant="contact"
      />
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            {page.sections.map((section) => (
              <div className="card p-6" key={section.id}>
                {section.id === "email" && <Mail className="mb-4 text-brand" />}
                {section.id === "phone" && <Phone className="mb-4 text-brand" />}
                {section.id === "location" && <MapPin className="mb-4 text-brand" />}
                <h2 className="text-xl font-extrabold">{section.title}</h2>
                <p className="mt-2 leading-7 text-steel">{section.body}</p>
              </div>
            ))}
          </div>
          <form className="card grid gap-4 p-6" onSubmit={onSubmit}>
            <div>
              <FormLabel required>Full name</FormLabel>
              <input
                className="field mt-2"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <FormLabel required>Email</FormLabel>
              <input
                className="field mt-2"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <FormLabel required>Phone number</FormLabel>
              <input
                className="field mt-2"
                type="tel"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <div>
              <FormLabel required>Message</FormLabel>
              <textarea
                className="field mt-2 min-h-36"
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
            <p className="text-sm text-steel">
              Fields marked with <span className="font-bold text-brand">*</span> are required.
            </p>
            <button className="btn btn-primary justify-self-start" type="submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </button>
            {status ? <p className="text-sm font-semibold text-steel">{status}</p> : null}
          </form>
        </div>
      </section>
      {page.faqs?.length ? (
        <section className="section border-t border-ink">
          <div className="container grid gap-4 md:grid-cols-3">
            {page.faqs.map((faq) => (
              <article className="card p-6" key={faq.question}>
                <h2 className="font-extrabold">{faq.question}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
      <CTASection cta={page.cta} />
    </>
  );
}
