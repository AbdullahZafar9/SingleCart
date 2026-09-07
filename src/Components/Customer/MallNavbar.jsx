import React, { useState } from 'react';
import { ShoppingBag, Search, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PortalSelectModal from './PortalSelectModal';

const MallNavbar = ({
  cartCount = 0,
  onOpenCart,
  searchQuery = '',
  onSearchChange,
  showSearch = true
}) => {
  const navigate = useNavigate();
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);

  return (
    <>
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
              className="portal-link-btn portal-access-btn"
              onClick={() => setIsPortalModalOpen(true)}
              title="Retailer & Admin Portal Access"
            >
              <KeyRound size={16} />
              <span>Portal Access</span>
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

      {/* Role Selection Dialogue Modal */}
      <PortalSelectModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
      />
    </>
  );
};

export default MallNavbar;

