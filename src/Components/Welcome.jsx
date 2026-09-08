import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Truck,
  CheckCircle,
  Sun,
  Moon
} from 'lucide-react';
import { INITIAL_SHOPS } from '../Data/initialMallData';
import { getShops } from '../Data/mallStore';
import '../CSS/welcome.css';

const storyText = `Step into a unified digital mall platform where premier fashion brands, skincare specialists, and tech innovators connect under one roof.

Browse curated storefronts with zero login friction, drop items from multiple shops into your single cart, and enjoy seamless tracked doorstep delivery.`;

const SHOP_TAGS = {
  'retailer-1': 'Store • Urban Streetwear',
  'retailer-2': 'Store • Clean Skincare',
  'retailer-3': 'Store • Shoes & Sneakers',
  'retailer-4': 'Store • Tech Accessories',
  'retailer-5': 'Store • Leathercraft & Bags'
};

const Welcome = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [shops, setShops] = useState(INITIAL_SHOPS);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setTypedText(storyText.slice(0, index));

      if (index >= storyText.length) {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getShops()
      .then((loaded) => {
        if (loaded && loaded.length > 0) {
          setShops(loaded);
        }
      })
      .catch(() => {});
  }, []);

  const [theme, setTheme] = useState(() => localStorage.getItem('sc_theme') || 'light');

  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e.detail && typeof e.detail === 'string') {
        setTheme(e.detail);
      }
    };
    window.addEventListener('sc:theme_changed', handleThemeChange);
    return () => window.removeEventListener('sc:theme_changed', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('sc_theme', next);
    document.documentElement.setAttribute('data-theme', next);
    window.dispatchEvent(new CustomEvent('sc:theme_changed', { detail: next }));
  };

  return (
    <div className="welcomePage">
      <button
        className="welcomeThemeBtn"
        onClick={toggleTheme}
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <div className="welcomeLeft">
        <div className="welcomeLeftContent">
          {/* Eyebrow Tag */}
          <div className="welcomeTag">
            <Sparkles size={14} />
            <span>NEXT-GEN VIRTUAL MALL</span>
          </div>

          {/* Main Heading */}
          <h1 className="welcomeMainHeading">
            Single<span>Cart</span>
          </h1>

          {/* Subheading */}
          <h2 className="welcomeSubHeading">
            Multi-Tenant Virtual Mall & Instant Ordering
          </h2>

          {/* Real-time Aesthetic Story Typewriter with Fixed Container */}
          <div className="welcomeDescription">
            <p>
              {typedText}
              {!isTypingDone && <span className="typingCursor">|</span>}
            </p>
          </div>

          {/* Highlight Pills */}
          <div className="welcomePillsRow">
            <span className="welcomeHighlightPill">
              <ShoppingBag size={14} color="#ea580c" />
              <span>Multi-Store Single Bag</span>
            </span>
            <span className="welcomeHighlightPill">
              <Truck size={14} color="#d97706" />
              <span>Express Doorstep Delivery</span>
            </span>
            <span className="welcomeHighlightPill">
              <CheckCircle size={14} color="#16a34a" />
              <span>Zero Account Friction</span>
            </span>
          </div>

          {/* Action Area (Single Clean Entry Point) */}
          <div className="welcomeActionArea">
            <div className="welcomeBtnGroup">
              <button
                className="welcomePrimaryBtn"
                onClick={() => navigate('/mall')}
              >
                <span>Enter Digital Mall</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Bottom Contact Icons (App Icons Only, No Text) */}
            <div className="welcomeContactBar">
              <span className="contactLabel">Connect</span>

              <div className="welcomeSocialLinks">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/923230539065"
                  target="_blank"
                  rel="noreferrer"
                  className="socialIconBtn whatsapp"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/abdullahqazi__?igsi=eWZ0c2lzazB3OHJn"
                  target="_blank"
                  rel="noreferrer"
                  className="socialIconBtn instagram"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com/_qaziabdullah_"
                  target="_blank"
                  rel="noreferrer"
                  className="socialIconBtn twitter"
                  aria-label="X (Twitter)"
                  title="X (Twitter)"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT HERO MEDIA COLUMN - LOCKED, STATIC & NO RESIZING */}
      <div className="welcomeRight">
        <img
          src="https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1400&auto=format&fit=crop&q=80"
          alt="Luxury Mall Architecture"
          className="welcomeRightImg"
        />
        <div className="welcomeRightOverlay" />

        {/* Floating preview cards for every retail shop */}
        <div className="welcomeFloatingCards">
          {shops.map((shop, index) => {
            const tag =
              SHOP_TAGS[shop.id] ||
              (shop.location_in_mall && !shop.location_in_mall.toLowerCase().includes('floor')
                ? `${shop.location_in_mall.split(',')[0]} • ${shop.department || 'Store'}`
                : `Store • ${shop.department || 'Curated'}`);

            return (
              <div
                key={shop.id}
                className={`floatingCard card-pos-${index % 5}`}
                onClick={() => navigate(`/store/${shop.id}`)}
                title={`Visit ${shop.shop_name}`}
              >
                <img
                  src={shop.logo_url}
                  alt={shop.shop_name}
                  className="floatingCardImg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="floatingCardText">
                  <strong>{shop.shop_name}</strong>
                  <span>{tag}</span>
                </div>
                <div className="floatingCardHoverAction">
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
