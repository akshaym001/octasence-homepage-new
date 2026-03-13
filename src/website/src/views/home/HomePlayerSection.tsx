'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { CustomButton } from '../../components/ui';

const TextSection: React.FC = React.memo(() => (
  <div className="lg:w-1/2 w-full flex flex-col justify-center gap-4">
    <h1 className="text-[32px] lg:text-[56px] font-semibold leading-tight">
      Predict Infrastructure Failure Before It Happens
    </h1>
    <p className="text-base mb-6 max-w-[480px] text-gray-600">
      OctaSence combines AI agents, IoT sensors, and real-time digital twins to
      monitor structural health across mines, tunnels, dams, and large
      infrastructure systems.
    </p>
    <div className="flex gap-4 flex-wrap">
      <Link href="/products">
        <CustomButton>Explore Platform</CustomButton>
      </Link>
      <Link href="/contact">
        <CustomButton className="bg-blue-50 text-blue-600">
          Request Demo
        </CustomButton>
      </Link>
    </div>
  </div>
));

TextSection.displayName = 'TextSection';

const VideoSection: React.FC<{
  videoRef: React.RefObject<HTMLVideoElement>;
  onPlay: () => void;
}> = React.memo(({ videoRef, onPlay }) => (
  <div className="lg:w-1/2 w-full relative flex items-center justify-center">
    <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] rounded-lg overflow-hidden relative">
      <video
        ref={videoRef}
        src="/octasense.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      {/* Play button overlay */}
      <motion.button
        onClick={onPlay}
        className="absolute inset-0 flex items-center justify-center focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Play Video"
      >
        <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-blue-600 ml-1"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </motion.button>
    </div>
  </div>
));

VideoSection.displayName = 'VideoSection';

const VideoModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}> = ({ isOpen, onClose, videoRef }) => (
  <motion.div
    className="fixed inset-0 bg-black bg-opacity-80 z-[10000] flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="bg-black rounded-lg overflow-hidden w-full max-w-4xl relative mx-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white hover:text-gray-300 focus:outline-none z-10 bg-black bg-opacity-50 rounded-full p-1"
        aria-label="Close Modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src="/octasense.mp4"
          controls
          autoPlay
          className="w-full h-full"
          onEnded={onClose}
        />
      </div>
    </motion.div>
  </motion.div>
);

VideoModal.displayName = 'VideoModal';

interface VideoState {
  isModalOpen: boolean;
  isBackgroundVideoPlaying: boolean;
}

const HomePlayerSection: React.FC = () => {
  const [videoState, setVideoState] = useState<VideoState>({
    isModalOpen: false,
    isBackgroundVideoPlaying: true,
  });

  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayButtonClick = useCallback(() => {
    setVideoState((prev) => ({ ...prev, isModalOpen: true }));
  }, []);

  const handleCloseModal = useCallback(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    setVideoState((prev) => ({ ...prev, isModalOpen: false }));
  }, []);

  useEffect(() => {
    const bgVideo = backgroundVideoRef.current;
    if (bgVideo) {
      if (videoState.isModalOpen) {
        bgVideo.pause();
      } else if (videoState.isBackgroundVideoPlaying) {
        bgVideo.play().catch(() => {});
      }
    }
  }, [videoState.isModalOpen, videoState.isBackgroundVideoPlaying]);

  return (
    <div className="flex flex-col-reverse px-4 lg:flex-row items-center justify-between max-w-7xl mx-auto mt-8 gap-8">
      <TextSection />
      <VideoSection
        videoRef={backgroundVideoRef}
        onPlay={handlePlayButtonClick}
      />
      <AnimatePresence>
        {videoState.isModalOpen && (
          <VideoModal
            isOpen={videoState.isModalOpen}
            onClose={handleCloseModal}
            videoRef={modalVideoRef}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

HomePlayerSection.displayName = 'HomePlayerSection';

export default HomePlayerSection;
