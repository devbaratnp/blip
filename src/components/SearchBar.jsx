import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, onSubmit, compact = false }) {
  return (
    <form className={`search-bar ${compact ? 'search-bar--compact' : ''}`} onSubmit={onSubmit} role="search">
      <Search aria-hidden="true" size={19} strokeWidth={1.8} />
      <label className="sr-only" htmlFor={compact ? 'mobile-search' : 'site-search'}>Search products</label>
      <input
        id={compact ? 'mobile-search' : 'site-search'}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search cameras, fire alarm, access control..."
        type="search"
      />
      <button type="submit">Search</button>
    </form>
  );
}
