import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, X, Trash2, ArrowRight } from 'lucide-react';

const FavoritesDrawer = ({
  isOpen,
  onClose,
  favorites = [],
  onRemoveFavorite
}) => {
  const navigate = useNavigate();

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-header">
          <div className="drawer-header-left">
            <Heart size={20} fill="#ea580c" stroke="#ea580c" />
            <h2>Saved Favorites</h2>
            <span className="drawer-count-badge">
              {favorites.length} {favorites.length === 1 ? 'store' : 'stores'}
            </span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close favorites"
          >
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {favorites.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon">
                <Heart size={44} stroke="#94a3b8" />
              </div>
              <h4>No favorites saved yet</h4>
              <p>
                Tap the heart icon on any boutique card in the mall directory to save it here for quick access.
              </p>
              <button className="explore-mall-btn" onClick={onClose}>
                Browse Boutiques
              </button>
            </div>
          ) : (
            <div className="fav-items-list">
              {favorites.map((shop) => (
                <div key={shop.id} className="fav-item-card">
                  <img
                    src={shop.logo_url}
                    alt={shop.shop_name}
                    className="fav-item-logo"
                  />
                  <div className="fav-item-info">
                    <h4>{shop.shop_name}</h4>
                    <span className="fav-item-dept">{shop.department || 'Boutique'}</span>
                    <span className="fav-item-floor">{shop.location_in_mall || 'Floor 1'}</span>
                  </div>
                  <div className="fav-item-actions">
                    <button
                      className="fav-visit-btn"
                      onClick={() => {
                        onClose();
                        navigate(`/store/${shop.id}`);
                      }}
                      title="Visit Storefront"
                    >
                      <ArrowRight size={16} />
                    </button>
                    <button
                      className="fav-remove-btn"
                      onClick={() => onRemoveFavorite(shop.id)}
                      title="Remove from favorites"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesDrawer;
