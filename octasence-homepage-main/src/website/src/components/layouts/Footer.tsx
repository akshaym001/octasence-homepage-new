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
          
          {/* Logo + Description + Social — spans 1 col */}
          <div className="flex flex-col items-center text-center space-y-6 lg:col-span-1">
            
            {/* Logo */}
            <Image
              src="/assets/images/logo.avif"
              alt="OctaSence logo"
              width={160}
              height={96}
              className="h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]"
            />

            {/* Description */}
            <p className="text-white/70 font-medium text-base leading-relaxed">
              AI-Powered Infrastructure Intelligence for the world's most critical assets.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 pt-1">
              <Link href="https://www.linkedin.com/company/octasence" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="text-blue-300 bg-white/5 border border-white/10 rounded-full p-4 hover:bg-white/10 hover:scale-110 transition-all">
                <FaLinkedinIn size={28} />
              </Link>
              <Link href="https://www.youtube.com/@octasence" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="text-blue-300 bg-white/5 border border-white/10 rounded-full p-4 hover:bg-white/10 hover:scale-110 transition-all">
                <FaYoutube size={28} />
              </Link>
              <Link href="https://x.com/octasence" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                className="text-blue-300 bg-white/5 border border-white/10 rounded-full p-4 hover:bg-white/10 hover:scale-110 transition-all">
                <FaXTwitter size={28} />
              </Link>
              <Link href="https://www.instagram.com/octasence" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="text-blue-300 bg-white/5 border border-white/10 rounded-full p-4 hover:bg-white/10 hover:scale-110 transition-all">
                <FaInstagram size={28} />
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-bold text-white text-xl mb-6">Platform</h3>
            <ul className="space-y-4 text-base">
              <li><Link href="/products" className="text-white/85 font-medium hover:text-white transition-colors">Smart Sensors</Link></li>
              <li><Link href="/products" className="text-white/85 font-medium hover:text-white transition-colors">AI Platform</Link></li>
              <li><Link href="/products" className="text-white/85 font-medium hover:text-white transition-colors">Data APIs</Link></li>
              <li><Link href="/products" className="text-white/85 font-medium hover:text-white transition-colors">Digital Twin</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-bold text-white text-xl mb-6">Solutions</h3>
            <ul className="space-y-4 text-base">
              <li><Link href="/solutions" className="text-white/85 font-medium hover:text-white transition-colors">Infrastructure Intelligence</Link></li>
              <li><Link href="/solutions" className="text-white/85 font-medium hover:text-white transition-colors">Mining</Link></li>
              <li><Link href="/solutions" className="text-white/85 font-medium hover:text-white transition-colors">Tunnels & Bridges</Link></li>
              <li><Link href="/solutions" className="text-white/85 font-medium hover:text-white transition-colors">Dams & Reservoirs</Link></li>
              <li><Link href="/solutions" className="text-white/85 font-medium hover:text-white transition-colors">Industrial IoT</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold text-white text-xl mb-6">About</h3>
            <ul className="space-y-4 text-base">
              <li><Link href="/about-us" className="text-white/85 font-medium hover:text-white transition-colors">About OctaSence</Link></li>
              <li><Link href="/careers" className="text-white/85 font-medium hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-white/85 font-medium hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/press" className="text-white/85 font-medium hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="relative z-10 border-t border-white/10 my-10"></div>

        {/* Bottom Section */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 text-[14px] md:text-[15px]">
          
          <div className="flex flex-wrap gap-5 text-white/60">
            &copy; {currentYear} OctaSence. All rights reserved.
            <Link href="/legal/terms-of-service" className="hover:text-white transition">Terms</Link>
            <Link href="/legal/privacy-policy" className="hover:text-white transition">Privacy</Link>
          </div>

          <div className="text-white/40 text-xs md:text-sm tracking-[0.25em] uppercase">
            AI-Powered Infrastructure Intelligence
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;