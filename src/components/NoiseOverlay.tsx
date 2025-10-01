'use client';

type Props = {
  opacity?: number;      // 0.0–1.0
  intensity?: number;    // 0.0–1.0 (mapped to baseFrequency)
  size?: number;         // tile size in px
  className?: string;
};

const NoiseOverlay = ({
  opacity = 0.15,
  intensity = 2.5,
  size = 256,
  className = "fixed inset-0 pointer-events-none z-0"
}: Props) => {
  // map intensity (0..1) to a practical baseFrequency range
  // Much higher baseFrequency for very coarse, obvious grain
  const baseFrequency = 2.5 + (6.0 - 2.5) * intensity; // ~2.5–6.0 (much coarser)

  const svg = `
    <svg viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'>
      <filter id='noiseFilter'>
        <feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='1' stitchTiles='stitch'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#noiseFilter)' opacity='${opacity}'/>
    </svg>
  `;

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${size}px ${size}px`,
        backgroundRepeat: 'repeat'
      }}
    />
  );
};

export default NoiseOverlay;
