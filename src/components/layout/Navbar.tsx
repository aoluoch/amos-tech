import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/events", label: "Events" },
  { to: "/technologies", label: "Tech" },
  { to: "/contact", label: "Contact" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 text-sm font-semibold ${isActive ? "bg-teal text-ink" : "text-ink hover:bg-ash/50"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-paper/95 backdrop-blur">
      <nav className="container flex min-h-16 items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-3 font-extrabold" onClick={() => setOpen(false)}>
          <img src="/amosT.jpg" alt="Amos Tech Solutions logo" className="h-10 w-10 rounded-md object-cover" />
          <span className="hidden leading-tight sm:block">Amos Tech Solutions</span>
          <span className="sm:hidden">ATS</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Link className="btn btn-primary" to="/request-quote">
            Request a Quote
          </Link>
        </div>
        <button className="btn lg:hidden" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-ink bg-paper px-4 py-4 lg:hidden">
          <div className="container grid gap-2">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <Link className="btn btn-primary mt-2" to="/request-quote" onClick={() => setOpen(false)}>
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
