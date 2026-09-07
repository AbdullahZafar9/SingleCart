import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Plus,
  Check,
  Heart,
  ZoomIn,
  Clock,
  ShieldCheck,
  PackageCheck,
  Store,
  Building2
} from 'lucide-react';
import { getShopByIdSync, getProductsSync, getShopById, getProducts } from '../../Data/mallStore';
import { SHOP_ITEM_CATEGORIES } from '../../Data/initialMallData';
import MallNavbar from './MallNavbar';
import FavoritesDrawer from './FavoritesDrawer';
import ProductZoomModal from './ProductZoomModal';

const StorefrontDetail = ({
  cart,
  onAddToCart,
  onOpenCart,
  favorites = [],
  onToggleFavorite,
  onRemoveFavorite
}) => {
  const { storeId } = useParams();
  const navigate = useNavigate();

  // INSTANT SYNCHRONOUS HYDRATION: Zero-delay rendering on route entry
  const [shop, setShop] = useState(() => getShopByIdSync(storeId));
  const [products, setProducts] = useState(() => getProductsSync(storeId));
  const [loading, setLoading] = useState(() => !getShopByIdSync(storeId));

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [zoomedProduct, setZoomedProduct] = useState(null);

  // Background non-blocking sync
  useEffect(() => {
    let isMounted = true;

    const fetchStoreData = async () => {
      const currentLocalShop = getShopByIdSync(storeId);
      if (!currentLocalShop) {
        setLoading(true);
      }

      const shopData = await getShopById(storeId);
      if (!isMounted) return;

      if (shopData) {
        setShop(shopData);
        const prods = await getProducts(storeId);
        if (isMounted) {
          setProducts(prods);
        }
      }
      setLoading(false);
    };

    fetchStoreData();

    const handleProductsUpdated = () => {
      const refreshedProds = getProductsSync(storeId);
      setProducts(refreshedProds);
    };

    window.addEventListener('sc:products_updated', handleProductsUpdated);
    return () => {
      isMounted = false;
      window.removeEventListener('sc:products_updated', handleProductsUpdated);
    };
  }, [storeId]);

  const handleAdd = (product, e) => {
    if (e) e.stopPropagation();
    if (!product.in_stock) return;
    onAddToCart({
      ...product,
      shop_name: shop?.shop_name || 'Mall Boutique'
    });
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1500);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Determine subcategories for this boutique
  const availableCategories =
    shop?.item_categories ||
    SHOP_ITEM_CATEGORIES[storeId] ||
    [
      { id: 'all', label: 'All Items' }
    ];

  // Filter products by selected category
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true;
    const prodItemCat = (product.item_category || '').toLowerCase();
    const prodGenCat = (product.category || '').toLowerCase();
    const targetCat = selectedCategory.toLowerCase();
    return prodItemCat === targetCat || prodGenCat === targetCat;
  });

  if (loading && !shop) {
    return (
      <div className="mall-container">
        <MallNavbar
          cartCount={totalCartCount}
          onOpenCart={onOpenCart}
          favoritesCount={favorites.length}
          onOpenFavorites={() => setIsFavoritesOpen(true)}
        />
        <div style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Opening boutique storefront...</p>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="mall-container">
        <MallNavbar
          cartCount={totalCartCount}
          onOpenCart={onOpenCart}
          favoritesCount={favorites.length}
          onOpenFavorites={() => setIsFavoritesOpen(true)}
        />
        <div style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h2>Storefront Not Found</h2>
          <p style={{ color: 'var(--text-muted)', margin: '12px 0 24px' }}>
            The requested boutique could not be located in the mall directory.
          </p>
          <button className="btn-primary" onClick={() => navigate('/mall')}>
            Back to Mall Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mall-container">
      <MallNavbar
        cartCount={totalCartCount}
        onOpenCart={onOpenCart}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* RICH COLORED BOUTIQUE HEADER (Replaced washed-out image with vibrant color gradient) */}
      <header
        className="store-detail-header"
        style={{
          background: shop.header_gradient || 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
        }}
      >
        <div className="store-detail-header-inner">
          <div className="store-header-top-bar">
            {/* Sleek arrow button with smooth hover effect */}
            <button
              className="back-arrow-btn"
              onClick={() => navigate('/mall')}
              aria-label="Back to Mall Directory"
              title="Back to Mall Directory"
            >
              <ArrowLeft size={20} />
            </button>

            <span className="store-header-dept-tag">
              {shop.department}
            </span>
          </div>

          <div className="store-profile-main">
            <img
              src={shop.logo_url}
              alt={shop.shop_name}
              className="store-avatar-large"
            />
            <div className="store-info-title">
              <h2>{shop.shop_name}</h2>
              <div className="store-tags-row">
                <span className="status-pill ready">Open Now</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                  <strong>{shop.rating || 5.0}</strong> ({shop.reviews_count || 50}+ ratings)
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} />
                  {shop.location_in_mall}
                </span>
                {shop.phone && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={14} />
                    {shop.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="store-header-description">
            {shop.description}
          </p>
        </div>
      </header>

      {/* BOUTIQUE CATEGORIES BAR */}
      <section className="store-categories-section">
        <div className="store-categories-pills">
          {availableCategories.map((cat) => (
            <button
              key={cat.id}
              className={`store-cat-chip ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <main className="mall-section" style={{ paddingTop: '20px' }}>
        <div className="section-header">
          <div className="section-title">
            <h3>Boutique Catalog</h3>
            <p>Click any item or its image to magnify & zoom in on details</p>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing {filteredProducts.length} item{filteredProducts.length === 1 ? '' : 's'}
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <p>No products found in this category.</p>
            <button
              className="btn-secondary"
              style={{ marginTop: '12px' }}
              onClick={() => setSelectedCategory('all')}
            >
              Show All Items
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const isAdded = recentlyAddedId === product.id;
              const isLiked = favorites.some(
                (item) => String(item.id) === String(product.id)
              );

              return (
                <div
                  key={product.id}
                  className="product-card interactive-product-card"
                  onClick={() => setZoomedProduct(product)}
                  role="button"
                  tabIndex={0}
                  title="Click to view & zoom image"
                >
                  <div className="product-image-wrap">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="product-img"
                      loading="lazy"
                    />

                    {product.badge && (
                      <span className="product-badge-tag">{product.badge}</span>
                    )}

                    {product.item_category && (
                      <span className="product-subcat-badge">
                        {product.item_category}
                      </span>
                    )}

                    {/* Zoom Click Indicator Overlay */}
                    <div className="product-zoom-hint-overlay">
                      <span className="zoom-hint-pill">
                        <ZoomIn size={14} />
                        Zoom
                      </span>
                    </div>

                    {/* Like / Favorite heart icon button directly on each item */}
                    <button
                      className={`product-fav-btn ${isLiked ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite && onToggleFavorite(product, shop);
                      }}
                      title={isLiked ? 'Remove from liked items' : 'Like this item'}
                      aria-label="Save item to favorites"
                    >
                      <Heart
                        size={16}
                        fill={isLiked ? '#e11d48' : 'rgba(0, 0, 0, 0.25)'}
                        color={isLiked ? '#e11d48' : '#ffffff'}
                      />
                    </button>
                  </div>

                  <div className="product-body">
                    <h5>{product.name}</h5>
                    <p className="product-desc">{product.description}</p>

                    <div className="product-bottom-row">
                      <span className="product-price">
                        ${Number(product.price).toFixed(2)}
                      </span>

                      <button
                        className={`add-to-cart-btn ${!product.in_stock ? 'disabled' : ''}`}
                        onClick={(e) => handleAdd(product, e)}
                        disabled={!product.in_stock}
                      >
                        {isAdded ? (
                          <>
                            <Check size={16} />
                            <span>Added</span>
                          </>
                        ) : product.in_stock ? (
                          <>
                            <Plus size={16} />
                            <span>Add to Cart</span>
                          </>
                        ) : (
                          <span>Sold Out</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Interactive Product Image Zoom Lightbox Modal */}
      <ProductZoomModal
        isOpen={Boolean(zoomedProduct)}
        onClose={() => setZoomedProduct(null)}
        product={zoomedProduct}
        shop={shop}
        isLiked={zoomedProduct ? favorites.some((item) => String(item.id) === String(zoomedProduct.id)) : false}
        onToggleFavorite={onToggleFavorite}
        onAddToCart={onAddToCart}
      />

      {/* Favorites Drawer for Storefront View */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={onRemoveFavorite}
        onAddToCart={onAddToCart}
      />

      {/* BOUTIQUE DETAILS & TIMINGS FOOTER (Replaces generic mall footer on shop pages) */}
      <footer className="boutique-info-footer">
        <div className="boutique-info-inner">
          {/* Column 1: Store Overview & Guarantees */}
          <div className="boutique-col-about">
            <div className="boutique-col-brand">
              <img src={shop.logo_url} alt={shop.shop_name} className="boutique-footer-logo" />
              <div>
                <h4>{shop.shop_name}</h4>
                <span className="boutique-footer-category">{shop.department}</span>
              </div>
            </div>
            <p className="boutique-footer-desc">{shop.description}</p>
            <div className="boutique-badges-list">
              <span className="boutique-guarantee-pill">
                <ShieldCheck size={14} />
                100% Genuine Boutique Goods
              </span>
              <span className="boutique-guarantee-pill">
                <Clock size={14} />
                15-Min Express Mall Pickup
              </span>
              <span className="boutique-guarantee-pill">
                <PackageCheck size={14} />
                Direct Return & Exchange Desk
              </span>
            </div>
          </div>

          {/* Column 2: Hours & Timings */}
          <div className="boutique-col-hours">
            <h5 className="boutique-footer-heading">
              <Clock size={16} />
              Store Timings
            </h5>
            <div className="hours-status-badge">
              <span className="pulse-indicator" />
              Open Today: 10:00 AM – 9:00 PM
            </div>
            <ul className="hours-schedule-list">
              <li>
                <span>Monday – Friday:</span>
                <strong>{shop.hours?.mon_fri || '10:00 AM – 9:00 PM'}</strong>
              </li>
              <li>
                <span>Saturday:</span>
                <strong>{shop.hours?.sat || '10:00 AM – 10:00 PM'}</strong>
              </li>
              <li>
                <span>Sunday:</span>
                <strong>{shop.hours?.sun || '11:00 AM – 8:00 PM'}</strong>
              </li>
            </ul>
          </div>

          {/* Column 3: Location, Contact & Pickup Point */}
          <div className="boutique-col-contact">
            <h5 className="boutique-footer-heading">
              <Store size={16} />
              Location & Contact
            </h5>
            <div className="contact-details-list">
              <div className="contact-detail-row">
                <MapPin size={15} />
                <div>
                  <strong>Mall Location</strong>
                  <p>{shop.location_in_mall}</p>
                </div>
              </div>
              <div className="contact-detail-row">
                <Phone size={15} />
                <div>
                  <strong>Direct Store Phone</strong>
                  <p>{shop.phone || '+1 (555) 000-0000'}</p>
                </div>
              </div>
              <div className="contact-detail-row">
                <Building2 size={15} />
                <div>
                  <strong>Express Pickup Counter</strong>
                  <p>{shop.pickup_counter || 'Front Boutique Desk Bay'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line for the boutique */}
        <div className="boutique-copyright-row">
          <p>© 2026 {shop.shop_name} • SingleCart Verified Boutique Storefront</p>
          <span>Floor verified boutique partner</span>
        </div>
      </footer>
    </div>
  );
};

export default StorefrontDetail;
