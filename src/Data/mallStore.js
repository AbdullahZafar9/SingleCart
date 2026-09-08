import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { INITIAL_SHOPS, INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_REVIEWS } from './initialMallData';

const STORAGE_KEYS = {
  SHOPS: 'sc_shops_v10',
  PRODUCTS: 'sc_products_v10',
  ORDERS: 'sc_orders_v10',
  REVIEWS: 'sc_reviews_v10'
};

// Safe LocalStorage helpers
const getStoredList = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.warn(`Error reading ${key} from storage:`, e);
    return fallback;
  }
};

const setStoredList = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error writing ${key} to storage:`, e);
  }
};

// Initialize default storage on first load
export const initializeLocalStorage = () => {
  // Clean up legacy storage versions
  try {
    localStorage.removeItem('sc_shops_v1');
    localStorage.removeItem('sc_products_v1');
    localStorage.removeItem('sc_shops_v2');
    localStorage.removeItem('sc_products_v2');
    localStorage.removeItem('sc_shops_v3');
    localStorage.removeItem('sc_products_v3');
    localStorage.removeItem('sc_shops_v4');
    localStorage.removeItem('sc_products_v4');
    localStorage.removeItem('sc_shops_v5');
    localStorage.removeItem('sc_products_v5');
    localStorage.removeItem('sc_orders_v5');
    localStorage.removeItem('sc_shops_v6');
    localStorage.removeItem('sc_products_v6');
    localStorage.removeItem('sc_orders_v6');
    localStorage.removeItem('sc_shops_v7');
    localStorage.removeItem('sc_products_v7');
    localStorage.removeItem('sc_orders_v7');
    localStorage.removeItem('sc_shops_v8');
    localStorage.removeItem('sc_products_v8');
    localStorage.removeItem('sc_orders_v8');
    localStorage.removeItem('sc_reviews_v8');
    localStorage.removeItem('sc_shops_v9');
    localStorage.removeItem('sc_products_v9');
    localStorage.removeItem('sc_orders_v9');
    localStorage.removeItem('sc_reviews_v9');
  } catch (e) {}

  if (!localStorage.getItem(STORAGE_KEYS.SHOPS)) {
    setStoredList(STORAGE_KEYS.SHOPS, INITIAL_SHOPS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    setStoredList(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    setStoredList(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    setStoredList(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS || []);
  }
};

initializeLocalStorage();

// Helper to prevent slow network / paused DB from blocking screen navigation
const withTimeout = (promise, ms = 1200) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Supabase request timed out')), ms))
  ]);
};

// ==========================================
// 1. SHOPS & PROFILES (SYNC & ASYNC)
// ==========================================

export const getShopsSync = () => {
  return getStoredList(STORAGE_KEYS.SHOPS, INITIAL_SHOPS);
};

export const getShopByIdSync = (shopId) => {
  const shops = getShopsSync();
  return shops.find((s) => String(s.id) === String(shopId)) || null;
};

export const getShops = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await withTimeout(
        supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false })
      );
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Falling back to local shops:', err);
    }
  }
  return getShopsSync();
};

export const getShopById = async (shopId) => {
  // Fast sync lookup first
  const localShop = getShopByIdSync(shopId);
  if (localShop) {
    return localShop;
  }
  const shops = await getShops();
  return shops.find((s) => String(s.id) === String(shopId)) || null;
};

export const createShop = async (shopData) => {
  const initials = shopData.shop_name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  const brandSvgLogo =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="40" fill="#0f172a"/>
  <rect x="12" y="12" width="176" height="176" rx="32" fill="none" stroke="url(#g1)" stroke-width="4"/>
  <circle cx="100" cy="100" r="65" fill="#1e293b" stroke="#60a5fa" stroke-width="3"/>
  <text x="100" y="124" font-family="'Montserrat', 'Inter', system-ui, sans-serif" font-size="64" font-weight="900" fill="#ffffff" text-anchor="middle">${initials || 'SC'}</text>
</svg>
`.trim());

  const defaultBanner =
    shopData.banner_url ||
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80';

  const newShop = {
    id: shopData.id || `retailer-${Date.now()}`,
    shop_name: shopData.shop_name.trim(),
    category: shopData.category || 'general',
    department: shopData.department || 'General Store',
    rating: 5.0,
    reviews_count: 0,
    location_in_mall: 'Verified Online Store',
    phone: shopData.phone || '+1 (555) 000-0000',
    email: (shopData.email || '').trim().toLowerCase(),
    password: shopData.password || 'vendor123',
    description: shopData.description || 'Welcome to our verified official online storefront.',
    logo_url: shopData.logo_url || brandSvgLogo,
    banner_url: defaultBanner,
    accent_color: shopData.accent_color || '#3b82f6',
    header_gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    created_at: new Date().toISOString()
  };

  // Local sync
  const currentShops = getStoredList(STORAGE_KEYS.SHOPS, INITIAL_SHOPS);
  const updatedShops = [newShop, ...currentShops];
  setStoredList(STORAGE_KEYS.SHOPS, updatedShops);

  // Supabase sync
  if (isSupabaseConfigured && supabase) {
    try {
      await withTimeout(
        supabase.from('profiles').insert([
          {
            id: newShop.id,
            shop_name: newShop.shop_name,
            role: 'retailer',
            category: newShop.category,
            description: newShop.description,
            banner_url: newShop.banner_url
          }
        ])
      );
    } catch (e) {
      console.warn('Supabase shop insert fallback:', e);
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sc:shops_updated', { detail: newShop }));
  }

  return newShop;
};

export const updateShop = async (shopId, updates) => {
  const currentShops = getStoredList(STORAGE_KEYS.SHOPS, INITIAL_SHOPS);
  let updatedShop = null;

  const updatedShops = currentShops.map((shop) => {
    if (String(shop.id) === String(shopId)) {
      updatedShop = { ...shop, ...updates };
      return updatedShop;
    }
    return shop;
  });

  if (updatedShop) {
    setStoredList(STORAGE_KEYS.SHOPS, updatedShops);

    if (isSupabaseConfigured && supabase) {
      try {
        await withTimeout(
          supabase
            .from('profiles')
            .update({
              shop_name: updatedShop.shop_name,
              banner_url: updatedShop.banner_url,
              description: updatedShop.description
            })
            .eq('id', shopId)
        );
      } catch (e) {
        console.warn('Supabase shop update fallback:', e);
      }
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sc:shops_updated', { detail: updatedShop }));
    }
  }

  return updatedShop;
};

export const deleteShop = async (shopId) => {
  const currentShops = getStoredList(STORAGE_KEYS.SHOPS, INITIAL_SHOPS);
  const updatedShops = currentShops.filter((s) => String(s.id) !== String(shopId));
  setStoredList(STORAGE_KEYS.SHOPS, updatedShops);

  // Also clean up products belonging to this shop
  const currentProducts = getStoredList(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const updatedProducts = currentProducts.filter((p) => String(p.retailer_id) !== String(shopId));
  setStoredList(STORAGE_KEYS.PRODUCTS, updatedProducts);

  // Supabase sync if enabled
  if (isSupabaseConfigured && supabase) {
    try {
      await withTimeout(
        supabase.from('products').delete().eq('retailer_id', shopId)
      );
      await withTimeout(
        supabase.from('profiles').delete().eq('id', shopId)
      );
    } catch (e) {
      console.warn('Supabase shop delete fallback:', e);
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sc:shops_updated', { detail: { id: shopId, deleted: true } }));
  }

  return true;
};

export const normalizePhone = (phoneStr) => {
  if (!phoneStr) return '';
  return String(phoneStr).replace(/\D/g, '');
};

export const findShopByCredentials = (identifier, password) => {
  if (!identifier) return null;
  const cleanId = String(identifier).trim().toLowerCase();
  const cleanPhone = normalizePhone(identifier);
  const shops = getStoredList(STORAGE_KEYS.SHOPS, INITIAL_SHOPS);

  const matched = shops.find((s) => {
    const shopEmail = (s.email || '').toLowerCase().trim();
    const shopPhone = normalizePhone(s.phone);
    const shopName = (s.shop_name || '').toLowerCase().trim();

    const matchesEmail = shopEmail && shopEmail === cleanId;
    const matchesPhone =
      cleanPhone.length >= 7 &&
      shopPhone &&
      (shopPhone === cleanPhone ||
        shopPhone.endsWith(cleanPhone) ||
        cleanPhone.endsWith(shopPhone));
    const matchesName = shopName && shopName === cleanId;

    if (matchesEmail || matchesPhone || matchesName) {
      if (!password) return true;
      const expectedPassword = s.password || 'vendor123';
      return expectedPassword === password.trim();
    }
    return false;
  });

  return matched || null;
};

// ==========================================
// 2. PRODUCTS & INVENTORY (SYNC & ASYNC)
// ==========================================

export const getProductsSync = (retailerId = null) => {
  const allProducts = getStoredList(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  if (retailerId) {
    return allProducts.filter((p) => String(p.retailer_id) === String(retailerId));
  }
  return allProducts;
};

export const getProducts = async (retailerId = null) => {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('products').select('*').order('created_at', { ascending: false });
      if (retailerId) {
        query = query.eq('retailer_id', retailerId);
      }
      const { data, error } = await withTimeout(query);
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('Falling back to local products:', e);
    }
  }

  return getProductsSync(retailerId);
};

export const saveProduct = async (productData) => {
  const timestamp = Date.now();
  const isEditing = Boolean(productData.id);
  const productId = productData.id || `prod-${timestamp}`;

  const formattedProduct = {
    id: productId,
    retailer_id: productData.retailer_id,
    name: productData.name.trim(),
    category: productData.category || 'streetwear',
    item_category: productData.item_category || 'tops',
    price: parseFloat(productData.price) || 0,
    badge: productData.badge || '✨ New Item',
    description: productData.description || '',
    image_url: productData.image_url || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80',
    in_stock: productData.in_stock !== undefined ? productData.in_stock : true,
    created_at: productData.created_at || new Date().toISOString()
  };

  // Local storage update
  const currentProds = getStoredList(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  let updatedProds;
  if (isEditing) {
    updatedProds = currentProds.map((p) => String(p.id) === String(productId) ? formattedProduct : p);
  } else {
    updatedProds = [formattedProduct, ...currentProds];
  }
  setStoredList(STORAGE_KEYS.PRODUCTS, updatedProds);

  // Supabase update
  if (isSupabaseConfigured && supabase) {
    try {
      if (isEditing) {
        await withTimeout(supabase.from('products').update(formattedProduct).eq('id', productId));
      } else {
        await withTimeout(supabase.from('products').insert([formattedProduct]));
      }
    } catch (e) {
      console.warn('Supabase product save fallback:', e);
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sc:products_updated', { detail: formattedProduct }));
  }

  return formattedProduct;
};

export const toggleProductStock = async (productId, inStock) => {
  const currentProds = getStoredList(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const updatedProds = currentProds.map((p) => {
    if (String(p.id) === String(productId)) {
      return { ...p, in_stock: inStock };
    }
    return p;
  });
  setStoredList(STORAGE_KEYS.PRODUCTS, updatedProds);

  if (isSupabaseConfigured && supabase) {
    try {
      await withTimeout(supabase.from('products').update({ in_stock: inStock }).eq('id', productId));
    } catch (e) {}
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sc:products_updated', { detail: { productId, inStock } }));
  }
};

export const deleteProduct = async (productId) => {
  const currentProds = getStoredList(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const updatedProds = currentProds.filter((p) => String(p.id) !== String(productId));
  setStoredList(STORAGE_KEYS.PRODUCTS, updatedProds);

  if (isSupabaseConfigured && supabase) {
    try {
      await withTimeout(supabase.from('products').delete().eq('id', productId));
    } catch (e) {}
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sc:products_updated', { detail: { deletedId: productId } }));
  }
};

// ==========================================
// 3. ORDERS & LIVE PIPELINE
// ==========================================

export const getOrders = async (retailerId = null) => {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (retailerId) {
        query = query.eq('retailer_id', retailerId);
      }
      const { data, error } = await withTimeout(query);
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('Falling back to local orders:', e);
    }
  }

  const allOrders = getStoredList(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  if (retailerId) {
    return allOrders.filter((o) => String(o.retailer_id) === String(retailerId));
  }
  return allOrders;
};

export const placeOrder = async (orderData) => {
  const orderId = Math.floor(1000 + Math.random() * 9000);

  const newOrder = {
    id: orderId,
    retailer_id: orderData.retailer_id,
    customer_name: orderData.customer_name.trim(),
    customer_phone: orderData.customer_phone.trim(),
    delivery_notes: orderData.delivery_notes?.trim() || 'Doorstep Delivery',
    total_price: parseFloat(orderData.total_price) || 0,
    status: 'Pending',
    items: orderData.items || [],
    created_at: new Date().toISOString()
  };

  // Local storage save
  const currentOrders = getStoredList(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  const updatedOrders = [newOrder, ...currentOrders];
  setStoredList(STORAGE_KEYS.ORDERS, updatedOrders);

  // Supabase save
  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await withTimeout(
        supabase.from('orders').insert([newOrder]).select()
      );
      if (data && data[0]) {
        newOrder.id = data[0].id;
      }
    } catch (e) {
      console.warn('Supabase place order fallback:', e);
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sc:orders_updated', { detail: newOrder }));
  }

  return newOrder;
};

export const updateOrderStatus = async (orderId, newStatus) => {
  const currentOrders = getStoredList(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  const updatedOrders = currentOrders.map((o) => {
    if (String(o.id) === String(orderId)) {
      return { ...o, status: newStatus };
    }
    return o;
  });
  setStoredList(STORAGE_KEYS.ORDERS, updatedOrders);

  if (isSupabaseConfigured && supabase) {
    try {
      await withTimeout(supabase.from('orders').update({ status: newStatus }).eq('id', orderId));
    } catch (e) {}
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sc:orders_updated', { detail: { orderId, newStatus } }));
  }
};

export const deleteOrdersByDateRange = async (startDate, endDate) => {
  const currentOrders = getStoredList(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  const startMs = new Date(startDate).getTime();
  const endMs = new Date(endDate).getTime();

  const remainingOrders = [];
  let deletedCount = 0;
  let deletedRevenue = 0;

  currentOrders.forEach((o) => {
    const orderTime = new Date(o.created_at).getTime();
    if (orderTime >= startMs && orderTime <= endMs) {
      deletedCount += 1;
      if (o.status === 'Completed') {
        deletedRevenue += Number(o.total_price) || 0;
      }
    } else {
      remainingOrders.push(o);
    }
  });

  setStoredList(STORAGE_KEYS.ORDERS, remainingOrders);

  if (isSupabaseConfigured && supabase) {
    try {
      await withTimeout(
        supabase
          .from('orders')
          .delete()
          .gte('created_at', new Date(startDate).toISOString())
          .lte('created_at', new Date(endDate).toISOString())
      );
    } catch (e) {
      console.warn('Supabase delete orders by range fallback:', e);
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('sc:orders_updated', {
        detail: { deletedRange: true, deletedCount, deletedRevenue }
      })
    );
  }

  return { success: true, deletedCount, deletedRevenue };
};

// ==========================================
// 4. ADMIN REVENUE ANALYTICS AGGREGATION
// ==========================================

export const getRevenueAnalytics = async () => {
  const [orders, shops] = await Promise.all([getOrders(), getShops()]);

  const shopMap = {};
  shops.forEach((s) => {
    shopMap[s.id] = {
      id: s.id,
      shop_name: s.shop_name,
      department: s.department || s.category,
      accent_color: s.accent_color || '#ea580c',
      totalRevenue: 0,
      completedOrdersCount: 0,
      totalOrdersCount: 0
    };
  });

  let mallTotalRevenue = 0;
  let totalCompletedOrders = 0;
  let activePendingOrders = 0;

  orders.forEach((order) => {
    const retailerId = order.retailer_id;
    if (!shopMap[retailerId]) {
      shopMap[retailerId] = {
        id: retailerId,
        shop_name: `Shop (${retailerId})`,
        department: 'General',
        accent_color: '#8b5cf6',
        totalRevenue: 0,
        completedOrdersCount: 0,
        totalOrdersCount: 0
      };
    }

    shopMap[retailerId].totalOrdersCount += 1;

    if (order.status === 'Completed') {
      const amount = Number(order.total_price) || 0;
      shopMap[retailerId].totalRevenue += amount;
      shopMap[retailerId].completedOrdersCount += 1;
      mallTotalRevenue += amount;
      totalCompletedOrders += 1;
    } else if (order.status === 'Pending' || order.status === 'Preparing') {
      activePendingOrders += 1;
    }
  });

  const shopStats = Object.values(shopMap).sort((a, b) => b.totalRevenue - a.totalRevenue);
  const avgOrderValue = totalCompletedOrders > 0 ? (mallTotalRevenue / totalCompletedOrders) : 0;

  return {
    mallTotalRevenue,
    totalCompletedOrders,
    activePendingOrders,
    totalOrdersPlaced: orders.length,
    totalShopsCount: shops.length,
    avgOrderValue,
    shopStats
  };
};

// ==========================================
// 5. REALTIME SUBSCRIPTION
// ==========================================

export const subscribeToOrders = (onUpdate, retailerId = null) => {
  const handleCustomEvent = (e) => {
    onUpdate(e.detail);
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('sc:orders_updated', handleCustomEvent);
  }

  let supabaseChannel = null;
  if (isSupabaseConfigured && supabase) {
    try {
      supabaseChannel = supabase
        .channel(`public:orders:${retailerId || 'all'}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
          onUpdate(payload);
        })
        .subscribe();
    } catch (e) {
      console.warn('Realtime subscription fallback to events:', e);
    }
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('sc:orders_updated', handleCustomEvent);
    }
    if (supabaseChannel && supabase) {
      supabase.removeChannel(supabaseChannel);
    }
  };
};

// ==========================================
// 6. PRODUCT REVIEWS (SYNC & ASYNC)
// ==========================================

export const getReviewsSync = (productId = null, retailerId = null) => {
  const allReviews = getStoredList(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS || []);
  return allReviews.filter((r) => {
    const matchesProduct = !productId || String(r.product_id) === String(productId);
    const matchesRetailer = !retailerId || String(r.retailer_id) === String(retailerId);
    return matchesProduct && matchesRetailer;
  });
};

export const getReviews = async (productId = null, retailerId = null) => {
  return getReviewsSync(productId, retailerId);
};

export const getProductRatingSummary = (productId) => {
  const productReviews = getReviewsSync(productId);
  if (productReviews.length === 0) {
    return { average: 5.0, count: 0, reviews: [] };
  }
  const sum = productReviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
  const average = Number((sum / productReviews.length).toFixed(1));
  return { average, count: productReviews.length, reviews: productReviews };
};

export const addReview = async (reviewData) => {
  const newReview = {
    id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    product_id: reviewData.productId || reviewData.product_id,
    retailer_id: reviewData.retailerId || reviewData.retailer_id || '',
    user_name: (reviewData.userName || reviewData.user_name || 'Verified Shopper').trim(),
    user_email: (reviewData.userEmail || reviewData.user_email || '').trim(),
    rating: Number(reviewData.rating) || 5,
    description: (reviewData.description || reviewData.review || '').trim(),
    created_at: new Date().toISOString()
  };

  const currentReviews = getStoredList(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS || []);
  const updatedReviews = [newReview, ...currentReviews];
  setStoredList(STORAGE_KEYS.REVIEWS, updatedReviews);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sc:reviews_updated', {
      detail: { review: newReview, productId: newReview.product_id, retailerId: newReview.retailer_id }
    }));
  }

  return newReview;
};

export const subscribeToReviews = (onUpdate, productId = null, retailerId = null) => {
  const handleCustomEvent = (e) => {
    const detail = e.detail;
    if (!detail) return;
    if (productId && String(detail.productId) !== String(productId)) return;
    if (retailerId && String(detail.retailerId) !== String(retailerId)) return;
    onUpdate(detail);
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('sc:reviews_updated', handleCustomEvent);
  }

  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('sc:reviews_updated', handleCustomEvent);
    }
  };
};

