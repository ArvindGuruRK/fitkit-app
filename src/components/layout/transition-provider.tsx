'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const IMAGES_TO_PRELOAD = [
  '/images/products/gold-standard-whey.png',
  '/images/products/biozyme-performance-whey.png',
  '/images/products/iso100-hydrolyzed-whey.png',
  '/images/products/micronized-creatine.png',
  '/images/products/creatine-hcl.png',
  '/images/products/serious-mass-gainer.png',
  '/images/products/super-gainer-xxl.png',
  '/images/products/essential-amino-energy.png',
  '/images/products/impact-whey-shake.png',
  '/images/products/nakpro-plant-protein.png',
  '/images/products/fitkits-shaker-bottle-pro.png',
  '/images/products/fitkits-gym-gloves.png',
  '/images/products/resistance-bands-set.png',
  '/images/products/fitkits-insulated-steel-bottle.png',
  '/images/products/fitkits-performance-t-shirt.png',
  '/images/products/fitkits-gym-bag.png',
  '/images/products/fitkits-compression-shorts.png',
  'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800',
  'https://i.ibb.co/HTG7crwx/FITKITS-LOGO-01-600x600.jpg',
  'https://i.ibb.co/SwFvtBHy/IMG-9747.jpg'
];

interface TransitionProviderProps {
  children: React.ReactNode;
}

export function PageTransitionProvider({ children }: TransitionProviderProps) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [prevPathname, setPrevPathname] = useState(pathname);
  
  // Preloader States
  const [showPreloader, setShowPreloader] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing modules...');

  // Refs for animations
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderContentRef = useRef<HTMLDivElement>(null);
  const curtainRedRef = useRef<HTMLDivElement>(null);
  const curtainBlackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 1. Initial preloading effect
  useEffect(() => {
    // Check if already preloaded in this session
    const isPreloaded = sessionStorage.getItem('fitkits_preloaded');
    if (isPreloaded) {
      setShowPreloader(false);
      setProgress(100);
      return;
    }

    let loadedCount = 0;
    const totalCount = IMAGES_TO_PRELOAD.length;
    
    // Safety timeout: force loading completion after 5 seconds to avoid soft-locks
    const timeout = setTimeout(() => {
      completeLoading();
    }, 5500);

    const updateLoadingText = (pct: number) => {
      if (pct < 30) setLoadingText('Booting FitKits Core Engine...');
      else if (pct < 60) setLoadingText('Preloading premium product assets...');
      else if (pct < 90) setLoadingText('Assembling aesthetic user interface...');
      else setLoadingText('Systems active. Preparing experience...');
    };

    const handleAssetLoaded = () => {
      loadedCount++;
      const currentPct = Math.round((loadedCount / totalCount) * 100);
      setProgress(currentPct);
      updateLoadingText(currentPct);

      if (loadedCount >= totalCount) {
        clearTimeout(timeout);
        completeLoading();
      }
    };

    // Begin preloading
    IMAGES_TO_PRELOAD.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleAssetLoaded;
      img.onerror = handleAssetLoaded; // still count it to avoid blocking
    });

    function completeLoading() {
      setProgress(100);
      setLoadingText('Welcome to FitKits 2025');
      sessionStorage.setItem('fitkits_preloaded', 'true');

      // Animating preloader out
      const tl = gsap.timeline({
        onComplete: () => {
          setShowPreloader(false);
        }
      });

      tl.to(preloaderContentRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: 'power3.in'
      })
      .to(preloaderRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.8,
        ease: 'power4.inOut'
      }, '-=0.2')
      .fromTo(contentRef.current, {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3');
    }

    return () => clearTimeout(timeout);
  }, []);

  // 2. Page route transition effect
  useEffect(() => {
    // Skip route transition on initial mount/preloader
    if (pathname === prevPathname) return;

    // Trigger curtain transition
    const tl = gsap.timeline({
      onComplete: () => {
        // Swap the page content mid-transition when screen is covered
        setDisplayChildren(children);
        setPrevPathname(pathname);
        
        // Scroll to top on page change
        window.scrollTo(0, 0);

        // Slide the curtains out to reveal the new page
        const tlOut = gsap.timeline();
        tlOut.to(curtainBlackRef.current, {
          xPercent: -100,
          duration: 0.6,
          ease: 'power3.inOut'
        })
        .to(curtainRedRef.current, {
          xPercent: -100,
          duration: 0.6,
          ease: 'power3.inOut'
        }, '-=0.45')
        .fromTo(contentRef.current, {
          opacity: 0,
          y: 15
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out'
        }, '-=0.3');
      }
    });

    // Reset curtains to right side of screen
    gsap.set([curtainRedRef.current, curtainBlackRef.current], { xPercent: 100 });

    // Slide curtains in to cover the screen
    tl.to(curtainRedRef.current, {
      xPercent: 0,
      duration: 0.5,
      ease: 'power3.inOut'
    })
    .to(curtainBlackRef.current, {
      xPercent: 0,
      duration: 0.5,
      ease: 'power3.inOut'
    }, '-=0.35')
    .to(contentRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.3,
      ease: 'power2.in'
    }, '-=0.45');

  }, [pathname, children, prevPathname]);

  return (
    <>
      {/* 1. INITIAL SPLASH PRELOADER */}
      {showPreloader && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col items-center justify-center select-none"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        >
          <div ref={preloaderContentRef} className="flex flex-col items-center max-w-md w-full px-6 space-y-8">
            {/* Header info */}
            <div className="w-full flex justify-between items-center text-[10px] text-muted-foreground tracking-[0.2em] uppercase font-mono border-b border-white/10 pb-3">
              <span>FITKITS // SYSTEM BOOT</span>
              <span>v2.2.5</span>
            </div>

            {/* Glowing progress ring/circle */}
            <div className="relative flex items-center justify-center">
              {/* Inner counter */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-white shadow-sm">
                  {progress}%
                </span>
                <span className="text-[9px] text-primary font-mono tracking-widest uppercase mt-1">
                  loading
                </span>
              </div>

              {/* Glowing SVG circle */}
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="76"
                  className="stroke-white/5"
                  strokeWidth="3"
                  fill="transparent"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="76"
                  className="stroke-primary transition-all duration-300 ease-out"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 76}
                  strokeDashoffset={2 * Math.PI * 76 * (1 - progress / 100)}
                  strokeLinecap="round"
                  style={{
                    filter: 'drop-shadow(0px 0px 8px rgba(230, 57, 70, 0.6))',
                  }}
                />
              </svg>
            </div>

            {/* Status texts */}
            <div className="w-full flex flex-col items-center text-center space-y-2">
              <span className="text-xs font-medium text-white tracking-wide">
                {loadingText}
              </span>
              <div className="w-full h-[1px] bg-white/5 relative overflow-hidden rounded-full mt-2">
                <div 
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${progress}%`, boxShadow: '0 0 8px #E63946' }}
                />
              </div>
            </div>

            {/* Decorative layout detail */}
            <div className="w-full text-center text-[8px] text-muted-foreground/60 font-mono tracking-[0.15em] uppercase">
              ESTABLISHING CORE SYSTEM CONFIGURATIONS
            </div>
          </div>
        </div>
      )}

      {/* 2. PAGE TRANSITION CURTAINS */}
      <div 
        ref={curtainRedRef} 
        className="fixed inset-0 z-[9990] bg-primary pointer-events-none transform translate-x-full"
        style={{ boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }}
      />
      <div 
        ref={curtainBlackRef} 
        className="fixed inset-0 z-[9991] bg-card pointer-events-none transform translate-x-full"
        style={{ boxShadow: '-15px 0 40px rgba(0,0,0,0.3)' }}
      />

      {/* 3. APP WRAPPER */}
      <div ref={contentRef} className="will-change-transform opacity-100">
        {displayChildren}
      </div>
    </>
  );
}
