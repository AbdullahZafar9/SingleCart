import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  Clock,
  Truck,
  PackageCheck,
  Home,
  ShieldCheck,
  Search,
  RotateCcw
} from 'lucide-react';
import {
  subscribeToOrders,
  findOrderByIdOrPhone,
  confirmOrderDeliveryWithPin
} from '../../Data/mallStore';

const STATUS_STEPS = [
  { key: 'Pending', label: 'Confirmed', icon: Clock, desc: 'Order received & queued at store' },
  { key: 'Preparing', label: 'Packaging', icon: PackageCheck, desc: 'Store is packaging items' },
  { key: 'Ready', label: 'In Delivery', icon: Truck, desc: 'Courier en route to doorstep' },
  { key: 'Completed', label: 'Delivered', icon: CheckCircle, desc: 'Verified & delivered. Enjoy!' }
];

const OrderTrackerModal = ({
  isOpen,
  onClose,
  initialOrder = null,
  requireLookup = false
}) => {
  // If requireLookup is true (e.g. from navbar), start with null so it always asks for the ID
  const [order, setOrder] = useState(requireLookup ? null : (initialOrder || null));
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [inputPin, setInputPin] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [pinError, setPinError] = useState('');
  const [isSuccessAnim, setIsSuccessAnim] = useState(false);

  useEffect(() => {
    if (requireLookup) {
      setOrder(null);
    } else if (initialOrder) {
      setOrder(initialOrder);
    }
  }, [initialOrder, requireLookup, isOpen]);

  // Real-time subscription to order status updates
  useEffect(() => {
    if (!isOpen || !order) return;

    const unsubscribe = subscribeToOrders((update) => {
      if (update && (String(update.id) === String(order.id) || String(update.orderId) === String(order.id))) {
        const newStatus = update.status || update.newStatus;
        if (newStatus) {
          setOrder((prev) => (prev ? { ...prev, status: newStatus } : prev));
        }
      }
    }, order.retailer_id);

    return () => unsubscribe();
  }, [isOpen, order]);

  if (!isOpen) return null;

  const currentStatusIndex = order
    ? STATUS_STEPS.findIndex((s) => s.key.toLowerCase() === (order.status || 'pending').toLowerCase())
    : -1;

  // Handle Search / Lookup by Order Ticket ID or Phone
  const handleSearchOrder = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError('');

    try {
      const found = await findOrderByIdOrPhone(searchQuery.trim());
      if (found) {
        setOrder(found);
        setSearchQuery('');
      } else {
        setSearchError('No active parcel found with that Ticket ID or phone number. Please check your receipt.');
      }
    } catch (err) {
      setSearchError('Error looking up order. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Doorstep PIN verification by customer
  const handleVerifyPin = async (e) => {
    e.preventDefault();
    if (!order || !inputPin.trim()) return;

    setIsVerifying(true);
    setPinError('');

    try {
      const res = await confirmOrderDeliveryWithPin(order.id, inputPin.trim());
      if (res.success && res.order) {
        setOrder(res.order);
        setInputPin('');
        setIsSuccessAnim(true);
        setTimeout(() => setIsSuccessAnim(false), 2500);
      } else {
        setPinError(res.message || 'Invalid PIN. Please enter the 4-digit code shown on your receipt.');
      }
    } catch (err) {
      setPinError('Failed to confirm delivery. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '480px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* COMPACT MODAL HEADER */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          padding: '14px 18px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-gold)'
            }}>
              <Truck size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0, color: '#ffffff' }}>
                Live Parcel Tracker
              </h3>
              <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                {order ? `Ticket #${order.id} • Real-Time Trace` : 'Enter Ticket ID to View Live Stream'}
              </span>
            </div>
          </div>
          <button
            className="close-drawer-btn"
            onClick={onClose}
            aria-label="Close tracker"
            style={{ color: '#94a3b8' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* MODAL BODY (COMPACT SINGLE-SCREEN FIT) */}
        <div style={{ padding: '16px 18px', background: 'var(--bg-surface)' }}>
          {/* 1. LOOKUP SCREEN: ASKS FOR TICKET ID FIRST */}
          {!order ? (
            <div style={{ padding: '14px 4px 6px', textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                color: 'var(--accent-gold)'
              }}>
                <Search size={22} />
              </div>

              <h4 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '6px' }}>
                Enter Your Order Ticket ID
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '340px', margin: '0 auto 18px', lineHeight: 1.45 }}>
                Please enter the <strong>Ticket ID</strong> from your order receipt (e.g., <strong>9845</strong>) or phone number to trace your parcel.
              </p>

              <form onSubmit={handleSearchOrder} style={{ maxWidth: '360px', margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter Ticket # (e.g. 9845)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      flex: 1,
                      fontSize: '0.92rem',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: '700'
                    }}
                    autoFocus
                    required
                  />
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSearching}
                    style={{ padding: '0 18px', fontSize: '0.86rem' }}
                  >
                    {isSearching ? 'Checking...' : 'Trace'}
                  </button>
                </div>
                {searchError && (
                  <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '10px', textAlign: 'center', lineHeight: 1.4 }}>
                    {searchError}
                  </p>
                )}
              </form>
            </div>
          ) : (
            /* 2. COMPACT TRACE VIEW ONCE TICKET ID IS ENTERED */
            <>
              {/* STATUS & TICKET HEADER ROW */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Tracking Parcel
                  </span>
                  <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-primary)' }}>
                    Ticket #{order.id}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Due at Doorstep:</span>
                  <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--accent-emerald)' }}>
                    ${Number(order.total_price).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* COMPACT PROGRESS STEPPER */}
              <div className="order-status-stepper" style={{ margin: '8px 0 14px' }}>
                {STATUS_STEPS.map((step, idx) => {
                  const isPassed = currentStatusIndex > idx;
                  const isActive = currentStatusIndex === idx;
                  const StepIcon = step.icon;

                  return (
                    <div
                      key={step.key}
                      className={`step-node ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                    >
                      <div className="step-circle" style={{ width: '28px', height: '28px' }}>
                        <StepIcon size={13} />
                      </div>
                      <span className="step-label" style={{ fontSize: '0.7rem' }}>{step.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* CURRENT STATUS HIGHLIGHT CARD */}
              <div style={{
                background: order.status === 'Completed'
                  ? 'rgba(16, 185, 129, 0.1)'
                  : 'rgba(245, 158, 11, 0.08)',
                border: '1px solid',
                borderColor: order.status === 'Completed'
                  ? 'rgba(16, 185, 129, 0.3)'
                  : 'rgba(245, 158, 11, 0.25)',
                borderRadius: '10px',
                padding: '10px 14px',
                textAlign: 'center',
                marginBottom: '12px'
              }}>
                <span style={{
                  fontSize: '0.68rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: order.status === 'Completed' ? 'var(--accent-emerald)' : 'var(--accent-gold-light)',
                  fontWeight: '700'
                }}>
                  Current Status
                </span>
                <h4 style={{ fontSize: '1.05rem', margin: '2px 0', color: 'var(--text-primary)' }}>
                  {STATUS_STEPS[currentStatusIndex]?.label || order.status}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {STATUS_STEPS[currentStatusIndex]?.desc || 'Awaiting store dispatch.'}
                </p>
              </div>

              {/* DOORSTEP PIN VERIFICATION FORM (Active when Ready / In Delivery) */}
              {order.status === 'Ready' && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(5, 150, 105, 0.04))',
                  border: '1.5px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  marginBottom: '12px',
                  animation: 'fadeIn 0.25s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <ShieldCheck size={16} color="var(--accent-emerald)" />
                    <strong style={{ fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                      Courier Arrived at Your Doorstep!
                    </strong>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '10px', lineHeight: 1.4 }}>
                    Hand over <strong>${Number(order.total_price).toFixed(2)} cash</strong>, and enter your 4-digit Receipt PIN below to confirm delivery:
                  </p>

                  {pinError && (
                    <div style={{
                      background: '#fee2e2',
                      color: '#b91c1c',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      marginBottom: '8px'
                    }}>
                      {pinError}
                    </div>
                  )}

                  <form onSubmit={handleVerifyPin} style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="4-digit PIN"
                      value={inputPin}
                      onChange={(e) => {
                        setInputPin(e.target.value.replace(/\D/g, ''));
                        setPinError('');
                      }}
                      style={{
                        width: '115px',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-main)',
                        color: 'var(--text-primary)',
                        fontSize: '1.15rem',
                        letterSpacing: '0.2em',
                        fontWeight: '800',
                        textAlign: 'center'
                      }}
                      required
                    />
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={isVerifying || inputPin.length < 4}
                      style={{ flex: 1, justifyContent: 'center', fontSize: '0.82rem', padding: '8px 12px' }}
                    >
                      {isVerifying ? 'Verifying...' : `Confirm Received & Paid`}
                    </button>
                  </form>
                </div>
              )}

              {/* COMPLETED CELEBRATION BADGE */}
              {order.status === 'Completed' && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '10px',
                  padding: '12px',
                  textAlign: 'center',
                  marginBottom: '12px',
                  transform: isSuccessAnim ? 'scale(1.02)' : 'scale(1)',
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)', fontWeight: '700', fontSize: '0.88rem' }}>
                    <CheckCircle size={16} />
                    <span>Parcel Verified & Cash Paid Successfully!</span>
                  </div>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px', margin: 0 }}>
                    ${Number(order.total_price).toFixed(2)} cash accounted. Enjoy your purchase!
                  </p>
                </div>
              )}

              {/* COMPACT DELIVERY DETAILS */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                fontSize: '0.78rem'
              }}>
                <Home size={16} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>
                    Deliver to: {order.customer_name} ({order.customer_phone})
                  </span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '600', wordBreak: 'break-word' }}>
                    {order.delivery_notes}
                  </span>
                </div>
              </div>

              {/* TRACK ANOTHER ORDER SWITCH */}
              <div style={{ textAlign: 'center', marginBottom: '4px' }}>
                <button
                  type="button"
                  onClick={() => setOrder(null)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RotateCcw size={11} />
                  <span>Track another ticket ID</span>
                </button>
              </div>
            </>
          )}

          {/* CLOSE / BACK BUTTON */}
          <div style={{ marginTop: '12px' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={onClose}
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.84rem', padding: '9px 14px' }}
            >
              Back to Digital Mall
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackerModal;
