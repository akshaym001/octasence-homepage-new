'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { TbChevronDown, TbMenu } from 'react-icons/tb';
import { RiCloseFill } from 'react-icons/ri';

import { CustomButton } from '@/components/ui';
import { cn } from '@/lib/utils';

// ---------------- TYPES ----------------
type DropdownItem = {
  title: string;
  description?: string;
  href: string;
};

type NavItem =
  | { type: 'link'; label: string; href: string }
  | { type: 'dropdown'; label: string; items: DropdownItem[] };

// ---------------- NAV CONFIG ----------------
const navItems: NavItem[] = [
  { type: 'link', label: 'Home', href: '/' },
  { type: 'link', label: 'Solutions', href: '/solutions-infrastructure-intelligence' },
  { type: 'link', label: 'Products', href: '/products-infrastructure-intelligence' },
  {
    type: 'dropdown',
    label: 'About',
    items: [
      { title: 'About OctaSence', href: '/about-us' },
      { title: 'Careers', href: '/careers' },
      { title: 'Contact Us', href: '/contact' },
      { title: 'Press', href: '/press' },
    ],
  },
];

// ---------------- DROPDOWN ----------------
// Fix 1: Accept `scrolled` prop to style label correctly
function Dropdown({
  label,
  items,
  scrolled,
}: {
  label: string;
  items: DropdownItem[];
  scrolled: boolean;
}) {
  return (
    <div className="relative group">
      <div
        className={cn(
          'flex items-center cursor-pointer font-medium transition-colors text-base',
          // Fix 1: match the link color logic
          scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white/80 hover:text-white'
        )}
      >
        {label} <TbChevronDown className="ml-1" />
      </div>

      {/* Fix 4: Add `pt-2` buffer so diagonal mouse movement doesn't close the menu */}
      <div className="absolute top-full left-0 hidden group-hover:block pt-2 z-[9999]">
        <div className="bg-white shadow-lg rounded-md p-4 w-[300px]">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-2 rounded hover:bg-blue-50"
            >
              <div className="font-medium">{item.title}</div>
              {item.description && (
                <div className="text-sm text-gray-500">{item.description}</div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------- NAVBAR ----------------
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Fix 3: use a ref instead of state for last scroll position
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      setScrolled(current > 50);

      if (current > lastScrollY.current && current > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Fix 3: empty deps — no stale closure since we use a ref

  return (
    <div
      className={cn(
        'fixed top-0 w-full z-[10000] transition-all duration-300',
        isHidden ? '-translate-y-full' : 'translate-y-0',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      {/* Fix 2: add `relative` here so the mobile menu's `absolute` is anchored correctly */}
      <nav className="relative flex items-center justify-between px-6 py-4 lg:px-12 max-w-[1440px] mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">O</span>
          </div>
          <span
            className={cn(
              'text-3xl font-bold',
              scrolled ? 'text-gray-900' : 'text-white'
            )}
          >
            OctaSence
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            if (item.type === 'link') {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'font-medium transition-colors text-base',
                    scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white/80 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            if (item.type === 'dropdown') {
              return (
                // Fix 1: pass scrolled down
                <Dropdown key={item.label} label={item.label} items={item.items} scrolled={scrolled} />
              );
            }

            return null;
          })}

          <Link href="/contact">
            <CustomButton className="bg-[#5b6cf3] text-white px-6 py-2 rounded-full">
              Request Demo
            </CustomButton>
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={cn('md:hidden', scrolled ? 'text-gray-800' : 'text-white')}
        >
          {menuOpen ? <RiCloseFill size={24} /> : <TbMenu size={28} />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg p-4 md:hidden z-[9998]">
            {navItems.map((item) => {
              if (item.type === 'link') {
                return (
                  <Link key={item.label} href={item.href} className="block py-2 text-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }

              if (item.type === 'dropdown') {
                return (
                  <div key={item.label} className="mb-3">
                    <div className="font-semibold text-gray-800">{item.label}</div>
                    {item.items.map((sub) => (
                      <Link key={sub.href} href={sub.href} className="block py-1 text-gray-600"
                        onClick={() => setMenuOpen(false)}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                );
              }

              return null;
            })}

            <Link href="/contact">
              <CustomButton className="w-full mt-4">Request Demo</CustomButton>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}