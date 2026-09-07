export const MALL_CATEGORIES = [
  { id: 'all', name: 'All Boutiques', icon: '🏬', description: 'Explore all digital mall storefronts' },
  { id: 'streetwear', name: 'Street Wear', icon: '👕', description: 'Oversized hoodies, denim & graphic drops' },
  { id: 'skincare', name: 'Skin Care', icon: '✨', description: 'Clean botanical serums, creams & cleansers' },
  { id: 'shoes', name: 'Shoes', icon: '👟', description: 'Retro runners, sneakers & artisan boots' },
  { id: 'tech', name: 'Tech Accessories', icon: '⚡', description: 'Audio monitors, mechanical keyboards & cables' },
  { id: 'bags', name: 'Bags', icon: '🎒', description: 'Commuter backpacks, leather duffels & slings' }
];

export const SHOP_ITEM_CATEGORIES = {
  'retailer-1': [
    { id: 'all', label: 'All Streetwear' },
    { id: 'tops', label: 'Tops' },
    { id: 'bottom', label: 'Bottom' },
    { id: 'hoodies', label: 'Hoodies' },
    { id: 'caps', label: 'Caps' }
  ],
  'retailer-2': [
    { id: 'all', label: 'All Skincare' },
    { id: 'serums', label: 'Serums' },
    { id: 'cleansers', label: 'Cleansers' },
    { id: 'moisturizer', label: 'Moisturizer' },
    { id: 'sun screen', label: 'Sun Screen' }
  ],
  'retailer-3': [
    { id: 'all', label: 'All Shoes' },
    { id: 'formal', label: 'Formal' },
    { id: 'sneakers', label: 'Sneakers' },
    { id: 'joggers', label: 'Joggers' },
    { id: 'slippers', label: 'Slippers' }
  ],
  'retailer-4': [
    { id: 'all', label: 'All Tech' },
    { id: 'earbuds', label: 'Earbuds' },
    { id: 'mouse', label: 'Mouse' },
    { id: 'keyboards', label: 'Keyboards' },
    { id: 'cables', label: 'Cables' }
  ],
  'retailer-5': [
    { id: 'all', label: 'All Bags' },
    { id: 'crossbody', label: 'Crossbody' },
    { id: 'shoulder', label: 'Shoulder' },
    { id: 'handbags', label: 'Handbags' }
  ]
};

export const INITIAL_SHOPS = [
  {
    id: 'retailer-1',
    shop_name: 'Apex Streetwear & Denim',
    category: 'streetwear',
    department: 'Street Wear',
    rating: 4.9,
    reviews_count: 168,
    location_in_mall: 'Floor 2, West Promenade (Suite 204)',
    phone: '+1 (555) 302-8819',
    pickup_counter: 'Promenade Express Bay 2A',
    description: 'High-concept urban streetwear, heavyweight boxy hoodies, Japanese selvedge denim, distressed tops, and limited graphic drops.',
    logo_url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#ea580c',
    header_gradient: 'linear-gradient(135deg, #18181b 0%, #27272a 45%, #7c2d12 100%)',
    item_categories: SHOP_ITEM_CATEGORIES['retailer-1'],
    hours: {
      mon_fri: '10:00 AM – 9:00 PM',
      sat: '10:00 AM – 10:00 PM',
      sun: '11:00 AM – 8:00 PM'
    }
  },
  {
    id: 'retailer-2',
    shop_name: 'Aura Botanical Skincare',
    category: 'skincare',
    department: 'Skin Care',
    rating: 4.8,
    reviews_count: 145,
    location_in_mall: 'Floor 1, Garden Court (Suite 118)',
    phone: '+1 (555) 672-0044',
    pickup_counter: 'Garden Court Curbside Locker 1B',
    description: 'Clean dermatological formulas, botanical facial oils, squalane hydration serums, barrier creams, and reef-safe daily sunscreens.',
    logo_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#10b981',
    header_gradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 45%, #065f46 100%)',
    item_categories: SHOP_ITEM_CATEGORIES['retailer-2'],
    hours: {
      mon_fri: '10:00 AM – 9:00 PM',
      sat: '10:00 AM – 10:00 PM',
      sun: '11:00 AM – 8:00 PM'
    }
  },
  {
    id: 'retailer-3',
    shop_name: 'SoleCraft Shoes & Sneakers',
    category: 'shoes',
    department: 'Shoes',
    rating: 4.9,
    reviews_count: 210,
    location_in_mall: 'Floor 1, North Concourse (Suite 142)',
    phone: '+1 (555) 441-8899',
    pickup_counter: 'North Concourse Pickup Kiosk 14',
    description: 'Handcrafted formal oxfords, limited retro sneakers, high-rebound joggers, and shearling comfort slippers.',
    logo_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#d97706',
    header_gradient: 'linear-gradient(135deg, #451a03 0%, #78350f 45%, #9a3412 100%)',
    item_categories: SHOP_ITEM_CATEGORIES['retailer-3'],
    hours: {
      mon_fri: '10:00 AM – 9:00 PM',
      sat: '10:00 AM – 10:00 PM',
      sun: '11:00 AM – 8:00 PM'
    }
  },
  {
    id: 'retailer-4',
    shop_name: 'CyberPulse Tech Accessories',
    category: 'tech',
    department: 'Tech Accessories',
    rating: 4.9,
    reviews_count: 132,
    location_in_mall: 'Floor 3, Innovation Hub (Suite 310)',
    phone: '+1 (555) 789-2211',
    pickup_counter: 'Tech Hub Rapid Collect Bay 3',
    description: 'Audiophile ANC wireless earbuds, precision lightweight gaming mice, custom hot-swap mechanical keyboards, and 100W braided cables.',
    logo_url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#3b82f6',
    header_gradient: 'linear-gradient(135deg, #090d16 0%, #0f172a 45%, #1e3a8a 100%)',
    item_categories: SHOP_ITEM_CATEGORIES['retailer-4'],
    hours: {
      mon_fri: '10:00 AM – 9:00 PM',
      sat: '10:00 AM – 10:00 PM',
      sun: '11:00 AM – 8:00 PM'
    }
  },
  {
    id: 'retailer-5',
    shop_name: 'Nomad Bags & Leathercraft',
    category: 'bags',
    department: 'Bags',
    rating: 4.9,
    reviews_count: 118,
    location_in_mall: 'Floor 2, South Promenade (Suite 228)',
    phone: '+1 (555) 901-4477',
    pickup_counter: 'South Promenade Concierge Desk 2',
    description: 'Tactical EDC crossbody slings, Italian suede shoulder totes, structured full-grain handbags, and handcrafted leather goods.',
    logo_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&auto=format&fit=crop&q=80',
    banner_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&auto=format&fit=crop&q=80',
    accent_color: '#8b5cf6',
    header_gradient: 'linear-gradient(135deg, #1e0938 0%, #2e1065 45%, #581c87 100%)',
    item_categories: SHOP_ITEM_CATEGORIES['retailer-5'],
    hours: {
      mon_fri: '10:00 AM – 9:00 PM',
      sat: '10:00 AM – 10:00 PM',
      sun: '11:00 AM – 8:00 PM'
    }
  }
];

export const INITIAL_PRODUCTS = [
  // ==========================================
  // 1. Street Wear - Apex Streetwear & Denim (retailer-1)
  // Categories: tops, bottom, hoodies, caps
  // ==========================================
  // Tops
  {
    id: 'prod-sw-top-1',
    retailer_id: 'retailer-1',
    name: 'Vintage Acid Wash Heavyweight Graphic Tee',
    category: 'streetwear',
    item_category: 'tops',
    price: 48.00,
    badge: '✨ New Drop',
    description: 'Pre-shrunk 260 GSM combed cotton with faded distressed wash, boxy streetwear fit, and vintage screenprint.',
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-sw-top-2',
    retailer_id: 'retailer-1',
    name: 'Tokyo Oversized Minimalist Mockneck Top',
    category: 'streetwear',
    item_category: 'tops',
    price: 54.00,
    badge: '🔥 Bestseller',
    description: 'Structured silhouette crafted from heavyweight double-knit interlock jersey with clean raw-edge finish.',
    image_url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Bottom
  {
    id: 'prod-sw-bot-1',
    retailer_id: 'retailer-1',
    name: 'Kurabo Selvedge Raw Denim Relaxed Pant',
    category: 'streetwear',
    item_category: 'bottom',
    price: 145.00,
    badge: '⭐ Premium Cut',
    description: '14oz Japanese shuttle-loom selvedge denim with custom oxidized brass hardware and wide-leg break.',
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-sw-bot-2',
    retailer_id: 'retailer-1',
    name: 'Modular Tactical Cargo Trousers with Straps',
    category: 'streetwear',
    item_category: 'bottom',
    price: 110.00,
    badge: '⚡ Utility Fit',
    description: 'Water-repellent ripstop cotton twill featuring 8 multi-depth bellows pockets and cinch-cord ankle cuffs.',
    image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Hoodies
  {
    id: 'prod-sw-hood-1',
    retailer_id: 'retailer-1',
    name: 'Midnight Boxy 450 GSM Heavyweight Hoodie',
    category: 'streetwear',
    item_category: 'hoodies',
    price: 98.00,
    badge: '🔥 Fan Favorite',
    description: 'Ultra-dense organic French terry cotton with double-layered crossover hood and drop-shoulder aesthetic.',
    image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-sw-hood-2',
    retailer_id: 'retailer-1',
    name: 'Faded Charcoal French Terry Full-Zip Hoodie',
    category: 'streetwear',
    item_category: 'hoodies',
    price: 105.00,
    badge: '✨ Streetwear',
    description: 'Pigment-dyed heavyweight zip hoodie with heavy-gauge 2-way antique silver zipper and kangaroo pockets.',
    image_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Caps
  {
    id: 'prod-sw-cap-1',
    retailer_id: 'retailer-1',
    name: 'Distressed Low-Profile Vintage Dad Cap',
    category: 'streetwear',
    item_category: 'caps',
    price: 36.00,
    badge: '🧢 Classic',
    description: 'Unstructured 6-panel washed cotton twill with antique brass tri-glide buckle and curved brim.',
    image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-sw-cap-2',
    retailer_id: 'retailer-1',
    name: 'Minimalist Embroidered Canvas Snapback',
    category: 'streetwear',
    item_category: 'caps',
    price: 40.00,
    badge: '✨ Limited',
    description: 'High-crown structured canvas cap featuring tonal micro-embroidery and adjustable snap closure.',
    image_url: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },

  // ==========================================
  // 2. Skin Care - Aura Botanical Skincare (retailer-2)
  // Categories: serums, cleansers, moisturizer, sun screen
  // ==========================================
  // Serums
  {
    id: 'prod-sk-ser-1',
    retailer_id: 'retailer-2',
    name: 'Celestial Glow Squalane & Rosehip Facial Elixir',
    category: 'skincare',
    item_category: 'serums',
    price: 48.00,
    badge: '✨ Radiance',
    description: 'Deeply hydrating plant-derived squalane infused with cold-pressed organic rosehip seed oil and blue tansy.',
    image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-sk-ser-2',
    retailer_id: 'retailer-2',
    name: '10% Pure Niacinamide + Zinc Clarifying Serum',
    category: 'skincare',
    item_category: 'serums',
    price: 42.00,
    badge: '💧 Pore Refine',
    description: 'Concentrated vitamin B3 serum designed to balance sebum activity, minimize pores, and smooth skin texture.',
    image_url: 'https://images.unsplash.com/photo-1608248597359-07f9c8f2b3e8?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Cleansers
  {
    id: 'prod-sk-cln-1',
    retailer_id: 'retailer-2',
    name: 'Botanical Rosehip & Oat Melt Cleansing Balm',
    category: 'skincare',
    item_category: 'cleansers',
    price: 36.00,
    badge: '🌿 Clean Beauty',
    description: 'Transformative oil-to-milk balm that dissolves water-resistant SPF and impurities without stripping natural lipids.',
    image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-sk-cln-2',
    retailer_id: 'retailer-2',
    name: 'Gentle Green Tea & Centella pH 5.5 Gel Cleanser',
    category: 'skincare',
    item_category: 'cleansers',
    price: 30.00,
    badge: '🌱 Sensitive Safe',
    description: 'Low-pH soothing facial cleanser formulated with fermented green tea extract and calming centella asiatica.',
    image_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Moisturizer
  {
    id: 'prod-sk-moi-1',
    retailer_id: 'retailer-2',
    name: 'Peptide Infusion Overnight Barrier Restoring Cream',
    category: 'skincare',
    item_category: 'moisturizer',
    price: 52.00,
    badge: '💧 Barrier Restore',
    description: 'Multi-peptide ceramide complex that fortifies the epidermal moisture barrier and locks in all-night hydration.',
    image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-sk-moi-2',
    retailer_id: 'retailer-2',
    name: 'Cloud Lightweight Hyaluronic Water Gel',
    category: 'skincare',
    item_category: 'moisturizer',
    price: 38.00,
    badge: '✨ Ultra Hydrate',
    description: 'Oil-free burst-release water moisturizer that absorbs instantly with 5 molecular weights of hyaluronic acid.',
    image_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Sun Screen
  {
    id: 'prod-sk-sun-1',
    retailer_id: 'retailer-2',
    name: 'Invisible Shield SPF 50+ Daily Hydrating Fluid',
    category: 'skincare',
    item_category: 'sun screen',
    price: 36.00,
    badge: '☀️ Zero Whitecast',
    description: 'Weightless chemical sunscreen serum offering broad-spectrum UVA/UVB protection with invisible satin finish.',
    image_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-sk-sun-2',
    retailer_id: 'retailer-2',
    name: 'Matte Mineral Zinc SPF 50 Broad Spectrum Sunscreen',
    category: 'skincare',
    item_category: 'sun screen',
    price: 34.00,
    badge: '🌿 Reef Safe',
    description: '100% non-nano zinc oxide sunscreen infused with soothing bisabolol for pore-blurring matte coverage.',
    image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },

  // ==========================================
  // 3. Shoes - SoleCraft Shoes & Sneakers (retailer-3)
  // Categories: formal, sneakers, joggers, slippers
  // ==========================================
  // Formal
  {
    id: 'prod-sh-for-1',
    retailer_id: 'retailer-3',
    name: 'Hand-Burnished Oxford Brogues in Espresso Calfskin',
    category: 'shoes',
    item_category: 'formal',
    price: 185.00,
    badge: '⭐ Handcrafted',
    description: 'Goodyear-welted full-grain Italian calf leather with laser-perforated medallion toe and stacked leather heel.',
    image_url: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-sh-for-2',
    retailer_id: 'retailer-3',
    name: 'Classic Calfskin Leather Penny Loafers',
    category: 'shoes',
    item_category: 'formal',
    price: 165.00,
    badge: '👞 Artisan Made',
    description: 'Supple hand-stitched apron moc toe with cushioned arch-support insole and durable leather outsoles.',
    image_url: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Sneakers
  {
    id: 'prod-sh-snk-1',
    retailer_id: 'retailer-3',
    name: 'Phantom Kinetic Retro Low-Top Sneakers',
    category: 'shoes',
    item_category: 'sneakers',
    price: 135.00,
    badge: '👟 Trending',
    description: 'Premium calfskin leather with natural gum sole, perforated side panels, and ergonomic OrthoLite footbed.',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-sh-snk-2',
    retailer_id: 'retailer-3',
    name: 'Minimalist Monochromatic White Calfskin Sneaker',
    category: 'shoes',
    item_category: 'sneakers',
    price: 125.00,
    badge: '✨ Core Classic',
    description: 'Clean architectural lines, gold-stamped heel detail, buttery leather lining, and vulcanized rubber cupsole.',
    image_url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Joggers
  {
    id: 'prod-sh-jog-1',
    retailer_id: 'retailer-3',
    name: 'CloudStrider Ultralight Cushion Runner',
    category: 'shoes',
    item_category: 'joggers',
    price: 120.00,
    badge: '⚡ Performance',
    description: 'Breathable jacquard knit upper paired with nitrogen-infused dual-density foam for boundless kinetic return.',
    image_url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-sh-jog-2',
    retailer_id: 'retailer-3',
    name: 'Aero-Knit Carbon Plate Long Distance Jogger',
    category: 'shoes',
    item_category: 'joggers',
    price: 145.00,
    badge: '🏃 Pro Pace',
    description: 'Full-length carbon fiber propulsion plate encased in high-rebound supercritical midsole foam.',
    image_url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Slippers
  {
    id: 'prod-sh-slp-1',
    retailer_id: 'retailer-3',
    name: 'Shearling-Lined Suede Lounge Slippers',
    category: 'shoes',
    item_category: 'slippers',
    price: 68.00,
    badge: '☁️ Cloud Comfort',
    description: 'Plush genuine Australian shearling interior with water-resistant cowhide suede upper and EVA tread sole.',
    image_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-sh-slp-2',
    retailer_id: 'retailer-3',
    name: 'Ergonomic Recovery Cushion Slide Slippers',
    category: 'shoes',
    item_category: 'slippers',
    price: 45.00,
    badge: '✨ Relax Fit',
    description: 'High-density one-piece molded EVA slide engineered with deep heel cup and pronounced arch cradle.',
    image_url: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },

  // ==========================================
  // 4. Tech Accessories - CyberPulse Tech Accessories (retailer-4)
  // Categories: earbuds, mouse, keyboards, cables
  // ==========================================
  // Earbuds
  {
    id: 'prod-tc-ear-1',
    retailer_id: 'retailer-4',
    name: 'PulseWave Pro Active Noise Cancelling Earbuds',
    category: 'tech',
    item_category: 'earbuds',
    price: 149.00,
    badge: '⚡ Hi-Fi ANC',
    description: '11mm beryllium acoustic drivers, 48dB adaptive hybrid noise cancellation, LDAC high-res audio codec.',
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-tc-ear-2',
    retailer_id: 'retailer-4',
    name: 'AeroPods True Wireless Ultra-Low Latency Buds',
    category: 'tech',
    item_category: 'earbuds',
    price: 89.00,
    badge: '🎵 Studio Sound',
    description: '35ms ultra-low gaming latency, IPX7 sweatproof nano-coating, and ergonomic stay-in-ear comfort wings.',
    image_url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Mouse
  {
    id: 'prod-tc-mou-1',
    retailer_id: 'retailer-4',
    name: 'Apex Glide Ultralight 49g Wireless Gaming Mouse',
    category: 'tech',
    item_category: 'mouse',
    price: 79.00,
    badge: '⚡ 26K DPI',
    description: 'PixArt PAW3395 optical sensor, 4000Hz polling rate support, PTFE virgin feet, and 80-hour battery life.',
    image_url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-tc-mou-2',
    retailer_id: 'retailer-4',
    name: 'ErgoPrecision Silent Wireless Productivity Mouse',
    category: 'tech',
    item_category: 'mouse',
    price: 69.00,
    badge: '✨ Silent Click',
    description: 'Sculpted ergonomic thumb rest, dual-mode Bluetooth & 2.4GHz receiver, and frictionless metal mag-speed scroll wheel.',
    image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Keyboards
  {
    id: 'prod-tc-kbd-1',
    retailer_id: 'retailer-4',
    name: 'Lumik 75% Mechanical Hot-Swap Wireless Keyboard',
    category: 'tech',
    item_category: 'keyboards',
    price: 139.00,
    badge: '⌨️ Enthusiast',
    description: 'CNC anodized aluminum frame with pre-lubed Gateron Yellow Pro linear switches and multi-layer silicone acoustic dampening.',
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-tc-kbd-2',
    retailer_id: 'retailer-4',
    name: 'Ghost Key 60% Low-Profile Mechanical Keyboard',
    category: 'tech',
    item_category: 'keyboards',
    price: 119.00,
    badge: '✨ Ultra Slim',
    description: 'Ultra-thin aluminum chassis, Kailh low-profile red switches, dye-sublimated PBT keycaps, and custom RGB modes.',
    image_url: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Cables
  {
    id: 'prod-tc-cbl-1',
    retailer_id: 'retailer-4',
    name: '100W Braided Kevlar USB-C Fast Charging Cable (2M)',
    category: 'tech',
    item_category: 'cables',
    price: 24.00,
    badge: '⚡ 100W Power',
    description: 'Double-braided bulletproof aramid fiber with E-marker chip, 480Mbps data sync, and reinforced strain-relief joints.',
    image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-tc-cbl-2',
    retailer_id: 'retailer-4',
    name: '3-in-1 Ultra-Durable Magnetic Quick-Charge Cable',
    category: 'tech',
    item_category: 'cables',
    price: 29.00,
    badge: '✨ 540° Swivel',
    description: 'Interchangeable magnetic tips for Lightning, Type-C, and Micro USB with 540-degree rotatable magnetic hinge.',
    image_url: 'https://images.unsplash.com/photo-1622445262464-84b1a07374a4?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },

  // ==========================================
  // 5. Bags - Nomad Bags & Leathercraft (retailer-5)
  // Categories: crossbody, shoulder, handbags
  // ==========================================
  // Crossbody
  {
    id: 'prod-bg-cro-1',
    retailer_id: 'retailer-5',
    name: 'Tactical Ballistic EDC Crossbody Sling',
    category: 'bags',
    item_category: 'crossbody',
    price: 68.00,
    badge: '✨ Modular',
    description: 'Compact Cordura 1000D weather-sealed sling with German Fidlock magnetic buckle, key leash, and concealed passport slot.',
    image_url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-bg-cro-2',
    retailer_id: 'retailer-5',
    name: 'Minimalist Waterproof Ripstop Crossbody Bag',
    category: 'bags',
    item_category: 'crossbody',
    price: 52.00,
    badge: '🌧️ Weatherproof',
    description: 'Ultralight dimension-polyant sailcloth body with YKK AquaGuard water-repellent zippers and quick-cinch strap.',
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Shoulder
  {
    id: 'prod-bg-shd-1',
    retailer_id: 'retailer-5',
    name: 'Slouchy Italian Suede Leather Shoulder Bag',
    category: 'bags',
    item_category: 'shoulder',
    price: 145.00,
    badge: '⭐ Luxury Suede',
    description: 'Velvety Italian split suede leather featuring unlined relaxed slouch structure and comfortable wide shoulder strap.',
    image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-bg-shd-2',
    retailer_id: 'retailer-5',
    name: 'Padded Commuter Canvas & Leather Shoulder Tote',
    category: 'bags',
    item_category: 'shoulder',
    price: 115.00,
    badge: '✨ Daily Carry',
    description: 'Heavy 18oz waxed cotton duck canvas with bridle leather handles, padded 15-inch laptop compartment, and luggage pass-through.',
    image_url: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  // Handbags
  {
    id: 'prod-bg-hnd-1',
    retailer_id: 'retailer-5',
    name: 'Heritage Full-Grain Structured Leather Handbag',
    category: 'bags',
    item_category: 'handbags',
    price: 175.00,
    badge: '⭐ Premium Cut',
    description: 'Tuscan vegetable-tanned full-grain leather with hand-painted beveled edges, gold-toned turnlock, and removable strap.',
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  },
  {
    id: 'prod-bg-hnd-2',
    retailer_id: 'retailer-5',
    name: 'Artisan Minimalist Top-Handle Leather Satchel',
    category: 'bags',
    item_category: 'handbags',
    price: 160.00,
    badge: '✨ Timeless',
    description: 'Geometric sculpted silhouette with magnetic flap closure, suede interior lining, and protective brass base feet.',
    image_url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=900&auto=format&fit=crop&q=80',
    in_stock: true
  }
];

export const INITIAL_ORDERS = [
  {
    id: 1001,
    retailer_id: 'retailer-1',
    customer_name: 'Marcus Vance',
    customer_phone: '+1 (555) 234-9812',
    delivery_notes: 'Floor 2 Pickup Locker Bay B',
    total_price: 98.00,
    status: 'Completed',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    items: [
      { id: 'prod-sw-hood-1', name: 'Midnight Boxy 450 GSM Heavyweight Hoodie', price: 98.00, quantity: 1 }
    ]
  },
  {
    id: 1002,
    retailer_id: 'retailer-3',
    customer_name: 'Sophia Chen',
    customer_phone: '+1 (555) 891-2304',
    delivery_notes: 'Curbside Pickup Bay C',
    total_price: 135.00,
    status: 'Completed',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    items: [
      { id: 'prod-sh-snk-1', name: 'Phantom Kinetic Retro Low-Top Sneakers', price: 135.00, quantity: 1 }
    ]
  },
  {
    id: 1003,
    retailer_id: 'retailer-4',
    customer_name: 'Liam Gallagher',
    customer_phone: '+1 (555) 345-6789',
    delivery_notes: 'Pickup at Tech Hub Counter',
    total_price: 139.00,
    status: 'Completed',
    created_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    items: [
      { id: 'prod-tc-kbd-1', name: 'Lumik 75% Mechanical Hot-Swap Wireless Keyboard', price: 139.00, quantity: 1 }
    ]
  },
  {
    id: 1004,
    retailer_id: 'retailer-2',
    customer_name: 'Elena Rostova',
    customer_phone: '+1 (555) 778-9901',
    delivery_notes: 'Garden Court Lounge',
    total_price: 48.00,
    status: 'Preparing',
    created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    items: [
      { id: 'prod-sk-ser-1', name: 'Celestial Glow Squalane & Rosehip Facial Elixir', price: 48.00, quantity: 1 }
    ]
  },
  {
    id: 1005,
    retailer_id: 'retailer-5',
    customer_name: 'Devon Brooks',
    customer_phone: '+1 (555) 432-1199',
    delivery_notes: 'Store Counter Pickup',
    total_price: 145.00,
    status: 'Pending',
    created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    items: [
      { id: 'prod-bg-shd-1', name: 'Slouchy Italian Suede Leather Shoulder Bag', price: 145.00, quantity: 1 }
    ]
  }
];
