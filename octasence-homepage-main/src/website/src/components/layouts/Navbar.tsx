'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { TbChevronDown, TbMenu } from 'react-icons/tb';

import { CustomButton } from '@/components/ui';
import mainConfig from '@/configs/mainConfigs';
import { cn } from '@/lib/utils';

// Type definitions
type MenuItem = {
  title: string;
  description?: string;
  href: string;
};

type MenuItems = {
  [key: string]: MenuItem[];
};

// OctaSence menu items
const menuItems: MenuItems = {
  Platform: [
    {
      title: 'Smart Infrastructure Sensors',
      description: 'Industrial IoT sensors for structural health monitoring',
      href: '/products/sensors',
    },
    {
      title: 'AI Monitoring Platform',
      description: 'Real-time anomaly detection and predictive analytics',
      href: '/products/platform',
    },
    {
      title: 'Developer Data APIs',
      description: 'Access raw and processed structural health data',
      href: '/products/api',
    },
    {
      title: 'Infrastructure Digital Twin',
      description: '2D/3D dashboards for structural visualization',
      href: '/products/digital-twin',
    },
  ],
  Solutions: [
    {
      title: 'Infrastructure Intelligence',
      description: 'End-to-end SHM and Geotechnical Intelligence',
      href: '/solutions-infrastructure-intelligence',
    },
    {
      title: 'Mining Operations',
      description: 'Geotechnical monitoring for mines and excavations',
      href: '/solutions/mining',
    },
    {
      title: 'Tunnels & Bridges',
      description: 'Structural health monitoring for tunnels and bridges',
      href: '/solutions/tunnels',
    },
    {
      title: 'Dams & Reservoirs',
      description: 'Deformation and seepage monitoring for dams',
      href: '/solutions/dams',
    },
    {
      title: 'Industrial IoT',
      description: 'Continuous plant and machinery condition monitoring',
      href: '/solutions/industrial',
    },
  ],
  About: [
    { title: 'About OctaSence', href: '/about-us' },
    { title: 'Careers', href: '/careers' },
    { title: 'Contact Us', href: '/contact' },
    { title: 'Press', href: '/press' },
  ],
  Developers: [
    {
      title: 'SDKs & Packages',
      description: 'Open source libraries and developer tools',
      href: '/packages',
    },
    {
      title: 'Documentation',
      description: 'API guides and technical resources',
      href: 'https://docs.octasence.com',
    },
    {
      title: 'GitHub',
      description: 'Explore our open source projects',
      href: 'https://github.com/octasence',
    },
  ],
};

// Helper component for rendering dropdown items
const DropdownMenuContent: React.FC<{
  title: string;
  items: MenuItem[];
  className?: string;
}> = ({ title, items, className = '' }) => (
  <div
    className={`bg-white shadow-lg md:w-[400px] lg:w-[600px] text-sm rounded-md p-4 ${className}`}
  >
    <div className="text-gray-400 mb-4">{title}</div>
    <div className="flex gap-8">
      {items
        .reduce<MenuItem[][]>((acc, item, idx) => {
          const colIdx = Math.floor(idx / Math.ceil(items.length / 2));
          if (!acc[colIdx]) acc[colIdx] = [];
          acc[colIdx].push(item);
          return acc;
        }, [])
        .map((colItems, index) => (
          <ul key={index} className="flex-1 space-y-3">
            {colItems.map((item) => {
              const isExternal = item.href.startsWith('http');
              return (
                <li key={item.href}>
                  {isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2 rounded-xl hover:bg-blue-50 hover:text-blue-500 transition"
                    >
                      <div className="font-medium">{item.title}</div>
                      {item.description && (
                        <div className="text-gray-500">{item.description}</div>
                      )}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="block p-2 rounded-xl hover:bg-blue-50 hover:text-blue-500 transition"
                    >
                      <div className="font-medium">{item.title}</div>
                      {item.description && (
                        <div className="text-gray-500">{item.description}</div>
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        ))}
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const toggleExpandedMenu = useCallback(
    (menuName: string) =>
      setExpandedMenu((prev) => (prev === menuName ? null : menuName)),
    [],
  );

  const handleLinkClick = useCallback(() => {
    setMenuOpen(false);
    setExpandedMenu(null);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        "w-full fixed top-0 z-[10000] transition-all duration-300",
        isHidden ? "-translate-y-full" : "translate-y-0",
        lastScrollY > 50 ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <nav className="w-full">
        <div
          className={cn(
            "flex items-center justify-between mx-auto w-full px-6 py-4 lg:px-12 max-w-[1440px]"
          )}
        >
          {/* Logo Section */}
          <Link href="/" passHref className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className={cn(
              "text-3xl font-bold transition-colors tracking-tighter",
              lastScrollY > 50 ? "text-gray-900" : "text-white"
            )}>
              OctaSence
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={cn(
              "focus:outline-none md:hidden transition-colors",
              lastScrollY > 50 ? "text-gray-800" : "text-white"
            )}
          >
            {menuOpen ? <RiCloseFill size={24} /> : <TbMenu size={30} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {Object.entries(menuItems).map(([title, items]) => (
              <div key={title} className="relative group">
                <Link 
                  href={title === 'Solutions' ? '/solutions-infrastructure-intelligence' : '#'}
                  className={cn(
                    "font-medium transition-colors text-base flex items-center",
                    lastScrollY > 50 ? "text-gray-800 hover:text-blue-600" : "text-white/80 hover:text-white"
                  )}
                >
                  {title}
                  <TbChevronDown className="ml-1 h-5 w-5" />
                </Link>
                <DropdownMenuContent
                  title={title}
                  items={items}
                  className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-[9999]"
                />
              </div>
            ))}
            <Link href="/contact">
              <CustomButton className="bg-[#5b6cf3] text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all font-semibold">
                Request Demo
              </CustomButton>
            </Link>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg p-4 md:hidden z-[9998]">
              {Object.entries(menuItems).map(([title, items]) => (
                <div key={title} className="mb-4">
                  <button
                    onClick={() => toggleExpandedMenu(title)}
                    className="text-gray-800 font-medium w-full text-left flex items-center justify-between"
                  >
                    {title}
                    <TbChevronDown
                      className={`ml-2 transition-transform duration-300 ${expandedMenu === title ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-max-height duration-300 ease-in-out ${expandedMenu === title ? 'max-h-screen' : 'max-h-0'}`}
                  >
                    {items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleLinkClick}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition rounded"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link href="/contact" onClick={handleLinkClick}>
                <CustomButton className="w-full text-blue-600 bg-blue-50 hover:bg-blue-100 transition rounded-none mb-2">
                  Request Demo
                </CustomButton>
              </Link>
              <Link href="/products" onClick={handleLinkClick}>
                <CustomButton className="w-full rounded-none">
                  Explore Platform
                </CustomButton>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
