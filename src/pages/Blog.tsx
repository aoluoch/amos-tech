import { useMemo, useState } from "react";
import { ContentLoading, LinkCard, SectionHeader } from "../components/ui/Cards";
import { PageHero } from "../components/ui/PageHero";
import { Seo } from "../components/ui/Seo";
import { useContentfulList } from "../hooks/useContentfulList";
import { contentful } from "../lib/contentful";

export function Blog() {
  const { items: posts, loading } = useContentfulList(contentful.blogPosts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category)))];
  const filtered = useMemo(
    () => posts.filter((post) => (category === "All" || post.category === category) && `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase())),
    [category, posts, query]
  );

  return (
    <>
      <Seo title="Blog" description="Technical articles, guides, and practical digital transformation notes from Amos Tech Solutions." />
      <PageHero eyebrow="Blog" title="Practical technology writing for business teams." description="Articles about web platforms, automation, AI workflows, and maintainable digital systems." variant="blog" />
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Articles" title="Browse insights" />
          {loading ? (
            <ContentLoading />
          ) : (
            <>
              <div className="mb-8 grid gap-3 md:grid-cols-[1fr_auto]">
                <label>
                  <span className="sr-only">Search posts</span>
                  <input className="field" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles" />
                </label>
                <select className="field md:w-56" value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">
                  {categories.map((item) => <option key={item}>{item}</option>)}
                </select>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post) => (
                  <LinkCard key={post.slug} to={`/blog/${post.slug}`} title={post.title} description={post.excerpt} image={post.image} meta={`${post.category} • ${post.readingTime}`} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
