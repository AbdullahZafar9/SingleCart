import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ArrowLeft, ArrowRight, Lock, Mail } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../supabaseClient';
import { getShops } from '../../Data/mallStore';
import '../../CSS/retailer.css';

const RetailerLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [availableShops, setAvailableShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const shops = await getShops();
      setAvailableShops(shops);
    };
    fetchShops();
  }, []);

  const handleSupabaseLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password
        });

        if (error) {
          setErrorMessage(error.message);
        } else if (data?.user) {
          onLoginSuccess({
            id: data.user.id,
            email: data.user.email,
            shop_name: data.user.user_metadata?.shop_name || 'My Boutique'
          });
          navigate('/retailer');
        }
      } catch (err) {
        setErrorMessage('Authentication service error.');
      }
    } else {
      // Demo fallback login
      const matched = availableShops.find(s => s.shop_name.toLowerCase().includes(email.toLowerCase())) || availableShops[1] || availableShops[0];
      onLoginSuccess(matched);
      navigate('/retailer');
    }

    setLoading(false);
  };

  const handleQuickDemoSwitch = (shop) => {
    onLoginSuccess(shop);
    navigate('/retailer');
  };

  return (
    <div className="retailer-wrapper">
      <div className="retailer-login-page">
        <div className="retailer-login-card">
          <button
            onClick={() => navigate('/')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.84rem', marginBottom: '20px' }}
          >
            <ArrowLeft size={15} />
            <span>Back to Digital Mall</span>
          </button>

          <div className="retailer-login-header">
            <div className="retailer-login-logo">
              <Store size={28} />
            </div>
            <h2>Retailer Vendor Portal</h2>
            <p>Access your live kitchen or store terminal to process incoming customer orders</p>
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

          <form onSubmit={handleSupabaseLogin}>
            <div className="form-group">
              <label className="form-label">
                <Mail size={13} style={{ display: 'inline', marginRight: '6px' }} />
                Retailer Email
              </label>
              <input
                type="email"
                className="form-input"
                placeholder="store-manager@singlecart.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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

          {/* Quick Demo Store Selector */}
          <div className="demo-selector-section">
            <h4>Quick Switch Demo Accounts</h4>
            {availableShops.slice(0, 3).map((shop) => (
              <button
                key={shop.id}
                type="button"
                className="demo-shop-btn"
                onClick={() => handleQuickDemoSwitch(shop)}
              >
                <span>{shop.shop_name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>Login as Shop →</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerLogin;
