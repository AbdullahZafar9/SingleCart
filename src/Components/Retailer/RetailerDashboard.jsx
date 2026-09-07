import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  CheckCircle,
  Package,
  Layers,
  LogOut,
  Phone,
  MapPin,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { getOrders, updateOrderStatus, subscribeToOrders } from '../../Data/mallStore';
import CatalogManager from './CatalogManager';
import '../../CSS/retailer.css';

const RetailerDashboard = ({ currentRetailer, onLogout }) => {
  const navigate = useNavigate();

  // Active shop defaults to Brew & Bean or provided retailer
  const shop = currentRetailer || {
    id: 'retailer-2',
    shop_name: 'Brew & Bean Specialty Roastery',
    department: 'Cafes & Dining',
    logo_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&auto=format&fit=crop&q=80'
  };

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'catalog'
  const [filterStatus, setFilterStatus] = useState('All');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    const data = await getOrders(shop.id);
    setOrders(data);
    setLoading(false);
  }, [shop.id]);

  useEffect(() => {
    fetchOrders();

    const unsubscribe = subscribeToOrders(() => {
      fetchOrders();
    }, shop.id);

    return () => unsubscribe();
  }, [fetchOrders, shop.id]);

  const handleStatusAdvance = async (orderId, nextStatus) => {
    await updateOrderStatus(orderId, nextStatus);
    setOrders((prev) =>
      prev.map((o) => (String(o.id) === String(orderId) ? { ...o, status: nextStatus } : o))
    );
  };

  // Calculations for stats
  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing');
  const completedOrders = orders.filter((o) => o.status === 'Completed');
  const totalRevenue = completedOrders.reduce((acc, o) => acc + Number(o.total_price), 0);

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'All') return true;
    return o.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <div className="retailer-wrapper">
      <header className="retailer-header">
        <div className="retailer-brand-bar">
          <img
            src={shop.logo_url || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&auto=format&fit=crop&q=80'}
            alt={shop.shop_name}
            className="retailer-avatar"
          />
          <div className="retailer-title-meta">
            <h2>{shop.shop_name}</h2>
            <span>{shop.department || 'Retailer Terminal'}</span>
          </div>
        </div>

        <div className="retailer-header-actions">
          <div className="live-indicator">
            <span className="pulse-dot" />
            <span>Live Orders Feed</span>
          </div>

          <button
            className="portal-link-btn"
            onClick={() => navigate('/')}
            title="View Digital Mall"
          >
            <span>Customer Mall</span>
          </button>

          <button
            className="portal-link-btn"
            onClick={() => {
              if (onLogout) onLogout();
              navigate('/retailer/login');
            }}
            style={{ color: 'var(--accent-rose)' }}
            title="Sign out"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="retailer-main">
        {/* STATS OVERVIEW */}
        <div className="retailer-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap blue">
              <Package size={22} />
            </div>
            <div className="stat-info">
              <h4>{orders.length}</h4>
              <p>Total Orders Today</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap gold">
              <Clock size={22} />
            </div>
            <div className="stat-info">
              <h4>{pendingOrders.length}</h4>
              <p>Active In Prep / Queue</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap emerald">
              <TrendingUp size={22} />
            </div>
            <div className="stat-info">
              <h4>${totalRevenue.toFixed(2)}</h4>
              <p>Completed Revenue</p>
            </div>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="dashboard-tabs-bar">
          <button
            className={`dash-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Clock size={16} />
            <span>Live Orders Pipeline ({pendingOrders.length} active)</span>
          </button>

          <button
            className={`dash-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <Layers size={16} />
            <span>Product Catalog & Stock</span>
          </button>
        </div>

        {/* CONTENT VIEW */}
        {activeTab === 'catalog' ? (
          <CatalogManager retailerId={shop.id} shopName={shop.shop_name} />
        ) : (
          <div className="orders-pipeline-view">
            <div className="orders-pipeline-header">
              <h3 style={{ fontSize: '1.25rem' }}>Incoming Orders & Fulfillment Queue</h3>

              <div className="order-filter-chips">
                {['All', 'Pending', 'Preparing', 'Ready', 'Completed'].map((st) => (
                  <button
                    key={st}
                    className={`order-filter-btn ${filterStatus === st ? 'active' : ''}`}
                    onClick={() => setFilterStatus(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                <p>Connecting to order feed...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
                <AlertCircle size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
                <h4>No {filterStatus !== 'All' ? filterStatus : ''} Orders Found</h4>
                <p style={{ color: 'var(--text-muted)', margin: '8px 0 0' }}>
                  Orders placed by anonymous customers from your storefront will appear here instantly.
                </p>
              </div>
            ) : (
              <div className="orders-grid">
                {filteredOrders.map((order) => {
                  const statusClass = (order.status || 'pending').toLowerCase();
                  return (
                    <div key={order.id} className="retailer-order-card">
                      <div className="order-card-top">
                        <span className="order-id-badge">Ticket #{order.id}</span>
                        <span className={`status-pill ${statusClass}`}>{order.status}</span>
                      </div>

                      <div className="order-customer-info">
                        <span className="customer-name">{order.customer_name}</span>
                        <span className="customer-phone">
                          <Phone size={12} />
                          {order.customer_phone}
                        </span>
                      </div>

                      <div className="order-note-box">
                        <MapPin size={14} />
                        <span>Doorstep: {order.delivery_notes}</span>
                      </div>

                      <div className="order-items-list">
                        {order.items && order.items.map((it, idx) => (
                          <div key={idx} className="order-item-row">
                            <span>{it.quantity}x {it.name}</span>
                            <span style={{ fontWeight: '600' }}>
                              ${(it.price * it.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="order-total-price-row">
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Total Ticket</span>
                        <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                          ${Number(order.total_price).toFixed(2)}
                        </span>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="order-action-buttons">
                        {order.status === 'Pending' && (
                          <button
                            className="action-btn prep"
                            onClick={() => handleStatusAdvance(order.id, 'Preparing')}
                          >
                            <span>Accept & Package Order</span>
                            <ChevronRight size={14} />
                          </button>
                        )}

                        {order.status === 'Preparing' && (
                          <button
                            className="action-btn ready"
                            onClick={() => handleStatusAdvance(order.id, 'Ready')}
                          >
                            <span>Dispatch for Delivery</span>
                            <ChevronRight size={14} />
                          </button>
                        )}

                        {order.status === 'Ready' && (
                          <button
                            className="action-btn complete"
                            onClick={() => handleStatusAdvance(order.id, 'Completed')}
                          >
                            <CheckCircle size={14} />
                            <span>Confirm Doorstep Delivery</span>
                          </button>
                        )}

                        {order.status === 'Completed' && (
                          <div style={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '0.78rem',
                            color: 'var(--accent-emerald)',
                            padding: '6px',
                            fontWeight: '600'
                          }}>
                            ✓ Fulfilled & Revenue Accounted
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default RetailerDashboard;
