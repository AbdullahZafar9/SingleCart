import React from 'react';
import { Sparkles } from 'lucide-react';

const MallHero = ({ totalShops = 5, totalProducts = 15 }) => {
  return (
    <section className="mall-hero">
      <div className="hero-banner-card">
        <div className="hero-content">
          <div className="hero-badge-tag">
            <Sparkles size={14} />
            <span>Multi-Tenant Digital Galleria</span>
          </div>
          <h2>One Destination. Endless Stores. Zero Login.</h2>
          <p>
            Experience seamless digital shopping across premier fashion houses, skincare specialists,
            and tech innovators. Add items from any store to your single cart and checkout with direct doorstep delivery.
          </p>

          <div className="hero-stats-row">
            <div className="hero-stat-box">
              <span className="stat-number">{totalShops}+</span>
              <span className="stat-label">Premier Stores</span>
            </div>
            <div className="hero-stat-box">
              <span className="stat-number">{totalProducts}+</span>
              <span className="stat-label">Curated Drops</span>
            </div>
            <div className="hero-stat-box">
              <span className="stat-number">Tracked</span>
              <span className="stat-label">Doorstep Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MallHero;
