"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Demo = () => {
  const phrases = [
    "It is a long established fact",
    "that a reader will be distracted",
    "by the readable content of a page",
    "when looking at its layout.",
  ];
  const animation = {
    initial: { y: "100%" },
    enter: (i: any) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i,
      },
    }),
  };

  const { ref, inView, entry } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  });

  return (
    <div className="flex items-center flex-col mb-[300px] mt-[300px] gap-[20vw]">
      <div ref={ref} className="text-[40px]">
        {phrases.map((phrase, index) => {
          return (
            <div key={index} className="overflow-hidden">
              <motion.p
                className="m-0 font-se"
                custom={index}
                variants={animation}
                initial="initial"
                animate={inView ? "enter" : ""}
              >
                {phrase}
              </motion.p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Demo;
