'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { TbChevronDown, TbMenu } from 'react-icons/tb';

import { CustomButton } from '@/components/ui';
import { cn } from '@/lib/utils';

type DropdownItem = {
  title: string;
  description?: string;
  href: string;
};

type NavItem =
  | { type: 'link'; label: string; href: string }
  | { type: 'dropdown'; label: string; items: DropdownItem[] };

const navItems: NavItem[] = [
  { type: 'link', label: 'Home', href: '/' },
  {
    type: 'link',
    label: 'Products',
    href: '/products-infrastructure-intelligence',
  },
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

// ── Original simple Dropdown (unchanged) ─────────────────────────────────────

function Dropdown({ label, items }: { label: string; items: DropdownItem[] }) {
  return (
    <div className="relative group">
      <div className="flex items-center cursor-pointer transition-colors text-base tracking-[0.02em] text-white/78 hover:text-white">
        {label} <TbChevronDown className="ml-1" />
      </div>
      <div className="absolute top-full left-0 hidden group-hover:block pt-2 z-[9999]">
        <div className="bg-[#031629] border border-white/10 shadow-[0_12px_40px_rgba(2,6,23,0.35)] rounded-2xl p-4 w-[320px]">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div>{item.title}</div>
              {item.description && (
                <div className="text-sm text-white/45">{item.description}</div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Solutions dropdown — just Applications and Features ───────────────────────

function SolutionsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center cursor-pointer transition-colors text-base tracking-[0.02em] text-white/78 hover:text-white bg-transparent border-0 p-0"
      >
        Solutions
        <TbChevronDown
          className={cn(
            'ml-1 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-2 z-[9999]">
          <div className="bg-[#031629] border border-white/10 shadow-[0_12px_40px_rgba(2,6,23,0.35)] rounded-2xl p-4 w-[220px]">
            <Link
              href="/applications-infrastructure-intelligence"
              onClick={() => setOpen(false)}
              className="block p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            >
              Applications
            </Link>
            <Link
              href="/solutions-infrastructure-intelligence"
              onClick={() => setOpen(false)}
              className="block p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            >
              Features
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Navbar (identical to original except Solutions) ───────────────────────────

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setIsScrolled(current > 50);
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed top-0 w-full z-[10000] transition-all duration-300',
        isScrolled
          ? 'bg-[#031629] backdrop-blur-xl border-b border-white/10 shadow-[0_12px_40px_rgba(2,6,23,0.35)]'
          : 'bg-transparent',
      )}
    >
      <nav className="relative flex items-center justify-between px-6 py-1.5 lg:px-12 max-w-[1440px] mx-auto">
        {/* Logo — unchanged */}
        <Link href="/" className="flex items-center">
          <div className="w-28 h-14 md:w-36 md:h-16 flex items-center justify-center overflow-hidden">
            <Image
              src="/assets/images/logo.avif"
              alt="OctaSence logo"
              width={144}
              height={144}
              className="h-full w-full object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="transition-colors text-base tracking-[0.02em] text-white/78 hover:text-white"
          >
            Home
          </Link>

          <SolutionsDropdown />

          {navItems
            .filter((item) => item.label !== 'Home')
            .map((item) => {
              if (item.type === 'link') {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="transition-colors text-base tracking-[0.02em] text-white/78 hover:text-white"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <Dropdown
                  key={item.label}
                  label={item.label}
                  items={item.items}
                />
              );
            })}

          <Link href="/contact">
            <CustomButton className="octa-button px-6 py-2.5">
              Request Demo
            </CustomButton>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? <RiCloseFill size={24} /> : <TbMenu size={28} />}
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#031629] border-t border-white/10 rounded-b-3xl p-4 md:hidden z-[9998] shadow-[0_12px_40px_rgba(2,6,23,0.35)]">
            <Link
              href="/"
              className="block py-2.5 text-white/80"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            {/* Solutions — simple two items */}
            <div className="mb-1">
              <div className="text-white py-2.5">Solutions</div>
              <Link
                href="/sectors"
                className="block py-1.5 pl-3 text-white/65"
                onClick={() => setMenuOpen(false)}
              >
                Applications
              </Link>
              <Link
                href="/solutions-infrastructure-intelligence"
                className="block py-1.5 pl-3 text-white/65"
                onClick={() => setMenuOpen(false)}
              >
                Features
              </Link>
            </div>

            {navItems
              .filter((item) => item.label !== 'Home')
              .map((item) => {
                if (item.type === 'link') {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block py-2.5 text-white/80"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <div key={item.label} className="mb-3">
                    <div className="text-white py-1">{item.label}</div>
                    {item.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block py-1.5 pl-3 text-white/65"
                        onClick={() => setMenuOpen(false)}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                );
              })}

            <Link href="/contact">
              <CustomButton className="w-full mt-4 octa-button">
                Request Demo
              </CustomButton>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
