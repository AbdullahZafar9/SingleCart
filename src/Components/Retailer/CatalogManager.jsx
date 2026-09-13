import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Trash2, Check, X, Package, Star, MessageSquare, Mail, User, Camera, Upload, Image as ImageIcon, Pencil } from 'lucide-react';
import {
  getProducts,
  saveProduct,
  toggleProductStock,
  deleteProduct,
  getProductRatingSummary,
  getReviewsSync,
  subscribeToReviews
} from '../../Data/mallStore';

const CatalogManager = ({ retailerId, shopName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeReviewProduct, setActiveReviewProduct] = useState(null);
  const [, setReviewsTick] = useState(0);

  // New product form state
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newBadge, setNewBadge] = useState('✨ New Drop');
  const [newDesc, setNewDesc] = useState('');
  const [newImg, setNewImg] = useState('');
  const [imageError, setImageError] = useState('');

  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Edit product form state
  const [editingProduct, setEditingProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editBadge, setEditBadge] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editImg, setEditImg] = useState('');
  const [editImageError, setEditImageError] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const editGalleryInputRef = useRef(null);
  const editCameraInputRef = useRef(null);

  const processImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setImageError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }
    setImageError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
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
        const compressed = canvas.toDataURL('image/jpeg', 0.86);
        setNewImg(compressed);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
    e.target.value = '';
  };

  const handleCameraChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
    e.target.value = '';
  };

  const processEditImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setEditImageError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }
    setEditImageError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
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
        const compressed = canvas.toDataURL('image/jpeg', 0.86);
        setEditImg(compressed);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleEditGalleryChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processEditImageFile(file);
    e.target.value = '';
  };

  const handleEditCameraChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processEditImageFile(file);
    e.target.value = '';
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setEditName(product.name || '');
    setEditPrice(product.price !== undefined ? String(product.price) : '');
    setEditCategory(product.item_category || product.category || 'General');
    setEditBadge(product.badge || '');
    setEditDesc(product.description || '');
    setEditImg(product.image_url || '');
    setEditImageError('');
  };

  const handleSaveEditProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    if (!editName.trim() || !editPrice) return;
    if (!editImg) {
      setEditImageError('Product image is required.');
      return;
    }

    setIsSavingEdit(true);
    try {
      await saveProduct({
        id: editingProduct.id,
        retailer_id: retailerId,
        name: editName.trim(),
        price: parseFloat(editPrice) || 0,
        category: editCategory.trim() || 'General',
        item_category: editCategory.trim() || 'General',
        badge: editBadge.trim(),
        description: editDesc.trim(),
        image_url: editImg,
        in_stock: editingProduct.in_stock !== undefined ? editingProduct.in_stock : true
      });

      setEditingProduct(null);
      await fetchShopProducts();
    } catch (err) {
      console.error('Failed to update product:', err);
      setEditImageError('Failed to save changes. Please try again.');
    } finally {
      setIsSavingEdit(false);
    }
  };

  const fetchShopProducts = useCallback(async () => {
    setLoading(true);
    const prods = await getProducts(retailerId);
    setProducts(prods);
    setLoading(false);
  }, [retailerId]);

  useEffect(() => {
    fetchShopProducts();

    const handleProductsUpdated = () => {
      fetchShopProducts();
    };

    const unsubscribeReviews = subscribeToReviews(() => {
      setReviewsTick((t) => t + 1);
    }, null, retailerId);

    window.addEventListener('sc:products_updated', handleProductsUpdated);
    return () => {
      unsubscribeReviews();
      window.removeEventListener('sc:products_updated', handleProductsUpdated);
    };
  }, [fetchShopProducts, retailerId]);

  const handleToggleStock = async (product) => {
    await toggleProductStock(product.id, !product.in_stock);
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, in_stock: !p.in_stock } : p))
    );
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your catalog?')) {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice) return;
    if (!newImg) {
      setImageError('Please select a product photo from device gallery or take a picture with camera.');
      return;
    }

    await saveProduct({
      retailer_id: retailerId,
      name: newName,
      price: parseFloat(newPrice) || 0,
      category: newCategory,
      badge: newBadge,
      description: newDesc,
      image_url: newImg,
      in_stock: true
    });

    setIsAddModalOpen(false);
    // Reset form
    setNewName('');
    setNewPrice('');
    setNewDesc('');
    setNewImg('');
    setImageError('');
    fetchShopProducts();
  };

  const categories = Array.from(
    new Set(
      products
        .map((p) => p.item_category || p.category)
        .filter(Boolean)
        .map((c) => c.trim())
    )
  ).sort((a, b) => a.localeCompare(b));

  const displayedProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => (p.item_category || p.category)?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="catalog-manager-wrap">
      <div className="catalog-header-bar">
        <div>
          <h3>Store Catalog & Stock Control</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
            Filter by category, toggle availability, edit product details, or view verified reviews.
          </p>
        </div>

        <div className="catalog-header-actions-group">
          {categories.length > 0 && (
            <div className="catalog-category-filter-wrap">
              <label htmlFor="catalogCategorySelect" className="catalog-category-filter-label">
                Category:
              </label>
              <select
                id="catalogCategorySelect"
                className="catalog-category-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories ({products.length})</option>
                {categories.map((cat) => {
                  const count = products.filter(
                    (p) => (p.item_category || p.category)?.toLowerCase() === cat.toLowerCase()
                  ).length;
                  return (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)} ({count})
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} />
            <span>Add New Product Drop</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          <p>Loading inventory items...</p>
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
          <Package size={42} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
          <h4>No products found</h4>
          <p style={{ color: 'var(--text-muted)', margin: '8px 0 18px' }}>
            You haven't listed any products yet. Click "Add New Product Drop" to start selling.
          </p>
        </div>
      ) : displayedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
          <Package size={36} color="var(--text-muted)" style={{ margin: '0 auto 10px' }} />
          <h4>No products in "{selectedCategory}"</h4>
          <p style={{ color: 'var(--text-muted)', margin: '6px 0 14px', fontSize: '0.9rem' }}>
            No items match this category filter.
          </p>
          <button className="btn-secondary" onClick={() => setSelectedCategory('all')}>
            Show All Categories ({products.length})
          </button>
        </div>
      ) : (
        <div className="catalog-table-wrap">
          <table className="catalog-table">
            <thead>
              <tr>
                <th>Product Drop</th>
                <th>Price</th>
                <th>Status / Live Stock</th>
                <th>Customer Reviews</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((prod) => {
                const ratingInfo = getProductRatingSummary(prod.id);
                const prodCategory = prod.item_category || prod.category;

                return (
                  <tr key={prod.id}>
                    <td>
                      <div className="product-cell">
                        <img src={prod.image_url} alt={prod.name} />
                        <div>
                          <strong>{prod.name}</strong>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px', flexWrap: 'wrap' }}>
                            {prodCategory && (
                              <span className="catalog-prod-cat-tag">
                                {prodCategory}
                              </span>
                            )}
                            {prod.badge && (
                              <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)' }}>
                                {prod.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>
                        ${Number(prod.price).toFixed(2)}
                      </strong>
                    </td>
                    <td>
                      <button
                        className={`stock-toggle-switch ${prod.in_stock ? 'in-stock' : 'out-of-stock'}`}
                        onClick={() => handleToggleStock(prod)}
                        title="Click to toggle in/out of stock"
                      >
                        {prod.in_stock ? <Check size={13} /> : <X size={13} />}
                        <span>{prod.in_stock ? 'In Stock (Live)' : 'Sold Out'}</span>
                      </button>
                    </td>
                    <td>
                      <button
                        className="catalog-review-badge-btn"
                        onClick={() => setActiveReviewProduct(prod)}
                        title={`View ${ratingInfo.count} reviews for ${prod.name}`}
                      >
                        <Star size={13} fill={ratingInfo.count > 0 ? '#fbbf24' : 'none'} stroke="#fbbf24" />
                        <strong>{ratingInfo.average.toFixed(1)}</strong>
                        <span>({ratingInfo.count})</span>
                        <MessageSquare size={12} style={{ marginLeft: '4px', opacity: 0.7 }} />
                      </button>
                    </td>
                    <td>
                      <div className="catalog-actions-cell">
                        <button
                          type="button"
                          className="catalog-action-btn edit"
                          onClick={() => handleOpenEditModal(prod)}
                          title="Edit Product Details"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          className="catalog-action-btn delete"
                          onClick={() => handleDelete(prod.id)}
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW PRODUCT REVIEWS MODAL */}
      {activeReviewProduct && (
        <div className="modal-backdrop" onClick={() => setActiveReviewProduct(null)}>
          <div
            className="modal-dialog"
            style={{ maxWidth: '640px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={activeReviewProduct.image_url}
                  alt={activeReviewProduct.name}
                  style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.05rem', margin: 0 }}>
                    {activeReviewProduct.name}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Customer Reviews & Feedback
                  </span>
                </div>
              </div>
              <button
                className="close-drawer-btn"
                onClick={() => setActiveReviewProduct(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {(() => {
                const prodReviews = getReviewsSync(activeReviewProduct.id);
                if (prodReviews.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                      <MessageSquare size={36} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
                      <p style={{ margin: 0, fontWeight: 600 }}>No reviews received yet for this product drop.</p>
                      <span style={{ fontSize: '0.82rem' }}>
                        Customer reviews submitted on the store will display here automatically.
                      </span>
                    </div>
                  );
                }

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {prodReviews.map((rev) => (
                      <div
                        key={rev.id}
                        style={{
                          background: 'var(--bg-hover)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '10px',
                          padding: '14px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <User size={13} color="var(--primary)" />
                              <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                                {rev.user_name}
                              </strong>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                              <Mail size={12} color="var(--text-muted)" />
                              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                {rev.user_email}
                              </span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={13}
                                fill={s <= (rev.rating || 5) ? '#fbbf24' : 'none'}
                                stroke={s <= (rev.rating || 5) ? '#fbbf24' : '#cbd5e1'}
                              />
                            ))}
                          </div>
                        </div>

                        <p style={{ margin: '6px 0', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                          {rev.description}
                        </p>

                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          Submitted: {rev.created_at ? new Date(rev.created_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          }) : 'Recently'}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setActiveReviewProduct(null)}
              >
                Close Reviews
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Product to {shopName}</h3>
              <button className="close-drawer-btn" onClick={() => setIsAddModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Heavyweight Boxy Sweatshirt"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Price ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    placeholder="24.50"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category / Department</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Apparel, Footwear, Audio, Skincare"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Feature Badge</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., 🔥 Hot Drop, ⭐ Featured"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Product Image (Gallery / Camera)</span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Required</span>
                  </label>

                  {/* Hidden file inputs */}
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleGalleryChange}
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: 'none' }}
                    onChange={handleCameraChange}
                  />

                  {newImg ? (
                    <div className="image-preview-card">
                      <div className="image-preview-img-wrap">
                        <img src={newImg} alt="Preview" />
                        <span className="image-preview-badge">
                          <Check size={12} /> Ready to Publish
                        </span>
                      </div>
                      <div className="image-preview-actions">
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            className="image-action-small-btn"
                            onClick={() => galleryInputRef.current?.click()}
                          >
                            <Upload size={13} />
                            <span>Gallery</span>
                          </button>
                          <button
                            type="button"
                            className="image-action-small-btn"
                            onClick={() => cameraInputRef.current?.click()}
                          >
                            <Camera size={13} />
                            <span>Camera</span>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="image-action-small-btn danger"
                          onClick={() => setNewImg('')}
                          title="Remove image"
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="image-picker-zone">
                      <div className="image-picker-icon-circle">
                        <ImageIcon size={24} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                          Upload Product Image
                        </strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Pick from device gallery or capture live via camera
                        </span>
                      </div>

                      <div className="image-picker-buttons">
                        <button
                          type="button"
                          className="image-upload-btn gallery"
                          onClick={() => galleryInputRef.current?.click()}
                        >
                          <Upload size={15} />
                          <span>Choose from Gallery</span>
                        </button>

                        <button
                          type="button"
                          className="image-upload-btn camera"
                          onClick={() => cameraInputRef.current?.click()}
                        >
                          <Camera size={15} />
                          <span>Take Photo (Camera)</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {imageError && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px', display: 'block', fontWeight: '600' }}>
                      ⚠️ {imageError}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Product Description</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    placeholder="Detailed craftsmanship notes, materials, specifications..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Plus size={16} />
                  <span>Publish Item to Storefront</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT DETAILS MODAL */}
      {editingProduct && (
        <div className="modal-backdrop" onClick={() => !isSavingEdit && setEditingProduct(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>Edit Product Details</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Update pricing, name, category, badge or replace photo
                </span>
              </div>
              <button
                className="close-drawer-btn"
                onClick={() => !isSavingEdit && setEditingProduct(null)}
                disabled={isSavingEdit}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Heavyweight Boxy Sweatshirt"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Price ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    placeholder="24.50"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category / Department</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Apparel, Footwear, Bags, Audio"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Feature Badge</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., 🔥 Hot Drop, ⭐ Featured"
                    value={editBadge}
                    onChange={(e) => setEditBadge(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Product Image (Replace / Update)</span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Gallery or Camera</span>
                  </label>

                  {/* Hidden file inputs for edit modal */}
                  <input
                    ref={editGalleryInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleEditGalleryChange}
                  />
                  <input
                    ref={editCameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: 'none' }}
                    onChange={handleEditCameraChange}
                  />

                  {editImg ? (
                    <div className="image-preview-card">
                      <div className="image-preview-img-wrap">
                        <img src={editImg} alt="Preview" />
                        <span className="image-preview-badge">
                          <Check size={12} /> Active Photo
                        </span>
                      </div>
                      <div className="image-preview-actions">
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            className="image-action-small-btn"
                            onClick={() => editGalleryInputRef.current?.click()}
                          >
                            <Upload size={13} />
                            <span>New from Gallery</span>
                          </button>
                          <button
                            type="button"
                            className="image-action-small-btn"
                            onClick={() => editCameraInputRef.current?.click()}
                          >
                            <Camera size={13} />
                            <span>Capture Camera</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="image-picker-zone">
                      <div className="image-picker-icon-circle">
                        <ImageIcon size={24} />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                          Upload Replacement Image
                        </strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          Pick from device gallery or capture live via camera
                        </span>
                      </div>

                      <div className="image-picker-buttons">
                        <button
                          type="button"
                          className="image-upload-btn gallery"
                          onClick={() => editGalleryInputRef.current?.click()}
                        >
                          <Upload size={15} />
                          <span>Choose from Gallery</span>
                        </button>

                        <button
                          type="button"
                          className="image-upload-btn camera"
                          onClick={() => editCameraInputRef.current?.click()}
                        >
                          <Camera size={15} />
                          <span>Take Photo (Camera)</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {editImageError && (
                    <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px', display: 'block', fontWeight: '600' }}>
                      ⚠️ {editImageError}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Product Description</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    placeholder="Detailed craftsmanship notes, materials, specifications..."
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditingProduct(null)}
                  disabled={isSavingEdit}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={isSavingEdit}>
                  {isSavingEdit ? (
                    <span>Saving Updates...</span>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogManager;
