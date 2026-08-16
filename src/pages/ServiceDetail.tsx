import { CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ContentLoading, CTASection, SectionHeader } from "../components/ui/Cards";
import { PageHero } from "../components/ui/PageHero";
import { Seo } from "../components/ui/Seo";
import { useContentfulList } from "../hooks/useContentfulList";
import { contentful } from "../lib/contentful";
import { NotFound } from "./NotFound";

export function ServiceDetail() {
  const { slug } = useParams();
  const { items, loading } = useContentfulList(contentful.services);
  const { items: projects } = useContentfulList(contentful.projects);
  const service = items.find((item) => item.slug === slug);

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <ContentLoading />
        </div>
      </section>
    );
  }

  if (!service) return <NotFound />;

  return (
    <>
      <Seo title={service.title} description={service.shortDescription} />
      <PageHero eyebrow="Service" title={service.title} description={service.description} variant="service" />
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <SectionHeader eyebrow="What we provide" title="Capabilities shaped around your project scope." />
            <div className="grid gap-3">
              {service.features.map((feature) => (
                <p className="flex items-center gap-3 rounded-md border border-ink bg-paper p-4" key={feature}><CheckCircle2 className="text-brand" />{feature}</p>
              ))}
            </div>
          </div>
          <img src={service.image} alt={`${service.title} technology visual`} className="card aspect-[4/3] w-full object-cover" />
        </div>
      </section>
      <section className="section border-t border-ink">
        <div className="container grid gap-6 md:grid-cols-3">
          <InfoList title="Technologies/tools" items={service.technologies} />
          <InfoList title="Our process" items={service.process} />
          <div className="card p-6">
            <h2 className="text-xl font-extrabold">Frequently asked questions</h2>
            {service.faqs.map((faq) => (
              <div className="mt-5" key={faq.question}>
                <h3 className="font-bold">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-steel">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section border-t border-ink">
        <div className="container">
          <SectionHeader eyebrow="Related project examples" title="See how this work can translate into real systems." />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Link to={`/projects/${project.slug}`} className="card p-6" key={project.slug}>
                <span className="badge">{project.category}</span>
                <h3 className="mt-4 text-xl font-extrabold">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-steel">{project.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-extrabold">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => <li className="text-sm text-steel" key={item}>• {item}</li>)}
      </ul>
    </div>
  );
}
