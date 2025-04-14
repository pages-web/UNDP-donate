"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  animate,
  AnimatePresence,
} from "framer-motion";
import useMeasure from "react-use-measure";
import Image from "../ui/image";

interface Partner {
  _id?: string;
  image?: {
    url: string;
  };
  name?: string;
}

interface PartnerOrganizationProps {
  partner?: Partner[];
  logoGap?: number;
  speed?: "slow" | "medium" | "fast";
  imageSizes?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  hoverEffect?: boolean;
  className?: string;
}

const PartnerOrganization: React.FC<PartnerOrganizationProps> = ({
  partner = [],
  logoGap = 200,
  speed = "medium",
  imageSizes = { sm: 100, md: 120, lg: 150 },
  hoverEffect = true,
  className = "",
}) => {
  const SPEEDS = {
    fast: { normal: 20, slow: 60 },
    medium: { normal: 30, slow: 90 },
    slow: { normal: 40, slow: 120 },
  };

  const speedSettings = SPEEDS[speed];
  const [duration, setDuration] = useState(speedSettings.normal);
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const ensureMinimumItems = useCallback((items: Partner[]) => {
    if (items.length === 0) return [];

    let result = [...items];
    while (result.length < 6) {
      result = [...result, ...items];
    }
    return result;
  }, []);

  const duplicatedPartners = [
    ...ensureMinimumItems(partner),
    ...ensureMinimumItems(partner),
  ];

  useEffect(() => {
    if (!width || partner.length === 0) return;

    let controls: { stop: () => void } | undefined;
    const finalPosition = -width / 2;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return () => controls?.stop();
  }, [rerender, xTranslation, duration, width, partner.length]);

  const handleHoverStart = () => {
    if (hoverEffect) {
      setIsHovering(true);
      setMustFinish(true);
      setDuration(speedSettings.slow);
    }
  };

  const handleHoverEnd = () => {
    if (hoverEffect) {
      setIsHovering(false);
      setMustFinish(true);
      setDuration(speedSettings.normal);
    }
  };

  if (partner.length === 0) {
    return (
      <div
        className={`flex flex-col items-center gap-6 p-5 sm:p-7 md:p-10 rounded-3xl bg-white border border-gray-200 shadow-lg ${className}`}
      >
        <p className="text-center text-gray-500 text-lg font-semibold">
          No partner organizations available
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center gap-6 p-5 sm:p-7 md:p-10 rounded-3xl bg-white border border-gray-200 shadow-lg overflow-hidden ${className}`}
    >
      <div className="w-full relative h-28 md:h-32 lg:h-36 items-center flex">
        <motion.div
          className="absolute flex items-center"
          style={{
            x: xTranslation,
            gap: `${logoGap}px`,
          }}
          ref={ref}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        >
          {duplicatedPartners.map((article, index) => {
            const imageUrl = article.image?.url || "/images/default-image.jpg";
            const altText = article.name || `Partner logo ${index + 1}`;

            const uniqueKey = `${article._id || "partner"}-${index}-${
              article.name
                ? article.name.replace(/\s+/g, "-").toLowerCase()
                : index
            }`;

            return (
              <motion.div
                key={uniqueKey}
                className="flex-shrink-0 relative"
                whileHover={{ scale: hoverEffect ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={imageUrl}
                  width={imageSizes.md || 100}
                  height={imageSizes.md || 100}
                  className={`
                    object-contain 
                    w-${imageSizes.sm ? imageSizes.sm / 4 : 20} h-${
                    imageSizes.sm ? imageSizes.sm / 4 : 20
                  }
                    sm:w-${imageSizes.sm ? imageSizes.sm / 4 : 20} sm:h-${
                    imageSizes.sm ? imageSizes.sm / 4 : 20
                  }
                    md:w-${imageSizes.md ? imageSizes.md / 4 : 24} md:h-${
                    imageSizes.md ? imageSizes.md / 4 : 24
                  }
                    lg:w-${imageSizes.lg ? imageSizes.lg / 4 : 28} lg:h-${
                    imageSizes.lg ? imageSizes.lg / 4 : 28
                  }
                  `}
                  alt={altText}
                />

                {article.name && hoverEffect && (
                  <AnimatePresence>
                    {isHovering && (
                      <motion.div
                        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-md shadow-md whitespace-nowrap"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-xs font-medium text-gray-800">
                          {article.name}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerOrganization;
