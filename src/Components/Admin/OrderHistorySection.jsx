import React, { useState, useMemo } from 'react';
import {
  History,
  Calendar,
  DollarSign,
  Package,
  CheckCircle2,
  Clock,
  TrendingUp,
  Trash2,
  Search,
  Store,
  Filter
} from 'lucide-react';
import ClearDataModal from './ClearDataModal';

const OrderHistorySection = ({ orders = [], shops = [], onDataCleared }) => {
  const [timeframe, setTimeframe] = useState('day'); // 'day' | 'week' | 'month' | 'year' | 'custom'
  const todayStr = new Date().toISOString().split('T')[0];
  const [fromDate, setFromDate] = useState(todayStr);
  const [toDate, setToDate] = useState(todayStr);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  // Shop Map for quick retailer name lookup
  const shopMap = useMemo(() => {
    const map = {};
    shops.forEach((s) => {
      map[s.id] = s;
    });
    return map;
  }, [shops]);

  // Determine time boundary based on selected timeframe
  const { startTime, endTime, timeframeLabel } = useMemo(() => {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    let start = new Date();
    let label = 'Current Day';

    if (timeframe === 'day') {
      start.setHours(0, 0, 0, 0);
      label = `Today (${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})`;
    } else if (timeframe === 'week') {
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      start.setHours(0, 0, 0, 0);
      label = 'Past 7 Days';
    } else if (timeframe === 'month') {
      start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      start.setHours(0, 0, 0, 0);
      label = 'Past 30 Days';
    } else if (timeframe === 'year') {
      start = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      start.setHours(0, 0, 0, 0);
      label = 'Past 12 Months';
    } else if (timeframe === 'custom') {
      start = fromDate ? new Date(`${fromDate}T00:00:00`) : new Date(0);
      const customEnd = toDate ? new Date(`${toDate}T23:59:59.999`) : new Date();
      label = `${fromDate || 'Start'} to ${toDate || 'End'}`;
      return { startTime: start.getTime(), endTime: customEnd.getTime(), timeframeLabel: label };
    }

    return { startTime: start.getTime(), endTime: end.getTime(), timeframeLabel: label };
  }, [timeframe, fromDate, toDate]);

  // Filter orders by time range
  const timeFilteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const orderTime = new Date(o.created_at).getTime();
      return orderTime >= startTime && orderTime <= endTime;
    });
  }, [orders, startTime, endTime]);

  // Metrics for selected timeframe
  const metrics = useMemo(() => {
    let revenue = 0;
    let completed = 0;
    let active = 0;

    timeFilteredOrders.forEach((o) => {
      if (o.status === 'Completed') {
        revenue += Number(o.total_price) || 0;
        completed += 1;
      } else if (o.status === 'Pending' || o.status === 'Preparing') {
        active += 1;
      }
    });

    const aov = completed > 0 ? revenue / completed : 0;

    return {
      revenue,
      total: timeFilteredOrders.length,
      completed,
      active,
      aov
    };
  }, [timeFilteredOrders]);

  // Search & Status filter for the displayed table
  const displayedOrders = useMemo(() => {
    return timeFilteredOrders.filter((o) => {
      if (statusFilter !== 'all' && o.status !== statusFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const shop = shopMap[o.retailer_id];
        const shopName = (shop?.shop_name || '').toLowerCase();
        const customer = (o.customer_name || '').toLowerCase();
        const orderId = String(o.id).toLowerCase();

        return shopName.includes(q) || customer.includes(q) || orderId.includes(q);
      }

      return true;
    });
  }, [timeFilteredOrders, statusFilter, searchQuery, shopMap]);

  return (
    <div className="history-section">
      {/* Header */}
      <div className="history-header">
        <div className="history-title-group">
          <div className="history-badge-icon">
            <History size={20} />
          </div>
          <div>
            <h3>Order & Revenue History</h3>
            <p className="history-subtitle">
              Financial breakdown and transaction audit for {timeframeLabel}
            </p>
          </div>
        </div>

        {/* Clear Data Button */}
        <div className="history-action-group">
          <button
            className="btn-clear-history"
            onClick={() => setIsClearModalOpen(true)}
            title="Clear and purge historical data"
          >
            <Trash2 size={15} />
            <span>Clear / Purge Data</span>
          </button>
        </div>
      </div>

      {/* Timeframe Filter Navigation */}
      <div className="history-timeframe-bar">
        <div className="timeframe-buttons">
          <button
            className={`timeframe-btn ${timeframe === 'day' ? 'active' : ''}`}
            onClick={() => setTimeframe('day')}
          >
            Current Day
          </button>
          <button
            className={`timeframe-btn ${timeframe === 'week' ? 'active' : ''}`}
            onClick={() => setTimeframe('week')}
          >
            Last Week
          </button>
          <button
            className={`timeframe-btn ${timeframe === 'month' ? 'active' : ''}`}
            onClick={() => setTimeframe('month')}
          >
            This Month
          </button>
          <button
            className={`timeframe-btn ${timeframe === 'year' ? 'active' : ''}`}
            onClick={() => setTimeframe('year')}
          >
            This Year
          </button>
          <button
            className={`timeframe-btn ${timeframe === 'custom' ? 'active' : ''}`}
            onClick={() => setTimeframe('custom')}
          >
            <Calendar size={13} />
            <span>Custom Date Range</span>
          </button>
        </div>

        {/* Custom Range Picker */}
        {timeframe === 'custom' && (
          <div className="custom-range-row">
            <div className="date-input-wrap">
              <label>From:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="history-date-input"
              />
            </div>
            <div className="date-input-wrap">
              <label>To:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="history-date-input"
              />
            </div>
          </div>
        )}
      </div>

      {/* Summary KPI Cards for Timeframe */}
      <div className="history-metrics-grid">
        <div className="history-metric-card">
          <div className="metric-header">
            <span>Period Revenue</span>
            <DollarSign size={16} className="metric-icon-gold" />
          </div>
          <span className="metric-value-highlight gold">
            ${metrics.revenue.toFixed(2)}
          </span>
          <span className="metric-footnote">Finalized sales in selected range</span>
        </div>

        <div className="history-metric-card">
          <div className="metric-header">
            <span>Total Orders</span>
            <Package size={16} className="metric-icon-blue" />
          </div>
          <span className="metric-value-highlight blue">
            {metrics.total}
          </span>
          <span className="metric-footnote">All order tickets placed</span>
        </div>

        <div className="history-metric-card">
          <div className="metric-header">
            <span>Completed Orders</span>
            <CheckCircle2 size={16} className="metric-icon-emerald" />
          </div>
          <span className="metric-value-highlight emerald">
            {metrics.completed}
          </span>
          <span className="metric-footnote">Successfully fulfilled</span>
        </div>

        <div className="history-metric-card">
          <div className="metric-header">
            <span>Active Pipeline</span>
            <Clock size={16} className="metric-icon-purple" />
          </div>
          <span className="metric-value-highlight purple">
            {metrics.active}
          </span>
          <span className="metric-footnote">Pending or preparing tickets</span>
        </div>

        <div className="history-metric-card">
          <div className="metric-header">
            <span>Avg. Order Value</span>
            <TrendingUp size={16} className="metric-icon-slate" />
          </div>
          <span className="metric-value-highlight slate">
            ${metrics.aov.toFixed(2)}
          </span>
          <span className="metric-footnote">Average ticket size</span>
        </div>
      </div>

      {/* Search & Filter Bar for Orders Table */}
      <div className="history-table-controls">
        <div className="history-search-wrap">
          <Search size={15} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search by order ID, customer, or storefront..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="history-search-input"
          />
        </div>

        <div className="history-filter-wrap">
          <Filter size={14} color="var(--text-muted)" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="history-status-select"
          >
            <option value="all">All Statuses</option>
            <option value="Completed">Completed Only</option>
            <option value="Pending">Pending Only</option>
            <option value="Preparing">Preparing Only</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="tenants-table-wrap">
        {displayedOrders.length === 0 ? (
          <div className="history-empty-state">
            <Package size={40} strokeWidth={1.5} color="var(--text-muted)" />
            <h4>No Orders Found</h4>
            <p>There are no order transactions recorded for the selected timeframe and filter criteria.</p>
          </div>
        ) : (
          <table className="tenants-table history-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date & Time</th>
                <th>Storefront</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((order) => {
                const shop = shopMap[order.retailer_id];
                const dateObj = new Date(order.created_at);
                const formattedDate = dateObj.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });
                const formattedTime = dateObj.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <tr key={order.id}>
                    <td>
                      <span className="order-id-badge">#{order.id}</span>
                    </td>
                    <td>
                      <div className="order-date-col">
                        <span className="date-main">{formattedDate}</span>
                        <span className="time-sub">{formattedTime}</span>
                      </div>
                    </td>
                    <td>
                      <div className="order-shop-col">
                        <Store size={13} color={shop?.accent_color || 'var(--accent-blue)'} />
                        <span className="order-shop-name">
                          {shop?.shop_name || `Store (${order.retailer_id})`}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="order-customer-col">
                        <strong className="customer-name">{order.customer_name}</strong>
                        {order.customer_phone && (
                          <span className="customer-phone">{order.customer_phone}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="order-items-badge">
                        {order.items?.length || 1} item{order.items?.length !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td>
                      <strong className="order-price-val">
                        ${(Number(order.total_price) || 0).toFixed(2)}
                      </strong>
                    </td>
                    <td>
                      <span
                        className={`status-pill ${
                          order.status === 'Completed'
                            ? 'completed'
                            : order.status === 'Preparing'
                            ? 'preparing'
                            : 'pending'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Clear Data Modal Popup */}
      <ClearDataModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        orders={orders}
        onDataCleared={(result) => {
          if (onDataCleared) onDataCleared(result);
        }}
      />
    </div>
  );
};

export default OrderHistorySection;
