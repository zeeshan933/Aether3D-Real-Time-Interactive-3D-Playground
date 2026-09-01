import React from 'react';
import { ArrowRight, Sparkles, Orbit, ShieldCheck, Cpu } from 'lucide-react';

export default function Hero({ onExploreStudio }) {
  return (
    <section id="hero" className="section hero-section">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <span>WebGL 2.0 Powered 3D Engine</span>
          </div>

          <h1 className="hero-title">
            Experience <br />
            <span className="gradient-text">Interactive 3D</span> <br />
            in Real-Time.
          </h1>

          <p className="hero-description">
            A high-performance single page React 3D studio. Manipulate complex geometric
            forms, dynamic lighting, customizable shaders, and particle dynamics directly
            in your browser.
          </p>

          <div className="hero-btn-group">
            <a href="#studio" className="btn btn-primary" onClick={onExploreStudio}>
              <span>Enter 3D Studio</span>
              <ArrowRight size={18} />
            </a>
            <a href="#presets" className="btn btn-secondary">
              <Sparkles size={18} />
              <span>Explore Presets</span>
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <h4>60+</h4>
              <p>FPS Smooth Render</p>
            </div>
            <div className="stat-item">
              <h4>100%</h4>
              <p>Client GPU Accelerated</p>
            </div>
            <div className="stat-item">
              <h4>6+</h4>
              <p>Dynamic Geometries</p>
            </div>
          </div>
        </div>

        <div className="hero-preview-card glass-card" style={{ padding: 28, textAlign: 'center' }}>
          <div style={{
            width: '100%',
            height: 320,
            borderRadius: 16,
            background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.2) 0%, rgba(15, 23, 42, 0.8) 70%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed rgba(56, 189, 248, 0.3)',
            marginBottom: 20
          }}>
            <Orbit size={64} className="gradient-text-cyan" style={{ animation: 'spin 12s linear infinite', marginBottom: 16 }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: 6 }}>Interactive 3D Viewport</h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', maxWidth: 280 }}>
              Rotate, drag, zoom, and transform shaders live in the studio below.
            </p>
          </div>
          <a href="#studio" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            <Cpu size={16} />
            <span>Customize 3D Object Below</span>
          </a>
        </div>
      </div>
    </section>
  );
}

