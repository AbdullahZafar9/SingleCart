import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone, Plus, Check, Heart, ZoomIn, Sparkles } from 'lucide-react';
import { getShopByIdSync, getProductsSync, getShopById, getProducts } from '../../Data/mallStore';
import { SHOP_ITEM_CATEGORIES } from '../../Data/initialMallData';
import MallNavbar from './MallNavbar';
import FavoritesDrawer from './FavoritesDrawer';
import ProductZoomModal from './ProductZoomModal';
import MallFooter from '../Shared/MallFooter';

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
      // If we already have local data, don't show blocking loading screen
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

      <header className="store-detail-header">
        <img
          src={shop.banner_url}
          alt={shop.shop_name}
          className="store-detail-banner-img"
        />

        <div className="store-detail-header-inner">
          <button className="back-to-mall-btn" onClick={() => navigate('/mall')}>
            <ArrowLeft size={16} />
            <span>Back to Mall Directory</span>
          </button>

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

          <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', fontSize: '0.98rem' }}>
            {shop.description}
          </p>
        </div>
      </header>

      {/* BOUTIQUE CATEGORIES BAR */}
      <section className="store-categories-section">
        <div className="store-categories-header">
          <span className="categories-label">
            <Sparkles size={15} color="var(--primary)" />
            Shop Departments:
          </span>
        </div>
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

      <MallFooter />
    </div>
  );
};

export default StorefrontDetail;
