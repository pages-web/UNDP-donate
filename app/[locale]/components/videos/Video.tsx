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
      className="relative w-full bg-black flex items-center justify-center"
      style={{
        height: "640px",
        borderRadius: "30px",
        overflow: "hidden",
      }}
    >
      {showImage && (
        <div className="absolute w-full h-full z-10">
          <Image
            src={videodefaultimage[0]?.image?.url}
            alt="Default Thumbnail"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute bottom-10 sm:bottom-14 left-1/2 transform -translate-x-1/2 bg-white text-center py-2 px-4 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition"
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
        className={`w-full h-full object-cover ${
          showImage ? "hidden" : "block"
        }`}
        playsInline
      ></video>
      <div
        className="absolute bottom-10 sm:bottom-20  xl:bottom-14 left-1/2 transform -translate-x-1/2 bg-white text-center py-2 px-4 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition"
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
  );
};

export default VideoPlayer;
