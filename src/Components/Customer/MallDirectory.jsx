import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { MALL_CATEGORIES } from '../../Data/initialMallData';
import { getShopsSync, getShops, getProducts } from '../../Data/mallStore';
import MallNavbar from './MallNavbar';
import StorefrontCard from './StorefrontCard';
import CartDrawer from './CartDrawer';
import CheckoutModal from './CheckoutModal';
import OrderTrackerModal from './OrderTrackerModal';
import FavoritesDrawer from './FavoritesDrawer';
import MallFooter from '../Shared/MallFooter';

const MallDirectory = ({
  cart,
  onAddToCart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  favorites = [],
  onToggleFavorite,
  onRemoveFavorite
}) => {
  // INSTANT SYNCHRONOUS HYDRATION: Zero-delay rendering
  const [shops, setShops] = useState(() => getShopsSync());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(() => getShopsSync().length === 0);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeTrackedOrder, setActiveTrackedOrder] = useState(null);

  const fetchMallData = async () => {
    if (getShopsSync().length === 0) {
      setLoading(true);
    }
    const [shopsData] = await Promise.all([
      getShops(),
      getProducts()
    ]);
    if (shopsData && shopsData.length > 0) {
      setShops(shopsData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMallData();

    const handleShopsUpdated = () => {
      fetchMallData();
    };

    window.addEventListener('sc:shops_updated', handleShopsUpdated);
    return () => window.removeEventListener('sc:shops_updated', handleShopsUpdated);
  }, []);

  // Filter storefronts by selected category and search query
  const filteredShops = shops.filter((shop) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (shop.category && shop.category.toLowerCase() === selectedCategory.toLowerCase());

    const matchesSearch =
      !searchQuery.trim() ||
      shop.shop_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (shop.description && shop.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (shop.department && shop.department.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleOrderSuccess = (order) => {
    onClearCart();
    setActiveTrackedOrder(order);
  };

  return (
    <div className="mall-container">
      <MallNavbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* CENTERED NORMAL-SIZED SINGLECART HEADING & SEARCH BAR */}
      <section className="mall-center-hero">
        <div className="mall-center-hero-content">
          <h1 className="mall-center-heading">
            Single<span>Cart</span>
          </h1>
          <p className="mall-center-subheading">
            The Digital Mall & Boutiques
          </p>

          <div className="mall-center-search-bar">
            <Search className="mall-center-search-icon" size={19} />
            <input
              type="text"
              className="mall-center-search-input"
              placeholder="Search boutiques, streetwear, skincare, sneakers, tech, bags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="mall-center-search-clear"
                onClick={() => setSearchQuery('')}
                title="Clear search"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* MALL DEPARTMENTS BAR */}
      <section className="mall-categories-nav">
        <div className="category-chips-list">
          {MALL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* BOUTIQUE STOREFRONTS DIRECTORY */}
      <main className="mall-section">
        <div className="section-header">
          <div className="section-title">
            <h3>Digital Mall Boutiques</h3>
            <p>Direct storefront access with live inventory and fast doorstep delivery</p>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing {filteredShops.length} boutique{filteredShops.length === 1 ? '' : 's'}
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <p>Loading digital mall storefronts...</p>
          </div>
        ) : filteredShops.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
            <h4>No storefronts found</h4>
            <p style={{ color: 'var(--text-muted)', margin: '8px 0 16px' }}>
              No boutiques match "{searchQuery}" in this department.
            </p>
            <button
              className="btn-secondary"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="storefronts-grid">
            {filteredShops.map((shop) => (
              <StorefrontCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}
      </main>

      {/* Favorites Drawer (Session Liked Items) */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={onRemoveFavorite}
        onAddToCart={onAddToCart}
      />

      {/* CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={onUpdateQty}
        onRemoveItem={onRemoveItem}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* LIVE ORDER STATUS TRACKER MODAL */}
      <OrderTrackerModal
        isOpen={Boolean(activeTrackedOrder)}
        onClose={() => setActiveTrackedOrder(null)}
        initialOrder={activeTrackedOrder}
      />

      <MallFooter />
    </div>
  );
};

export default MallDirectory;
