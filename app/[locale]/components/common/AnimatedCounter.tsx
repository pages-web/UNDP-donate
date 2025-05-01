"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

interface AnimatedCounterProps {
  stepValues: number[];
  duration?: number;
  prefix?: string;
  suffix?: string;
  color?: string;
  fontSize?: string;
  easing?: string;
  delay?: number;
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

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 640);

      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (!counterRef.current || !isClient || stepValues.length === 0) return;

    if (timeline.current) {
      timeline.current.kill();
    }

    timeline.current = gsap.timeline({ paused: true });

    const validStepValues = stepValues.filter(
      (value): value is number => typeof value === "number"
    );

    if (validStepValues.length === 0) return;

    const stepDuration = duration / validStepValues.length;

    if (counterRef.current) {
      counterRef.current.textContent = `${prefix}${validStepValues[0].toLocaleString()}${suffix}`;
    }

    validStepValues.forEach((value, index) => {
      if (index === 0) return;
      const prevValue = validStepValues[index - 1];
      const nextValue = value;

      timeline.current?.to(counterRef.current, {
        duration: stepDuration,
        ease: easing,
        delay: index === 1 ? delay : 0,
        onStart: () => {
          const startVal = prevValue;
          gsap.to(counterRef.current, {
            duration: stepDuration,
            ease: easing,
            onUpdate: function () {
              if (!counterRef.current) return;

              const progress = this.progress();
              const currentVal = Math.round(
                startVal + (nextValue - startVal) * progress
              );

              counterRef.current.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;
            },
          });
        },
      });
    });

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
        className="text-[40px] sm:text-5xl md:text-6xl lg:text-7xl transition-all duration-300 "
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
