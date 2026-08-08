import { Calendar, MapPin } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { CTASection } from "../components/ui/Cards";
import { PageHero } from "../components/ui/PageHero";
import { Seo } from "../components/ui/Seo";
import { events } from "../data/fallbackContent";
import { useContentfulList } from "../hooks/useContentfulList";
import { contentful } from "../lib/contentful";
import { NotFound } from "./NotFound";

export function EventDetail() {
  const { slug } = useParams();
  const items = useContentfulList(contentful.events, events);
  const event = items.find((item) => item.slug === slug) ?? events.find((item) => item.slug === slug);
  if (!event) return <NotFound />;

  return (
    <>
      <Seo title={event.title} description={event.description} />
      <PageHero eyebrow={event.category} title={event.title} description={event.description} variant="event" />
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="card p-6">
            <p className="flex items-center gap-3 font-bold"><Calendar className="text-brand" /> {event.date} {event.time && `• ${event.time}`}</p>
            <p className="mt-4 flex items-center gap-3 font-bold"><MapPin className="text-brand" /> {event.location ?? "Online"}</p>
            <span className="badge mt-6">{event.status}</span>
            <Link to="/request-quote" className="btn btn-primary mt-8 w-full">Register Interest</Link>
          </div>
          <div>
            <h2 className="heading">Agenda</h2>
            <div className="mt-6 grid gap-3">
              {event.agenda.map((item) => <p className="card p-5" key={item}>{item}</p>)}
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
