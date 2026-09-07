import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ShieldCheck, X, ArrowRight, KeyRound, Sparkles } from 'lucide-react';

const PortalSelectModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="portal-modal-overlay" onClick={onClose}>
      <div
        className="portal-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="portal-modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="portal-modal-header">
          <div className="portal-modal-badge">
            <KeyRound size={22} />
          </div>
          <h2>Select Portal Access</h2>
          <p>Choose your destination to manage your store or mall operations</p>
        </div>

        <div className="portal-modal-options">
          {/* Option 1: Retailer Portal */}
          <div
            className="portal-option-card retailer"
            onClick={() => {
              onClose();
              navigate('/retailer/login');
            }}
          >
            <div className="portal-option-icon retailer">
              <Store size={26} />
            </div>
            <div className="portal-option-content">
              <div className="portal-option-title-row">
                <h3>Retailer Portal</h3>
                <span className="portal-tag retailer">Shop Owners</span>
              </div>
              <p>Manage your boutique storefront, update inventory catalog, and fulfill live customer orders.</p>
            </div>
            <div className="portal-option-arrow">
              <ArrowRight size={20} />
            </div>
          </div>

          {/* Option 2: Mall Admin */}
          <div
            className="portal-option-card admin"
            onClick={() => {
              onClose();
              navigate('/admin/login');
            }}
          >
            <div className="portal-option-icon admin">
              <ShieldCheck size={26} />
            </div>
            <div className="portal-option-content">
              <div className="portal-option-title-row">
                <h3>Mall Admin Console</h3>
                <span className="portal-tag admin">Super Admin</span>
              </div>
              <p>Platform control center for boutique tenant onboarding, tenant directory, and global revenue analytics.</p>
            </div>
            <div className="portal-option-arrow">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>

        <div className="portal-modal-footer">
          <Sparkles size={14} color="#d97706" />
          <span>Customers can shop all boutiques with zero account friction.</span>
        </div>
      </div>
    </div>
  );
};

export default PortalSelectModal;
