export function filterProducts(products, filters = {}) {
  const query = filters.query?.trim().toLowerCase() ?? '';

  return products.filter((product) => {
    const searchableText = [product.name, product.brand, product.model, product.category]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return (!query || searchableText.includes(query))
      && (!filters.category || product.category === filters.category)
      && (!filters.brand || product.brand === filters.brand)
      && (!filters.maxPrice || product.price <= filters.maxPrice);
  });
}
