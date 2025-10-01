import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your SKEME brand colors
        primary: {
          50: '#fef7ed',
          100: '#fdedd4',
          200: '#fad7a8',
          300: '#F6B01F',  // Your main accent
          400: '#e89c0e',
          500: '#c87a0c',
          600: '#a65f0a',
          700: '#8a4d08',
          800: '#6f3e06',
          900: '#5a3205',
        },
        secondary: {
          50: '#f2f7f0',
          100: '#e1eddb',
          200: '#c3dbb8',
          300: '#9fc28a',
          400: '#7ba65c',
          500: '#314020',  // Your secondary accent
          600: '#2a361c',
          700: '#232c17',
          800: '#1c2213',
          900: '#161c0f',
        },
        accent: {
          50: '#fef2f0',
          100: '#fde6e0',
          200: '#fbd0c3',
          300: '#f8b09a',
          400: '#f48566',
          500: '#9f3b0e',  // Your accent color
          600: '#8a3210',
          700: '#732a12',
          800: '#5e2212',
          900: '#4e1d11',
        },
        dark: {
          50: '#f5f4f6',
          100: '#ebe9ed',
          200: '#d7d4db',
          300: '#b8b3c0',
          400: '#938c9e',
          500: '#241F2F',  // Your dark accent
          600: '#1e1a28',
          700: '#181520',
          800: '#121018',
          900: '#0d0a10',
        },
        // Light/Dark mode colors
        background: {
          light: '#FAEDD2',  // Light mode background
          dark: '#4A2115',   // Dark mode background
        },
        foreground: {
          light: '#4A2115',  // Light mode text
          dark: '#FAEDD2',   // Dark mode text
        }
      },
      fontFamily: {
        // Your brand fonts
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],  // For headings
        mono: ['JetBrains Mono', 'monospace'],
        satoshi: ['Satoshi-Regular', 'Satoshi', 'system-ui', 'sans-serif'],  // For menu items and buttons
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config; 