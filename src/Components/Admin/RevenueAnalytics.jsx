import React from 'react';
import { TrendingUp, Award } from 'lucide-react';

const RevenueAnalytics = ({ analytics }) => {
  const { mallTotalRevenue = 0, shopStats = [] } = analytics;

  return (
    <div className="analytics-section">
      <div className="analytics-header">
        <div>
          <h3>Real-Time Revenue per Boutique</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
            Calculated exclusively from finalized orders (<code>status = 'Completed'</code>)
          </p>
        </div>

        <div style={{
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '6px 14px',
          borderRadius: '9999px',
          color: 'var(--accent-emerald)',
          fontSize: '0.82rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <TrendingUp size={15} />
          <span>Total GMV: ${mallTotalRevenue.toFixed(2)}</span>
        </div>
      </div>

      {shopStats.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          <p>No finalized orders recorded yet.</p>
        </div>
      ) : (
        <div className="revenue-bars-list">
          {shopStats.map((stat, idx) => {
            const percentage = mallTotalRevenue > 0
              ? Math.round((stat.totalRevenue / mallTotalRevenue) * 100)
              : 0;

            return (
              <div key={stat.id} className="revenue-bar-item">
                <div className="bar-meta-row">
                  <span className="shop-revenue-name">
                    {idx === 0 && <Award size={16} color="var(--accent-gold)" />}
                    <span style={{ color: 'var(--text-primary)' }}>{stat.shop_name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>
                      ({stat.completedOrdersCount} orders fulfilled)
                    </span>
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {percentage}% of Mall GMV
                    </span>
                    <span className="shop-revenue-amount" style={{ color: stat.totalRevenue > 0 ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      ${stat.totalRevenue.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.max(percentage, stat.totalRevenue > 0 ? 4 : 0)}%`,
                      background: stat.accent_color || 'var(--accent-gold)'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RevenueAnalytics;
