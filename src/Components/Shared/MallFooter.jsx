import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Store, Home } from 'lucide-react';

const MallFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="mall-footer">
      <div className="mall-footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="mall-logo-icon" style={{ width: '34px', height: '34px', fontSize: '1.05rem' }}>
            S
          </div>
          <div>
            <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>SingleCart</strong>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Next-Gen Multi-Tenant Virtual Mall Platform
            </p>
          </div>
        </div>

        {/* Dedicated Footer Portals & Quick Nav */}
        <div className="footer-links-group">
          <button
            onClick={() => navigate('/')}
            className="footer-portal-link"
            title="Return to Welcome Landing Screen"
          >
            <Home size={14} />
            <span>Welcome Screen</span>
          </button>

          <button
            onClick={() => navigate('/retailer/login')}
            className="footer-portal-link retailer"
            title="Retailer Management Login"
          >
            <Store size={14} />
            <span>Retailer Portal</span>
          </button>

          <button
            onClick={() => navigate('/admin/login')}
            className="footer-portal-link admin"
            title="Mall Administration Login"
          >
            <ShieldCheck size={14} />
            <span>Mall Admin</span>
          </button>
        </div>

        <div className="footer-copy">
          <span>&copy; {new Date().getFullYear()} SingleCart Digital Mall Inc. Friction-free multi-store shopping.</span>
        </div>
      </div>
    </footer>
  );
};

export default MallFooter;

