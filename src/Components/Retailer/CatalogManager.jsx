import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Check, X, Package } from 'lucide-react';
import { getProducts, saveProduct, toggleProductStock, deleteProduct } from '../../Data/mallStore';

const CatalogManager = ({ retailerId, shopName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newBadge, setNewBadge] = useState('✨ Chef Special');
  const [newDesc, setNewDesc] = useState('');
  const [newImg, setNewImg] = useState('https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&auto=format&fit=crop&q=80');

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

    window.addEventListener('sc:products_updated', handleProductsUpdated);
    return () => window.removeEventListener('sc:products_updated', handleProductsUpdated);
  }, [fetchShopProducts]);

  const handleToggleStock = async (product) => {
    await toggleProductStock(product.id, !product.in_stock);
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, in_stock: !p.in_stock } : p))
    );
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to remove this item from your boutique catalog?')) {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice) return;

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
    fetchShopProducts();
  };

  return (
    <div className="catalog-manager-wrap">
      <div className="catalog-header-bar">
        <div>
          <h3>Store Catalog & Stock Control</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem' }}>
            Toggle product availability in real-time or add new drops to your storefront.
          </p>
        </div>

        <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} />
          <span>Add New Product Drop</span>
        </button>
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
      ) : (
        <div className="catalog-table-wrap">
          <table className="catalog-table">
            <thead>
              <tr>
                <th>Product Drop</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status / Live Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <div className="product-cell">
                      <img src={prod.image_url} alt={prod.name} />
                      <div>
                        <strong>{prod.name}</strong>
                        {prod.badge && (
                          <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--accent-gold)' }}>
                            {prod.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ textTransform: 'capitalize', color: 'var(--text-secondary)' }}>
                      {prod.category}
                    </span>
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
                      onClick={() => handleDelete(prod.id)}
                      style={{ color: 'var(--text-muted)', padding: '6px', cursor: 'pointer' }}
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                    placeholder="e.g., Specialty Coffee, Apparel, Audio"
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
                    placeholder="e.g., 🔥 Hot Drop, ⭐ Barista Choice"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={newImg}
                    onChange={(e) => setNewImg(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Product Description</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    placeholder="Detailed craftsmanship notes, materials, taste profile..."
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
    </div>
  );
};

export default CatalogManager;
