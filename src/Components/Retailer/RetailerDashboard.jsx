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
  AlertCircle,
  Star,
  MessageSquare,
  Mail,
  User,
  UserCheck,
  Image as ImageIcon,
  Check,
  ExternalLink,
  Sparkles,
  Moon,
  Sun
} from 'lucide-react';
import {
  getOrders,
  updateOrderStatus,
  subscribeToOrders,
  getReviewsSync,
  subscribeToReviews,
  getProductsSync,
  getShopByIdSync,
  updateShop
} from '../../Data/mallStore';
import CatalogManager from './CatalogManager';
import '../../CSS/retailer.css';

const BANNER_PRESETS = [
  {
    title: 'Fashion & Apparel Showroom',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Designer Sneaker & Footwear Wall',
    url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Electronics & Audio Studio',
    url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Luxury Perfumery & Cosmetics',
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Artisan Cafe & Coffee Roastery',
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&auto=format&fit=crop&q=80'
  },
  {
    title: 'Modern Scandinavian Living Space',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&auto=format&fit=crop&q=80'
  }
];

const RetailerDashboard = ({ currentRetailer, onLogout }) => {
  const navigate = useNavigate();

  // Active shop defaults to Kinetics Apparel Co. or provided retailer, synchronized with store
  const [shopData, setShopData] = useState(() => {
    const base = currentRetailer || {
      id: 'retailer-1',
      shop_name: 'Kinetics Apparel Co.',
      department: 'Street Wear & Urban Apparel',
      logo_url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&auto=format&fit=crop&q=80',
      banner_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80'
    };
    const fresh = getShopByIdSync(base.id);
    return fresh ? { ...base, ...fresh } : base;
  });

  const shop = shopData;

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'catalog' | 'reviews' | 'banner'
  const [filterStatus, setFilterStatus] = useState('All');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Banner state
  const [bannerInput, setBannerInput] = useState(shop.banner_url || '');
  const [isSavingBanner, setIsSavingBanner] = useState(false);
  const [bannerSavedSuccess, setBannerSavedSuccess] = useState(false);

  // Global Theme toggle
  const [theme, setTheme] = useState(() => localStorage.getItem('sc_theme') || 'light');

  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e.detail) setTheme(e.detail);
    };
    window.addEventListener('sc:theme_changed', handleThemeChange);
    return () => window.removeEventListener('sc:theme_changed', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('sc_theme', next);
    document.documentElement.setAttribute('data-theme', next);
    window.dispatchEvent(new CustomEvent('sc:theme_changed', { detail: next }));
  };

  useEffect(() => {
    if (shop.banner_url) {
      setBannerInput(shop.banner_url);
    }
  }, [shop.banner_url]);

  useEffect(() => {
    const handleShopUpdate = (e) => {
      if (e.detail && String(e.detail.id) === String(shop.id)) {
        setShopData((prev) => ({ ...prev, ...e.detail }));
      }
    };
    window.addEventListener('sc:shops_updated', handleShopUpdate);
    return () => window.removeEventListener('sc:shops_updated', handleShopUpdate);
  }, [shop.id]);

  const handleSaveBanner = async (newUrl) => {
    const urlToSave = (newUrl || bannerInput).trim();
    if (!urlToSave) return;
    setIsSavingBanner(true);
    setBannerSavedSuccess(false);

    const updated = await updateShop(shop.id, {
      banner_url: urlToSave
    });

    if (updated) {
      setShopData(updated);
      setBannerInput(updated.banner_url);
    }
    setIsSavingBanner(false);
    setBannerSavedSuccess(true);
    setTimeout(() => setBannerSavedSuccess(false), 3000);
  };

  // Reviews state
  const [reviews, setReviews] = useState(() => getReviewsSync(null, shop.id));
  const [selectedProductFilter, setSelectedProductFilter] = useState('all');
  const products = getProductsSync(shop.id);

  const fetchOrders = useCallback(async () => {
    const data = await getOrders(shop.id);
    setOrders(data);
    setLoading(false);
  }, [shop.id]);

  const loadReviews = useCallback(() => {
    const shopReviews = getReviewsSync(null, shop.id);
    setReviews(shopReviews);
  }, [shop.id]);

  useEffect(() => {
    fetchOrders();
    loadReviews();

    const unsubscribeOrders = subscribeToOrders(() => {
      fetchOrders();
    }, shop.id);

    const unsubscribeReviews = subscribeToReviews(() => {
      loadReviews();
    }, null, shop.id);

    return () => {
      unsubscribeOrders();
      unsubscribeReviews();
    };
  }, [fetchOrders, loadReviews, shop.id]);

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

  // Filter reviews by selected product
  const filteredReviews = reviews.filter((r) => {
    if (selectedProductFilter === 'all') return true;
    return String(r.product_id) === String(selectedProductFilter);
  });

  const avgReviewScore = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="retailer-wrapper">
      <header className="retailer-header">
        <div className="retailer-brand-bar">
          <img
            src={shop.logo_url || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&auto=format&fit=crop&q=80'}
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
            <span>Live Store Operations</span>
          </div>

          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

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

          <div className="stat-card">
            <div className="stat-icon-wrap" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#d97706' }}>
              <Star size={22} fill="#d97706" />
            </div>
            <div className="stat-info">
              <h4>{avgReviewScore} ★</h4>
              <p>{reviews.length} Customer Reviews</p>
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

          <button
            className={`dash-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <MessageSquare size={16} />
            <span>Customer Reviews ({reviews.length})</span>
          </button>

          <button
            className={`dash-tab-btn ${activeTab === 'banner' ? 'active' : ''}`}
            onClick={() => setActiveTab('banner')}
          >
            <ImageIcon size={16} />
            <span>Storefront Banner</span>
          </button>
        </div>

        {/* CONTENT VIEW */}
        {activeTab === 'catalog' && (
          <CatalogManager retailerId={shop.id} shopName={shop.shop_name} />
        )}

        {activeTab === 'orders' && (
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

        {/* CUSTOMER REVIEWS TAB VIEW */}
        {activeTab === 'reviews' && (
          <div className="retailer-reviews-view">
            <div className="reviews-view-header">
              <div>
                <h3 style={{ fontSize: '1.25rem', margin: '0 0 4px' }}>Customer Feedback & Reviews</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>
                  Real-time reviews and ratings submitted by verified store shoppers.
                </p>
              </div>

              <div className="reviews-filter-select-wrap">
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Filter by Product:
                </label>
                <select
                  value={selectedProductFilter}
                  onChange={(e) => setSelectedProductFilter(e.target.value)}
                  className="reviews-product-select"
                >
                  <option value="all">All Products ({reviews.length} reviews)</option>
                  {products.map((p) => {
                    const count = reviews.filter((r) => String(r.product_id) === String(p.id)).length;
                    return (
                      <option key={p.id} value={p.id}>
                        {p.name} ({count})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {filteredReviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
                <MessageSquare size={42} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
                <h4>No Reviews Found</h4>
                <p style={{ color: 'var(--text-muted)', margin: '8px 0 0' }}>
                  {selectedProductFilter === 'all'
                    ? 'Customers have not yet submitted reviews for this store.'
                    : 'No customer reviews found for the selected product.'}
                </p>
              </div>
            ) : (
              <div className="retailer-reviews-grid">
                {filteredReviews.map((rev) => {
                  const targetProd = products.find((p) => String(p.id) === String(rev.product_id));

                  return (
                    <div key={rev.id} className="retailer-review-card">
                      {targetProd && (
                        <div className="review-product-banner">
                          <img
                            src={targetProd.image_url}
                            alt={targetProd.name}
                            className="review-product-thumb"
                          />
                          <div className="review-product-meta">
                            <strong>{targetProd.name}</strong>
                            <span>${Number(targetProd.price).toFixed(2)} • {targetProd.item_category || targetProd.category}</span>
                          </div>
                        </div>
                      )}

                      <div className="review-customer-header">
                        <div className="customer-info-block">
                          <div className="customer-icon-wrap">
                            <User size={15} />
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span className="customer-name-label">{rev.user_name}</span>
                              <span className="verified-badge-small">
                                <UserCheck size={11} />
                                Verified
                              </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                              <Mail size={12} color="var(--text-muted)" />
                              <span className="customer-email-label">{rev.user_email}</span>
                            </div>
                          </div>
                        </div>

                        <div className="review-stars-block">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={14}
                              fill={s <= (rev.rating || 5) ? '#fbbf24' : 'none'}
                              stroke={s <= (rev.rating || 5) ? '#fbbf24' : '#cbd5e1'}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="review-content-box">
                        <p>{rev.description}</p>
                      </div>

                      <div className="review-footer-row">
                        <span className="review-timestamp">
                          Submitted {rev.created_at ? new Date(rev.created_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          }) : 'Recently'}
                        </span>
                        <span className="review-product-tag">Product ID: {rev.product_id}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* STOREFRONT BANNER VIEW */}
        {activeTab === 'banner' && (
          <div
            className="storefront-banner-section"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '28px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Storefront Banner & Branding</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginTop: '4px' }}>
                  Manage the cover photo for your digital shop inside SingleCart Mall. High-resolution shop photos showcase your products and brand identity.
                </p>
              </div>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate(`/store/${shop.id}`)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <ExternalLink size={14} />
                <span>View Live Store Page</span>
              </button>
            </div>

            {/* Current Banner Preview Card */}
            <div style={{ marginBottom: '28px' }}>
              <label className="form-label" style={{ marginBottom: '10px', display: 'block' }}>
                Storefront Banner Preview
              </label>
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'var(--bg-hover)',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)'
                }}
              >
                <img
                  src={bannerInput || shop.banner_url}
                  alt={shop.shop_name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '24px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img
                      src={shop.logo_url}
                      alt={shop.shop_name}
                      style={{
                        width: '58px',
                        height: '58px',
                        borderRadius: '12px',
                        border: '2px solid #ffffff',
                        objectFit: 'cover',
                        background: '#ffffff'
                      }}
                    />
                    <div>
                      <h2 style={{ color: '#ffffff', fontSize: '1.45rem', fontWeight: '800', margin: 0 }}>
                        {shop.shop_name}
                      </h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <span style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>{shop.department}</span>
                        <span
                          style={{
                            fontSize: '0.74rem',
                            background: 'rgba(255,255,255,0.2)',
                            color: '#ffffff',
                            padding: '2px 8px',
                            borderRadius: '9999px'
                          }}
                        >
                          Verified Online Store
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom URL Input */}
            <div style={{ marginBottom: '28px' }}>
              <label className="form-label">
                Custom Banner Image URL
              </label>
              <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
                <input
                  type="url"
                  className="form-input"
                  placeholder="Paste direct image URL (e.g. Unsplash, CDN, or shop photography)..."
                  value={bannerInput}
                  onChange={(e) => setBannerInput(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleSaveBanner(bannerInput)}
                  disabled={isSavingBanner || !bannerInput.trim()}
                  style={{ minWidth: '150px', justifyContent: 'center' }}
                >
                  {isSavingBanner ? 'Saving...' : bannerSavedSuccess ? (
                    <>
                      <Check size={16} />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon size={16} />
                      <span>Save Banner</span>
                    </>
                  )}
                </button>
              </div>
              {bannerSavedSuccess && (
                <div
                  style={{
                    marginTop: '10px',
                    fontSize: '0.84rem',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <CheckCircle size={15} />
                  <span>Storefront banner has been updated and is immediately live across the Digital Mall!</span>
                </div>
              )}
            </div>

            {/* Preset Showcase */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Sparkles size={16} color="var(--accent-gold)" />
                <h4 style={{ fontSize: '0.98rem', fontWeight: '700' }}>Or Choose a Curated Shop Interior Banner</h4>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '16px'
                }}
              >
                {BANNER_PRESETS.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setBannerInput(preset.url);
                      handleSaveBanner(preset.url);
                    }}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border:
                        bannerInput === preset.url
                          ? '2px solid var(--accent-gold)'
                          : '1px solid var(--border-subtle)',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      position: 'relative'
                    }}
                    className="banner-preset-card"
                  >
                    <div style={{ height: '120px', overflow: 'hidden' }}>
                      <img
                        src={preset.url}
                        alt={preset.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '10px 12px', background: 'var(--bg-surface)' }}>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: 'var(--text-primary)',
                          display: 'block'
                        }}
                      >
                        {preset.title}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>
                        Click to apply immediately
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RetailerDashboard;
