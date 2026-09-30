export default function BrandStrip({ brands }) {
  return (
    <div className="brand-strip" aria-label="Brands available at BLI">
      {brands.map((brand, index) => (
        <div className={`brand-mark brand-mark--${index + 1}`} key={brand}>
          <span className="brand-mark__symbol">{brand === 'CP PLUS' ? '×' : brand.slice(0, 1)}</span>
          <strong>{brand}</strong>
        </div>
      ))}
    </div>
  );
}
