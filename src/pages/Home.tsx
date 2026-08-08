import { Link } from "react-router-dom";
import { CheckCircle2, Cpu, ShieldCheck, Sparkles } from "lucide-react";
import { LinkCard, CTASection, SectionHeader } from "../components/ui/Cards";
import { PageHero } from "../components/ui/PageHero";
import { Seo } from "../components/ui/Seo";
import { blogPosts, events, projects, services } from "../data/fallbackContent";
import { contentful } from "../lib/contentful";
import { useContentfulList } from "../hooks/useContentfulList";
import { useManagedPage } from "../hooks/useManagedPage";

export function Home() {
  const { page } = useManagedPage("home");
  const serviceItems = useContentfulList(contentful.services, services);
  const projectItems = useContentfulList(contentful.projects, projects);
  const postItems = useContentfulList(contentful.blogPosts, blogPosts);
  const eventItems = useContentfulList(contentful.events, events);
  const engineering = page.listSections?.[0];

  return (
    <>
      <Seo title="Home" description={page.description} />
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} variant="home" />
      {page.bannerText ? (
        <section className="border-b border-ink bg-teal/70 px-5 py-3 text-center font-mono text-sm font-bold uppercase">
          {page.bannerText}
        </section>
      ) : null}
      <section className="section">
        <div className="container grid gap-6 lg:grid-cols-3">
          {page.sections.map((section) => (
            <article key={section.id} className="card p-6">
              <Cpu className="mb-5 text-brand" />
              <h2 className="text-2xl font-extrabold">{section.title}</h2>
              <p className="mt-3 leading-7 text-steel">{section.body}</p>
            </article>
          ))}
          {page.highlight ? (
            <article className="card-ink p-6">
              <Sparkles className="mb-5 text-teal" />
              <h2 className="text-2xl font-extrabold text-paper">{page.highlight.title}</h2>
              <p className="mt-3 leading-7 text-paper/75">{page.highlight.body}</p>
            </article>
          ) : null}
        </div>
      </section>
      <section className="section border-t border-ink">
        <div className="container">
          <SectionHeader
            eyebrow={page.collectionHeaders?.services?.eyebrow ?? "Services"}
            title={page.collectionHeaders?.services?.title ?? "Digital services"}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceItems.slice(0, 6).map((service) => {
              const Icon = service.icon ?? CheckCircle2;
              return (
                <Link key={service.slug} to={`/services/${service.slug}`} className="card p-6">
                  <Icon className="mb-5 text-brand" />
                  <h3 className="text-xl font-extrabold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-steel">{service.shortDescription}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section border-t border-ink">
        <div className="container">
          <SectionHeader
            eyebrow={page.collectionHeaders?.projects?.eyebrow ?? "Featured Projects"}
            title={page.collectionHeaders?.projects?.title ?? "Example builds"}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {projectItems.slice(0, 2).map((project) => (
              <LinkCard
                key={project.slug}
                to={`/projects/${project.slug}`}
                title={project.title}
                description={project.description}
                image={project.image}
                meta={project.category}
              />
            ))}
          </div>
        </div>
      </section>
      {engineering ? (
        <section className="section border-t border-ink">
          <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeader
              eyebrow={engineering.eyebrow ?? "Engineering"}
              title={engineering.title}
              description={engineering.description}
            />
            <div className="grid gap-4">
              {engineering.items.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md border border-ink bg-paper p-4 font-semibold">
                  <ShieldCheck className="text-brand" /> {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="section border-t border-ink">
        <div className="container">
          <SectionHeader
            eyebrow={page.collectionHeaders?.insights?.eyebrow ?? "Insights & Events"}
            title={page.collectionHeaders?.insights?.title ?? "Useful thinking and upcoming technical sessions."}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {postItems.slice(0, 2).map((post) => (
              <LinkCard
                key={post.slug}
                to={`/blog/${post.slug}`}
                title={post.title}
                description={post.excerpt}
                image={post.image}
                meta={post.category}
              />
            ))}
            {eventItems.slice(0, 1).map((event) => (
              <LinkCard
                key={event.slug}
                to={`/events/${event.slug}`}
                title={event.title}
                description={event.description}
                image={event.image}
                meta={event.status}
              />
            ))}
          </div>
        </div>
      </section>
      <CTASection cta={page.cta} />
    </>
  );
}
