"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function Cards({ data, index }) {
  const cardRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.7))
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = 1 - index * 0.035 + scrollProgress * 0.025;
    const yOffset = index * 18 - scrollProgress * 18;
    const stackRotation = (index % 2 === 0 ? -1 : 1) * 4.5;
    const scrollRotation = (1 - scrollProgress) * (index % 2 === 0 ? -4 : 4);

    const rotation = stackRotation + scrollRotation;


  return (
    <div
      ref={cardRef}
      className="
        sticky
        top-[26vh] sm:top-[28vh] md:top-[30vh]
        w-full flex justify-center
        px-3 sm:px-0
      "
      style={{
        transform: `translateY(${yOffset}px)`,
        zIndex: index + 1,
      }}
    >
      <div
        className="
          w-[80vw] sm:w-[88vw] md:w-[74vw] lg:w-[56vw]
          max-w-lg
          rounded-2xl
          p-4 sm:p-5 md:p-6
          bg-white border border-gray-200 shadow-xl
        "
        style={{
          transform: `scale(${scale}) rotate(${rotation}deg)`,
       clipPath: "inset(0 0 0 0)"  }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={data.profilepic}
            alt={data.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{data.name}</p>
            <p className="text-xs text-gray-600">{data.date} ago</p>
          </div>
          <div className="text-xl font-bold">𝕏</div>
        </div>

        <p className="text-gray-800 text-sm leading-relaxed mb-3">
          {data.content}
        </p>

        {data.postpic && (
          <div className="rounded-lg overflow-hidden">
            <Image
              src={data.postpic}
              alt={`${data.name} post`}
              width={800}
              height={450}
              className="w-full object-cover max-h-[260px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
