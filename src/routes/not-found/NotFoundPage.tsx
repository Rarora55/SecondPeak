import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1>Page not found</h1>
      <Link to="/">Return to Home</Link>
    </section>
  );
}
