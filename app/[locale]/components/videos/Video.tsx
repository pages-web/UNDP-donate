"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Image from "../ui/image";

const VideoPlayer = ({ videodefaultimage }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showImage, setShowImage] = useState(true);

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

  const handlePlay = () => {
    const video = videoRef.current;
    if (video) {
      setShowImage(false);
      if (window.innerWidth <= 768) {
        // Зөвхөн мобайл дээр товчийг алга болгоно
        setShowImage(false);
      }
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
      className="relative flex items-center justify-center bg-black"
      style={{
        height: "auto",
        borderRadius: "30px",
        overflow: "hidden",
      }}
    >
      {showImage && (
        <div className="absolute w-full h-full z-10">
          <Image
            quality={100}
            priority
            sizes="100vw"
            src="/image1.jpg"
            alt="Default Thumbnail"
            className="w-full h-auto object-cover"
          />
          <div
            className="absolute bottom-4 sm:bottom-14 left-1/2 transform -translate-x-1/2 bg-white text-center py-1 px-2 sm:py-2 sm:px-4 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition"
            style={{
              fontSize: "14px",
              color: "#333",
              border: "1px solid #ddd",
            }}
            onClick={handlePlay}
          >
            {isPlaying
              ? "Please click on image to play video"
              : "Please click on image to play video"}
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full max-h-[400px] sm:max-h-[620px] object-cover"
        playsInline
        style={{
          maxWidth: "100%",
          aspectRatio: "16/9",
        }}
      ></video>
    </div>
  );
};

export default VideoPlayer;
