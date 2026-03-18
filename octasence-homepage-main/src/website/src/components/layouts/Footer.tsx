'use client';

import Link from 'next/link';
import React from 'react';
import { FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import mainConfig from '@/configs/mainConfigs';

import ScrollToTopButton from './ScrollToTopButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="WebsiteFooter"
      className={`relative py-8 px-4 ${mainConfig.containerClass} text-[14px]`}
    >
      <ScrollToTopButton />
      {/* Top Section with Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logo and Social Media */}
        <div className="flex flex-col space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-xl font-bold text-gray-900">OctaSence</span>
            </div>
            <h1 className="text-gray-700 font-semibold mt-4">
              AI-Powered Infrastructure Intelligence
            </h1>
          </div>
          <div className="flex space-x-4 mt-6">
            <Link
              href="https://www.linkedin.com/company/octasence"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 bg-blue-50 rounded-full p-2 hover:bg-blue-200 transition-all"
            >
              <FaLinkedinIn size={14} />
            </Link>
            <Link
              href="https://www.youtube.com/@octasence"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 bg-blue-50 rounded-full p-2 hover:bg-blue-200 transition-all"
            >
              <FaYoutube size={14} />
            </Link>
            <Link
              href="https://x.com/octasence"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-blue-600 bg-blue-50 rounded-full p-2 hover:bg-blue-200 transition-all"
            >
              <FaXTwitter size={14} />
            </Link>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {/* Platform Section */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/sensors" className="text-gray-600 hover:underline">
                  Smart Sensors
                </Link>
              </li>
              <li>
                <Link href="/products/platform" className="text-gray-600 hover:underline">
                  AI Platform
                </Link>
              </li>
              <li>
                <Link href="/products/api" className="text-gray-600 hover:underline">
                  Data APIs
                </Link>
              </li>
              <li>
                <Link href="/products/digital-twin" className="text-gray-600 hover:underline">
                  Digital Twin
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions Section */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800 mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/solutions-infrastructure-intelligence" className="text-gray-600 hover:underline">
                  Infrastructure Intelligence
                </Link>
              </li>
              <li>
                <Link href="/solutions/mining" className="text-gray-600 hover:underline">
                  Mining
                </Link>
              </li>
              <li>
                <Link href="/solutions/tunnels" className="text-gray-600 hover:underline">
                  Tunnels & Bridges
                </Link>
              </li>
              <li>
                <Link href="/solutions/dams" className="text-gray-600 hover:underline">
                  Dams & Reservoirs
                </Link>
              </li>
              <li>
                <Link href="/solutions/industrial" className="text-gray-600 hover:underline">
                  Industrial IoT
                </Link>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800 mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-gray-600 hover:underline">
                  About OctaSence
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-600 hover:underline">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers Section */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800 mb-4">Developers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/packages" className="text-gray-600 hover:underline">
                  SDKs & Packages
                </Link>
              </li>
              <li>
                <a
                  href="https://docs.octasence.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:underline"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/octasence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:underline"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 my-8"></div>

      {/* Footer Bottom Section */}
      <div className="flex flex-col text-sm lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div className="flex flex-wrap gap-4 text-center lg:text-left text-gray-600">
          &copy; {currentYear} OctaSence. All rights reserved.
          <Link href="/legal/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/legal/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
        <div className="text-gray-400 text-xs">
          AI-Powered Infrastructure Intelligence
        </div>
      </div>
    </footer>
  );
};

export default Footer;
