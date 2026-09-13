import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Truck,
  CheckCircle
} from 'lucide-react';
import '../CSS/welcome.css';

const FULL_DESCRIPTION =
  'Step into a unified digital mall platform connecting premier fashion brands, skincare specialists, and tech innovators under one roof. Browse curated storefronts with zero login friction, drop items from multiple shops into your single cart, and enjoy seamless tracked doorstep delivery.';

const Welcome = () => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  useEffect(() => {
    let charIndex = 0;
    const speed = 14; // ~14ms per character for brisk, natural real-time streaming
    const timer = setInterval(() => {
      charIndex += 1;
      setDisplayedText(FULL_DESCRIPTION.slice(0, charIndex));
      if (charIndex >= FULL_DESCRIPTION.length) {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, speed);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="welcomePage" data-theme="light">
      <div className="welcomeContainer">
        {/* Brand Header */}
        <header className="welcomeTopBar">
          <div className="welcomeBrand">
            <div className="brandLogoIcon">
              <ShoppingBag size={20} color="#ffffff" />
            </div>
            <span className="brandName">
              Single<span>Cart</span>
            </span>
          </div>
        </header>

        {/* Central Hero Content */}
        <main className="welcomeHero">
          {/* Eyebrow Tag */}
          <div className="welcomeTag">
            <Sparkles size={14} />
            <span>NEXT-GEN VIRTUAL MALL</span>
          </div>

          {/* Main Headline */}
          <h1 className="welcomeMainHeading">
            One Unified Cart.<br />
            <span>Infinite Boutiques.</span>
          </h1>

          {/* Subheading */}
          <p className="welcomeSubHeading">
            Multi-Tenant Virtual Mall & Instant Ordering
          </p>

          {/* Value Story Description (Streamed in real-time) */}
          <p className="welcomeDescription typewriter">
            {displayedText}
            {!isTypingComplete && <span className="welcomeTypingCursor">|</span>}
          </p>

          {/* Highlight Pills */}
          <div className="welcomePillsRow">
            <div className="welcomeHighlightPill">
              <ShoppingBag size={14} color="#c2410c" />
              <span>Multi-Store Single Bag</span>
            </div>
            <div className="welcomeHighlightPill">
              <Truck size={14} color="#d97706" />
              <span>Express Doorstep Delivery</span>
            </div>
            <div className="welcomeHighlightPill">
              <CheckCircle size={14} color="#16a34a" />
              <span>Zero Account Friction</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="welcomeActionArea">
            <button
              className="welcomePrimaryBtn"
              onClick={() => navigate('/mall')}
              aria-label="Explore Marketplace"
            >
              <span>Explore Marketplace</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </main>

        {/* Clean Bottom Social Connect Bar */}
        <footer className="welcomeFooter">
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
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
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
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
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
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Welcome;
