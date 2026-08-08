import { Cpu } from "lucide-react";
import { CTASection, SectionHeader } from "../components/ui/Cards";
import { PageHero } from "../components/ui/PageHero";
import { Seo } from "../components/ui/Seo";
import { useManagedPage } from "../hooks/useManagedPage";

export function Technologies() {
  const { page } = useManagedPage("technologies");
  const techGroups = page.techGroups ?? [];

  return (
    <>
      <Seo title="Technologies" description={page.description} />
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} variant="technologies" />
      {page.sections.length ? (
        <section className="section border-b border-ink">
          <div className="container grid gap-6 md:grid-cols-2">
            {page.sections.map((section) => (
              <article className="card p-6" key={section.id}>
                <h2 className="text-2xl font-extrabold">{section.title}</h2>
                <p className="mt-3 leading-7 text-steel">{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow={page.collectionHeaders?.stack?.eyebrow ?? "Stack"}
            title={page.collectionHeaders?.stack?.title ?? "Engineering categories"}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {techGroups.map((group) => (
              <article className="card p-6" key={group.category}>
                <Cpu className="mb-5 text-brand" />
                <h2 className="text-xl font-extrabold">{group.category}</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span className="badge" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection cta={page.cta} />
    </>
  );
}
