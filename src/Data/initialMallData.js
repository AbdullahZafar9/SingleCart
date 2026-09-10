/**
 * SingleCart - Curated Flagship Mall Initial Data
 * All store banners feature authentic shop interiors displaying category merchandise.
 * All 152 items have 100% unique, isolated product-only photography (zero duplicate images across all shops).
 * All store logos feature distinct brand monograms and emblems.
 */

export const MALL_CATEGORIES = [
  { id: 'all', name: 'All Stores', icon: '🏬', description: 'Explore all digital mall storefronts' },
  { id: 'streetwear', name: 'Street Wear', icon: '👕', description: 'Oversized hoodies, denim & graphic drops' },
  { id: 'skincare', name: 'Skin Care', icon: '✨', description: 'Clean botanical serums, creams & cleansers' },
  { id: 'shoes', name: 'Shoes', icon: '👟', description: 'Retro runners, sneakers & artisan boots' },
  { id: 'tech', name: 'Tech Accessories', icon: '⚡', description: 'Audio monitors, mechanical keyboards & cables' },
  { id: 'bags', name: 'Bags', icon: '🎒', description: 'Commuter backpacks, leather duffels & slings' }
];

export const SHOP_ITEM_CATEGORIES = {
  "retailer-1": [
    {
      "id": "all",
      "label": "All Streetwear"
    },
    {
      "id": "tops",
      "label": "Tops"
    },
    {
      "id": "bottom",
      "label": "Bottom"
    },
    {
      "id": "hoodies",
      "label": "Hoodies"
    },
    {
      "id": "caps",
      "label": "Caps"
    }
  ],
  "retailer-2": [
    {
      "id": "all",
      "label": "All Skincare"
    },
    {
      "id": "serums",
      "label": "Serums"
    },
    {
      "id": "cleansers",
      "label": "Cleansers"
    },
    {
      "id": "moisturizer",
      "label": "Moisturizer"
    },
    {
      "id": "sun screen",
      "label": "Sun Screen"
    }
  ],
  "retailer-3": [
    {
      "id": "all",
      "label": "All Shoes"
    },
    {
      "id": "formal",
      "label": "Formal"
    },
    {
      "id": "sneakers",
      "label": "Sneakers"
    },
    {
      "id": "joggers",
      "label": "Joggers"
    },
    {
      "id": "slippers",
      "label": "Slippers"
    }
  ],
  "retailer-4": [
    {
      "id": "all",
      "label": "All Tech"
    },
    {
      "id": "earbuds",
      "label": "Earbuds & Headphones"
    },
    {
      "id": "mouse",
      "label": "Mouse"
    },
    {
      "id": "keyboards",
      "label": "Keyboards"
    },
    {
      "id": "cables",
      "label": "Cables"
    }
  ],
  "retailer-5": [
    {
      "id": "all",
      "label": "All Bags"
    },
    {
      "id": "crossbody",
      "label": "Crossbody"
    },
    {
      "id": "shoulder",
      "label": "Shoulder"
    },
    {
      "id": "handbags",
      "label": "Handbags"
    }
  ]
};

export const INITIAL_SHOPS = [
  {
    "id": "retailer-1",
    "shop_name": "Kinetics Apparel Co.",
    "category": "streetwear",
    "department": "Street Wear & Urban Apparel",
    "rating": 4.9,
    "reviews_count": 168,
    "location_in_mall": "Verified Official Store",
    "phone": "+1 (555) 302-8819",
    "email": "kinetics@singlecart.com",
    "password": "vendor123",
    "shipping_method": "Tracked Courier Doorstep Dispatch",
    "description": "High-concept urban streetwear, heavyweight boxy hoodies, Japanese selvedge denim, minimalist essentials, and limited graphic apparel drops.",
    "logo_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22200%22%20height%3D%22200%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22kg%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23ea580c%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23c2410c%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22200%22%20height%3D%22200%22%20rx%3D%2240%22%20fill%3D%22%2318181b%22%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22176%22%20height%3D%22176%22%20rx%3D%2232%22%20fill%3D%22none%22%20stroke%3D%22url(%23kg)%22%20stroke-width%3D%224%22%20stroke-dasharray%3D%2212%206%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2265%22%20fill%3D%22%2327272a%22%20stroke%3D%22%23f97316%22%20stroke-width%3D%223%22%2F%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22122%22%20font-family%3D%22'Montserrat'%2C%20'Inter'%2C%20system-ui%2C%20sans-serif%22%20font-size%3D%2276%22%20font-weight%3D%22900%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EK%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-family%3D%22'Inter'%2C%20system-ui%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22800%22%20fill%3D%22%23fb923c%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%224%22%3EKINETICS%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "banner_url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80",
    "accent_color": "#ea580c",
    "header_gradient": "linear-gradient(135deg, #18181b 0%, #27272a 45%, #7c2d12 100%)",
    "item_categories": [
      {
        "id": "all",
        "label": "All Streetwear"
      },
      {
        "id": "tops",
        "label": "Tops"
      },
      {
        "id": "bottom",
        "label": "Bottom"
      },
      {
        "id": "hoodies",
        "label": "Hoodies"
      },
      {
        "id": "caps",
        "label": "Caps"
      }
    ],
    "hours": {
      "mon_fri": "10:00 AM – 9:00 PM",
      "sat": "10:00 AM – 10:00 PM",
      "sun": "11:00 AM – 8:00 PM"
    }
  },
  {
    "id": "retailer-2",
    "shop_name": "Lumina Derma Labs",
    "category": "skincare",
    "department": "Skin Care & Dermatology",
    "rating": 4.8,
    "reviews_count": 145,
    "location_in_mall": "Verified Official Store",
    "phone": "+1 (555) 672-0044",
    "email": "lumina@singlecart.com",
    "password": "vendor123",
    "shipping_method": "Tracked Courier Doorstep Dispatch",
    "description": "Clinical dermatological formulas, botanical facial oils, squalane hydration serums, barrier creams, and daily broad-spectrum sunscreens.",
    "logo_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22200%22%20height%3D%22200%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22lg%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23059669%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2310b981%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22200%22%20height%3D%22200%22%20rx%3D%2240%22%20fill%3D%22%23022c22%22%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22176%22%20height%3D%22176%22%20rx%3D%2232%22%20fill%3D%22none%22%20stroke%3D%22url(%23lg)%22%20stroke-width%3D%224%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2265%22%20fill%3D%22%23064e3b%22%20stroke%3D%22%2334d399%22%20stroke-width%3D%223%22%2F%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22122%22%20font-family%3D%22'Montserrat'%2C%20'Inter'%2C%20system-ui%2C%20sans-serif%22%20font-size%3D%2276%22%20font-weight%3D%22900%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EL%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-family%3D%22'Inter'%2C%20system-ui%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22800%22%20fill%3D%22%236ee7b7%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%224%22%3ELUMINA%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "banner_url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&auto=format&fit=crop&q=80",
    "accent_color": "#10b981",
    "header_gradient": "linear-gradient(135deg, #022c22 0%, #064e3b 45%, #065f46 100%)",
    "item_categories": [
      {
        "id": "all",
        "label": "All Skincare"
      },
      {
        "id": "serums",
        "label": "Serums"
      },
      {
        "id": "cleansers",
        "label": "Cleansers"
      },
      {
        "id": "moisturizer",
        "label": "Moisturizer"
      },
      {
        "id": "sun screen",
        "label": "Sun Screen"
      }
    ],
    "hours": {
      "mon_fri": "10:00 AM – 9:00 PM",
      "sat": "10:00 AM – 10:00 PM",
      "sun": "11:00 AM – 8:00 PM"
    }
  },
  {
    "id": "retailer-3",
    "shop_name": "Velocita Footwear Co.",
    "category": "shoes",
    "department": "Footwear & Sneakers",
    "rating": 4.9,
    "reviews_count": 210,
    "location_in_mall": "Verified Official Store",
    "phone": "+1 (555) 441-8899",
    "email": "velocita@singlecart.com",
    "password": "vendor123",
    "shipping_method": "Tracked Courier Doorstep Dispatch",
    "description": "Handcrafted formal leather oxfords, limited retro court sneakers, high-rebound athletic joggers, and shearling comfort slippers.",
    "logo_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22200%22%20height%3D%22200%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22vg%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23d97706%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23f59e0b%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22200%22%20height%3D%22200%22%20rx%3D%2240%22%20fill%3D%22%23451a03%22%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22176%22%20height%3D%22176%22%20rx%3D%2232%22%20fill%3D%22none%22%20stroke%3D%22url(%23vg)%22%20stroke-width%3D%224%22%20stroke-dasharray%3D%2216%208%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2265%22%20fill%3D%22%2378350f%22%20stroke%3D%22%23fbbf24%22%20stroke-width%3D%223%22%2F%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22122%22%20font-family%3D%22'Montserrat'%2C%20'Inter'%2C%20system-ui%2C%20sans-serif%22%20font-size%3D%2276%22%20font-weight%3D%22900%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3EV%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-family%3D%22'Inter'%2C%20system-ui%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22800%22%20fill%3D%22%23fde68a%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%224%22%3EVELOCITA%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "banner_url": "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=1600&auto=format&fit=crop&q=80",
    "accent_color": "#d97706",
    "header_gradient": "linear-gradient(135deg, #451a03 0%, #78350f 45%, #9a3412 100%)",
    "item_categories": [
      {
        "id": "all",
        "label": "All Shoes"
      },
      {
        "id": "formal",
        "label": "Formal"
      },
      {
        "id": "sneakers",
        "label": "Sneakers"
      },
      {
        "id": "joggers",
        "label": "Joggers"
      },
      {
        "id": "slippers",
        "label": "Slippers"
      }
    ],
    "hours": {
      "mon_fri": "10:00 AM – 9:00 PM",
      "sat": "10:00 AM – 10:00 PM",
      "sun": "11:00 AM – 8:00 PM"
    }
  },
  {
    "id": "retailer-4",
    "shop_name": "NexusPulse Tech & Audio",
    "category": "tech",
    "department": "Tech & Audio Accessories",
    "rating": 4.9,
    "reviews_count": 132,
    "location_in_mall": "Verified Official Store",
    "phone": "+1 (555) 789-2211",
    "email": "nexus@singlecart.com",
    "password": "vendor123",
    "shipping_method": "Tracked Courier Doorstep Dispatch",
    "description": "Audiophile ANC wireless earbuds, precision lightweight gaming mice, custom hot-swap mechanical keyboards, and 100W braided cables.",
    "logo_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22200%22%20height%3D%22200%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22ng%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%232563eb%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2338bdf8%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22200%22%20height%3D%22200%22%20rx%3D%2240%22%20fill%3D%22%23090d16%22%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22176%22%20height%3D%22176%22%20rx%3D%2232%22%20fill%3D%22none%22%20stroke%3D%22url(%23ng)%22%20stroke-width%3D%224%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2265%22%20fill%3D%22%230f172a%22%20stroke%3D%22%2360a5fa%22%20stroke-width%3D%223%22%2F%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22122%22%20font-family%3D%22'Montserrat'%2C%20'Inter'%2C%20system-ui%2C%20sans-serif%22%20font-size%3D%2264%22%20font-weight%3D%22900%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3ENP%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-family%3D%22'Inter'%2C%20system-ui%2C%20sans-serif%22%20font-size%3D%2210%22%20font-weight%3D%22800%22%20fill%3D%22%2393c5fd%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%223%22%3ENEXUSPULSE%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "banner_url": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&auto=format&fit=crop&q=80",
    "accent_color": "#3b82f6",
    "header_gradient": "linear-gradient(135deg, #090d16 0%, #0f172a 45%, #1e3a8a 100%)",
    "item_categories": [
      {
        "id": "all",
        "label": "All Tech"
      },
      {
        "id": "earbuds",
        "label": "Earbuds & Headphones"
      },
      {
        "id": "mouse",
        "label": "Mouse"
      },
      {
        "id": "keyboards",
        "label": "Keyboards"
      },
      {
        "id": "cables",
        "label": "Cables"
      }
    ],
    "hours": {
      "mon_fri": "10:00 AM – 9:00 PM",
      "sat": "10:00 AM – 10:00 PM",
      "sun": "11:00 AM – 8:00 PM"
    }
  },
  {
    "id": "retailer-5",
    "shop_name": "Sovereign Leather & Carry",
    "category": "bags",
    "department": "Bags & Leather Goods",
    "rating": 4.9,
    "reviews_count": 118,
    "location_in_mall": "Verified Official Store",
    "phone": "+1 (555) 901-4477",
    "email": "sovereign@singlecart.com",
    "password": "vendor123",
    "shipping_method": "Tracked Courier Doorstep Dispatch",
    "description": "Tactical EDC crossbody slings, Italian suede shoulder totes, structured full-grain handbags, and handcrafted heirloom leather travel goods.",
    "logo_url": "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20width%3D%22200%22%20height%3D%22200%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22sg%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%239333ea%22%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23c084fc%22%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22200%22%20height%3D%22200%22%20rx%3D%2240%22%20fill%3D%22%231e0938%22%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22176%22%20height%3D%22176%22%20rx%3D%2232%22%20fill%3D%22none%22%20stroke%3D%22url(%23sg)%22%20stroke-width%3D%224%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22100%22%20cy%3D%22100%22%20r%3D%2265%22%20fill%3D%22%232e1065%22%20stroke%3D%22%23d8b4fe%22%20stroke-width%3D%223%22%2F%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22122%22%20font-family%3D%22'Montserrat'%2C%20'Inter'%2C%20system-ui%2C%20sans-serif%22%20font-size%3D%2276%22%20font-weight%3D%22900%22%20fill%3D%22%23ffffff%22%20text-anchor%3D%22middle%22%3ES%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%22100%22%20y%3D%22150%22%20font-family%3D%22'Inter'%2C%20system-ui%2C%20sans-serif%22%20font-size%3D%2211%22%20font-weight%3D%22800%22%20fill%3D%22%23e9d5ff%22%20text-anchor%3D%22middle%22%20letter-spacing%3D%224%22%3ESOVEREIGN%3C%2Ftext%3E%0A%3C%2Fsvg%3E",
    "banner_url": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1600&auto=format&fit=crop&q=80",
    "accent_color": "#8b5cf6",
    "header_gradient": "linear-gradient(135deg, #1e0938 0%, #2e1065 45%, #581c87 100%)",
    "item_categories": [
      {
        "id": "all",
        "label": "All Bags"
      },
      {
        "id": "crossbody",
        "label": "Crossbody"
      },
      {
        "id": "shoulder",
        "label": "Shoulder"
      },
      {
        "id": "handbags",
        "label": "Handbags"
      }
    ],
    "hours": {
      "mon_fri": "10:00 AM – 9:00 PM",
      "sat": "10:00 AM – 10:00 PM",
      "sun": "11:00 AM – 8:00 PM"
    }
  }
];

export const INITIAL_PRODUCTS = [
  {
    "id": "prod-sw-top-1",
    "retailer_id": "retailer-1",
    "name": "Vintage Acid Wash Heavyweight Graphic Tee",
    "category": "streetwear",
    "item_category": "tops",
    "price": 48,
    "badge": "✨ New Drop",
    "description": "Pre-shrunk 260 GSM combed cotton with faded distressed wash, boxy streetwear cut, and vintage screenprint.",
    "image_url": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-2",
    "retailer_id": "retailer-1",
    "name": "Tokyo Oversized Heavyweight Minimalist Black Tee",
    "category": "streetwear",
    "item_category": "tops",
    "price": 52,
    "badge": "🔥 Bestseller",
    "description": "Structured silhouette crafted from heavyweight double-knit interlock jersey with clean raw-edge finish.",
    "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-3",
    "retailer_id": "retailer-1",
    "name": "Raw Hem Slub Cotton Boxy Pocket Tee",
    "category": "streetwear",
    "item_category": "tops",
    "price": 44,
    "badge": "⚡ Relaxed Fit",
    "description": "240 GSM organic slub jersey with reinforced chest pocket, dropped shoulders, and subtle distressed collar.",
    "image_url": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-4",
    "retailer_id": "retailer-1",
    "name": "Waffle-Knit Heavy Thermal Long Sleeve Top",
    "category": "streetwear",
    "item_category": "tops",
    "price": 62,
    "badge": "🍂 Heavyweight",
    "description": "Textured 320 GSM honeycomb thermal knit featuring elongated ribbed cuffs and split side vents.",
    "image_url": "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-5",
    "retailer_id": "retailer-1",
    "name": "Archival Cyber Graphic Washed Tee",
    "category": "streetwear",
    "item_category": "tops",
    "price": 50,
    "badge": "✨ Limited",
    "description": "Mineral wash cotton jersey printed with distressed cyber-futurism artwork in crackled plastisol ink.",
    "image_url": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-6",
    "retailer_id": "retailer-1",
    "name": "Core Minimalist Crisp White Crewneck Tee",
    "category": "streetwear",
    "item_category": "tops",
    "price": 42,
    "badge": "⭐ Essential",
    "description": "100% Supima long-staple cotton offering an ultra-soft hand feel, twin-needle stitching, and zero neck tag.",
    "image_url": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-7",
    "retailer_id": "retailer-1",
    "name": "Oversized Washed Oxford Utility Overshirt",
    "category": "streetwear",
    "item_category": "tops",
    "price": 78,
    "badge": "🔥 Layering Piece",
    "description": "Heavy oxford cloth with flap utility chest pockets, matte tortoiseshell buttons, and dropped curved hem.",
    "image_url": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-8",
    "retailer_id": "retailer-1",
    "name": "Folded Multi-Tone Streetwear Basic Pack",
    "category": "streetwear",
    "item_category": "tops",
    "price": 88,
    "badge": "📦 Value Bundle",
    "description": "Curated 3-pack of heavyweight combed cotton crewneck t-shirts in charcoal, bone white, and washed olive.",
    "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-1",
    "retailer_id": "retailer-1",
    "name": "Kurabo Selvedge Raw Denim Relaxed Pant",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 145,
    "badge": "⭐ Premium Cut",
    "description": "14oz Japanese shuttle-loom selvedge denim with custom oxidized brass hardware and wide-leg break.",
    "image_url": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-2",
    "retailer_id": "retailer-1",
    "name": "Double-Knee Carpenter Workwear Denim",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 135,
    "badge": "⚡ Utility Fit",
    "description": "Heavy 13.5oz washed denim with reinforced front thigh panels, hammer loop, and tool pocket detail.",
    "image_url": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-3",
    "retailer_id": "retailer-1",
    "name": "Vintage Stone-Washed Baggy Skate Jeans",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 120,
    "badge": "🛹 Baggy Cut",
    "description": "Loose silhouette with gentle fading along the thighs, contrast tobacco stitching, and reinforced waistband.",
    "image_url": "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-4",
    "retailer_id": "retailer-1",
    "name": "Deep Indigo Rigid Selvedge Denim",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 155,
    "badge": "✨ Japanese Mills",
    "description": "Sanforized 15oz red-line selvedge denim designed to develop personalized high-contrast fading with wear.",
    "image_url": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-5",
    "retailer_id": "retailer-1",
    "name": "Relaxed Pleated Cotton Twill Trousers",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 110,
    "badge": "🔥 Modern Tailoring",
    "description": "Single-pleat tailored trousers crafted in 300 GSM washed cotton twill with deep slash front pockets.",
    "image_url": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-6",
    "retailer_id": "retailer-1",
    "name": "Ripstop Multi-Pocket Parachute Pants",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 125,
    "badge": "⚡ Techwear",
    "description": "Ultralight water-repellent nylon ripstop with bungee ankle toggles and 6 low-profile bellows compartments.",
    "image_url": "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-7",
    "retailer_id": "retailer-1",
    "name": "Washed Khaki Military Field Trousers",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 118,
    "badge": "🪖 Field Spec",
    "description": "Durable herringbone cotton weave with reinforced seat, button fly, and interior waist drawstring adjustment.",
    "image_url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-8",
    "retailer_id": "retailer-1",
    "name": "Heavy Fleece Relaxed Streetwear Sweatpants",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 95,
    "badge": "☁️ Heavy Terry",
    "description": "400 GSM custom-knit loopback terry with thick elastic waistband, metal-tipped drawcords, and hidden side zip pocket.",
    "image_url": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-hood-1",
    "retailer_id": "retailer-1",
    "name": "Midnight Boxy 450 GSM Heavyweight Hoodie",
    "category": "streetwear",
    "item_category": "hoodies",
    "price": 98,
    "badge": "🔥 Fan Favorite",
    "description": "Ultra-dense organic French terry cotton with double-layered crossover hood and drop-shoulder aesthetic.",
    "image_url": "https://cdn.shopify.com/s/files/1/0094/2252/files/KHM034166-001_P_16145153_Front-thumbnail-2000.jpg?v=1774978762",
    "in_stock": true
  },
  {
    "id": "prod-sw-hood-2",
    "retailer_id": "retailer-1",
    "name": "Faded Charcoal French Terry Full-Zip Hoodie",
    "category": "streetwear",
    "item_category": "hoodies",
    "price": 105,
    "badge": "✨ Streetwear",
    "description": "Pigment-dyed heavyweight zip hoodie with heavy-gauge 2-way antique silver zipper and kangaroo pockets.",
    "image_url": "https://cdn.shopify.com/s/files/1/0094/2252/files/ESSRW00388-0146-Detail.jpg?v=1788892541",
    "in_stock": true
  },
  {
    "id": "prod-sw-hood-3",
    "retailer_id": "retailer-1",
    "name": "Warm Fleece Streetwear Oversized Pullover",
    "category": "streetwear",
    "item_category": "hoodies",
    "price": 92,
    "badge": "☁️ Fleece Comfort",
    "description": "Plush brushed interior with ribbed side gussets for enhanced freedom of movement and minimal aesthetic.",
    "image_url": "https://cdn.shopify.com/s/files/1/0094/2252/files/KHM034166-002-Front.jpg?v=1774978760",
    "in_stock": true
  },
  {
    "id": "prod-sw-hood-4",
    "retailer_id": "retailer-1",
    "name": "Bone White Heavy Loopback Boxy Hoodie",
    "category": "streetwear",
    "item_category": "hoodies",
    "price": 96,
    "badge": "✨ Clean Look",
    "description": "Unbleached natural cotton weave featuring raw aesthetic seams, tight-knit cuffs, and tailored drape.",
    "image_url": "https://cdn.shopify.com/s/files/1/0094/2252/files/KHMA030119-105-Detail.jpg?v=1787688021",
    "in_stock": true
  },
  {
    "id": "prod-sw-hood-5",
    "retailer_id": "retailer-1",
    "name": "Vintage Distressed Wash Half-Zip Hooded Anorak",
    "category": "streetwear",
    "item_category": "hoodies",
    "price": 115,
    "badge": "⚡ Outdoor Spec",
    "description": "Weather-treated cotton blend with half-zip storm collar, spacious center chest pouch, and drawcord hem.",
    "image_url": "https://cdn.shopify.com/s/files/1/0094/2252/files/KHMA030178-014-Detail.jpg?v=1787688024",
    "in_stock": true
  },
  {
    "id": "prod-sw-hood-6",
    "retailer_id": "retailer-1",
    "name": "Minimalist Sand Washed Drop-Shoulder Hoodie",
    "category": "streetwear",
    "item_category": "hoodies",
    "price": 89,
    "badge": "🔥 Essential",
    "description": "Enzyme-washed for an authentic lived-in vintage texture with seamless ribbed hem and deep hood chamber.",
    "image_url": "https://cdn.shopify.com/s/files/1/0094/2252/files/KHMA030177-211-Detail.jpg?v=1787688030",
    "in_stock": true
  },
  {
    "id": "prod-sw-hood-7",
    "retailer_id": "retailer-1",
    "name": "Deep Forest Green Heavy Brushed Hoodie",
    "category": "streetwear",
    "item_category": "hoodies",
    "price": 94,
    "badge": "🌲 Earth Tone",
    "description": "Rich evergreen pigment dye on 420 GSM fleece with double-needle construction and concealed headphone eyelet.",
    "image_url": "https://cdn.shopify.com/s/files/1/0094/2252/files/STO5100033S00TBV005G-Detail.jpg?v=1788276561",
    "in_stock": true
  },
  {
    "id": "prod-sw-hood-8",
    "retailer_id": "retailer-1",
    "name": "Mineral Washed Charcoal Thermal Lined Hoodie",
    "category": "streetwear",
    "item_category": "hoodies",
    "price": 110,
    "badge": "❄️ Cold Guard",
    "description": "Dual-layer design featuring a 350 GSM fleece shell backed by a 200 GSM thermal waffle lining for maximum heat retention.",
    "image_url": "https://cdn.shopify.com/s/files/1/0094/2252/files/SUN2067-1-950-Detail.jpg?v=1786998758",
    "in_stock": true
  },
  {
    "id": "prod-sw-cap-1",
    "retailer_id": "retailer-1",
    "name": "Distressed Low-Profile Vintage Dad Cap",
    "category": "streetwear",
    "item_category": "caps",
    "price": 36,
    "badge": "🧢 Classic",
    "description": "Unstructured 6-panel washed cotton twill with antique brass tri-glide buckle and curved brim.",
    "image_url": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-cap-2",
    "retailer_id": "retailer-1",
    "name": "Minimalist Embroidered Canvas Snapback",
    "category": "streetwear",
    "item_category": "caps",
    "price": 40,
    "badge": "✨ Limited",
    "description": "High-crown structured canvas cap featuring tonal micro-embroidery and adjustable snap closure.",
    "image_url": "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-cap-3",
    "retailer_id": "retailer-1",
    "name": "Flat-Brim Heavyweight Wool Twill Snapback",
    "category": "streetwear",
    "item_category": "caps",
    "price": 42,
    "badge": "⭐ Street Core",
    "description": "Premium wool-blend structured crown with green under-visor and reinforced front buckram panels.",
    "image_url": "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-cap-4",
    "retailer_id": "retailer-1",
    "name": "Ribbed Knit Heavy Wool Streetwear Beanie",
    "category": "streetwear",
    "item_category": "caps",
    "price": 34,
    "badge": "❄️ Cozy Knit",
    "description": "7-gauge fisherman rib knit in soft non-itch merino wool with wide fold-over cuff and woven brand label.",
    "image_url": "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-cap-5",
    "retailer_id": "retailer-1",
    "name": "Suede Visor Corduroy 6-Panel Strapback",
    "category": "streetwear",
    "item_category": "caps",
    "price": 45,
    "badge": "🍂 Autumn Drop",
    "description": "Wide-wale cotton corduroy crown paired with a supple cowhide suede brim and leather adjustment strap.",
    "image_url": "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-cap-6",
    "retailer_id": "retailer-1",
    "name": "Ripstop Nylon 5-Panel Camper Hat",
    "category": "streetwear",
    "item_category": "caps",
    "price": 38,
    "badge": "⚡ Outdoor Tech",
    "description": "Low-profile breathable camper cap with side mesh eyelets, nylon webbing strap, and quick-release clip.",
    "image_url": "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-cap-7",
    "retailer_id": "retailer-1",
    "name": "Unstructured Washed Khaki Baseball Cap",
    "category": "streetwear",
    "item_category": "caps",
    "price": 35,
    "badge": "🧢 Daily Wear",
    "description": "Garment-dyed cotton drill with soft unstructured crown and pre-curved visor for effortless everyday styling.",
    "image_url": "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sw-cap-8",
    "retailer_id": "retailer-1",
    "name": "Cashmere-Blend Cuffed Shallow Beanie",
    "category": "streetwear",
    "item_category": "caps",
    "price": 48,
    "badge": "✨ Luxury Knit",
    "description": "Ultra-fine gauge cashmere and wool knit engineered for a close-fitting dockworker silhouette without bulk.",
    "image_url": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-1",
    "retailer_id": "retailer-2",
    "name": "Celestial Glow Squalane & Rosehip Facial Elixir",
    "category": "skincare",
    "item_category": "serums",
    "price": 48,
    "badge": "✨ Radiance",
    "description": "Deeply hydrating plant-derived squalane infused with cold-pressed organic rosehip seed oil and blue tansy.",
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-2",
    "retailer_id": "retailer-2",
    "name": "10% Pure Niacinamide + Zinc Clarifying Serum",
    "category": "skincare",
    "item_category": "serums",
    "price": 42,
    "badge": "💧 Pore Refine",
    "description": "Concentrated vitamin B3 serum designed to balance sebum activity, minimize pores, and smooth skin texture.",
    "image_url": "https://images.unsplash.com/photo-1617897903246-719242758050?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-3",
    "retailer_id": "retailer-2",
    "name": "Cold-Pressed Botanical Rosehip Active Face Oil",
    "category": "skincare",
    "item_category": "serums",
    "price": 46,
    "badge": "🌿 100% Organic",
    "description": "Unrefined Chilean rosehip seed oil rich in provitamin A and essential fatty acids for scar and barrier repair.",
    "image_url": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-4",
    "retailer_id": "retailer-2",
    "name": "Triple Hyaluronic Acid Plumping Serum",
    "category": "skincare",
    "item_category": "serums",
    "price": 52,
    "badge": "💧 Intense Hydration",
    "description": "Three molecular weights of pure hyaluronic acid to hydrate multi-depth layers of the epidermis simultaneously.",
    "image_url": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-5",
    "retailer_id": "retailer-2",
    "name": "Bakuchiol 2% Botanical Alternative Retinol Elixir",
    "category": "skincare",
    "item_category": "serums",
    "price": 56,
    "badge": "🌱 Plant Retinol",
    "description": "Gentle, pregnancy-safe Ayurvedic babchi extract that visibly reduces fine lines without peeling or sensitivity.",
    "image_url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-6",
    "retailer_id": "retailer-2",
    "name": "Centella Asiatica Calming Cica Ampoule",
    "category": "skincare",
    "item_category": "serums",
    "price": 44,
    "badge": "🍃 Redness Relief",
    "description": "85% pure Madagascar Centella Asiatica extract formulated to extinguish redness and reinforce weakened capillaries.",
    "image_url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-7",
    "retailer_id": "retailer-2",
    "name": "Vitamin C 15% Brightening Antioxidant Complex",
    "category": "skincare",
    "item_category": "serums",
    "price": 54,
    "badge": "🍊 Glow Defense",
    "description": "Stabilized L-ascorbic acid blended with ferulic acid and vitamin E for hyperpigmentation fading and environmental defense.",
    "image_url": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-8",
    "retailer_id": "retailer-2",
    "name": "Copper Peptide Multi-Action Firming Serum",
    "category": "skincare",
    "item_category": "serums",
    "price": 64,
    "badge": "⭐ Advanced Pro",
    "description": "1% pure GHK-Cu copper peptides to stimulate collagen synthesis, skin elasticity, and cellular turnover.",
    "image_url": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-1",
    "retailer_id": "retailer-2",
    "name": "Botanical Rosehip & Oat Melt Cleansing Balm",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 36,
    "badge": "🌿 Clean Beauty",
    "description": "Transformative oil-to-milk balm that dissolves water-resistant SPF and impurities without stripping natural lipids.",
    "image_url": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-2",
    "retailer_id": "retailer-2",
    "name": "Gentle Green Tea & Centella pH 5.5 Gel Cleanser",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 30,
    "badge": "🌱 Sensitive Safe",
    "description": "Low-pH soothing facial cleanser formulated with fermented green tea extract and calming centella asiatica.",
    "image_url": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-3",
    "retailer_id": "retailer-2",
    "name": "Ceramide Hydrating Milk Facial Cleanser",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 32,
    "badge": "💧 Barrier Safe",
    "description": "Creamy non-foaming wash enriched with 3 essential ceramides and colloidal oatmeal to gently purify dry skin.",
    "image_url": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-4",
    "retailer_id": "retailer-2",
    "name": "Papaya Enzyme Powder Exfoliating Wash",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 38,
    "badge": "✨ Micro Polish",
    "description": "Water-activated micro-powder with active fruit enzymes and rice bran that gently dissolves dead cells for instant radiance.",
    "image_url": "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-5",
    "retailer_id": "retailer-2",
    "name": "Tea Tree & Willow Bark Deep Pore Clarifying Wash",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 28,
    "badge": "🌿 Blemish Control",
    "description": "Botanical BHA-infused foaming cleanser that clears trapped debris from congested pores without over-drying.",
    "image_url": "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-6",
    "retailer_id": "retailer-2",
    "name": "Cold-Pressed Squalane Melting Cleansing Oil",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 34,
    "badge": "💧 First Cleanse",
    "description": "100% plant squalane oil cleanser that emulsifies instantly upon contact with water, lifting makeup completely.",
    "image_url": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-7",
    "retailer_id": "retailer-2",
    "name": "Calendula & Chamomile Ultra-Calming Foam Wash",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 29,
    "badge": "🌼 Soothing",
    "description": "Featherlight cloud foam featuring whole calendula petals and German chamomile to soothe irritated or reactive skin.",
    "image_url": "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-8",
    "retailer_id": "retailer-2",
    "name": "Prebiotic Barrier Balancing Jelly Cleanser",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 35,
    "badge": "🧬 Microbiome",
    "description": "Bouncy cushion jelly wash infused with chicory root prebiotics to maintain a healthy and resilient epidermal microbiome.",
    "image_url": "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-1",
    "retailer_id": "retailer-2",
    "name": "Peptide Infusion Overnight Barrier Restoring Cream",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 52,
    "badge": "💧 Barrier Restore",
    "description": "Multi-peptide ceramide complex that fortifies the epidermal moisture barrier and locks in all-night hydration.",
    "image_url": "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-2",
    "retailer_id": "retailer-2",
    "name": "Cloud Lightweight Hyaluronic Water Gel",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 38,
    "badge": "✨ Ultra Hydrate",
    "description": "Oil-free burst-release water moisturizer that absorbs instantly with 5 molecular weights of hyaluronic acid.",
    "image_url": "https://images.unsplash.com/photo-1598662779094-110c2bad80b5?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-3",
    "retailer_id": "retailer-2",
    "name": "Phyto-Ceramide Rich Moisture Souffle",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 48,
    "badge": "🌿 Deep Nourish",
    "description": "Whipped botanical butter cream with 5 skin-identical lipids, marula oil, and fermented bio-actives for lasting comfort.",
    "image_url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-4",
    "retailer_id": "retailer-2",
    "name": "Blue Tansy & Squalane Calming Facial Cream",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 46,
    "badge": "💙 Cooling Relief",
    "description": "Soothing azure cream packed with Moroccan blue tansy and aloe vera to instantly cool and replenish sensitized skin.",
    "image_url": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-5",
    "retailer_id": "retailer-2",
    "name": "Rice Milk & Oat Velvet Daily Emulsion",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 39,
    "badge": "🌾 Velvet Soft",
    "description": "Milky fluid moisturizer featuring fermented rice filtrate and beta-glucan for silky smooth daytime wear under makeup.",
    "image_url": "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-6",
    "retailer_id": "retailer-2",
    "name": "Centella Cica Repair Sleeping Mask",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 45,
    "badge": "🌙 Overnight Recovery",
    "description": "Intense nocturnal recovery balm that cushions stressed skin and repairs trans-epidermal water loss while you rest.",
    "image_url": "https://images.unsplash.com/photo-1556760544-74068565f05c?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-7",
    "retailer_id": "retailer-2",
    "name": "Niacinamide Matte Balancing Gel Lotion",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 36,
    "badge": "⚡ Shine Control",
    "description": "Lightweight gel-lotion with 4% niacinamide and silica micro-spheres that provides all-day hydration without greasy shine.",
    "image_url": "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-8",
    "retailer_id": "retailer-2",
    "name": "Bakuchiol Firming Youth Infusion Cream",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 58,
    "badge": "⭐ Youth Sculpt",
    "description": "Rich restructuring formula with natural bakuchiol and plant collagen to plump fine lines and restore facial firmness.",
    "image_url": "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-1",
    "retailer_id": "retailer-2",
    "name": "Invisible Shield SPF 50+ Daily Hydrating Fluid",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 36,
    "badge": "☀️ Zero Whitecast",
    "description": "Weightless chemical sunscreen serum offering broad-spectrum UVA/UVB protection with invisible satin finish.",
    "image_url": "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-2",
    "retailer_id": "retailer-2",
    "name": "Matte Mineral Zinc SPF 50 Broad Spectrum Sunscreen",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 34,
    "badge": "🌿 Reef Safe",
    "description": "100% non-nano zinc oxide sunscreen infused with soothing bisabolol for pore-blurring matte coverage.",
    "image_url": "https://images.unsplash.com/photo-1629732047847-50219e9c5aef?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-3",
    "retailer_id": "retailer-2",
    "name": "Dewy Glow Peptide Sun Drops SPF 45",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 42,
    "badge": "✨ Dewy Finish",
    "description": "Illuminating broad spectrum sunscreen drops with copper peptides and niacinamide for a lit-from-within glass skin look.",
    "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-4",
    "retailer_id": "retailer-2",
    "name": "Clean Zinc Calming Daily Face Fluid SPF 50",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 38,
    "badge": "🌱 Sensitive Safe",
    "description": "Fragrance-free pure physical mineral sunscreen designed specifically for eczema-prone, rosacea, or acne-prone skin.",
    "image_url": "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-5",
    "retailer_id": "retailer-2",
    "name": "Centella Aqua Soothing Sun Gel SPF 50+ PA++++",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 32,
    "badge": "🍃 Featherweight",
    "description": "Water-burst organic chemical sun gel that sinks in within 3 seconds, leaving zero sticky residue or eye sting.",
    "image_url": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-6",
    "retailer_id": "retailer-2",
    "name": "Antioxidant Multi-Defense Sun Veil SPF 45",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 39,
    "badge": "🛡️ Urban Defense",
    "description": "Infused with ectoin and green tea polyphenols to shield skin against high-energy visible (HEV) blue light and airborne soot.",
    "image_url": "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-7",
    "retailer_id": "retailer-2",
    "name": "Sheer Tinted Mineral Physical Sun Milk SPF 50",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 40,
    "badge": "🎨 Universal Tint",
    "description": "Adaptive iron oxide tint that blurs minor redness and evens tone without looking like makeup or settling into lines.",
    "image_url": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-8",
    "retailer_id": "retailer-2",
    "name": "Water-Resistant Botanical Sport Sunscreen SPF 50+",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 35,
    "badge": "🏊 80-Min Water Resist",
    "description": "High-adhesion sweat and water-resistant mineral sunscreen fortified with aloe vera and jojoba esters for active outdoor days.",
    "image_url": "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sh-for-1",
    "retailer_id": "retailer-3",
    "name": "Dean Cap-Toe Leather Oxford in Black",
    "category": "shoes",
    "item_category": "formal",
    "price": 185,
    "badge": "⭐ Black Tie",
    "description": "Handcrafted closed-lacing Cap-Toe Oxford in mirror-shine full-grain French box calfskin with Goodyear-welted leather soles.",
    "image_url": "https://cdn.shopify.com/s/files/1/0175/8496/products/color_black_1_dean_oxford.jpg?v=1762198153",
    "in_stock": true
  },
  {
    "id": "prod-sh-for-2",
    "retailer_id": "retailer-3",
    "name": "Asher Wholecut Leather Oxford in Cognac",
    "category": "shoes",
    "item_category": "formal",
    "price": 195,
    "badge": "✨ Master Cut",
    "description": "Flawlessly sculpted closed-laced Oxford in warm cognac Italian calfskin, featuring clean architectural lines and bevelled waist sole.",
    "image_url": "https://cdn.shopify.com/s/files/1/0175/8496/files/color_cognac_1_asher_oxfords.jpg?v=1782418880",
    "in_stock": true
  },
  {
    "id": "prod-sh-for-3",
    "retailer_id": "retailer-3",
    "name": "Lowell Full-Grain Leather Derby in Tan",
    "category": "shoes",
    "item_category": "formal",
    "price": 175,
    "badge": "👞 Sartorial",
    "description": "Classic open-lacing Derby dress shoe crafted from vegetable-tanned full-grain leather in rich tan with cushioned leather insole.",
    "image_url": "https://cdn.shopify.com/s/files/1/0175/8496/files/color_tan_1_lowell_derbies.jpg?v=1773875584",
    "in_stock": true
  },
  {
    "id": "prod-sh-for-4",
    "retailer_id": "retailer-3",
    "name": "Warren Plain-Toe Leather Derby in Obsidian Black",
    "category": "shoes",
    "item_category": "formal",
    "price": 170,
    "badge": "🔥 Core Formal",
    "description": "Minimalist open-laced Derby silhouette in sleek obsidian calf leather, offering exceptional comfort across high insteps and versatile dress appeal.",
    "image_url": "https://cdn.shopify.com/s/files/1/0175/8496/files/color_black_1_warren_derbies_full_grain.jpg?v=1782425107",
    "in_stock": true
  },
  {
    "id": "prod-sh-for-5",
    "retailer_id": "retailer-3",
    "name": "Hoyt Double Monk Strap Dress Shoe in Black",
    "category": "shoes",
    "item_category": "formal",
    "price": 189,
    "badge": "⭐ Statement",
    "description": "Distinguished double monk strap with dual hand-polished brushed nickel buckles, subtle cap-toe detail, and channelled leather sole.",
    "image_url": "https://cdn.shopify.com/s/files/1/0175/8496/products/color_black_1_hoyt_monkstrap.jpg?v=1762198155",
    "in_stock": true
  },
  {
    "id": "prod-sh-for-6",
    "retailer_id": "retailer-3",
    "name": "Gibson Wingtip Full Brogue in Chestnut Tan",
    "category": "shoes",
    "item_category": "formal",
    "price": 195,
    "badge": "👞 Heritage Brogue",
    "description": "Traditional English wingtip broguing with decorative perforated medallion toe, serrated edge trims, and durable storm welt construction.",
    "image_url": "https://cdn.shopify.com/s/files/1/0175/8496/files/color_tan_1_gibson_derbies.jpg?v=1773873782",
    "in_stock": true
  },
  {
    "id": "prod-sh-for-7",
    "retailer_id": "retailer-3",
    "name": "Cohen Handcrafted Calfskin Penny Loafers in Black",
    "category": "shoes",
    "item_category": "formal",
    "price": 165,
    "badge": "✨ Artisan Loafer",
    "description": "Timeless slip-on penny loafer featuring hand-stitched moc apron toe, supple leather lining, and stacked leather heel.",
    "image_url": "https://cdn.shopify.com/s/files/1/0175/8496/products/color_black_1_cohen_loafers.jpg?v=1762198155",
    "in_stock": true
  },
  {
    "id": "prod-sh-for-8",
    "retailer_id": "retailer-3",
    "name": "Bernard Tassel Loafers in Chocolate Brown Suede",
    "category": "shoes",
    "item_category": "formal",
    "price": 175,
    "badge": "🚗 Casual Luxe",
    "description": "Refined slip-on loafer crafted in weather-guarded chocolate brown Italian suede with hand-braided collar and swinging dual tassels.",
    "image_url": "https://cdn.shopify.com/s/files/1/0175/8496/products/color_brown_1_bernard_tassel_loafers_suede.jpg?v=1762288528",
    "in_stock": true
  },
  {
    "id": "prod-sh-snk-1",
    "retailer_id": "retailer-3",
    "name": "Nike Air Max 270 \"University Red\"",
    "category": "shoes",
    "item_category": "sneakers",
    "price": 160,
    "badge": "👟 Trending",
    "description": "Engineered mesh upper in radiant University Red with Max Air 270 cushioning unit, asymmetrical lacing, and solid white Nike Swoosh branding.",
    "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sh-snk-2",
    "retailer_id": "retailer-3",
    "name": "Puma Smash v2 Leather Sneaker",
    "category": "shoes",
    "item_category": "sneakers",
    "price": 70,
    "badge": "✨ Core Classic",
    "description": "Soft tumbled leather court sneaker featuring signature perforated Puma Formstrip, gold foil cat logo, and cushioned SoftFoam+ sockliner.",
    "image_url": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sh-snk-3",
    "retailer_id": "retailer-3",
    "name": "Nike Air Max 1 '86 OG \"Magma Orange\"",
    "category": "shoes",
    "item_category": "sneakers",
    "price": 150,
    "badge": "🔥 Retro Icon",
    "description": "Tinkering with the original 1987 icon featuring white breathable mesh, neutral grey suede overlays, fiery Magma Orange mudguard, and visible Air window.",
    "image_url": "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sh-snk-4",
    "retailer_id": "retailer-3",
    "name": "Air Jordan 1 Retro High OG \"Chicago\"",
    "category": "shoes",
    "item_category": "sneakers",
    "price": 180,
    "badge": "🏀 Heritage Drop",
    "description": "The quintessential 1985 basketball silhouette in Varsity Red, Black, and Sail white premium leather with cracked collar detailing and vintage Nike Air tongue tag.",
    "image_url": "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sh-snk-5",
    "retailer_id": "retailer-3",
    "name": "Adidas Originals Samba OG \"Collegiate Green\"",
    "category": "shoes",
    "item_category": "sneakers",
    "price": 100,
    "badge": "⚡ Street Favorite",
    "description": "Timeless terrace classic crafted with full-grain leather, contrasting collegiate green serrated 3-Stripes, iconic suede T-toe overlay, and low-profile gum sole.",
    "image_url": "https://images.unsplash.com/photo-1695552835943-cbee8150addc?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sh-snk-6",
    "retailer_id": "retailer-3",
    "name": "Nike Air Force 1 '07 LV8 \"Sketch\"",
    "category": "shoes",
    "item_category": "sneakers",
    "price": 120,
    "badge": "⭐ Clean Line",
    "description": "Crisp white leather upper showcasing concept-art style illustrated Swoosh, hand-drawn Air unit diagrams, and encapsulated Nike Air cushioning.",
    "image_url": "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sh-snk-7",
    "retailer_id": "retailer-3",
    "name": "Vans Old Skool Classic Skate Sneaker \"Tawny Port\"",
    "category": "shoes",
    "item_category": "sneakers",
    "price": 75,
    "badge": "🌿 Skate Classic",
    "description": "Iconic low-top skate shoe in rich Port Royale burgundy canvas and suede, featuring the unmistakable white leather jazz stripe and signature rubber waffle outsole.",
    "image_url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sh-snk-8",
    "retailer_id": "retailer-3",
    "name": "Converse Chuck Taylor All Star High Top \"Crimson\"",
    "category": "shoes",
    "item_category": "sneakers",
    "price": 65,
    "badge": "✨ All-Time Icon",
    "description": "Unmistakable high-top silhouette in durable crimson red canvas, star ankle patch, contrast white stitching, and vulcanized diamond-pattern rubber outsole.",
    "image_url": "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-sh-jog-1",
    "retailer_id": "retailer-3",
    "name": "CloudStrider Ultralight Cushion Runner",
    "category": "shoes",
    "item_category": "joggers",
    "price": 120,
    "badge": "⚡ Performance",
    "description": "Breathable jacquard knit upper paired with nitrogen-infused dual-density foam for boundless kinetic return.",
    "image_url": "https://cdn.shopify.com/s/files/1/0371/5416/0772/files/1_29a369ba-216e-4b73-9463-0ce5fad10216.jpg?v=1788240880",
    "in_stock": true
  },
  {
    "id": "prod-sh-jog-2",
    "retailer_id": "retailer-3",
    "name": "Aero-Knit Carbon Plate Long Distance Jogger",
    "category": "shoes",
    "item_category": "joggers",
    "price": 145,
    "badge": "🏃 Pro Pace",
    "description": "Full-length carbon fiber propulsion plate encased in high-rebound supercritical midsole foam.",
    "image_url": "https://cdn.shopify.com/s/files/1/0371/5416/0772/files/1_31fd2efd-66cf-4535-981c-021cc6dca08f.jpg?v=1759316329",
    "in_stock": true
  },
  {
    "id": "prod-sh-jog-3",
    "retailer_id": "retailer-3",
    "name": "Vortex Mesh Responsive Training Runner",
    "category": "shoes",
    "item_category": "joggers",
    "price": 115,
    "badge": "🔥 Everyday Mile",
    "description": "Seamless engineered mesh upper with molded heel counter and durable carbon rubber high-abrasion zones.",
    "image_url": "https://cdn.shopify.com/s/files/1/0371/5416/0772/files/3_0355b6c4-132b-4e5c-a2b2-f6b07bc4a00f.jpg?v=1788509927",
    "in_stock": true
  },
  {
    "id": "prod-sh-jog-4",
    "retailer_id": "retailer-3",
    "name": "All-Terrain Lugged Trail Runner Jogger",
    "category": "shoes",
    "item_category": "joggers",
    "price": 138,
    "badge": "⛰️ Trail Gripper",
    "description": "5mm multidirectional chevron lugs with rock protection plate, water-shedding gusseted tongue, and toe guard.",
    "image_url": "https://cdn.shopify.com/s/files/1/0371/5416/0772/files/1_94d9e615-da93-46d2-a493-ded75f568c55.jpg?v=1788257649",
    "in_stock": true
  },
  {
    "id": "prod-sh-jog-5",
    "retailer_id": "retailer-3",
    "name": "Kinetic Energy-Return Road Jogger",
    "category": "shoes",
    "item_category": "joggers",
    "price": 125,
    "badge": "⚡ High Rebound",
    "description": "Segmented crash pad with plush interior padding designed for fluid heel-to-toe transitions during high mileage.",
    "image_url": "https://cdn.shopify.com/s/files/1/0371/5416/0772/files/1_3d5d4d5d-fa84-4f07-82f2-5d13d465b55f.jpg?v=1774853290",
    "in_stock": true
  },
  {
    "id": "prod-sh-jog-6",
    "retailer_id": "retailer-3",
    "name": "Featherlight Aero-Mesh Speed Trainer",
    "category": "shoes",
    "item_category": "joggers",
    "price": 118,
    "badge": "🪶 Sub-200g",
    "description": "Minimalist racing flat upper clocking under 200 grams with laser-cut ventilation ports and lockdown lacing.",
    "image_url": "https://cdn.shopify.com/s/files/1/0371/5416/0772/files/1_250f8fd6-80f6-4899-8ea1-d62b4aa5a471.jpg?v=1759316308",
    "in_stock": true
  },
  {
    "id": "prod-sh-jog-7",
    "retailer_id": "retailer-3",
    "name": "Stability Support Long Run Jogger",
    "category": "shoes",
    "item_category": "joggers",
    "price": 130,
    "badge": "🛡️ Arch Support",
    "description": "Medial post guide rails designed to curb overpronation while maintaining plush forefoot flexibility.",
    "image_url": "https://cdn.shopify.com/s/files/1/0371/5416/0772/files/M-PR-VEL-0040-BLACK.jpg?v=1759386436",
    "in_stock": true
  },
  {
    "id": "prod-sh-jog-8",
    "retailer_id": "retailer-3",
    "name": "Night-Shift Reflective Blackout Runner",
    "category": "shoes",
    "item_category": "joggers",
    "price": 128,
    "badge": "✨ 360° Reflective",
    "description": "3M Scotchlite reflective interwoven yarn across the upper providing high visibility on evening runs.",
    "image_url": "https://cdn.shopify.com/s/files/1/0371/5416/0772/files/1_c64bdc79-dca8-4466-8095-38d6f7ec5801.jpg?v=1773310004",
    "in_stock": true
  },
  {
    "id": "prod-sh-slp-1",
    "retailer_id": "retailer-3",
    "name": "Men's Handcrafted Criss-Cross Leather Slide",
    "category": "shoes",
    "item_category": "slippers",
    "price": 48,
    "badge": "✨ Criss-Cross",
    "description": "Supple full-grain leather criss-cross upper with precision contrast edge stitching, padded insole, and flexible non-slip tread.",
    "image_url": "https://cdn.shopify.com/s/files/1/0083/8405/3305/files/1_7911d16a-cbcd-4bd9-acff-84046a38f1d8.png?v=1782985884",
    "in_stock": true
  },
  {
    "id": "prod-sh-slp-2",
    "retailer_id": "retailer-3",
    "name": "Classic Textured Tan Leather Comfort Slipper",
    "category": "shoes",
    "item_category": "slippers",
    "price": 52,
    "badge": "👞 Textured Luxe",
    "description": "Hand-finished tan leather slide featuring ergonomic arch contouring, breathable leather lining, and dual-density shock-absorbing sole.",
    "image_url": "https://cdn.shopify.com/s/files/1/0083/8405/3305/files/1_c47b4d7a-df58-4a17-a832-3e97a2df242a.png?v=1782282245",
    "in_stock": true
  },
  {
    "id": "prod-sh-slp-3",
    "retailer_id": "retailer-3",
    "name": "Executive Dark Espresso Cutout Leather Slide",
    "category": "shoes",
    "item_category": "slippers",
    "price": 54,
    "badge": "🌿 Ergonomic Arch",
    "description": "Deep espresso brown oiled leather with side air-circulation cutouts, cushioned heel cup, and ultra-durable welted rubber outsole.",
    "image_url": "https://cdn.shopify.com/s/files/1/0083/8405/3305/files/1_ad881bed-7b78-4aa6-a0bb-c43fdc448d2e.png?v=1782282739",
    "in_stock": true
  },
  {
    "id": "prod-sh-slp-4",
    "retailer_id": "retailer-3",
    "name": "Dual-Band Stitch-Detailed Leather Slipper",
    "category": "shoes",
    "item_category": "slippers",
    "price": 46,
    "badge": "🧵 Hand-Stitched",
    "description": "Tailored twin leather straps reinforced with artisanal hand-stitching over an anatomical memory-foam footbed for all-day relaxation.",
    "image_url": "https://cdn.shopify.com/s/files/1/0083/8405/3305/files/1_85673860-7a82-48ae-9c6a-8495dcdcaebe.png?v=1782985640",
    "in_stock": true
  },
  {
    "id": "prod-sh-slp-5",
    "retailer_id": "retailer-3",
    "name": "Ergonomic Cushion-Padded Leather Comfort Slide",
    "category": "shoes",
    "item_category": "slippers",
    "price": 49,
    "badge": "☁️ Cloud Cushion",
    "description": "Ultra-soft padded leather instep with plush foam lining and contoured arch bed designed to alleviate pressure during long strolls.",
    "image_url": "https://cdn.shopify.com/s/files/1/0083/8405/3305/files/1_a9c9151f-abab-44be-b027-216bc39f5b3d.png?v=1784200160",
    "in_stock": true
  },
  {
    "id": "prod-sh-slp-6",
    "retailer_id": "retailer-3",
    "name": "Broad-Strap Contoured Footbed Leather Slipper",
    "category": "shoes",
    "item_category": "slippers",
    "price": 50,
    "badge": "⭐ Wide Comfort",
    "description": "Generous wide-cut genuine leather vamp, soft microfiber interior, and non-marking outdoor rubber sole for versatile daily wear.",
    "image_url": "https://cdn.shopify.com/s/files/1/0083/8405/3305/files/1_6dc01221-595b-436c-aa68-bee017932e8f.png?v=1782285191",
    "in_stock": true
  },
  {
    "id": "prod-sh-slp-7",
    "retailer_id": "retailer-3",
    "name": "Adjustable Dual-Strap Comfort Sport Slide",
    "category": "shoes",
    "item_category": "slippers",
    "price": 39,
    "badge": "⚡ Active Sport",
    "description": "Dual hook-and-loop adjustable straps with durable synthetic nubuck upper, textured footbed grip, and lightweight phylon midsole.",
    "image_url": "https://cdn.shopify.com/s/files/1/0083/8405/3305/files/1_f90bd98b-b143-4561-abdb-48e73b03e96c.jpg?v=1770881952",
    "in_stock": true
  },
  {
    "id": "prod-sh-slp-8",
    "retailer_id": "retailer-3",
    "name": "Premium Handcrafted Stitch-Welted Leather Slide",
    "category": "shoes",
    "item_category": "slippers",
    "price": 55,
    "badge": "✨ Artisan Welt",
    "description": "Artisan welted sole construction with premium burnished leather upper, cushioned leather sockliner, and slip-resistant tread.",
    "image_url": "https://cdn.shopify.com/s/files/1/0083/8405/3305/files/1_79b90d95-e5f2-4a99-a58f-44107f639410.png?v=1775211983",
    "in_stock": true
  },
  {
    "id": "prod-tc-ear-1",
    "retailer_id": "retailer-4",
    "name": "AeroPulse Pro Hybrid Active Noise Cancelling Earbuds",
    "category": "tech",
    "item_category": "earbuds",
    "price": 119,
    "badge": "🎧 42dB ANC",
    "description": "11mm beryllium acoustic dynamic drivers with smart transparency mode, 6 beamforming microphones, and 36hr battery.",
    "image_url": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-tc-ear-2",
    "retailer_id": "retailer-4",
    "name": "CyberBlade Ultra-Low Latency Wireless Gaming Buds",
    "category": "tech",
    "item_category": "earbuds",
    "price": 89,
    "badge": "⚡ 25ms Latency",
    "description": "Dedicated 2.4GHz dual-mode USB-C dongle + Bluetooth 5.3 connection with studio positional gaming audio.",
    "image_url": "https://cdn.shopify.com/s/files/1/0040/7201/3924/files/1_ca06ca06-726e-4725-b7b7-a0f3d3e9c415.jpg?v=1764839370",
    "in_stock": true
  },
  {
    "id": "prod-tc-ear-3",
    "retailer_id": "retailer-4",
    "name": "Studio Master In-Ear Hi-Res Audio Monitors",
    "category": "tech",
    "item_category": "earbuds",
    "price": 145,
    "badge": "🎵 Audiophile",
    "description": "Dual balanced armature + dynamic hybrid drivers certified for Hi-Res Audio wireless with LDAC 990kbps streaming.",
    "image_url": "https://cdn.shopify.com/s/files/1/0040/7201/3924/files/KiwiEarsCoda_2.jpg?v=1787821141",
    "in_stock": true
  },
  {
    "id": "prod-tc-ear-4",
    "retailer_id": "retailer-4",
    "name": "Minimalist Pure White Wireless Earbuds with Qi Case",
    "category": "tech",
    "item_category": "earbuds",
    "price": 95,
    "badge": "✨ Sleek Design",
    "description": "Pebble charging case with Qi wireless fast charging, touch gesture controls, and IPX5 water resistance.",
    "image_url": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-tc-ear-5",
    "retailer_id": "retailer-4",
    "name": "StudioPulse Over-Ear Active Noise-Cancelling Headphones",
    "category": "tech",
    "item_category": "headphones",
    "price": 149,
    "badge": "🎧 45dB Hybrid ANC",
    "description": "High-definition 40mm titanium drivers with custom active noise cancellation, ambient transparency, and 50hr battery life.",
    "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-tc-ear-6",
    "retailer_id": "retailer-4",
    "name": "AcousticPro Wireless Closed-Back Studio Monitor Headphones",
    "category": "tech",
    "item_category": "headphones",
    "price": 165,
    "badge": "🎼 Studio Master",
    "description": "Tuned for flat acoustic frequency response with memory-foam ear cushions, low-latency DSP, and balanced 3.5mm/Bluetooth dual mode.",
    "image_url": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-tc-ear-7",
    "retailer_id": "retailer-4",
    "name": "Vanguard Wireless ANC Hi-Fi Over-Ear Headphones",
    "category": "tech",
    "item_category": "headphones",
    "price": 129,
    "badge": "🔋 60hr Playtime",
    "description": "Ergonomic cushioned headband, deep bass sound staging, quad microphones for ultra-clear calls, and rapid USB-C quick charge.",
    "image_url": "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-tc-ear-8",
    "retailer_id": "retailer-4",
    "name": "LuxeGold Spatial Audio Wireless Over-Ear Headphones",
    "category": "tech",
    "item_category": "headphones",
    "price": 199,
    "badge": "✨ Spatial Audio",
    "description": "Crafted with anodized champagne aluminum earcups, breathable knit-mesh canopy, dynamic head-tracking spatial audio, and premium ANC.",
    "image_url": "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-tc-mou-1",
    "retailer_id": "retailer-4",
    "name": "ViperStrike 49g Ultralight Wireless Gaming Mouse",
    "category": "tech",
    "item_category": "mouse",
    "price": 79,
    "badge": "⚡ 49 Grams",
    "description": "PAW3395 optical sensor with 26,000 DPI, pure virgin grade PTFE skates, and Nordic 52840 MCU.",
    "image_url": "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-tc-mou-2",
    "retailer_id": "retailer-4",
    "name": "ErgoWave Vertical Wireless Productivity Mouse",
    "category": "tech",
    "item_category": "mouse",
    "price": 59,
    "badge": "🩺 Ergonomic",
    "description": "Natural 57-degree handshake posture reducing forearm strain, whisper-quiet micro-switches, and dual Bluetooth connectivity.",
    "image_url": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-tc-mou-3",
    "retailer_id": "retailer-4",
    "name": "Silent Pro Dual-Mode Metal Scroll Travel Mouse",
    "category": "tech",
    "item_category": "mouse",
    "price": 48,
    "badge": "🤫 Silent Click",
    "description": "Machined aluminum infinite scroll wheel with 90% quieter tactile switches and fast USB-C rechargeable cell.",
    "image_url": "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-tc-mou-4",
    "retailer_id": "retailer-4",
    "name": "4K Polling Rate Esports Competition Mouse",
    "category": "tech",
    "item_category": "mouse",
    "price": 99,
    "badge": "🏆 4000Hz Rate",
    "description": "Real 4000Hz polling rate wireless receiver providing sub-0.25ms responsiveness for tournament esports gameplay.",
    "image_url": "https://cdn.shopify.com/s/files/1/0455/0914/8840/files/Pulsar-Xlite-v4-Gaming-Mouse_size3-Black_001_321d2e3e-d316-461b-855c-978a93a5f7cc.png?v=1758612951",
    "in_stock": true
  },
  {
    "id": "prod-tc-mou-5",
    "retailer_id": "retailer-4",
    "name": "Honeycomb Skeleton RGB Ultralight Mouse",
    "category": "tech",
    "item_category": "mouse",
    "price": 64,
    "badge": "🌈 RGB Glow",
    "description": "Hexagonal perforated outer shell offering maximum airflow to keep palms cool during long desk sessions.",
    "image_url": "https://cdn.shopify.com/s/files/1/0549/2681/files/GLO-OC-WL-BLK_Web_Gallery_1_Perspective_2x_fe3f5d3e-a0e5-45ca-8f85-1c87b8ef6a63.webp?v=1772724905",
    "in_stock": true
  },
  {
    "id": "prod-tc-mou-6",
    "retailer_id": "retailer-4",
    "name": "Precision Creator Ergonomic Thumb-Rest Mouse",
    "category": "tech",
    "item_category": "mouse",
    "price": 75,
    "badge": "🎨 Creator Pick",
    "description": "Dual-axis thumb scroll wheel for horizontal video timelines and spreadsheet navigation with gesture button.",
    "image_url": "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-tc-mou-7",
    "retailer_id": "retailer-4",
    "name": "Ultra-Slim Minimalist Pocket Bluetooth Mouse",
    "category": "tech",
    "item_category": "mouse",
    "price": 38,
    "badge": "✈️ Pocket Slim",
    "description": "Sleek 18mm thin profile with magnetic top plate, optical tracking on glass, and rechargeable 60-day battery.",
    "image_url": "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-tc-mou-8",
    "retailer_id": "retailer-4",
    "name": "Matte Obsidian Gaming Mouse with Side Grips",
    "category": "tech",
    "item_category": "mouse",
    "price": 69,
    "badge": "⭐ Grippy Texture",
    "description": "Textured rubberized side panels, optical switches rated for 80 million clicks, and onboard profile memory.",
    "image_url": "https://cdn.shopify.com/s/files/1/0549/2681/files/GLO-D3-WL-BLK_Web_Gallery_Front_2x_904e8b0c-d7df-452f-8d02-c77ac2135703.webp?v=1769119545",
    "in_stock": true
  },
  {
    "id": "prod-tc-kbd-1",
    "retailer_id": "retailer-4",
    "name": "Lumik 75% Mechanical Hot-Swap Wireless Keyboard",
    "category": "tech",
    "item_category": "keyboards",
    "price": 139,
    "badge": "⌨️ Gasket Mount",
    "description": "Factory-lubed Gateron Yellow Pro switches, double-shot PBT keycaps, Poron acoustic dampening foam, and multi-device Bluetooth.",
    "image_url": "https://cdn.shopify.com/s/files/1/0280/3931/5529/files/F75_-_14_e425964e-25a6-4362-b369-28a1ee78fed0.png?v=1754892492",
    "in_stock": true
  },
  {
    "id": "prod-tc-kbd-2",
    "retailer_id": "retailer-4",
    "name": "Apex 65% CNC Aluminum Custom Mechanical Keyboard",
    "category": "tech",
    "item_category": "keyboards",
    "price": 165,
    "badge": "✨ Full Aluminum",
    "description": "Anodized solid 6063 aluminum chassis weighing 1.4kg with brass weight bar, south-facing RGB, and QMK/VIA key remapping.",
    "image_url": "https://cdn.shopify.com/s/files/1/0280/3931/5529/files/EpomakerHE65v2TMR_black_08.png?v=1781503759",
    "in_stock": true
  },
  {
    "id": "prod-tc-kbd-3",
    "retailer_id": "retailer-4",
    "name": "Ultra-Slim Low-Profile Wireless Mechanical Keyboard",
    "category": "tech",
    "item_category": "keyboards",
    "price": 125,
    "badge": "🪶 Low Profile",
    "description": "15mm thickness with Gateron Low Profile mechanical switches, Mac/Windows layout switch, and sleek aluminum frame.",
    "image_url": "https://cdn.shopify.com/s/files/1/1520/4366/files/sm1-slim-mechanical-backlit-bluetooth-keyboard-keyboards-satechi-305662.png?v=1743714698",
    "in_stock": true
  },
  {
    "id": "prod-tc-kbd-4",
    "retailer_id": "retailer-4",
    "name": "Retro Industrial Mechanical Board with Rotary Knob",
    "category": "tech",
    "item_category": "keyboards",
    "price": 148,
    "badge": "📻 Retro Dial",
    "description": "Vintage cream chassis featuring a knurled metal volume knob, tactile linear switches, and warm amber backlighting.",
    "image_url": "https://cdn.shopify.com/s/files/1/0280/3931/5529/files/EPOMAKERRT100PRO_13.webp?v=1777429324",
    "in_stock": true
  },
  {
    "id": "prod-tc-kbd-5",
    "retailer_id": "retailer-4",
    "name": "Compact 60% RGB Tournament Gaming Keyboard",
    "category": "tech",
    "item_category": "keyboards",
    "price": 99,
    "badge": "⚡ Tournament",
    "description": "Maximized desk space layout with optical speed switches, detachable USB-C, and per-key customizable RGB lighting.",
    "image_url": "https://cdn.shopify.com/s/files/1/0280/3931/5529/files/IMG_7744.png?v=1746609221",
    "in_stock": true
  },
  {
    "id": "prod-tc-kbd-6",
    "retailer_id": "retailer-4",
    "name": "Gasket-Mounted Silent Switch Office Keyboard",
    "category": "tech",
    "item_category": "keyboards",
    "price": 135,
    "badge": "🤫 Silent Thock",
    "description": "Pre-lubed silent tactile switches with multi-layer silicone acoustic dampening designed for quiet open-office productivity.",
    "image_url": "https://cdn.shopify.com/s/files/1/0280/3931/5529/files/EPOMAKER_Galaxy_100_Lite_Creamy_White_3.webp?v=1763521588",
    "in_stock": true
  },
  {
    "id": "prod-tc-kbd-7",
    "retailer_id": "retailer-4",
    "name": "Tenkeyless Custom PBT Dye-Sub Mechanical Board",
    "category": "tech",
    "item_category": "keyboards",
    "price": 140,
    "badge": "⭐ TKL Layout",
    "description": "Classic 87-key layout with thick 1.5mm dye-sublimated PBT keycaps that never shine or wear down over time.",
    "image_url": "https://cdn.shopify.com/s/files/1/0280/3931/5529/products/203A6524.jpg?v=1700633294",
    "in_stock": true
  },
  {
    "id": "prod-tc-kbd-8",
    "retailer_id": "retailer-4",
    "name": "Alice Ergonomic Split Layout Wireless Keyboard",
    "category": "tech",
    "item_category": "keyboards",
    "price": 175,
    "badge": "🩺 Ergonomic Split",
    "description": "Contoured Alice angled key cluster and dual spacebars engineered to keep wrists in a natural non-pronated angle.",
    "image_url": "https://cdn.shopify.com/s/files/1/0280/3931/5529/files/EPOMAKER_Split70-white_blue-bip_3.webp?v=1758767386",
    "in_stock": true
  },
  {
    "id": "prod-tc-cab-1",
    "retailer_id": "retailer-4",
    "name": "100W Double-Braided USB-C to USB-C Fast Charge Cable",
    "category": "tech",
    "item_category": "cables",
    "price": 24,
    "badge": "⚡ 100W PD",
    "description": "Ballistic nylon braiding with E-Marker smart power chip, zinc-alloy connectors, and 480Mbps data sync.",
    "image_url": "https://cdn.shopify.com/s/files/1/1520/4366/products/usb-c-to-usb-c-100w-charging-cable-cables-satechi-518036.jpg?v=1762440113",
    "in_stock": true
  },
  {
    "id": "prod-tc-cab-2",
    "retailer_id": "retailer-4",
    "name": "Custom Coiled Aviator Mechanical Keyboard Cable",
    "category": "tech",
    "item_category": "cables",
    "price": 38,
    "badge": "✨ Desk Aesthetic",
    "description": "Double-sleeved PET mesh coiled cable with 5-pin GX16 metal aviator quick-release connector and gold-plated tips.",
    "image_url": "https://cdn.shopify.com/s/files/1/0280/3931/5529/files/IMG_91691_6a70fc46-70eb-458a-a18d-78c10ecaf01b.jpg?v=1686639310",
    "in_stock": true
  },
  {
    "id": "prod-tc-cab-3",
    "retailer_id": "retailer-4",
    "name": "240W Thunderbolt 4 Braided High-Speed Data Cable",
    "category": "tech",
    "item_category": "cables",
    "price": 45,
    "badge": "🚀 40Gbps",
    "description": "Certified 40Gbps bandwidth supporting single 8K or dual 4K 120Hz display output with 240W Power Delivery.",
    "image_url": "https://cdn.shopify.com/s/files/1/1520/4366/products/thunderbolt-4-pro-cable-1m-cables-satechi-685670.jpg?v=1762441399",
    "in_stock": true
  },
  {
    "id": "prod-tc-cab-4",
    "retailer_id": "retailer-4",
    "name": "Magnetic 3-in-1 Fast Charging Cable Set",
    "category": "tech",
    "item_category": "cables",
    "price": 29,
    "badge": "🧲 Magnetic Snap",
    "description": "Swiveling 540-degree magnetic head with interchangeable USB-C, Lightning, and Micro-USB tips.",
    "image_url": "https://cdn.shopify.com/s/files/1/0611/2234/7259/files/1.5m-cen_445a1d0d-747e-4416-95a7-bf78aff5245a.webp?v=1776224207",
    "in_stock": true
  },
  {
    "id": "prod-tc-cab-5",
    "retailer_id": "retailer-4",
    "name": "Right-Angle 90-Degree Braided Gaming USB-C Cable",
    "category": "tech",
    "item_category": "cables",
    "price": 22,
    "badge": "🎮 Handheld Comfort",
    "description": "90-degree right angle connector designed for seamless handheld gaming and phone usage while charging.",
    "image_url": "https://cdn.shopify.com/s/files/1/1520/4366/files/right-angle-usb-c-to-usb-c-data-and-charge-cable-1m-satechi-927183.webp?v=1762441864",
    "in_stock": true
  },
  {
    "id": "prod-tc-cab-6",
    "retailer_id": "retailer-4",
    "name": "8K Ultra High-Speed Braided HDMI 2.1 Cable (2m)",
    "category": "tech",
    "item_category": "cables",
    "price": 32,
    "badge": "📺 8K @ 60Hz",
    "description": "48Gbps ultra-high-speed bandwidth with dynamic HDR, eARC, and VRR support for PS5 and PC gaming.",
    "image_url": "https://cdn.shopify.com/s/files/1/1520/4366/products/8k-ultra-hd-high-speed-hdmi-21-cable-cables-satechi-166826.jpg?v=1762441155",
    "in_stock": true
  },
  {
    "id": "prod-tc-cab-7",
    "retailer_id": "retailer-4",
    "name": "Audiophile Gold-Plated 3.5mm Braided Aux Cable",
    "category": "tech",
    "item_category": "cables",
    "price": 19,
    "badge": "🎵 Lossless Sound",
    "description": "Silver-plated oxygen-free copper core with 24K gold-plated audio plugs for pure signal transmission.",
    "image_url": "https://cdn.shopify.com/s/files/1/1503/1368/files/Meze-Audio-99-Series-Gold-standard-cable.webp?v=1734524439",
    "in_stock": true
  },
  {
    "id": "prod-tc-cab-8",
    "retailer_id": "retailer-4",
    "name": "Heavy-Duty Kevlar Reinforced 6ft Fast Charging Cable",
    "category": "tech",
    "item_category": "cables",
    "price": 26,
    "badge": "🛡️ 30,000+ Bends",
    "description": "Bulletproof Kevlar fiber core with strain-relief collar tested to withstand over 30,000 extreme bends.",
    "image_url": "https://cdn.shopify.com/s/files/1/0611/2234/7259/files/240W_CC_Cbale.webp?v=1785235794",
    "in_stock": true
  },
  {
    "id": "prod-bg-crb-1",
    "retailer_id": "retailer-5",
    "name": "Tactical Cordura EDC Crossbody Sling",
    "category": "bags",
    "item_category": "crossbody",
    "price": 85,
    "badge": "⚡ Weatherproof",
    "description": "1000D ballistic Cordura nylon with Fidlock V-buckle magnetic quick-release strap and padded tablet sleeve.",
    "image_url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-crb-2",
    "retailer_id": "retailer-5",
    "name": "Handcrafted Full-Grain Leather Saddle Crossbody",
    "category": "bags",
    "item_category": "crossbody",
    "price": 130,
    "badge": "⭐ Artisan Made",
    "description": "Tuscan vegetable-tanned leather with burnished beveled edges, brass hardware, and dual interior compartments.",
    "image_url": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-crb-3",
    "retailer_id": "retailer-5",
    "name": "Waterproof Roll-Top Commuter Crossbody Sling",
    "category": "bags",
    "item_category": "crossbody",
    "price": 92,
    "badge": "🌧️ Submersible",
    "description": "TPU coated waterproof tarpaulin with welded seams, roll-top closure, and reflective exterior webbing loops.",
    "image_url": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-crb-4",
    "retailer_id": "retailer-5",
    "name": "Minimalist Canvas & Leather Crossbody Courier",
    "category": "bags",
    "item_category": "crossbody",
    "price": 88,
    "badge": "✨ Everyday Carry",
    "description": "Heavy 16oz cotton canvas with bridle leather trim, magnetic flap closure, and quick-access rear passport pocket.",
    "image_url": "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-crb-5",
    "retailer_id": "retailer-5",
    "name": "Vegetable-Tanned Saddle Leather Crossbody Pouch",
    "category": "bags",
    "item_category": "crossbody",
    "price": 115,
    "badge": "🍂 Natural Patina",
    "description": "Unlined saddle leather that develops a lustrous amber patina over time, fitted with adjustable shoulder strap.",
    "image_url": "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-crb-6",
    "retailer_id": "retailer-5",
    "name": "Modular Tech Organizer Crossbody Bag",
    "category": "bags",
    "item_category": "crossbody",
    "price": 78,
    "badge": "🔋 Cable Ready",
    "description": "Clamshell opening with elastic organizer loops for cables, chargers, powerbanks, and compact tech gear.",
    "image_url": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-crb-7",
    "retailer_id": "retailer-5",
    "name": "Vintage Olive Military Utility Crossbody",
    "category": "bags",
    "item_category": "crossbody",
    "price": 82,
    "badge": "🪖 Field Spec",
    "description": "Washed army duck canvas with distressed brass clips, dual front cargo pockets, and heavy-duty webbed strap.",
    "image_url": "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-crb-8",
    "retailer_id": "retailer-5",
    "name": "Compact Bifold Leather Crossbody Clutch",
    "category": "bags",
    "item_category": "crossbody",
    "price": 98,
    "badge": "⭐ Versatile",
    "description": "Detachable strap allows instant conversion from hands-free crossbody to a sleek evening leather clutch.",
    "image_url": "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-shd-1",
    "retailer_id": "retailer-5",
    "name": "Heavy-Waxed Canvas Everyday Shoulder Tote",
    "category": "bags",
    "item_category": "shoulder",
    "price": 115,
    "badge": "✨ Daily Carry",
    "description": "Heavy 18oz waxed cotton duck canvas with bridle leather handles, padded 15-inch laptop compartment, and luggage pass-through.",
    "image_url": "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-shd-2",
    "retailer_id": "retailer-5",
    "name": "Italian Pebbled Leather Classic Shoulder Tote",
    "category": "bags",
    "item_category": "shoulder",
    "price": 155,
    "badge": "⭐ Italian Leather",
    "description": "Supple pebbled calfskin with roomy structured base, micro-suede lining, and interior zippered divider.",
    "image_url": "https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-shd-3",
    "retailer_id": "retailer-5",
    "name": "Slouchy Italian Suede Leather Shoulder Bag",
    "category": "bags",
    "item_category": "shoulder",
    "price": 145,
    "badge": "🔥 Bestseller",
    "description": "Supple unlined suede leather hobo bag featuring wide shoulder comfort strap and magnetic bridge closure.",
    "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-shd-4",
    "retailer_id": "retailer-5",
    "name": "Reinforced Cotton Duck Daily Carryall Tote",
    "category": "bags",
    "item_category": "shoulder",
    "price": 75,
    "badge": "🌿 Natural Cotton",
    "description": "Double-bottom reinforced canvas with interior water bottle holder, key tether, and exterior slip pocket.",
    "image_url": "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-shd-5",
    "retailer_id": "retailer-5",
    "name": "Structured Saddle Leather Shoulder Sac",
    "category": "bags",
    "item_category": "shoulder",
    "price": 160,
    "badge": "✨ Minimal Luxe",
    "description": "Clean architectural lines with hand-stitched bar tacks, solid brass stud closure, and structured flat bottom.",
    "image_url": "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-shd-6",
    "retailer_id": "retailer-5",
    "name": "Soft Nappa Leather Crescent Shoulder Hobo",
    "category": "bags",
    "item_category": "shoulder",
    "price": 135,
    "badge": "🌙 Crescent Shape",
    "description": "Ergonomic curved moon silhouette that hugs the side of the body comfortably with smooth glide YKK zipper.",
    "image_url": "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-shd-7",
    "retailer_id": "retailer-5",
    "name": "Waxed Canvas & Leather Commuter Messenger",
    "category": "bags",
    "item_category": "shoulder",
    "price": 140,
    "badge": "💼 Commuter Pro",
    "description": "Padded laptop sleeve fitting up to 16-inch laptops with quick-release buckles and breathable air-mesh shoulder pad.",
    "image_url": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-shd-8",
    "retailer_id": "retailer-5",
    "name": "Two-Tone Canvas & Leather Weekend Shoulder Duffle",
    "category": "bags",
    "item_category": "shoulder",
    "price": 165,
    "badge": "✈️ Weekender",
    "description": "35L capacity meets airline carry-on requirements, with full-grain leather base, handles, and luggage tag.",
    "image_url": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-hnd-1",
    "retailer_id": "retailer-5",
    "name": "Heritage Full-Grain Structured Leather Handbag",
    "category": "bags",
    "item_category": "handbags",
    "price": 175,
    "badge": "⭐ Premium Cut",
    "description": "Tuscan vegetable-tanned full-grain leather with hand-painted beveled edges, gold-toned turnlock, and removable strap.",
    "image_url": "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-hnd-2",
    "retailer_id": "retailer-5",
    "name": "Artisan Minimalist Top-Handle Leather Satchel",
    "category": "bags",
    "item_category": "handbags",
    "price": 160,
    "badge": "✨ Timeless",
    "description": "Geometric sculpted silhouette with magnetic flap closure, suede interior lining, and protective brass base feet.",
    "image_url": "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-hnd-3",
    "retailer_id": "retailer-5",
    "name": "Crocodile-Embossed Luxe Leather Evening Bag",
    "category": "bags",
    "item_category": "handbags",
    "price": 185,
    "badge": "🐊 Embossed Luxe",
    "description": "Exquisite crocodile-embossed calfskin with brushed gold push-lock hardware and detachable chain-link strap.",
    "image_url": "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-hnd-4",
    "retailer_id": "retailer-5",
    "name": "Classic Full-Grain Doctor Bag Handbag",
    "category": "bags",
    "item_category": "handbags",
    "price": 195,
    "badge": "👜 Classic Frame",
    "description": "Traditional hinged brass-frame doctor bag silhouette that stays open for effortless packing and access.",
    "image_url": "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-hnd-5",
    "retailer_id": "retailer-5",
    "name": "Hand-Woven Leather Frame Evening Handbag",
    "category": "bags",
    "item_category": "handbags",
    "price": 170,
    "badge": "✨ Artisan Weave",
    "description": "Intricate intrecciato hand-woven calf leather with soft rounded corners and magnetic kiss-lock closure.",
    "image_url": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-hnd-6",
    "retailer_id": "retailer-5",
    "name": "Vintage Brass-Clasp Leather Top-Handle Bag",
    "category": "bags",
    "item_category": "handbags",
    "price": 168,
    "badge": "⭐ Retro Elegance",
    "description": "Polished cognac leather with vintage top handle, solid brass turn-lock clasp, and expandable accordion gussets.",
    "image_url": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-hnd-7",
    "retailer_id": "retailer-5",
    "name": "Compact Geometric Nappa Leather Mini Bag",
    "category": "bags",
    "item_category": "handbags",
    "price": 145,
    "badge": "✨ Mini Silhouette",
    "description": "Chic sculpted micro-proportions crafted in glove-soft nappa leather with cardholder slots and phone compartment.",
    "image_url": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  },
  {
    "id": "prod-bg-hnd-8",
    "retailer_id": "retailer-5",
    "name": "Dual-Handle Soft Calfskin Day Satchel",
    "category": "bags",
    "item_category": "handbags",
    "price": 180,
    "badge": "🔥 Daily Luxury",
    "description": "Buttery tumbled leather with double rolled handles, zip-around main compartment, and protective base feet.",
    "image_url": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&auto=format&fit=crop&q=80",
    "in_stock": true
  }
];

export const INITIAL_ORDERS = [
  {
    id: 1001,
    retailer_id: 'retailer-1',
    customer_name: 'Marcus Vance',
    customer_phone: '+1 (555) 234-9812',
    delivery_notes: '742 Evergreen Terrace, Apt 4B, Springfield',
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
    delivery_notes: '1204 Sunset Blvd, Suite 12, Los Angeles, CA',
    total_price: 160.00,
    status: 'Completed',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    items: [
      { id: 'prod-sh-snk-1', name: 'Nike Air Max 270 "University Red"', price: 160.00, quantity: 1 }
    ]
  },
  {
    id: 1003,
    retailer_id: 'retailer-4',
    customer_name: 'Liam Gallagher',
    customer_phone: '+1 (555) 345-6789',
    delivery_notes: '88 King Street, Penthouse 6, San Francisco, CA',
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
    delivery_notes: '512 North Michigan Ave, Unit 18A, Chicago, IL',
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
    delivery_notes: '340 Ocean Drive, Townhouse 3, Miami Beach, FL',
    total_price: 145.00,
    status: 'Pending',
    created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    items: [
      { id: 'prod-bg-shd-1', name: 'Slouchy Italian Suede Leather Shoulder Bag', price: 145.00, quantity: 1 }
    ]
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    product_id: 'prod-sw-hood-1',
    user_name: 'Julian Sterling',
    user_email: 'julian.s@example.com',
    rating: 5,
    description: 'The heavyweight 450 GSM fleece is phenomenal. The boxy drape is exactly what I wanted from an authentic streetwear drop.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  },
  {
    id: 'rev-2',
    product_id: 'prod-sk-ser-1',
    user_name: 'Claire Moreau',
    user_email: 'claire.m@beautyglow.com',
    rating: 5,
    description: 'Absorbs instantly without feeling greasy. Squalane and rosehip make my skin look hydrated and glowy all day.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
  },
  {
    id: 'rev-3',
    product_id: 'prod-sh-snk-1',
    user_name: 'Ethan Cole',
    user_email: 'ethan.c@sneakerheads.org',
    rating: 5,
    description: 'The Max Air 270 bubble provides unbelievable bounce and the University Red colorway turns heads everywhere.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString()
  },
  {
    id: 'rev-4',
    product_id: 'prod-tc-ear-1',
    user_name: 'Sarah Jenkins',
    user_email: 's.jenkins@audiotech.net',
    rating: 5,
    description: 'Active Noise Cancellation cuts out street noise completely and the transparency mode sounds very natural.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString()
  },
  {
    id: 'rev-5',
    product_id: 'prod-bg-crb-1',
    user_name: 'David Vance',
    user_email: 'david.vance@outdoors.com',
    rating: 5,
    description: 'Rugged Cordura construction with smart internal organization. Fits my phone, keys, charger, and sunglasses easily.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: 'Spring Collection Drops Now Live',
    message: 'Explore brand-new arrivals across streetwear, tech, footwear, and curated leather goods.',
    timestamp: 'Just now'
  }
];
