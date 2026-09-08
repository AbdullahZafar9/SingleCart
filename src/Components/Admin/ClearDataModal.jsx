import React, { useState, useEffect, useMemo } from 'react';
import { AlertTriangle, Trash2, Calendar, Lock, X, CheckCircle2 } from 'lucide-react';
import { deleteOrdersByDateRange } from '../../Data/mallStore';

const ClearDataModal = ({ isOpen, onClose, orders = [], onDataCleared }) => {
  const [clearScope, setClearScope] = useState('today'); // 'today' | 'range'
  const todayStr = new Date().toISOString().split('T')[0];
  const [fromDate, setFromDate] = useState(todayStr);
  const [toDate, setToDate] = useState(todayStr);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setClearScope('today');
      setFromDate(todayStr);
      setToDate(todayStr);
      setAdminPassword('');
      setPasswordError('');
      setFeedback(null);
      setIsDeleting(false);
    }
  }, [isOpen, todayStr]);

  // Calculate matching date range
  const { startDateTime, endDateTime } = useMemo(() => {
    if (clearScope === 'today') {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      return { startDateTime: start, endDateTime: end };
    } else {
      const start = fromDate ? new Date(`${fromDate}T00:00:00`) : new Date(0);
      const end = toDate ? new Date(`${toDate}T23:59:59.999`) : new Date();
      return { startDateTime: start, endDateTime: end };
    }
  }, [clearScope, fromDate, toDate]);

  // Calculate live preview of orders that will be affected
  const impactSummary = useMemo(() => {
    const startMs = startDateTime.getTime();
    const endMs = endDateTime.getTime();

    let count = 0;
    let revenue = 0;

    orders.forEach((o) => {
      const t = new Date(o.created_at).getTime();
      if (t >= startMs && t <= endMs) {
        count += 1;
        if (o.status === 'Completed') {
          revenue += Number(o.total_price) || 0;
        }
      }
    });

    return { count, revenue };
  }, [orders, startDateTime, endDateTime]);

  if (!isOpen) return null;

  const handleConfirmPurge = async (e) => {
    e.preventDefault();
    const cleanPass = adminPassword.trim();

    if (cleanPass !== 'qazi@123' && cleanPass !== 'admin123') {
      setPasswordError('Authorization failed: Incorrect administrator password.');
      return;
    }

    if (impactSummary.count === 0) {
      setPasswordError('No orders found matching the selected timeframe to delete.');
      return;
    }

    setIsDeleting(true);
    setPasswordError('');

    try {
      const res = await deleteOrdersByDateRange(startDateTime, endDateTime);
      setFeedback({
        type: 'success',
        message: `Successfully purged ${res.deletedCount} order(s) totaling $${res.deletedRevenue.toFixed(2)}.`
      });

      setTimeout(() => {
        if (onDataCleared) onDataCleared(res);
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Error clearing data:', err);
      setPasswordError('An error occurred while clearing data. Please try again.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog clear-data-dialog"
        style={{ maxWidth: '520px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444'
              }}
            >
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.18rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Purge & Clear Order History
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Irreversible operational mall maintenance
              </span>
            </div>
          </div>
          <button className="close-drawer-btn" onClick={onClose} disabled={isDeleting}>
            <X size={18} />
          </button>
        </div>

        {feedback && (
          <div
            style={{
              margin: '16px 20px 0',
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.88rem',
              fontWeight: '600'
            }}
          >
            <CheckCircle2 size={18} />
            <span>{feedback.message}</span>
          </div>
        )}

        <form onSubmit={handleConfirmPurge}>
          <div className="modal-body" style={{ padding: '20px' }}>
            {/* Scope Selection */}
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label" style={{ fontWeight: '700' }}>
                Select Clear Scope
              </label>
              <div className="scope-buttons-grid">
                <button
                  type="button"
                  onClick={() => setClearScope('today')}
                  className={`scope-select-btn ${clearScope === 'today' ? 'active' : ''}`}
                >
                  <span className="scope-title">Current Day Only</span>
                  <span className="scope-sub">Today ({todayStr})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setClearScope('range')}
                  className={`scope-select-btn ${clearScope === 'range' ? 'active' : ''}`}
                >
                  <span className="scope-title">Custom Date Range</span>
                  <span className="scope-sub">Choose From & To dates</span>
                </button>
              </div>
            </div>

            {/* Date Pickers for Custom Range */}
            {clearScope === 'range' && (
              <div className="custom-range-card">
                <div>
                  <label className="form-label" style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    From Date
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    To Date
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Live Impact Preview Card */}
            <div className="impact-preview-card">
              <div className="impact-preview-header">
                <strong className="impact-title">Impact Preview</strong>
                <span className="impact-count-badge">
                  {impactSummary.count} order(s) selected
                </span>
              </div>
              <p className="impact-desc">
                {impactSummary.count > 0 ? (
                  <>
                    This action will permanently delete <strong>{impactSummary.count} order(s)</strong> totaling{' '}
                    <strong className="impact-price-highlight">${impactSummary.revenue.toFixed(2)}</strong> from mall records. This action cannot be reversed.
                  </>
                ) : (
                  <>No registered orders match this timeframe. Nothing will be removed.</>
                )}
              </p>
            </div>

            {/* Error Message */}
            {passwordError && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.84rem',
                  marginBottom: '16px'
                }}
              >
                {passwordError}
              </div>
            )}

            {/* Password Input */}
            <div className="form-group">
              <label className="form-label">
                <Lock size={13} style={{ display: 'inline', marginRight: '6px' }} />
                Administrator Password to Authorize
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your admin password"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  if (passwordError) setPasswordError('');
                }}
                required
                autoFocus
              />
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                Confirmation requires verified executive authentication.
              </span>
            </div>
          </div>

          <div className="modal-footer" style={{ padding: '16px 20px' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isDeleting || impactSummary.count === 0 || !adminPassword.trim()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#dc2626',
                color: '#ffffff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: '700',
                cursor: isDeleting || impactSummary.count === 0 || !adminPassword.trim() ? 'not-allowed' : 'pointer',
                opacity: isDeleting || impactSummary.count === 0 || !adminPassword.trim() ? 0.5 : 1,
                transition: 'all 0.15s ease'
              }}
            >
              <Trash2 size={16} />
              <span>{isDeleting ? 'Purging Orders...' : 'Confirm & Clear Data'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClearDataModal;
