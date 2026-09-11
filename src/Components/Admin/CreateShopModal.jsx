import React, { useState } from 'react';
import {
  X,
  Store,
  Phone,
  Mail,
  Lock,
  Layers,
  CheckCircle,
  Copy,
  Check,
  ShieldCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { createShop, updateStoreApplicationStatus } from '../../Data/mallStore';
import { sendRetailerCredentialsEmail } from '../../Services/emailService';

const DEPARTMENT_OPTIONS = [
  { id: 'fashion', name: 'Fashion & Apparel' },
  { id: 'streetwear', name: 'Streetwear & Sneakers' },
  { id: 'cafes', name: 'Cafes & Dining' },
  { id: 'tech', name: 'Electronics & Tech' },
  { id: 'beauty', name: 'Beauty & Fragrance' },
  { id: 'home', name: 'Home & Living' },
  { id: 'luxury', name: 'Jewelry & Luxury' },
  { id: 'custom', name: 'Custom' }
];

const CreateShopModal = ({ isOpen, onClose, onShopCreated, initialData = null }) => {
  const [shopName, setShopName] = useState('');
  const [selectedDeptOption, setSelectedDeptOption] = useState('Fashion & Apparel');
  const [customDepartment, setCustomDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('vendor123');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (initialData && isOpen) {
      setShopName(initialData.storeName || initialData.store_name || '');
      setPhone(initialData.phone || '');
      setEmail(initialData.email || '');
      setDescription(initialData.description || '');

      const dept = initialData.department || 'Fashion & Apparel';
      const matched = DEPARTMENT_OPTIONS.find((d) => d.name.toLowerCase() === dept.toLowerCase() && d.id !== 'custom');
      if (matched) {
        setSelectedDeptOption(matched.name);
      } else {
        setSelectedDeptOption('Custom');
        setCustomDepartment(dept === 'Custom' ? '' : dept);
      }
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleResetAndClose = () => {
    setShopName('');
    setSelectedDeptOption('Fashion & Apparel');
    setCustomDepartment('');
    setPhone('');
    setEmail('');
    setPassword('vendor123');
    setDescription('');
    setIsSubmitting(false);
    setSuccessData(null);
    setCopied(false);
    onClose();
  };

  const handleCopyCredentials = () => {
    if (!successData) return;
    const credText = `SingleCart Retailer Credentials
---------------------------------
Store Name:     ${successData.shopName}
Department:     ${successData.department}
Mobile Number:  ${successData.phone}
Manager Email:  ${successData.email}
Password:       ${successData.password}
Portal URL:     ${window.location.origin}/retailer/login
---------------------------------
Log in using either your Email or Mobile Number.`;

    navigator.clipboard.writeText(credText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shopName.trim() || !email.trim() || !phone.trim() || !password.trim()) return;

    setIsSubmitting(true);

    const isCustom = selectedDeptOption === 'Custom' || selectedDeptOption === '+ Custom Department...';
    const effectiveDepartment = isCustom
      ? (customDepartment.trim() || 'Custom Boutique')
      : selectedDeptOption;

    const categorySlug = isCustom
      ? effectiveDepartment.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'general'
      : (DEPARTMENT_OPTIONS.find((d) => d.name === selectedDeptOption)?.id || 'fashion');

    try {
      // 1. Create shop in persistent store
      const newShop = await createShop({
        shop_name: shopName.trim(),
        department: effectiveDepartment,
        category: categorySlug,
        location_in_mall: 'Verified Online Store',
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
        description: description.trim() || 'Curated official brand store inside SingleCart Digital Mall.',
        accent_color: '#3b82f6',
        delivery_estimated: '1-3 Business Days'
      });

      // 2. Dispatch real email with credentials
      const emailResult = await sendRetailerCredentialsEmail({
        storeName: newShop.shop_name,
        department: effectiveDepartment,
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim(),
        loginUrl: `${window.location.origin}/retailer/login`,
        adminEmail: 'furqannasir561@gmail.com'
      });

      // 3. If tied to an application, mark application as Approved
      if (initialData && (initialData.id || initialData.applicationId)) {
        const appId = initialData.id || initialData.applicationId;
        await updateStoreApplicationStatus(appId, 'Approved');
      }

      setSuccessData({
        shopName: newShop.shop_name,
        department: effectiveDepartment,
        phone: phone.trim(),
        email: email.trim(),
        password: password.trim(),
        adminEmail: 'furqannasir561@gmail.com',
        emailResult,
        shop: newShop
      });

      if (onShopCreated) onShopCreated(newShop);
    } catch (err) {
      console.error('Failed to provision storefront:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleResetAndClose}>
      <div className="modal-dialog" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>
              {successData ? 'Storefront Successfully Provisioned' : 'Onboard New Mall Retailer'}
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {successData
                ? 'Storefront created & credentials generated'
                : 'Provision vendor online storefront & credentials'}
            </span>
          </div>
          <button className="close-drawer-btn" onClick={handleResetAndClose}>
            <X size={20} />
          </button>
        </div>

        {successData ? (
          <div className="modal-body" style={{ padding: '24px' }}>
            {successData.emailResult?.emailjsSent ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 18px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  marginBottom: '16px'
                }}
              >
                <CheckCircle size={26} style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.96rem', color: '#059669' }}>
                    ✓ Credentials Email Sent Automatically in Background!
                  </strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    Dispatched from <strong>furqannasir561@gmail.com</strong> directly to <strong>{successData.email}</strong> silently without opening any tabs.
                  </span>
                </div>
              </div>
            ) : (
              <div className="admin-warning-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '0.94rem' }}>
                  <Sparkles size={18} />
                  <span>Storefront Created & Credentials Ready</span>
                </div>
                <p style={{ fontSize: '0.82rem', margin: '8px 0 0', lineHeight: 1.5 }}>
                  Retailer login is active. For <strong>100% automated background email sending</strong> without opening Gmail, add your 3 free EmailJS keys to <code>.env</code>.
                </p>
              </div>
            )}

            <div className="admin-creds-card">
              <div className="creds-row">
                <span className="creds-label">Sender Admin:</span>
                <strong style={{ fontSize: '0.88rem', color: '#ea4335' }}>furqannasir561@gmail.com</strong>
              </div>

              <div className="creds-row">
                <span className="creds-label">Store Name:</span>
                <strong className="creds-val">{successData.shopName}</strong>
              </div>

              <div className="creds-row">
                <span className="creds-label">Department:</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--accent-gold)' }}>{successData.department}</span>
              </div>

              <div className="creds-row">
                <span className="creds-label">Recipient Email:</span>
                <strong className="creds-val">{successData.email}</strong>
              </div>

              <div className="creds-row">
                <span className="creds-label">Mobile Number:</span>
                <strong className="creds-val">{successData.phone}</strong>
              </div>

              <div className="creds-row last">
                <span className="creds-label">Access Password:</span>
                <code className="admin-creds-code">
                  {successData.password}
                </code>
              </div>
            </div>

            <div className="admin-info-card">
              <ShieldCheck size={18} style={{ flexShrink: 0 }} />
              <span>
                <strong>Dual-Identifier Login Enabled:</strong> Retailer can log in using <strong>either Email OR Mobile Number</strong> with this password.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCopyCredentials}
                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}
              >
                {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Credentials'}</span>
              </button>

              {successData.emailResult?.mailtoLink && (
                <a
                  href={successData.emailResult.mailtoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <Mail size={16} />
                  <span>Open in Mail App</span>
                </a>
              )}
            </div>

            <div style={{ marginTop: '16px' }}>
              <button
                type="button"
                className="btn-create-shop"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleResetAndClose}
              >
                <span>Done & View in Directory</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              {/* Store Name */}
              <div className="form-group">
                <label className="form-label">
                  <Store size={13} style={{ display: 'inline', marginRight: '6px' }} />
                  Store / Brand Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Nova Artisan Bakery"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  required
                />
              </div>

              {/* Mall Department with Custom Option */}
              <div className="form-group">
                <label className="form-label">
                  <Layers size={13} style={{ display: 'inline', marginRight: '6px' }} />
                  Mall Department
                </label>
                <select
                  className="form-input"
                  value={selectedDeptOption}
                  onChange={(e) => setSelectedDeptOption(e.target.value)}
                >
                  {DEPARTMENT_OPTIONS.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Department Input if Selected */}
              {(selectedDeptOption === 'Custom' || selectedDeptOption === '+ Custom Department...') && (
                <div className="form-group" style={{ marginTop: '-4px' }}>
                  <label className="form-label" style={{ color: 'var(--accent-gold)' }}>
                    Custom Department Name
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Luxury Watches & Jewelry, Artisanal Bakery, Organic Groceries..."
                    value={customDepartment}
                    onChange={(e) => setCustomDepartment(e.target.value)}
                    required
                    autoFocus
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                    This custom department will be displayed in the mall navigation and directory.
                  </span>
                </div>
              )}

              {/* Store Contact Mobile Number */}
              <div className="form-group">
                <label className="form-label">
                  <Phone size={13} style={{ display: 'inline', marginRight: '6px' }} />
                  Store Contact Phone / Mobile Number
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., +1 (555) 302-8819 or 03001234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                  Retailer can use this mobile number to log into their store terminal.
                </span>
              </div>

              {/* Email & Initial Password */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">
                    <Mail size={13} style={{ display: 'inline', marginRight: '6px' }} />
                    Retailer Manager Email
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="manager@novabakery.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span style={{ fontSize: '0.74rem', color: '#059669', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={12} /> Email will be sent from <strong>furqannasir561@gmail.com</strong>
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Lock size={13} style={{ display: 'inline', marginRight: '6px' }} />
                    Initial Password
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Store Description */}
              <div className="form-group">
                <label className="form-label">Store Description (Optional)</label>
                <textarea
                  className="form-input"
                  rows={2}
                  placeholder="Brief summary of signature products, brand heritage, or specialties..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Note on Online Store & Banner */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ShieldCheck size={16} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                <span>
                  <strong>Online Storefront:</strong> This store will be registered as a <em>Verified Online Store</em>. The retailer can customize their store banner directly within their own dashboard.
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleResetAndClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-create-shop"
                disabled={isSubmitting}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                    <span>Sending Credentials & Provisioning...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Provision Store & Send Credentials</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateShopModal;

