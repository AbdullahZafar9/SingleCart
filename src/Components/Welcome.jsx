import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Store,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Coffee,
  CheckCircle,
  MessageCircle,
  Instagram,
  Twitter
} from 'lucide-react';
import '../CSS/welcome.css';

const storyText = `Step into an elevated digital galleria where premier fashion houses, specialty roasteries, and tech innovators unite under one roof.

Browse curated boutique storefronts with zero login friction, drop signature drops into your single cart, and enjoy instant table or curbside pickup.`;

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
            <span>THE DIGITAL GALLERIA</span>
          </div>

          {/* Main Heading */}
          <h1 className="welcomeMainHeading">
            Single<span>Cart</span>
          </h1>

          {/* Subheading */}
          <h2 className="welcomeSubHeading">
            Multi-Tenant Virtual Mall & Instant Ordering
          </h2>

          {/* Real-time Aesthetic Story Typewriter */}
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

          {/* Immediate Action Buttons */}
          <div className="welcomeActionArea">
            <div className="welcomeBtnGroup">
              <button
                className="welcomePrimaryBtn"
                onClick={() => navigate('/mall')}
              >
                <span>Enter Digital Mall</span>
                <ArrowRight size={18} />
              </button>

              <button
                className="welcomeSecondaryBtn"
                onClick={() => navigate('/retailer')}
              >
                <Store size={16} />
                <span>Retailer Portal</span>
              </button>

              <button
                className="welcomeSecondaryBtn"
                onClick={() => navigate('/admin')}
              >
                <ShieldCheck size={16} />
                <span>Executive Admin</span>
              </button>
            </div>

            {/* Bottom Contact & Social Links */}
            <div className="welcomeContactBar">
              <span className="contactLabel">Connect & Contact</span>

              <div className="welcomeSocialLinks">
                <a
                  href="https://wa.me/923230539065"
                  target="_blank"
                  rel="noreferrer"
                  className="socialBtn whatsapp"
                  title="WhatsApp Support"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://www.instagram.com/abdullahqazi__?igsi=eWZ0c2lzazB3OHJn"
                  target="_blank"
                  rel="noreferrer"
                  className="socialBtn instagram"
                  title="Instagram"
                >
                  <Instagram size={16} />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://x.com/_qaziabdullah_"
                  target="_blank"
                  rel="noreferrer"
                  className="socialBtn twitter"
                  title="Twitter / X"
                >
                  <Twitter size={16} />
                  <span>Twitter / X</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT HERO MEDIA COLUMN */}
      <div className="welcomeRight">
        <img
          src="https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1400&auto=format&fit=crop&q=80"
          alt="Luxury Mall Architecture"
          className="welcomeRightImg"
        />
        <div className="welcomeRightOverlay" />

        {/* Floating live mall cards */}
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
