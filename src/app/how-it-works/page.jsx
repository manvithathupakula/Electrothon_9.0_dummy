"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import specLogo from '@/assets/images/spec-logo.png'; 
import TargetCursor from "@/components/TargetCursor";
import { Press_Start_2P } from 'next/font/google';
import gridBg from '@/assets/images/gridbg.webp';

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function HowItWorks() {
  return (
    <>
      <TargetCursor targetSelector=".cursor-target" />
      <div 
        className={`relative min-h-screen w-full overflow-x-hidden bg-[#0f0720] text-gray-200 ${pressStart2P.className}`}
      >
        
        {/* Background Layer */}
        <div className="fixed inset-0 z-0">
          <Image
            src={gridBg}
            alt="Purple Grid Background"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-[#0f0720]/70 to-[#0f0720]" />
        </div>

        {/* Top Left Logo */}
        <div className="fixed top-6 left-6 z-50">
          <Link href="/">
            <div className="relative w-24 h-24 md:w-32 md:h-32 cursor-pointer hover:scale-105 transition-transform">
              <Image
                src={specLogo}
                alt="SPEC Logo"
                fill
                className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              />
            </div>
          </Link>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 py-24 max-w-4xl">
          
          {/* Header Section */}
          <div className="flex flex-col items-center mb-16 text-center">
             
             {/* Heading updated to be all white */}
             <h1 className="text-xl md:text-3xl text-white drop-shadow-[0_0_8px_rgba(192,132,252,0.6)] uppercase tracking-tight">
               How will Electrothon work?
             </h1>
          </div>

          {/* Main Card */}
          <div className="bg-[#1a0b2e]/60 p-8 md:p-12 rounded-3xl border border-purple-500/20 backdrop-blur-md shadow-2xl">
            <div className="space-y-8 flex flex-col items-center">
              
              {/* Single Paragraph Content */}
              <p className="leading-[2.5] text-[10px] md:text-xs text-gray-300 text-center max-w-2xl">
                We know where you all are located and surely realize your desperation to indulge in innovation. 
                Working day and night to make your vision a reality, we are organizing everything <span className="text-white underline decoration-purple-500 underline-offset-8">in-person</span> this 
                Electrothon 8.0. We&apos;re available 24/7 on our <Link href="https://discord.com/invite/MCPUUrwK8p" className="text-white hover:text-purple-300 underline underline-offset-4">Discord</Link> server, 
                where you can Communicate, Collaborate, and Connect to like-minded individuals. With great powers 
                comes even greater responsibilities, so we request you to avoid any profanity and adhere to the 
                Code of Conduct. You&apos;ll find all the information you need for Electrothon on Discord: 
                talk/workshop links, live schedule, and announcements of all our events.
              </p>

              {/* Retro visual separator */}
              <div className="w-1/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mt-8" />
            </div>
          </div> {/* Close Main Card */}

        </div> {/* Close Container */}
      </div> {/* Close Main Div */}
    </>
  );
}
