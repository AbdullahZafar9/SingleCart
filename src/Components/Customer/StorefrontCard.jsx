import React from 'react';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StorefrontCard = ({ shop }) => {
  const navigate = useNavigate();

  return (
    <div
      className="storefront-card"
      onClick={() => navigate(`/store/${shop.id}`)}
      role="button"
      tabIndex={0}
    >
      <div className="storefront-banner-wrap">
        <img
          src={shop.banner_url}
          alt={shop.shop_name}
          className="storefront-banner-img"
          loading="lazy"
        />
        <div className="storefront-banner-overlay" />
        <span className="storefront-badge">{shop.department || 'Boutique'}</span>

        <img
          src={shop.logo_url}
          alt={`${shop.shop_name} logo`}
          className="storefront-logo"
        />
      </div>

      <div className="storefront-body">
        <div className="storefront-title-row">
          <h4>{shop.shop_name}</h4>
          <div className="storefront-rating">
            <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
            <span>{shop.rating || 5.0}</span>
          </div>
        </div>

        <div className="storefront-meta">
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={13} />
            {shop.location_in_mall || 'Floor 1'}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            ({shop.reviews_count || 100}+ reviews)
          </span>
        </div>

        <p className="storefront-desc">{shop.description}</p>

        <div className="storefront-footer">
          <span className="storefront-status-open">Open Now</span>

          <button className="enter-store-btn">
            <span>Explore Boutique</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorefrontCard;
