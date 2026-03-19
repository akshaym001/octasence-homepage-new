'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiCheckCircle, HiLightningBolt } from 'react-icons/hi';

import Footer from '@/components/layouts/Footer';
import Navbar from '@/components/layouts/Navbar';

// --- Service Card Backside Decorations (6 Highly Specific Scenes) ---
const ServiceBackDecor = ({ type }: { type: number }) => {
  // 0: Bold Wave Connecting Earth
  if (type === 0) {
    return (
      <div className="absolute inset-0 opacity-20 -z-10 pointer-events-none flex items-center justify-center">
        <svg
          width="400"
          height="400"
          viewBox="0 0 200 200"
          className="text-cyan-400"
        >
          <circle
            cx="100"
            cy="160"
            r="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.3"
          />
          {[...Array(3)].map((_, i) => (
            <motion.path
              key={i}
              d={`M 100 0 Q ${50 + i * 50} 80 100 110`}
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              animate={{
                d: [
                  `M 100 0 Q ${50 + i * 50} 80 100 110`,
                  `M 100 0 Q ${150 - i * 50} 80 100 110`,
                  `M 100 0 Q ${50 + i * 50} 80 100 110`,
                ],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </svg>
      </div>
    );
  }
  // 1: Bright Rotating & Zooming Satellite
  if (type === 1) {
    return (
      <div className="absolute inset-0 opacity-25 flex items-center justify-center -z-10 pointer-events-none">
        <motion.div
          animate={{ rotate: 360, scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 24 24"
            className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          >
            <path
              fill="currentColor"
              d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"
            />
            <motion.circle
              cx="12"
              cy="12"
              r="2"
              fill="cyan"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </svg>
        </motion.div>
      </div>
    );
  }
  // 2: Fast-growing Technology Buildings
  if (type === 2) {
    return (
      <div className="absolute inset-0 opacity-20 flex items-end justify-between -z-10 pointer-events-none px-4">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-cyan-500 w-6 border-t border-white/20"
            initial={{ height: 0 }}
            animate={{
              height: [`${10 + i * 8}%`, `${30 + i * 6}%`, `${10 + i * 8}%`],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          >
            <div className="w-full h-1 bg-white/40 mb-1" />
            <div className="w-full h-1 bg-white/40" />
          </motion.div>
        ))}
      </div>
    );
  }
  // 3: Dynamic Data Statistics Reports
  if (type === 3) {
    return (
      <div className="absolute inset-0 opacity-20 flex flex-col items-center justify-center -z-10 pointer-events-none gap-4">
        <div className="flex gap-1 h-32 items-end">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 bg-white"
              animate={{ height: [20, 100, 20] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
        <motion.div
          className="w-24 h-24 rounded-full border-8 border-cyan-400 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }
  // 4: Skyscrapers & Moving Vehicles (Audit & Compliance Theme)
  if (type === 4) {
    return (
      <div className="absolute inset-0 opacity-40 -z-10 pointer-events-none overflow-hidden">
        {/* Glowing Base Grid */}
        <div className="absolute bottom-0 w-full h-20 bg-cyan-500/10 blur-xl" />

        <div className="absolute bottom-10 left-0 flex gap-4 w-full justify-center items-end px-4">
          <motion.div
            className="h-32 w-12 bg-gradient-to-t from-cyan-900 via-cyan-500 to-white rounded-t-lg border-x border-t border-white/50 relative shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            animate={{ height: [130, 160, 130] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute top-2 inset-x-1 flex flex-col gap-1.5">
              <div className="h-1 bg-white/40 shadow-[0_0_5px_white]" />
              <div className="h-1 bg-white/40 shadow-[0_0_5px_white]" />
              <div className="h-1 bg-white/40 shadow-[0_0_5px_white]" />
            </div>
          </motion.div>

          <motion.div
            className="h-52 w-16 bg-gradient-to-t from-blue-900 via-blue-400 to-white rounded-t-lg border-x border-t border-white/60 relative shadow-[0_0_30px_rgba(59,130,246,0.4)]"
            animate={{ height: [190, 220, 190] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.5,
              ease: 'easeInOut',
            }}
          >
            <div className="absolute top-3 inset-x-2 flex flex-col gap-2">
              <div className="h-1.5 bg-white/50 shadow-[0_0_8px_white]" />
              <div className="h-1.5 bg-white/50 shadow-[0_0_8px_white]" />
              <div className="h-1.5 bg-white/50 shadow-[0_0_8px_white]" />
              <div className="h-1.5 bg-white/50 shadow-[0_0_8px_white]" />
            </div>
          </motion.div>

          <motion.div
            className="h-32 w-12 bg-gradient-to-t from-cyan-900 via-cyan-500 to-white rounded-t-lg border-x border-t border-white/50 relative shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            animate={{ height: [130, 160, 130] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 1,
              ease: 'easeInOut',
            }}
          >
            <div className="absolute top-2 inset-x-1 flex flex-col gap-1.5">
              <div className="h-1 bg-white/40 shadow-[0_0_5px_white]" />
              <div className="h-1 bg-white/40 shadow-[0_0_5px_white]" />
              <div className="h-1 bg-white/40 shadow-[0_0_5px_white]" />
            </div>
          </motion.div>
        </div>

        {/* Brighter Moving Vehicles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-4 h-[4px] w-16 bg-white shadow-[0_0_15px_#fff,0_0_5px_cyan]"
            initial={{ left: '-30%' }}
            animate={{ left: '130%' }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'linear',
            }}
          />
        ))}

        {/* Scanning Line */}
        <motion.div
          className="absolute inset-x-0 h-[1px] bg-cyan-400 shadow-[0_0_15px_cyan]"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }
  // 5: Tech Books & Infrastructure Research
  return (
    <div className="absolute inset-0 opacity-20 flex items-center justify-center -z-10 pointer-events-none">
      <svg
        width="200"
        height="200"
        viewBox="0 0 24 24"
        className="text-cyan-400"
      >
        <motion.path
          d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          animate={{ strokeWidth: [1, 2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M12 12.5l-8-4.36V14l8 4.36 8-4.36V8.14l-8 4.36z"
          fill="currentColor"
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <rect x="4" y="16" width="16" height="2" fill="white" opacity="0.5" />
      </svg>
    </div>
  );
};

// --- Technology Brain Background ---
const TechBrain = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none -z-10 flex items-center justify-center">
    <motion.svg
      width="800"
      height="800"
      viewBox="0 0 200 200"
      initial={{ scale: 0.9, opacity: 0.3 }}
      animate={{
        scale: [0.9, 1.1, 0.9],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      className="text-cyan-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]"
    >
      <path
        fill="currentColor"
        d="M100 20c-30 0-55 20-60 45-2 10 2 20 8 25-5 5-8 15-8 25 0 20 15 35 35 35h5v20h40v-20h5c20 0 35-15 35-35 0-10-3-20-8-25 6-5 10-15 8-25-5-25-30-45-60-45zm0 10c25 0 45 15 50 35 1 8-2 15-7 20-5 5-13 14-13 14s2 10 2 15c0 15-10 25-25 25h-15v10h-20v-10h-15c-15 0-25-10-25-25 0-5 2-15 2-15s-8-9-13-14c-5-5-8-12-7-20 5-20 25-35 50-35z"
      />
      {/* Neuron Pulses */}
      {[...Array(12)].map((_, i) => (
        <motion.circle
          key={i}
          r="1"
          fill="white"
          initial={{ cx: 100, cy: 100, opacity: 0 }}
          animate={{
            cx: 100 + Math.cos((i * 30 * Math.PI) / 180) * 80,
            cy: 100 + Math.sin((i * 30 * Math.PI) / 180) * 80,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + (i % 2),
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.svg>
  </div>
);

// --- Hero Moving Sparks (Clarity AI Style) ---
const HeroSparks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_rgba(34,211,238,0.8)]"
        initial={{
          left: '-20%',
          top: `${20 + i * 12}%`,
          width: '20%',
          opacity: 0,
        }}
        animate={{
          left: '120%',
          opacity: [0, 0.4, 0.4, 0],
        }}
        transition={{
          duration: 5 + (i % 3) * 2,
          repeat: Infinity,
          ease: 'linear',
          delay: i * 1.8,
        }}
      />
    ))}
  </div>
);

// --- Hero Flowing Wave Component ---
const FlowingWave = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 -z-10">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        initial={{ d: 'M-100 100 Q 50 200 200 100 T 500 100 T 800 100' }}
        animate={{
          d: [
            'M-100 100 Q 50 150 200 100 T 500 150 T 800 100',
            'M-100 130 Q 50 80 200 130 T 500 80 T 800 130',
            'M-100 100 Q 50 150 200 100 T 500 150 T 800 100',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        stroke="#22d3ee"
        strokeWidth="3"
        fill="transparent"
      />
      <motion.path
        initial={{ d: 'M-50 150 Q 80 250 250 150 T 550 150 T 850 150' }}
        animate={{
          d: [
            'M-50 150 Q 80 200 250 150 T 550 200 T 850 150',
            'M-50 180 Q 80 130 250 180 T 550 130 T 850 180',
            'M-50 150 Q 80 200 250 150 T 550 200 T 850 150',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        stroke="#0ea5e9"
        strokeWidth="2"
        fill="transparent"
        opacity="0.6"
      />
      {/* Additional Waves for visibility and depth */}
      <motion.path
        initial={{ d: 'M-150 120 Q 30 220 180 120 T 480 120 T 780 120' }}
        animate={{
          d: [
            'M-150 120 Q 30 170 180 120 T 480 170 T 780 120',
            'M-150 150 Q 30 100 180 150 T 480 100 T 780 150',
            'M-150 120 Q 30 170 180 120 T 480 170 T 780 120',
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
          delay: 1,
        }}
        stroke="#67e8f9"
        strokeWidth="1.5"
        fill="transparent"
        opacity="0.4"
      />
      <motion.path
        initial={{ d: 'M-200 180 Q 0 280 150 180 T 450 180 T 750 180' }}
        animate={{
          d: [
            'M-200 180 Q 0 230 150 180 T 450 230 T 750 180',
            'M-200 210 Q 0 160 150 210 T 450 160 T 750 210',
            'M-200 180 Q 0 230 150 180 T 450 230 T 750 180',
          ],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
          delay: 2,
        }}
        stroke="#06b6d4"
        strokeWidth="1"
        fill="transparent"
        opacity="0.5"
      />
      <motion.path
        initial={{ d: 'M-80 80 Q 70 180 220 80 T 520 80 T 820 80' }}
        animate={{
          d: [
            'M-80 80 Q 70 130 220 80 T 520 130 T 820 80',
            'M-80 110 Q 70 60 220 110 T 520 60 T 820 110',
            'M-80 80 Q 70 130 220 80 T 520 130 T 820 80',
          ],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'linear',
          delay: 3,
        }}
        stroke="#22d3ee"
        strokeWidth="2"
        fill="transparent"
        opacity="0.3"
      />
      {/* Two New Curved Waves */}
      <motion.path
        initial={{ d: 'M-300 140 Q -100 240 100 140 T 400 140 T 700 140' }}
        animate={{
          d: [
            'M-300 140 Q -100 190 100 140 T 400 190 T 700 140',
            'M-300 170 Q -100 120 100 170 T 400 120 T 700 170',
            'M-300 140 Q -100 190 100 140 T 400 190 T 700 140',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
          delay: 4,
        }}
        stroke="#0ea5e9"
        strokeWidth="1.2"
        fill="transparent"
        opacity="0.4"
      />
      <motion.path
        initial={{ d: 'M-120 200 Q 80 300 280 200 T 580 200 T 880 200' }}
        animate={{
          d: [
            'M-120 200 Q 80 250 280 200 T 580 250 T 880 200',
            'M-120 230 Q 80 180 280 230 T 580 180 T 880 230',
            'M-120 200 Q 80 250 280 200 T 580 250 T 880 200',
          ],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'linear',
          delay: 1.5,
        }}
        stroke="#38bdf8"
        strokeWidth="2.5"
        fill="transparent"
        opacity="0.25"
      />
    </svg>
  </div>
);

// --- Industry Card Component (Instant Spark Control) ---
const IndustryCard = ({
  name,
  bullets,
}: {
  name: string;
  bullets: string[];
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative p-10 bg-white/10 backdrop-blur-lg border-[2px] border-white/20 rounded-[40px] shadow-2xl overflow-hidden cursor-pointer group h-full flex flex-col"
    >
      {isHovered && (
        <React.Fragment key="spark-group">
          <motion.div
            className="absolute left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] z-10"
            animate={{ top: ['-100%', '100%'] }}
            transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}
          />
          <motion.div
            className="absolute right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] z-10"
            animate={{ top: ['100%', '-100%'] }}
            transition={{ duration: 0.8, ease: 'linear', repeat: Infinity }}
          />
        </React.Fragment>
      )}

      <h3 className="text-xl text-white mb-8 text-center border-b border-white/10 pb-4 capitalize">
        {name}
      </h3>
      <ul className="space-y-4">
        {bullets.map((point, i) => (
          <li key={i} className="flex items-start gap-4">
            <HiLightningBolt className="text-white/40 w-5 h-5 flex-shrink-0 mt-1" />
            <span className="text-base text-white/90 leading-snug">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// --- Professional Service Flip Card ---
const ServiceFlipCard = ({
  title,
  videoSrc,
  description,
  index,
}: {
  title: string;
  videoSrc: string;
  description: string[];
  index: number;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group perspective-2000 w-full h-[450px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-400 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white/10 backdrop-blur-md rounded-[40px] overflow-hidden border-2 border-white/20 shadow-2xl flex flex-col">
          <div className="relative h-2/3 w-full overflow-hidden bg-black">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
          <div className="p-8 flex-1 flex items-center justify-center">
            <h3 className="text-2xl text-white text-center leading-tight tracking-tight capitalize">
              {title}
            </h3>
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full backface-hidden bg-white/20 backdrop-blur-xl rounded-[40px] p-8 flex flex-col justify-center border-2 border-white/30 shadow-inner rotate-y-180 overflow-hidden">
          <ServiceBackDecor type={index} />
          <h4 className="text-xl text-white mb-6 border-b border-white/10 pb-2 text-center capitalize relative z-10">
            Capabilities
          </h4>
          <ul className="space-y-3 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar relative z-10">
            {description.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <HiCheckCircle className="text-white w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white leading-snug drop-shadow-md">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

const industries = [
  {
    name: 'Mining (Underground & Open-Cast)',
    bullets: [
      'Pillar and roof stability monitoring',
      'Slope and bench movement detection',
      'Stress redistribution and deformation tracking',
      'Early-warning alerts for evacuation planning',
      'Safety compliance and risk reporting',
    ],
  },
  {
    name: 'Civil Infrastructure',
    bullets: [
      'Structural deformation and crack monitoring',
      'Load and stress variation analysis',
      'Long-term stability and fatigue scoring',
      'Progressive damage and settlement detection',
      'Compliance-ready safety reporting',
    ],
  },
  {
    name: 'Dams & Embankments',
    bullets: [
      'Seepage and pore-pressure monitoring',
      'Settlement and deformation prediction',
      'Structural stress and uplift analysis',
      'Breach risk early-warning intelligence',
      'Regulatory compliance and audit reporting',
    ],
  },
  {
    name: 'Oil & Gas Infrastructure',
    bullets: [
      'Pipeline strain and ground movement detection',
      'Tank settlement and foundation monitoring',
      'Vibration and fatigue analysis',
      'Structural integrity risk alerts',
      'Operational safety and compliance reporting',
    ],
  },
  {
    name: 'Tunnels & Metro Systems',
    bullets: [
      'Convergence and deformation tracking',
      'Blast and operational vibration analysis',
      'Ground-structure interaction monitoring',
      'Real-time tunnel digital twins',
      'Safety alerts and inspection automation',
    ],
  },
  {
    name: 'Ports & Natural Structures',
    bullets: [
      'Foundation settlement monitoring',
      'Structural vibration and fatigue analysis',
      'Load impact from vessels and cranes',
      'Landslide and slope instability detection',
      'Ground movement and subsidence monitoring',
      'Rainfall and saturation impact analysis',
    ],
  },
];

// --- Service Video Configuration (FINAL SWAP) ---
const serviceItems = [
  {
    title: 'Managed Monitoring & Intelligence Services',
    videoSrc: '/videos/video4.mp4', // Swapped back to user's video1
    description: [
      '24×7 AI-driven monitoring dashboards',
      'Autonomous anomaly detection across stress, strain, vibration, displacement & seepage',
      'Risk scoring and early-warning intelligence',
      'Incident classification, escalation, and response workflows',
      'Daily, weekly, and monthly structural health intelligence reports',
      'Calibration, baseline establishment, and validation',
      'Seamless platform onboarding and go-live',
    ],
  },
  {
    title: 'Deployment & Installation Services',
    videoSrc: '/videos/video2.mp4',
    description: [
      'Site assessment & geotechnical context analysis',
      'Sensor selection based on structure type and failure modes',
      'Optimal sensor placement strategy',
      'IoT network design (LoRaWAN, mesh, edge gateways)',
    ],
  },
  {
    title: 'Digital Twin Implementation Services',
    videoSrc: '/videos/video3.mp4',
    description: [
      'Geospatial asset mapping (2D / 3D)',
      'Real-time data synchronization',
      'Stress, deformation, seepage & vibration heatmaps',
      'AI-driven risk overlays and failure zones',
      'Predictive “what-if” simulations for operational decisions',
    ],
  },
  {
    title: 'Predictive Analytics & Geotechnical Consultancy',
    videoSrc: '/videos/video1.mp4', // Swapped back to user's video4
    description: [
      'Failure mode & effects analysis (FMEA)',
      'Stress–strain and deformation modeling',
      'AI model customization for unique geology and structures',
      'Risk trend analysis and mitigation recommendations',
      'Engineering advisory for design, reinforcement, and operations',
    ],
  },
  {
    title: 'Compliance, Audit & Support',
    videoSrc: '/videos/video5.mp4',
    description: [
      'DGMS, BIS, ISO, MoEF, CMR/OSR aligned reporting',
      'Automated inspection logs and audit trails',
      'Safety and environmental compliance documentation',
      'Monthly/quarterly regulatory submissions',
      'Incident documentation and forensic data retrieval',
    ],
  },
  {
    title: 'Training & Certification Programs',
    videoSrc: '/videos/video6.mp4',
    description: [
      'IoT sensor handling & maintenance',
      'AI-driven SHM operations training',
      'Command center & dashboard usage',
      'Incident response & risk interpretation',
      'Certification for SHM & safety operations',
    ],
  },
];

export default function InfrastructureIntelligence() {
  return (
    <div className="solutions-page min-h-screen bg-[#020617] tech-grid selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="relative">
        {/* --- Hero Section --- */}
        <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 bg-transparent text-center font-outfit overflow-hidden">
          <FlowingWave />
          <HeroSparks />

          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.2] mb-10 tracking-tight">
                Mission-critical infrastructure <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 mt-4 block">
                  Intelligence as a service (IIaaS)
                </span>
              </h1>
              <p className="text-lg md:text-2xl text-white/75 max-w-3xl mx-auto leading-relaxed mb-10">
                OctaSence provides end-to-end Structural Health Monitoring (SHM)
                and Geotechnical Intelligence services powered by Agentic AI,
                multimodal IoT sensing, and real-time digital twins. From
                deployment to continuous risk prediction and regulatory
                compliance, we operate as an extension of your safety and
                engineering teams—24×7.
              </p>
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(34,211,238,0.2)',
                    '0 0 35px rgba(34,211,238,0.5)',
                    '0 0 20px rgba(34,211,238,0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block rounded-xl overflow-hidden"
              >
                <Link
                  href="mailto:contact@octasence.com"
                  className="inline-block px-12 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full hover:from-cyan-500 hover:to-blue-500 active:scale-95 transition-all border border-cyan-400/30 text-base"
                >
                  Request Audit
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- Our Solutions Section --- */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-100 to-transparent w-full" />
        <section className="py-32 bg-transparent font-outfit">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl text-blue-500 mb-6 tracking-tight capitalize [text-shadow:0_0_20px_rgba(59,130,246,0.3)]">
                Our solutions
              </h2>
              <div className="w-24 h-2.5 bg-blue-500/40 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-stretch">
              {serviceItems.map((service, index) => (
                <div key={index} className="h-full">
                  <ServiceFlipCard {...service} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Industries We Serve --- */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-50/20 to-transparent w-full" />
        <section className="py-32 bg-transparent relative overflow-hidden font-outfit">
          <TechBrain />
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl text-blue-500 mb-6 tracking-tight capitalize [text-shadow:0_0_20px_rgba(59,130,246,0.3)]">
                Industries we serve
              </h2>
              <div className="w-24 h-2.5 bg-blue-500/40 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {industries.map((ind, index) => {
                // Calculation: 0, 1, 2 = row 1; 3, 4, 5 = row 2
                // Middle indices are 1 and 4.
                const isMiddle = index % 3 === 1;
                const delay = isMiddle ? 0.2 : 0.8; // Middle first, then neighbors

                return (
                  <motion.div
                    key={index}
                    className="h-full"
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                      duration: 1.5,
                      delay: delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <IndustryCard {...ind} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        .font-outfit {
          font-family: 'Outfit', sans-serif;
        }

        .solutions-page,
        .solutions-page * {
          font-family: 'Outfit', sans-serif;
        }

        .tech-grid {
          background-image:
            linear-gradient(
              to right,
              rgba(34, 211, 238, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(34, 211, 238, 0.05) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
        }

        body {
          font-family: 'Outfit', sans-serif;
          background: #020617;
        }

        .perspective-2000 {
          perspective: 2000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #22d3ee;
          border-radius: 10px;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #020617;
        }
        ::-webkit-scrollbar-thumb {
          background: #0ea5e9;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
