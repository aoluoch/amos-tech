import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ManagedCta } from "../../types/content";
import { useManagedPage } from "../../hooks/useManagedPage";

export function ContentLoading() {
  return <p className="font-mono text-sm text-steel">Loading content...</p>;
}

export function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="heading mt-3">{title}</h2>
      {description && <p className="lede mt-4">{description}</p>}
    </div>
  );
}

export function LinkCard({
  to,
  title,
  description,
  image,
  meta
}: {
  to: string;
  title: string;
  description: string;
  image?: string;
  meta?: string;
}) {
  return (
    <Link to={to} className="card group grid overflow-hidden">
      {image && <img src={image} alt="" className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.03]" loading="lazy" />}
      <div className="grid gap-3 p-5">
        {meta && <span className="badge w-fit">{meta}</span>}
        <h3 className="text-xl font-extrabold">{title}</h3>
        <p className="text-sm leading-7 text-steel">{description}</p>
        <span className="inline-flex items-center gap-2 font-bold text-brand">
          View details <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}

export function CTASection({ cta }: { cta?: ManagedCta }) {
  const { page: site } = useManagedPage("site");
  const content = cta ?? site.cta;

  if (!content) return null;

  return (
    <section className="section border-t border-ink">
      <div className="container card grid items-center gap-6 bg-teal/80 p-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="heading mt-2">{content.title}</h2>
          <p className="mt-4 max-w-2xl leading-7 text-ink/75">{content.body}</p>
        </div>
        <Link to="/request-quote" className="btn btn-primary">
          {content.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
