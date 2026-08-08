import { Link } from "react-router-dom";
import { Seo } from "../components/ui/Seo";

export function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The requested Amos Tech Solutions page could not be found." />
      <section className="section">
        <div className="container card max-w-3xl p-10 text-center">
          <p className="eyebrow">404</p>
          <h1 className="heading mt-3">This route is not connected.</h1>
          <p className="lede mt-4">Head back to the homepage or explore the services catalog.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link className="btn btn-primary" to="/">Home</Link>
            <Link className="btn btn-secondary" to="/services">Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
