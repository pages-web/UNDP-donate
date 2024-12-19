"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(
        "https://customer-iq1akjtragptm8h2.cloudflarestream.com/765b1f04a5d7d1009211e3a287a2568b/manifest/video.m3u8"
      );
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => {
          console.error("Autoplay failed:", err);
        });
      });
    } else if (video) {
      video.src =
        "https://customer-iq1akjtragptm8h2.cloudflarestream.com/765b1f04a5d7d1009211e3a287a2568b/manifest/video.m3u8";

      video.play().catch((err) => {
        console.error("Autoplay failed:", err);
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video
            ?.play()
            .catch((err) => console.error("Intersection play failed:", err));
        } else {
          video?.pause();
        }
      },
      { threshold: 0.5 } // Дэлгэцийн 50% харагдаж байвал тоглуулна
    );

    if (video) observer.observe(video);

    return () => {
      if (video) observer.unobserve(video);
    };
  }, []);

  return (
    <div
      className="relative flex items-center justify-center bg-black"
      style={{
        height: "auto",
        borderRadius: "30px",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        autoPlay={true}
        loop
        playsInline
        className="md:h-full h-[300px] w-full object-cover object-center"
        style={{
          maxWidth: "100%",
          aspectRatio: "16/6",
        }}
      ></video>
    </div>
  );
};

export default VideoPlayer;
