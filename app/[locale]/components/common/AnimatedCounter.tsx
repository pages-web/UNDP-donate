"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

interface AnimatedCounterProps {
  stepValues: number[]; // Values to animate through
  duration?: number; // Total duration for the animation
  prefix?: string; // Text to show before the number
  suffix?: string; // Text to show after the number
  color?: string; // Text color
  fontSize?: string; // Font size for the number, will only apply to non-mobile
  easing?: string; // GSAP easing function
  delay?: number; // Initial delay before animation starts
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  stepValues,
  duration = 8,
  prefix = "",
  suffix = "",
  color = "#000",
  fontSize = "80px",
  easing = "power2.out",
  delay = 0,
}) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // Set isClient to true when component mounts (client-side)
  useEffect(() => {
    setIsClient(true);

    // Check if mobile on mount
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 640);

      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (!counterRef.current || !isClient || stepValues.length === 0) return;

    // Clean up any existing animation
    if (timeline.current) {
      timeline.current.kill();
    }

    // Create a new timeline
    timeline.current = gsap.timeline({ paused: true });

    // Filter out non-numeric values
    const validStepValues = stepValues.filter(
      (value): value is number => typeof value === "number"
    );

    if (validStepValues.length === 0) return;

    // Calculate duration for each step
    const stepDuration = duration / validStepValues.length;

    // Initial value
    if (counterRef.current) {
      counterRef.current.textContent = `${prefix}${validStepValues[0].toLocaleString()}${suffix}`;
    }

    // Create animation for each step
    validStepValues.forEach((value, index) => {
      if (index === 0) return; // Skip the first value as it's already set

      const prevValue = validStepValues[index - 1];
      const nextValue = value;

      timeline.current?.to(counterRef.current, {
        duration: stepDuration,
        ease: easing,
        delay: index === 1 ? delay : 0, // Apply delay only to the first animation
        onStart: () => {
          // Start value for this segment
          const startVal = prevValue;
          gsap.to(counterRef.current, {
            duration: stepDuration,
            ease: easing,
            onUpdate: function () {
              if (!counterRef.current) return;

              // Calculate current value based on animation progress
              const progress = this.progress();
              const currentVal = Math.round(
                startVal + (nextValue - startVal) * progress
              );

              // Format and display the value
              counterRef.current.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;
            },
          });
        },
      });
    });

    // Setup intersection observer to trigger animation when in view
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && timeline.current) {
            timeline.current.play();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.current.observe(counterRef.current);

    return () => {
      // Clean up
      if (timeline.current) {
        timeline.current.kill();
      }
      if (observer.current && counterRef.current) {
        observer.current.unobserve(counterRef.current);
        observer.current.disconnect();
      }
    };
  }, [stepValues, duration, prefix, suffix, isClient, easing, delay]);

  return (
    <div
      className="text-center"
      style={{
        color: color,
        fontWeight: "400",
      }}
    >
      <div
        ref={counterRef}
        className="text-[40px] sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-300 font-nu"
        style={{
          fontSize: isMobile ? "40px" : fontSize,
        }}
      >
        {isClient
          ? `${prefix}${stepValues[0]?.toLocaleString() || "0"}${suffix}`
          : "0"}
      </div>
    </div>
  );
};

export default AnimatedCounter;
