import { Heart, Menu, ShoppingCart, UserRound, X } from 'lucide-react';
import { site } from '../data/site.js';
import MegaMenu from './MegaMenu.jsx';
import SearchBar from './SearchBar.jsx';

export default function Header({
  search,
  onSearchChange,
  onSearchSubmit,
  onNavigate,
  cartCount,
  cartOpen,
  onOpenCart,
  menuOpen,
  onToggleMenu,
  mobileNavOpen,
  onToggleMobileNav,
}) {
  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <span>Trusted security and communication solutions across Nepal</span>
          <a href={`tel:${site.phone}`}>Need help? Call {site.phoneDisplay}</a>
        </div>
      </div>

      <div className="container header-main">
        <button className="mobile-menu-toggle" type="button" onClick={onToggleMobileNav} aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileNavOpen}>
          {mobileNavOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
        <button className="brand-lockup" type="button" onClick={() => onNavigate('/')} aria-label="BLI home">
          <img src="/assets/logo.jpg" alt="BLI" />
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
          <div className="category-trigger-wrap">
            <button className="category-trigger" type="button" onClick={onToggleMenu} aria-expanded={menuOpen}>
              <Menu size={18} />
              <span>All Categories</span>
              <span className="category-trigger__chevron">⌄</span>
            </button>
            <MegaMenu open={menuOpen} onNavigate={onNavigate} />
          </div>
          <nav className={`primary-nav ${mobileNavOpen ? 'primary-nav--open' : ''}`} aria-label="Primary navigation">
            {site.navigation.map((item) => (
              <button key={item} type="button" onClick={() => onNavigate(`/products?category=${encodeURIComponent(item)}`)}>{item}</button>
            ))}
            <button type="button" className="primary-nav__offer" onClick={() => onNavigate('/products')}>Offers</button>
          </nav>
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
