'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import mainConfig from '@/configs/mainConfigs';

import ScrollToTopButton from './ScrollToTopButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="WebsiteFooter"
      className={`relative py-10 px-4 ${mainConfig.containerClass} text-[14px]`}
    >
      <ScrollToTopButton />
      <div className="octa-card relative overflow-hidden rounded-[2rem] px-6 py-10 md:px-10">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(96,165,250,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute -top-20 right-0 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        {/* Top Section with Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Logo and Social Media */}
          <div className="flex flex-col space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/images/logo.avif"
                  alt="OctaSence logo"
                  width={72}
                  height={72}
                  className="h-[4.5rem] w-[4.5rem] rounded-2xl object-contain"
                />
              </div>
              <h1 className="text-white/72 font-semibold mt-4 max-w-md leading-relaxed">
                AI-Powered Infrastructure Intelligence
              </h1>
            </div>
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://www.linkedin.com/company/octasence"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 bg-white/5 border border-white/10 rounded-full p-2.5 hover:bg-white/10 transition-all"
              >
                <FaLinkedinIn size={14} />
              </Link>
              <Link
                href="https://www.youtube.com/@octasence"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 bg-white/5 border border-white/10 rounded-full p-2.5 hover:bg-white/10 transition-all"
              >
                <FaYoutube size={14} />
              </Link>
              <Link
                href="https://x.com/octasence"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-blue-300 bg-white/5 border border-white/10 rounded-full p-2.5 hover:bg-white/10 transition-all"
              >
                <FaXTwitter size={14} />
              </Link>
              <Link
                href="https://www.instagram.com/octasence"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-blue-300 bg-white/5 border border-white/10 rounded-full p-2.5 hover:bg-white/10 transition-all"
              >
                <FaInstagram size={14} />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {/* Platform Section */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-white mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products/sensors"
                    className="text-white/62 hover:text-white transition-colors"
                  >
                    Smart Sensors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/platform"
                    className="text-white/62 hover:text-white transition-colors"
                  >
                    AI Platform
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/api"
                    className="text-white/62 hover:text-white transition-colors"
                  >
                    Data APIs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/digital-twin"
                    className="text-white/62 hover:text-white transition-colors"
                  >
                    Digital Twin
                  </Link>
                </li>
              </ul>
            </div>

            {/* Solutions Section */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-white mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/solutions-infrastructure-intelligence"
                    className="text-white/62 hover:text-white transition-colors"
                  >
                    Infrastructure Intelligence
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/mining"
                    className="text-white/62 hover:text-white transition-colors"
                  >
                    Mining
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/tunnels"
                    className="text-white/62 hover:text-white transition-colors"
                  >
                    Tunnels & Bridges
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/dams"
                    className="text-white/62 hover:text-white transition-colors"
                  >
                    Dams & Reservoirs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions/industrial"
                    className="text-white/62 hover:text-white transition-colors"
                  >
                    Industrial IoT
                  </Link>
                </li>
              </ul>
            </div>

            {/* About Section */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-white mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about-us"
                    className="text-white/62 hover:text-white transition-colors"
                  >
                    About OctaSence
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-white/62 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white/62 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press"
                    className="text-white/62 hover:text-white transition-colors"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 my-8"></div>

        {/* Footer Bottom Section */}
        <div className="relative z-10 flex flex-col text-sm lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div className="flex flex-wrap gap-4 text-center lg:text-left text-white/58">
            &copy; {currentYear} OctaSence. All rights reserved.
            <Link
              href="/legal/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="text-white/38 text-xs tracking-[0.2em] uppercase">
            AI-Powered Infrastructure Intelligence
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
