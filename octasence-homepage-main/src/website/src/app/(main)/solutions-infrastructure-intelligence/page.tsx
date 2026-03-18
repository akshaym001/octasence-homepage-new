'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import Link from 'next/link';
import { HiCheckCircle, HiLightningBolt } from 'react-icons/hi';

// --- Hero Moving Sparks (Clarity AI Style) ---
const HeroSparks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_25px_#0000FF]"
        initial={{ 
          left: '-20%', 
          top: `${20 + (i * 12)}%`, 
          width: '20%', 
          opacity: 0 
        }}
        animate={{ 
          left: '120%',
          opacity: [0, 0.4, 0.4, 0]
        }}
        transition={{
          duration: 5 + (i % 3) * 2,
          repeat: Infinity,
          ease: "linear",
          delay: i * 1.8,
        }}
      />
    ))}
  </div>
);

// --- Hero Flowing Wave Component ---
const FlowingWave = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 -z-10">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        initial={{ d: "M-100 100 Q 50 200 200 100 T 500 100 T 800 100" }}
        animate={{
          d: [
            "M-100 100 Q 50 150 200 100 T 500 150 T 800 100",
            "M-100 130 Q 50 80 200 130 T 500 80 T 800 130",
            "M-100 100 Q 50 150 200 100 T 500 150 T 800 100"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        stroke="#0000FF"
        strokeWidth="2"
        fill="transparent"
      />
      <motion.path
        initial={{ d: "M-50 150 Q 80 250 250 150 T 550 150 T 850 150" }}
        animate={{
          d: [
            "M-50 150 Q 80 200 250 150 T 550 200 T 850 150",
            "M-50 180 Q 80 130 250 180 T 550 130 T 850 180",
            "M-50 150 Q 80 200 250 150 T 550 200 T 850 150"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        stroke="#0000FF"
        strokeWidth="1"
        fill="transparent"
        opacity="0.5"
      />
    </svg>
  </div>
);

// --- Industry Card Component (Instant Spark Control) ---
const IndustryCard = ({ name, bullets }: { name: string, bullets: string[] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative p-10 bg-white border-[2px] border-[#0000FF] rounded-[40px] shadow-xl overflow-hidden cursor-pointer"
    >
      {isHovered && (
        <React.Fragment key="spark-group">
          <motion.div
            className="absolute left-0 w-[4px] h-full bg-gradient-to-b from-transparent via-[#0000FF] to-transparent shadow-[0_0_20px_#0000FF] z-10"
            animate={{ top: ['-100%', '100%'] }}
            transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            className="absolute right-0 w-[4px] h-full bg-gradient-to-b from-transparent via-[#0000FF] to-transparent shadow-[0_0_20px_#0000FF] z-10"
            animate={{ top: ['100%', '-100%'] }}
            transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
          />
        </React.Fragment>
      )}

      <h3 className="text-xl font-black text-[#0000FF] mb-8 text-center border-b border-gray-50 pb-4 capitalize">
        {name}
      </h3>
      <ul className="space-y-4">
        {bullets.map((point, i) => (
          <li key={i} className="flex items-start gap-4">
            <HiLightningBolt className="text-[#0000FF]/50 w-5 h-5 flex-shrink-0 mt-1" />
            <span className="text-base font-bold text-gray-800 leading-snug">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// --- Professional Service Flip Card ---
const ServiceFlipCard = ({ title, videoSrc, description }: { title: string, videoSrc: string, description: string[] }) => {
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
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-[40px] overflow-hidden border-2 border-[#0000FF] shadow-lg flex flex-col">
          <div className="relative h-2/3 w-full overflow-hidden bg-black">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
          <div className="p-8 flex-1 flex items-center justify-center bg-white">
            <h3 className="text-2xl font-black text-[#0000FF] text-center leading-tight tracking-tight capitalize">
              {title}
            </h3>
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full backface-hidden bg-[#F0F7FF] rounded-[40px] p-8 flex flex-col justify-center border-2 border-[#0000FF] shadow-inner rotate-y-180">
          <h4 className="text-xl font-black text-[#0000FF] mb-6 border-b border-blue-100 pb-2 text-center capitalize">Capabilities</h4>
          <ul className="space-y-3 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
            {description.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <HiCheckCircle className="text-[#0000FF] w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-800 font-bold leading-snug">{point}</span>
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
    name: "Mining (Underground & Open-Cast)",
    bullets: [
      "Pillar and roof stability monitoring",
      "Slope and bench movement detection",
      "Stress redistribution and deformation tracking",
      "Early-warning alerts for evacuation planning",
      "Safety compliance and risk reporting"
    ]
  },
  {
    name: "Civil Infrastructure",
    bullets: [
      "Structural deformation and crack monitoring",
      "Load and stress variation analysis",
      "Long-term stability and fatigue scoring",
      "Progressive damage and settlement detection",
      "Compliance-ready safety reporting"
    ]
  },
  {
    name: "Dams & Embankments",
    bullets: [
      "Seepage and pore-pressure monitoring",
      "Settlement and deformation prediction",
      "Structural stress and uplift analysis",
      "Breach risk early-warning intelligence",
      "Regulatory compliance and audit reporting"
    ]
  },
  {
    name: "Oil & Gas Infrastructure",
    bullets: [
      "Pipeline strain and ground movement detection",
      "Tank settlement and foundation monitoring",
      "Vibration and fatigue analysis",
      "Structural integrity risk alerts",
      "Operational safety and compliance reporting"
    ]
  },
  {
    name: "Tunnels & Metro Systems",
    bullets: [
      "Convergence and deformation tracking",
      "Blast and operational vibration analysis",
      "Ground-structure interaction monitoring",
      "Real-time tunnel digital twins",
      "Safety alerts and inspection automation"
    ]
  },
  {
    name: "Ports & Natural Structures",
    bullets: [
      "Foundation settlement monitoring",
      "Structural vibration and fatigue analysis",
      "Load impact from vessels and cranes",
      "Landslide and slope instability detection",
      "Ground movement and subsidence monitoring",
      "Rainfall and saturation impact analysis"
    ]
  }
];

// --- Service Video Configuration (FINAL SWAP) ---
const serviceItems = [
  {
    title: "Managed Monitoring & Intelligence Services",
    videoSrc: "/videos/video4.mp4", // Swapped back to user's video1
    description: [
      "24×7 AI-driven monitoring dashboards",
      "Autonomous anomaly detection across stress, strain, vibration, displacement & seepage",
      "Risk scoring and early-warning intelligence",
      "Incident classification, escalation, and response workflows",
      "Daily, weekly, and monthly structural health intelligence reports",
      "Calibration, baseline establishment, and validation",
      "Seamless platform onboarding and go-live"
    ]
  },
  {
    title: "Deployment & Installation Services",
    videoSrc: "/videos/video2.mp4",
    description: [
      "Site assessment & geotechnical context analysis",
      "Sensor selection based on structure type and failure modes",
      "Optimal sensor placement strategy",
      "IoT network design (LoRaWAN, mesh, edge gateways)"
    ]
  },
  {
    title: "Digital Twin Implementation Services",
    videoSrc: "/videos/video3.mp4",
    description: [
      "Geospatial asset mapping (2D / 3D)",
      "Real-time data synchronization",
      "Stress, deformation, seepage & vibration heatmaps",
      "AI-driven risk overlays and failure zones",
      "Predictive “what-if” simulations for operational decisions"
    ]
  },
  {
    title: "Predictive Analytics & Geotechnical Consultancy",
    videoSrc: "/videos/video1.mp4", // Swapped back to user's video4
    description: [
      "Failure mode & effects analysis (FMEA)",
      "Stress–strain and deformation modeling",
      "AI model customization for unique geology and structures",
      "Risk trend analysis and mitigation recommendations",
      "Engineering advisory for design, reinforcement, and operations"
    ]
  },
  {
    title: "Compliance, Audit & Support",
    videoSrc: "https://videos.pexels.com/video-files/4038478/4038478-uhd_2560_1440_30fps.mp4",
    description: [
      "DGMS, BIS, ISO, MoEF, CMR/OSR aligned reporting",
      "Automated inspection logs and audit trails",
      "Safety and environmental compliance documentation",
      "Monthly/quarterly regulatory submissions",
      "Incident documentation and forensic data retrieval"
    ]
  },
  {
    title: "Training & Certification Programs",
    videoSrc: "https://videos.pexels.com/video-files/3252444/3252444-uhd_2560_1440_25fps.mp4",
    description: [
      "IoT sensor handling & maintenance",
      "AI-driven SHM operations training",
      "Command center & dashboard usage",
      "Incident response & risk interpretation",
      "Certification for SHM & safety operations"
    ]
  }
];

export default function InfrastructureIntelligence() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#0000FF] selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="relative">
        {/* --- Hero Section --- */}
        <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 bg-white text-center font-inter overflow-hidden">
          <FlowingWave />
          <HeroSparks />

          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.2] mb-10 tracking-tight">
                Mission-critical infrastructure <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#0000FF] italic font-bold">
                  Intelligence as a service (IIaaS)
                </span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-600 max-w-5xl mx-auto font-bold leading-relaxed mb-16 opacity-80">
                OctaSence provides end-to-end Structural Health Monitoring (SHM) and Geotechnical Intelligence services powered by Agentic AI, multimodal IoT sensing, and real-time digital twins. From deployment to continuous risk prediction and regulatory compliance, we operate as an extension of your safety and engineering teams—24×7.
              </p>
              <Link
                href="mailto:contact@octasence.com"
                className="inline-block px-14 py-5 bg-[#0000FF] text-white font-black rounded-full hover:scale-110 active:scale-95 transition-all shadow-xl"
              >
                Request Audit
              </Link>
            </motion.div>
          </div>
        </section>

        {/* --- Our Solutions Section --- */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-100 to-transparent w-full" />
        <section className="py-32 bg-white font-outfit">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight capitalize">Our solutions</h2>
              <div className="w-24 h-2.5 bg-[#0000FF] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {serviceItems.map((service, index) => (
                <ServiceFlipCard key={index} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* --- Industries We Serve --- */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-50 to-transparent w-full" />
        <section className="py-32 bg-[#F0F7FF] relative overflow-hidden font-outfit">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight capitalize">Industries we serve</h2>
              <div className="w-24 h-2.5 bg-[#0000FF] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((ind, index) => (
                <IndustryCard key={index} {...ind} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&family=Outfit:wght@400;700;800;900&display=swap');
        
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }

        body {
          font-family: 'Outfit', sans-serif;
          background: #FFFFFF;
        }

        .perspective-2000 { perspective: 2000px; }
        .backface-hidden { backface-visibility: hidden; }
        .preserve-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F0F7FF;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0000FF;
          border-radius: 10px;
        }

        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: white; }
        ::-webkit-scrollbar-thumb { background: #0000FF; border-radius: 10px; border: 3px solid white; }
      `}</style>
    </div>
  );
}
