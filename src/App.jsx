import { useEffect, useMemo, useState } from 'react';
import { products } from './data/products.js';
import CartDrawer from './components/CartDrawer.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import QuoteModal from './components/QuoteModal.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CareersPage from './pages/CareersPage.jsx';
import CompanyPage from './pages/CompanyPage.jsx';
import HelpCenterPage from './pages/HelpCenterPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import DownloadPage from './pages/DownloadPage.jsx';
import DealerPage from './pages/DealerPage.jsx';
import AdminApp from './admin/AdminApp.jsx';

function readRoute() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const segments = pathname.split('/').filter(Boolean);
  const params = new URLSearchParams(window.location.search);
  if (segments[0] === 'admin') return { kind: 'admin', path: pathname };
  if (segments[0] === 'product' && segments[1]) return { kind: 'detail', slug: segments[1] };
  if (segments[0] === 'products') return { kind: 'products', query: params.get('search') || '', category: params.get('category') || '' };
  if (segments[0] === 'about') return { kind: 'about' };
  if (segments[0] === 'company') return { kind: 'company' };
  if (segments[0] === 'contact') return { kind: 'contact' };
  if (segments[0] === 'career' || segments[0] === 'careers') return { kind: 'careers' };
  if (segments[0] === 'help' || segments[0] === 'help-center') return { kind: 'help' };
  if (segments[0] === 'services') return { kind: 'services' };
  if (segments[0] === 'download') return { kind: 'download' };
  if (segments[0] === 'become-a-dealer' || segments[0] === 'dealer') return { kind: 'dealer' };
  return { kind: 'home' };
}

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const [filters, setFilters] = useState({ query: '', category: '', brand: '', maxPrice: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [compareIds, setCompareIds] = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const handlePopState = () => setRoute(readRoute());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (route.kind !== 'products') return;
    setFilters((current) => ({ ...current, query: route.query, category: route.category }));
  }, [route]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(readRoute());
    setMenuOpen(false);
    setMobileNavOpen(false);
    setMobileFiltersOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProduct = useMemo(() => {
    if (route.kind !== 'detail') return null;
    return products.find((product) => product.slug === route.slug) || null;
  }, [route]);

  const updateFilter = (field, value) => setFilters((current) => ({ ...current, [field]: value }));
  const resetFilters = () => setFilters({ query: '', category: '', brand: '', maxPrice: '' });

  const addToCart = (product) => {
    if (product.quoteOnly) { openQuote(product); return; }
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) return current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { product, quantity: 1 }];
    });
    setToast(`${product.name} added to your quote cart`);
  };

  const changeQuantity = (productId, delta) => setCart((current) => current.map((item) => item.product.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const removeFromCart = (productId) => setCart((current) => current.filter((item) => item.product.id !== productId));
  const openQuote = (product = null) => { setQuoteProduct(product); setQuoteOpen(true); setCartOpen(false); };
  const toggleCompare = (id) => setCompareIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activePath = route.kind === 'products' ? '/products' : route.kind === 'about' ? '/about' : route.kind === 'company' ? '/about' : route.kind === 'contact' ? '/contact' : route.kind === 'careers' ? '/careers' : '/';

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = filters.query.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : '/products');
  };

  if (route.kind === 'admin') {
    return <div className="app-shell"><AdminApp path={route.path} onNavigate={navigate} /></div>;
  }

  return (
    <div className="app-shell">
      <Header activePath={activePath} search={filters.query} onSearchChange={(value) => updateFilter('query', value)} onSearchSubmit={handleSearchSubmit} onNavigate={navigate} onQuote={() => openQuote()} cartCount={cartCount} cartOpen={cartOpen} onOpenCart={() => setCartOpen(true)} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((current) => !current)} mobileNavOpen={mobileNavOpen} onToggleMobileNav={() => setMobileNavOpen((current) => !current)} />
      {route.kind === 'home' && <HomePage onNavigate={navigate} onQuote={openQuote} onAddToCart={addToCart} onCompare={toggleCompare} compareIds={compareIds} />}
      {route.kind === 'products' && <ProductsPage filters={filters} onFilterChange={updateFilter} onResetFilters={resetFilters} onNavigate={navigate} onQuote={openQuote} onAddToCart={addToCart} onCompare={toggleCompare} compareIds={compareIds} mobileFiltersOpen={mobileFiltersOpen} onToggleMobileFilters={() => setMobileFiltersOpen((current) => !current)} onCloseMobileFilters={() => setMobileFiltersOpen(false)} />}
      {route.kind === 'detail' && <ProductDetailPage product={selectedProduct} onNavigate={navigate} onQuote={openQuote} onAddToCart={addToCart} />}
      {route.kind === 'about' && <AboutPage onNavigate={navigate} onQuote={openQuote} />}
      {route.kind === 'company' && <CompanyPage onNavigate={navigate} onQuote={openQuote} />}
      {route.kind === 'contact' && <ContactPage onNavigate={navigate} />}
      {route.kind === 'careers' && <CareersPage onNavigate={navigate} />}
      {route.kind === 'help' && <HelpCenterPage onNavigate={navigate} />}
      {route.kind === 'services' && <ServicesPage onNavigate={navigate} onQuote={openQuote} />}
      {route.kind === 'download' && <DownloadPage onNavigate={navigate} />}
      {route.kind === 'dealer' && <DealerPage onNavigate={navigate} />}
      <Footer onNavigate={navigate} onQuote={() => openQuote()} />
      <QuoteModal product={quoteProduct} open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <CartDrawer open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} onChangeQuantity={changeQuantity} onRemove={removeFromCart} onQuote={() => openQuote()} />
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
