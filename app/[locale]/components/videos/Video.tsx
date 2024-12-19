"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Volume2, VolumeX } from "lucide-react";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // If HLS.js is supported, load and attach the HLS stream
      if (Hls.isSupported()) {
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
      } else {
        // Fallback to regular video source if HLS is not supported
        video.src =
          "https://customer-iq1akjtragptm8h2.cloudflarestream.com/765b1f04a5d7d1009211e3a287a2568b/watch";
        video.play().catch((err) => {
          console.error("Autoplay failed:", err);
        });
      }

      // Intersection observer to play/pause the video when it enters or leaves the viewport
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video
              .play()
              .catch((err) => console.error("Intersection play failed:", err));
          } else {
            video.pause();
          }
        },
        { threshold: 0.5 } // Only play when 50% of the video is in view
      );

      if (video) observer.observe(video);

      // Clean up the observer on component unmount
      return () => {
        if (video) {
          observer.unobserve(video);
        }
      };
    }
  }, []);

  // Toggle mute/unmute
  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted; // Toggle the mute state
      setIsMuted(!isMuted); // Update the state
    }
  };

  return (
    <div
      className="relative flex items-center justify-center bg-black"
      style={{
        height: "auto",
        borderRadius: "30px",
        overflow: "hidden",
        maxWidth: "100%", // Ensure the player takes the full width of the parent
        width: "100%", // Ensure it is responsive
      }}
      onMouseEnter={() => setIsHovered(true)} // Show button on hover
      onMouseLeave={() => setIsHovered(false)} // Hide button when hover ends
    >
      <video
        ref={videoRef}
        autoPlay={true}
        loop
        playsInline
        muted={isMuted} // Apply the mute state
        className="md:h-[650px] h-[300px] w-full object-cover object-center"
        style={{
          aspectRatio: "16/9", // Ensure aspect ratio is maintained
          objectFit: "cover", // Make sure the video fills the container without distortion
        }}
      ></video>
      <div className="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ">
        <button
          onClick={toggleMute}
          className="flex items-center gap-2 px-4 py-2 bg-black/70 text-white rounded-full hover:bg-black/90 transition-colors duration-200"
        >
          {isMuted ? (
            <>
              <VolumeX size={20} />
              <span className="text-sm font-medium">Unmute</span>
            </>
          ) : (
            <>
              <Volume2 size={20} />
              <span className="text-sm font-medium">Mute</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
