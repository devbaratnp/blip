import { products } from '../data/products.js';
import { site } from '../data/site.js';

export const fallbackSettings = {
  phoneDisplay: site.phoneDisplay,
  phoneHref: site.phoneHref,
  email: site.email,
  address: site.address,
  officeHours: site.hours,
  facebookUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
};

export const fallbackContent = {
  settings: fallbackSettings,
  products,
};
