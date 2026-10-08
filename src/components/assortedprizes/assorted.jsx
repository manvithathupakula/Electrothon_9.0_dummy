"use client";

import React, { useState, useEffect, memo } from 'react';
import { Press_Start_2P } from 'next/font/google';
import { motion } from "framer-motion";
import TargetCursor from "@/components/TargetCursor";
import Link from 'next/link';
 import Image from 'next/image';
const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// --- DYNAMIC BACKGROUND COMPONENTS ---
const Bubble = memo(({ style, size = 8, delay = 0 }) => (
  <motion.div
    style={{ 
      ...style, 
      position: "absolute", 
      width: `${size}px`, 
      height: `${size}px`, 
      borderRadius: "50%", 
      background: "rgba(192, 38, 211, 0.2)", 
      border: "1px solid rgba(192, 38, 211, 0.4)",
      boxShadow: "0 0 10px rgba(192, 38, 211, 0.3)",
      willChange: "transform" 
    }}
    animate={{ 
      y: ["0vh", "-60vh"], 
      x: [0, 10, -10, 0], 
      opacity: [0, 0.6, 0] 
    }}
    transition={{ 
      duration: 6 + size / 2, 
      repeat: Infinity, 
      ease: "linear", 
      delay 
    }}
  />
));

const PRIZES = [
  { 
    id: 1, 
    category: "NAVAN AI", 
    title: "SKOOL COMMUNITY ACCESS", 
    points: "600 PRIZES", 
    logo: "/LOGOS/navanai.jpg"
  },
  { 
    id: 2, 
    category: "STOCKEDGE", 
    title: "MONTHLY PREMIUM ACCESS", 
    points: "1000 PRIZES" ,
    logo: "/LOGOS/stockedge.webp"
  },
  { 
    id: 3, 
    category: "STOCKEDGE", 
    title: "INVESTING MADE EASY COURSE", 
    points: "500 PRIZES",
    logo: "/LOGOS/stockedge.webp" 
  },
  { 
  id: 4, 
  category: "STOCKEDGE", 
  title: "STOCK MARKET ALL-IN-ONE", 
  points: "50 PRIZES" ,
  logo: "/LOGOS/stockedge.webp"
},
  { 
    id: 5, 
    category: "N8N", 
    title: "CLOUD PRO LICENSES", 
    points: "150 PRIZES" ,
    logo: "/LOGOS/n8n.png"
  },
  { 
    id: 6, 
    category: ".XYZ DOMAINS", 
    title: "FREE 1-YEAR DOMAIN", 
    points: "350 PRIZES" ,
    logo: "/LOGOS/xyzlogo.webp"
  },
  { 
    id: 7, 
    category: "CODECRAFTERS", 
    title: "VIP MEMBERSHIPS", 
    points: "3 PRIZES" ,
    logo: "/LOGOS/codecrafters.webp"
  },
  { 
    id: 8, 
    category: "INSFORGE", 
    title: "PRO PLATFORM ACCESS", 
    points: "250 TEAMS" ,
    logo: "/LOGOS/insforge.webp"
  },
  { 
    id: 9, 
    category: "INTERVIEW CAKE", 
    title: "FULL ACCESS LICENSES", 
    points: "50 PRIZES" ,
    logo: "/LOGOS/interviewcake.webp"
  }
];
export default function ArcadePrizePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className={`min-h-screen text-white overflow-hidden relative cursor-none p-4 md:p-8 ${pressStart.className}`}>
      <TargetCursor targetSelector=".cursor-target" />

      {/* --- DYNAMIC BACKGROUND --- */}
      <div className="fixed inset-0 -z-50 bg-[#090014] overflow-hidden">
        {/* Base Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020005] via-[#11001c] to-[#240046]" />
        
        {/* Animated Moving Grid */}
        <div 
          className="absolute bottom-0 left-[-50%] right-[-50%] h-[60vh] w-[200%] opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(transparent 96%, #c026d3 96%), linear-gradient(90deg, transparent 96%, #8b5cf6 96%)`,
            backgroundSize: '40px 40px',
            transform: 'perspective(500px) rotateX(60deg)',
            maskImage: 'linear-gradient(to bottom, transparent 5%, black 40%)'
          }}
        />

        {/* Mouse Glow Spotlight */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(192, 38, 211, 0.25), transparent 60%)` }}
        />

        {/* Side Neon Pillars */}
        <div className="absolute top-0 left-0 w-1 md:w-2 h-full bg-pink-500 blur-md opacity-30 shadow-[0_0_20px_#ec4899]" />
        <div className="absolute top-0 right-0 w-1 md:w-2 h-full bg-cyan-400 blur-md opacity-30 shadow-[0_0_20px_#22d3ee]" />

        {/* Rising Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <Bubble key={i} style={{ left: `${i * 7}%`, bottom: "0%" }} size={2 + Math.random() * 6} delay={Math.random() * 5} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .arcade-title-shadow {
          text-shadow: 4px 4px 0px #ff00ff, -2px -2px 0px #00ffff;
        }
        .panel-glow {
          box-shadow: 0 0 60px rgba(147, 51, 234, 0.25), inset 0 0 20px rgba(147, 51, 234, 0.1);
        }
      `}</style>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-5xl mx-auto py-12">
        
        {/* Main Dashboard Panel */}
        <div className="relative border-[4px] border-purple-600 rounded-[3rem] bg-[#12062b]/95 p-8 md:p-14 panel-glow backdrop-blur-md">
          
          {/* Header Section */}
          <div className="text-center mb-12 relative">
            <div className="flex justify-center items-center gap-6 mb-6">
               <span className="text-yellow-400 text-2xl animate-pulse">★</span>
               <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-black flex items-center justify-center text-[12px] text-black font-black shadow-[0_0_10px_#eab308]">🪙</div>
                  <div className="w-1 h-4 bg-purple-800 border border-black -mt-1" />
               </div>
               <span className="text-yellow-400 text-2xl animate-pulse">★</span>
            </div>
            <h2
            className="text-[clamp(1.6rem,5vw,3.75rem)] text-white drop-shadow-[0_4px_0_rgba(0,0,0,1)]"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
              ASSORTED PRIZES
          </h2>
           
            <p className="mt-4 text-[10px] md:text-[12px] tracking-[0.4em] uppercase font-bold text-purple-300 opacity-90">
              LEVEL UP & REDEEM YOUR REWARDS
            </p>
          </div>

          {/* 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRIZES.map((prize) => (
  <div 
    key={prize.id} 
    className="cursor-target group relative bg-[#1c0d3a]/80 border-2 border-purple-800/60 rounded-2xl p-5 hover:border-pink-500 transition-all hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:-translate-y-1 backdrop-blur-sm"
  >
    <p className="text-[7px] text-purple-400 mb-3 tracking-widest uppercase opacity-70">
      {prize.category}
    </p>
    
    {/* Logo Container */}
    <div className="aspect-video rounded-xl bg-black/40 border border-purple-500/20 mb-5 relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-transparent" />
      
      <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-110">
        {prize.logo ? (
          <Image
            src={prize.logo}
            alt={`${prize.category} logo`}
            fill
            className="object-contain filter drop-shadow-[0_0_8px_rgba(192,38,211,0.5)]"
            priority={prize.id <= 3}
          />
        ) : (
          /* Fallback if logo is missing */
          <div className="flex items-center justify-center h-full text-[8px] opacity-20">NO LOGO</div>
        )}
      </div>
    </div>
    
    <h3 className="text-[11px] text-white mb-2 uppercase italic leading-tight">
      {prize.title}
    </h3>
    
    <div className="flex items-center gap-2 mb-6">
      <div className="h-[3px] grow bg-purple-950 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
      </div>
      <p className="text-[9px] text-purple-300 uppercase whitespace-nowrap">
          {prize.points}
      </p>
    </div>
    
    <Link 
      href="https://electrothon-8.devfolio.co/prizes?partner=Assorted+Prizes" 
      target="_blank" 
      className="block w-full"
    >
      <button className="w-full py-3 rounded-lg text-[10px] font-black italic uppercase shadow-[0_4px_0_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-none transition-all bg-purple-600 hover:bg-purple-500 cursor-none">
        REDEEM NOW
      </button>
    </Link>
  </div>
))}
          </div>
        </div>
      </div>
    </main>
  );
}