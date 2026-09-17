'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { NavItem } from '@/types';
import { MobileMenu } from './MobileMenu';
import { AnimatedBackground } from '@/components/core/animated-background';

export const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
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
  const pathname = usePathname();

  const isItemActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const activeItem = navItems.find((item) => isItemActive(item.href));
  const currentTab = activeItem ? activeItem.label : null;

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
            ? 'bg-navy/95 backdrop-blur-md border-b border-navy-border shadow-elevated py-4'
            : 'bg-navy border-b border-navy-border/50 py-6',
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
              <span className="text-xs font-medium tracking-wide text-gold block mt-0.5">
                Media Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Animated Sliding Tab Group */}
          <nav
            className="hidden lg:flex items-center gap-1 relative"
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <AnimatedBackground
              defaultValue={currentTab}
              enableHover
              transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 0.3,
              }}
              className="rounded-lg bg-white/[0.08] border border-white/10 shadow-sm"
            >
              {navItems.map((item) => {
                const active = isItemActive(item.href);

                if (item.children) {
                  return (
                    <div
                      key={item.label}
                      data-id={item.label}
                      className="relative inline-flex items-center"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg select-none',
                          active
                            ? 'text-gold'
                            : 'text-slate-200 hover:text-white'
                        )}
                        aria-expanded={activeDropdown === item.label}
                        aria-haspopup="true"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            'w-3.5 h-3.5 transition-transform duration-200',
                            activeDropdown === item.label ? 'rotate-180 text-gold' : active ? 'text-gold' : 'text-slate-400'
                          )}
                        />
                      </Link>

                      {/* Dropdown Menu */}
                      {activeDropdown === item.label && (
                        <div className="absolute top-full left-0 w-64 p-2 bg-white rounded shadow-premium border border-slate-200 animate-fade-in z-50 mt-1">
                          {item.children.map((child) => {
                            const childActive = isItemActive(child.href);
                            return (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setActiveDropdown(null)}
                                className={cn(
                                  'block p-2.5 rounded transition-colors',
                                  childActive ? 'bg-gold/10' : 'hover:bg-slate-50'
                                )}
                              >
                                <span className={cn('block text-xs font-semibold', childActive ? 'text-gold-dark' : 'text-navy')}>
                                  {child.label}
                                </span>
                                {child.description && (
                                  <span className="block text-xs text-slate-500 mt-0.5">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    data-id={item.label}
                    className={cn(
                      'px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg select-none',
                      active
                        ? 'text-gold'
                        : 'text-slate-200 hover:text-white'
                    )}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </AnimatedBackground>
          </nav>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden sm:inline-flex">
              <Button variant="gold" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
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
