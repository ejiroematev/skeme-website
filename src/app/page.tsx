'use client';

import Navigation from '@/components/Navigation';
import FloatingThemeToggle from '@/components/FloatingThemeToggle';
import NoiseOverlay from '@/components/NoiseOverlay';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Home() {
  const { theme } = useTheme();
  const changingWordRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const words = ['lost', 'broke', 'small', 'stuck'];
  
  // Provide fallback theme if not available
  const currentTheme = theme || 'dark';
  
  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate normalized mouse position (-1 to 1)
      const normalizedX = (clientX - centerX) / centerX;
      const normalizedY = (clientY - centerY) / centerY;
      
      setMousePosition({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP text animation
  useEffect(() => {
    let currentIndex = 0;

    const animateText = () => {
      if (changingWordRef.current) {
        const textSpan = changingWordRef.current.querySelector('span');
        if (textSpan) {
          gsap.to(textSpan, {
            duration: 0.5,
            opacity: 0,
            y: -20,
            ease: "power2.out",
            onComplete: () => {
              if (textSpan) {
                textSpan.textContent = words[currentIndex];
                gsap.to(textSpan, {
                  duration: 0.5,
                  opacity: 1,
                  y: 0,
                  ease: "power2.out"
                });
              }
              currentIndex = (currentIndex + 1) % words.length;
            }
          });
        }
      }
    };
    
    // Initial animation
    animateText();
    
    // Set up interval for continuous animation
    const interval = setInterval(animateText, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">
      {/* Noise Overlay */}
      <NoiseOverlay  />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Blurs */}
        <div 
          className="absolute pointer-events-none"
          style={{
            width: '771px',
            height: '621px',
            filter: 'blur(100px)',
            backgroundColor: '#F6B01F',
            opacity: 0.2,
            top: '0',
            left: '0',
            ['--offset-x' as string]: '310px',
            ['--offset-y' as string]: '-210px',
            ['--start-rotation' as string]: '0deg',
            ['--skew-x' as string]: '0deg',
            ['--skew-y' as string]: '0deg',
            animation: 'rotate 20s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            zIndex: -1
          }}
        />
        <div 
          className="absolute pointer-events-none"
          style={{
            width: '544px',
            height: '527px',
            filter: 'blur(100px)',
            backgroundColor: '#9F3B0E',
            opacity: 0.2,
            top: '25%',
            right: '-10%',
            ['--offset-x' as string]: '-200px',
            ['--offset-y' as string]: '100px',
            ['--start-rotation' as string]: '90deg',
            ['--skew-x' as string]: '0deg',
            ['--skew-y' as string]: '10deg',
            animation: 'rotate 4s cubic-bezier(0.4, 0, 0.6, 1) infinite reverse',
            zIndex: -1
          }}
        />
        <div 
          className="absolute pointer-events-none"
          style={{
            width: '544px',
            height: '527px',
            filter: 'blur(100px)',
            backgroundColor: '#314020',
            opacity: 0.3,
            top: '50%',
            left: '40%',
            ['--offset-x' as string]: '310px',
            ['--offset-y' as string]: '210px',
            ['--start-rotation' as string]: '180deg',
            ['--skew-x' as string]: '0deg',
            ['--skew-y' as string]: '5deg',
            animation: 'rotate 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            zIndex: -1
          }}
        />

        {/* Hero Content */}
        <div className="text-center z-10 relative">
          {/* Hero Keywords Section */}
          <div className="mb-12 px-4 py-2.5 bg-[#FAEDD2]/32 border border-[#F6B01F] rounded-[100px]">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#F6B01F]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0L12.245 7.755L20 10L12.245 12.245L10 20L7.755 12.245L0 10L7.755 7.755L10 0Z"/>
                </svg>
                <span className={`font-light text-base leading-[1.4em] font-satoshi-light ${currentTheme === 'dark' ? 'text-[#FAEDD2]' : 'text-[#4A2115]'}`}>Independent First</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#F6B01F]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0L12.245 7.755L20 10L12.245 12.245L10 20L7.755 12.245L0 10L7.755 7.755L10 0Z"/>
                </svg>
                <span className={`font-light text-base leading-[1.4em] font-satoshi-light ${currentTheme === 'dark' ? 'text-[#FAEDD2]' : 'text-[#4A2115]'}`}>Scalable Support</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#F6B01F]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0L12.245 7.755L20 10L12.245 12.245L10 20L7.755 12.245L0 10L7.755 7.755L10 0Z"/>
                </svg>
                <span className={`font-light text-base leading-[1.4em] font-satoshi-light ${currentTheme === 'dark' ? 'text-[#FAEDD2]' : 'text-[#4A2115]'}`}>Data-Driven</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#F6B01F]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0L12.245 7.755L20 10L12.245 12.245L10 20L7.755 12.245L0 10L7.755 7.755L10 0Z"/>
                </svg>
                <span className={`font-light text-base leading-[1.4em] font-satoshi-light ${currentTheme === 'dark' ? 'text-[#FAEDD2]' : 'text-[#4A2115]'}`}>Global Distribution</span>
              </div>
            </div>
          </div>
          
          {/* Hero Main Heading Section */}
          <div className="mb-4 capitalize" style={{ 
            fontFamily: 'Climate Crisis', 
            color: currentTheme === 'dark' ? '#FAEDD2' : '#4A2115',
            fontSize: '80px',
            lineHeight: '1.2em',
            letterSpacing: '0.01em'
          }}>
            {/* First Line */}
            <div>We Help Artists</div>
            
            {/* Second Line - Go From + Animated Text */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px' }}>
              <span>Go From</span>
              <div 
                ref={changingWordRef}
                className="px-3 pb-2.5 rounded-[100px] relative"
                style={{ 
                  backgroundColor: '#F6B01F',
                  color: currentTheme === 'dark' ? '#4A2115' : '#FAEDD2',
                  width: '400px',
                  height: '80px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span className="relative z-10" style={{ fontFamily: 'Climate Crisis', fontSize: '70px' }}>lost</span>
              </div>
            </div>
            
            {/* Third Line */}
            <div>To Iconic.</div>
          </div>
          
          {/* Hero Call-to-Action Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 rounded-full transition-colors">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div 
          className="absolute top-20 left-10 w-2 h-2 bg-primary-300 rounded-full animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`
          }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-3 h-3 bg-secondary-300 rounded-full animate-pulse delay-1000"
          style={{
            transform: `translate(${mousePosition.x * -8}px, ${mousePosition.y * -8}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-40 left-20 w-2 h-2 bg-accent-300 rounded-full animate-pulse delay-2000"
          style={{
            transform: `translate(${mousePosition.x * -6}px, ${mousePosition.y * -6}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-3 h-3 bg-primary-300 rounded-full animate-pulse delay-3000"
          style={{
            transform: `translate(${mousePosition.x * -7}px, ${mousePosition.y * -7}px)`
          }}
        ></div>
        
        {/* Floating Tilted Images */}
        <div 
          className="absolute top-35 left-60 transform -rotate-12 transition-transform duration-300 hover:scale-110 p-1 rounded-2xl" 
          style={{ 
            backgroundColor: currentTheme === 'dark' ? '#4A2115' : '#FAEDD2',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundBlendMode: 'overlay',
            opacity: '0.6'
          }}
        >
          <img 
            src="/images/hero-img1.jpg" 
            alt="Hero Image 1" 
            className="w-40 h-auto object-cover rounded-xl shadow-lg"
            style={{
              transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
            }}
          />
        </div>
        
        <div 
          className="absolute top-50 right-55 transform rotate-12 transition-transform duration-300 hover:scale-110 p-1 rounded-2xl" 
          style={{ 
            backgroundColor: currentTheme === 'dark' ? '#4A2115' : '#FAEDD2',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundBlendMode: 'overlay',
            opacity: '0.6'
          }}
        >
          <img 
            src="/images/hero-img2.jpg" 
            alt="Hero Image 2" 
            className="w-40 h-auto object-cover rounded-xl shadow-lg"
            style={{
              transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
            }}
          />
        </div>
        
        <div 
          className="absolute bottom-40 left-120 transform rotate-10 transition-transform duration-300 hover:scale-110 p-1 rounded-2xl" 
          style={{ 
            backgroundColor: currentTheme === 'dark' ? '#4A2115' : '#FAEDD2',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundBlendMode: 'overlay',
            opacity: '0.6'
          }}
        >
          <img 
            src="/images/hero-img3.jpg" 
            alt="Hero Image 3" 
            className="w-36 h-auto object-cover rounded-xl shadow-lg"
            style={{
              transform: `translate(${mousePosition.x * -18}px, ${mousePosition.y * -18}px)`
            }}
          />
        </div>
        
        <div 
          className="absolute bottom-35 right-120 transform -rotate-6 transition-transform duration-300 hover:scale-110 p-1 rounded-2xl" 
          style={{ 
            backgroundColor: currentTheme === 'dark' ? '#4A2115' : '#FAEDD2',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundBlendMode: 'overlay',
            opacity: '0.6'
          }}
        >
          <img 
            src="/images/hero-img4.png" 
            alt="Hero Image 4" 
            className="w-30 h-auto object-cover rounded-xl shadow-lg"
            style={{
              transform: `translate(${mousePosition.x * -12}px, ${mousePosition.y * -12}px)`
            }}
          />
        </div>
      </section>

      {/* Floating Theme Toggle */}
      <FloatingThemeToggle />
    </div>
  );
}
