import { useMemo, useState } from "react";
import { ContentLoading, LinkCard, SectionHeader } from "../components/ui/Cards";
import { PageHero } from "../components/ui/PageHero";
import { Seo } from "../components/ui/Seo";
import { useContentfulList } from "../hooks/useContentfulList";
import { contentful } from "../lib/contentful";

export function Projects() {
  const { items, loading } = useContentfulList(contentful.projects);
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(items.map((project) => project.category)))];
  const filtered = useMemo(() => items.filter((project) => category === "All" || project.category === category), [category, items]);
  return (
    <>
      <Seo title="Projects" description="Websites, apps, and digital systems Amos Tech Solutions has built and launched for clients." />
      <PageHero eyebrow="Projects" title="Live work for ministries, marketplaces, and community organisations." description="Selected websites and software shipped for clients — from church platforms and e-commerce to a Kenyan car marketplace." variant="projects" />
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Selected work" title="Project library" />
          {loading ? (
            <ContentLoading />
          ) : (
            <>
              <select className="field mb-8 max-w-xs" value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter projects">
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
              <div className="grid gap-6 md:grid-cols-2">
                {filtered.map((project) => (
                  <LinkCard key={project.slug} to={`/projects/${project.slug}`} title={project.title} description={project.description} image={project.image} meta={`${project.category} • ${project.industry}`} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
