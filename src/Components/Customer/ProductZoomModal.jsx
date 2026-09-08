import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Plus,
  Check,
  Heart,
  Truck,
  Store,
  Star,
  MessageSquare,
  Send,
  UserCheck
} from 'lucide-react';
import { getReviewsSync, addReview, subscribeToReviews } from '../../Data/mallStore';

const ProductZoomModal = ({
  isOpen,
  onClose,
  product,
  shop,
  isLiked = false,
  onToggleFavorite,
  onAddToCart,
  initialOpenReview = false
}) => {
  const [zoomScale, setZoomScale] = useState(1);
  const [panOrigin, setPanOrigin] = useState({ x: 50, y: 50 });
  const [isAdded, setIsAdded] = useState(false);
  const imageContainerRef = useRef(null);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewHoverRating, setReviewHoverRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');
  const [reviewErrorMsg, setReviewErrorMsg] = useState('');

  const loadReviews = useCallback(() => {
    if (!product) return;
    const prodReviews = getReviewsSync(product.id);
    setReviews(prodReviews);
  }, [product]);

  // Reset zoom & reviews whenever product changes or modal opens
  useEffect(() => {
    if (isOpen && product) {
      setZoomScale(1);
      setPanOrigin({ x: 50, y: 50 });
      setIsAdded(false);
      setIsReviewFormOpen(initialOpenReview);
      setReviewSuccessMsg('');
      setReviewErrorMsg('');
      loadReviews();
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
  }, [isOpen, product, onClose, loadReviews, initialOpenReview]);

  // Subscribe to real-time review updates
  useEffect(() => {
    if (!product) return;
    const unsubscribe = subscribeToReviews(() => {
      loadReviews();
    }, product.id);
    return () => unsubscribe();
  }, [product, loadReviews]);

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
      shop_name: shop?.shop_name || 'Verified Store'
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewErrorMsg('');

    if (!reviewerName.trim()) {
      setReviewErrorMsg('Please enter your full name.');
      return;
    }
    if (!reviewerEmail.trim() || !reviewerEmail.includes('@')) {
      setReviewErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!reviewDescription.trim()) {
      setReviewErrorMsg('Please write your review description.');
      return;
    }

    setReviewSubmitting(true);

    try {
      await addReview({
        productId: product.id,
        retailerId: shop?.id || product.retailer_id,
        userName: reviewerName.trim(),
        userEmail: reviewerEmail.trim(),
        rating: reviewRating,
        description: reviewDescription.trim()
      });

      setReviewSuccessMsg('Thank you! Your verified review has been published.');
      setReviewerName('');
      setReviewerEmail('');
      setReviewDescription('');
      setReviewRating(5);
      setIsReviewFormOpen(false);
      loadReviews();

      setTimeout(() => {
        setReviewSuccessMsg('');
      }, 5000);
    } catch (err) {
      setReviewErrorMsg('Failed to submit review. Please try again.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="product-zoom-overlay" onClick={onClose}>
      <div className="product-zoom-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="product-zoom-header">
          <div className="product-zoom-header-left">
            <span className="product-zoom-tag">
              {product.item_category ? product.item_category.toUpperCase() : 'STORE ITEM'}
            </span>
            <span className="product-zoom-hint">
              {zoomScale > 1 ? 'Move mouse to inspect details' : 'Click image to magnify & zoom in'}
            </span>
          </div>
          <button
            className="product-zoom-close"
            onClick={onClose}
            aria-label="Close product card"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Main Content (2-Column Scrollable) */}
        <div className="product-zoom-body">
          {/* Image & Interactive Magnifier Viewport */}
          <div className="product-zoom-viewport">
            <div
              className={`product-zoom-img-wrap ${zoomScale > 1 ? 'is-zoomed' : ''}`}
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onClick={handleImageClick}
              title={zoomScale > 1 ? 'Click to zoom out' : 'Click to magnify product image'}
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

          {/* Product Details & Reviews Panel */}
          <div className="product-zoom-info">
            {shop && (
              <div className="product-zoom-shop-bar">
                <Store size={15} color="var(--primary)" />
                <span className="shop-name-label">{shop.shop_name}</span>
                <span className="shop-loc-label">
                  <Truck size={12} />
                  Doorstep Delivery
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

              <div className="product-zoom-rating-pill">
                <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                <strong>{avgRating}</strong>
                <span>({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
              </div>

              <span className={`status-pill ${product.in_stock ? 'ready' : 'cancelled'}`}>
                {product.in_stock ? 'In Stock • Fast Dispatch' : 'Currently Sold Out'}
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
                title={isLiked ? 'Remove from favorites' : 'Save to favorites'}
                aria-label="Toggle favorite"
              >
                <Heart
                  size={20}
                  fill={isLiked ? '#e11d48' : 'none'}
                  color={isLiked ? '#e11d48' : 'currentColor'}
                />
              </button>
            </div>

            {/* PRODUCT CUSTOMER REVIEWS SECTION */}
            <div className="product-zoom-reviews-section">
              <div className="reviews-section-header">
                <div className="reviews-header-title">
                  <MessageSquare size={16} color="var(--primary)" />
                  <h4>Customer Reviews ({reviews.length})</h4>
                </div>

                <button
                  className="btn-add-review-toggle"
                  onClick={() => {
                    setIsReviewFormOpen((prev) => !prev);
                    setReviewErrorMsg('');
                  }}
                >
                  <Star size={14} />
                  <span>{isReviewFormOpen ? 'Close Review Form' : 'Write a Review'}</span>
                </button>
              </div>

              {reviewSuccessMsg && (
                <div className="review-alert success">
                  <Check size={16} />
                  <span>{reviewSuccessMsg}</span>
                </div>
              )}

              {/* REVIEW SUBMISSION FORM */}
              {isReviewFormOpen && (
                <form className="product-review-form" onSubmit={handleReviewSubmit}>
                  <h5>Write a Verified Product Review</h5>

                  {reviewErrorMsg && (
                    <div className="review-alert error">
                      <span>{reviewErrorMsg}</span>
                    </div>
                  )}

                  <div className="review-form-row">
                    <div className="review-form-group">
                      <label>Your Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Alex Morgan"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="review-form-group">
                      <label>Your Email *</label>
                      <input
                        type="email"
                        placeholder="e.g. alex@example.com"
                        value={reviewerEmail}
                        onChange={(e) => setReviewerEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="review-form-group">
                    <label>Your Rating *</label>
                    <div className="star-rating-selector">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className="star-btn"
                          onMouseEnter={() => setReviewHoverRating(star)}
                          onMouseLeave={() => setReviewHoverRating(0)}
                          onClick={() => setReviewRating(star)}
                          aria-label={`Rate ${star} star`}
                        >
                          <Star
                            size={20}
                            fill={(reviewHoverRating || reviewRating) >= star ? '#fbbf24' : 'none'}
                            stroke={(reviewHoverRating || reviewRating) >= star ? '#fbbf24' : '#94a3b8'}
                          />
                        </button>
                      ))}
                      <span className="star-rating-label">
                        {reviewRating} of 5 Stars
                      </span>
                    </div>
                  </div>

                  <div className="review-form-group">
                    <label>Review Description *</label>
                    <textarea
                      rows={3}
                      placeholder="Share your experience with product quality, material, durability, and fit..."
                      value={reviewDescription}
                      onChange={(e) => setReviewDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="review-form-actions">
                    <button
                      type="button"
                      className="btn-review-cancel"
                      onClick={() => setIsReviewFormOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-review-submit"
                      disabled={reviewSubmitting}
                    >
                      <Send size={14} />
                      <span>{reviewSubmitting ? 'Posting Review...' : 'Post Review'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* RECENT REVIEWS LIST */}
              <div className="product-reviews-list">
                {reviews.length === 0 ? (
                  <div className="no-reviews-state">
                    <p>No reviews yet for this product.</p>
                    <span>Be the first to share your thoughts by clicking "Write a Review" above!</span>
                  </div>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev.id} className="customer-review-card">
                      <div className="review-card-top">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">
                            {rev.user_name ? rev.user_name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="reviewer-name-row">
                              <strong>{rev.user_name}</strong>
                              <span className="verified-badge">
                                <UserCheck size={11} />
                                Verified Buyer
                              </span>
                            </div>
                            <span className="reviewer-email">
                              {rev.user_email ? rev.user_email.replace(/(.{2})(.*)(@.*)/, '$1***$3') : 'Verified Customer'}
                            </span>
                          </div>
                        </div>

                        <div className="review-stars-row">
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

                      <p className="review-card-desc">{rev.description}</p>
                      <span className="review-date">
                        {rev.created_at ? new Date(rev.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }) : 'Recent Purchase'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductZoomModal;
