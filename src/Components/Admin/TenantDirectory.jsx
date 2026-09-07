import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ExternalLink, Star } from 'lucide-react';

const TenantDirectory = ({ shops = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="tenants-section">
      <div className="tenants-header">
        <div>
          <h3>Registered Mall Tenants Directory</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
            Live status of active digital storefronts across all galleria floors
          </p>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }}>
          {shops.length} Active Boutiques
        </span>
      </div>

      <div className="tenants-table-wrap">
        <table className="tenants-table">
          <thead>
            <tr>
              <th>Storefront</th>
              <th>Department</th>
              <th>Location in Mall</th>
              <th>Rating</th>
              <th>Direct Actions</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((shop) => (
              <tr key={shop.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={shop.logo_url}
                      alt={shop.shop_name}
                      style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        {shop.shop_name}
                      </strong>
                      <span style={{ display: 'block', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        ID: {shop.id}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span style={{
                    fontSize: '0.78rem',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)'
                  }}>
                    {shop.department || shop.category}
                  </span>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={13} />
                    {shop.location_in_mall}
                  </span>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '700', color: '#fbbf24' }}>
                    <Star size={13} fill="#fbbf24" stroke="#fbbf24" />
                    {shop.rating || 5.0}
                  </span>
                </td>

                <td>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => navigate(`/store/${shop.id}`)}
                      style={{
                        padding: '6px 12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title="View Customer Storefront"
                    >
                      <ExternalLink size={12} />
                      <span>Customer View</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantDirectory;
