import React, { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Plus, Check, Heart, MapPin, Store } from 'lucide-react';

const ProductZoomModal = ({
  isOpen,
  onClose,
  product,
  shop,
  isLiked = false,
  onToggleFavorite,
  onAddToCart
}) => {
  const [zoomScale, setZoomScale] = useState(1);
  const [panOrigin, setPanOrigin] = useState({ x: 50, y: 50 });
  const [isAdded, setIsAdded] = useState(false);
  const imageContainerRef = useRef(null);

  // Reset zoom whenever a new product is loaded or modal opens
  useEffect(() => {
    if (isOpen) {
      setZoomScale(1);
      setPanOrigin({ x: 50, y: 50 });
      setIsAdded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, product, onClose]);

  if (!isOpen || !product) return null;

  const handleMouseMove = (e) => {
    if (zoomScale <= 1 || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setPanOrigin({ x, y });
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (zoomScale === 1) {
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        setPanOrigin({ x, y });
      }
      setZoomScale(2.2);
    } else {
      setZoomScale(1);
      setPanOrigin({ x: 50, y: 50 });
    }
  };

  const zoomIn = (e) => {
    e.stopPropagation();
    setZoomScale((prev) => Math.min(prev + 0.5, 3));
  };

  const zoomOut = (e) => {
    e.stopPropagation();
    setZoomScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanOrigin({ x: 50, y: 50 });
      return next;
    });
  };

  const resetZoom = (e) => {
    e.stopPropagation();
    setZoomScale(1);
    setPanOrigin({ x: 50, y: 50 });
  };

  const handleAdd = () => {
    if (!product.in_stock) return;
    onAddToCart && onAddToCart({
      ...product,
      shop_name: shop?.shop_name || 'Mall Boutique'
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="product-zoom-overlay" onClick={onClose}>
      <div className="product-zoom-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="product-zoom-header">
          <div className="product-zoom-header-left">
            <span className="product-zoom-tag">
              {product.item_category ? product.item_category.toUpperCase() : 'BOUTIQUE ITEM'}
            </span>
            <span className="product-zoom-hint">
              {zoomScale > 1 ? 'Move mouse to inspect details' : 'Click image to magnify'}
            </span>
          </div>
          <button
            className="product-zoom-close"
            onClick={onClose}
            aria-label="Close product view"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Main Content (2-Column) */}
        <div className="product-zoom-body">
          {/* Image & Interactive Magnifier Viewport */}
          <div className="product-zoom-viewport">
            <div
              className={`product-zoom-img-wrap ${zoomScale > 1 ? 'is-zoomed' : ''}`}
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onClick={handleImageClick}
              title={zoomScale > 1 ? 'Click to zoom out' : 'Click to zoom in'}
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="product-zoom-img"
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: `${panOrigin.x}% ${panOrigin.y}%`
                }}
              />

              {product.badge && (
                <span className="product-zoom-badge-pill">{product.badge}</span>
              )}
            </div>

            {/* Floating Zoom Controls */}
            <div className="product-zoom-controls" onClick={(e) => e.stopPropagation()}>
              <button
                className="zoom-ctrl-btn"
                onClick={zoomIn}
                disabled={zoomScale >= 3}
                title="Zoom in"
                aria-label="Zoom in"
              >
                <ZoomIn size={16} />
              </button>
              <span className="zoom-scale-indicator">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                className="zoom-ctrl-btn"
                onClick={zoomOut}
                disabled={zoomScale <= 1}
                title="Zoom out"
                aria-label="Zoom out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                className="zoom-ctrl-btn"
                onClick={resetZoom}
                disabled={zoomScale === 1}
                title="Reset zoom"
                aria-label="Reset zoom"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          {/* Product & Boutique Details Panel */}
          <div className="product-zoom-info">
            {shop && (
              <div className="product-zoom-shop-bar">
                <Store size={15} color="var(--primary)" />
                <span className="shop-name-label">{shop.shop_name}</span>
                <span className="shop-loc-label">
                  <MapPin size={12} />
                  {shop.location_in_mall}
                </span>
              </div>
            )}

            <h3 className="product-zoom-title">{product.name}</h3>

            <div className="product-zoom-meta-row">
              <div className="product-zoom-price-block">
                <span className="product-zoom-price-currency">$</span>
                <span className="product-zoom-price-val">
                  {Number(product.price).toFixed(2)}
                </span>
              </div>
              <span className={`status-pill ${product.in_stock ? 'ready' : 'cancelled'}`}>
                {product.in_stock ? 'In Stock & Ready for Pickup' : 'Currently Sold Out'}
              </span>
            </div>

            <div className="product-zoom-desc-box">
              <h5 className="desc-box-title">Item Description & Specifications</h5>
              <p className="product-zoom-desc">{product.description}</p>
            </div>

            <div className="product-zoom-actions">
              <button
                className={`product-zoom-cart-btn ${!product.in_stock ? 'disabled' : ''}`}
                onClick={handleAdd}
                disabled={!product.in_stock}
              >
                {isAdded ? (
                  <>
                    <Check size={18} />
                    <span>Added to Cart!</span>
                  </>
                ) : product.in_stock ? (
                  <>
                    <Plus size={18} />
                    <span>Add to SingleCart</span>
                  </>
                ) : (
                  <span>Item Sold Out</span>
                )}
              </button>

              <button
                className={`product-zoom-fav-btn ${isLiked ? 'active' : ''}`}
                onClick={() => onToggleFavorite && onToggleFavorite(product, shop)}
                title={isLiked ? 'Remove from session favorites' : 'Save to session favorites'}
                aria-label="Toggle favorite"
              >
                <Heart
                  size={20}
                  fill={isLiked ? '#e11d48' : 'none'}
                  color={isLiked ? '#e11d48' : 'currentColor'}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductZoomModal;
