import { ArrowRight, BriefcaseBusiness, CheckCircle2, Mail, Users } from 'lucide-react';
import { site } from '../data/site.js';
import PublicPageHero from '../components/PublicPageHero.jsx';

const openings = [
  {
    title: 'Mid or senior level accountant',
    type: 'Accounting · Kathmandu',
    image: '/assets/categories/time-attendance.jpg',
    description: 'Help keep BLI’s accounts, records and financial systems accurate and up to date.',
    responsibilities: ['Keep account books and systems up to date', 'Maintain different receipts properly', 'Prepare accounts and tax returns on time', 'Monitor spending and budgets', 'Advise on reducing costs and increasing profits', 'Ensure accuracy of financial statements and records', 'Summarize monthly reports and suggest necessary actions'],
  },
  {
    title: 'Technical support representative',
    type: 'Technical support · Kathmandu',
    image: '/assets/categories/access-control.jpg',
    description: 'Help customers and colleagues install, configure and maintain BLI security and communication systems.',
    responsibilities: ['Bachelor’s degree in computer science, IT or a similar field', 'Knowledge of hardware, software maintenance, networking and servers', 'Install and configure IP CCTV cameras', 'Install and configure PABX and IP PABX', 'Install and configure biometric attendance systems', 'Explain technical problems clearly', 'At least one year of related experience'],
  },
];

export default function CareersPage({ onNavigate }) {
  return (
    <main className="public-page careers-page">
      <PublicPageHero
        eyebrow="Careers at BLI"
        title="Start your journey with us."
        description="Unleash your digital potential and start your journey with BLI."
        current="Careers"
        onNavigate={onNavigate}
      />

      <section className="public-section">
        <div className="container public-section-heading public-section-heading--split">
          <div><span className="eyebrow">Work with us</span><h2>Bring your skills to meaningful security projects.</h2></div>
          <p>Join a team working across CCTV, access control, attendance, PABX, networking and other security solutions for homes, businesses and institutions.</p>
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
