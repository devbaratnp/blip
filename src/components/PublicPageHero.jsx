import { ChevronRight, Home } from 'lucide-react';

export default function PublicPageHero({ eyebrow, title, description, current, onNavigate }) {
  return (
    <section className="public-hero">
      <div className="container public-hero__inner">
        <div className="public-breadcrumbs" aria-label="Breadcrumb">
          <button type="button" onClick={() => onNavigate('/')}><Home size={13} />Home</button>
          <ChevronRight size={14} />
          <span>{current}</span>
        </div>
        <span className="eyebrow public-hero__eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
