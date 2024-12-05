"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

interface AnimatedCounterProps {
  stepValues: number[]; // Values to animate through
  duration?: number; // Total duration for the animation
  prefix?: string; // Text to show before the number
  suffix?: string; // Text to show after the number
  color?: string; // Text color
  fontSize?: string; // Font size for the number
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  stepValues,
  duration = 8,
  prefix = "",
  suffix = "",
  color = "#000",
  fontSize = "80px",
}) => {
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!counterRef.current) return;

    const stepDuration = duration / stepValues.length;
    const tl = gsap.timeline();

    stepValues.forEach((value, index) => {
      if (typeof value !== "number") return; // Skip if value is not a number

      // Using GSAP's TextPlugin to animate numbers
      tl.to(counterRef.current, {
        textContent: `${prefix}${value.toLocaleString()}${suffix}`,
        duration: stepDuration,
        ease: "power1.inOut",
        onUpdate: function () {
          if (counterRef.current) {
            const formattedValue = value.toLocaleString();
            counterRef.current.textContent = `${prefix}${formattedValue}${suffix}`;
          }
        },
        delay: index * 0.1, // Adds a slight delay for smoother transitions between steps
      });
    });

    return () => {
      tl.kill(); // Clean up the timeline when the component unmounts
    };
  }, [stepValues, duration, prefix, suffix]);

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
        className={`text-center text-[${fontSize}] sm:text-[50px] md:text-[60px] lg:text-[80px]`}
      >
        {`${prefix}${stepValues[0]?.toLocaleString() || "0"}${suffix}`}
      </div>
    </div>
  );
};

export default AnimatedCounter;
