import { Link, useParams } from "react-router-dom";
import { ContentLoading, CTASection } from "../components/ui/Cards";
import { Seo } from "../components/ui/Seo";
import { useContentfulList } from "../hooks/useContentfulList";
import { contentful } from "../lib/contentful";
import { NotFound } from "./NotFound";

export function BlogDetail() {
  const { slug } = useParams();
  const { items: posts, loading } = useContentfulList(contentful.blogPosts);

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <ContentLoading />
        </div>
      </section>
    );
  }

  const post = posts.find((item) => item.slug === slug);
  if (!post) return <NotFound />;
  const related = posts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 2);

  return (
    <>
      <Seo title={post.title} description={post.excerpt} />
      <article>
        <section className="section border-b border-ink">
          <div className="container max-w-4xl">
            <Link to="/blog" className="badge">Blog</Link>
            <p className="eyebrow mt-6">{post.category}</p>
            <h1 className="display mt-4 text-brand">{post.title}</h1>
            <p className="lede mt-5">{post.excerpt}</p>
            <p className="mt-5 font-mono text-sm text-steel">{post.author} • {post.publishedAt} • {post.readingTime}</p>
          </div>
        </section>
        <div className="section">
          <div className="container max-w-4xl">
            <img src={post.image} alt="" className="card mb-10 aspect-video w-full object-cover" />
            <div className="article-content text-lg">
              {post.content.split("\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => <span className="badge" key={tag}>{tag}</span>)}
            </div>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="section border-t border-ink">
          <div className="container grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <Link to={`/blog/${item.slug}`} className="card p-6" key={item.slug}>
                <h2 className="text-xl font-extrabold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      <CTASection />
    </>
  );
}
