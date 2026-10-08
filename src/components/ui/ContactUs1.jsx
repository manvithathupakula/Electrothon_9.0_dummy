"use client";

import React, { useState, useRef, useEffect } from 'react';
import GlobeDemo from './GlobeDemo';
import { Check, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/lib/emailjs-config';

// A simplified, dependency-light adaptation of the provided ContactUs1
const ContactUs1 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const formRef = useRef(null);
  const [inView, setInView] = useState(false);
  const hasAnimatedRef = useRef(false); 

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  useEffect(() => {
    if (!formRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !hasAnimatedRef.current) {
            setInView(true);
            hasAnimatedRef.current = true;
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(formRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      if (!name || !email || !message) {
        setError('Please fill in all fields');
        setIsSubmitting(false);
        return;
      }

      // Check if EmailJS is properly configured
      if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
          EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' || 
          EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
        setError('EmailJS not configured. Please set up your EmailJS account first.');
        setIsSubmitting(false);
        return;
      }

      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        reply_to: email,
        to_name: 'SPEC Team',
        to_email: 'community.spec@gmail.com'
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError(`Failed to send message: ${err.text || err.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Shared style object for the pixel font
  const pixelFontStyle = { fontFamily: "'Press Start 2P', cursive" };

  return (
    <section className="relative w-full py-6 overflow-hidden">
      {/* decorative blurred circles */}
      <div
        className="absolute -top-16 -left-16 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle at center,#e60a64, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full opacity-10 blur-2xl"
        style={{ background: 'radial-gradient(circle at center,#e60a64, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-5xl rounded-2xl border border-white/6 bg-secondary/10 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div ref={formRef} className={`transition-all duration-700 min-w-0 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="relative flex items-baseline gap-3 justify-center">
              <h2 className="text-white font-extrabold text-[clamp(1.2rem,4vw,2.2rem)] md:text-[clamp(1.6rem,3.2vw,2.8rem)] leading-tight" style={pixelFontStyle}>Contact</h2>
              <span className="text-white font-extrabold text-[clamp(1.2rem,4vw,2.2rem)] md:text-[clamp(1.6rem,3.2vw,2.8rem)] leading-tight" style={pixelFontStyle}>Us</span>
              {/* static decorative accent */}
              <div className="absolute inset-0 h-24 w-full pointer-events-none" aria-hidden>
                <div style={{ background: 'radial-gradient(circle at 60% 30%, rgba(255,159,184,0.15), transparent 40%)' }} className="h-full w-full" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <div className="p-3 rounded-md bg-red-500/10 border border-red-500/50 text-red-400 text-xs" style={pixelFontStyle}>
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  {/* Name Label */}
                  <label 
                    className="block text-[10px] text-gray-300 mb-2" 
                    style={pixelFontStyle}
                  >
                    Name
                  </label>
                  {/* Name Input */}
                  <input 
                    required
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full rounded-md bg-transparent border border-dashed border-gray-500 px-3 py-3 text-white focus:outline-none text-[10px] cursor-target" 
                    placeholder="Enter your name" 
                    style={pixelFontStyle}
                  />
                </div>
                <div>
                  {/* Email Label */}
                  <label 
                    className="block text-[10px] text-gray-300 mb-2"
                    style={pixelFontStyle}
                  >
                    Email
                  </label>
                  {/* Email Input */}
                  <input 
                    required
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    className="w-full rounded-md bg-transparent border border-dashed border-gray-500 px-3 py-3 text-white focus:outline-none text-[10px] cursor-target" 
                    placeholder="Enter your email" 
                    style={pixelFontStyle}
                  />
                </div>
              </div>

              <div>
                {/* Message Label */}
                <label 
                  className="block text-[10px] text-gray-300 mb-2"
                  style={pixelFontStyle}
                >
                  Message
                </label>
                {/* Message Textarea */}
                <textarea 
                  required
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  rows={5} 
                  className="w-full rounded-md bg-transparent border border-dashed border-gray-500 px-3 py-3 text-white focus:outline-none resize-none text-[10px] cursor-target" 
                  placeholder="Enter your message" 
                  style={{ ...pixelFontStyle, lineHeight: '1.5' }}
                />
              </div>

              <div className="flex justify-center">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="cursor-target inline-flex items-center justify-center gap-2 rounded-md text-white font-semibold border border-dashed border-gray-500 px-6 py-3 text-[10px]"
                  style={pixelFontStyle}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check className="mr-2 h-3 w-3" />
                      Message Sent!
                    </>
                  ) : (
                    <>Send Message</>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className={`flex items-center justify-center ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'} transition-all duration-700`}> 
            <div className="relative mx-auto w-[80vw] max-w-[420px] h-[80vw] max-h-[420px] overflow-hidden rounded-full bg-transparent p-0 md:h-[420px] md:w-[420px]">
              <div className="w-full h-full">
                  <GlobeDemo embedded={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default React.memo(ContactUs1);
