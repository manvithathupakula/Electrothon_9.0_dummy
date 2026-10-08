"use client";

import { useState, useEffect } from "react";
import TetrisLoading from "@/components/tetris-loader";

export default function Preloader({ children }) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const getAllAssets = async () => {
      // 1. Get all <img> tags
      const imgElements = Array.from(document.querySelectorAll("img"));
      
      // 2. Scan for CSS Background Images
      const allElements = document.querySelectorAll("*");
      const bgImages = Array.from(allElements)
      .map(el => getComputedStyle(el).backgroundImage)
      .filter(bg => bg !== "none" && bg.includes("url"))
      .map(bg => bg.match(/url\(["']?([^"']+)["']?\)/)) // Get the match array
      .filter(match => match !== null)                 // Only keep successful matches
      .map(match => match[1]);

      // 3. Combine and Deduplicate
      const allAssetUrls = [...new Set([...imgElements.map(img => img.src), ...bgImages])];

      // 4. Create Promises for all assets
      const assetPromises = allAssetUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => img.decode().then(resolve).catch(resolve);
          img.onerror = resolve; // Don't hang if an asset is missing
        });
      });

      // 5. Wait for Fonts (Crucial for Electrothon's tech vibe)
      const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();

      await Promise.all([...assetPromises, fontPromise]);
    };

    const startTransition = async () => {
      await Promise.all([
        getAllAssets(),
        new Promise((resolve) => setTimeout(resolve, 3500)) // Minimum vibe time
      ]);

      setFadeOut(true);
      setTimeout(() => setLoading(false), 800);
    };

    startTransition();
  }, []);

  return (
    <>
      {loading && (
        <div 
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black dark transition-all duration-700 ease-in-out ${
            fadeOut ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"
          }`}
          style={{ willChange: "opacity, transform" }}
        >
          <div className="scale-110 md:scale-125">
            <TetrisLoading size="sm" speed="fast" showLoadingText={false} />
          </div>
          
          <p className="mt-12 text-white font-mono text-xs tracking-[0.5em] animate-pulse">
            BOOTING ELECTROTHON 8.0...
          </p>
        </div>
      )}

      {/* Website wrapper: Hidden but rendering in the background */}
      <div className={`transition-opacity duration-1000 ease-out ${
        fadeOut ? "opacity-100" : "opacity-0 invisible"
      }`}>
        {children}
      </div>
    </>
  );
}