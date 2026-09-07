import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Coffee,
  CheckCircle
} from 'lucide-react';
import '../CSS/welcome.css';

const storyText = `Step into a unified digital mall platform where premier fashion boutiques, specialty roasteries, and tech innovators connect under one roof.

Browse curated storefronts with zero login friction, drop items from multiple shops into your single cart, and enjoy instant table or curbside pickup.`;

const Welcome = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

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

  return (
    <div className="welcomePage">
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
              <Coffee size={14} color="#d97706" />
              <span>Table & Curbside Pickup</span>
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

        {/* Floating preview cards */}
        <div className="welcomeFloatingCards">
          <div className="floatingCard card-1">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&auto=format&fit=crop&q=80"
              alt="Brew & Bean"
            />
            <div className="floatingCardText">
              <strong>Brew & Bean Roastery</strong>
              <span>Floor 1 • 5 mins prep</span>
            </div>
          </div>

          <div className="floatingCard card-2">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&auto=format&fit=crop&q=80"
              alt="Apex Streetwear"
            />
            <div className="floatingCardText">
              <strong>Apex Streetwear & Denim</strong>
              <span>Floor 2 • Exclusive Drop</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
