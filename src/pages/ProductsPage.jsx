import { ArrowRight, ChevronRight, Filter, SearchX } from 'lucide-react';
import { products } from '../data/products.js';
import { filterProducts } from '../data/catalog.js';
import ProductCard from '../components/ProductCard.jsx';
import ProductFilters from '../components/ProductFilters.jsx';

export default function ProductsPage({ filters, onFilterChange, onResetFilters, onNavigate, onQuote, onAddToCart, onCompare, compareIds, mobileFiltersOpen, onToggleMobileFilters, onCloseMobileFilters }) {
  const visibleProducts = filterProducts(products, filters);

  return (
    <main className="catalog-page">
      <section className="catalog-hero"><div className="container"><div className="breadcrumbs"><button type="button" onClick={() => onNavigate('/')}>Home</button><ChevronRight size={14} /><span>Products</span></div><span className="eyebrow">A clear path to the right system</span><h1>Products that protect, connect and keep work moving.</h1><p>Explore cameras, fire alarm systems, access control, attendance, communication and networking products curated for homes, offices and businesses in Nepal.</p></div></section>
      <div className="container catalog-layout">
        <ProductFilters filters={filters} onChange={onFilterChange} onReset={onResetFilters} mobileOpen={mobileFiltersOpen} onCloseMobile={onCloseMobileFilters} />
        <section className="catalog-results" aria-live="polite">
          <div className="catalog-results__head"><div><span className="eyebrow">Browse catalogue</span><h2>{filters.category || 'All products'}</h2><p>{visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'} ready to explore</p></div><button className="button button--outline filter-toggle" type="button" onClick={onToggleMobileFilters}><Filter size={16} />Filters</button></div>
          {filters.query && <div className="active-filter"><span>Search: “{filters.query}”</span><button type="button" onClick={() => onFilterChange('query', '')}>Clear</button></div>}
          {visibleProducts.length > 0 ? <div className="product-grid product-grid--catalog">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} onAddToCart={onAddToCart} onQuote={onQuote} onCompare={onCompare} compared={compareIds.includes(product.id)} />)}</div> : <div className="empty-state"><SearchX size={38} /><span className="eyebrow">No exact matches</span><h2>Try a wider search</h2><p>Clear a filter or request guidance from the BLI team for a product match.</p><div><button className="button button--outline" type="button" onClick={onResetFilters}>Reset filters</button><button className="button button--primary" type="button" onClick={() => onQuote()}>Request guidance <ArrowRight size={16} /></button></div></div>}
        </section>
      </div>
    </main>
  );
}
