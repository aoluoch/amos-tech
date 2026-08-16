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
      <Seo title="Projects" description="Selected project examples and digital system concepts by Amos Tech Solutions." />
      <PageHero eyebrow="Projects" title="Work examples for software, web, automation, and digital systems." description="A showcase of realistic project patterns and demo concepts that can be adapted for client needs." variant="projects" />
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
