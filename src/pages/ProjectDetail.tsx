import { Link, useParams } from "react-router-dom";
import { ContentLoading, CTASection, SectionHeader } from "../components/ui/Cards";
import { PageHero } from "../components/ui/PageHero";
import { Seo } from "../components/ui/Seo";
import { useContentfulList } from "../hooks/useContentfulList";
import { contentful } from "../lib/contentful";
import { NotFound } from "./NotFound";

export function ProjectDetail() {
  const { slug } = useParams();
  const { items, loading } = useContentfulList(contentful.projects);

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <ContentLoading />
        </div>
      </section>
    );
  }

  const project = items.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  const related = items.filter((item) => item.slug !== project.slug).slice(0, 2);

  return (
    <>
      <Seo title={project.title} description={project.description} />
      <PageHero eyebrow={project.category} title={project.title} description={project.description} variant="project" />
      <section className="section">
        <div className="container">
          <img src={project.image} alt="" className="card mb-10 aspect-video w-full object-cover" />
          <div className="grid gap-6 lg:grid-cols-3">
            <Info title="Challenge" body={project.challenge} />
            <Info title="Solution" body={project.solution} />
            <div className="card p-6">
              <h2 className="text-xl font-extrabold">Technologies</h2>
              <div className="mt-4 flex flex-wrap gap-2">{project.technologies.map((tech) => <span className="badge" key={tech}>{tech}</span>)}</div>
            </div>
          </div>
        </div>
      </section>
      <section className="section border-t border-ink">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Features" title="What the system includes" />
            <div className="grid gap-3">{project.features.map((feature) => <p className="card p-4" key={feature}>{feature}</p>)}</div>
          </div>
          <div>
            <SectionHeader eyebrow="Outcomes" title="Example outcomes" />
            <div className="grid gap-3">{project.results.map((result) => <p className="card p-4" key={result}>{result}</p>)}</div>
          </div>
        </div>
      </section>
      <section className="section border-t border-ink">
        <div className="container">
          <SectionHeader eyebrow="Gallery" title="System visuals" />
          <div className="grid gap-6 md:grid-cols-2">{project.gallery.map((image) => <img src={image} alt="" className="card aspect-video w-full object-cover" key={image} loading="lazy" />)}</div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section border-t border-ink">
          <div className="container grid gap-6 md:grid-cols-2">
            {related.map((item) => <Link to={`/projects/${item.slug}`} className="card p-6" key={item.slug}><h2 className="text-xl font-extrabold">{item.title}</h2><p className="mt-3 text-sm leading-7 text-steel">{item.description}</p></Link>)}
          </div>
        </section>
      )}
      <CTASection />
    </>
  );
}

function Info({ title, body }: { title: string; body: string }) {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-extrabold">{title}</h2>
      <p className="mt-3 leading-7 text-steel">{body}</p>
    </div>
  );
}
