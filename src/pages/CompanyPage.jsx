import AboutPage from './AboutPage.jsx';

export default function CompanyPage({ onNavigate, onQuote }) {
  return <AboutPage onNavigate={onNavigate} onQuote={onQuote} current="Company" eyebrow="Our company" />;
}
