import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Welcome from './Components/Welcome';
import MallDirectory from './Components/Customer/MallDirectory';
import StorefrontDetail from './Components/Customer/StorefrontDetail';
import CartDrawer from './Components/Customer/CartDrawer';
import CheckoutModal from './Components/Customer/CheckoutModal';
import OrderReceiptModal from './Components/Customer/OrderReceiptModal';
import OrderTrackerModal from './Components/Customer/OrderTrackerModal';
import RetailerLogin from './Components/Retailer/RetailerLogin';
import RetailerDashboard from './Components/Retailer/RetailerDashboard';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import './CSS/App.css';
import './CSS/mall.css';

// Global scroll restoration helper on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Route-aware isolated theme synchronizer
function RouteThemeManager({ currentRetailer }) {
  const { pathname } = useLocation();

  useEffect(() => {
    let targetTheme = 'light';

    if (pathname === '/') {
      // 1. Welcome screen is strictly in light mode
      targetTheme = 'light';
    } else if (pathname.startsWith('/retailer')) {
      // 2. Retailer panel: strictly scoped to this retailer's own shop panel
      const shopId = currentRetailer?.id;
      const retailerKey = shopId ? `sc_retailer_theme_${shopId}` : 'sc_retailer_theme';
      targetTheme = localStorage.getItem(retailerKey) || localStorage.getItem('sc_retailer_theme') || 'light';
    } else if (pathname.startsWith('/admin')) {
      // 3. Admin panel: strictly scoped to admin operations
      targetTheme = localStorage.getItem('sc_admin_theme') || 'light';
    } else if (pathname.startsWith('/mall') || pathname.startsWith('/store')) {
      // 4. Customer Mall directory & store catalogs: strictly scoped to customer
      targetTheme = localStorage.getItem('sc_customer_theme') || 'light';
    } else {
      targetTheme = 'light';
    }

    document.documentElement.setAttribute('data-theme', targetTheme);
  }, [pathname, currentRetailer]);

  return null;
}

function App() {

  // Shopping cart state with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sc_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Active Retailer state
  const [currentRetailer, setCurrentRetailer] = useState(() => {
    try {
      const saved = localStorage.getItem('sc_active_retailer');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Admin user state
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sc_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Real-time session liked items / favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = sessionStorage.getItem('sc_session_liked_items');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Drawer / Modals for Storefront view
  const [isStoreCartOpen, setIsStoreCartOpen] = useState(false);
  const [isStoreCheckoutOpen, setIsStoreCheckoutOpen] = useState(false);
  const [storeReceiptOrder, setStoreReceiptOrder] = useState(null);
  const [storeTrackedOrder, setStoreTrackedOrder] = useState(null);
  const [isStoreTrackerOpen, setIsStoreTrackerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('sc_cart_v1', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      sessionStorage.setItem('sc_session_liked_items', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  const handleToggleFavorite = (product, shop) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => String(item.id) === String(product.id));
      if (exists) {
        return prev.filter((item) => String(item.id) !== String(product.id));
      } else {
        return [
          ...prev,
          {
            ...product,
            shop_name: product.shop_name || shop?.shop_name || 'Verified Store'
          }
        ];
      }
    });
  };

  const handleRemoveFavorite = (productId) => {
    setFavorites((prev) => prev.filter((item) => String(item.id) !== String(productId)));
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => String(item.id) === String(product.id));
      if (existing) {
        return prev.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (String(item.id) === String(productId) ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prev) => prev.filter((item) => String(item.id) !== String(productId)));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleRetailerLogin = (retailer) => {
    setCurrentRetailer(retailer);
    try {
      localStorage.setItem('sc_active_retailer', JSON.stringify(retailer));
    } catch (e) {}
  };

  const handleRetailerLogout = () => {
    setCurrentRetailer(null);
    try {
      localStorage.removeItem('sc_active_retailer');
    } catch (e) {}
  };

  const handleAdminLogin = (user) => {
    setAdminUser(user);
    try {
      localStorage.setItem('sc_admin_user', JSON.stringify(user));
    } catch (e) {}
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem('sc_admin_user');
    } catch (e) {}
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteThemeManager currentRetailer={currentRetailer} />
      <div className="App">
        <Routes>
          {/* 1. Warming Welcome Screen */}
          <Route path="/" element={<Welcome />} />

          {/* 2. Public Customer Digital Mall Directory */}
          <Route
            path="/mall"
            element={
              <MallDirectory
                cart={cart}
                onAddToCart={handleAddToCart}
                onUpdateQty={handleUpdateQty}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onRemoveFavorite={handleRemoveFavorite}
              />
            }
          />

          {/* Individual Storefront Catalog */}
          <Route
            path="/store/:storeId"
            element={
              <>
                <StorefrontDetail
                  cart={cart}
                  onAddToCart={handleAddToCart}
                  onOpenCart={() => setIsStoreCartOpen(true)}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  onOpenTracker={() => {
                    setStoreTrackedOrder(null); // Explicitly prompt for Ticket ID on navbar click
                    setIsStoreTrackerOpen(true);
                  }}
                />
                <CartDrawer
                  isOpen={isStoreCartOpen}
                  onClose={() => setIsStoreCartOpen(false)}
                  cart={cart}
                  onUpdateQty={handleUpdateQty}
                  onRemoveItem={handleRemoveItem}
                  onOpenCheckout={() => setIsStoreCheckoutOpen(true)}
                />
                <CheckoutModal
                  isOpen={isStoreCheckoutOpen}
                  onClose={() => setIsStoreCheckoutOpen(false)}
                  cart={cart}
                  onOrderSuccess={(order) => {
                    handleClearCart();
                    setStoreReceiptOrder(order);
                  }}
                />
                <OrderReceiptModal
                  isOpen={Boolean(storeReceiptOrder)}
                  onClose={() => setStoreReceiptOrder(null)}
                  order={storeReceiptOrder}
                  onTrackOrder={(order) => {
                    setStoreTrackedOrder(order);
                    setIsStoreTrackerOpen(true);
                  }}
                />
                <OrderTrackerModal
                  isOpen={isStoreTrackerOpen}
                  onClose={() => {
                    setIsStoreTrackerOpen(false);
                    setStoreTrackedOrder(null);
                  }}
                  initialOrder={storeTrackedOrder}
                  requireLookup={!storeTrackedOrder}
                />
              </>
            }
          />

          {/* 2. Retailer Vendor Portal (Login Required) */}
          <Route
            path="/retailer/login"
            element={<RetailerLogin onLoginSuccess={handleRetailerLogin} />}
          />
          <Route
            path="/retailer"
            element={
              <RetailerDashboard
                currentRetailer={currentRetailer}
                onLogout={handleRetailerLogout}
              />
            }
          />

          {/* 3. Global Mall Admin Command Center */}
          <Route
            path="/admin/login"
            element={<AdminLogin onLoginSuccess={handleAdminLogin} />}
          />
          <Route
            path="/admin"
            element={
              <AdminDashboard
                adminUser={adminUser}
                onLogout={handleAdminLogout}
              />
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
