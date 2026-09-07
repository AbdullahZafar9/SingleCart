import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const FavoritesDrawer = ({
  isOpen,
  onClose,
  favorites = [],
  onRemoveFavorite,
  onAddToCart
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
    <div className="drawer-backdrop" onClick={onClose}>
      <div
        className="cart-drawer-panel favorites-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-header">
          <div className="drawer-header-left">
            <Heart size={20} fill="#ea580c" stroke="#ea580c" />
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Liked Items</h3>
            <span className="drawer-count-badge">
              {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            className="close-drawer-btn"
            onClick={onClose}
            aria-label="Close liked items"
          >
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          {favorites.length === 0 ? (
            <div className="empty-cart-view">
              <Heart size={44} strokeWidth={1.5} color="var(--text-muted)" />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '8px 0 4px', color: 'var(--text-primary)' }}>
                No liked items yet
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '280px', lineHeight: 1.5 }}>
                Tap the heart icon on any product in a boutique to save your favorites for this session.
              </p>
              <button
                className="checkout-btn"
                style={{ marginTop: '16px', width: 'auto', padding: '10px 22px' }}
                onClick={() => {
                  onClose();
                  navigate('/mall');
                }}
              >
                <span>Browse Boutiques</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="fav-items-list">
              {favorites.map((item) => (
                <div key={item.id} className="fav-item-card">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="fav-item-logo"
                  />
                  <div className="fav-item-info">
                    <h4>{item.name}</h4>
                    <span className="fav-item-dept">{item.shop_name || 'Mall Boutique'}</span>
                    <span className="fav-item-price">
                      ${Number(item.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="fav-item-actions">
                    {onAddToCart && (
                      <button
                        className="fav-add-cart-btn"
                        onClick={() => {
                          onAddToCart(item);
                        }}
                        title="Add to SingleCart"
                      >
                        <ShoppingBag size={14} />
                        <span>Add</span>
                      </button>
                    )}
                    <button
                      className="fav-remove-btn"
                      onClick={() => onRemoveFavorite(item.id)}
                      title="Remove from liked items"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {favorites.length > 0 && (
          <div className="drawer-footer">
            <button
              className="checkout-btn"
              onClick={() => {
                onClose();
                navigate('/mall');
              }}
            >
              <span>Continue Exploring Mall</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesDrawer;
