import { ArrowRight, Heart, Menu, ShoppingCart, UserRound, X } from 'lucide-react';
import { site } from '../data/site.js';
import SearchBar from './SearchBar.jsx';

export default function Header({
  activePath,
  search,
  onSearchChange,
  onSearchSubmit,
  onNavigate,
  onQuote,
  cartCount,
  cartOpen,
  onOpenCart,
  mobileNavOpen,
  onToggleMobileNav,
}) {
  const navigation = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Solutions', path: '/products' },
    { label: 'Projects', path: '/products' },
    { label: 'About Us', path: '/about' },
    { label: 'Support', path: '/contact' },
  ];

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <span>Trusted security and communication solutions across Nepal</span>
          <a href={`tel:${site.phoneHref}`}>Need help? Call {site.phoneDisplay}</a>
        </div>
      </div>

      <div className="container header-main">
        <button className="mobile-menu-toggle" type="button" onClick={onToggleMobileNav} aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileNavOpen}>
          {mobileNavOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
        <button className="brand-lockup" type="button" onClick={() => onNavigate('/')} aria-label="BLI home">
          <img src="/assets/logo.jpg" alt="BLI" />
          <span>BLI — Advance.Authentic.Affordable</span>
        </button>
        <SearchBar value={search} onChange={onSearchChange} onSubmit={onSearchSubmit} />
        <div className="header-actions" aria-label="Account actions">
          <button type="button" className="header-action" onClick={() => onNavigate('/products')}>
            <UserRound size={20} strokeWidth={1.7} />
            <span>My account</span>
          </button>
          <button type="button" className="header-action header-action--desktop" onClick={() => onNavigate('/products')}>
            <Heart size={20} strokeWidth={1.7} />
            <span>Wishlist</span>
          </button>
          <button type="button" className="header-action cart-action" onClick={onOpenCart}>
            <span className="cart-icon-wrap"><ShoppingCart size={20} strokeWidth={1.7} /><b>{cartCount}</b></span>
            <span>Cart</span>
          </button>
        </div>
      </div>

      <div className="nav-shell">
        <div className="container nav-inner">
          <nav className={`primary-nav ${mobileNavOpen ? 'primary-nav--open' : ''}`} aria-label="Primary navigation">
            {navigation.map((item) => <button className={activePath === item.path ? 'is-active' : ''} type="button" key={item.label} aria-current={activePath === item.path ? 'page' : undefined} onClick={() => onNavigate(item.path)}>{item.label}</button>)}
          </nav>
          <button className="nav-quote" type="button" onClick={onQuote}>Request a Quote <ArrowRight size={15} /></button>
        </div>
      </div>
      {mobileNavOpen && (
        <div className="mobile-search container">
          <SearchBar compact value={search} onChange={onSearchChange} onSubmit={onSearchSubmit} />
        </div>
      )}
    </header>
  );
}
