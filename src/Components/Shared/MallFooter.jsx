import React from 'react';
import { ShoppingBag } from 'lucide-react';

const MallFooter = () => {
  return (
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

        <div className="footer-copy">
          <span>&copy; {new Date().getFullYear()} SingleCart Digital Mall Inc. Friction-free multi-store shopping.</span>
        </div>
      </div>
    </footer>
  );
};

export default MallFooter;


