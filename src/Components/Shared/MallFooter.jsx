import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Store } from 'lucide-react';

const MallFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="mall-footer">
      <div className="mall-footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="mall-logo-icon" style={{ width: '32px', height: '32px', fontSize: '1rem' }}>
            S
          </div>
          <div>
            <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>SingleCart</strong>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Next-Gen Multi-Tenant Virtual Mall Platform
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/retailer')}
            style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Store size={14} />
            <span>Retailer Portal</span>
          </button>

          <button
            onClick={() => navigate('/admin')}
            style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ShieldCheck size={14} />
            <span>Executive Admin</span>
          </button>
        </div>

        <div className="footer-copy">
          <span>&copy; {new Date().getFullYear()} SingleCart Digital Mall Inc. Friction-free shopping.</span>
        </div>
      </div>
    </footer>
  );
};

export default MallFooter;
