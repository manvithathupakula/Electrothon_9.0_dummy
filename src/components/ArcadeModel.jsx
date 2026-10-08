"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function ArcadeModel() {
  const mountRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 420 / 800, 0.1, 1000);
    camera.position.set(0.6, 1.4, 820);
    camera.lookAt(0, 1.1, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(420, 800);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.3));
    const key = new THREE.DirectionalLight(0xffffff, 2);
    key.position.set(4, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x88ffff, 1.2);
    rim.position.set(-5, 2, -4);
    scene.add(rim);

    let model;
    let targetX = 0;
    let targetY = 0;
    const baseRotationY = Math.PI + 2.9;

    new GLTFLoader().load("/models/arcade-machine.glb", (gltf) => {
      model = gltf.scene;
      model.scale.set(5.85, 5.85, 5.85);
      model.rotation.set(0, baseRotationY, 0);
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      model.position.set(0, -size.y / 2, 0);
      scene.add(model);
    });

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetY = x * 0.35;
      targetX = y * 0.25;
    };

    mount.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y += (baseRotationY + targetY * 0.3 - model.rotation.y) * 0.08;
        model.rotation.x += (targetX * 0.15 - model.rotation.x) * 0.08;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mount.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      scene.clear();
      mount.innerHTML = "";
    };
  }, [isVisible]);

  return (
    <div ref={mountRef} className="w-full h-full">
      {!isVisible && (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
          <div className="text-purple-400 animate-pulse">Loading 3D Model...</div>
        </div>
      )}
    </div>
  );
}
