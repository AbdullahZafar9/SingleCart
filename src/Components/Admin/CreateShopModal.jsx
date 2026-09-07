import React, { useState } from 'react';
import { X, Plus, Store, MapPin, Phone, Mail, Lock, Layers } from 'lucide-react';
import { createShop } from '../../Data/mallStore';

const DEPARTMENT_OPTIONS = [
  { id: 'fashion', name: 'Fashion & Apparel' },
  { id: 'cafes', name: 'Cafes & Dining' },
  { id: 'tech', name: 'Electronics & Tech' },
  { id: 'beauty', name: 'Beauty & Fragrance' },
  { id: 'home', name: 'Home & Living' }
];

const CreateShopModal = ({ isOpen, onClose, onShopCreated }) => {
  const [shopName, setShopName] = useState('');
  const [department, setDepartment] = useState('Fashion & Apparel');
  const [locationInMall, setLocationInMall] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('vendor123');
  const [description, setDescription] = useState('');
  const [bannerUrl, setBannerUrl] = useState('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shopName.trim()) return;

    setIsSubmitting(true);

    const matchedDept = DEPARTMENT_OPTIONS.find(d => d.name === department) || DEPARTMENT_OPTIONS[0];

    const newShop = await createShop({
      shop_name: shopName.trim(),
      department: department,
      category: matchedDept.id,
      location_in_mall: locationInMall.trim() || 'Virtual Online Boutique',
      phone: phone.trim() || '+1 (555) 123-4567',
      description: description.trim() || 'Curated brand boutique inside SingleCart Digital Mall.',
      banner_url: bannerUrl,
      accent_color: '#f59e0b',
      delivery_estimated: '1-3 Business Days'
    });

    setIsSubmitting(false);
    onClose();
    if (onShopCreated) onShopCreated(newShop);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Onboard New Mall Retailer</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Provision vendor storefront credentials and directory placement
            </span>
          </div>
          <button className="close-drawer-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <div className="form-group">
              <label className="form-label">
                <Store size={13} style={{ display: 'inline', marginRight: '6px' }} />
                Boutique / Storefront Name
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

            <div className="form-group">
              <label className="form-label">
                <Layers size={13} style={{ display: 'inline', marginRight: '6px' }} />
                Mall Department
              </label>
              <select
                className="form-input"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {DEPARTMENT_OPTIONS.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <MapPin size={13} style={{ display: 'inline', marginRight: '6px' }} />
                Storefront Profile / Location
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Virtual Online Boutique or Flagship"
                value={locationInMall}
                onChange={(e) => setLocationInMall(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Phone size={13} style={{ display: 'inline', marginRight: '6px' }} />
                Store Contact Phone
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., +1 (555) 302-8819"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

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

            <div className="form-group">
              <label className="form-label">Store Description</label>
              <textarea
                className="form-input"
                rows={2}
                placeholder="Brief summary of signature products, menu specialty, or aesthetic..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Banner Image URL</label>
              <input
                type="url"
                className="form-input"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-create-shop"
              disabled={isSubmitting}
            >
              <Plus size={16} />
              <span>{isSubmitting ? 'Provisioning...' : 'Provision Storefront'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShopModal;
