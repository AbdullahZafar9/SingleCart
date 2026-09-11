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
  Eye,
  Moon,
  Sun,
  Upload,
  Trash2,
  RotateCcw,
  Calendar,
  FileImage,
  X
} from 'lucide-react';
import {
  getOrders,
  updateOrderStatus,
  subscribeToOrders,
  getReviewsSync,
  subscribeToReviews,
  getProductsSync,
  getShopByIdSync,
  updateShop,
  deleteRetailerOrdersByDateRange,
  resetRetailerTodayOrders,
  deleteOrder
} from '../../Data/mallStore';
import CatalogManager from './CatalogManager';
import '../../CSS/retailer.css';

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

  // Banner local file & preview state
  const [bannerPreview, setBannerPreview] = useState(shop.banner_url || '');
  const [isSavingBanner, setIsSavingBanner] = useState(false);
  const [bannerSavedSuccess, setBannerSavedSuccess] = useState(false);

  // Timeframe and date filter state
  const [timeframe, setTimeframe] = useState('all'); // 'today', 'week', 'month', 'all', 'custom'
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Delete & Reset Modals
  const [showResetTodayModal, setShowResetTodayModal] = useState(false);
  const [showDeleteRangeModal, setShowDeleteRangeModal] = useState(false);
  const [deleteStartDate, setDeleteStartDate] = useState('');
  const [deleteEndDate, setDeleteEndDate] = useState('');
  const [isDeletingRecords, setIsDeletingRecords] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [isDeletingOrder, setIsDeletingOrder] = useState(false);

  // Retailer Shop Theme state (scoped strictly to this retailer's shop panel)
  const retailerThemeKey = shop?.id ? `sc_retailer_theme_${shop.id}` : 'sc_retailer_theme';
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(retailerThemeKey) || localStorage.getItem('sc_retailer_theme') || 'light';
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    const currentKey = shop?.id ? `sc_retailer_theme_${shop.id}` : 'sc_retailer_theme';
    const saved = localStorage.getItem(currentKey) || localStorage.getItem('sc_retailer_theme') || 'light';
    setTheme(saved);
  }, [shop?.id]);

  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e.detail?.shopId && String(e.detail.shopId) !== String(shop?.id)) return;
      const newTheme = typeof e.detail === 'string' ? e.detail : e.detail?.theme;
      if (newTheme) setTheme(newTheme);
    };
    window.addEventListener('sc:retailer_theme_changed', handleThemeChange);
    return () => window.removeEventListener('sc:retailer_theme_changed', handleThemeChange);
  }, [shop?.id]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    const currentKey = shop?.id ? `sc_retailer_theme_${shop.id}` : 'sc_retailer_theme';
    try {
      localStorage.setItem(currentKey, next);
      localStorage.setItem('sc_retailer_theme', next);
    } catch (e) {}
    document.documentElement.setAttribute('data-theme', next);
    window.dispatchEvent(new CustomEvent('sc:retailer_theme_changed', { detail: { theme: next, shopId: shop?.id } }));
  };

  useEffect(() => {
    if (shop.banner_url) {
      setBannerPreview(shop.banner_url);
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

  // Handle local image file upload from mobile or computer gallery
  const handleBannerFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1600;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setBannerPreview(compressedDataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBanner = async () => {
    if (!bannerPreview) return;
    setIsSavingBanner(true);
    setBannerSavedSuccess(false);

    const updated = await updateShop(shop.id, {
      banner_url: bannerPreview
    });

    if (updated) {
      setShopData(updated);
      setBannerPreview(updated.banner_url);
    }
    setIsSavingBanner(false);
    setBannerSavedSuccess(true);
    setTimeout(() => setBannerSavedSuccess(false), 3500);
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

  // Filter orders by Timeframe (Today, Week, Month, All, Custom)
  const ordersInTimeframe = orders.filter((o) => {
    if (!o.created_at) return true;
    const orderDate = new Date(o.created_at);
    const now = new Date();

    if (timeframe === 'today') {
      return (
        orderDate.getFullYear() === now.getFullYear() &&
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getDate() === now.getDate()
      );
    }

    if (timeframe === 'week') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);
      return orderDate >= sevenDaysAgo;
    }

    if (timeframe === 'month') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      return orderDate >= thirtyDaysAgo;
    }

    if (timeframe === 'custom') {
      if (customStartDate && orderDate < new Date(customStartDate + 'T00:00:00')) return false;
      if (customEndDate && orderDate > new Date(customEndDate + 'T23:59:59')) return false;
      return true;
    }

    return true; // 'all'
  });

  // Calculations for stats based on selected timeframe
  const pendingOrders = ordersInTimeframe.filter((o) => o.status === 'Pending' || o.status === 'Preparing' || o.status === 'Ready');
  const completedOrders = ordersInTimeframe.filter((o) => o.status === 'Completed');
  const totalRevenue = completedOrders.reduce((acc, o) => acc + Number(o.total_price), 0);
  const pendingRevenue = pendingOrders.reduce((acc, o) => acc + Number(o.total_price), 0);

  const filteredOrders = ordersInTimeframe.filter((o) => {
    if (filterStatus === 'All') return true;
    return o.status.toLowerCase() === filterStatus.toLowerCase();
  });

  // Orders placed today for the Reset Today confirmation
  const todayOrders = orders.filter((o) => {
    if (!o.created_at) return false;
    const orderDate = new Date(o.created_at);
    const now = new Date();
    return (
      orderDate.getFullYear() === now.getFullYear() &&
      orderDate.getMonth() === now.getMonth() &&
      orderDate.getDate() === now.getDate()
    );
  });

  // Orders in delete range preview
  const deleteRangeOrders = orders.filter((o) => {
    if (!deleteStartDate || !deleteEndDate || !o.created_at) return false;
    const orderDate = new Date(o.created_at);
    return (
      orderDate >= new Date(deleteStartDate + 'T00:00:00') &&
      orderDate <= new Date(deleteEndDate + 'T23:59:59')
    );
  });

  const handleResetToday = async () => {
    setIsDeletingRecords(true);
    await resetRetailerTodayOrders(shop.id);
    await fetchOrders();
    setIsDeletingRecords(false);
    setShowResetTodayModal(false);
  };

  const handleDeleteDateRange = async () => {
    if (!deleteStartDate || !deleteEndDate) return;
    setIsDeletingRecords(true);
    await deleteRetailerOrdersByDateRange(shop.id, deleteStartDate + 'T00:00:00', deleteEndDate + 'T23:59:59');
    await fetchOrders();
    setIsDeletingRecords(false);
    setShowDeleteRangeModal(false);
  };

  const handleConfirmDeleteOrder = async () => {
    if (!orderToDelete) return;
    setIsDeletingOrder(true);
    await deleteOrder(orderToDelete.id);
    setOrders((prev) => prev.filter((o) => String(o.id) !== String(orderToDelete.id)));
    setIsDeletingOrder(false);
    setOrderToDelete(null);
  };

  // Filter reviews by selected product
  const filteredReviews = reviews.filter((r) => {
    if (selectedProductFilter === 'all') return true;
    return String(r.product_id) === String(selectedProductFilter);
  });

  const avgReviewScore = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="retailer-wrapper" data-theme={theme}>
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
            onClick={() => navigate(`/store/${shop.id}`)}
            title="View store as customer"
          >
            <Eye size={16} />
            <span>Customer View</span>
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
              <p>Collected Revenue</p>
              {pendingRevenue > 0 && (
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold-light)', display: 'block', marginTop: '2px' }}>
                  +${pendingRevenue.toFixed(2)} in delivery
                </span>
              )}
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
            {/* TIMEFRAME FILTER TOOLBAR & MAINTENANCE ACTIONS */}
            <div className="orders-timeframe-toolbar">
              <div className="timeframe-chips">
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: '700', marginRight: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Filter By:
                </span>
                {[
                  { id: 'today', label: 'Today' },
                  { id: 'week', label: 'Last 7 Days' },
                  { id: 'month', label: 'This Month' },
                  { id: 'all', label: 'All Time' },
                  { id: 'custom', label: 'Custom Range 📅' }
                ].map((tf) => (
                  <button
                    key={tf.id}
                    type="button"
                    className={`timeframe-btn ${timeframe === tf.id ? 'active' : ''}`}
                    onClick={() => setTimeframe(tf.id)}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>

              {/* RECORD MANAGEMENT BUTTONS: RESET TODAY & DELETE BY DATE */}
              <div className="order-manage-actions">
                <button
                  type="button"
                  className="manage-action-btn reset"
                  onClick={() => setShowResetTodayModal(true)}
                  title="Clear all orders received today"
                >
                  <RotateCcw size={13} />
                  <span>Reset Today's Orders</span>
                </button>

                <button
                  type="button"
                  className="manage-action-btn delete"
                  onClick={() => setShowDeleteRangeModal(true)}
                  title="Delete order history records by date window"
                >
                  <Trash2 size={13} />
                  <span>Delete by Date</span>
                </button>
              </div>
            </div>

            {/* CUSTOM DATE RANGE PICKER (VISIBLE WHEN TIMEFRAME === 'CUSTOM') */}
            {timeframe === 'custom' && (
              <div className="custom-range-picker-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={15} color="var(--accent-gold)" />
                  <strong>Filter Custom Date Window:</strong>
                </div>
                <label>
                  From:
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                  />
                </label>
                <label>
                  To:
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                  />
                </label>
                {(customStartDate || customEndDate) && (
                  <button
                    type="button"
                    onClick={() => {
                      setCustomStartDate('');
                      setCustomEndDate('');
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      textDecoration: 'underline'
                    }}
                  >
                    Clear dates
                  </button>
                )}
              </div>
            )}

            <div className="orders-pipeline-header">
              <h3 style={{ fontSize: '1.2rem' }}>
                Incoming Orders & Fulfillment Queue
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '400', marginLeft: '8px' }}>
                  ({filteredOrders.length} in timeframe)
                </span>
              </h3>

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
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                          {order.status === 'Completed' ? 'Cash Collected' : 'Cash Due on Delivery'}
                        </span>
                        <span style={{ fontSize: '1.2rem', color: order.status === 'Completed' ? 'var(--accent-emerald)' : 'var(--text-primary)' }}>
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
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                            <div style={{
                              background: 'rgba(245, 158, 11, 0.1)',
                              border: '1px dashed rgba(245, 158, 11, 0.35)',
                              borderRadius: '6px',
                              padding: '6px 8px',
                              fontSize: '0.74rem',
                              color: 'var(--accent-gold-light)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}>
                              <span>Awaiting Customer PIN</span>
                              {order.delivery_otp && (
                                <span style={{ fontWeight: '800', fontFamily: 'monospace', color: '#fbbf24' }}>
                                  PIN: {order.delivery_otp}
                                </span>
                              )}
                            </div>
                            <button
                              className="action-btn complete"
                              onClick={() => handleStatusAdvance(order.id, 'Completed')}
                              title="Manually confirm if customer verified receipt"
                            >
                              <CheckCircle size={14} />
                              <span>Confirm Cash Collected (${Number(order.total_price).toFixed(2)})</span>
                            </button>
                          </div>
                        )}

                        {order.status === 'Completed' && (
                          <div style={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '0.78rem',
                            color: 'var(--accent-emerald)',
                            padding: '6px',
                            fontWeight: '600',
                            background: 'rgba(16, 185, 129, 0.08)',
                            borderRadius: '6px'
                          }}>
                            ✓ Cash Paid & Revenue Accounted
                          </div>
                        )}
                      </div>

                      {/* ORDER CARD BOTTOM FOOTER: CANCEL / DELETE BIN ACTION */}
                      <div className="order-card-footer">
                        <button
                          type="button"
                          className="order-card-delete-btn"
                          onClick={() => setOrderToDelete(order)}
                          title={`Cancel or Delete Ticket #${order.id}`}
                        >
                          <Trash2 size={13} />
                          <span>Cancel / Delete Order</span>
                        </button>
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
                  src={bannerPreview || shop.banner_url}
                  alt={shop.shop_name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
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

              {/* LOCAL DEVICE / MOBILE GALLERY FILE UPLOAD AREA */}
              <div style={{ marginBottom: '24px' }}>
                <label className="form-label" style={{ marginBottom: '8px', display: 'block', marginTop: '24px' }}>
                  Upload Banner from Mobile Gallery or Computer
                </label>

                <div
                  className="banner-dropzone"
                  onClick={() => document.getElementById('retailer-banner-file-input').click()}
                >
                  <input
                    type="file"
                    id="retailer-banner-file-input"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleBannerFileSelect}
                  />
                  <Upload size={36} color="var(--accent-gold)" style={{ margin: '0 auto 10px' }} />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '4px' }}>
                    Tap to Choose Photo from Gallery
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 12px' }}>
                    Select any photo from your phone's photo library or computer. The image is automatically optimized for fast storefront loading across all devices.
                  </p>
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ pointerEvents: 'none', margin: '0 auto', fontSize: '0.82rem' }}
                  >
                    <FileImage size={15} />
                    <span>Browse Photo Library</span>
                  </button>
                </div>

                {/* Save Banner Action Button */}
                {bannerPreview && bannerPreview !== shop.banner_url && (
                  <div style={{ marginTop: '16px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleSaveBanner}
                      disabled={isSavingBanner}
                      style={{ minWidth: '200px', justifyContent: 'center' }}
                    >
                      {isSavingBanner ? 'Saving...' : bannerSavedSuccess ? (
                        <>
                          <Check size={16} />
                          <span>Banner Saved & Published!</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle size={16} />
                          <span>Save & Publish Banner</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setBannerPreview(shop.banner_url)}
                      style={{ fontSize: '0.82rem' }}
                    >
                      Revert Changes
                    </button>
                  </div>
                )}

                {bannerSavedSuccess && (
                  <div
                    style={{
                      marginTop: '12px',
                      fontSize: '0.85rem',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(16, 185, 129, 0.25)'
                    }}
                  >
                    <CheckCircle size={16} />
                    <span>Storefront banner updated and is immediately live across the Digital Mall!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: RESET TODAY'S ORDERS CONFIRMATION */}
      {showResetTodayModal && (
        <div className="modal-backdrop" onClick={() => setShowResetTodayModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', color: '#d97706' }}>
                <RotateCcw size={18} />
                Reset Today's Orders
              </h3>
              <button className="close-drawer-btn" onClick={() => setShowResetTodayModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                Are you sure you want to clear all incoming orders placed <strong>today</strong> for <strong>{shop.shop_name}</strong>?
              </p>
              <div style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px',
                fontSize: '0.84rem'
              }}>
                <div>Orders to be reset: <strong>{todayOrders.length}</strong></div>
                <div style={{ marginTop: '4px', color: 'var(--text-muted)' }}>
                  This clears today's fulfillment queue and resets today's stats. This action cannot be undone.
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowResetTodayModal(false)}
                  style={{ flex: 1, justifyContent: 'center' }}
                  disabled={isDeletingRecords}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleResetToday}
                  disabled={isDeletingRecords || todayOrders.length === 0}
                  style={{
                    flex: 1.4,
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #d97706, #b45309)',
                    borderColor: '#b45309'
                  }}
                >
                  {isDeletingRecords ? 'Resetting...' : `Reset ${todayOrders.length} Order(s)`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DELETE BY DATE RANGE */}
      {showDeleteRangeModal && (
        <div className="modal-backdrop" onClick={() => setShowDeleteRangeModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626' }}>
                <Trash2 size={18} />
                Delete Records by Date Range
              </h3>
              <button className="close-drawer-btn" onClick={() => setShowDeleteRangeModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Select the date window to permanently purge past order records for <strong>{shop.shop_name}</strong>:
              </p>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    From Date
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    value={deleteStartDate}
                    onChange={(e) => setDeleteStartDate(e.target.value)}
                    style={{ width: '100%', fontSize: '0.85rem' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    To Date
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    value={deleteEndDate}
                    onChange={(e) => setDeleteEndDate(e.target.value)}
                    style={{ width: '100%', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {deleteStartDate && deleteEndDate && (
                <div style={{
                  background: deleteRangeOrders.length > 0 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid',
                  borderColor: deleteRangeOrders.length > 0 ? 'rgba(239, 68, 68, 0.25)' : 'var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '16px',
                  fontSize: '0.84rem'
                }}>
                  <div>Matching Orders to Delete: <strong>{deleteRangeOrders.length}</strong></div>
                  <div style={{ marginTop: '2px', color: 'var(--text-muted)' }}>
                    Total value: ${deleteRangeOrders.reduce((a, b) => a + Number(b.total_price || 0), 0).toFixed(2)}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowDeleteRangeModal(false)}
                  style={{ flex: 1, justifyContent: 'center' }}
                  disabled={isDeletingRecords}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleDeleteDateRange}
                  disabled={isDeletingRecords || !deleteStartDate || !deleteEndDate || deleteRangeOrders.length === 0}
                  style={{
                    flex: 1.4,
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                    borderColor: '#b91c1c'
                  }}
                >
                  {isDeletingRecords ? 'Deleting...' : `Delete ${deleteRangeOrders.length} Record(s)`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CANCEL & DELETE ORDER CONFIRMATION */}
      {orderToDelete && (
        <div className="modal-backdrop" onClick={() => !isDeletingOrder && setOrderToDelete(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626' }}>
                <Trash2 size={18} />
                Cancel & Delete Order
              </h3>
              <button
                className="close-drawer-btn"
                onClick={() => !isDeletingOrder && setOrderToDelete(null)}
                disabled={isDeletingOrder}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>
                Are you sure you want to cancel and permanently delete <strong>Ticket #{orderToDelete.id}</strong> from your fulfillment queue?
              </p>

              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '14px',
                marginBottom: '16px',
                fontSize: '0.84rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Customer:</span>
                  <strong>{orderToDelete.customer_name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Phone:</span>
                  <span>{orderToDelete.customer_phone}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
                  <strong style={{ color: 'var(--accent-gold)' }}>${Number(orderToDelete.total_price).toFixed(2)}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Items:</span>
                  <span style={{ fontWeight: '600' }}>
                    {orderToDelete.items?.map((it) => `${it.quantity}x ${it.name}`).join(', ') || 'No item detail'}
                  </span>
                </div>
              </div>

              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: '6px',
                padding: '10px 12px',
                fontSize: '0.78rem',
                color: '#ef4444',
                lineHeight: 1.4
              }}>
                ⚠️ This will cancel and permanently purge this order ticket from both live operations and analytics.
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setOrderToDelete(null)}
                disabled={isDeletingOrder}
              >
                Keep Order
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleConfirmDeleteOrder}
                disabled={isDeletingOrder}
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  borderColor: '#b91c1c'
                }}
              >
                <Trash2 size={14} />
                <span>{isDeletingOrder ? 'Deleting...' : 'Confirm Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetailerDashboard;
