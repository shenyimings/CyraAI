import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { gsap } from 'gsap';

const ParticleHeader = () => {
  const containerRef = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const renderer = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const windowHalfX = useRef(window.innerWidth / 2);
  const windowHalfY = useRef(window.innerHeight / 2);

  useEffect(() => {
    // 避免重复初始化
    if (renderer.current) {
      return;
    }

    // Check WebGL support
    if (!window.WebGLRenderingContext) {
      alert('Your browser doesn\'t support WebGL');
      return;
    }

    // Set up scene
    scene.current = new THREE.Scene();
    
    // Set up camera
    camera.current = new THREE.PerspectiveCamera(
      35, 
      window.innerWidth / window.innerHeight, 
      1, 
      2000
    );
    camera.current.position.z = 300;

    // Set up renderer
    renderer.current = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true // 添加抗锯齿效果
    });
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.setClearColor(0xfefefe, 0.0);
    renderer.current.setPixelRatio(window.devicePixelRatio); // 提高渲染质量
    
    // Add renderer to DOM
    if (containerRef.current) {
      // 确保容器为空
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(renderer.current.domElement);
    }

    // 创建圆形粒子贴图
    const textureLoader = new THREE.TextureLoader();
    const circleTexture = createCircleTexture();

    // 创建粒子材质 - 使用自定义圆形贴图
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x000000,
      size: 0.9, // 减小粒子尺寸
      transparent: true,
      opacity: 0.8,
      map: circleTexture,
      alphaTest: 0.1, // 防止透明度问题
      sizeAttenuation: true // 确保粒子大小会随距离变化
    });

    // 创建一个圆形粒子贴图
    function createCircleTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      
      const context = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 2 - 2;
      
      // 绘制渐变圆形
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      
      // 创建径向渐变
      const gradient = context.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      
      context.fillStyle = gradient;
      context.fill();
      
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    }

    // Load 3D model
    const manager = new THREE.LoadingManager();
    const loader = new OBJLoader(manager);
    
    loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/40480/head.obj', (object) => {
      // Create a BufferGeometry to store all vertices
      const particleGeometry = new THREE.BufferGeometry();
      const positions = [];
      
      // 粒子增强因子 - 每个顶点生成多个粒子
      const enhanceFactor = 2; // 增加粒子数量
      const jitterAmount = 0.15; // 抖动量 - 让粒子分布更自然
      
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const scale = 8.5;
          
          // Get vertices from the mesh's buffer geometry
          const positionAttribute = child.geometry.getAttribute('position');
          
          // Extract vertices and apply scale
          for (let i = 0; i < positionAttribute.count; i++) {
            const x = positionAttribute.getX(i) * scale;
            const y = positionAttribute.getY(i) * scale;
            const z = positionAttribute.getZ(i) * scale;
            
            // 为每个原始顶点创建多个附近的粒子
            for (let j = 0; j < enhanceFactor; j++) {
              // 添加一些随机偏移，使粒子分布更自然
              const jitterX = (Math.random() - 0.5) * jitterAmount;
              const jitterY = (Math.random() - 0.5) * jitterAmount;
              const jitterZ = (Math.random() - 0.5) * jitterAmount;
              
              positions.push(
                x + jitterX,
                y + jitterY,
                z + jitterZ
              );
            }
          }
        }
      });
      
      // Create buffer attribute for positions
      particleGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
      );
      
      // Create particles system
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.current.add(particles);
    });

    // Handle mouse movement
    const handleMouseMove = (event) => {
      mouseX.current = (event.clientX - windowHalfX.current) / 2;
      mouseY.current = (event.clientY - windowHalfY.current) / 2;
    };

    // Handle window resize
    const handleResize = () => {
      windowHalfX.current = window.innerWidth / 2;
      windowHalfY.current = window.innerHeight / 2;
      
      camera.current.aspect = window.innerWidth / window.innerHeight;
      camera.current.updateProjectionMatrix();
      
      renderer.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop using gsap ticker
    const render = () => {
      if (!renderer.current || !scene.current || !camera.current) return;

      camera.current.position.x += (-(mouseX.current * 0.08) - camera.current.position.x) * 0.02;
      camera.current.position.y += ((mouseY.current * 0.08) - camera.current.position.y) * 0.02;
      
      camera.current.lookAt(scene.current.position);
      renderer.current.render(scene.current, camera.current);
    };

    // Use gsap ticker for animation
    const ticker = gsap.ticker;
    ticker.add(render);
    
    // Initial render
    render();

    // Clean up
    return () => {
      ticker.remove(render);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && renderer.current && containerRef.current.contains(renderer.current.domElement)) {
        containerRef.current.removeChild(renderer.current.domElement);
      }
      
      // Dispose resources
      if (renderer.current) {
        renderer.current.dispose();
        renderer.current = null;
      }

      scene.current = null;
      camera.current = null;
    };
  }, []);

  return <div className="particlehead" ref={containerRef}></div>;
};

export default ParticleHeader;