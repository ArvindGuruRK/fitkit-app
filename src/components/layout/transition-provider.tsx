'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import NextImage from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
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

const logoImage = PlaceHolderImages.find((p) => p.id === 'main-logo');

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
  const [loadingText, setLoadingText] = useState('Initializing core systems...');

  // Track component mounted status (vital to prevent unmount memory leaks & crashes)
  const isMountedRef = useRef(true);

  // Refs for animations
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderContentRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 1. Mount lifecycle management
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // 2. Initial preloading effect
  useEffect(() => {
    // Safe access to sessionStorage during client render
    let isPreloaded = false;
    try {
      isPreloaded = sessionStorage.getItem('fitkits_preloaded') === 'true';
    } catch (e) {
      console.warn('sessionStorage is not accessible', e);
    }

    if (isPreloaded) {
      setShowPreloader(false);
      setProgress(100);
      return;
    }

    let loadedCount = 0;
    const totalCount = IMAGES_TO_PRELOAD.length;
    
    // Safety timeout: force loading completion after 5.5 seconds to avoid soft-locks
    const timeout = setTimeout(() => {
      completeLoading();
    }, 5500);

    const updateLoadingText = (pct: number) => {
      if (pct < 30) setLoadingText('Booting FitKits Core Engine...');
      else if (pct < 60) setLoadingText('Preloading premium product images...');
      else if (pct < 90) setLoadingText('Assembling aesthetic user interface...');
      else setLoadingText('Systems active. Preparing experience...');
    };

    const handleAssetLoaded = () => {
      if (!isMountedRef.current) return;
      loadedCount++;
      const currentPct = Math.min(Math.round((loadedCount / totalCount) * 100), 99);
      setProgress(currentPct);
      updateLoadingText(currentPct);

      if (loadedCount >= totalCount) {
        clearTimeout(timeout);
        completeLoading();
      }
    };

    // Begin preloading using the native window image constructor explicitly
    if (typeof window !== 'undefined') {
      IMAGES_TO_PRELOAD.forEach((src) => {
        const img = new window.Image();
        img.src = src;
        img.onload = handleAssetLoaded;
        img.onerror = handleAssetLoaded; // keep counting on error to avoid hangs
      });
    }

    function completeLoading() {
      if (!isMountedRef.current) return;
      setProgress(100);
      setLoadingText('Welcome to FitKits');
      try {
        sessionStorage.setItem('fitkits_preloaded', 'true');
      } catch (e) {
        console.warn('sessionStorage is not writable', e);
      }

      // Safe check for refs before GSAP animation
      if (!preloaderRef.current || !preloaderContentRef.current || !contentRef.current) {
        setShowPreloader(false);
        return;
      }

      // Animating preloader out
      const tl = gsap.timeline({
        onComplete: () => {
          if (isMountedRef.current) {
            setShowPreloader(false);
          }
        }
      });

      tl.to(preloaderContentRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power2.in'
      })
      .to(preloaderRef.current, {
        yPercent: -100, // Slide up off-screen
        duration: 0.6,
        ease: 'power3.inOut'
      }, '-=0.15')
      .fromTo(contentRef.current, {
        opacity: 0,
        y: 15
      }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.25');
    }

    return () => clearTimeout(timeout);
  }, []);

  // 3. Page route transition effect (Pure Fade and Slide Page Transition)
  useEffect(() => {
    // Skip route transition on initial mount/preloader
    if (pathname === prevPathname) return;

    // Safe check: do not transition if ref is not loaded
    if (!contentRef.current) {
      setDisplayChildren(children);
      setPrevPathname(pathname);
      return;
    }

    // Trigger page content transition timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (!isMountedRef.current) return;
        
        // Swap the page content mid-transition when screen is faded out
        setDisplayChildren(children);
        setPrevPathname(pathname);
        
        // Scroll to top on page change
        window.scrollTo(0, 0);

        // Fade and slide the new page content back in
        gsap.fromTo(contentRef.current, {
          opacity: 0,
          y: 10
        }, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });

    // Fade out and slide up the current page content
    tl.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.25,
      ease: 'power2.in'
    });

  }, [pathname, children, prevPathname]);

  return (
    <>
      {/* 1. INITIAL SPLASH PRELOADER */}
      {showPreloader && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center select-none"
        >
          <div ref={preloaderContentRef} className="flex flex-col items-center max-w-md w-full px-6 space-y-6">
            
            {/* Top digital header detail */}
            <div className="w-full flex justify-between items-center text-[9px] text-muted-foreground/80 tracking-[0.2em] uppercase font-mono border-b border-black/10 pb-3">
              <span>FITKITS // SYSTEM BOOT</span>
              <span>v2.2.5</span>
            </div>

            {/* Glowing Brand Logo */}
            <div className="flex flex-col items-center justify-center pt-2">
              {logoImage && (
                <div className="relative h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-2xl border-2 border-primary/20 shadow-[0_0_15px_rgba(230,57,70,0.15)]">
                  <NextImage 
                    src={logoImage.imageUrl} 
                    alt={logoImage.description} 
                    fill 
                    priority
                    className="object-cover"
                  />
                </div>
              )}
              <h2 className="font-headline text-lg tracking-wider text-black uppercase mt-4">
                FIT<span className="text-primary">KITS</span>
              </h2>
            </div>

            {/* Glowing circle and percentage counter */}
            <div className="relative flex items-center justify-center my-2">
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-headline text-3xl font-bold tracking-tight text-black">
                  {progress}%
                </span>
                <span className="text-[8px] text-primary font-mono tracking-widest uppercase mt-0.5">
                  loading
                </span>
              </div>

              {/* Glowing SVG loading track */}
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="64"
                  className="stroke-black/5"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="64"
                  className="stroke-primary transition-all duration-200 ease-out"
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 64}
                  strokeDashoffset={2 * Math.PI * 64 * (1 - progress / 100)}
                  strokeLinecap="round"
                  style={{
                    filter: 'drop-shadow(0px 0px 4px rgba(230, 57, 70, 0.3))',
                  }}
                />
              </svg>
            </div>

            {/* Status texts & linear bar */}
            <div className="w-full flex flex-col items-center text-center space-y-1.5">
              <span className="text-xs font-medium text-black tracking-wide">
                {loadingText}
              </span>
              <div className="w-full h-[1.5px] bg-black/5 relative overflow-hidden rounded-full mt-1">
                <div 
                  className="h-full bg-primary transition-all duration-200 ease-out"
                  style={{ width: `${progress}%`, boxShadow: '0 0 4px #E63946' }}
                />
              </div>
            </div>

            {/* Bottom digital note */}
            <div className="w-full text-center text-[7.5px] text-muted-foreground/60 font-mono tracking-[0.15em] uppercase">
              ESTABLISHING CORE SYSTEM CONFIGURATIONS
            </div>
          </div>
        </div>
      )}

      {/* 2. APP WRAPPER */}
      <div ref={contentRef} className="will-change-transform opacity-100">
        {displayChildren}
      </div>
    </>
  );
}
