import React, { useState } from 'react';
import { X, CheckCircle, MapPin, User, Phone } from 'lucide-react';
import { placeOrder } from '../../Data/mallStore';

const CheckoutModal = ({
  isOpen,
  onClose,
  cart = [],
  onOrderSuccess
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('Table No. 4 (Food Court)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Group items by retailer
  const itemsByRetailer = cart.reduce((acc, item) => {
    const retailerId = item.retailer_id || 'retailer-2';
    if (!acc[retailerId]) {
      acc[retailerId] = [];
    }
    acc[retailerId].push(item);
    return acc;
  }, {});

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMessage('Please provide your name for pickup identification.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMessage('Please provide a contact phone number for live order status SMS.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Create orders for each shop represented in the cart
      const placedOrders = [];

      for (const [retailerId, items] of Object.entries(itemsByRetailer)) {
        const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const orderData = {
          retailer_id: retailerId,
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          delivery_notes: deliveryNotes.trim(),
          total_price: subtotal,
          items: items.map(i => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            shop_name: i.shop_name
          }))
        };

        const createdOrder = await placeOrder(orderData);
        placedOrders.push(createdOrder);
      }

      setIsSubmitting(false);
      onClose();
      if (placedOrders.length > 0) {
        onOrderSuccess(placedOrders[0]);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMessage('Failed to place order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Instant Checkout</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: '600' }}>
              ✓ Friction-Free • No Account Required
            </span>
          </div>
          <button className="close-drawer-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="modal-body">
            {errorMessage && (
              <div style={{
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                color: '#fb7185',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.84rem',
                marginBottom: '16px'
              }}>
                {errorMessage}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                <User size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Your Full Name
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Marcus Vance"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Phone size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Phone Number (For Order Ready SMS)
              </label>
              <input
                type="tel"
                className="form-input"
                placeholder="e.g., +1 (555) 019-2834"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <MapPin size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Pickup Location or Table Note
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Table No. 4, Curbside Bay A, Counter Pickup"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                required
              />
            </div>

            {/* Quick Location Presets */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
              {[
                'Food Court Table 4',
                'Mall Counter Pickup',
                'Curbside Bay A',
                'Atrium Lounge Bench'
              ].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setDeliveryNotes(preset)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    background: deliveryNotes === preset ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid',
                    borderColor: deliveryNotes === preset ? 'var(--accent-gold)' : 'var(--border-subtle)',
                    color: deliveryNotes === preset ? 'var(--accent-gold-light)' : 'var(--text-secondary)'
                  }}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Order Summary Box */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block' }}>
                  Total Items: {cart.reduce((a, b) => a + b.quantity, 0)} ({Object.keys(itemsByRetailer).length} shop)
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Pay on pickup or digitally verified
                </span>
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Dispatching Order...</span>
              ) : (
                <>
                  <CheckCircle size={16} />
                  <span>Place Order Now • ${totalAmount.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
