import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MallDirectory from './Components/Customer/MallDirectory';
import StorefrontDetail from './Components/Customer/StorefrontDetail';
import CartDrawer from './Components/Customer/CartDrawer';
import CheckoutModal from './Components/Customer/CheckoutModal';
import OrderTrackerModal from './Components/Customer/OrderTrackerModal';
import RetailerLogin from './Components/Retailer/RetailerLogin';
import RetailerDashboard from './Components/Retailer/RetailerDashboard';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import './CSS/App.css';
import './CSS/mall.css';

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

  // Drawer / Modals for Storefront view
  const [isStoreCartOpen, setIsStoreCartOpen] = useState(false);
  const [isStoreCheckoutOpen, setIsStoreCheckoutOpen] = useState(false);
  const [storeTrackedOrder, setStoreTrackedOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('sc_cart_v1', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

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
      <div className="App">
        <Routes>
          {/* 1. Public Customer Mall Experience (No Auth Required) */}
          <Route
            path="/"
            element={
              <MallDirectory
                cart={cart}
                onAddToCart={handleAddToCart}
                onUpdateQty={handleUpdateQty}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
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
                    setStoreTrackedOrder(order);
                  }}
                />
                <OrderTrackerModal
                  isOpen={Boolean(storeTrackedOrder)}
                  onClose={() => setStoreTrackedOrder(null)}
                  initialOrder={storeTrackedOrder}
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
