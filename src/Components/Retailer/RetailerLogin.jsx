import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ArrowLeft, ArrowRight, Lock, Smartphone } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../supabaseClient';
import { getShops, findShopByCredentials } from '../../Data/mallStore';
import RetailerApplicationModal from './RetailerApplicationModal';
import '../../CSS/retailer.css';

const RetailerLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [availableShops, setAvailableShops] = useState([]);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    const fetchShops = async () => {
      const shops = await getShops();
      setAvailableShops(shops);
    };
    fetchShops();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const cleanId = identifier.trim();
    const cleanPass = password.trim();

    // 1. Direct match against local & synchronized shop credentials (Email OR Mobile Phone)
    const localMatched = findShopByCredentials(cleanId, cleanPass);
    if (localMatched) {
      if (onLoginSuccess) onLoginSuccess(localMatched);
      navigate('/retailer');
      setLoading(false);
      return;
    }

    // 2. If Supabase is configured and input is an email, attempt Supabase Auth
    if (isSupabaseConfigured && supabase && cleanId.includes('@')) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanId,
          password: cleanPass
        });

        if (!error && data?.user) {
          const shopProfile = availableShops.find(
            (s) => s.id === data.user.id || (s.email && s.email.toLowerCase() === cleanId.toLowerCase())
          ) || {
            id: data.user.id,
            email: data.user.email,
            shop_name: data.user.user_metadata?.shop_name || 'My Store',
            department: 'Online Storefront'
          };

          if (onLoginSuccess) onLoginSuccess(shopProfile);
          navigate('/retailer');
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Supabase auth attempt error:', err);
      }
    }

    // 3. Fallback: match shop by name or default demo shop if in demo testing
    const fallbackMatch = availableShops.find(
      (s) => (s.shop_name && s.shop_name.toLowerCase() === cleanId.toLowerCase())
    );

    if (fallbackMatch && cleanPass === (fallbackMatch.password || 'vendor123')) {
      if (onLoginSuccess) onLoginSuccess(fallbackMatch);
      navigate('/retailer');
      setLoading(false);
      return;
    }

    setErrorMessage(
      'Invalid credentials. Please enter the valid Email or Mobile Number and Password assigned by the mall admin.'
    );
    setLoading(false);
  };

  const handleQuickDemoSwitch = (shop) => {
    if (onLoginSuccess) onLoginSuccess(shop);
    navigate('/retailer');
  };

  return (
    <div className="retailer-wrapper">
      <div className="retailer-login-page">
        <div className="retailer-login-card">
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-muted)',
              fontSize: '0.84rem',
              marginBottom: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to Digital Mall</span>
          </button>

          <div className="retailer-login-header">
            <div className="retailer-login-logo">
              <Store size={28} />
            </div>
            <h2>Retailer Vendor Portal</h2>
            <p>Access your live store terminal to manage products, orders, and storefront settings</p>
          </div>

          {errorMessage && (
            <div
              style={{
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                color: '#fb7185',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.84rem',
                marginBottom: '16px'
              }}
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  <Smartphone size={13} style={{ display: 'inline', marginRight: '6px' }} />
                  Retailer Email or Mobile Number
                </span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., manager@store.com or +1 (555) 302-8819"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                autoFocus
              />
              <span
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                  display: 'block'
                }}
              >
                Enter either your registered manager email or store mobile phone.
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Lock size={13} style={{ display: 'inline', marginRight: '6px' }} />
                Password
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
              disabled={loading}
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Store Terminal'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Apply to open a store banner */}
          <div
            style={{
              marginTop: '20px',
              padding: '14px 16px',
              background: 'rgba(234, 88, 12, 0.08)',
              border: '1px dashed rgba(234, 88, 12, 0.35)',
              borderRadius: '12px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <span style={{ fontSize: '0.86rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              Want to open a boutique in SingleCart?
            </span>
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontWeight: '700',
                fontSize: '0.84rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px'
              }}
            >
              <span>Apply to Register Your Store</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Quick Demo Store Selector */}
          <div className="demo-selector-section">
            <h4>Quick Switch Demo Accounts</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {availableShops.slice(0, 4).map((shop) => (
                <button
                  key={shop.id}
                  type="button"
                  className="demo-shop-btn"
                  onClick={() => handleQuickDemoSwitch(shop)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <strong style={{ display: 'block', fontSize: '0.86rem' }}>{shop.shop_name}</strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {shop.email || 'vendor'} • {shop.phone || '+1 555-0100'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>Login →</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RETAILER APPLICATION MODAL */}
      <RetailerApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
};

export default RetailerLogin;
