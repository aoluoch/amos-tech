import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useContentfulList } from "../../hooks/useContentfulList";
import { useManagedPage } from "../../hooks/useManagedPage";
import { contentful } from "../../lib/contentful";

export function Footer() {
  const { page: site } = useManagedPage("site");
  const { items: services } = useContentfulList(contentful.services);
  const email = site.contactEmail ?? "hello@amostechsolutions.com";
  const phone = site.contactPhone ?? "+254 700 000 000";
  const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;

  return (
    <footer className="border-t border-ink bg-ink text-paper">
      <div className="container grid gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src="/amosT.jpg" alt="Amos Tech Solutions logo" className="mb-5 h-16 w-16 rounded-md object-cover" />
          <h2 className="text-2xl font-extrabold">{site.title}</h2>
          <p className="mt-3 max-w-sm text-sm leading-7 text-paper/70">
            {site.footerBlurb ?? site.description}
          </p>
          <div className="mt-5 flex gap-3">
            <a aria-label="Email" className="btn border-paper text-paper" href={`mailto:${email}`}>
              <Mail size={18} />
            </a>
            <a aria-label="Phone" className="btn border-paper text-paper" href={phoneHref}>
              <Phone size={18} />
            </a>
            <a aria-label="LinkedIn" className="btn border-paper text-paper" href="#">
              <Linkedin size={18} />
            </a>
            <a aria-label="GitHub" className="btn border-paper text-paper" href="#">
              <Github size={18} />
            </a>
          </div>
        </div>
        <FooterColumn title="Company" links={["About", "Services", "Projects", "Blog", "Events", "Contact"]} />
        <div>
          <h3 className="mb-4 font-bold">Services</h3>
          <div className="grid gap-2 text-sm text-paper/75">
            {services.slice(0, 6).map((service) => (
              <Link key={service.slug} to={`/services/${service.slug}`} className="hover:text-teal">
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold">Resources</h3>
          <div className="grid gap-2 text-sm text-paper/75">
            <Link to="/technologies" className="hover:text-teal">
              Technologies
            </Link>
            <Link to="/request-quote" className="hover:text-teal">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/20 px-5 py-5 text-center text-sm text-paper/65">
        © {new Date().getFullYear()} {site.title}. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-4 font-bold">{title}</h3>
      <div className="grid gap-2 text-sm text-paper/75">
        {links.map((label) => (
          <Link key={label} to={`/${label === "Services" ? "services" : label.toLowerCase()}`} className="hover:text-teal">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
