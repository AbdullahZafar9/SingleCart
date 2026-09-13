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
  Globe,
  Inbox
} from 'lucide-react';
import {
  getRevenueAnalytics,
  getShops,
  getOrders,
  subscribeToOrders,
  getStoreApplications,
  subscribeToApplications,
  updateStoreApplicationStatus
} from '../../Data/mallStore';
import RevenueAnalytics from './RevenueAnalytics';
import OrderHistorySection from './OrderHistorySection';
import TenantDirectory from './TenantDirectory';
import StoreApplicationsSection from './StoreApplicationsSection';
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
  const [applications, setApplications] = useState([]);
  const [activeAdminTab, setActiveAdminTab] = useState('history'); // 'history' | 'tenants' | 'applications'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAppForCreation, setSelectedAppForCreation] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e.detail && typeof e.detail === 'string') setTheme(e.detail);
    };
    window.addEventListener('sc:admin_theme_changed', handleThemeChange);
    return () => window.removeEventListener('sc:admin_theme_changed', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('sc_admin_theme', nextTheme);
    } catch (e) {}
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.dispatchEvent(new CustomEvent('sc:admin_theme_changed', { detail: nextTheme }));
  };

  const fetchDashboardData = async () => {
    const [analyticsData, shopsData, ordersData, applicationsData] = await Promise.all([
      getRevenueAnalytics(),
      getShops(),
      getOrders(),
      getStoreApplications()
    ]);
    setAnalytics(analyticsData);
    setShops(shopsData);
    setOrders(ordersData);
    setApplications(applicationsData || []);
  };

  useEffect(() => {
    fetchDashboardData();

    // Listen to order updates or shop creations in real time
    const unsubscribeOrders = subscribeToOrders(() => {
      fetchDashboardData();
    });

    const unsubscribeApps = subscribeToApplications(() => {
      fetchDashboardData();
    });

    const handleShopsUpdated = () => {
      fetchDashboardData();
    };

    window.addEventListener('sc:shops_updated', handleShopsUpdated);

    return () => {
      unsubscribeOrders();
      unsubscribeApps();
      window.removeEventListener('sc:shops_updated', handleShopsUpdated);
    };
  }, []);

  const pendingApplicationsCount = applications.filter(
    (a) => (a.status || 'Pending').toLowerCase() === 'pending'
  ).length;

  return (
    <div className="admin-wrapper" data-admin-theme={theme} data-theme={theme}>
      <header className="admin-header">
        <div className="admin-brand-wrap">
          <div className="admin-badge-icon">
            <ShieldCheck size={22} />
          </div>
          <div className="admin-title-box">
            <h2>SingleCart Operations Center</h2>
          </div>
        </div>

        <div className="admin-header-actions">
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

          {/* Customer View Portal */}
          <button
            className="portal-link-btn"
            onClick={() => navigate('/')}
            title="Browse Public Marketplace"
          >
            <Globe size={15} />
            <span>Customer View</span>
          </button>

          {/* Sign Out */}
          <button
            className="portal-link-btn logout-btn"
            onClick={() => {
              if (onLogout) onLogout();
              navigate('/admin/login');
            }}
            title="Sign Out"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
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

        {/* DASHBOARD TAB NAVIGATION & ACTION TOOLBAR */}
        <div className="admin-toolbar-row">
          <div className="admin-tabs-bar">
            <button
              className={`admin-tab-btn ${activeAdminTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveAdminTab('history')}
            >
              <TrendingUp size={16} />
              <span>Order History & Revenue</span>
            </button>

            <button
              className={`admin-tab-btn ${activeAdminTab === 'tenants' ? 'active' : ''}`}
              onClick={() => setActiveAdminTab('tenants')}
            >
              <Store size={16} />
              <span>Tenant Directory</span>
              <span className="tab-count-pill">{shops.length}</span>
            </button>

            <button
              className={`admin-tab-btn ${activeAdminTab === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveAdminTab('applications')}
            >
              <Inbox size={16} />
              <span>Store Applications</span>
              {pendingApplicationsCount > 0 ? (
                <span className="tab-pending-badge">
                  {pendingApplicationsCount} Pending
                </span>
              ) : (
                <span className="tab-count-pill">{applications.length}</span>
              )}
            </button>
          </div>

          <button
            className="btn-create-shop"
            onClick={() => {
              setSelectedAppForCreation(null);
              setIsCreateModalOpen(true);
            }}
          >
            <Plus size={16} />
            <span>Onboard Retailer</span>
          </button>
        </div>

        {/* ACTIVE TAB CONTENT VIEWS */}
        {activeAdminTab === 'history' && (
          <>
            {/* REVENUE PER STORE ANALYTICS */}
            <RevenueAnalytics analytics={analytics} />

            {/* ORDER & REVENUE HISTORY SECTION */}
            <OrderHistorySection
              orders={orders}
              shops={shops}
              onDataCleared={() => fetchDashboardData()}
            />
          </>
        )}

        {activeAdminTab === 'tenants' && (
          <TenantDirectory
            shops={shops}
            onShopDeleted={() => fetchDashboardData()}
            onOpenCreateModal={() => {
              setSelectedAppForCreation(null);
              setIsCreateModalOpen(true);
            }}
          />
        )}

        {activeAdminTab === 'applications' && (
          <StoreApplicationsSection
            applications={applications}
            onApproveApplication={(app) => {
              setSelectedAppForCreation(app);
              setIsCreateModalOpen(true);
            }}
            onDeclineApplication={async (appId) => {
              await updateStoreApplicationStatus(appId, 'Rejected');
              fetchDashboardData();
            }}
          />
        )}
      </main>

      {/* CREATE SHOP MODAL */}
      <CreateShopModal
        isOpen={isCreateModalOpen}
        initialData={selectedAppForCreation}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedAppForCreation(null);
        }}
        onShopCreated={() => {
          fetchDashboardData();
          setSelectedAppForCreation(null);
        }}
      />
    </div>
  );
};

export default AdminDashboard;
