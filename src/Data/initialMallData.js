export const MALL_CATEGORIES = [
  { id: 'all', name: 'All Departments', icon: '🏬', description: 'Explore all digital mall storefronts' },
  { id: 'cafes', name: 'Cafes & Dining', icon: '☕', description: 'Artisanal roasts, bakeries & gourmet bites' },
  { id: 'fashion', name: 'Fashion & Apparel', icon: '👗', description: 'Curated streetwear, couture & accessories' },
  { id: 'tech', name: 'Electronics & Tech', icon: '⚡', description: 'Audio gear, smart gadgets & accessories' },
  { id: 'beauty', name: 'Beauty & Fragrance', icon: '✨', description: 'Clean skincare, perfumes & wellness' },
  { id: 'home', name: 'Home & Living', icon: '🪴', description: 'Modern decor, ceramics & interior goods' }
];

export const INITIAL_SHOPS = [
  {
    id: 'retailer-1',
    shop_name: 'Apex Streetwear & Denim',
    category: 'fashion',
    department: 'Fashion & Apparel',
    rating: 4.9,
    reviews_count: 142,
    location_in_mall: 'Floor 2, West Promenade (Suite 204)',
    phone: '+1 (555) 302-8819',
    description: 'High-concept urban silhouettes, heavyweight Japanese denim, and contemporary oversized outerwear.',
    logo_url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#f59e0b',
    pickup_estimated: '15-20 mins'
  },
  {
    id: 'retailer-2',
    shop_name: 'Brew & Bean Specialty Roastery',
    category: 'cafes',
    department: 'Cafes & Dining',
    rating: 4.8,
    reviews_count: 328,
    location_in_mall: 'Floor 1, Grand Atrium (Atrium Kiosk 03)',
    phone: '+1 (555) 441-9923',
    description: 'Micro-lot single origin espresso, slow cold brews, and freshly baked flaky laminated viennoiserie.',
    logo_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#d97706',
    pickup_estimated: '5-10 mins'
  },
  {
    id: 'retailer-3',
    shop_name: 'CyberPulse Tech Lab',
    category: 'tech',
    department: 'Electronics & Tech',
    rating: 4.9,
    reviews_count: 96,
    location_in_mall: 'Floor 3, Innovation Corridor (Suite 310)',
    phone: '+1 (555) 789-2211',
    description: 'Audiophile grade wireless monitors, ergonomic mechanical keyboards, and titanium edc accessories.',
    logo_url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#3b82f6',
    pickup_estimated: '10-15 mins'
  },
  {
    id: 'retailer-4',
    shop_name: 'Aura Botanicals & Scents',
    category: 'beauty',
    department: 'Beauty & Fragrance',
    rating: 4.7,
    reviews_count: 84,
    location_in_mall: 'Floor 1, Garden Court (Suite 118)',
    phone: '+1 (555) 672-0044',
    description: 'Clean botanical skincare serums, sandalwood candle diffusers, and niche artisan perfumes.',
    logo_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1608248597359-07f9c8f2b3e8?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#10b981',
    pickup_estimated: '10-15 mins'
  },
  {
    id: 'retailer-5',
    shop_name: 'Luxe & Loft Living',
    category: 'home',
    department: 'Home & Living',
    rating: 4.9,
    reviews_count: 110,
    location_in_mall: 'Floor 2, Design Gallery (Suite 235)',
    phone: '+1 (555) 901-4477',
    description: 'Handcrafted stoneware ceramics, Scandinavian ambient lighting, and organic linen throws.',
    logo_url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#8b5cf6',
    pickup_estimated: '15-25 mins'
  }
];

export const INITIAL_PRODUCTS = [
  // Apex Streetwear (retailer-1)
  {
    id: 'prod-101',
    retailer_id: 'retailer-1',
    name: 'Midnight Boxy Heavyweight Hoodie',
    category: 'fashion',
    price: 98.00,
    badge: '🔥 Bestseller',
    description: '450 GSM organic French terry cotton with subtle high-density tonal embroidery and drop shoulders.',
    image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-102',
    retailer_id: 'retailer-1',
    name: 'Selvedge Raw Denim Relaxed Pant',
    category: 'fashion',
    price: 145.00,
    badge: '⭐ Premium Cut',
    description: '14oz Kurabo Japanese shuttle-loom selvedge denim with custom oxidized brass hardware.',
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-103',
    retailer_id: 'retailer-1',
    name: 'Structured Utility Canvas Crossbody',
    category: 'fashion',
    price: 64.00,
    badge: '✨ New Drop',
    description: 'Weatherproof ballistic nylon messenger with FIDLOCK magnetic clasp and quick-release strap.',
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },

  // Brew & Bean (retailer-2)
  {
    id: 'prod-201',
    retailer_id: 'retailer-2',
    name: 'Signature Vanilla Bean Oat Cortado',
    category: 'cafes',
    price: 6.50,
    badge: '☕ Barista Pick',
    description: 'Double shot Ethiopian Yirgacheffe espresso pulled over velvety steamed oat milk and Madagascar vanilla.',
    image_url: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-202',
    retailer_id: 'retailer-2',
    name: 'Salted Caramel Cold Brew Float',
    category: 'cafes',
    price: 7.25,
    badge: '🔥 Fan Favorite',
    description: '24-hour slow steeped cold brew topped with silky mascarpone cold foam and Maldon sea salt flakes.',
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-203',
    retailer_id: 'retailer-2',
    name: 'Almond Frangipane Flaky Croissant',
    category: 'cafes',
    price: 5.75,
    badge: '🥐 Fresh Baked',
    description: 'Twice-baked French butter croissant filled with rich almond cream and dusted with powdered sugar.',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-204',
    retailer_id: 'retailer-2',
    name: 'Artisan Smoked Turkey Focaccia Melt',
    category: 'cafes',
    price: 12.50,
    badge: '🥪 Chef Special',
    description: 'House rosemary focaccia with shaved turkey breast, melted aged provolone, and pesto mayo.',
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },

  // CyberPulse (retailer-3)
  {
    id: 'prod-301',
    retailer_id: 'retailer-3',
    name: 'PulseWave Active Noise Cancelling Headphones',
    category: 'tech',
    price: 249.00,
    badge: '⚡ Top Rated',
    description: 'Dual bio-cellulose dynamic drivers, 48dB active hybrid noise cancellation, and 40-hour battery life.',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-302',
    retailer_id: 'retailer-3',
    name: 'Lumik 75% Mechanical Wireless Keyboard',
    category: 'tech',
    price: 139.00,
    badge: '⌨️ Enthusiast',
    description: 'CNC aluminum chassis with pre-lubed Gateron Yellow switches, sound-dampening silicone, and RGB.',
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-303',
    retailer_id: 'retailer-3',
    name: 'MagFast Titanium Qi2 Wireless Charging Pad',
    category: 'tech',
    price: 54.00,
    badge: '⚡ Fast Charge',
    description: 'Braided aramid cable with aerospace titanium housing capable of 15W high-speed magnetic alignment.',
    image_url: 'https://images.unsplash.com/photo-1622445262464-84b1a07374a4?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },

  // Aura Botanicals (retailer-4)
  {
    id: 'prod-401',
    retailer_id: 'retailer-4',
    name: 'Celestial Glow Squalane Facial Elixir',
    category: 'beauty',
    price: 48.00,
    badge: '✨ Radiance',
    description: 'Deeply hydrating plant-derived squalane infused with cold-pressed rosehip seed and blue tansy oil.',
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-402',
    retailer_id: 'retailer-4',
    name: 'Santale 33 Amber & Cedarwood Candle',
    category: 'beauty',
    price: 36.00,
    badge: '🕯️ Hand Poured',
    description: '100% natural soy wax candle with crackling wood wick featuring notes of smoked cedar and warm cardamom.',
    image_url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },

  // Luxe & Loft Living (retailer-5)
  {
    id: 'prod-501',
    retailer_id: 'retailer-5',
    name: 'Nordic Ribbed Ceramic Pouring Pitcher',
    category: 'home',
    price: 42.00,
    badge: '🏺 Artisan Made',
    description: 'Wheel-thrown stoneware pitcher with reactive satin glaze. Microwave and dishwasher safe.',
    image_url: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-502',
    retailer_id: 'retailer-5',
    name: 'Pure Washed French Linen Throw Blanket',
    category: 'home',
    price: 85.00,
    badge: '🌱 100% Organic',
    description: 'Breathable, temperature-regulating European flax linen pre-washed for incredible softness.',
    image_url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80',
    in_stock: true
  }
];

export const INITIAL_ORDERS = [
  {
    id: 1001,
    retailer_id: 'retailer-2',
    customer_name: 'Marcus Vance',
    customer_phone: '+1 (555) 234-9812',
    delivery_notes: 'Food Court Table 8',
    total_price: 19.50,
    status: 'Completed',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    items: [
      { id: 'prod-201', name: 'Signature Vanilla Bean Oat Cortado', price: 6.50, quantity: 2 },
      { id: 'prod-203', name: 'Almond Frangipane Flaky Croissant', price: 5.75, quantity: 1 }
    ]
  },
  {
    id: 1002,
    retailer_id: 'retailer-1',
    customer_name: 'Sophia Chen',
    customer_phone: '+1 (555) 891-2304',
    delivery_notes: 'Curbside Pickup Bay C',
    total_price: 98.00,
    status: 'Completed',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    items: [
      { id: 'prod-101', name: 'Midnight Boxy Heavyweight Hoodie', price: 98.00, quantity: 1 }
    ]
  },
  {
    id: 1003,
    retailer_id: 'retailer-3',
    customer_name: 'Liam Gallagher',
    customer_phone: '+1 (555) 345-6789',
    delivery_notes: 'Pickup at Tech Lab Counter',
    total_price: 139.00,
    status: 'Completed',
    created_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    items: [
      { id: 'prod-302', name: 'Lumik 75% Mechanical Wireless Keyboard', price: 139.00, quantity: 1 }
    ]
  },
  {
    id: 1004,
    retailer_id: 'retailer-2',
    customer_name: 'Elena Rostova',
    customer_phone: '+1 (555) 778-9901',
    delivery_notes: 'Atrium Bench near Fountain',
    total_price: 13.00,
    status: 'Preparing',
    created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    items: [
      { id: 'prod-201', name: 'Signature Vanilla Bean Oat Cortado', price: 6.50, quantity: 2 }
    ]
  },
  {
    id: 1005,
    retailer_id: 'retailer-1',
    customer_name: 'Devon Brooks',
    customer_phone: '+1 (555) 432-1199',
    delivery_notes: 'Store Fitting Lounge',
    total_price: 145.00,
    status: 'Pending',
    created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    items: [
      { id: 'prod-102', name: 'Selvedge Raw Denim Relaxed Pant', price: 145.00, quantity: 1 }
    ]
  }
];
