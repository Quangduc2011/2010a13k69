import React from 'react';

export const BotanicalBranch: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M20 90C35 70 50 45 75 15"
      stroke="#A7B39E"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Leaves */}
    <path
      d="M38 73C33 63 36 55 45 57C49 67 43 73 38 73Z"
      fill="#C2CDBC"
      stroke="#97A48E"
      strokeWidth="1.5"
    />
    <path
      d="M50 56C58 51 63 56 61 65C52 65 48 58 50 56Z"
      fill="#D4DEC8"
      fillOpacity="0.8"
      stroke="#97A48E"
      strokeWidth="1.5"
    />
    <path
      d="M58 41C52 32 55 25 64 27C67 36 62 42 58 41Z"
      fill="#C2CDBC"
      stroke="#97A48E"
      strokeWidth="1.5"
    />
    <path
      d="M68 28C76 25 80 30 77 38C70 38 67 30 68 28Z"
      fill="#C2CDBC"
      stroke="#97A48E"
      strokeWidth="1.5"
    />
    {/* Little buds / blossoms */}
    <circle cx="76" cy="14" r="4.5" fill="#F472B6" />
    <circle cx="77" cy="14" r="2.5" fill="#FDF2F8" />
    <circle cx="43" cy="54" r="3" fill="#F9A8D4" />
  </svg>
);

export const BlossomIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g transform="translate(50, 50)">
      {[0, 72, 144, 216, 288].map((angle, idx) => (
        <path
          key={idx}
          transform={`rotate(${angle})`}
          d="M0 0 C-14 -18 -18 -36 0 -45 C18 -36 14 -18 0 0Z"
          fill={idx % 2 === 0 ? '#FBCFE8' : '#F9A8D4'}
          fillOpacity="0.9"
        />
      ))}
      <circle cx="0" cy="0" r="10" fill="#FDF2F8" />
      <circle cx="0" cy="0" r="5" fill="#F472B6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
        <line
          key={idx}
          x1="0"
          y1="0"
          x2="0"
          y2="-11"
          stroke="#DB2777"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${angle})`}
        />
      ))}
    </g>
  </svg>
);

export const CornerDecoration: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}> = ({ position }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-left':
        return 'scale(1, 1)';
      case 'top-right':
        return 'scale(-1, 1)';
      case 'bottom-left':
        return 'scale(1, -1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0';
      case 'top-right':
        return 'top-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'bottom-right':
        return 'bottom-0 right-0';
    }
  };

  return (
    <div
      className={`absolute ${getPositionClasses()} pointer-events-none opacity-60 w-24 h-24 sm:w-32 sm:h-32 z-0`}
      style={{ transform: getTransform() }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        <path
          d="M0 0 C40 10 70 30 90 70 C95 85 90 110 90 120"
          stroke="#E5C7CE"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <path
          d="M0 0 C30 5 60 20 75 55"
          stroke="#C8D4C0"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="28" cy="10" r="4" fill="#FBCFE8" />
        <circle cx="50" cy="24" r="5" fill="#F472B6" />
        <circle cx="68" cy="46" r="4" fill="#FDA4AF" />
        <path
          d="M12 2C15 8 10 14 6 12C3 6 8 1 12 2Z"
          fill="#B5C4AE"
        />
        <path
          d="M34 14C38 20 33 26 28 23C26 17 30 13 34 14Z"
          fill="#B5C4AE"
        />
      </svg>
    </div>
  );
};
