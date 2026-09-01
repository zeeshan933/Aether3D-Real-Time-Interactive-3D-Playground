import React from 'react';
import { Layers, Sparkles, Box, Compass, Github, Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="navbar">
      <a href="#hero" className="nav-brand">
        <div className="brand-icon-box">
          <Layers size={22} color="#fff" />
        </div>
        <span>Aether<span className="gradient-text">3D</span></span>
      </a>

      <nav>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#studio">3D Studio</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#presets">Presets</a></li>
        </ul>
      </nav>

      <div className="nav-actions">
        <a
          href="#studio"
          className="btn btn-primary btn-sm"
        >
          <Sparkles size={16} />
          <span>Launch Studio</span>
        </a>
      </div>
    </header>
  );
}

