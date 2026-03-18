'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';

import { cn } from '@/lib/utils';

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black font-inter">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/octasense.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        {/* Premium Vignette & Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center max-w-5xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.3] mb-6 tracking-tight"
        >
          Predict Infrastructure <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#97a9f6] to-[#5b6cf3]">
            Failure Before It Happens
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          OctaSence combines AI agents, IoT sensors, and real-time digital twins to
          monitor structural health across mines, tunnels, dams, and large
          infrastructure.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Explore Platform Button */}
          <Link href="/products" className="group">
            <motion.button
              onHoverStart={() => setIsHovered('explore')}
              onHoverEnd={() => setIsHovered(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative overflow-hidden px-10 py-4 rounded-full font-semibold text-white transition-all duration-300",
                "bg-[#5b6cf3] shadow-[0_0_20px_rgba(91,108,243,0.3)]",
                "hover:shadow-[0_0_30px_rgba(91,108,243,0.5)]"
              )}
            >
              <div className="relative z-10 flex items-center gap-2">
                Explore Platform
                <motion.span
                  animate={{ x: isHovered === 'explore' ? 5 : 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <HiArrowRight className="w-5 h-5" />
                </motion.span>
              </div>
              {/* Shine effect */}
              <motion.div
                className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg]"
                animate={isHovered === 'explore' ? { left: '100%' } : { left: '-100%' }}
                transition={{ duration: 0.8 }}
              />
            </motion.button>
          </Link>

          {/* Request Demo Button */}
          <Link href="/contact" className="group">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative px-10 py-4 rounded-full font-semibold text-white transition-all duration-300",
                "border border-white/30 backdrop-blur-md",
                "hover:border-white/60"
              )}
            >
              <span className="relative z-10">Request Demo</span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-[#5b6cf3] opacity-20 blur-[120px] rounded-full" />
    </section>
  );
};

export default HeroSection;

