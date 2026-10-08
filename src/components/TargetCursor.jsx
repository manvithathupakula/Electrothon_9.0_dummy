// src/components/TargetCursor.jsx  (GSAP refined & Dynamic Size Fix)
"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";

const TargetCursor = ({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true
}) => {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const spinTl = useRef(null);
  const dotRef = useRef(null);

  const isActiveRef = useRef(false);
  const activeTargetRef = useRef(null); // Changed from local var to Ref for the ticker
  const tickerFnRef = useRef(null);
  const activeStrengthRef = useRef(0);

  const [isMobile, setIsMobile] = useState(false);

  const constants = {
    borderWidth: 3,
    cornerSize: 18 
  };

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.08,
      ease: "power3.out"
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsMobile(true);
      return;
    }
    const userAgent = (navigator.userAgent || "").toLowerCase();
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    setIsMobile(isMobileUA);
  }, []);

  useEffect(() => {
    if (isMobile === null) return;
    if (isMobile) return;
    if (!cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll(".target-cursor-corner");

    let currentLeaveHandler = null;
    let resumeTimeout = null;

    const cleanupTarget = (target) => {
      try {
        if (currentLeaveHandler && target) {
          target.removeEventListener("mouseleave", currentLeaveHandler);
        }
      } catch (e) {}
      currentLeaveHandler = null;
    };

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 1,
      scale: 1
    });

    const createSpinTimeline = () => {
      if (spinTl.current) spinTl.current.kill();
      spinTl.current = gsap.timeline({ repeat: -1 }).to(cursor, {
        rotation: "+=360",
        duration: spinDuration,
        ease: "none"
      });
    };

    createSpinTimeline();

    // --- THE FIX: Calculate Size Inside the Loop ---
    const tickerFn = () => {
      if (!cursorRef.current || !cornersRef.current) return;
      
      const strength = activeStrengthRef.current || 0;
      if (strength === 0) return;

      // 1. Get current Cursor Position
      const cursorX = gsap.getProperty(cursorRef.current, "x");
      const cursorY = gsap.getProperty(cursorRef.current, "y");

      // 2. Dynamic Measurement: Calculate target position FRESH every frame
      let targetPositions = null;
      
      if (activeTargetRef.current) {
         const rect = activeTargetRef.current.getBoundingClientRect();
         const { borderWidth, cornerSize } = constants;
         
         // Calculate the 4 corner coordinates based on the current RECT
         targetPositions = [
            { x: rect.left - borderWidth, y: rect.top - borderWidth },
            { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
            { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
            { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
         ];
      }

      if (!targetPositions) return;

      // 3. Move corners
      const corners = Array.from(cornersRef.current);
      corners.forEach((corner, i) => {
        const currentX = gsap.getProperty(corner, "x");
        const currentY = gsap.getProperty(corner, "y");
        
        // Calculate where the corner should be relative to the cursor center
        const targetX = targetPositions[i].x - cursorX;
        const targetY = targetPositions[i].y - cursorY;
        
        // Interpolate
        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;
        
        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;
        
        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration: duration,
          ease: duration === 0 ? "none" : "power1.out",
          overwrite: "auto"
        });
      });
    };

    tickerFnRef.current = tickerFn;

    const moveHandler = (e) => moveCursor(e.clientX, e.clientY);
    window.addEventListener("mousemove", moveHandler);

    const scrollHandler = () => {
      if (!activeTargetRef.current || !cursorRef.current) return;
      const mouseX = gsap.getProperty(cursorRef.current, "x");
      const mouseY = gsap.getProperty(cursorRef.current, "y");
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      
      const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === activeTargetRef.current || elementUnderMouse.closest(targetSelector) === activeTargetRef.current);
      
      if (!isStillOverTarget && currentLeaveHandler) currentLeaveHandler();
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.2 });
      gsap.to(cursorRef.current, { scale: 0.92, duration: 0.15 });
    };
    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.25 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    const enterHandler = (e) => {
      const directTarget = e.target;
      const allTargets = [];
      let current = directTarget;
      while (current && current !== document.body) {
        if (current.matches && current.matches(targetSelector)) allTargets.push(current);
        current = current.parentElement;
      }
      const target = allTargets[0] || null;
      
      if (!target || !cursorRef.current || !cornersRef.current) return;
      if (activeTargetRef.current === target) return;
      if (activeTargetRef.current) cleanupTarget(activeTargetRef.current);
      
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTargetRef.current = target; // Set ref for ticker
      
      const corners = Array.from(cornersRef.current);
      corners.forEach((corner) => gsap.killTweensOf(corner));
      
      // Pause spin and reset rotation
      gsap.killTweensOf(cursorRef.current, "rotation");
      spinTl.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

      // Start the loop
      isActiveRef.current = true;
      gsap.ticker.add(tickerFnRef.current);

      // Fade in the magnetism strength
      gsap.to(activeStrengthRef, { current: 1, duration: hoverDuration, ease: "power2.out" });

      // Initial Snap (Optional, helps it start closer to the right spot)
      const rect = target.getBoundingClientRect();
      const cursorX = gsap.getProperty(cursorRef.current, "x");
      const cursorY = gsap.getProperty(cursorRef.current, "y");
      const { borderWidth, cornerSize } = constants;
      
      // Calculate initial positions just to start the tween in the right direction
      const initialTargets = [
        { x: rect.left - borderWidth, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
        { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
      ];

      corners.forEach((corner, i) => {
        gsap.to(corner, {
          x: initialTargets[i].x - cursorX,
          y: initialTargets[i].y - cursorY,
          duration: 0.2,
          ease: "power2.out"
        });
      });

      const leaveHandler = () => {
        gsap.ticker.remove(tickerFnRef.current);
        isActiveRef.current = false;
        activeTargetRef.current = null;
        
        gsap.set(activeStrengthRef, { current: 0, overwrite: true });
        
        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          const { cornerSize } = constants;
          // Return to small square shape
          const positions = [
            { x: -cornerSize * 1.2, y: -cornerSize * 1.2 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.2 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.2, y: cornerSize * 0.5 }
          ];
          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(corner, { x: positions[index].x, y: positions[index].y, duration: 0.3, ease: "power3.out" }, 0);
          });
        }

        resumeTimeout = setTimeout(() => {
          if (!activeTargetRef.current && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(cursorRef.current, "rotation");
            const normalizedRotation = currentRotation % 360;
            spinTl.current.kill();
            spinTl.current = gsap.timeline({ repeat: -1 }).to(cursorRef.current, {
              rotation: "+=360",
              duration: spinDuration,
              ease: "none"
            });
            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: "none",
              onComplete: () => spinTl.current?.restart()
            });
          }
          resumeTimeout = null;
        }, 50);
        
        cleanupTarget(target);
      };

      currentLeaveHandler = leaveHandler;
      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mouseover", enterHandler);

    return () => {
      if (tickerFnRef.current) gsap.ticker.remove(tickerFnRef.current);
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      if (activeTargetRef.current) cleanupTarget(activeTargetRef.current);
      spinTl.current?.kill();
      document.body.style.cursor = originalCursor;
      isActiveRef.current = false;
      activeTargetRef.current = null;
      activeStrengthRef.current = 0;
    };
  }, [targetSelector, spinDuration, moveCursor, hideDefaultCursor, hoverDuration, parallaxOn, isMobile]); // Added isMobile to deps

  useEffect(() => {
    if (isMobile === null || isMobile) return;
    if (!cursorRef.current) return;
    if (spinTl.current) {
      spinTl.current.kill();
      spinTl.current = gsap.timeline({ repeat: -1 }).to(cursorRef.current, {
        rotation: "+=360",
        duration: spinDuration,
        ease: "none"
      });
    }
  }, [spinDuration, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        width: 56,
        height: 56,
        transform: "translate3d(-50%,-50%,0)",
        willChange: "transform, opacity",
        opacity: 1
      }}
    >
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 10,
          height: 10,
          borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          boxShadow: "0 0 8px rgba(255,255,255,0.9)"
        }}
      />
      {/* 4 corners */}
      <div
        className="target-cursor-corner"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 12,
          height: 12,
          border: "3px solid white",
          borderRight: "0",
          borderBottom: "0",
          transform: "translate(-150%,-150%)",
          willChange: "transform"
        }}
      />
      <div
        className="target-cursor-corner"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 12,
          height: 12,
          border: "3px solid white",
          borderLeft: "0",
          borderBottom: "0",
          transform: "translate(25%,-150%)",
          willChange: "transform"
        }}
      />
      <div
        className="target-cursor-corner"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 12,
          height: 12,
          border: "3px solid white",
          borderLeft: "0",
          borderTop: "0",
          transform: "translate(25%,25%)",
          willChange: "transform"
        }}
      />
      <div
        className="target-cursor-corner"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 12,
          height: 12,
          border: "3px solid white",
          borderRight: "0",
          borderTop: "0",
          transform: "translate(-150%,25%)",
          willChange: "transform"
        }}
      />
    </div>
  );
};

export default TargetCursor;