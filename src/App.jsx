import { useEffect, useMemo, useState } from 'react';
import { products } from './data/products.js';
import CartDrawer from './components/CartDrawer.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import QuoteModal from './components/QuoteModal.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';

function readRoute() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const segments = pathname.split('/').filter(Boolean);
  const params = new URLSearchParams(window.location.search);
  if (segments[0] === 'product' && segments[1]) return { kind: 'detail', slug: segments[1] };
  if (segments[0] === 'products') return { kind: 'products', query: params.get('search') || '', category: params.get('category') || '' };
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

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = filters.query.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : '/products');
  };

  return (
    <div className="app-shell">
      <Header search={filters.query} onSearchChange={(value) => updateFilter('query', value)} onSearchSubmit={handleSearchSubmit} onNavigate={navigate} cartCount={cartCount} cartOpen={cartOpen} onOpenCart={() => setCartOpen(true)} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((current) => !current)} mobileNavOpen={mobileNavOpen} onToggleMobileNav={() => setMobileNavOpen((current) => !current)} />
      {route.kind === 'home' && <HomePage onNavigate={navigate} onQuote={openQuote} onAddToCart={addToCart} onCompare={toggleCompare} compareIds={compareIds} />}
      {route.kind === 'products' && <ProductsPage filters={filters} onFilterChange={updateFilter} onResetFilters={resetFilters} onNavigate={navigate} onQuote={openQuote} onAddToCart={addToCart} onCompare={toggleCompare} compareIds={compareIds} mobileFiltersOpen={mobileFiltersOpen} onToggleMobileFilters={() => setMobileFiltersOpen((current) => !current)} onCloseMobileFilters={() => setMobileFiltersOpen(false)} />}
      {route.kind === 'detail' && <ProductDetailPage product={selectedProduct} onNavigate={navigate} onQuote={openQuote} onAddToCart={addToCart} />}
      <Footer onNavigate={navigate} onQuote={() => openQuote()} />
      <QuoteModal product={quoteProduct} open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      <CartDrawer open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} onChangeQuantity={changeQuantity} onRemove={removeFromCart} onQuote={() => openQuote()} />
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
