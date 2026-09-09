import React, { useState } from 'react';
import {
  Store,
  User,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Layers,
  Sparkles,
  AlertCircle
} from 'lucide-react';

const StoreApplicationsSection = ({
  applications = [],
  onApproveApplication,
  onDeclineApplication
}) => {
  const [filterStatus, setFilterStatus] = useState('Pending'); // 'All' | 'Pending' | 'Approved' | 'Rejected'
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering
  const filtered = applications.filter((app) => {
    const matchesStatus =
      filterStatus === 'All' || (app.status || 'Pending').toLowerCase() === filterStatus.toLowerCase();

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (app.store_name && app.store_name.toLowerCase().includes(q)) ||
      (app.applicant_name && app.applicant_name.toLowerCase().includes(q)) ||
      (app.email && app.email.toLowerCase().includes(q)) ||
      (app.phone && app.phone.toLowerCase().includes(q)) ||
      (app.department && app.department.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  const pendingCount = applications.filter(
    (a) => (a.status || 'Pending').toLowerCase() === 'pending'
  ).length;

  return (
    <section className="applications-section">
      <div className="applications-header">
        <div className="applications-title-group">
          <div className="applications-badge-icon">
            <Store size={22} />
          </div>
          <div>
            <h3>Retailer Registration Applications</h3>
            <p className="applications-subtitle">
              Review incoming store requests submitted by prospective retailers, inspect brand details, and provision credentials.
            </p>
          </div>
        </div>

        {pendingCount > 0 && (
          <div className="pending-alert-badge">
            <Sparkles size={14} />
            <span>{pendingCount} Pending Action</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="applications-filter-bar">
        <div className="app-filter-chips">
          {['Pending', 'All', 'Approved', 'Rejected'].map((status) => {
            const count =
              status === 'All'
                ? applications.length
                : applications.filter(
                    (a) => (a.status || 'Pending').toLowerCase() === status.toLowerCase()
                  ).length;

            return (
              <button
                key={status}
                className={`app-filter-chip ${filterStatus === status ? 'active' : ''}`}
                onClick={() => setFilterStatus(status)}
              >
                <span>{status}</span>
                <span className="chip-count">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="app-search-wrap">
          <Search size={15} className="app-search-icon" />
          <input
            type="text"
            className="app-search-input"
            placeholder="Search by store name, owner, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Applications Cards Grid */}
      {filtered.length === 0 ? (
        <div className="applications-empty-state">
          <AlertCircle size={38} className="empty-icon" />
          <h4>No {filterStatus !== 'All' ? filterStatus : ''} Applications Found</h4>
          <p>
            {searchQuery
              ? 'No retailer applications matched your current search criteria.'
              : filterStatus === 'Pending'
              ? 'All incoming boutique applications have been reviewed! New requests will appear here.'
              : 'No applications found in this status category.'}
          </p>
        </div>
      ) : (
        <div className="applications-grid">
          {filtered.map((app) => {
            const status = (app.status || 'Pending').toLowerCase();

            return (
              <div key={app.id} className={`application-card status-${status}`}>
                {/* Card Top: Store Name & Status */}
                <div className="app-card-header">
                  <div>
                    <div className="app-dept-pill">
                      <Layers size={12} />
                      <span>{app.department || 'Boutique'}</span>
                    </div>
                    <h4 className="app-store-name">{app.store_name}</h4>
                  </div>

                  <span className={`app-status-badge ${status}`}>
                    {status === 'pending' && 'Pending Review'}
                    {status === 'approved' && 'Approved & Active'}
                    {status === 'rejected' && 'Declined'}
                  </span>
                </div>

                {/* Applicant Info Grid */}
                <div className="app-info-grid">
                  <div className="app-info-item">
                    <span className="info-label">
                      <User size={12} />
                      Owner / Representative
                    </span>
                    <strong className="info-val">{app.applicant_name || 'N/A'}</strong>
                  </div>

                  <div className="app-info-item">
                    <span className="info-label">
                      <Mail size={12} />
                      Business Email
                    </span>
                    <strong className="info-val">{app.email}</strong>
                  </div>

                  <div className="app-info-item">
                    <span className="info-label">
                      <Phone size={12} />
                      Mobile / WhatsApp
                    </span>
                    <strong className="info-val">{app.phone}</strong>
                  </div>

                  <div className="app-info-item">
                    <span className="info-label">
                      <Clock size={12} />
                      Applied Date
                    </span>
                    <strong className="info-val">
                      {app.created_at
                        ? new Date(app.created_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'Recently'}
                    </strong>
                  </div>
                </div>

                {/* Store Story / Description */}
                {app.description && (
                  <div className="app-desc-box">
                    <p>{app.description}</p>
                  </div>
                )}

                {/* Card Actions */}
                <div className="app-card-actions">
                  {status === 'pending' ? (
                    <>
                      <button
                        type="button"
                        className="btn-approve-app"
                        onClick={() => onApproveApplication && onApproveApplication(app)}
                      >
                        <CheckCircle size={15} />
                        <span>Approve & Provision Store</span>
                      </button>

                      <button
                        type="button"
                        className="btn-decline-app"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to decline the application for "${app.store_name}"?`
                            )
                          ) {
                            onDeclineApplication && onDeclineApplication(app.id);
                          }
                        }}
                      >
                        <XCircle size={15} />
                        <span>Decline</span>
                      </button>
                    </>
                  ) : status === 'approved' ? (
                    <div className="app-result-badge approved">
                      <CheckCircle size={15} />
                      <span>Store provisioned and operational in the Virtual Mall</span>
                    </div>
                  ) : (
                    <div className="app-result-badge rejected">
                      <XCircle size={15} />
                      <span>Application was declined</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default StoreApplicationsSection;
