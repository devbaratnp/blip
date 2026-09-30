import { describe, expect, test } from 'vitest';
import { filterProducts } from './catalog.js';
import { categories } from './categories.js';
import { products as catalogProducts } from './products.js';

const fixtureProducts = [
  { name: 'CP PLUS E39A 3MP Wi-Fi PT Camera', brand: 'CP PLUS', category: 'CCTV & Cameras', price: 4200 },
  { name: 'Agni Protection 8 Zone Fire Alarm Panel', brand: 'Agni', category: 'Fire Alarm Systems', price: 30000 },
  { name: 'Mantra mBio-G1 Time Attendance Device', brand: 'Mantra', category: 'Time Attendance', price: 9999 },
];

describe('filterProducts', () => {
  test('filters by query, category, brand, and upper price bound', () => {
    expect(filterProducts(fixtureProducts, {
      query: 'camera',
      category: 'CCTV & Cameras',
      brand: 'CP PLUS',
      maxPrice: 5000,
    })).toEqual([fixtureProducts[0]]);
  });

  test('returns the full catalog when all filters are empty', () => {
    expect(filterProducts(fixtureProducts, {})).toEqual(fixtureProducts);
  });

  test('matches a product model through the search query', () => {
    expect(filterProducts(fixtureProducts, { query: 'mBio-G1' })).toEqual([fixtureProducts[2]]);
  });
});

describe('BLI catalog data', () => {
  test('featured product records have the fields needed by commerce cards', () => {
    catalogProducts.slice(0, 5).forEach((product) => {
      expect(product.image).toBeTruthy();
      expect(product.price).toBeTypeOf('number');
      expect(product.brand).toBeTruthy();
      expect(product.model).toBeTruthy();
      expect(product.category).toBeTruthy();
    });
  });

  test('every solution category has at least one product record', () => {
    categories.forEach((category) => {
      expect(catalogProducts.some((product) => product.category === category.name)).toBe(true);
    });
  });
});
