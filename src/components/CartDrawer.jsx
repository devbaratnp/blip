import { ArrowRight, FileText, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { formatNpr } from '../data/products.js';

export default function CartDrawer({ open, cart, onClose, onChangeQuantity, onRemove, onQuote }) {
  if (!open) return null;
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);

  return (
    <div className="drawer-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="cart-drawer__head"><div><span className="eyebrow">Your selection</span><h2 id="cart-title">Quote cart <span>{cart.length}</span></h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Close quote cart"><X size={21} /></button></div>
        {cart.length === 0 ? (
          <div className="cart-empty"><ShoppingCart size={42} /><h3>Your quote cart is empty</h3><p>Add a product to keep your shortlist together before contacting BLI.</p><button className="button button--primary" type="button" onClick={onClose}>Browse products</button></div>
        ) : (
          <>
            <div className="cart-items">{cart.map(({ product, quantity }) => (
              <div className="cart-item" key={product.id}>
                <img src={product.image} alt="" />
                <div className="cart-item__copy"><strong>{product.name}</strong><span>{formatNpr(product.price)}</span><div className="quantity-stepper"><button type="button" onClick={() => onChangeQuantity(product.id, -1)} aria-label={`Decrease ${product.name}`}><Minus size={13} /></button><span>{quantity}</span><button type="button" onClick={() => onChangeQuantity(product.id, 1)} aria-label={`Increase ${product.name}`}><Plus size={13} /></button></div></div>
                <button className="icon-button icon-button--muted" type="button" onClick={() => onRemove(product.id)} aria-label={`Remove ${product.name}`}><Trash2 size={16} /></button>
              </div>
            ))}</div>
            <div className="cart-summary"><div><span>Product subtotal</span><strong>{formatNpr(subtotal)}</strong></div><p>Final pricing, delivery and installation can be confirmed by the BLI team.</p><button className="button button--primary button--full" type="button" onClick={onQuote}><FileText size={17} />Request a quote <ArrowRight size={16} /></button></div>
          </>
        )}
      </aside>
    </div>
  );
}
