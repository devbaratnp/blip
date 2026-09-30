import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({ category, onClick }) {
  return (
    <button type="button" className="category-card" onClick={onClick}>
      <span className="category-card__image"><img src={category.image} alt="" /></span>
      <span className="category-card__copy">
        <strong>{category.name}</strong>
        <small>{category.description}</small>
      </span>
      <ArrowUpRight className="category-card__arrow" size={18} />
    </button>
  );
}
