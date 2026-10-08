import React from 'react';
import './Timeline/timeline.css';

import logo1 from '@/assets/images/community_parnter_logo/1.png';
import logo2 from '@/assets/images/community_parnter_logo/2.png';
import logo3 from '@/assets/images/community_parnter_logo/3.png';
import logo4 from '@/assets/images/community_parnter_logo/4.png';
import logo5 from '@/assets/images/community_parnter_logo/5.png';
import logo6 from '@/assets/images/community_parnter_logo/6.png';
import logo7 from '@/assets/images/community_parnter_logo/7.png';
import logo8 from '@/assets/images/community_parnter_logo/8.png';
import logo9 from '@/assets/images/community_parnter_logo/9.png';
import logo10 from '@/assets/images/community_parnter_logo/10.png';
import logo11 from '@/assets/images/community_parnter_logo/11.png';
import logo12 from '@/assets/images/community_parnter_logo/12.png';
import logo13 from '@/assets/images/community_parnter_logo/13.png';
import logo14 from '@/assets/images/community_parnter_logo/14.png';
import logo15 from '@/assets/images/community_parnter_logo/15.png';

import logo16 from '@/assets/images/community_parnter_logo/Hack JKLU.png';
import logo17 from '@/assets/images/community_parnter_logo/anant.png';
import logo18 from '@/assets/images/community_parnter_logo/avinya.png';
import logo19 from '@/assets/images/community_parnter_logo/elite coders.png';
import logo20 from '@/assets/images/community_parnter_logo/gb rbu.png';
import logo21 from '@/assets/images/community_parnter_logo/gdg lllm university.png';
import logo22 from '@/assets/images/community_parnter_logo/hack nitr.png';
import logo23 from '@/assets/images/community_parnter_logo/hack with gdg.png';
import logo24 from '@/assets/images/community_parnter_logo/hackinnovation.png';
import logo25 from '@/assets/images/community_parnter_logo/hacktu.png';
import logo26 from '@/assets/images/community_parnter_logo/meraki.png';
import logo27 from '@/assets/images/community_parnter_logo/microsoft fabric group.png';
import logo28 from '@/assets/images/community_parnter_logo/nerds.png';
import logo29 from '@/assets/images/community_parnter_logo/realhack.png';
import logo30 from '@/assets/images/community_parnter_logo/rootsprout.png';
import logo31 from '@/assets/images/community_parnter_logo/singularity.png';
import logo32 from '@/assets/images/community_parnter_logo/ssn coding club.png';


// -------------------------------------------------------------------------
// 1. DATA FILE SIMULATION
// In your actual project, you would export this from a file like `data.ts`
// and import your local images like: import logo1 from '../assets/logo1.png'
// -------------------------------------------------------------------------
export interface Sponsor {
  id: string;
  name: string;
  imageUrl: any; // Support Next.js imported images
  url?: string;
}

const localSponsorsData: Sponsor[] = [
  { id: '1', name: 'The Elites', imageUrl: logo1, url: 'https://theelites.in/' },
  { id: '2', name: 'Technest', imageUrl: logo2, url: 'https://technest.es/' },
  { id: '3', name: 'Partner 3', imageUrl: logo3, url: '#' },
  { id: '4', name: 'GDG VIT', imageUrl: logo4, url: 'https://gdg.community.dev/gdg-on-campus-vellore-institute-of-technology-chennai-india/' },
  { id: '5', name: 'Gwalior DAO', imageUrl: logo5, url: 'https://www.instagram.com/gwaaliordao/' },
  { id: '6', name: 'APS', imageUrl: logo6, url: 'https://sac.nitrkl.ac.in/societies/Technical%20Society/APS' },
  { id: '7', name: 'PECK hacks', imageUrl: logo7, url: 'https://pechacks.org/' },
  { id: '8', name: 'hydrabad DAO', imageUrl: logo8, url: 'https://share.google/qMnKtTJVEOlkKdxAu' },
  { id: '9', name: 'Lucknow DAO', imageUrl: logo9, url: 'https://solstice-cairnsmore-9d5.notion.site/Lucknow-DAO-Community-1f0d2c45310a80119bade3d0421d3ccb?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRzdgQc95ZleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAacwPhLMWamJm24m-3_9juT8t_n_wsnstVD47jNCKk_vOH2DEdCsb8vw6qfl1g_aem_ulr1oukEi9nW0fkzWcHZjQ' },
  { id: '10', name: 'SESA', imageUrl: logo10, url: 'https://sesa.org.nz/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRzdgQc-WRleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAadDwBiy45AcXmfzDEFv1xSKi-tgRCXZfxiI98bQJIttQGxPiN2VhbiC-DZIUQ_aem_n---AtsTgqTJr3JcwflngA' },
  { id: '11', name: 'D4', imageUrl: logo11, url: 'https://www.d4community.com/' },
  { id: '12', name: 'Guru Nanak', imageUrl: logo12, url: 'https://gdg.community.dev/gdg-on-campus-guru-nanak-dev-university-amritsar-india/' },
  { id: '13', name: 'Partner 13', imageUrl: logo13, url: '#' },
  { id: '14', name: 'IIIT UNA', imageUrl: logo14, url: 'https://iiitu.ac.in/clubs/AAVESH' },
  { id: '15', name: 'GDG NITH', imageUrl: logo15, url: 'https://www.instagram.com/nith_gdgl/' },
  { id: '16', name: 'Hack JKLU', imageUrl: logo16, url: 'https://www.hackjklu.com/' },
  { id: '17', name: 'Anant', imageUrl: logo17, url: 'https://www.anantnitkkr.com/' },
  { id: '18', name: 'Avinya', imageUrl: logo18, url: 'https://avinya.devcommnsut.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRzdgQc-nNleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAaf5vRFXe-gt4QV06fWqzCc4yID_3dwagXuYOFT_-X4HrqF4Ue8F8pd5K5Lqmw_aem_dhAhdUrT3b5mW7EuvCEQVA' },
  { id: '19', name: 'Elite Coders', imageUrl: logo19, url: 'https://share.google/2pHrmY6hO4qfqsy2w' },
  { id: '20', name: 'GB RBU', imageUrl: logo20, url: 'https://share.google/1q2VWzriZ5yRzkvfH' },
  { id: '21', name: 'GDG LLLM University', imageUrl: logo21, url: 'https://gdg.community.dev/gdg-on-campus-iilm-university-greater-noida-india/' },
  { id: '22', name: 'Hack NITR', imageUrl: logo22, url: 'https://www.hackathon.com/event/hacknitr-5e4d683c926b91001b7d1215' },
  { id: '23', name: 'Hack With GDG', imageUrl: logo23, url: 'https://share.google/HCD7n1wzRruVQmEC5' },
  { id: '24', name: 'HackInnovation', imageUrl: logo24, url: '#' },
  { id: '25', name: 'HackTU', imageUrl: logo25, url: 'https://hacktu.ccstiet.com/' },
  { id: '26', name: 'Meraki', imageUrl: logo26, url: 'https://meraki.iiitu.ac.in/' },
  { id: '27', name: 'Microsoft Fabric', imageUrl: logo27, url: 'https://community.fabric.microsoft.com/' },
  { id: '28', name: 'Nerds', imageUrl: logo28, url: 'https://www.nerdsnitsilchar.in/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcAQc8OdleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAacFM_5uGAuPONzXIMSz7ejEYa5KGGjGJG-q9tTUqjU9Dubny9qfDvJPxnNflQ_aem_JtW8Nde8cwklLk_mm7K8-A' },
  { id: '29', name: 'RealHack', imageUrl: logo29, url: 'https://realhack.lk/' },
  { id: '30', name: 'RootSprout', imageUrl: logo30, url: 'https://share.google/SvznDmU1e9iS0Jexi' },
  { id: '31', name: 'Singularity', imageUrl: logo31, url: 'https://www.singularitytech.in/' },
  { id: '32', name: 'SSN Coding Club', imageUrl: logo32, url: 'https://www.ssncodingclub.site/' },
];


// -------------------------------------------------------------------------
// 2. MARQUEE ROW COMPONENT
// Handles the infinite scrolling logic for a single row
// -------------------------------------------------------------------------
interface MarqueeRowProps {
  items: Sponsor[];
  direction?: 'left' | 'right';
  speed?: number; // Duration in seconds
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  items,
  direction = 'left',
  speed = 30
}) => {
  // We duplicate the items array twice to create a seamless infinite loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="flex overflow-hidden group w-full">
      <div
        className={`flex w-max items-center gap-4 sm:gap-6 px-2 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
          }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicatedItems.map((item, index) => (
          <a
            key={`${item.id}-${index}`}
            href={item.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-40 h-20 sm:w-56 sm:h-28 md:w-64 md:h-32 bg-white/5 border border-white/10 rounded-2xl p-0 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 cursor-pointer flex-shrink-0"
          >
            <img
              src={typeof item.imageUrl === 'string' ? item.imageUrl : item.imageUrl.src}
              alt={item.name}
              className="w-full h-full object-cover rounded-2xl transition-transform"
              onError={(e) => {
                // Fallback text if image fails to load
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.parentElement) {
                  e.currentTarget.parentElement.innerHTML = `<span class="text-zinc-400 font-bold tracking-wider text-[10px] sm:text-xs text-center line-clamp-1">${item.name}</span>`;
                }
              }}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

// -------------------------------------------------------------------------
// 3. MAIN COMMUNITY SPONSORS COMPONENT
// -------------------------------------------------------------------------
interface CommunitySponsorsProps {
  sponsors: Sponsor[];
}

const CommunitySponsors: React.FC<CommunitySponsorsProps> = ({ sponsors = localSponsorsData }) => {
  // Split the sponsors array in half to create two rows moving in opposite directions
  const items = sponsors.length > 0 ? sponsors : localSponsorsData;
  const halfIdx = Math.ceil(items.length / 2);
  const topRow = items.slice(0, halfIdx);
  const bottomRow = items.slice(halfIdx);

  return (
    <section className="relative py-24 bg-[#0a0a0a] text-white overflow-hidden font-sans">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 mb-16 flex flex-col items-center text-center">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="modern-title text-center uppercase">
            COMMUNITY PARTNERS
          </h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex flex-col gap-6 sm:gap-8 overflow-hidden py-4">
        {/* Top Row - Moves Left */}
        <MarqueeRow items={topRow} direction="left" speed={25} />

        {/* Bottom Row - Moves Right */}
        <MarqueeRow items={bottomRow} direction="right" speed={20} />

        {/* Gradient overlays to create a fading effect on the left and right edges */}
        <div className="absolute inset-y-0 left-0 w-1/6 sm:w-1/4 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-1/6 sm:w-1/4 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
      </div>

      {/* INJECTED CSS FOR MARQUEE ANIMATIONS */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right linear infinite;
        }
        /* Pause animations on hover */
        .group:hover .animate-marquee-left,
        .group:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default CommunitySponsors;
