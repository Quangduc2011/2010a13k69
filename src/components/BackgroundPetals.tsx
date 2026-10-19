import React, { useMemo } from 'react';

interface PetalItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayDelay: number;
  opacity: number;
  color: string;
}

export const BackgroundPetals: React.FC = () => {
  const petals = useMemo<PetalItem[]>(() => {
    const colors = [
      '#FBCFE8', // pink-200
      '#F472B6', // pink-400
      '#FCE7F3', // pink-100
      '#DDD6FE', // purple-200
      '#FDA4AF', // rose-300
    ];
    // Keep count modest (16 petals) so it runs silky smooth even on low-end mobile
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 14,
      duration: 10 + Math.random() * 12,
      delay: Math.random() * 10,
      swayDelay: Math.random() * 4,
      opacity: 0.35 + Math.random() * 0.4,
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            style={{
              opacity: petal.opacity,
              animation: `sway 4s ease-in-out infinite alternate`,
              animationDelay: `${petal.swayDelay}s`,
            }}
          >
            <path
              d="M12 0C16 8 24 14 24 22C24 27.5228 18.6274 32 12 32C5.37258 32 0 27.5228 0 22C0 14 8 8 12 0Z"
              fill={petal.color}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
