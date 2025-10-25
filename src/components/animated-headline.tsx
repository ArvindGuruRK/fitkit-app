'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedHeadlineProps {
  text: string;
  className?: string;
}

export function AnimatedHeadline({ text, className }: AnimatedHeadlineProps) {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;

    const typeSplit = new SplitType(headlineRef.current, {
      types: 'lines, words, chars',
      tagName: 'span',
    });

    const chars = typeSplit.chars;
    if (!chars) return;

    gsap.from(chars, {
      y: '110%',
      opacity: 0,
      rotationZ: '10',
      duration: 0.45,
      ease: 'power1.out',
      stagger: 0.05, // Adjusted stagger for a smoother effect
      scrollTrigger: {
        trigger: headlineRef.current,
        start: 'top 80%', // Start animation when 80% of the element is in view
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      },
    });
    
    // Cleanup function to revert the split text
    return () => {
        if (typeSplit) {
            typeSplit.revert();
        }
    };

  }, [text]);

  return (
    <h1 ref={headlineRef} className={className}>
      {text}
    </h1>
  );
}
