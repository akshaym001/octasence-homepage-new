'use client';

import { isBefore, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  FiArrowRight,
  FiBookOpen,
  FiDollarSign,
  FiHome,
  FiMonitor,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';

import mainConfig from '@/configs/mainConfigs';
import { useCareers, useDepartments } from '@/hooks/useApiHooks';

// Helper component for the 3D Canvas Globe
const Globe: React.FC<{ rotationOffset: number; isDragging: boolean }> = ({
  rotationOffset,
  isDragging,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rotationRef = React.useRef(0);
  const dragOffsetRef = React.useRef(0);

  const dots = React.useMemo(() => {
    const points: {
      x: number;
      y: number;
      z: number;
      type: 'land' | 'ocean';
    }[] = [];
    const count = 3500;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const lat = (phi * 180) / Math.PI - 90;
      const lon = (((theta * 180) / Math.PI) % 360) - 180;
      const isLand =
        (lon > -130 && lon < -35 && lat > -55 && lat < 75) || // Americas
        (lon > -10 && lon < 150 && lat > 15 && lat < 78) || // Eurasia
        (lon > -20 && lon < 55 && lat > -38 && lat < 38) || // Africa
        (lon > 95 && lon < 155 && lat > -48 && lat < 5) || // Australia & Indonesia
        (lon > -30 && lon < -10 && lat > 60 && lat < 85) || // Greenland
        lat > 75 ||
        lat < -80;

      points.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
        type: isLand ? 'land' : 'ocean',
      });
    }
    return points;
  }, []);

  const locations = [
    { name: 'London', lat: 51.5, lon: -0.11 },
    { name: 'US', lat: 39.0, lon: -98.0 },
    { name: 'India', lat: 28.6, lon: 77.2 },
    { name: 'Australia', lat: -33.8, lon: 151.2 },
    { name: 'Asia', lat: 35.0, lon: 105.0 },
  ];

  React.useEffect(() => {
    dragOffsetRef.current = rotationOffset;
  }, [rotationOffset]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationId: number;
    const render = () => {
      ctx.fillStyle = '#060814';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const radius = canvas.width * 0.4;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      if (!isDragging) rotationRef.current += 0.003;
      const rot = rotationRef.current + dragOffsetRef.current;
      const cosY = Math.cos(rot);
      const sinY = Math.sin(rot);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const rz = dot.x * sinY + dot.z * cosY;
        if (rz > -0.05) {
          const rx = dot.x * cosY - dot.z * sinY;
          const scale = (rz + 2) / 2.5;
          const px = centerX + rx * radius * scale;
          const py = centerY + dot.y * radius * scale;

          ctx.beginPath();
          ctx.arc(px, py, 1.2 * scale, 0, 7);
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = 0.25 + (rz + 0.1) * 0.7; // Consistent glowing white
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      locations.forEach((loc) => {
        const phi = (90 - loc.lat) * (Math.PI / 180);
        const theta = (loc.lon + 180) * (Math.PI / 180);
        const dx = Math.sin(phi) * Math.cos(theta);
        const dy = Math.cos(phi);
        const dz = Math.sin(phi) * Math.sin(theta);
        const rz = dx * sinY + dz * cosY;
        if (rz > 0.15) {
          const rx = dx * cosY - dz * sinY;
          const scale = (rz + 2) / 2.5;
          const px = centerX + rx * radius * scale;
          const py = centerY + dy * radius * scale;
          ctx.beginPath();
          ctx.arc(px, py, 8 * scale, 0, 7);
          ctx.strokeStyle = 'rgba(79, 70, 229, 0.5)';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(px, py, 4 * scale, 0, 7);
          ctx.fillStyle = '#6366f1';
          ctx.fill();
        }
      });
      animationId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationId);
  }, [isDragging, dots]);

  return (
    <div
      className="w-full flex justify-center"
      style={{
        maskImage:
          'radial-gradient(circle, rgb(0, 0, 0) 65%, rgba(0, 0, 0, 0) 75%)',
        WebkitMaskImage:
          'radial-gradient(circle, rgb(0, 0, 0) 65%, rgba(0, 0, 0, 0) 75%)',
      }}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={800}
        className="w-full max-w-[600px] aspect-square"
      />
    </div>
  );
};

const CareerPage: React.FC = () => {
  const router = useRouter();
  const {
    data: departmentsPage,
    isLoading: departmentsLoading,
    error: departmentsError,
  } = useDepartments();

  const departments = departmentsPage?.results ?? [];

  const {
    data: careersData,
    error: careersError,
    isLoading: careersLoading,
  } = useCareers();

  const careers = careersData?.results ?? [];

  const [selectedDepartmentId, setSelectedDepartmentId] =
    useState<string>('all'); // Default to All

  // Add "Open Positions" to the departments list
  const allDepartments = [
    { id: 'all', name: 'Open Positions' },
    ...(departments || []),
  ];

  // Function to check if the position is still open (closing date in the future)
  const isJobOpen = (closingDate?: string) => {
    if (!closingDate) return false; // treat missing dates as closed
    try {
      return isBefore(new Date(), parseISO(closingDate));
    } catch {
      return false;
    }
  };

  // Filter jobs based on the selected department ID and show only open positions
  const filteredJobs = (careers ?? []).filter((career: any) => {
    const isOpen = isJobOpen(career.closing_date);
    if (selectedDepartmentId === 'all') return isOpen;
    return isOpen && career.department?.id == selectedDepartmentId;
  });

  // Group the jobs by department and filter only open jobs
  const groupedJobsByDepartment = filteredJobs?.reduce((acc: any, job: any) => {
    // Fix: job.department is already an object with name property
    const departmentName = job.department?.name || 'Open Positions';
    if (!acc[departmentName]) {
      acc[departmentName] = { jobs: [], openCount: 0 };
    }
    acc[departmentName].openCount++;
    acc[departmentName].jobs.push(job);
    return acc;
  }, {});

  // Show loading skeletons
  const isLoading = departmentsLoading || careersLoading;

  const scrollToPositions = () => {
    const element = document.getElementById('open-positions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotation((prev) => prev + deltaX * 0.5);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    setRotation((prev) => prev + deltaX * 0.5);
    setStartX(e.touches[0].clientX);
  };

  React.useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      if (!isDragging) {
        setRotation((prev) => prev - 0.2); // Slow continuous rotation
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]);

  // Helper component for the Smoky Wavy Background (Clarity AI Style)
  const AtmosphericWaves: React.FC = () => {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Drifting smoky waves using multiple pulsing gradients */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: ['-10%', '10%', '-10%'],
            y: ['-5%', '5%', '-5%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_30%_50%,#4338ca_0%,transparent_50%)] opacity-30 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: ['10%', '-10%', '10%'],
            y: ['5%', '-5%', '5%'],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_70%_50%,#3b82f6_0%,transparent_50%)] opacity-20 blur-[120px]"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,#6d28d9_0%,transparent_60%)] opacity-20 blur-[100px]"
        />
      </div>
    );
  };

  const heroTokens = {
    '--one-if-corner-shape-supported': '1',
    '--token-cb8209da-8051-4a3b-bfa9-87d81860acc3': '#4338ca',
    '--token-4893be83-88df-4c84-bde8-3de2b5a6c676': '#494653',
    '--token-b5183901-0a66-400e-880f-c139ff946dde': '#fff',
    '--token-996deaa1-6825-460d-a858-243e3773b7ac': '#f9f9fa',
    '--token-34fca127-d611-42f2-b6c2-ee0c0eefb4eb': '#e4e3e8',
    '--token-adbfe748-a134-4d73-ae03-1138ba9592cc': '#cac8d0',
    '--token-754ccb61-ea6c-4d3f-a564-f113327a7561': '#afacb9',
    '--token-88eed855-8902-4f8a-a4f4-ef8690b82bd7': '#9491a1',
    '--token-0810284e-1cf9-45e3-b381-eef5606665dd': '#7a758a',
    '--token-6ca2c82e-8d2f-43b6-bc9e-45fc76696b1c': '#615e6e',
    '--token-35fdecc6-d7da-4aec-8e76-7fd2203c8ffd': '#494653',
    '--token-eb70773d-b598-407c-bc75-4835932e7ce3': '#312f37',
    '--token-c33dfd80-9530-420f-9825-4f2a66ece609': '#18171c',
    '--token-2b6b23b6-3d76-4ab1-9c3c-5055ff44402d': '#000',
    '--token-5088e1ff-b82c-40f4-a6bc-9e804d812b8e': '#3d46ab',
    '--token-c5390b9f-c692-4dbd-bd2b-40e966fa4727': '#0b0b0b',
    '--token-2f81d73c-20a2-4e2d-a7bc-9b7126b411af': '#3a3a3a',
    '--token-0ea8dfc1-ca0e-48a4-813d-2dd4dccaabb2': '#facb55',
    '--token-c92ff69b-57f6-4cd9-8512-f2c55409aebe': '#fff',
    '--token-f2123b4b-ec3a-4deb-8516-dff3a5af1bcd': '#312f3bcc',
    '--token-3b54190e-95ec-400c-823e-e6f0c9789318': '#1e1e24',
    '--token-bd6e5ecd-bc9b-4026-af3e-83771359e420': '#1a191f',
    '--token-e7c30873-9453-4dc1-861d-8429901af919': '#18171c',
    '--token-8f554c6c-754b-4a3c-8c22-a61bdf8d7032': '#18171c',
    '--token-cbd02415-6fee-400c-b14a-d96e0338ce5b': '#494653',
    '--token-b8fd561d-807e-4965-aa9d-02ee8809dbbe': '#615e6e',
    '--token-412b4e8c-cd14-4fd2-a3a5-4efe51adce96': '#7a758a',
    '--token-853df5ec-5532-4ad3-89b3-d3c31645e309': '#9491a1',
    '--token-329aeaf0-bc97-4996-b909-eef5a15f90d2': '#afacb9',
    '--token-5607f2bb-dcfd-4ab3-9316-925a0706988f': '#312f37',
    '--token-d73eb1df-b6db-4edf-9a36-23d4ee3abf5c': '#494653',
    '--token-c68a7105-83d5-4316-8aa0-83aedc7cd88a': '#18171c',
    '--token-a7a902a2-86d6-44c7-8883-d028a23b7c2f': '#312f37',
    '--token-3a2e865d-b12b-4b19-819d-49bfd5924ea5': '#a5b4fc',
    '--token-bb06f9bf-0334-460b-b819-5d2a4e94f75b': '#f9f9fa',
    '--token-10893c5c-344c-4c64-8a6b-c17152a6bb05': '#f9f9fa',
    '--token-033d2306-b42c-4474-afd8-0c14b709d6bc': '#cac8d0',
    '--token-62900746-e400-49f6-9821-cf61f860385d': '#afacb9',
    '--token-5d189f45-34e6-4416-b06a-06a21775740c': '#a5b4fc',
    '--token-5245ea07-aaea-4b2e-b250-a12453b66597': '#c7d2fe',
    '--token-4adf7337-599f-42fa-8d77-0290e001e3a9': '#c7d2fe',
    '--token-e2d62197-95c0-4daf-9829-aab08801756a': '#9491a1',
    '--token-b758118e-5652-476c-9e00-22d74ee5e277': '#a5b4fc',
    '--token-24081a5b-12b1-43f6-b9c3-9b3133c7e95c': '#e879f9',
    '--token-7d4adbef-4eab-4b94-ad27-580c9e4f6ff1': '#a5b4fc',
    '--token-c496e47c-bf18-4286-b25e-6da007b35b9c': '#18171c',
    '--token-b18b941f-a6e7-4343-9303-8db0697a37fd': '#6ee7b7',
    '--token-6da26d25-5f6b-4c61-9b58-4af8ddb21d3f': '#fcd34d',
    '--token-b7f99b90-dbc8-42e3-aca1-69bf68d052e4': '#7dd3fc',
    '--token-48f2cd67-228b-4101-8b67-64228ae9f83d': '#fca5a5',
    '--token-393f67de-7778-4316-a650-293fa138b0a4': '#6366f1',
    '--token-987d3f9b-f5e5-4bed-bab2-628bb5ff617e': '#818cf8',
    '--token-df692ae0-f133-4cc9-a995-b6d0f7564321': '#494653',
    '--token-ef2d8824-4d18-4974-ae40-ab4c48a88a8e': '#615e6e',
    '--token-ca67cca8-ead4-4ab5-ac8c-b6f051ccc307': '#615e6e',
    '--token-8fe6caa4-3381-46f9-b524-a2679891d1ee': '#818cf8',
    '--token-cf5030b6-e4c6-46f3-915a-4faaaed2e83d': '#6366f1',
    '--token-1fa90170-bd45-4e72-9426-aad78ed58e9c': '#615e6e',
    '--token-c29d3f96-2e68-4613-a939-96ed1ab95141': '#a5b4fc',
    '--token-120917c5-54be-4fca-84fc-78e8af8bd83c': '#cac8d0',
    '--token-ac7316e1-e582-4898-86c6-b7c0dad4ecb9': '#7a758a',
    '--token-0ee649ee-70e7-4f9e-b94a-bc116942d1d2': '#fca5a5',
    '--token-a5268428-c647-45c5-959e-07d7239e0ff1': '#afacb9',
    '--token-8f5a2091-3ae6-4730-be4f-3cbb06878c29': '#afacb9',
    '--token-3f71e348-ac23-430f-a7d4-5f7f9a340eff': '#064e3b',
    '--token-4be6f17a-2814-484a-9df6-576d591ab8fc': '#6ee7b7',
    '--token-f051b0c3-a5eb-471b-8360-18108c5552dd': '#ecfdf5',
    '--token-b933033c-45a2-4d3b-9ac6-7d1a54ee8d4e': '#7c2d12',
    '--token-d53b8e73-c418-4bac-8135-5cb6c810a4c3': '#fcd34d',
    '--token-90f3aac5-697a-4218-9a39-e60b494082d0': '#fffbeb',
    '--token-51cbe4b0-59e6-4af5-932b-b694e29785e5': '#0c4a6e',
    '--token-1fac0c07-0985-468f-8509-c6da1a159540': '#7dd3fc',
    '--token-bbb259bb-fbec-4eb7-8fbc-7eea2883db02': '#f0f9ff',
    '--token-bb24b5f5-a82c-4acf-849f-6a2b6831442f': '#7f1d1d',
    '--token-7462edb8-2dfd-4d30-b84a-173911a95b11': '#fca5a5',
    '--token-2b6894ce-240f-4c21-916d-0cf441fbf7f3': '#fef2f2',
    '--token-662a2ebd-663f-444c-a455-a7933c25ecf2': '#fecaca',
  } as React.CSSProperties;

  return (
    <div className="flex flex-col w-full bg-[#060814]">
      {/* Header Section / First Page */}
      <header
        className="relative overflow-hidden w-full flex flex-col items-center justify-center gap-6 py-20 md:py-40 px-4 text-center"
        style={{
          ...heroTokens,
          fontFamily: 'sans-serif',
          boxSizing: 'border-box',
          WebkitFontSmoothing: 'inherit',
          position: 'relative',
          height: 'min-content',
        }}
      >
        {/* Animated Background Gradients with Video, Waves and Spark */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Background Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
          >
            <source src="/videos/career_bg.mp4" type="video/mp4" />
          </video>

          <AtmosphericWaves />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full" />
          <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-8 md:space-y-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase animate-fade-in mx-auto">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
            Careers at Octasence
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Engineering Agentic{' '}
            <span className="text-blue-500">Infrastructure</span>
          </h1>

          <p className="text-lg md:text-2xl text-blue-500 font-serif italic font-bold tracking-[0.1em] opacity-95 animate-fade-in-up">
            Seeing the Unseen, Preventing the Unthinkable.
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-base md:text-xl text-gray-400 font-medium leading-relaxed italic px-4">
              &quot;Architecting Intelligent Infrastructure for the Agentic AI
              Era. <br className="hidden md:block" /> Join the{' '}
              <span className="text-white font-bold not-italic">Octasence</span>{' '}
              engineering team.&quot;
            </p>
            <p className="text-[10px] md:text-base text-gray-500 tracking-widest uppercase">
              Excellence is our standard &bull; Octasence is our mission
            </p>
          </div>

          <div className="pt-4 md:pt-6">
            <button
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/company/octasence/jobs/',
                  '_blank',
                )
              }
              className="group relative px-8 py-4 md:px-10 md:py-5 bg-[#4338ca] hover:bg-[#3d46ab] text-white rounded-full font-black text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_20px_50px_rgba(67,56,202,0.4)] flex items-center gap-4 mx-auto"
            >
              Open Positions
              <FiArrowRight
                size={24}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="open-positions"
        className={`space-y-12 md:space-y-24 w-full py-16 md:py-24 ${mainConfig.containerClass} relative`}
      >
        {/* Benefits Section as a single whole card */}
        <div className="px-4 lg:px-8 pb-10 md:pb-20">
          <div
            className="relative bg-white/[0.02] border border-white/10 p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] overflow-hidden"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Subtle card background glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Benefits
              </h2>
              <div className="h-1.5 w-16 md:w-24 bg-indigo-600 rounded-full" />
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-12 gap-x-16">
              {[
                { icon: <FiDollarSign />, text: 'Competitive salary' },
                { icon: <FiTrendingUp />, text: 'Opportunities for growth' },
                { icon: <FiHome />, text: 'Work from home' },
                { icon: <FiShield />, text: 'Mental well-being' },
                { icon: <FiMonitor />, text: 'Inclusive workplace' },
                { icon: <FiUsers />, text: 'Team-building events' },
                { icon: <FiBookOpen />, text: 'Learning & Development' },
                { icon: <FiStar />, text: 'Great culture' },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-6 md:gap-8 group animate-fade-in-up"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 flex-shrink-0">
                    {React.cloneElement(benefit.icon as React.ReactElement, {
                      size: 28,
                    })}
                  </div>
                  <span className="text-lg md:text-2xl font-bold text-gray-300 group-hover:text-white transition-colors duration-300">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Big Premium Section Divider */}
        <div className="w-full flex justify-center pt-4 pb-4 md:pt-8 md:pb-8 pointer-events-none">
          <div className="relative w-4/5 h-[2px] bg-gradient-to-r from-transparent via-indigo-600 to-transparent">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60px] md:h-[100px] bg-indigo-500/10 blur-[80px] md:blur-[100px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-64 h-[20px] md:h-[30px] bg-indigo-400/20 blur-xl md:blur-2xl rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-white shadow-[0_0_20px_rgba(129,140,248,1)]" />
          </div>
        </div>

        {/* Globe Section */}
        <div className="flex flex-col items-center justify-center text-center pt-0 pb-8 md:pb-12 px-4 space-y-6 md:space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Join us <span className="text-indigo-400">across the globe</span>
          </h2>

          <div
            className="relative w-full flex justify-center items-center group cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <div className="scale-75 md:scale-100 transition-transform duration-500">
              <Globe rotationOffset={rotation * 0.01} isDragging={isDragging} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
