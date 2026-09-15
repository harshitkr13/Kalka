'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { NavItem } from '@/types';
import { MobileMenu } from './MobileMenu';

export const defaultNavItems: NavItem[] = [
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Media Relations', href: '/services/media-relations', description: 'Editorial placements & journalist networks' },
      { label: 'Corporate Communications', href: '/services/corporate-communications', description: 'Executive positioning & strategic messaging' },
      { label: 'Crisis Communications', href: '/services/crisis-communications', description: 'Rapid reputation protection & risk mitigation' },
      { label: 'Thought Leadership', href: '/services/thought-leadership', description: 'Op-eds, keynotes & industry influence' },
    ],
  },
  { label: 'Industries', href: '/industries' },
  { label: 'Our Work', href: '/case-studies' },
  { label: 'Insights', href: '/insights' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export interface NavbarProps {
  navItems?: NavItem[];
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  navItems = defaultNavItems,
  className,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-200 text-left',
          isScrolled
            ? 'bg-navy/95 backdrop-blur-md border-b border-navy-border shadow-elevated py-3'
            : 'bg-navy border-b border-navy-border/50 py-5',
          className
        )}
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Mark */}
          <Link href="/" className="flex items-center gap-3 select-none">
            <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
              <Image
                src="/assets/brand/kalka-co-logo-white.svg"
                alt="Kalka Co. Media Consultancy"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-white block leading-none">
                KALKA CO.
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gold block mt-0.5">
                Media Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => item.children && setActiveDropdown(null)}
              >
                {item.children ? (
                  <button
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-gold transition-colors py-2"
                    aria-expanded={activeDropdown === item.label}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-gold transition-colors py-2"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 w-64 p-2 bg-white rounded shadow-premium border border-slate-200 animate-fade-in z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block p-2.5 rounded hover:bg-slate-50 transition-colors"
                      >
                        <span className="block text-xs font-semibold text-navy">
                          {child.label}
                        </span>
                        {child.description && (
                          <span className="block text-[11px] text-slate-500 mt-0.5">
                            {child.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden sm:inline-flex">
              <Button variant="gold" size="sm">
                Start a Conversation
              </Button>
            </Link>

            <button
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open mobile navigation"
              className="p-2 text-slate-200 hover:text-gold lg:hidden rounded transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navItems={navItems}
      />
    </>
  );
};
