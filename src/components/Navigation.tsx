'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="backdrop-blur-md border rounded-full px-6 py-3 transition-all duration-300" style={{ backgroundColor: 'var(--foreground)', borderColor: '#241F2F', borderWidth: '1px' }}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="#home" className="text-2xl font-bold font-display" style={{ color: 'var(--background)' }}>
                <img 
                  src={theme === 'dark' ? "/images/skeme-logo-brown.png" : "/images/skeme-logo-neutral.png"} 
                  alt="SKEME Logo" 
                  className="h-8 w-auto transition-all duration-300" 
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-[30px]">
                <Link 
                  href="#about" 
                  className="px-3 py-2 text-base font-normal transition-colors duration-200 font-satoshi"
                  style={{ color: 'var(--background)', fontSize: '16px', lineHeight: '1.4em' }}
                >
                  About
                </Link>
                <Link 
                  href="#services" 
                  className="px-3 py-2 text-base font-normal transition-colors duration-200 font-satoshi"
                  style={{ color: 'var(--background)', fontSize: '16px', lineHeight: '1.4em' }}
                >
                  Services
                </Link>
                <Link 
                  href="#releases" 
                  className="px-3 py-2 text-base font-normal transition-colors duration-200 font-satoshi"
                  style={{ color: 'var(--background)', fontSize: '16px', lineHeight: '1.4em' }}
                >
                  Releases
                </Link>
                <Link 
                  href="#blog" 
                  className="px-3 py-2 text-base font-normal transition-colors duration-200 font-satoshi"
                  style={{ color: 'var(--background)', fontSize: '16px', lineHeight: '1.4em' }}
                >
                  Blog
                </Link>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link 
                href="#contact" 
                className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-satoshi flex items-baseline gap-2"
                style={{ fontSize: '14px', lineHeight: '1.4em', backgroundColor: '#9f3b0e', color: 'var(--foreground)' }}
              >
                Submit Music
                <svg className="w-4 h-4 -rotate-45" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 transition-colors duration-200"
                style={{ color: 'var(--background)' }}
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 sm:px-6 lg:px-8 pb-4">
          <div className="backdrop-blur-md border rounded-full px-6 py-4 space-y-1" style={{ backgroundColor: 'var(--foreground)', borderColor: '#241F2F', borderWidth: '1px' }}>
            <Link 
              href="#home" 
              className="block px-3 py-2 text-base font-normal transition-colors duration-200 font-satoshi"
              style={{ color: 'var(--background)', fontSize: '16px', lineHeight: '1.4em' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="#about" 
              className="block px-3 py-2 text-base font-normal transition-colors duration-200 font-satoshi"
              style={{ color: 'var(--background)', fontSize: '16px', lineHeight: '1.4em' }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="#services" 
              className="block px-3 py-2 text-base font-normal transition-colors duration-200 font-satoshi"
              style={{ color: 'var(--background)', fontSize: '16px', lineHeight: '1.4em' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="#releases" 
              className="block px-3 py-2 text-base font-normal transition-colors duration-200 font-satoshi"
              style={{ color: 'var(--background)', fontSize: '16px', lineHeight: '1.4em' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Releases
            </Link>
            <Link 
              href="#blog" 
              className="block px-3 py-2 text-base font-normal transition-colors duration-200 font-satoshi"
              style={{ color: 'var(--background)', fontSize: '16px', lineHeight: '1.4em' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="#contact" 
              className="block px-3 py-2 text-base font-normal transition-colors duration-200 font-satoshi"
              style={{ color: 'var(--background)', fontSize: '16px', lineHeight: '1.4em' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4">
              <Link 
                href="#contact" 
                className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 block text-center font-satoshi flex items-baseline justify-center gap-2"
                style={{ fontSize: '14px', lineHeight: '1.4em', backgroundColor: '#9f3b0e', color: 'var(--foreground)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Submit Music
                <svg className="w-4 h-4 -rotate-45" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 