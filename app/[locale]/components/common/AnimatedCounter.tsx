"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedCounterProps {
  stepValues: number[];
  duration?: number; // Нийт хугацаа
  prefix?: string; // Эхэнд орох текст
  suffix?: string; // Төгсгөлд орох текст
  color?: string; // Текстний өнгө
  fontSize?: string; // Текстний хэмжээ
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

      tl.to(counterRef.current, {
        textContent: `${prefix}${value.toLocaleString()}${suffix}`,
        duration: stepDuration,
        ease: "power1.inOut",
        onUpdate: function () {
          if (counterRef.current) {
            const formattedValue =
              typeof value === "number" ? value.toLocaleString() : "0";
            counterRef.current.textContent = `${prefix}${formattedValue}${suffix}`;
          }
        },
      });
    });

    return () => {
      tl.kill();
    };
  }, [stepValues, duration, prefix, suffix]);

  return (
    <div
      className="text-center"
      style={{
        fontSize: fontSize,
        color: color,
        fontWeight: "400",
      }}
    >
      <div ref={counterRef}>{`${prefix}${
        stepValues[0]?.toLocaleString() || "0"
      }${suffix}`}</div>
    </div>
  );
};

export default AnimatedCounter;
