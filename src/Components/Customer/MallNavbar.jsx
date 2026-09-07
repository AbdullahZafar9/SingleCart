import React from 'react';
import { ShoppingBag, Search, Store, ShieldCheck, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MallNavbar = ({
  cartCount = 0,
  onOpenCart,
  searchQuery = '',
  onSearchChange,
  showSearch = true
}) => {
  const navigate = useNavigate();

  return (
    <nav className="mall-navbar">
      <div className="mall-nav-inner">
        <div className="mall-brand" onClick={() => navigate('/mall')}>
          <div className="mall-logo-icon">S</div>
          <div className="mall-brand-text">
            <h1>SingleCart</h1>
            <span>The Digital Mall</span>
          </div>
        </div>

        {showSearch && (
          <div className="mall-search-bar">
            <Search className="mall-search-icon" size={18} />
            <input
              type="text"
              className="mall-search-input"
              placeholder="Search boutiques, cafes, electronics..."
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            />
          </div>
        )}

        <div className="mall-nav-actions">
          <button
            className="portal-link-btn"
            onClick={() => navigate('/')}
            title="Return to Welcome Screen"
          >
            <Home size={16} />
            <span>Welcome</span>
          </button>

          <button
            className="portal-link-btn"
            onClick={() => navigate('/retailer')}
            title="Retailer Storefront Management Portal"
          >
            <Store size={16} />
            <span>Retailer Portal</span>
          </button>

          <button
            className="portal-link-btn admin"
            onClick={() => navigate('/admin')}
            title="Global Mall Admin Command Center"
          >
            <ShieldCheck size={16} />
            <span>Mall Admin</span>
          </button>

          <button
            className="cart-toggle-btn"
            onClick={onOpenCart}
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag size={18} />
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MallNavbar;
