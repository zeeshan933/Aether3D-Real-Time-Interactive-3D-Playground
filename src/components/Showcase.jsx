import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

const PRESETS = [
  {
    name: 'Cyberpunk Knot',
    desc: 'Holographic torus knot with neon cyan emissive wireframe grid.',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    config: {
      shape: 'torusKnot',
      material: 'hologram',
      color: '#06b6d4',
      speed: 1.5,
      roughness: 0.2,
      metalness: 0.8,
      autoRotate: true,
      wireframe: true
    }
  },
  {
    name: 'Liquid Amethyst',
    desc: 'Deep purple glassmorphic icosahedron with high clearcoat index.',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    config: {
      shape: 'icosahedron',
      material: 'glass',
      color: '#8b5cf6',
      speed: 0.8,
      roughness: 0.15,
      metalness: 0.1,
      autoRotate: true,
      wireframe: false
    }
  },
  {
    name: 'Solar Obsidian',
    desc: 'Liquid gold reflective dodecahedron with hyper metallic finish.',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    config: {
      shape: 'dodecahedron',
      material: 'metal',
      color: '#f59e0b',
      speed: 1.2,
      roughness: 0.1,
      metalness: 0.95,
      autoRotate: true,
      wireframe: false
    }
  },
  {
    name: 'Quantum Prism',
    desc: 'Prismatic pink octahedron with dual-layer wireframe topology.',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
    config: {
      shape: 'octahedron',
      material: 'glass',
      color: '#ec4899',
      speed: 2.0,
      roughness: 0.05,
      metalness: 0.2,
      autoRotate: true,
      wireframe: true
    }
  }
];

export default function Showcase({ onSelectPreset }) {
  const handlePresetClick = (presetConfig) => {
    onSelectPreset(presetConfig);
    const studioEl = document.getElementById('studio');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="presets" className="section">
      <div className="section-title-wrap">
        <div className="section-badge">
          <Sparkles size={14} /> Curated Styles
        </div>
        <h2 className="section-heading">
          Explore <span className="gradient-text">Design Presets</span>
        </h2>
        <p className="section-subheading">
          Click on any curated preset to instantly morph the 3D model in the studio.
        </p>
      </div>

      <div className="presets-grid">
        {PRESETS.map((preset, index) => (
          <div
            key={index}
            className="preset-card"
            onClick={() => handlePresetClick(preset.config)}
          >
            <div
              className="preset-preview-sphere"
              style={{
                background: preset.gradient,
                boxShadow: `0 8px 24px ${preset.color}55`
              }}
            />
            <h3 className="preset-title">{preset.name}</h3>
            <p className="preset-desc">{preset.desc}</p>
            <span className="preset-apply-btn">
              <span>Apply Preset</span>
              <ArrowUpRight size={14} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

