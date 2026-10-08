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

export default function SubmissionGuide() {
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

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 py-24 max-w-4xl">
          
          <div className="flex flex-col items-center mb-12 text-center">
             <div className="mb-6 inline-block p-4 rounded-full bg-purple-500/10 border border-purple-500/20">
                <span className="text-4xl md:text-5xl">📩</span>
             </div>
             <h1 className="text-xl md:text-3xl text-white drop-shadow-[0_0_8px_rgba(192,132,252,0.6)] uppercase">
               Project Submission
             </h1>
          </div>

          <div className="space-y-8">
            
            {/* Deadline Banner */}
            <div className="bg-red-900/20 border border-red-500/40 p-6 rounded-xl text-center shadow-[0_0_15px_rgba(239,68,68,0.1)]">
              <p className="text-[11px] text-red-400 leading-relaxed">
                ⏳ DEADLINE: All projects MUST be submitted on Devfolio by <br className="hidden md:block"/>
                <span className="text-white font-bold">18:00:00 IST on March 15, 2026</span>
              </p>
            </div>

            {/* Main Requirements Card */}
            <div className="bg-[#1a0b2e]/60 p-6 md:p-10 rounded-3xl border border-purple-500/20 backdrop-blur-md">
              <div className="space-y-8">
                
                {/* GitHub Section */}
                <section>
                 
                  <p className="text-[12px] text-gray-300 leading-loose">
                   1. We would love to dive into your code and algorithms. So do remember to submit a link to a public GitHub repo created during the dates of March 13 and March 15, 2026 during both the rounds of evaluations.
                   <br />
                   <br />
                   <br />
2. What’s better! Submit the videos demonstrating your project according to the details of the judging criteria.
<br />
<br />
<br />

3. Finally, remember to select the appropriate tracks, challenges, and prizes your project is competing for.
<br />
<br />
<br />

In case you are submitting a project that has been previously made, make sure that you substantially update the project . However, if you do so, make sure that you specify clearly in your project description or in the GitHub README file, that there is an update on the previous submission. Mention the updates you have worked on during the hours of the hackathon. The same must also be communicated in your demo videos. If you fail to do so while submitting your previous work, it will not be accepted as a valid submission.
                  </p>
                </section>

                {/* Video Section */}
               <section className="bg-black/40 p-6 rounded-2xl border border-white/5">
  {/* Header with Pixel Icon */}
  <h2 className="text-[11px] text-green-400 mb-6 uppercase flex items-center gap-3 tracking-widest">
    <span className="text-white">📹</span> Demonstration Videos
  </h2>

  {/* TL;DR Alert Box */}
  <div className="mb-8 p-4 bg-green-500/5 border-l-2 border-green-500/50">
    <p className="text-[11px] text-green-300 leading-relaxed">
      <span className="font-bold">TL;DR:</span> Keep it concise and informative! Your videos must be created during the weekend of the hackathon.
    </p>
  </div>

  {/* Evaluation Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <div className="space-y-3 bg-[#1a0b2e]/40 p-4 rounded-xl border border-purple-500/10">
      <p className="text-[11px] text-purple-400 uppercase tracking-tighter">Mid Evaluation</p>
      <p className="text-[11px] text-gray-400 leading-relaxed">
        Submit a <span className="text-white">2-3 minute</span> video of your hack via the shared Google Form link.
      </p>
    </div>

    <div className="space-y-3 bg-[#1a0b2e]/40 p-4 rounded-xl border border-purple-500/10">
      <p className="text-[11px] text-purple-400 uppercase tracking-tighter">Final Evaluation</p>
      <p className="text-[11px] text-gray-400 leading-relaxed">
        A detailed <span className="text-white">4-5 minute</span> project video is required for final scoring.
      </p>
    </div>
  </div>

  {/* Technical Requirements List */}
  <div className="space-y-4 pt-4 border-t border-white/5">
    <div className="flex items-start gap-3">
      <span className="text-purple-500 mt-1">◆</span>
      <p className="text-[11px] text-gray-300 leading-loose">
        Videos should clearly indicate the <span className="text-white">problem statement</span> and an explanation of the working solution.
      </p>
    </div>
    <div className="flex items-start gap-3">
      <span className="text-purple-500 mt-1">◆</span>
      <p className="text-[11px] text-gray-300 leading-loose">
        Upload to YouTube, Google Drive, or Vimeo and ensure the <span className="text-white">sharing link</span> is public.
      </p>
    </div>
  </div>

  {/* Bottom Status Note */}
  <p className="mt-6 text-[11px] text-white text-center opacity-50">
    * Time is crucial. Please strictly adhere to the constraints.
  </p>
</section>

                {/* Themes Section */}
                <section>
                  <h2 className="text-[11px] text-[#fbbf24] mb-6 text-center uppercase tracking-widest">🎯 Select Your Theme</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
  {[
    "Travel & Tourism",
    "Climate Emergency",
    "Healthcare",
    "Cybersecurity & Blockchain",
    "EdTech",
    "Open Innovation",
    "AI & Agentic Systems",
  ].map((theme, index) => (
    <div
      key={theme}
      className={`
        border border-purple-500/20 bg-purple-500/5 
        rounded text-center text-[10px] sm:text-[11px] text-gray-300 
        hover:bg-purple-500/20 transition-all cursor-default
        p-2 sm:p-3 md:p-4
        ${index === 6 ? "sm:col-span-2 md:col-span-1 lg:col-span-2" : ""}
      `}
    >
      {theme}
    </div>
  ))}
</div>
                </section>

              </div>
            </div>

            {/* Important Note */}
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
               <p className="text-[11px] text-gray-400 leading-loose">
                 <span className="text-yellow-500">⚠ ATTENTION:</span>Make sure you clearly indicate what theme you are submitting to. 
               </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}