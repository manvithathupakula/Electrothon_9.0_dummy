
'use client';

import React, { useState, useRef, useEffect, useId } from 'react'; // 1. Import useId
import { Rajdhani } from 'next/font/google';
import { ChevronDown } from 'lucide-react';

// Initialize Rajdhani once at module scope to avoid calling the loader inside JSX
const rajdhani = Rajdhani({ weight: ['500', '700'], subsets: ['latin'] });

const Dropdown = ({
  question,
  answer,
  finalHeightAnswer = 'h-40',
  finalHeightQuestion = 'h-56',
  fontSizeScaling = 'text-base',
  answerFontClass = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [maxH, setMaxH] = useState('0px');

  // 2. Use the stable ID hook instead of Math.random()
  const uniqueId = useId();
  const id = `faq-${uniqueId}`;

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxH(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxH('0px');
    }
  }, [isOpen, answer]);

  useEffect(() => {
    const onResize = () => {
      if (isOpen && contentRef.current) {
        setMaxH(`${contentRef.current.scrollHeight}px`);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen]);

  // REMOVED: const id = `faq-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className="w-full mb-4">
      <div className="w-full">
        <div className="flex-1">
          <button
            aria-expanded={isOpen}
            aria-controls={id}
            onClick={() => setIsOpen((s) => !s)}
            className={`cursor-target w-full text-left px-5 py-4 rounded-lg transition-shadow duration-200 border-2 ${isOpen ? 'border-blue-400 shadow-xl' : 'border-transparent shadow-none'} bg-transparent text-white`}
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            <div className={`flex items-center justify-between gap-4`}>
              {/* Apply Rajdhani font (matches Timeline "Portal Opens" subtitle) */}
              <div className={`text-left ${fontSizeScaling} font-bold ${rajdhani.className}`}>{question}</div>
              <div className="flex items-center justify-center w-8 h-8">
                <ChevronDown
                  size={20}
                  className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </div>
            </div>
          </button>

        
<div 
  id={id}
  ref={contentRef}
  style={{ maxHeight: maxH }}
  className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
>
  <div className="mt-0 px-5 py-4 bg-transparent border-2 border-t-0 rounded-b-lg border-blue-500">
    {/* ADD THE FONT CLASS HERE */}
    <p className={`text-white text-sm sm:text-base leading-relaxed ${answerFontClass}`}> 
      {answer}
    </p>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
