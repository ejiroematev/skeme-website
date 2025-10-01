'use client';

import { useTheme } from '@/contexts/ThemeContext';

const FloatingThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 left-8 z-50 bg-[#F6B01F] hover:bg-[#e89c0e] transition-all duration-300 rounded-full p-5 shadow-lg hover:shadow-xl transform hover:scale-105"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun icon for light mode */}
      <svg
        className={`w-6 h-6 transition-all duration-300 ${
          theme === 'light' ? 'text-background rotate-0 scale-100' : 'text-background/60 rotate-90 scale-0'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon for dark mode */}
      <svg
        className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
          theme === 'dark' ? 'text-background rotate-0 scale-100' : 'text-background/60 rotate-90 scale-0'
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
};

export default FloatingThemeToggle; 