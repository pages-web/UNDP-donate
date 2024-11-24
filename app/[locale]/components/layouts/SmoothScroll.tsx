"use client";

import { useEffect } from "react";

const SmoothScroll = () => {
  useEffect(() => {
    const smoothScrollLinks =
      document.querySelectorAll<HTMLAnchorElement>("a[href^='#']");

    smoothScrollLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href")?.substring(1);
        const targetElement = document.getElementById(targetId || "");

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
          });
        }
      });
    });

    return () => {
      smoothScrollLinks.forEach((link) =>
        link.removeEventListener("click", () => {})
      );
    };
  }, []);

  return null;
};

export default SmoothScroll;
