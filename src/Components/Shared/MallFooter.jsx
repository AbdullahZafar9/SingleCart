import React, { useState } from 'react';
import { ShoppingBag, Lock } from 'lucide-react';
import PortalSelectModal from '../Customer/PortalSelectModal';

const MallFooter = () => {
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);

  return (
    <>
      <footer className="mall-footer">
        <div className="mall-footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="mall-logo-icon" style={{ width: '34px', height: '34px' }}>
              <ShoppingBag size={18} color="#ffffff" />
            </div>
            <div>
              <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>SingleCart</strong>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Next-Gen Multi-Tenant Virtual Mall Platform
              </p>
            </div>
          </div>

          <div className="footer-right-group">
            {/* Subtle, non-highlighted staff access button */}
            <button
              className="footer-staff-btn"
              onClick={() => setIsPortalModalOpen(true)}
              title="Merchant & Admin Login"
              aria-label="Merchant & Admin Login"
            >
              <Lock size={12} />
              <span>Staff & Admin</span>
            </button>

            <div className="footer-copy">
              <span>&copy; {new Date().getFullYear()} SingleCart Digital Mall Inc. Friction-free shopping.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Role Selection Dialogue Modal (Retailer or Admin) */}
      <PortalSelectModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
      />
    </>
  );
};

export default MallFooter;



