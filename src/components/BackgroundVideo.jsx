"use client";

import { useEffect, useRef, useState } from "react";
import poster from "@/assets/videos/poster.jpg";

export default function BackgroundVideo() {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay video loading to prioritize critical content
    const timer = setTimeout(() => setShouldLoad(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener('ended', handleVideoEnd);
    setTimeout(() => video.play().catch(() => {}), 100);

    return () => video.removeEventListener('ended', handleVideoEnd);
  }, [shouldLoad]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {shouldLoad ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          poster={poster}
          aria-hidden="true"
        >
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video>
      ) : (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/20 z-10" />
      <div className="relative z-20" />
    </div>
  );
}
