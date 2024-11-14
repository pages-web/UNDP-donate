import Image from "../ui/image";
import { motion } from "framer-motion";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import React from "react";
const PartnerOrganization = ({ hamtarjAjiljbuiBaiguullaga }: any) => {
  const slider = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(slider.current, {
        xPercent: -100,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });
    }, slider);

    return () => ctx.revert();
  }, []);

  return (
    <motion.main className="w-full">
      <div className="overflow-hidden py-6 sm:py-8 lg:py-10 mt-10 relative">
        <div
          ref={slider}
          className="flex items-center gap-6 sm:gap-10 md:gap-12 lg:gap-14 whitespace-nowrap"
          style={{ width: "200%" }}
        >
          <div className="flex gap-6 sm:gap-10 md:gap-12 lg:gap-14">
            {hamtarjAjiljbuiBaiguullaga[0]?.content && (
              <div>
                {hamtarjAjiljbuiBaiguullaga.map(({ article, index }: any) => (
                  <div>
                    <Image
                      key={index}
                      src={article.image?.url}
                      width={70}
                      height={70}
                      className="object-contain sm:w-[80px] sm:h-[80px] md:w-[89px] md:h-[89px]"
                      alt="CU Logo"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default PartnerOrganization;
