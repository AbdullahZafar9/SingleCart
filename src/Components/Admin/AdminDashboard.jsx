import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Plus,
  TrendingUp,
  Package,
  Clock,
  Store,
  LogOut,
  DollarSign,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { getRevenueAnalytics, getShops, getOrders, subscribeToOrders } from '../../Data/mallStore';
import RevenueAnalytics from './RevenueAnalytics';
import OrderHistorySection from './OrderHistorySection';
import TenantDirectory from './TenantDirectory';
import CreateShopModal from './CreateShopModal';
import '../../CSS/admin.css';

const AdminDashboard = ({ adminUser, onLogout }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sc_admin_theme') || 'light';
  });

  const [analytics, setAnalytics] = useState({
    mallTotalRevenue: 0,
    totalCompletedOrders: 0,
    activePendingOrders: 0,
    totalOrdersPlaced: 0,
    totalShopsCount: 0,
    avgOrderValue: 0,
    shopStats: []
  });
  const [shops, setShops] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('sc_admin_theme', nextTheme);
  };

  const fetchDashboardData = async () => {
    const [analyticsData, shopsData, ordersData] = await Promise.all([
      getRevenueAnalytics(),
      getShops(),
      getOrders()
    ]);
    setAnalytics(analyticsData);
    setShops(shopsData);
    setOrders(ordersData);
  };

  useEffect(() => {
    fetchDashboardData();

    // Listen to order updates or shop creations in real time
    const unsubscribe = subscribeToOrders(() => {
      fetchDashboardData();
    });

    const handleShopsUpdated = () => {
      fetchDashboardData();
    };

    window.addEventListener('sc:shops_updated', handleShopsUpdated);

    return () => {
      unsubscribe();
      window.removeEventListener('sc:shops_updated', handleShopsUpdated);
    };
  }, []);

  return (
    <div className="admin-wrapper" data-admin-theme={theme}>
      <header className="admin-header">
        <div className="admin-brand-wrap">
          <div className="admin-badge-icon">
            <ShieldCheck size={22} />
          </div>
          <div className="admin-title-box">
            <h2>SingleCart Operations Center</h2>
            <div className="admin-status-pill">
              <span className="pulse-indicator"></span>
              <span>Global Mall Command &bull; Live</span>
            </div>
          </div>
        </div>

        <div className="admin-header-actions">
          {/* Executive Email Badge */}
          <div className="admin-user-badge">
            <ShieldCheck size={14} color="#10b981" />
            <span>Admin: <strong>{adminUser?.email || 'furqannasir561@gmail.com'}</strong></span>
          </div>

          {/* Theme Mode Toggle (Icon Only) */}
          <button
            className="theme-toggle-btn icon-only"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle admin color theme"
          >
            {theme === 'dark' ? (
              <Sun size={18} color="#f59e0b" />
            ) : (
              <Moon size={18} color="#6366f1" />
            )}
          </button>

          {/* Onboard Retailer */}
          <button
            className="btn-create-shop"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={16} />
            <span>Onboard Retailer</span>
          </button>

          {/* Customer Mall Portal */}
          <button
            className="portal-link-btn"
            onClick={() => navigate('/')}
            title="Browse Public Marketplace"
          >
            <Globe size={15} />
            <span>Customer Mall</span>
          </button>

          {/* Exit Command */}
          <button
            className="portal-link-btn logout-btn"
            onClick={() => {
              if (onLogout) onLogout();
              navigate('/admin/login');
            }}
            title="Exit Administrative Console"
          >
            <LogOut size={15} />
            <span>Exit Command</span>
          </button>
        </div>
      </header>

      <main className="admin-container">
        {/* EXECUTIVE KPI CARDS */}
        <div className="admin-kpis-grid">
          <div className="admin-kpi-card kpi-card-gold">
            <div className="kpi-top-row">
              <span className="kpi-title">Gross Mall Volume</span>
              <div className="kpi-icon-wrap gold">
                <DollarSign size={18} />
              </div>
            </div>
            <span className="kpi-value gold">
              ${analytics.mallTotalRevenue.toFixed(2)}
            </span>
            <span className="kpi-subtext">Completed sales across all tenants</span>
          </div>

          <div className="admin-kpi-card kpi-card-emerald">
            <div className="kpi-top-row">
              <span className="kpi-title">Completed Orders</span>
              <div className="kpi-icon-wrap emerald">
                <Package size={18} />
              </div>
            </div>
            <span className="kpi-value emerald">
              {analytics.totalCompletedOrders}
            </span>
            <span className="kpi-subtext">Successfully fulfilled customer tickets</span>
          </div>

          <div className="admin-kpi-card kpi-card-blue">
            <div className="kpi-top-row">
              <span className="kpi-title">Active Order Pipeline</span>
              <div className="kpi-icon-wrap blue">
                <Clock size={18} />
              </div>
            </div>
            <span className="kpi-value blue">
              {analytics.activePendingOrders}
            </span>
            <span className="kpi-subtext">In-flight / preparing tickets</span>
          </div>

          <div className="admin-kpi-card kpi-card-purple">
            <div className="kpi-top-row">
              <span className="kpi-title">Active Tenants</span>
              <div className="kpi-icon-wrap purple">
                <Store size={18} />
              </div>
            </div>
            <span className="kpi-value purple">
              {shops.length}
            </span>
            <span className="kpi-subtext">Operational digital mall storefronts</span>
          </div>

          <div className="admin-kpi-card kpi-card-slate">
            <div className="kpi-top-row">
              <span className="kpi-title">Avg. Ticket Size</span>
              <div className="kpi-icon-wrap slate">
                <TrendingUp size={18} />
              </div>
            </div>
            <span className="kpi-value">
              ${analytics.avgOrderValue.toFixed(2)}
            </span>
            <span className="kpi-subtext">Average spend per finalized order</span>
          </div>
        </div>

        {/* REVENUE PER STORE ANALYTICS */}
        <RevenueAnalytics analytics={analytics} />

        {/* ORDER & REVENUE HISTORY SECTION (DAY / WEEK / MONTH / YEAR / CUSTOM) */}
        <OrderHistorySection
          orders={orders}
          shops={shops}
          onDataCleared={() => fetchDashboardData()}
        />

        {/* TENANT DIRECTORY TABLE */}
        <TenantDirectory shops={shops} onShopDeleted={() => fetchDashboardData()} />
      </main>

      {/* CREATE SHOP MODAL */}
      <CreateShopModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onShopCreated={() => fetchDashboardData()}
      />
    </div>
  );
};

export default AdminDashboard;
