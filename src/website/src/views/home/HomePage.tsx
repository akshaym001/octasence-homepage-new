'use client';

import { motion, useInView } from 'framer-motion';
import React, { lazy, Suspense, useRef } from 'react';

import ReversibleContentSection from '@/components/sections/ReversibleContentSection';

import AnalyticsContentSection from './AnalyticsContentSection';
import HomePlayerSection from './HomePlayerSection';
import StatisticsSection from './HomeStatsSection';

// Optimized animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const HomePage = () => {
  const MotionSection = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: true,
      margin: '0px 0px -100px 0px',
      amount: 0.1,
    });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={sectionVariants}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <HomePlayerSection />

      {/* Statistics / Value Section */}
      <MotionSection>
        <StatisticsSection />
      </MotionSection>

      {/* Smart Infrastructure Sensors */}
      <MotionSection>
        <ReversibleContentSection
          title="Smart Infrastructure Sensors"
          subtitle="IoT Sensor Hardware"
          description="OctaSence deploys rugged industrial IoT sensors that capture strain, displacement, vibration, groundwater pressure, and environmental conditions. Built to withstand extreme environments across mines, tunnels, dams, and bridges — delivering continuous, reliable data streams."
          buttonText="Learn more"
          buttonLink="/products/sensors"
          imageUrl="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80"
          reverse={false}
          backgroundColor="bg-transparent"
        />
      </MotionSection>

      {/* AI Monitoring Platform */}
      <MotionSection>
        <AnalyticsContentSection
          title="An intelligent infrastructure monitoring platform"
          subtitle="AI Monitoring Platform"
          description="Access and visualize real-time and historical structural health data across your infrastructure portfolio through our AI-powered analytics dashboard. Detect anomalies, forecast risks, and act before failures happen."
          buttonText="Learn more"
          buttonLink="/products/platform"
          imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
          backgroundColor="bg-[#EDF3FF]"
          subtitleColor="text-black"
          subtitleBgColor="bg-white"
        />
      </MotionSection>

      {/* Developer Data APIs */}
      <MotionSection>
        <ReversibleContentSection
          title="Build with OctaSence infrastructure data"
          subtitle="Developer Data APIs"
          description="Are you a developer or systems integrator? Leverage our open infrastructure monitoring APIs to embed real-time structural health data into your own applications and workflows."
          buttonText="Get started"
          buttonLink="/products/api"
          imageUrl="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80"
          reverse={false}
          backgroundColor="bg-transparent"
          leftWidth="lg:w-1/3"
          rightWidth="lg:w-2/3"
        />
      </MotionSection>

      {/* Network Coverage / Deployment Map */}
      <MotionSection>
        <ReversibleContentSection
          title="Discover Our Deployment Coverage"
          subtitle="Deployment Map"
          description={
            <div>
              Explore the locations of our structural health monitoring systems
              deployed across industrial sites, mining operations, and critical
              infrastructure in Africa and beyond.
            </div>
          }
          buttonText="View Deployments"
          buttonLink="/solutions/deployments"
          imageUrl="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"
          backgroundColor="bg-transparent"
          reverse={true}
          imageClassName="object-cover rounded-xl"
        />
      </MotionSection>
    </div>
  );
};

export default HomePage;
