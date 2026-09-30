import { ArrowRight, Check, FileText, Heart } from 'lucide-react';
import { formatNpr } from '../data/products.js';

export default function ProductCard({ product, onNavigate, onAddToCart, onQuote, onCompare, compared }) {
  return (
    <article className="product-card">
      <div className="product-card__topline">
        <label className={`compare-control ${compared ? 'compare-control--active' : ''}`}>
          <input type="checkbox" checked={compared} onChange={() => onCompare(product.id)} />
          <span>{compared ? <Check size={12} /> : null}</span>
          Compare
        </label>
        <button className="icon-button" type="button" aria-label={`Save ${product.name} to wishlist`}><Heart size={17} /></button>
      </div>
      <button className="product-card__image" type="button" onClick={() => onNavigate(`/product/${product.slug}`)}>
        <img src={product.image} alt={product.imageAlt} />
        {product.badge && <span className="product-badge">{product.badge}</span>}
      </button>
      <div className="product-card__body">
        <span className="product-card__brand">{product.brand}</span>
        <button className="product-card__name" type="button" onClick={() => onNavigate(`/product/${product.slug}`)}>{product.name}</button>
        <span className="product-card__specs">{product.shortSpecs}</span>
        <div className="product-card__price-row">
          <strong>{formatNpr(product.price)}</strong>
          <span className={product.quoteOnly ? 'availability availability--quote' : 'availability'}><i />{product.availability}</span>
        </div>
        <div className="product-card__actions">
          {product.quoteOnly ? (
            <button type="button" className="button button--primary button--full" onClick={() => onQuote(product)}><FileText size={16} />{product.quoteLabel || 'Request quote'}</button>
          ) : (
            <button type="button" className="button button--primary button--full" onClick={() => onAddToCart(product)}><FileText size={16} />Inquiry now</button>
          )}
          <button type="button" className="button button--outline button--full" onClick={() => onQuote(product)}><FileText size={16} />Request quote</button>
        </div>
      </div>
      <button className="product-card__details" type="button" onClick={() => onNavigate(`/product/${product.slug}`)}>
        View details <ArrowRight size={14} />
      </button>
    </article>
  );
}
