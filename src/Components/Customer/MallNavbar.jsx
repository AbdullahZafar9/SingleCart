import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MallNavbar = ({
  cartCount = 0,
  onOpenCart,
  favoritesCount = 0,
  onOpenFavorites
}) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sc_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('sc_theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="mall-navbar">
      <div className="mall-nav-inner">
        {/* Brand with shopping icon */}
        <div className="mall-brand" onClick={() => navigate('/mall')}>
          <div className="mall-logo-icon" title="SingleCart Digital Mall">
            <ShoppingBag size={20} />
          </div>
          <div className="mall-brand-text">
            <h1>SingleCart</h1>
            <span>The Digital Mall</span>
          </div>
        </div>

        {/* Right Side Actions: Theme Toggle, Favorites, Cart */}
        <div className="mall-nav-actions">
          {/* Light / Dark Mode Toggle */}
          <button
            className="nav-icon-btn theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Saved Favorites Button */}
          <button
            className="nav-icon-btn fav-toggle-btn"
            onClick={onOpenFavorites}
            title="Saved Favorites"
            aria-label="Open Saved Favorites"
          >
            <Heart size={18} />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="nav-fav-badge">{favoritesCount}</span>
            )}
          </button>

          {/* Cart Button */}
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


