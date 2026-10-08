"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RunOfShowMaze() {
  const containerRef = useRef(null);
  const [activeDay, setActiveDay] = useState("day1");
  const [mazeHeight, setMazeHeight] = useState(1100);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsiveness via ResizeObserver or window width
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const schedule = {
 day1: [
  { date: "10:00 AM - 2:00 PM", title: "Attendee Check-In", venue: "Auditorium" },
  { date: "2:00 PM", title: "Inauguration/Opening Ceremony", venue: "Auditorium" },
  { date: "2:20 PM", title: "Organisations introduction", venue: "Auditorium" },
  { date: "3:00 PM", title: "Mini events introduction", venue: "Auditorium" },
  { date: "4:00 PM", title: "Hacking Begins", venue: "Public" },
  { date: "4:30 PM to 6:30 PM", title: "Hacking Phase 1", venue: "Mini Auditorium/ New Lecture Hall" },
  { date: "6:30 PM to 7:00 PM", title: "IQAI Online Workshop", venue: "NEW Lecture Hall" },
  { date: "7:00 PM to 8:00 PM", title: "Panel Discussion", venue: "Mini Auditorium" },
  { date: "8:00 PM", title: "Dinner", venue: "Mess" }
],
   day2: [
  { date: "8:00 AM to 9:00 AM", title: "Breakfast", venue: "Mess" },
  { date: "9:00 AM to 11:00 AM", title: "Hacking Phase-1 Begins", venue: "NEW Lecture Hall" },
  { date: "10:00 AM to 11:00 AM", title: "Mentors shift 1 - active", venue: "NEW Lecture Hall" },
  { date: "11:00 AM to 12:30 AM", title: "MLH + Github workshop", venue: "Mini Auditorium/Seminar Room" },
  { date: "12:30 PM to 2:00 PM", title: "Lunch", venue: "Mess" },
  { date: "2:00 PM to 3:30 PM", title: "Hacking Phase-2 Begins + Bingo single multiday", venue: "NEW Lecture Hall" },
  { date: "2:00 PM to 3:30 PM", title: "Mentors shift 2 - active", venue: "NEW Lecture Hall" },
  { date: "3:30 PM to 6:30 PM", title: "Evaluation 1", venue: "NEW Lecture Hall" },
  { date: "7:00 PM to 8:00 PM", title: "Eshaan Speaker Session", venue: "Mini Auditorium" },
  { date: "8:00 PM onwards", title: "Dinner", venue: "Mess" },
  { date: "10:00 PM to 11:00 PM", title: "Mentors shift 3 - active (ONLINE)", venue: "NEW Lecture Hall" },
  { date: "11:00 PM to 12:00 PM", title: "Fun Event (Smash Kartz Game Competition)", venue: "Stay (Hostels)" }
],
    day3: [
  { date: "8:00 AM", title: "Breakfast", venue: "Mess" },
  { date: "9:00 AM to 10:00 AM", title: "Hacking Phase-3 Begins", venue: "NEW Lecture Hall" },
  { date: "10:00 AM", title: "Soft Submission Deadline", venue: "NEW Lecture Hall" },
  { date: "11:00 AM", title: "Hard Submission Deadline", venue: "NEW Lecture Hall" },
  { date: "11:00 AM to 12:30 PM", title: "Evaluation 2 + Pictionary", venue: "NEW Lecture Hall" },
  { date: "12:30 PM", title: "Lunch", venue: "Mess" },
  { date: "1:30 PM - 3:00 PM", title: "Evaluation 2 + Pictionary", venue: "NEW Lecture Hall" },
  { date: "3:00 PM", title: "Preparation for closing ceremony", venue: "Auditorium" },
  { date: "4:00 PM", title: "Closing Ceremony", venue: "Auditorium" },
  { date: "4:30 PM", title: "Compilation of Result", venue: "Auditorium" },
  { date: "5:00 PM", title: "Result Announcement", venue: "Auditorium" },
  { date: "7:30 PM", title: "HACKING ENDS + Dinner", venue: "Mess" }
],
  };

  // Responsive values
  const TOP_PADDING = isMobile ? 80 : 100;
  const BOTTOM_PADDING = isMobile ? 150 : 250;
  const ITEM_SPACING = isMobile ? 220 : 160; // Increased spacing for mobile to avoid overlap
  const OFFSET_X = isMobile ? 30 : 50; 

  useEffect(() => {
    const numItems = schedule[activeDay].length;
    const requiredHeight = TOP_PADDING + BOTTOM_PADDING + (numItems - 1) * ITEM_SPACING;
    setMazeHeight(Math.max(1100, requiredHeight));
  }, [activeDay, isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const generateDottedPath = () => {
    const numItems = schedule[activeDay].length;
    let path = `M 100 0`;
    for (let i = 0; i < numItems; i++) {
      const yPos = TOP_PADDING + i * ITEM_SPACING;
      const xTarget = i % 2 === 0 ? (100 + OFFSET_X) : (100 - OFFSET_X);
      path += ` V ${yPos - 20} H ${xTarget} V ${yPos + 20} H 100`;
    }
    path += ` V ${mazeHeight}`;
    return path;
  };

  const generateSyncPoints = () => {
    const numItems = schedule[activeDay].length;
    const scrollPoints = [0];
    const xPoints = [0];
    const yPoints = [0];

    schedule[activeDay].forEach((_, i) => {
      const segmentStart = i / numItems;
      const segmentEnd = (i + 1) / numItems;
      const t1 = segmentStart + (segmentEnd - segmentStart) * 0.2;
      const t2 = segmentStart + (segmentEnd - segmentStart) * 0.5;
      const t3 = segmentStart + (segmentEnd - segmentStart) * 0.8;

      const yPos = TOP_PADDING + i * ITEM_SPACING;
      const xTarget = i % 2 === 0 ? OFFSET_X : -OFFSET_X;

      scrollPoints.push(t1, t2, t3, segmentEnd);
      xPoints.push(0, xTarget, xTarget, 0);
      yPoints.push(yPos - 20, yPos - 20, yPos + 20, yPos + 20);
    });
    return { scrollPoints, xPoints, yPoints };
  };

  const { scrollPoints, xPoints, yPoints } = generateSyncPoints();
  const pacmanX = useTransform(scrollYProgress, scrollPoints, xPoints);
  const pacmanY = useTransform(scrollYProgress, scrollPoints, yPoints);
  const pacmanRotate = useTransform(pacmanX, (x) => (x > 5 ? 0 : x < -5 ? 180 : 90));

  return (
    <section
      ref={containerRef}
      className={`relative bg-[#0c0012] pb-20 text-white ${pressStart.className}`}
      style={{ minHeight: `${mazeHeight + 300}px` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_80%)] pointer-events-none" />

      {/* Header - Made Responsive */}
      <div className="relative top-0 z-[999] flex flex-col items-center gap-6 pt-10 pb-6 w-full bg-[#0c0012]/80 backdrop-blur-sm px-4">
        <h1 className="text-[clamp(1.4rem,6vw,3.75rem)] text-center text-white">RUN OF SHOW</h1>
        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          {["day1", "day2", "day3"].map((day, index) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 md:px-6 py-2 md:py-3 border-2 rounded-md text-[10px] md:text-xs uppercase tracking-widest transition-all ${
                activeDay === day
                  ? "border-purple-400 bg-purple-900/80 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                  : "border-purple-800 text-white hover:border-purple-500 hover:bg-purple-900/30"
              }`}
            >
              DAY {index + 1}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        animate={{ height: mazeHeight }}
        className="relative z-10 w-[95%] max-w-5xl mx-auto mt-12 bg-[#0f0019] border-4 border-black rounded-[1.5rem] md:rounded-[2rem] shadow-[0_0_60px_rgba(168,85,247,0.4),inset_0_0_30px_rgba(168,85,247,0.3)] overflow-hidden"
      >
        {/* RESTORED: Original Maze Background Lines Pattern */}
        <div className="absolute inset-0 opacity-40 md:opacity-50 pointer-events-none" 
             style={{ 
               backgroundSize: isMobile ? '100% 200px' : '100% 300px', 
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%239333ea' stroke-width='4' fill='none'%3E%3Cpath d='M50 50 H1150 M50 150 H350 M450 150 H750 M850 150 H1150 M50 250 H1150 M50 50 V250 M150 50 V150 M350 150 V250 M450 50 V150 M750 150 V250 M850 50 V150 M1150 50 V250'/%3E%3C/g%3E%3C/svg%3E")` 
             }} 
        />

        {/* Dotted Path */}
        <svg className="absolute left-1/2 top-0 -translate-x-1/2 opacity-80 z-0" width="200" height={mazeHeight} viewBox={`0 0 200 ${mazeHeight}`}>
          <path d={generateDottedPath()} stroke="#d8b4fe" strokeWidth="5" strokeDasharray="12 12" fill="none" />
        </svg>

        {/* Pacman */}
        <motion.div
          style={{ y: pacmanY, x: pacmanX, rotate: pacmanRotate, translateX: "-50%" }}
          className="absolute left-1/2 top-0 text-3xl md:text-5xl z-50 mt-[-0.75rem] md:mt-[-1rem] flex items-center justify-center pointer-events-none"
        >
          <motion.div animate={{ scaleX: [1, 0.6, 1] }} transition={{ repeat: Infinity, duration: 0.2 }} className="text-purple-500 drop-shadow-[0_0_20px_rgba(168,85,247,1)]">
            ᗧ
          </motion.div>
        </motion.div>

        {/* Events Rendering */}
        <AnimatePresence mode="wait">
          <motion.div key={activeDay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10">
            {schedule[activeDay].map((event, index) => (
              <div
                key={index}
                className="absolute w-[140px] md:w-[280px] p-3 md:p-6 border-2 border-purple-500 bg-[#140024]/90 rounded-lg shadow-[0_0_25px_rgba(168,85,247,0.4)] text-[8px] md:text-[10px] hover:scale-105 transition-all"
                style={{ 
                  top: `${TOP_PADDING + index * ITEM_SPACING}px`, 
                  // Logic to keep cards from going off-screen on mobile
                  left: isMobile 
                    ? (index % 2 === 1 ? "5%" : "55%") 
                    : (index % 2 === 1 ? "12%" : "62%") 
                }}
              >
                <h3 className="text-purple-300 mb-1 md:mb-2 text-[9px] md:text-xs">{event.date}</h3>
                <p className="leading-relaxed line-clamp-3 md:line-clamp-none">{event.title}</p>
                <p className="text-purple-400 mt-2 md:mt-3 uppercase opacity-80 text-[7px] md:text-[9px]">📍 {event.venue}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}