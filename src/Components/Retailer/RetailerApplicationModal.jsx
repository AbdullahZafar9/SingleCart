import React, { useState } from 'react';
import {
  X,
  Store,
  Mail,
  Phone,
  User,
  Layers,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Send
} from 'lucide-react';
import { submitStoreApplication } from '../../Data/mallStore';

const DEPARTMENT_OPTIONS = [
  'Fashion & Apparel',
  'Streetwear & Sneakers',
  'Cafes & Dining',
  'Electronics & Tech',
  'Beauty & Fragrance',
  'Home & Living',
  'Jewelry & Luxury',
  'Custom'
];

const RetailerApplicationModal = ({ isOpen, onClose }) => {
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [storeName, setStoreName] = useState('');
  const [department, setDepartment] = useState('Fashion & Apparel');
  const [customDepartment, setCustomDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedStoreName, setSubmittedStoreName] = useState('');

  if (!isOpen) return null;

  const handleResetAndClose = () => {
    setApplicantName('');
    setEmail('');
    setPhone('');
    setStoreName('');
    setDepartment('Fashion & Apparel');
    setCustomDepartment('');
    setDescription('');
    setIsSubmitting(false);
    setIsSuccess(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!applicantName.trim() || !email.trim() || !phone.trim() || !storeName.trim()) {
      return;
    }
    if (department === 'Custom' && !customDepartment.trim()) {
      return;
    }

    setIsSubmitting(true);

    const effectiveDepartment = department === 'Custom'
      ? (customDepartment.trim() || 'Custom Boutique')
      : department;

    try {
      await submitStoreApplication({
        applicantName,
        email,
        phone,
        storeName,
        department: effectiveDepartment,
        description
      });

      setSubmittedStoreName(storeName);
      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting application:', err);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleResetAndClose}>
      <div
        className="modal-dialog"
        style={{ maxWidth: '560px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(234, 88, 12, 0.35)'
              }}
            >
              <Store size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>
                {isSuccess ? 'Application Received' : 'Apply to Open a Boutique'}
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                SingleCart Multi-Tenant Virtual Mall
              </span>
            </div>
          </div>

          <button className="close-drawer-btn" onClick={handleResetAndClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="modal-body" style={{ textAlign: 'center', padding: '36px 24px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px'
              }}
            >
              <CheckCircle size={36} />
            </div>

            <h4 style={{ fontSize: '1.35rem', fontWeight: '800', margin: '0 0 8px', color: 'var(--text-primary)' }}>
              Application Successfully Submitted!
            </h4>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '440px', margin: '0 auto 20px' }}>
              Your application for <strong style={{ color: 'var(--text-primary)' }}>{submittedStoreName}</strong> has been placed into the SingleCart Admin review queue.
            </p>

            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '0.84rem',
                color: 'var(--text-muted)',
                lineHeight: '1.5',
                textAlign: 'left',
                marginBottom: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', marginBottom: '4px' }}>
                <Sparkles size={16} />
                <span>What Happens Next?</span>
              </div>
              Once the mall administrator reviews and approves your boutique, your official login credentials will be dispatched directly to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>.
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={handleResetAndClose}
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              <span>Done & Return to Login</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ maxHeight: '72vh', overflowY: 'auto' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: '1.5', margin: '0 0 18px' }}>
                Join the premier virtual mall. Fill out your boutique details below — our operations team will review your application and provision your store credentials.
              </p>

              {/* Applicant Name */}
              <div className="form-group">
                <label className="form-label">
                  <User size={13} style={{ display: 'inline', marginRight: '6px' }} />
                  Owner / Representative Full Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Sarah Jenkins"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  required
                />
              </div>

              {/* Contact Information (Email & Phone side by side) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">
                    <Mail size={13} style={{ display: 'inline', marginRight: '6px' }} />
                    Business Email
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="sarah@brand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Phone size={13} style={{ display: 'inline', marginRight: '6px' }} />
                    Mobile / WhatsApp
                  </label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+1 (555) 234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Proposed Store Name */}
              <div className="form-group">
                <label className="form-label">
                  <Store size={13} style={{ display: 'inline', marginRight: '6px' }} />
                  Proposed Boutique / Store Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Maison & Linen Co."
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                />
              </div>

              {/* Department Selection */}
              <div className="form-group">
                <label className="form-label">
                  <Layers size={13} style={{ display: 'inline', marginRight: '6px' }} />
                  Primary Department / Category
                </label>
                <select
                  className="form-input"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  style={{ cursor: 'pointer' }}
                >
                  {DEPARTMENT_OPTIONS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Department Manual Input if Custom is Selected */}
              {department === 'Custom' && (
                <div className="form-group" style={{ marginTop: '-4px' }}>
                  <label className="form-label" style={{ color: 'var(--accent-terracotta)' }}>
                    Custom Department Name
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Artisanal Bakery, Luxury Watches & Horology, Vintage Vinyl & Books..."
                    value={customDepartment}
                    onChange={(e) => setCustomDepartment(e.target.value)}
                    required
                    autoFocus
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                    Enter the custom department or specialty category for your boutique.
                  </span>
                </div>
              )}

              {/* Store Description / Craft */}
              <div className="form-group">
                <label className="form-label">
                  Store Story & Product Offerings
                </label>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Briefly describe what signature items you will be showcasing in your SingleCart storefront..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleResetAndClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
                style={{ minWidth: '160px', justifyContent: 'center' }}
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Submit Application</span>
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

export default RetailerApplicationModal;
