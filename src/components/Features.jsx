import React from 'react';
import { Cpu, Eye, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';

const FEATURE_ITEMS = [
  {
    icon: <Cpu size={26} />,
    colorClass: 'cyan',
    title: 'Physical Based Rendering',
    description: 'PBR shading models with dynamic metalness, roughness, clearcoat, and real-time transmission optics.'
  },
  {
    icon: <Eye size={26} />,
    colorClass: 'purple',
    title: 'Intuitive Orbit & Parallax',
    description: 'Natural mouse drag rotation, zoom scroll, and pointer light-tracking for deep interactive immersion.'
  },
  {
    icon: <Sparkles size={26} />,
    colorClass: 'pink',
    title: 'Cosmic Particle Field',
    description: 'GPU-accelerated background star matrix with additive blending and autonomous spatial drift.'
  },
  {
    icon: <Activity size={26} />,
    colorClass: 'emerald',
    title: '60 FPS Performance',
    description: 'Optimized rendering loop with automatic RAF lifecycle management and smooth damping lerp interpolation.'
  },
  {
    icon: <ShieldCheck size={26} />,
    colorClass: 'cyan',
    title: 'Clean WebGL Lifecycle',
    description: 'Zero memory leaks with automated buffer, geometry, texture, and WebGL renderer context disposal.'
  },
  {
    icon: <Zap size={26} />,
    colorClass: 'purple',
    title: 'Instant Customization',
    description: 'Live tweaking of wireframe topology, geometric primitives, lighting palettes, and rotation physics.'
  }
];

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="section-title-wrap">
        <div className="section-badge">
          <Zap size={14} /> Core Capabilities
        </div>
        <h2 className="section-heading">
          Built for <span className="gradient-text">Speed & Fidelity</span>
        </h2>
        <p className="section-subheading">
          Discover the technology powering our high-performance 3D graphics pipeline.
        </p>
      </div>

      <div className="features-grid">
        {FEATURE_ITEMS.map((feat, index) => (
          <div key={index} className="glass-card feature-card">
            <div className={`feature-icon-wrapper ${feat.colorClass}`}>
              {feat.icon}
            </div>
            <h3 className="feature-title">{feat.title}</h3>
            <p className="feature-text">{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

