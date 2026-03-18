'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';

// ============================================================
// DATA
// ============================================================

const modules = [
  {
    number: '01',
    title: 'Intelligent Sensing & Data Foundation',
    description:
      'OctaSence deploys rugged, low-cost multimodal sensors to continuously capture movement, stress, vibration, seepage, and deformation across critical infrastructure. Edge-first architecture with mesh, LoRaWAN, and satellite connectivity ensures reliable data flow even in remote and underground environments.',
    image: '/assets/images/products-dashboard.avif',
    accent: '#2563EB',
    tags: ['Multimodal IoT', 'Edge-First', 'LoRaWAN', 'Satellite'],
  },
  {
    number: '02',
    title: 'Agentic AI & Predictive Intelligence',
    description:
      'Autonomous AI agents learn normal structural behavior and identify early deviations that signal potential failures. By combining time-series forecasting and multi-sensor fusion, OctaSence predicts collapses, instability, seepage, and deformation hours to days in advance.',
    image: '/assets/images/products-dashboard2.avif',
    accent: '#0000FF',
    tags: ['Autonomous Agents', 'Time-Series', 'Multi-Sensor Fusion', 'Prediction'],
  },
  {
    number: '03',
    title: 'Digital Twin & Situational Awareness',
    description:
      'Live 2D and 3D digital twins transform sensor and AI outputs into intuitive visual representations of infrastructure health. Heatmaps, simulations, and incident replays enable faster understanding, better planning, and proactive risk mitigation.',
    image: '/assets/images/products-twin.avif',
    accent: '#0EA5E9',
    tags: ['2D / 3D Twins', 'Heatmaps', 'Simulations', 'Incident Replay'],
  },
  {
    number: '04',
    title: 'Automated Safety, Alerts & Compliance',
    description:
      'AI-driven risk scoring automatically triggers intelligent alerts through dashboards, WhatsApp, SMS, and email. Built-in escalation workflows and auto-generated DGMS, BIS, and ISO-ready reports simplify compliance while accelerating safety response.',
    image: '/assets/images/products-audit.avif',
    accent: '#6366F1',
    tags: ['Risk Scoring', 'Multi-Channel Alerts', 'DGMS / BIS / ISO', 'Auto-Reports'],
  },
];

const howSteps = [
  {
    number: '1',
    title: 'Sensors Capture Field Data',
    description:
      'Multimodal sensors continuously capture deformation, vibration, groundwater, pressure, temperature, and displacement across critical structures.',
    icon: '📡',
  },
  {
    number: '2',
    title: 'Data Processing Layer',
    description:
      'Edge devices clean, validate, and preprocess data locally, ensuring reliability and continuity even in low-connectivity environments.',
    icon: '⚡',
  },
  {
    number: '3',
    title: 'AI Prediction Layer',
    description:
      'Autonomous AI agents analyze patterns, forecast risk progression, and compute real-time structural stability scores.',
    icon: '🧠',
  },
  {
    number: '4',
    title: 'Digital Twin & Dashboards',
    description:
      'Live 2D and 3D dashboards translate AI insights into intuitive views of structural health and risk zones.',
    icon: '🖥️',
  },
  {
    number: '5',
    title: 'Act with Intelligent Alerts',
    description:
      'Context-aware alerts automatically notify teams and command centers through predefined escalation workflows.',
    icon: '🔔',
  },
  {
    number: '6',
    title: 'Reports & Continuous Learning',
    description:
      'AI models retrain using historical trends and new incidents, improving accuracy and prediction lead time over time.',
    icon: '📊',
  },
];

// ============================================================
// HERO SPARKS
// ============================================================
const HeroSparks = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.6), transparent)',
          top: `${15 + i * 14}%`,
          width: '15%',
        }}
        initial={{ left: '-20%', opacity: 0 }}
        animate={{ left: '120%', opacity: [0, 0.5, 0.5, 0] }}
        transition={{
          duration: 5 + (i % 3) * 2,
          repeat: Infinity,
          ease: 'linear',
          delay: i * 1.6,
        }}
      />
    ))}
  </div>
);

// ============================================================
// HERO
// ============================================================
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Parallax BG */}
      <motion.div
        className="absolute inset-0"
        style={{
          y,
          backgroundImage: "url('/assets/images/products-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }}
      />
      <HeroSparks />

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm font-bold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Next-Gen AI Platform
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
            Agentic AI{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#0000FF] italic">
              Infrastructure
            </span>{' '}
            Intelligence
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/75 font-bold max-w-3xl mx-auto mb-10 leading-relaxed">
            From sensing to prediction to action.
          </p>

          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block px-12 py-4 bg-[#0000FF] text-white font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-900/40 text-base"
            >
              Request Demo
            </Link>
            <Link
              href="/solutions-infrastructure-intelligence"
              className="flex items-center gap-2 text-white/80 hover:text-white font-bold text-base transition-colors duration-200 group"
            >
              Explore Solutions
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-white/40 text-xs font-bold tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Deep multi-stop fade into the dark modules section */}
      <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #07070f 0%, #07070fcc 40%, #07070f66 65%, transparent 100%)',
        }}
      />
    </section>
  );
}

// ============================================================
// GRID MODULE CARD
// ============================================================
function GridModuleCard({ mod, index }: { mod: (typeof modules)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0a0a14] group"
      style={{
        boxShadow: hovered ? `0 0 40px ${mod.accent}22` : 'none',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-all duration-500"
        style={{ boxShadow: hovered ? `inset 0 0 0 1.5px ${mod.accent}55` : 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}
      />

      {/* Image — full, uncropped */}
      <div className="relative w-full bg-[#0a0a14] overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={mod.image}
          alt={mod.title}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Bottom fade into content area */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0a14] to-transparent" />
        {/* Subtle top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
          style={{ background: hovered ? `linear-gradient(90deg, transparent, ${mod.accent}, transparent)` : 'transparent' }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Badge + divider */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0 transition-all duration-300"
            style={{
              background: hovered ? `linear-gradient(135deg, ${mod.accent}, ${mod.accent}88)` : 'rgba(255,255,255,0.07)',
              color: hovered ? '#fff' : 'rgba(255,255,255,0.3)',
              boxShadow: hovered ? `0 0 16px ${mod.accent}77` : 'none',
            }}
          >
            {mod.number}
          </div>
          <div
            className="h-px flex-1 transition-all duration-500"
            style={{
              background: hovered
                ? `linear-gradient(90deg, ${mod.accent}88, transparent)`
                : 'linear-gradient(90deg, rgba(255,255,255,0.07), transparent)',
            }}
          />
        </div>

        <h3
          className="text-lg font-black text-white leading-tight mb-3 tracking-tight transition-colors duration-300"
          style={{ color: hovered ? '#fff' : 'rgba(255,255,255,0.9)' }}
        >
          {mod.title}
        </h3>

        <p className="text-white/45 text-sm leading-relaxed mb-5 font-medium flex-1">
          {mod.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {mod.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-bold px-2.5 py-1 rounded-md transition-all duration-300"
              style={{
                color: hovered ? mod.accent : 'rgba(255,255,255,0.3)',
                border: `1px solid ${hovered ? mod.accent + '44' : 'rgba(255,255,255,0.07)'}`,
                background: hovered ? `${mod.accent}10` : 'transparent',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// PRODUCT MODULES SECTION — 2x2 grid
// ============================================================
function TabbedModules() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section className="py-32 bg-[#07070f] relative overflow-hidden" style={{ marginTop: '-1px' }}>
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(96,165,250,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] rounded-full blur-[100px] opacity-10 bg-blue-600 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#07070f]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Platform
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            Product Modules &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#6366F1]">
              Features
            </span>
          </h2>
          <p className="text-white/40 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            A unified Agentic AI platform for real-time infrastructure intelligence. Built for
            underground, remote, and high-risk environments with edge-first intelligence, digital
            twins, and autonomous safety agents.
          </p>
          <div className="w-24 h-[3px] bg-gradient-to-r from-blue-500 to-[#6366F1] mx-auto rounded-full mt-10" />
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {modules.map((mod, index) => (
            <GridModuleCard key={mod.number} mod={mod} index={index} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  );
}

// ============================================================
// HOW IT WORKS — STEP
// ============================================================
function HowStep({ step, index }: { step: (typeof howSteps)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-start gap-6 p-8 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,255,0.07)] transition-all duration-400 group cursor-default"
    >
      {/* Number circle */}
      <div className="relative flex-shrink-0">
        <motion.div
          animate={hovered ? { scale: 1.15, backgroundColor: '#0000FF' } : { scale: 1, backgroundColor: '#EEF2FF' }}
          transition={{ duration: 0.3 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl"
          style={{ color: hovered ? '#fff' : '#0000FF' }}
        >
          {step.number}
        </motion.div>
        {/* Connector line — not on last */}
        {index < howSteps.length - 1 && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-blue-200 to-transparent" />
        )}
      </div>

      <div className="pt-1">
        <h4 className="text-lg font-black text-gray-900 mb-2 tracking-tight group-hover:text-[#0000FF] transition-colors duration-300">
          {step.title}
        </h4>
        <p className="text-gray-500 text-sm leading-relaxed font-medium">{step.description}</p>
      </div>
    </motion.div>
  );
}

// ============================================================
// REUSABLE IMAGE PANEL
// ============================================================
function HowImage({ src, alt, gradientFrom, gradientTo, delay = 0 }: {
  src: string; alt: string; gradientFrom: string; gradientTo: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group h-full min-h-[320px]"
    >
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
      />
      <img
        src={src}
        alt={alt}
        className="relative w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-blue-900/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    </motion.div>
  );
}

// ============================================================
// HOW OCTASENCE WORKS SECTION
// ============================================================
function HowItWorks() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  const stepsTop = howSteps.slice(0, 3);    // 1–3
  const stepsBottom = howSteps.slice(3, 6); // 4–6

  return (
    <section className="py-32 bg-gray-950 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(96,165,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Blue glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-10 bg-blue-600" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Workflow
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            How{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#6366F1]">
              OctaSence
            </span>{' '}
            Works
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            From sensing to prediction to action — continuously.
          </p>
          <div className="w-24 h-2.5 bg-gradient-to-r from-blue-500 to-[#6366F1] mx-auto rounded-full mt-10" />
        </motion.div>

        {/* ── ROW 1: Image left | Steps 1–3 right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-10">
          <HowImage
            src="/assets/images/how-architecture.png"
            alt="OctaSence Sensing Architecture"
            gradientFrom="#0a0a1a"
            gradientTo="#0d1b4b"
            delay={0}
          />
          <div className="flex flex-col gap-1 justify-center">
            {stepsTop.map((step, i) => (
              <HowStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* ── ROW 2: Steps 4–6 left | Image right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div className="flex flex-col gap-1 justify-center">
            {stepsBottom.map((step, i) => (
              <HowStep key={step.number} step={step} index={i + 3} />
            ))}
          </div>
          <HowImage
            src="/assets/images/how-dashboard.png"
            alt="OctaSence Digital Twin Dashboard"
            gradientFrom="#0d1033"
            gradientTo="#1a0a3b"
            delay={0.1}
          />
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-20"
        >
          <Link
            href="/contact"
            className="inline-block px-14 py-5 bg-[#0000FF] text-white font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/40"
          >
            Request a Live Demo
          </Link>
        </motion.div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

// ============================================================
// PAGE
// ============================================================
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#0000FF] selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="relative">
        <Hero />
        <TabbedModules />
        <HowItWorks />
      </main>

      <Footer />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800;900&display=swap');
        body { font-family: 'Outfit', sans-serif; }
      `}</style>
    </div>
  );
}