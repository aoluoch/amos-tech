import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentLoading } from "../components/ui/Cards";
import { PageHero } from "../components/ui/PageHero";
import { Seo } from "../components/ui/Seo";
import { useContentfulList } from "../hooks/useContentfulList";
import { contentful } from "../lib/contentful";

export function Services() {
  const { items, loading } = useContentfulList(contentful.services);
  return (
    <>
      <Seo title="Services" description="Explore web, app, AI, automation, design, software, and consulting services from Amos Tech Solutions." />
      <PageHero eyebrow="Services" title="Technology and creative services built around business outcomes." description="Every service can stand alone or connect into a larger digital transformation roadmap." variant="services" />
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? <ContentLoading /> : items.map((service) => {
            const Icon = service.icon ?? CheckCircle2;
            return (
              <Link to={`/services/${service.slug}`} className="card p-6" key={service.slug}>
                <Icon className="mb-5 text-brand" />
                <h2 className="text-xl font-extrabold">{service.title}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{service.shortDescription}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.technologies.slice(0, 3).map((tech) => <span className="badge" key={tech}>{tech}</span>)}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
