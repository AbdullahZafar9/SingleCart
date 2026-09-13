import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import '../../CSS/admin.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('furqannasir561@gmail.com');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    const isAuthorizedEmail =
      cleanEmail === 'furqannasir561@gmail.com' ||
      cleanEmail === 'qazia7513@gmail.com' ||
      cleanEmail === 'admin@singlecart.com';

    const isAuthorizedPass = cleanPass === '12345678';

    if (!isAuthorizedEmail || !isAuthorizedPass) {
      setErrorMessage(
        'Invalid executive credentials. Please enter the registered administrator email and correct password.'
      );
      return;
    }

    // Role verified
    onLoginSuccess({
      role: 'admin',
      email: cleanEmail,
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
          <p>Sign in with verified administrator credentials to provision stores and dispatch credentials</p>
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
              placeholder="e.g., furqannasir561@gmail.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={13} style={{ display: 'inline', marginRight: '6px' }} />
              Admin Password
            </label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your admin password"
              required
              autoFocus
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
      </div>
    </div>
  );
};

export default AdminLogin;
