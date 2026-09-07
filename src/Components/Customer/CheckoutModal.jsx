import React, { useState } from 'react';
import { X, CheckCircle, User, Phone, Home, Truck } from 'lucide-react';
import { placeOrder } from '../../Data/mallStore';

const CheckoutModal = ({
  isOpen,
  onClose,
  cart = [],
  onOrderSuccess
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('Home (Leave at Front Door)');
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
      setErrorMessage('Please provide your full name for doorstep delivery.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMessage('Please provide a contact phone number for delivery updates SMS.');
      return;
    }
    if (!deliveryNotes.trim()) {
      setErrorMessage('Please provide your doorstep delivery address.');
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
            quantity: i.quantity
          }))
        };

        const newOrder = await placeOrder(orderData);
        placedOrders.push(newOrder);
      }

      setIsSubmitting(false);
      onClose();

      // Notify parent to open OrderTracker for the first created order
      if (placedOrders.length > 0 && onOrderSuccess) {
        onOrderSuccess(placedOrders[0]);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMessage('Could not process orders. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Express Doorstep Checkout</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Online payment & direct delivery from {Object.keys(itemsByRetailer).length} boutique{Object.keys(itemsByRetailer).length > 1 ? 's' : ''}
            </span>
          </div>
          <button className="close-drawer-btn" onClick={onClose} aria-label="Close checkout">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="modal-body">
            {errorMessage && (
              <div style={{
                background: '#fee2e2',
                color: '#b91c1c',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                marginBottom: '16px'
              }}>
                {errorMessage}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                <User size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Recipient Full Name
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
                Phone Number (For Courier SMS Updates)
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
                <Home size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Doorstep Delivery Address
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., 742 Evergreen Terrace, Apt 4B, Springfield"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                required
              />
            </div>

            {/* Quick Location Presets */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
              {[
                'Home (Leave at Front Door)',
                'Apartment / Reception Lobby',
                'Office / Work Desk',
                'Hand Delivery to Recipient'
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
                  Total Items: {cart.reduce((a, b) => a + b.quantity, 0)} ({Object.keys(itemsByRetailer).length} boutique{Object.keys(itemsByRetailer).length > 1 ? 's' : ''})
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                  <Truck size={12} />
                  Free Tracked Doorstep Delivery Included
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
