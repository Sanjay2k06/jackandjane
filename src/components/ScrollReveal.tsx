'use client';

import React, { useEffect, useRef, useMemo, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });
}

export interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.15,
  baseRotation = 2,
  blurStrength = 3,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom 85%",
  wordAnimationEnd = "bottom 75%",
  as = "h2",
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    if (!text) return children;

    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    // Mobile: 40–50% reduced animation intensity to prevent scroll vibration/jitter
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const effectiveRotation = isMobile ? baseRotation * 0.4 : baseRotation;
    const effectiveBlur = isMobile ? Math.min(1.0, blurStrength * 0.35) : blurStrength;
    const effectiveOpacity = isMobile ? Math.max(0.4, baseOpacity) : baseOpacity;
    const scrubMode = isMobile ? 0.4 : true;

    const ctx = gsap.context(() => {
      // Rotation animation (calmer on mobile)
      gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: effectiveRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=10%",
            end: rotationEnd,
            scrub: scrubMode,
            fastScrollEnd: true,
          },
        }
      );

      const wordElements = el.querySelectorAll(".word");
      if (wordElements.length > 0) {
        // Opacity animation (calmer baseOpacity on mobile)
        gsap.fromTo(
          wordElements,
          { opacity: effectiveOpacity },
          {
            ease: "none",
            opacity: 1,
            stagger: isMobile ? 0.02 : 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom-=20%",
              end: wordAnimationEnd,
              scrub: scrubMode,
              fastScrollEnd: true,
            },
          }
        );

        if (enableBlur) {
          // Blur animation (calmer blur on mobile)
          gsap.fromTo(
            wordElements,
            { filter: `blur(${effectiveBlur}px)` },
            {
              ease: "none",
              filter: "blur(0px)",
              stagger: isMobile ? 0.02 : 0.05,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: "top bottom-=20%",
                end: wordAnimationEnd,
                scrub: scrubMode,
                fastScrollEnd: true,
              },
            }
          );
        }
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  const Tag = as as keyof JSX.IntrinsicElements;

  return (
    <Tag
      ref={containerRef as any}
      className={`scroll-reveal ${containerClassName}`}
    >
      <span className={`scroll-reveal-text ${textClassName}`}>
        {splitText}
      </span>
    </Tag>
  );
};

export default ScrollReveal;
