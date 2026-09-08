import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, Truck, PackageCheck, Home } from 'lucide-react';
import { subscribeToOrders } from '../../Data/mallStore';

const STATUS_STEPS = [
  { key: 'Pending', label: 'Order Confirmed', icon: Clock, desc: 'Order received & queued at store' },
  { key: 'Preparing', label: 'Packaging', icon: PackageCheck, desc: 'Store is carefully packaging items' },
  { key: 'Ready', label: 'Out for Delivery', icon: Truck, desc: 'Courier is en route to your doorstep' },
  { key: 'Completed', label: 'Delivered', icon: CheckCircle, desc: 'Delivered to your doorstep. Enjoy!' }
];

const OrderTrackerModal = ({
  isOpen,
  onClose,
  initialOrder
}) => {
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    if (initialOrder) {
      setOrder(initialOrder);
    }
  }, [initialOrder]);

  useEffect(() => {
    if (!isOpen || !order) return;

    const unsubscribe = subscribeToOrders((update) => {
      // Check if update corresponds to this order
      if (update && (String(update.id) === String(order.id) || String(update.orderId) === String(order.id))) {
        const newStatus = update.status || update.newStatus;
        if (newStatus) {
          setOrder((prev) => ({ ...prev, status: newStatus }));
        }
      }
    }, order.retailer_id);

    return () => unsubscribe();
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const currentStatusIndex = STATUS_STEPS.findIndex((s) => s.key.toLowerCase() === (order.status || 'pending').toLowerCase());

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Live Delivery Tracker</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Ticket #{order.id} • Real-Time Courier Stream
            </span>
          </div>
          <button className="close-drawer-btn" onClick={onClose} aria-label="Close tracker">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="order-success-hero">
            <div className="order-success-icon">
              <CheckCircle size={32} />
            </div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '4px' }}>Order Placed Successfully!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Thank you, <strong>{order.customer_name}</strong>! Your items are being prepared for direct doorstep dispatch.
            </p>
          </div>

          {/* Stepper */}
          <div className="order-status-stepper">
            {STATUS_STEPS.map((step, idx) => {
              const isPassed = currentStatusIndex > idx;
              const isActive = currentStatusIndex === idx;
              const StepIcon = step.icon;

              return (
                <div
                  key={step.key}
                  className={`step-node ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                >
                  <div className="step-circle">
                    <StepIcon size={14} />
                  </div>
                  <span className="step-label">{step.label}</span>
                </div>
              );
            })}
          </div>

          {/* Current Status Banner */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '10px',
            padding: '14px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold-light)', fontWeight: '700' }}>
              Delivery Status
            </span>
            <h4 style={{ fontSize: '1.2rem', margin: '4px 0', color: 'var(--text-primary)' }}>
              {STATUS_STEPS[currentStatusIndex]?.label || order.status}
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {STATUS_STEPS[currentStatusIndex]?.desc || 'Awaiting store dispatch.'}
            </p>
          </div>

          {/* Doorstep Delivery Address Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <Home size={20} color="var(--accent-gold)" />
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                Doorstep Delivery Address
              </span>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                {order.delivery_notes}
              </strong>
            </div>
          </div>

          {/* Ordered items breakdown */}
          {order.items && order.items.length > 0 && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '12px',
              maxHeight: '140px',
              overflowY: 'auto'
            }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px', fontWeight: '700' }}>
                ORDER ITEMS ({order.items.length})
              </span>
              {order.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', padding: '3px 0' }}>
                  <span>{item.quantity}x {item.name}</span>
                  <span style={{ fontWeight: '600' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ justifyContent: 'center' }}>
          <button className="btn-primary" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
            Back to Digital Mall
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackerModal;
