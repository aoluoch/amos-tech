import { CTASection } from "../components/ui/Cards";
import { PageHero } from "../components/ui/PageHero";
import { Seo } from "../components/ui/Seo";
import { useManagedPage } from "../hooks/useManagedPage";

export function About() {
  const { page } = useManagedPage("about");
  const approach = page.listSections?.[0];

  return (
    <>
      <Seo title="About" description={page.description} />
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} variant="about" />
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-3">
          {page.sections.map((section) => (
            <article className="card p-6" key={section.id}>
              <h2 className="text-2xl font-extrabold text-brand">{section.title}</h2>
              <p className="mt-4 leading-7 text-steel">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
      {approach ? (
        <section className="section border-t border-ink">
          <div className="container grid gap-8 lg:grid-cols-2">
            <div>
              {approach.eyebrow ? <p className="eyebrow">{approach.eyebrow}</p> : null}
              <h2 className="heading mt-3">{approach.title}</h2>
            </div>
            <div className="grid gap-4">
              {approach.items.map((text) => (
                <p key={text} className="card p-5 leading-7 text-steel">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <CTASection cta={page.cta} />
    </>
  );
}
