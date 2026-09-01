import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export default function ThreeCanvas({ config, onReset }) {
  const mountRef = useRef(null);
  const [fps, setFps] = useState(60);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.2, y: 0.4 });
  const currentRotationRef = useRef({ x: 0.2, y: 0.4 });
  const zoomLevelRef = useRef(5);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = zoomLevelRef.current;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(config.color, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight2.position.set(-5, -5, 3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xa855f7, 3, 20);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    // 5. Starfield / Floating Background Particles
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 800;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 40;
      starPositions[i + 1] = (Math.random() - 0.5) * 40;
      starPositions[i + 2] = (Math.random() - 0.5) * 40;

      const c = new THREE.Color(
        i % 2 === 0 ? 0x06b6d4 : 0xa855f7
      );
      starColors[i] = c.r;
      starColors[i + 1] = c.g;
      starColors[i + 2] = c.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 6. Main 3D Mesh creation function
    const createGeometry = (shape) => {
      switch (shape) {
        case 'torusKnot':
          return new THREE.TorusKnotGeometry(1.4, 0.42, 128, 32, 2, 3);
        case 'icosahedron':
          return new THREE.IcosahedronGeometry(1.9, 1);
        case 'sphere':
          return new THREE.SphereGeometry(1.8, 64, 64);
        case 'torus':
          return new THREE.TorusGeometry(1.7, 0.55, 32, 100);
        case 'dodecahedron':
          return new THREE.DodecahedronGeometry(1.9, 0);
        case 'octahedron':
          return new THREE.OctahedronGeometry(2.0, 0);
        default:
          return new THREE.TorusKnotGeometry(1.4, 0.42, 128, 32, 2, 3);
      }
    };

    const createMaterial = (matType, colorHex, wireframe, roughness, metalness) => {
      const color = new THREE.Color(colorHex);
      switch (matType) {
        case 'glass':
          return new THREE.MeshPhysicalMaterial({
            color: color,
            metalness: 0.1,
            roughness: roughness * 0.3,
            transmission: 0.85,
            ior: 1.5,
            reflectivity: 0.7,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            wireframe: wireframe,
            transparent: true,
            opacity: 0.9
          });
        case 'metal':
          return new THREE.MeshStandardMaterial({
            color: color,
            metalness: Math.max(metalness, 0.85),
            roughness: Math.min(roughness, 0.25),
            wireframe: wireframe
          });
        case 'hologram':
          return new THREE.MeshPhongMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.4,
            shininess: 100,
            wireframe: wireframe,
            transparent: true,
            opacity: 0.8
          });
        case 'neon':
        default:
          return new THREE.MeshStandardMaterial({
            color: color,
            roughness: roughness,
            metalness: metalness,
            wireframe: wireframe,
            emissive: color,
            emissiveIntensity: 0.15
          });
      }
    };

    const geometry = createGeometry(config.shape);
    const material = createMaterial(
      config.material,
      config.color,
      config.wireframe,
      config.roughness,
      config.metalness
    );
    const mainMesh = new THREE.Mesh(geometry, material);
    scene.add(mainMesh);

    // Optional subtle outer wireframe shell for high-tech look
    const wireframeGeometry = geometry.clone();
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: config.wireframe ? 0 : 0.08
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMat);
    wireframeMesh.scale.set(1.02, 1.02, 1.02);
    mainMesh.add(wireframeMesh);

    // 7. Mouse and Touch Interaction Handlers
    const handlePointerDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0
      };
    };

    const handlePointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      if (isDraggingRef.current) {
        const deltaX = clientX - previousMousePositionRef.current.x;
        const deltaY = clientY - previousMousePositionRef.current.y;

        targetRotationRef.current.y += deltaX * 0.008;
        targetRotationRef.current.x += deltaY * 0.008;

        previousMousePositionRef.current = { x: clientX, y: clientY };
      } else {
        // Subtle mouse hover parallax
        const rect = currentMount.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -((clientY - rect.top) / rect.height) * 2 + 1;
        pointLight.position.x = normX * 3;
        pointLight.position.y = normY * 3;
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      zoomLevelRef.current += e.deltaY * 0.003;
      zoomLevelRef.current = Math.max(3.2, Math.min(8.5, zoomLevelRef.current));
      camera.position.z = zoomLevelRef.current;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop & FPS calculation
    let animationFrameId;
    let lastTime = performance.now();
    let frameCounter = 0;
    let fpsTimer = performance.now();

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate);

      frameCounter++;
      if (currentTime - fpsTimer >= 1000) {
        setFps(frameCounter);
        frameCounter = 0;
        fpsTimer = currentTime;
      }

      // Auto rotation
      if (config.autoRotate && !isDraggingRef.current) {
        targetRotationRef.current.y += 0.008 * config.speed;
        targetRotationRef.current.x += 0.004 * config.speed;
      }

      // Smooth interpolation (damping / lerp)
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      mainMesh.rotation.x = currentRotationRef.current.x;
      mainMesh.rotation.y = currentRotationRef.current.y;

      // Particle background slow rotation
      starField.rotation.y += 0.0006;
      starField.rotation.x += 0.0003;

      renderer.render(scene, camera);
    };

    animate(performance.now());

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      domElement.removeEventListener('wheel', handleWheel);

      geometry.dispose();
      material.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMat.dispose();
      renderer.dispose();

      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [config]);

  // Zoom control helpers
  const handleZoom = (direction) => {
    zoomLevelRef.current += direction * 0.8;
    zoomLevelRef.current = Math.max(3.2, Math.min(8.5, zoomLevelRef.current));
  };

  const handleResetCamera = () => {
    targetRotationRef.current = { x: 0.2, y: 0.4 };
    currentRotationRef.current = { x: 0.2, y: 0.4 };
    zoomLevelRef.current = 5;
    if (onReset) onReset();
  };

  return (
    <div className="canvas-wrapper">
      {/* 3D HUD Header */}
      <div className="hud-overlay">
        <div className="hud-badge">
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }}></span>
          WebGL 2.0 • {fps} FPS
        </div>
        <div className="hud-badge">
          {config.shape.toUpperCase()} • {config.material.toUpperCase()}
        </div>
      </div>

      {/* 3D Viewport container */}
      <div ref={mountRef} className="canvas-viewport" />

      {/* HUD Action Controls */}
      <div className="hud-actions">
        <button className="hud-btn" onClick={() => handleZoom(-1)} title="Zoom In">
          <ZoomIn size={16} />
        </button>
        <button className="hud-btn" onClick={() => handleZoom(1)} title="Zoom Out">
          <ZoomOut size={16} />
        </button>
        <button className="hud-btn" onClick={handleResetCamera} title="Reset View">
          <RotateCw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}

