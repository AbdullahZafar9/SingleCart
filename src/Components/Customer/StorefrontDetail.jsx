import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone, Plus, Check, Heart } from 'lucide-react';
import { getShopById, getProducts } from '../../Data/mallStore';
import MallNavbar from './MallNavbar';
import FavoritesDrawer from './FavoritesDrawer';
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

  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  useEffect(() => {
    const fetchStoreData = async () => {
      setLoading(true);
      const shopData = await getShopById(storeId);
      if (shopData) {
        setShop(shopData);
        const prods = await getProducts(storeId);
        setProducts(prods);
      }
      setLoading(false);
    };

    fetchStoreData();

    const handleProductsUpdated = () => {
      fetchStoreData();
    };

    window.addEventListener('sc:products_updated', handleProductsUpdated);
    return () => window.removeEventListener('sc:products_updated', handleProductsUpdated);
  }, [storeId]);

  const handleAdd = (product) => {
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

  if (loading) {
    return (
      <div className="mall-container">
        <MallNavbar
          cartCount={totalCartCount}
          onOpenCart={onOpenCart}
          favoritesCount={favorites.length}
          onOpenFavorites={() => setIsFavoritesOpen(true)}
        />
        <div style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Loading boutique storefront catalog...</p>
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

      <main className="mall-section" style={{ paddingTop: '36px' }}>
        <div className="section-header">
          <div className="section-title">
            <h3>Boutique Drops & Catalog</h3>
            <p>Curated signature products available for direct unified checkout</p>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing {products.length} items
          </span>
        </div>

        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <p>No products currently listed for this boutique.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => {
              const isAdded = recentlyAddedId === product.id;
              const isLiked = favorites.some(
                (item) => String(item.id) === String(product.id)
              );

              return (
                <div key={product.id} className="product-card">
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
                        onClick={() => handleAdd(product)}
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
