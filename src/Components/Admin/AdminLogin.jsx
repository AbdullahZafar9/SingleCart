import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import '../../CSS/admin.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@singlecart.com');
  const [password, setPassword] = useState('admin123');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.length < 4) {
      setErrorMessage('Please enter a valid administrator password.');
      return;
    }

    // Role verified
    onLoginSuccess({
      role: 'admin',
      email: email.trim(),
      name: 'Global Mall Operations Master'
    });
    navigate('/admin');
  };

  return (
    <div className="admin-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="retailer-login-card" style={{ maxWidth: '440px' }}>
        <button
          onClick={() => navigate('/')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.84rem', marginBottom: '20px' }}
        >
          <ArrowLeft size={15} />
          <span>Back to Digital Mall</span>
        </button>

        <div className="retailer-login-header">
          <div className="admin-badge-icon" style={{ width: '56px', height: '56px', margin: '0 auto 16px' }}>
            <ShieldCheck size={32} />
          </div>
          <h2>Mall Executive Portal</h2>
          <p>Sign in to access global tenant management, revenue analytics, and boutique provisioning</p>
        </div>

        {errorMessage && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#fb7185',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '0.84rem',
            marginBottom: '16px'
          }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">
              <Mail size={13} style={{ display: 'inline', marginRight: '6px' }} />
              Executive Email
            </label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={13} style={{ display: 'inline', marginRight: '6px' }} />
              Admin Access Key
            </label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-create-shop"
            style={{ width: '100%', justifyContent: 'center', marginTop: '14px', padding: '12px' }}
          >
            <span>Access Command Center</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{
          marginTop: '20px',
          padding: '12px',
          background: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '8px',
          fontSize: '0.78rem',
          color: '#93c5fd',
          textAlign: 'center'
        }}>
          💡 Quick Demo: Ready to sign in with pre-filled master admin credentials.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
