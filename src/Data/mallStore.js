import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { INITIAL_SHOPS, INITIAL_PRODUCTS, INITIAL_ORDERS } from './initialMallData';

const STORAGE_KEYS = {
  SHOPS: 'sc_shops_v3',
  PRODUCTS: 'sc_products_v3',
  ORDERS: 'sc_orders_v3'
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
  // Clean up legacy v1/v2 cafe data if needed
  try {
    localStorage.removeItem('sc_shops_v1');
    localStorage.removeItem('sc_products_v1');
    localStorage.removeItem('sc_shops_v2');
    localStorage.removeItem('sc_products_v2');
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
};

initializeLocalStorage();

// ==========================================
// 1. SHOPS & PROFILES
// ==========================================

export const getShops = async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Falling back to local shops:', err);
    }
  }
  return getStoredList(STORAGE_KEYS.SHOPS, INITIAL_SHOPS);
};

export const getShopById = async (shopId) => {
  const shops = await getShops();
  return shops.find((s) => String(s.id) === String(shopId)) || null;
};

export const createShop = async (shopData) => {
  const newShop = {
    id: shopData.id || `retailer-${Date.now()}`,
    shop_name: shopData.shop_name.trim(),
    category: shopData.category || 'fashion',
    department: shopData.department || 'Fashion & Apparel',
    rating: 5.0,
    reviews_count: 0,
    location_in_mall: shopData.location_in_mall || 'Floor 1, Promenade',
    phone: shopData.phone || '+1 (555) 000-0000',
    description: shopData.description || 'Welcome to our digital mall storefront.',
    logo_url: shopData.logo_url || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&auto=format&fit=crop&q=80',
    banner_url: shopData.banner_url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    accent_color: shopData.accent_color || '#e5a93c',
    pickup_estimated: shopData.pickup_estimated || '10-15 mins',
    created_at: new Date().toISOString()
  };

  // Local sync
  const currentShops = getStoredList(STORAGE_KEYS.SHOPS, INITIAL_SHOPS);
  const updatedShops = [newShop, ...currentShops];
  setStoredList(STORAGE_KEYS.SHOPS, updatedShops);

  // Supabase sync
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('profiles').insert([{
        id: newShop.id,
        shop_name: newShop.shop_name,
        role: 'retailer',
        category: newShop.category,
        description: newShop.description,
        banner_url: newShop.banner_url
      }]);
    } catch (e) {
      console.warn('Supabase shop insert fallback:', e);
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sc:shops_updated', { detail: newShop }));
  }

  return newShop;
};

// ==========================================
// 2. PRODUCTS & INVENTORY
// ==========================================

export const getProducts = async (retailerId = null) => {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('products').select('*').order('created_at', { ascending: false });
      if (retailerId) {
        query = query.eq('retailer_id', retailerId);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('Falling back to local products:', e);
    }
  }

  const allProducts = getStoredList(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  if (retailerId) {
    return allProducts.filter((p) => String(p.retailer_id) === String(retailerId));
  }
  return allProducts;
};

export const saveProduct = async (productData) => {
  const timestamp = Date.now();
  const isEditing = Boolean(productData.id);
  const productId = productData.id || `prod-${timestamp}`;

  const formattedProduct = {
    id: productId,
    retailer_id: productData.retailer_id,
    name: productData.name.trim(),
    category: productData.category || 'general',
    price: parseFloat(productData.price) || 0,
    badge: productData.badge || '✨ New Item',
    description: productData.description || '',
    image_url: productData.image_url || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&auto=format&fit=crop&q=80',
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
        await supabase.from('products').update(formattedProduct).eq('id', productId);
      } else {
        await supabase.from('products').insert([formattedProduct]);
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
      await supabase.from('products').update({ in_stock: inStock }).eq('id', productId);
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
      await supabase.from('products').delete().eq('id', productId);
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
      const { data, error } = await query;
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
    delivery_notes: orderData.delivery_notes?.trim() || 'Mall Pickup Counter',
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
      const { data } = await supabase.from('orders').insert([newOrder]).select();
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
      await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    } catch (e) {}
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sc:orders_updated', { detail: { orderId, newStatus } }));
  }
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
      accent_color: s.accent_color || '#e5a93c',
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
