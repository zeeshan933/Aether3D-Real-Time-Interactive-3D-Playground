import React from 'react';
import { Layers, ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="brand-icon-box" style={{ width: 30, height: 30 }}>
              <Layers size={18} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>
              Aether<span className="gradient-text">3D</span>
            </span>
          </div>
          <p>Next-generation interactive 3D WebGL experience built with React & Three.js.</p>
        </div>

        <div className="footer-links">
          <a href="#hero">Home</a>
          <a href="#studio">3D Studio</a>
          <a href="#features">Features</a>
          <a href="#presets">Presets</a>
        </div>

        <button onClick={scrollToTop} className="btn btn-secondary btn-sm" title="Back to top">
          <ArrowUp size={16} />
          <span>Top</span>
        </button>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Aether3D Studio. All rights reserved.</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          Crafted with <Heart size={14} color="#ec4899" fill="#ec4899" /> in ReactJS
        </span>
      </div>
    </footer>
  );
}

