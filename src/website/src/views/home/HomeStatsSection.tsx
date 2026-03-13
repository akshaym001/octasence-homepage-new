'use client';

import type React from 'react';
import { useState } from 'react';

import { CustomButton } from '@/components/ui';
import mainConfig from '@/configs/mainConfigs';

import { Accordion } from './Accordion';
import { accordionItems, statItems } from './data';

const HomeStatsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'infrastructure' | 'analytics'>(
    'infrastructure',
  );

  return (
    <section className="py-8 px-4 w-full space-y-20 bg-[#ECF2FF]">
      <div className={`${mainConfig.containerClass} space-y-16`}>
        {/* Trusted by section */}
        <div className="text-center space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            TRUSTED BY INDUSTRY LEADERS
          </h3>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {['Mining Corp', 'InfraGroup', 'SafeBuild', 'GeoTech', 'IotWorks'].map(
              (name) => (
                <span
                  key={name}
                  className="text-gray-400 font-semibold text-lg opacity-60"
                >
                  {name}
                </span>
              ),
            )}
          </div>
        </div>

        <HeadingSection activeTab={activeTab} setActiveTab={setActiveTab} />
        <AccordionAndImageSection activeTab={activeTab} />
      </div>
      <StatisticsSection />
    </section>
  );
};

const HeadingSection: React.FC<{
  activeTab: 'infrastructure' | 'analytics';
  setActiveTab: (tab: 'infrastructure' | 'analytics') => void;
}> = ({ activeTab, setActiveTab }) => (
  <div className="text-center space-y-6">
    <h2 className="text-3xl lg:text-5xl font-bold">
      Real-Time Infrastructure <br /> Intelligence
    </h2>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
      OctaSence delivers continuous structural awareness by combining industrial
      IoT sensors, AI-driven analytics, and digital twin visualization.
    </p>
    <div className="flex justify-center items-center gap-0 relative">
      <CustomButton
        onClick={() => setActiveTab('infrastructure')}
        className={`px-6 py-3 ${
          activeTab === 'infrastructure'
            ? 'bg-[#2E3A59] text-white z-10 scale-105 rounded-xl'
            : 'bg-[#DFE8F9] text-[#2E3A59] -ml-1 rounded-l-xl'
        } border border-[#DFE8F9]`}
      >
        Infrastructure Monitoring
      </CustomButton>
      <CustomButton
        onClick={() => setActiveTab('analytics')}
        className={`px-6 py-3 ${
          activeTab === 'analytics'
            ? 'bg-[#2E3A59] text-white z-10 scale-105 rounded-xl'
            : 'bg-[#DFE8F9] text-[#2E3A59] -ml-1 rounded-r-xl'
        } border border-[#DFE8F9]`}
      >
        Predictive Analytics
      </CustomButton>
    </div>
  </div>
);

const AccordionAndImageSection: React.FC<{
  activeTab: 'infrastructure' | 'analytics';
}> = ({ activeTab }) => (
  <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
    <div className="lg:w-1/2 w-full">
      <Accordion items={accordionItems[activeTab]} />
    </div>
    <div className="lg:w-1/2 w-full rounded-lg">
      <div className="relative w-full h-[400px] overflow-hidden bg-gradient-to-br from-[#1a2744] to-[#2E3A59] rounded-xl flex items-center justify-center">
        {activeTab === 'infrastructure' ? (
          <div className="text-center text-white space-y-3 px-8">
            <div className="text-5xl mb-4">🔩</div>
            <p className="text-xl font-semibold">Structural Health Monitoring</p>
            <p className="text-sm text-blue-200 opacity-80">
              Real-time sensor data across mines, tunnels, and dams
            </p>
          </div>
        ) : (
          <div className="text-center text-white space-y-3 px-8">
            <div className="text-5xl mb-4">📊</div>
            <p className="text-xl font-semibold">AI Predictive Analytics</p>
            <p className="text-sm text-blue-200 opacity-80">
              Machine learning models detecting structural risks early
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const StatisticsSection: React.FC = () => {
  const formatStatValue = (value: number, key: string): string => {
    if (key === 'ai_analyses') return `${(value / 1000).toFixed(0)}K+`;
    return `${value}+`;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
      {statItems.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="h-[240px] p-6 bg-[#DFE8F9] rounded-lg flex flex-col justify-between items-start space-y-4"
          >
            <div className="text-left flex flex-col items-start">
              <p className="text-3xl font-bold">
                {formatStatValue(stat.value, stat.key)}
              </p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
              <IconComponent
                size={20}
                color={stat.color}
                className=""
                aria-label={stat.label}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeStatsSection;
