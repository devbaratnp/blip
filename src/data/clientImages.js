export const clientImages = [
  '1734503711.jpg',
  '1734526755.jpg',
  '1734572109.jpg',
  '1734572181.png',
  '1734572289.jpg',
  '1734938493.jpg',
  '1734938609.jpg',
  '1734938692.jpg',
  '1734939733.png',
  '1734939860.jpg',
  '1734942059.png',
  '1734942087.png',
  '1734954110.gif',
].map((filename, index) => ({
  filename,
  alt: `BLI client logo ${String(index + 1).padStart(2, '0')}`,
}));
