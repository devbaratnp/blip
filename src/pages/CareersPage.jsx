import { ArrowRight, BriefcaseBusiness, CheckCircle2, Mail, Users } from 'lucide-react';
import { site } from '../data/site.js';
import PublicPageHero from '../components/PublicPageHero.jsx';

const openings = [
  {
    title: 'Mid or senior level accountant',
    type: 'Full-time · Kathmandu',
    image: '/assets/categories/time-attendance.jpg',
    description: 'Keep financial operations accurate, organized and ready to support a growing security solutions business.',
    responsibilities: ['Maintain account books and records', 'Prepare accounts and tax returns on time', 'Monitor spending and budgets', 'Summarize reports and recommend next actions'],
  },
  {
    title: 'Technical support representative',
    type: 'Full-time · Kathmandu',
    image: '/assets/categories/access-control.jpg',
    description: 'Help customers and colleagues get reliable results from CCTV, access control, attendance and networking systems.',
    responsibilities: ['Support hardware and software troubleshooting', 'Install and configure security systems', 'Explain technical solutions clearly', 'Coordinate customer and field support'],
  },
];

export default function CareersPage({ onNavigate }) {
  return (
    <main className="public-page careers-page">
      <PublicPageHero
        eyebrow="Careers at BLI"
        title="Build safer places with a team that cares about the details."
        description="Join people who make security and communication systems more useful, more dependable and easier to support."
        current="Careers"
        onNavigate={onNavigate}
      />

      <section className="public-section">
        <div className="container public-section-heading public-section-heading--split">
          <div><span className="eyebrow">Work with us</span><h2>Bring practical thinking to meaningful projects.</h2></div>
          <p>BLI works across homes, offices, institutions and critical environments. We value ownership, clear communication and the willingness to keep learning.</p>
        </div>
        <div className="container career-principles">
          <article><span><BriefcaseBusiness size={20} /></span><h3>Work with purpose</h3><p>Your work helps people, assets and operations stay safer.</p></article>
          <article><span><Users size={20} /></span><h3>Learn together</h3><p>Share knowledge across products, projects and customer situations.</p></article>
          <article><span><CheckCircle2 size={20} /></span><h3>Own the outcome</h3><p>Take responsibility for the details that make a handover successful.</p></article>
        </div>
      </section>

      <section className="public-section public-section--soft">
        <div className="container public-section-heading"><span className="eyebrow">Current opportunities</span><h2>Find your next role at BLI.</h2><p>We’re looking for thoughtful people who can help customers make confident technology decisions.</p></div>
        <div className="container career-openings">
          {openings.map((opening) => (
            <article className="career-card" key={opening.title}>
              <div className="career-card__image"><img src={opening.image} alt={`${opening.title} work environment`} /></div>
              <div className="career-card__body"><span className="career-card__type">{opening.type}</span><h3>{opening.title}</h3><p>{opening.description}</p><h4>What you’ll do</h4><ul>{opening.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul><a className="text-link" href={`mailto:${site.email}?subject=Application%20for%20${encodeURIComponent(opening.title)}`}>Apply for this role <ArrowRight size={15} /></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="container public-cta">
        <div><span className="eyebrow">Don’t see your role?</span><h2>We’re always open to capable people.</h2><p>Send your CV and a short note about where you can contribute.</p></div>
        <a className="button button--primary" href={`mailto:${site.email}?subject=General%20career%20enquiry`}>Email your CV <Mail size={16} /></a>
      </section>
    </main>
  );
}
