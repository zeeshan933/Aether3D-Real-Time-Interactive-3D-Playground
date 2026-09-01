import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThreeCanvas from './components/ThreeCanvas';
import ControlsPanel from './components/ControlsPanel';
import Features from './components/Features';
import Showcase from './components/Showcase';
import Footer from './components/Footer';
import { Layers, Sparkles, Orbit, MousePointer, ShieldCheck } from 'lucide-react';

const DEFAULT_CONFIG = {
  shape: 'torusKnot',
  material: 'neon',
  color: '#06b6d4',
  speed: 1.0,
  roughness: 0.3,
  metalness: 0.7,
  autoRotate: true,
  wireframe: false
};

export default function App() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const handleSelectPreset = (newConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero onExploreStudio={() => {}} />

        {/* 3D Interactive Studio Section */}
        <section id="studio" className="section">
          <div className="section-title-wrap">
            <div className="section-badge">
              <Orbit size={14} /> Interactive 3D Canvas
            </div>
            <h2 className="section-heading">
              Real-Time <span className="gradient-text">3D Playground</span>
            </h2>
            <p className="section-subheading">
              Interact directly with the viewport below. Drag to orbit, scroll to zoom, and tweak geometry & shaders in real time.
            </p>
          </div>

          <div className="studio-grid">
            {/* Left: Interactive 3D Viewport */}
            <ThreeCanvas config={config} onReset={handleReset} />

            {/* Right: Real-time Controls HUD */}
            <ControlsPanel
              config={config}
              setConfig={setConfig}
              onReset={handleReset}
            />
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Curated Presets Showcase */}
        <Showcase onSelectPreset={handleSelectPreset} />

        {/* Call-to-Action Section */}
        <section className="section" style={{ paddingTop: 20 }}>
          <div className="cta-box">
            <h2 className="cta-title">
              Ready to create your next <br />
              <span className="gradient-text">3D Web Experience?</span>
            </h2>
            <p className="cta-desc">
              Harness the full power of WebGL and React to create immersive visual applications that run at a silky smooth 60 FPS.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#studio" className="btn btn-primary">
                <Sparkles size={18} />
                <span>Customize in Studio</span>
              </a>
              <a href="#hero" className="btn btn-secondary">
                <Layers size={18} />
                <span>Back to Top</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

