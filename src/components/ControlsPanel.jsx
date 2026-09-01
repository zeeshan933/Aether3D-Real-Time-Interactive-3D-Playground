import React from 'react';
import { Sliders, Sparkles, Box, Palette, RefreshCw } from 'lucide-react';

const SHAPES = [
  { id: 'torusKnot', label: 'Torus Knot' },
  { id: 'icosahedron', label: 'Icosahedron' },
  { id: 'sphere', label: 'Sphere' },
  { id: 'torus', label: 'Torus' },
  { id: 'dodecahedron', label: 'Dodecahedron' },
  { id: 'octahedron', label: 'Octahedron' }
];

const MATERIALS = [
  { id: 'neon', label: 'Cyber Neon' },
  { id: 'glass', label: 'Glassmorphism' },
  { id: 'metal', label: 'Liquid Metal' },
  { id: 'hologram', label: 'Hologram' }
];

const COLORS = [
  { hex: '#06b6d4', name: 'Cyan Glow' },
  { hex: '#8b5cf6', name: 'Electric Purple' },
  { hex: '#ec4899', name: 'Neon Pink' },
  { hex: '#10b981', name: 'Matrix Emerald' },
  { hex: '#f59e0b', name: 'Solar Amber' },
  { hex: '#3b82f6', name: 'Cobalt Blue' },
  { hex: '#f43f5e', name: 'Crimson Wave' },
  { hex: '#ffffff', name: 'Pure White' }
];

export default function ControlsPanel({ config, setConfig, onReset }) {
  const updateConfig = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="glass-card control-panel">
      <div className="panel-header">
        <div className="panel-title">
          <Sliders size={20} className="gradient-text-cyan" />
          <span>3D Studio Studio HUD</span>
        </div>
        <button
          onClick={onReset}
          className="btn-icon btn-secondary"
          title="Reset to default settings"
          style={{ width: 32, height: 32 }}
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* Shape Selector */}
      <div className="control-group">
        <label className="control-label">
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Box size={14} /> Geometry Model
          </span>
        </label>
        <div className="pill-selector-3">
          {SHAPES.map(shape => (
            <button
              key={shape.id}
              className={`pill-btn ${config.shape === shape.id ? 'active' : ''}`}
              onClick={() => updateConfig('shape', shape.id)}
            >
              {shape.label}
            </button>
          ))}
        </div>
      </div>

      {/* Material Selector */}
      <div className="control-group">
        <label className="control-label">
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={14} /> Shader Material
          </span>
        </label>
        <div className="pill-selector">
          {MATERIALS.map(mat => (
            <button
              key={mat.id}
              className={`pill-btn ${config.material === mat.id ? 'active' : ''}`}
              onClick={() => updateConfig('material', mat.id)}
            >
              {mat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <div className="control-group">
        <label className="control-label">
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Palette size={14} /> Color Accent
          </span>
          <span className="val">{config.color}</span>
        </label>
        <div className="color-picker-grid">
          {COLORS.map(color => (
            <button
              key={color.hex}
              className={`color-swatch ${config.color.toLowerCase() === color.hex.toLowerCase() ? 'active' : ''}`}
              style={{ backgroundColor: color.hex, color: color.hex }}
              onClick={() => updateConfig('color', color.hex)}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Sliders: Speed & Roughness */}
      <div className="control-group">
        <div className="control-label">
          <span>Rotation Speed</span>
          <span className="val">{config.speed}x</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="3.0"
          step="0.1"
          value={config.speed}
          onChange={(e) => updateConfig('speed', parseFloat(e.target.value))}
          className="range-slider"
        />
      </div>

      <div className="control-group">
        <div className="control-label">
          <span>Surface Roughness</span>
          <span className="val">{Math.round(config.roughness * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.0"
          max="1.0"
          step="0.05"
          value={config.roughness}
          onChange={(e) => updateConfig('roughness', parseFloat(e.target.value))}
          className="range-slider"
        />
      </div>

      {/* Toggles */}
      <div className="toggle-row">
        <span style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 500 }}>Auto Rotate</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={config.autoRotate}
            onChange={(e) => updateConfig('autoRotate', e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="toggle-row">
        <span style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 500 }}>Wireframe Grid</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={config.wireframe}
            onChange={(e) => updateConfig('wireframe', e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}

