import React, { useState } from 'react';
import { X, Download, ShieldCheck, Truck, Check, AlertCircle, ShoppingBag } from 'lucide-react';

const OrderReceiptModal = ({
  isOpen,
  onClose,
  order,
  onTrackOrder
}) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen || !order) return null;

  // Generate a high-resolution branded receipt image using HTML5 Canvas
  const handleSaveToGallery = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 760;

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Top Golden Stripe
    const gradient = ctx.createLinearGradient(0, 0, 600, 0);
    gradient.addColorStop(0, '#f59e0b');
    gradient.addColorStop(0.5, '#fbbf24');
    gradient.addColorStop(1, '#f59e0b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 8);

    // Border
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

    // Brand Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SingleCart • Digital Mall', 300, 60);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText('Official Doorstep Order & Verification Receipt', 300, 85);

    // Divider
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 105);
    ctx.lineTo(560, 105);
    ctx.stroke();

    // Ticket # & Date
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(`TICKET #${order.id}`, 40, 140);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(new Date(order.created_at || Date.now()).toLocaleDateString(), 560, 140);

    // Customer & Address Info
    ctx.textAlign = 'left';
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('DELIVERY RECIPIENT', 40, 175);

    ctx.fillStyle = '#ffffff';
    ctx.font = '15px sans-serif';
    ctx.fillText(`Name: ${order.customer_name || 'Customer'}`, 40, 202);
    ctx.fillText(`Phone: ${order.customer_phone || 'N/A'}`, 40, 226);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    const address = `Address: ${order.delivery_notes || 'Doorstep Delivery'}`;
    ctx.fillText(address.slice(0, 65), 40, 250);

    // Divider
    ctx.beginPath();
    ctx.moveTo(40, 275);
    ctx.lineTo(560, 275);
    ctx.stroke();

    // Items Breakdown
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('ORDER ITEMS', 40, 305);

    let y = 332;
    const items = order.items || [];
    items.slice(0, 3).forEach((item) => {
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${item.quantity}x ${item.name}`, 40, y);
      ctx.textAlign = 'right';
      ctx.fillText(`$${(item.price * item.quantity).toFixed(2)}`, 560, y);
      y += 24;
    });
    if (items.length > 3) {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'italic 13px sans-serif';
      ctx.fillText(`+ ${items.length - 3} more item(s)...`, 40, y);
      y += 22;
    }

    // Cash Total Due Box
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(40, y + 8, 520, 48);
    ctx.strokeStyle = '#475569';
    ctx.strokeRect(40, y + 8, 520, 48);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('TOTAL CASH DUE AT DOORSTEP:', 56, y + 38);

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`$${Number(order.total_price).toFixed(2)}`, 544, y + 38);

    // Golden PIN Verification Box
    y += 75;
    ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
    ctx.fillRect(40, y, 520, 100);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, y, 520, 100);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('🔐 DOORSTEP AUTHENTICITY PIN', 300, y + 26);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px monospace';
    ctx.fillText(order.delivery_otp || '----', 300, y + 68);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText('Enter this PIN upon parcel handover to confirm payment & authenticity', 300, y + 88);

    // Mandatory Warning Note
    y += 125;
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚠️ IMPORTANT CUSTOMER INSTRUCTION:', 300, y);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '12px sans-serif';
    ctx.fillText('The best option is to save this receipt to your gallery or remember the PIN,', 300, y + 20);
    ctx.fillText('because without this PIN you cannot receive your order.', 300, y + 38);

    // Export to png and trigger download
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `SingleCart_Receipt_${order.id}.png`;
      link.href = dataUrl;
      link.click();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3500);
    } catch (e) {
      console.error('Receipt download error:', e);
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
        {/* COMPACT RECEIPT HEADER */}
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
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0, color: '#ffffff' }}>
                Order Receipt
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Ticket #{order.id} • Cash on Delivery
              </span>
            </div>
          </div>
          <button
            className="close-drawer-btn"
            onClick={onClose}
            aria-label="Close receipt"
            style={{ color: '#94a3b8' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* SINGLE-SCREEN COMPACT BODY */}
        <div style={{ padding: '16px 18px', background: 'var(--bg-surface)' }}>
          {/* TOP SUMMARY ROW */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            fontSize: '0.84rem'
          }}>
            <span style={{ color: 'var(--text-muted)' }}>
              Recipient: <strong style={{ color: 'var(--text-primary)' }}>{order.customer_name}</strong>
            </span>
            <span style={{
              fontSize: '0.74rem',
              background: 'rgba(16, 185, 129, 0.1)',
              color: 'var(--accent-emerald)',
              fontWeight: '700',
              padding: '2px 8px',
              borderRadius: '9999px'
            }}>
              Order Placed
            </span>
          </div>

          {/* TOTAL & ITEMS QUICK BAR */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>
                Items ({order.items?.reduce((a, b) => a + b.quantity, 0) || 1}): {order.items?.map(i => `${i.quantity}x ${i.name}`).slice(0, 2).join(', ')}
                {order.items?.length > 2 ? '...' : ''}
              </span>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Cash to pay upon doorstep arrival
              </span>
            </div>
            <strong style={{ fontSize: '1.25rem', color: 'var(--accent-emerald)', fontWeight: '800' }}>
              ${Number(order.total_price).toFixed(2)}
            </strong>
          </div>

          {/* PROMINENT GOLDEN PIN VERIFICATION BOX */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(245, 158, 11, 0.04))',
            border: '1.5px dashed var(--accent-gold)',
            borderRadius: '12px',
            padding: '12px 14px',
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <ShieldCheck size={16} color="var(--accent-gold-light)" />
              <span style={{
                fontSize: '0.74rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--accent-gold-light)'
              }}>
                Doorstep Verification PIN
              </span>
            </div>

            <div style={{
              fontSize: '2rem',
              fontWeight: '900',
              fontFamily: 'monospace',
              letterSpacing: '0.25em',
              color: '#fbbf24',
              margin: '2px 0'
            }}>
              {order.delivery_otp || '----'}
            </div>

            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
              You will enter this PIN on your phone when the courier delivers your items
            </span>
          </div>

          {/* SAVE RECEIPT TO GALLERY BUTTON */}
          <button
            type="button"
            onClick={handleSaveToGallery}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '10px',
              background: downloaded ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.12)',
              border: '1px solid',
              borderColor: downloaded ? 'var(--accent-emerald)' : 'var(--accent-gold)',
              color: downloaded ? 'var(--accent-emerald)' : 'var(--accent-gold-light)',
              fontWeight: '700',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              marginBottom: '12px',
              transition: 'all 0.2s ease'
            }}
          >
            {downloaded ? (
              <>
                <Check size={16} />
                <span>Saved to Gallery / Downloads!</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>Save Receipt to Gallery / Photos</span>
              </>
            )}
          </button>

          {/* MANDATORY WARNING NOTE AT END */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '10px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            marginBottom: '14px'
          }}>
            <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: 1.45,
              fontWeight: '500'
            }}>
              <strong style={{ color: '#ef4444' }}>Important Note:</strong> The best option is to save this receipt to your gallery or remember the PIN on your own, because without this PIN you cannot receive your order.
            </p>
          </div>

          {/* ACTIONS: TRACK LIVE PARCEL & BACK TO MALL */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              style={{ flex: 1, justifyContent: 'center', fontSize: '0.84rem', padding: '9px 12px' }}
            >
              Back to Mall
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                onClose();
                if (onTrackOrder) onTrackOrder(order);
              }}
              style={{ flex: 1.3, justifyContent: 'center', fontSize: '0.84rem', padding: '9px 12px' }}
            >
              <Truck size={15} />
              <span>Track Live Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReceiptModal;
