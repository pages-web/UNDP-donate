"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(
        "https://customer-iq1akjtragptm8h2.cloudflarestream.com/765b1f04a5d7d1009211e3a287a2568b/manifest/video.m3u8"
      );
      hls.attachMedia(video);
    } else if (video) {
      video.src =
        "https://customer-iq1akjtragptm8h2.cloudflarestream.com/765b1f04a5d7d1009211e3a287a2568b/manifest/video.m3u8";
    }
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className="relative w-full h-[90vh] bg-black flex items-center justify-center"
      style={{ borderRadius: "30px", overflow: "hidden" }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
      ></video>
      <div
        className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-white text-center py-2 px-4 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition"
        style={{
          fontSize: "14px",
          color: "#333",
          border: "1px solid #ddd",
        }}
        onClick={handlePlayPause}
      >
        {isPlaying
          ? "Please click on image to play video"
          : "Please click on image to play video"}
      </div>
    </div>
  );
};

export default VideoPlayer;
