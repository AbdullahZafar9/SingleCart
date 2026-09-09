import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  ExternalLink,
  Star,
  Mail,
  Phone,
  Trash2,
  AlertTriangle,
  Lock,
  X,
  CheckCircle
} from 'lucide-react';
import { deleteShop } from '../../Data/mallStore';

const TenantDirectory = ({ shops = [], onShopDeleted }) => {
  const navigate = useNavigate();
  const [shopToDelete, setShopToDelete] = useState(null);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  const handleOpenDeleteModal = (shop) => {
    setShopToDelete(shop);
    setAdminPassword('');
    setPasswordError('');
  };

  const handleCloseDeleteModal = () => {
    setShopToDelete(null);
    setAdminPassword('');
    setPasswordError('');
    setIsDeleting(false);
  };

  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    if (!shopToDelete) return;

    const pass = adminPassword.trim();
    // Validate admin password
    if (pass !== 'qazi@123' && pass !== 'admin123') {
      setPasswordError('Authorization failed: Incorrect administrator password.');
      return;
    }

    setIsDeleting(true);
    try {
      const deletedShopName = shopToDelete.shop_name;
      const deletedId = shopToDelete.id;
      await deleteShop(deletedId);

      setSuccessToast(`Storefront "${deletedShopName}" was permanently deleted.`);
      setTimeout(() => setSuccessToast(''), 4000);

      handleCloseDeleteModal();
      if (onShopDeleted) onShopDeleted(deletedId);
    } catch (err) {
      console.error('Delete shop error:', err);
      setPasswordError('An error occurred while deleting the storefront.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="tenants-section">
      <div className="tenants-header">
        <div>
          <h3>Registered Mall Tenants Directory</h3>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.86rem' }}>
            Live status of active digital storefronts across the virtual mall
          </p>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--admin-gold)', fontWeight: '700' }}>
          {shops.length} Active Stores
        </span>
      </div>

      {successToast && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10b981',
            fontSize: '0.86rem',
            fontWeight: '600',
            marginBottom: '16px'
          }}
        >
          <CheckCircle size={16} />
          <span>{successToast}</span>
        </div>
      )}

      <div className="tenants-table-wrap">
        <table className="tenants-table">
          <thead>
            <tr>
              <th>Storefront</th>
              <th>Department</th>
              <th>Storefront Status</th>
              <th>Contact / Login Info</th>
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
                      <strong style={{ fontSize: '0.92rem', color: 'var(--admin-text-primary)' }}>
                        {shop.shop_name}
                      </strong>
                      <span style={{ display: 'block', fontSize: '0.74rem', color: 'var(--admin-text-muted)' }}>
                        ID: {shop.id}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="tenant-dept-pill">
                    {shop.department || shop.category}
                  </span>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', color: '#10b981' }}>
                    <ShieldCheck size={14} />
                    {shop.location_in_mall || 'Verified Online Store'}
                  </span>
                </td>

                <td>
                  <div style={{ fontSize: '0.78rem', color: 'var(--admin-text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Mail size={11} color="var(--admin-text-muted)" />
                      <span>{shop.email || 'manager@singlecart.com'}</span>
                    </div>
                    {shop.phone && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px', color: 'var(--admin-text-muted)' }}>
                        <Phone size={11} />
                        <span>{shop.phone}</span>
                      </div>
                    )}
                  </div>
                </td>

                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '700', color: '#fbbf24' }}>
                    <Star size={13} fill="#fbbf24" stroke="#fbbf24" />
                    {shop.rating || 5.0}
                  </span>
                </td>

                <td>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      className="tenant-action-btn view"
                      onClick={() => navigate(`/store/${shop.id}`)}
                      title="View Customer Storefront"
                    >
                      <ExternalLink size={12} />
                      <span>Customer View</span>
                    </button>

                    <button
                      className="tenant-action-btn delete"
                      onClick={() => handleOpenDeleteModal(shop)}
                      title={`Delete ${shop.shop_name}`}
                    >
                      <Trash2 size={12} />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {shopToDelete && (
        <div className="modal-backdrop" onClick={handleCloseDeleteModal}>
          <div
            className="modal-dialog"
            style={{ maxWidth: '480px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(239, 68, 68, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ef4444'
                  }}
                >
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--admin-text-primary)' }}>
                    Confirm Store Deletion
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>
                    Requires administrator authentication
                  </span>
                </div>
              </div>
              <button className="close-drawer-btn" onClick={handleCloseDeleteModal}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleConfirmDelete}>
              <div className="modal-body" style={{ padding: '20px' }}>
                <div className="delete-warning-box">
                  <strong className="delete-warning-title">
                    Permanent Action Warning
                  </strong>
                  <p className="delete-warning-text">
                    Are you sure you want to permanently delete <strong>"{shopToDelete.shop_name}"</strong> (ID: {shopToDelete.id})? All products and storefront listings will be removed.
                  </p>
                </div>

                {passwordError && (
                  <div
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#ef4444',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      marginBottom: '16px'
                    }}
                  >
                    {passwordError}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">
                    <Lock size={13} style={{ display: 'inline', marginRight: '6px' }} />
                    Enter Administrator Password to Confirm
                  </label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter your admin password"
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    required
                    autoFocus
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--admin-text-muted)', marginTop: '4px', display: 'block' }}>
                    Only verified mall administrators can delete tenant stores.
                  </span>
                </div>
              </div>

              <div className="modal-footer" style={{ padding: '16px 20px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseDeleteModal}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDeleting || !adminPassword.trim()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#dc2626',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                    opacity: isDeleting || !adminPassword.trim() ? 0.6 : 1,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Trash2 size={16} />
                  <span>{isDeleting ? 'Deleting...' : 'Confirm & Delete Store'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDirectory;
