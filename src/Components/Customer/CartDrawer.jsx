import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

const CartDrawer = ({
  isOpen,
  onClose,
  cart = [],
  onUpdateQty,
  onRemoveItem,
  onOpenCheckout
}) => {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>
            <ShoppingBag size={20} color="var(--accent-gold)" />
            <span>Your SingleCart</span>
          </h3>
          <button className="close-drawer-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {cart.length === 0 ? (
            <div className="empty-cart-view">
              <ShoppingBag size={48} strokeWidth={1.5} color="var(--text-muted)" />
              <h4>Your cart is empty</h4>
              <p>Explore our premier stores and drop signature items into your bag.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="cart-item-img"
                />

                <div className="cart-item-details">
                  <div>
                    <h5 className="cart-item-name">{item.name}</h5>
                    <span className="cart-item-shop">{item.shop_name}</span>
                  </div>

                  <div className="cart-item-qty-row">
                    <span style={{ fontWeight: '800', color: 'var(--text-primary)' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: '700', padding: '0 4px' }}>
                          {item.quantity}
                        </span>
                        <button
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        style={{ color: 'var(--text-muted)', padding: '4px', cursor: 'pointer' }}
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-total-row">
              <span className="drawer-total-label">Subtotal</span>
              <span className="drawer-total-val">${totalAmount.toFixed(2)}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
            >
              <span>Proceed to Instant Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
