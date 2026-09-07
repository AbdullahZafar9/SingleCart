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
  DollarSign
} from 'lucide-react';
import { getRevenueAnalytics, getShops, subscribeToOrders } from '../../Data/mallStore';
import RevenueAnalytics from './RevenueAnalytics';
import TenantDirectory from './TenantDirectory';
import CreateShopModal from './CreateShopModal';
import '../../CSS/admin.css';

const AdminDashboard = ({ adminUser, onLogout }) => {
  const navigate = useNavigate();
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchDashboardData = async () => {
    const [analyticsData, shopsData] = await Promise.all([
      getRevenueAnalytics(),
      getShops()
    ]);
    setAnalytics(analyticsData);
    setShops(shopsData);
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
    <div className="admin-wrapper">
      <header className="admin-header">
        <div className="admin-brand-wrap">
          <div className="admin-badge-icon">
            <ShieldCheck size={22} />
          </div>
          <div className="admin-title-box">
            <h2>SingleCart Operations Center</h2>
            <span>Global Mall Command & Revenue Aggregator</span>
          </div>
        </div>

        <div className="admin-header-actions">
          <button
            className="btn-create-shop"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={16} />
            <span>Onboard Retailer</span>
          </button>

          <button
            className="portal-link-btn"
            onClick={() => navigate('/')}
          >
            <span>Customer Mall</span>
          </button>

          <button
            className="portal-link-btn"
            onClick={() => {
              if (onLogout) onLogout();
              navigate('/admin/login');
            }}
            style={{ color: 'var(--accent-rose)' }}
          >
            <LogOut size={16} />
            <span>Exit Command</span>
          </button>
        </div>
      </header>

      <main className="admin-container">
        {/* EXECUTIVE KPI CARDS */}
        <div className="admin-kpis-grid">
          <div className="admin-kpi-card">
            <div className="kpi-top-row">
              <span className="kpi-title">Gross Mall Volume</span>
              <DollarSign className="kpi-icon" color="var(--accent-gold)" />
            </div>
            <span className="kpi-value" style={{ color: 'var(--accent-gold)' }}>
              ${analytics.mallTotalRevenue.toFixed(2)}
            </span>
            <span className="kpi-subtext">Completed sales across all tenants</span>
          </div>

          <div className="admin-kpi-card">
            <div className="kpi-top-row">
              <span className="kpi-title">Completed Orders</span>
              <Package className="kpi-icon" color="var(--accent-emerald)" />
            </div>
            <span className="kpi-value" style={{ color: 'var(--accent-emerald)' }}>
              {analytics.totalCompletedOrders}
            </span>
            <span className="kpi-subtext">Successfully fulfilled customer tickets</span>
          </div>

          <div className="admin-kpi-card">
            <div className="kpi-top-row">
              <span className="kpi-title">Active Order Pipeline</span>
              <Clock className="kpi-icon" color="var(--accent-blue)" />
            </div>
            <span className="kpi-value" style={{ color: 'var(--accent-blue)' }}>
              {analytics.activePendingOrders}
            </span>
            <span className="kpi-subtext">In-flight / preparing tickets</span>
          </div>

          <div className="admin-kpi-card">
            <div className="kpi-top-row">
              <span className="kpi-title">Active Tenants</span>
              <Store className="kpi-icon" color="#8b5cf6" />
            </div>
            <span className="kpi-value" style={{ color: '#a78bfa' }}>
              {shops.length}
            </span>
            <span className="kpi-subtext">Operational digital mall storefronts</span>
          </div>

          <div className="admin-kpi-card">
            <div className="kpi-top-row">
              <span className="kpi-title">Avg. Ticket Size</span>
              <TrendingUp className="kpi-icon" color="var(--text-secondary)" />
            </div>
            <span className="kpi-value">
              ${analytics.avgOrderValue.toFixed(2)}
            </span>
            <span className="kpi-subtext">Average spend per finalized order</span>
          </div>
        </div>

        {/* REVENUE PER BOUTIQUE ANALYTICS */}
        <RevenueAnalytics analytics={analytics} />

        {/* TENANT DIRECTORY TABLE */}
        <TenantDirectory shops={shops} />
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
