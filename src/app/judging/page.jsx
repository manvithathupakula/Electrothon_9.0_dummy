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

export default function JudgingCriteria() {
  const criteria = [
    {
      title: "Originality",
      icon: "💡",
      questions: ["Has this project been done before?", "How creative is the solution?"],
      color: "text-blue-400"
    },
    {
      title: "Adhere to Theme",
      icon: "🎯",
      questions: ["Does it match the event theme?", "Full vs Partial implementation?"],
      color: "text-red-400"
    },
    {
      title: "Completion",
      icon: "✅",
      questions: ["Does the hack work?", "Were all goals achieved?"],
      color: "text-green-400"
    },
    {
      title: "Learning",
      icon: "🧠",
      questions: ["Did the team learn something new?", "Previous project complexity?"],
      color: "text-yellow-400"
    },
    {
      title: "Design",
      icon: "🎨",
      questions: ["Thoughtful User Experience?", "Interface quality & polish."],
      color: "text-pink-400"
    },
    {
      title: "Technology",
      icon: "🚀",
      questions: ["Technical 'Wow' factor?", "Difficulty of the problem tackled."],
      color: "text-purple-400"
    }
  ];

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
              <Image src={specLogo} alt="SPEC Logo" fill className="object-contain" />
            </div>
          </Link>
        </div>

       

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-24 max-w-5xl">
          
          <div className="text-center mb-16">
             <div className="text-4xl md:text-5xl mb-6">👩🏻‍⚖️</div>
             <h1 className="text-xl md:text-3xl text-white drop-shadow-[0_0_8px_rgba(192,132,252,0.6)] uppercase">
               Judging Criteria
             </h1>
             <p className="mt-4 text-[9px] md:text-[10px] text-white">
               "Evaluation scares everyone... or does it?"
             </p>
          </div>

          {/* Criteria Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {criteria.map((item, index) => (
              <div key={index} className="bg-[#1a0b2e]/60 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-400/50 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <h3 className={`text-[10px] md:text-xs uppercase ${item.color}`}>{item.title}</h3>
                </div>
                <ul className="space-y-3">
                  {item.questions.map((q, i) => (
                    <li key={i} className="text-[9px] md:text-[10px] text-gray-400 flex gap-2">
                      <span className="text-purple-500">›</span> {q}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Final Logic/Notes */}
          <div className="mt-12 space-y-6">
            <div className="bg-black/40 p-6 rounded-xl border-l-4 border-yellow-500">
               <p className="text-[10px] md:text-xs text-gray-300 leading-loose">
                 <span className="text-yellow-500 font-bold">PRO TIP:</span> Aim for a <strong className="text-white">Product</strong> over just a project. Points are awarded based on the final progress recorded at the end of Electrothon 8.0.
               </p>
            </div>

            <div className="text-center opacity-40">
               <p className="text-[8px] tracking-[0.3em] uppercase">Status: Awaiting_Evaluation 8.0</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}