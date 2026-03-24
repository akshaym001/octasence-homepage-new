'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import ScrollToTopButton from './ScrollToTopButton';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="WebsiteFooter"
      className="relative py-14 px-6 w-full text-[15px]"
    >
      <ScrollToTopButton />

      <div className="octa-card relative w-full overflow-hidden rounded-[2rem] px-8 py-12 md:px-14">
        
        {/* Background Effects */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(96,165,250,0.8) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute -top-20 right-0 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

        {/* Top Section */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          <div className="flex flex-col items-center text-center space-y-6 lg:col-span-1">
            <Image
              src="/assets/images/logo.avif"
              alt="OctaSence logo"
              width={160}
              height={96}
              className="h-24 w-auto object-contain"
            />

            <p className="text-white/70 font-medium text-base leading-relaxed">
              AI-Powered Infrastructure Intelligence for the world's most critical assets.
            </p>

            <div className="flex space-x-4 pt-1">
              <Link href="https://www.linkedin.com/company/octasence" target="_blank"
                className="text-blue-300 bg-white/5 border border-white/10 rounded-full p-4 hover:bg-white/10 hover:scale-110 transition-all">
                <FaLinkedinIn size={28} />
              </Link>
              <Link href="https://www.youtube.com/@octasence" target="_blank"
                className="text-blue-300 bg-white/5 border border-white/10 rounded-full p-4 hover:bg-white/10 hover:scale-110 transition-all">
                <FaYoutube size={28} />
              </Link>
              <Link href="https://x.com/octasence" target="_blank"
                className="text-blue-300 bg-white/5 border border-white/10 rounded-full p-4 hover:bg-white/10 hover:scale-110 transition-all">
                <FaXTwitter size={28} />
              </Link>
              <Link href="https://www.instagram.com/octasence" target="_blank"
                className="text-blue-300 bg-white/5 border border-white/10 rounded-full p-4 hover:bg-white/10 hover:scale-110 transition-all">
                <FaInstagram size={28} />
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-bold text-white text-xl mb-6">Platform</h3>
            <ul className="space-y-4 text-base">
              <li><Link href="/products-infrastructure-intelligence" className="text-white/85 hover:text-white">Smart Sensors</Link></li>
              <li><Link href="/products-infrastructure-intelligence" className="text-white/85 hover:text-white">AI Platform</Link></li>
              <li><Link href="/products-infrastructure-intelligence" className="text-white/85 hover:text-white">Data APIs</Link></li>
              <li><Link href="/products-infrastructure-intelligence" className="text-white/85 hover:text-white">Digital Twin</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-bold text-white text-xl mb-6">Solutions</h3>
            <ul className="space-y-4 text-base">
              <li><Link href="/solutions-infrastructure-intelligence" className="text-white/85 hover:text-white">Infrastructure Intelligence</Link></li>
              <li><Link href="/solutions-infrastructure-intelligence" className="text-white/85 hover:text-white">Mining</Link></li>
              <li><Link href="/solutions-infrastructure-intelligence" className="text-white/85 hover:text-white">Tunnels & Bridges</Link></li>
              <li><Link href="/solutions-infrastructure-intelligence" className="text-white/85 hover:text-white">Dams & Reservoirs</Link></li>
              <li><Link href="/solutions-infrastructure-intelligence" className="text-white/85 hover:text-white">Industrial IoT</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold text-white text-xl mb-6">About</h3>
            <ul className="space-y-4 text-base">
              <li><Link href="/about-us" className="text-white/85 hover:text-white">About OctaSence</Link></li>
              <li><Link href="/careers" className="text-white/85 hover:text-white">Careers</Link></li>
              <li><Link href="/contact" className="text-white/85 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>

      

        {/* Divider */}
        <div className="relative z-10 border-t border-white/10 my-10"></div>
        

              
        <div className="relative z-10 flex flex-col items-center gap-4 text-center text-[14px] md:text-[15px]">

          {/* Disclaimer BELOW */}
          <p className="max-w-3xl text-white/50 text-sm leading-relaxed">
            <span className="font-semibold text-white/70">Disclaimer:</span>{' '}
            OctaSence strives to provide accurate and up-to-date information; however, we are not liable for any discrepancies in project details, pricing, or specifications. Users are strongly advised to verify all information through official documentation and consult directly with our team before making any investment or implementation decisions.
          </p>
          {/* Top Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-white/60">
            
            <span>© {currentYear} OctaSence. All rights reserved.</span>

            <span className="text-white/30">|</span>

            <Link href="/legal/terms-of-service" className="hover:text-white transition">
              Terms of Service
            </Link>

            <span className="text-white/30">|</span>

            <Link href="/legal/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
          </div>

          {/* Tagline */}
          <div className="text-white/40 text-xs md:text-sm tracking-[0.25em] uppercase pt-2">
            AI-Powered Infrastructure Intelligence
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;