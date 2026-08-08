import { LinkCard, SectionHeader } from "../components/ui/Cards";
import { PageHero } from "../components/ui/PageHero";
import { Seo } from "../components/ui/Seo";
import { events } from "../data/fallbackContent";
import { useContentfulList } from "../hooks/useContentfulList";
import { contentful } from "../lib/contentful";

export function Events() {
  const items = useContentfulList(contentful.events, events);
  const upcoming = items.filter((event) => event.status !== "past");
  const past = items.filter((event) => event.status === "past");
  return (
    <>
      <Seo title="Events" description="Workshops, demo days, and technology sessions from Amos Tech Solutions." />
      <PageHero eyebrow="Events" title="Technical sessions for teams planning better digital systems." description="Join workshops and demos focused on practical web, AI, automation, and software delivery." variant="events" />
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Upcoming" title="Upcoming events" />
          <div className="grid gap-6 md:grid-cols-2">
            {upcoming.map((event) => (
              <LinkCard key={event.slug} to={`/events/${event.slug}`} title={event.title} description={`${event.date} • ${event.location ?? "Online"} • ${event.description}`} image={event.image} meta={event.category} />
            ))}
          </div>
          {past.length > 0 && <SectionHeader eyebrow="Past" title="Past events" />}
        </div>
      </section>
    </>
  );
}
