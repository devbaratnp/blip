import { ArrowRight } from 'lucide-react';
import { categories } from '../data/categories.js';

export default function MegaMenu({ open, onNavigate }) {
  if (!open) return null;

  return (
    <div className="mega-menu" role="menu" aria-label="All product categories">
      <div className="mega-menu__intro">
        <span className="eyebrow">Explore BLI</span>
        <strong>Security products for every space.</strong>
        <button type="button" className="text-link" onClick={() => onNavigate('/products')}>
          View all products <ArrowRight size={15} />
        </button>
      </div>
      <div className="mega-menu__grid">
        {categories.map((category) => (
          <button
            className="mega-menu__item"
            key={category.id}
            type="button"
            role="menuitem"
            onClick={() => onNavigate(`/products?category=${encodeURIComponent(category.name)}`)}
          >
            <span>{category.name}</span>
            <small>{category.description}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
