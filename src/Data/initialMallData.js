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
    "name": "Performance Crossover Polo Shirt in Obsidian",
    "category": "streetwear",
    "item_category": "tops",
    "price": 68,
    "badge": "⚡ Performance Polo",
    "description": "Engineered breathable pique weave with structured collar, subtle curved hem, and refined 3-button placket.",
    "image_url": "https://cdn.shopify.com/s/files/1/1368/3463/files/CrossoverPolo_OBSIDIAN.jpg?v=1775526803",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-2",
    "retailer_id": "retailer-1",
    "name": "Lightweight Waffle-Knit Thermal Full Sleeve Shirt",
    "category": "streetwear",
    "item_category": "tops",
    "price": 72,
    "badge": "🍂 Thermal Knit",
    "description": "Textured honeycomb waffle cotton long sleeve with flatlock stitching, ribbed crew collar, and fitted cuffs.",
    "image_url": "https://cdn.shopify.com/s/files/1/1499/3122/files/FW25_RC-2354_BLACK_T-SHIRT_off_jp.jpg?v=1754068970",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-3",
    "retailer_id": "retailer-1",
    "name": "Heavyweight Combed Cotton Crewneck T-Shirt in White",
    "category": "streetwear",
    "item_category": "tops",
    "price": 48,
    "badge": "⭐ Essential",
    "description": "240 GSM pre-shrunk combed cotton jersey offering an ultra-clean drape, ribbed bound collar, and durable drop shoulders.",
    "image_url": "https://cdn.shopify.com/s/files/1/1499/3122/files/FW26_RC-1685_WHITE_T-SHIRT_off_jp.jpg?v=1785518281",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-4",
    "retailer_id": "retailer-1",
    "name": "Crossover Pique Polo Shirt in Bone White",
    "category": "streetwear",
    "item_category": "tops",
    "price": 68,
    "badge": "✨ Crisp Pique",
    "description": "Contemporary tailored polo shirt woven from soft-stretch cotton blend with crisp pointed collar in neutral bone.",
    "image_url": "https://cdn.shopify.com/s/files/1/1368/3463/files/CrossoverPolo_BONE.jpg?v=1775526749",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-5",
    "retailer_id": "retailer-1",
    "name": "Cotton Oxford Button-Down Full Sleeve Shirt in Light Blue",
    "category": "streetwear",
    "item_category": "tops",
    "price": 84,
    "badge": "👔 Tailored Oxford",
    "description": "Long sleeve button-down dress and layering shirt tailored in durable cotton oxford with chest patch pocket and curved hem.",
    "image_url": "https://cdn.shopify.com/s/files/1/1499/3122/files/FW26_RC-8080_LIGHTBLUE_SHIRTING_off_jp.jpg?v=1787167287",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-6",
    "retailer_id": "retailer-1",
    "name": "Vintage Fadeaway Streetwear T-Shirt in Faded Oxide",
    "category": "streetwear",
    "item_category": "tops",
    "price": 52,
    "badge": "🔥 Vintage Wash",
    "description": "Midweight garment-dyed cotton tee with lived-in pigment wash, relaxed drop-shoulder cut, and soft brushed hand feel.",
    "image_url": "https://cdn.shopify.com/s/files/1/1499/3122/files/FW26_RC-1559_FADEDOXIDE_T-SHIRT_off_jp.jpg?v=1788994293",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-7",
    "retailer_id": "retailer-1",
    "name": "Cotton Flannel Plaid Long Sleeve Button-Up Shirt",
    "category": "streetwear",
    "item_category": "tops",
    "price": 92,
    "badge": "🌲 Heritage Flannel",
    "description": "Brushed heavyweight cotton flannel shirt with muted earthen plaid pattern, dual breast pocket, and buttoned barrel cuffs.",
    "image_url": "https://cdn.shopify.com/s/files/1/1499/3122/files/FW26_RC-8074_ARCTICWOLF-OXIDE_SHIRTING_off_jp.jpg?v=1788374876",
    "in_stock": true
  },
  {
    "id": "prod-sw-top-8",
    "retailer_id": "retailer-1",
    "name": "Archival Screenprint Graphic T-Shirt in Black",
    "category": "streetwear",
    "item_category": "tops",
    "price": 54,
    "badge": "✨ Archival Drop",
    "description": "Heavy jersey streetwear tee featuring tonal crest embroidery and minimalist script screenprint in deep jet black.",
    "image_url": "https://cdn.shopify.com/s/files/1/1499/3122/files/SS26_RC-1710_BLACK_T-SHIRT_off_jp.jpg?v=1781624275",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-1",
    "retailer_id": "retailer-1",
    "name": "Tactical Webbing Belt Cargo Pants in Jet Black",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 135,
    "badge": "⚡ Utility Tech",
    "description": "Heavy-duty washed cotton canvas cargo trousers featuring integrated magnetic webbing belt, accordion bellows pockets, and adjustable ankle cinch cords.",
    "image_url": "https://cdn.shopify.com/s/files/1/0587/5816/8785/files/cDPZRoARo4QuVLDsdq-LwBpia0GDT3s-d-NaoYPdFKE.jpg?v=1788531089",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-2",
    "retailer_id": "retailer-1",
    "name": "Straight Leg Washed Denim Jeans in Diffused Black",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 140,
    "badge": "⭐ Raw Denim",
    "description": "Substantial 14oz heavyweight denim crafted with subtle fade wash throughout, relaxed straight leg silhouette, custom embossed hardware, and classic five-pocket construction.",
    "image_url": "https://cdn.shopify.com/s/files/1/0587/5816/8785/files/UhctuT6EUVgOtMq4w0bwm6PWnedPed_M1hQ_LiUNyac.jpg?v=1788517207",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-3",
    "retailer_id": "retailer-1",
    "name": "Cotton Chino Freshman Standard Pant in Sand",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 120,
    "badge": "✨ Tailored Cut",
    "description": "Mid-weight structured cotton chino pants designed in a relaxed straight leg profile with clean slash front pockets, welted rear pockets, and tailored waist finish.",
    "image_url": "https://cdn.shopify.com/s/files/1/1499/3122/files/FW26_RC-5743_SAND_PANT_off_jp.jpg?v=1788215587",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-4",
    "retailer_id": "retailer-1",
    "name": "Washed Utility Bellows Cargo Pants in Vintage Brown",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 130,
    "badge": "🔥 Vintage Wash",
    "description": "Enzyme-washed earthy brown cargo trousers featuring oversized expandable utility flap pockets, articulated darted knees, and heavy-duty reinforced seams.",
    "image_url": "https://cdn.shopify.com/s/files/1/0587/5816/8785/files/Da8rIbvcLH7HeVrQwsj-9RzQ6qjbfqXC2on0l3HNrXU.jpg?v=1788517158",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-5",
    "retailer_id": "retailer-1",
    "name": "Relaxed Distressed Baggy Denim Jeans in Vintage Light Blue",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 145,
    "badge": "🛹 Baggy Cut",
    "description": "Authentic 90s skater baggy denim jeans featuring stone-washed light indigo fade, subtle hand-distressed detailing at the hem, and loose draping silhouette.",
    "image_url": "https://cdn.shopify.com/s/files/1/0587/5816/8785/files/9WOlYgydN_euFnmsfRfBuD3GS-gBsoSdpWSS3HdzOus.jpg?v=1788517197",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-6",
    "retailer_id": "retailer-1",
    "name": "Cotton Chino Freshman Standard Pant in Navy",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 120,
    "badge": "⚓ Classic Fit",
    "description": "Crisp navy cotton chino trousers engineered for versatile everyday styling, built with premium twill weave, reinforced bar-tacks, and a clean straight taper.",
    "image_url": "https://cdn.shopify.com/s/files/1/1499/3122/files/FW26_RC-5743_NAVY_PANT_off_jp.jpg?v=1788215036",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-7",
    "retailer_id": "retailer-1",
    "name": "Riot Camo Bellows Pocket Streetwear Cargo Pants",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 138,
    "badge": "🪖 Field Camo",
    "description": "Combat-ready urban streetwear cargo trousers in custom muted camouflage print, equipped with 6 utility bellows pockets, dual buckle strap accents, and ankle ties.",
    "image_url": "https://cdn.shopify.com/s/files/1/0587/5816/8785/files/bT6qopbW1TXdyuob8P9OraNmaQItyAaxMm58rnwqUsY.jpg?v=1788517139",
    "in_stock": true
  },
  {
    "id": "prod-sw-bot-8",
    "retailer_id": "retailer-1",
    "name": "Heavy Distressed Skater Denim Jeans in Moss Blue",
    "category": "streetwear",
    "item_category": "bottom",
    "price": 148,
    "badge": "⚡ Skater Fit",
    "description": "Rugged vintage-tinted skater jeans in moss blue wash, detailed with horizontal abrasion slashes, heavy reinforced thread stitching, and a comfortable relaxed drape.",
    "image_url": "https://cdn.shopify.com/s/files/1/0587/5816/8785/files/C80QB41oELWgBYZXAaakokjh222TtsUMXu94fvw4RLA.jpg?v=1788517124",
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
    "name": "Niacinamide Serum 12% Plus Zinc 2%",
    "category": "skincare",
    "item_category": "serums",
    "price": 22,
    "badge": "💧 Pore Refine",
    "description": "Concentrated 12% niacinamide and 2% zinc PCA formulated to purify congested pores, balance excess oil, and enhance overall skin clarity.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_NiacinamideSerum_Anniv_Front_CapOn_ecomm.webp?v=1774292312",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-2",
    "retailer_id": "retailer-2",
    "name": "Vitamin C Complex Brightening Serum",
    "category": "skincare",
    "item_category": "serums",
    "price": 24,
    "badge": "🍊 Glow Defense",
    "description": "Potent antioxidant cocktail of pure L-ascorbic acid, Kakadu plum, and fruit-derived glutathione to visibly brighten dull skin and shield from environmental stressors.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_VitaminC_ComplexSerum_brighter_Front_CapOn_2_ecomm.webp?v=1774291207",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-3",
    "retailer_id": "retailer-2",
    "name": "Quadruple Hyaluronic Acid Serum 5%",
    "category": "skincare",
    "item_category": "serums",
    "price": 20,
    "badge": "💧 Intense Hydration",
    "description": "Four distinct molecular weights of biocompatible hyaluronic acid to flood deep cellular layers with long-lasting moisture and bounce.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_Catalog_HA-Serum-CapOn.webp?v=1774294628",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-4",
    "retailer_id": "retailer-2",
    "name": "Retinol Complex Advanced Smoothing Serum",
    "category": "skincare",
    "item_category": "serums",
    "price": 26,
    "badge": "✨ Cellular Renew",
    "description": "Micro-encapsulated stabilized retinol blended with bakuchiol and bio-fermented lipids to smooth fine lines and firm texture without irritation.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_Ecomm_Retinol-Serum_Cap-On.webp?v=1774296074",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-5",
    "retailer_id": "retailer-2",
    "name": "Multi-Peptide Advanced Cellular Serum",
    "category": "skincare",
    "item_category": "serums",
    "price": 28,
    "badge": "⭐ Firming Pro",
    "description": "Advanced complex of signal peptides, copper tripeptide-1, and fermented amino acids to support skin density, firmness, and natural collagen synthesis.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR-Multi-Peptide_Serum_Front_capoff_primary_bone.webp?v=1774292955",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-6",
    "retailer_id": "retailer-2",
    "name": "Tranexamic Topical Acid 5% Clarifying Serum",
    "category": "skincare",
    "item_category": "serums",
    "price": 24,
    "badge": "✨ Tone Balance",
    "description": "Targeted 5% tranexamic acid paired with kojic acid and licorice root extract to diminish stubborn post-blemish marks and dark spots.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/Naturium_Tranexamic_Acid_Front_CapOn_Bone_1.webp?v=1774294545",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-7",
    "retailer_id": "retailer-2",
    "name": "Salicylic Acid Serum 2% Pore-Clearing Solution",
    "category": "skincare",
    "item_category": "serums",
    "price": 22,
    "badge": "🌿 Blemish Control",
    "description": "Lipophilic 2% beta-hydroxy acid (BHA) infused with succinic acid to penetrate pore linings, dissolve sebum plugs, and calm redness.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_Ecomm_SalicylicAcid-Serum-CAPON.webp?v=1774291822",
    "in_stock": true
  },
  {
    "id": "prod-sk-ser-8",
    "retailer_id": "retailer-2",
    "name": "Alpha Arbutin Serum 2% Dark Spot Corrector",
    "category": "skincare",
    "item_category": "serums",
    "price": 22,
    "badge": "🌸 Radiance",
    "description": "High-potency 2% alpha arbutin and niacinamide to inhibit melanin overproduction, even out skin discoloration, and boost luminous glow.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_Ecomm_AA-Serum_CapOn.webp?v=1774296886",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-1",
    "retailer_id": "retailer-2",
    "name": "Niacinamide Cleansing Gelée 3%",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 18,
    "badge": "💧 Gentle Clarify",
    "description": "Innovative gel-to-foam cleanser with 3% niacinamide and hyaluronic acid that lifts impurities without stripping essential skin moisture.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATRM_Ecomm_Niacinamide-Cleansing-Gelee_Front.webp?v=1774289601",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-2",
    "retailer_id": "retailer-2",
    "name": "Vitamin C Complex Brightening Cleanser",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 19,
    "badge": "🍊 Glow Defense",
    "description": "Energizing daily gel wash formulated with stabilized L-ascorbic acid and fruit enzymes to brighten dull skin and purify pores.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_VitaminC_Complex_Cleanser_Front_bonebkgd.webp?v=1774296858",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-3",
    "retailer_id": "retailer-2",
    "name": "Hydrating Cream-To-Milk Barrier Cleanser",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 16,
    "badge": "💧 Barrier Safe",
    "description": "Nourishing non-foaming wash enriched with colloidal oat and barrier-supportive lipids to soothe dry and reactive skin.",
    "image_url": "https://cdn.shopify.com/s/files/1/0370/9111/5143/files/Hydrating_Cream_To_Milk_Cleanser_Eczema_Packshot.png?v=1753172343",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-4",
    "retailer_id": "retailer-2",
    "name": "Fermented Rice Enzyme Powder Cleanser",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 20,
    "badge": "✨ Micro Polish",
    "description": "Gentle water-activated enzyme powder cleanser infused with fermented rice filtrate to micro-polish skin to glass-like smoothness.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_Fermented-Rice-Enzyme-Cleanser-Front.webp?v=1774291179",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-5",
    "retailer_id": "retailer-2",
    "name": "Salicylic Acid 2% Pore-Clearing Cleanser",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 15,
    "badge": "🌿 Blemish Control",
    "description": "Penetrating 2% BHA foaming wash with zinc PCA designed to flush out trapped sebum and reduce blackheads without tightness.",
    "image_url": "https://cdn.shopify.com/s/files/1/0370/9111/5143/products/TheINKEYList_SalicylicAcidCleaser_150mlbottle_englishandfrenchUK_1000x1000_560cec04-3b92-4259-b0fb-a93d9318eaee.png?v=1738661917",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-6",
    "retailer_id": "retailer-2",
    "name": "Fermented Camellia Creamy Cleansing Oil",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 22,
    "badge": "💧 Melting Oil",
    "description": "Silky botanical cleansing oil that instantly melts away waterproof SPF and stubborn makeup, rinsing clean with zero film.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_Fermented-Camellia-Cleansing-Oil-Front_89e29227-a6bc-43e9-9993-e1c6c49a34ad.webp?v=1774290864",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-7",
    "retailer_id": "retailer-2",
    "name": "Colloidal Oat Nourishing Cleansing Balm",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 16,
    "badge": "🌾 Calming Melt",
    "description": "Rich melting balm with 3% oat kernel oil and colloidal oatmeal that calms irritation while dissolving heavy makeup.",
    "image_url": "https://cdn.shopify.com/s/files/1/0370/9111/5143/files/Oat_Balm_Cleanser_150ml_Packshot_1000x1000_150ml.png?v=1786450630",
    "in_stock": true
  },
  {
    "id": "prod-sk-cln-8",
    "retailer_id": "retailer-2",
    "name": "Multi-Calm Barrier Cream Cleanser",
    "category": "skincare",
    "item_category": "cleansers",
    "price": 20,
    "badge": "🧬 Sensitive Pro",
    "description": "Ultra-soothing cushion cream wash featuring marshmallow root, arnica, and squalane to comfort compromised skin barriers.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR-10143_Multi-Calm-Cream-Cleanser_front_capon_bonebkgd_4ab01808-1886-477b-9c76-fa53b9cdbfd0.webp?v=1773876729",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-1",
    "retailer_id": "retailer-2",
    "name": "Multi-Peptide Daily Moisture Cream",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 22,
    "badge": "💧 Barrier Restore",
    "description": "Nutrient-dense peptide cream formulated with multi-peptides, ethyl ascorbic acid, and plant squalane to hydrate and firm.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR-10065_Multi-Peptide-Moisturizer-Front-CapOn-bonebkgd.jpg?v=1777319292",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-2",
    "retailer_id": "retailer-2",
    "name": "Niacinamide Gel Cream 5%",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 20,
    "badge": "✨ Oil-Free Gel",
    "description": "Lightweight burst-hydration gel cream with 5% niacinamide, marine extracts, and zinc PCA for glass-skin finish without shine.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_NiaGelCream_tube_front_CapOn_bonebkgd.webp?v=1774294431",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-3",
    "retailer_id": "retailer-2",
    "name": "Plant Ceramide Rich Moisture Cream",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 25,
    "badge": "🌿 Deep Nourish",
    "description": "Whipped barrier cream packed with bio-identical plant ceramides, shea butter, and essential fatty acids for lasting hydration.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_Catalog_PCRM-Cream-CapOn.webp?v=1774292215",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-4",
    "retailer_id": "retailer-2",
    "name": "Multi-Peptide Ultra-Rich Recovery Cream",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 26,
    "badge": "💙 Intense Repair",
    "description": "Comforting lipid-replenishing cream formulated with biomimetic tripeptides and squalane to restore suppleness to dry, parched skin.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR-Multi-Peptide-Rich-Cream_Front_capon_primary_bone_1.webp?v=1773876037",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-5",
    "retailer_id": "retailer-2",
    "name": "Dew-Glow Daily Moisturizer SPF 50",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 24,
    "badge": "☀️ SPF 50 Shield",
    "description": "Broad-spectrum daily sunscreen moisturizer infused with niacinamide and botanical antioxidants for an all-day dewy glow.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_DewGlow_SPF50_Front_CapOn_bonebkgd.webp?v=1774295804",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-6",
    "retailer_id": "retailer-2",
    "name": "Intense Overnight Sleeping Cream",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 26,
    "badge": "🌙 Overnight Recovery",
    "description": "Cushioning nocturnal recovery treatment infused with fermented micro-algae and evening primrose oil to replenish tired skin while you sleep.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_Catalog_Overnight-Cream-CapOn.webp?v=1774295762",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-7",
    "retailer_id": "retailer-2",
    "name": "Marshmallow Root Barrier Cushion Balm",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 25,
    "badge": "⚡ Barrier Shield",
    "description": "Cocooning moisture balm loaded with marshmallow root extract, centella asiatica, and colloidal oatmeal to seal vulnerable moisture barriers.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_Marshmallow-Root-Barrier-Balm-front.webp?v=1774291343",
    "in_stock": true
  },
  {
    "id": "prod-sk-moi-8",
    "retailer_id": "retailer-2",
    "name": "Retinol Complex Firming Night Cream",
    "category": "skincare",
    "item_category": "moisturizer",
    "price": 24,
    "badge": "⭐ Youth Sculpt",
    "description": "Advanced encapsulated retinol and bakuchiol night cream engineered to refine texture, boost cellular turnover, and smooth fine lines.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_Retinol-Cream-New-Formula_Front_capon.webp?v=1774296747",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-1",
    "retailer_id": "retailer-2",
    "name": "UV Reflect Antioxidant Face Sunscreen SPF 50",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 26,
    "badge": "☀️ Zero Whitecast",
    "description": "Weightless antioxidant-rich fluid sunscreen offering broad-spectrum UVA/UVB protection with an invisible, non-greasy satin finish.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_UV_Reflect_primary_front_capon_bonebkgd.webp?v=1774295065",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-2",
    "retailer_id": "retailer-2",
    "name": "Mineral Zinc Shield Broad Spectrum Sunscreen SPF 50",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 24,
    "badge": "🌿 Reef Safe",
    "description": "100% non-nano zinc oxide physical sunscreen enriched with bisabolol and soothing plant extracts for soft-matte daily coverage.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR-10163_Dew-Glow-Moisturizer-Mineral-SPF_front_capon-bonebkgd.jpg?v=1777412894",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-3",
    "retailer_id": "retailer-2",
    "name": "Birch Juice Moisturizing Sun Cream SPF 45",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 28,
    "badge": "✨ Dewy Hydration",
    "description": "Hydrating daily sun cream powered by Inje birch juice and hyaluronic acid to nourish dry skin while shielding against harsh rays.",
    "image_url": "https://cdn.shopify.com/s/files/1/0249/1218/files/Soko-Glam-Round-Lab-Birch-Juice-Moisturizing-UVLOCK.jpg?v=1752798415",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-4",
    "retailer_id": "retailer-2",
    "name": "Complete No-Stress Physical Sunscreen SPF 50+",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 23,
    "badge": "🌱 Sensitive Safe",
    "description": "Mugwort-infused physical sun screen designed specifically for acne-prone and sensitive skin, calming irritation with zero eye sting.",
    "image_url": "https://cdn.shopify.com/s/files/1/0249/1218/files/Axis-Y-Complete-No-Stress-Physical-Sunscreen.jpg?v=1756221618",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-5",
    "retailer_id": "retailer-2",
    "name": "Aquatica UV Defense Hydrating Face Sunscreen SPF 50",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 24,
    "badge": "🍃 Featherweight",
    "description": "Water-burst daily chemical sunscreen that sinks in within seconds, drenching the skin with triple hyaluronic acid and zero sticky residue.",
    "image_url": "https://cdn.shopify.com/s/files/1/0249/1218/files/Soko-Glam-PDP-Cell-Fusion-C-Aquatica-UV-Defense-Face-Sunscreen-SPF50-01.png?v=1760752806",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-6",
    "retailer_id": "retailer-2",
    "name": "Watery Hyaluron Cooling Sunscreen Tube SPF 50",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 25,
    "badge": "🛡️ Urban Defense",
    "description": "Ultra-refreshing lightweight sunscreen tube fortified with 10 hyaluronic acids and ectoin to defend against UV and environmental pollution.",
    "image_url": "https://cdn.shopify.com/s/files/1/0249/1218/files/Soko-Glam-PDP-Abib-Watery-Hyaluron-Sunscreen-01.png?v=1758827411",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-7",
    "retailer_id": "retailer-2",
    "name": "Dew-Glow Tinted Mineral Sunscreen Fluid SPF 50+",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 24,
    "badge": "🎨 Universal Tint",
    "description": "Adaptive sheer mineral sunscreen tint that blurs redness and imperfections while providing robust broad-spectrum physical defense.",
    "image_url": "https://cdn.shopify.com/s/files/1/0105/2265/6823/files/NATR_DewGlow_SPF50_Medium_Front_CapOn_Swatch_bonebkgd_14410b28-dd81-46de-8815-1e62bd25381f.webp?v=1774294939",
    "in_stock": true
  },
  {
    "id": "prod-sk-sun-8",
    "retailer_id": "retailer-2",
    "name": "Sun Project Moisture Sun Cream SPF 40",
    "category": "skincare",
    "item_category": "sun screen",
    "price": 24,
    "badge": "🏊 Water Resist",
    "description": "Moisturizing daily sun cream infused with African walnut oil and phyto-oligo extracts that smooths skin texture and resists humidity.",
    "image_url": "https://cdn.shopify.com/s/files/1/0249/1218/files/Thank-You-Farmer-Sun-Project-Moisture-Sun-Cream-SPF40-Broad-Spectrum.jpg?v=1752910724",
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
    total_price: 22.00,
    status: 'Preparing',
    created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    items: [
      { id: 'prod-sk-ser-1', name: 'Niacinamide Serum 12% Plus Zinc 2%', price: 22.00, quantity: 1 }
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
    description: 'Cleared up persistent congestion around my T-zone and visibly smoothed pore texture in just ten days. An essential staple.',
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
