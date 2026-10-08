"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ThreeArcadeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mount = mountRef.current;
    if (!mount) return;

    /* =======================
       SCENE
    ======================= */
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.0, 7);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    /* =======================
       LIGHTS
    ======================= */
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(5, 5, 5);
    scene.add(dir);

    let model = null;
    let targetRotX = 0;
    let targetRotY = 0;

    /* =======================
       LOAD MODEL
    ======================= */
    const loader = new GLTFLoader();
    loader.load("/models/arcade-machine.glb", (gltf) => {
      model = gltf.scene;
      model.scale.set(0.07, 0.07, 0.07);
      model.rotation.y = Math.PI;

      // always visible; ScrollTrigger only moves it
      model.visible = false;

      // vertical centering
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const baseY = -size.y / 2;

      // x positions for About → Achievements
      const startX = 3.2;
      const endX = -3.2;

      model.position.set(startX, baseY, 0);
      scene.add(model);

      /* =======================
         SCROLL (ABOUT → ACHIEVEMENTS)
      ======================= */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-us",
          start: "top center",
          endTrigger: "#achievements",
          end: "bottom center",
          scrub: true,
          pin: "#three-arcade-wrapper",
          anticipatePin: 1,
          onEnter: () => { model.visible = true; },
          onEnterBack: () => { model.visible = true; },
          onLeave: () => {
            model.visible = true;
            model.position.x = endX; // keep it at final position
          },
          onLeaveBack: () => {
            model.visible = false;
            model.position.x = startX; // reset when going above About
          },
        },
      });

      tl.to(model.position, {
        x: endX,
        ease: "none",
      });
    });

    /* =======================
       MOUSE ROTATION
    ======================= */
    const onMouseMove = (e) => {
      const mx = (e.clientX / window.innerWidth) * 2 - 1;
      const my = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = mx * 0.15;
      targetRotX = my * 0.1;
    };
    window.addEventListener("mousemove", onMouseMove);

    /* =======================
       LOOP
    ======================= */
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y += (targetRotY - model.rotation.y) * 0.05;
        model.rotation.x += (targetRotX - model.rotation.x) * 0.05;
      }
      renderer.render(scene, camera);
    };
    animate();

    /* =======================
       RESIZE
    ======================= */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* =======================
       CLEANUP
    ======================= */
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
      scene.clear();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  /* =======================
     CANVAS CONTAINER
  ======================= */
  return (
  <div
    ref={mountRef}
    style={{
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,          // background
    }}
  />
);

}
