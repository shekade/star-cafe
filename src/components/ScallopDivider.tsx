import React, { useId } from 'react';

interface ScallopDividerProps {
  color?: string; // e.g. '#0B3FBF' or '#FFF8E7'
  direction?: 'down' | 'up';
  className?: string;
}

export function ScallopDivider({
  color = '#0B3FBF',
  direction = 'down',
  className = '',
}: ScallopDividerProps) {
  const patternId = useId();

  return (
    <div
      className={`w-full overflow-hidden leading-none block relative z-10 pointer-events-none select-none ${className}`}
      style={{ height: '24px' }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={patternId}
            width="40"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            {direction === 'down' ? (
              // Semicircles hanging down from top edge (y=0)
              <path
                d="M 0 0 A 20 24 0 0 0 40 0 Z"
                fill={color}
              />
            ) : (
              // Semicircles pointing up from bottom edge (y=24)
              <path
                d="M 0 24 A 20 24 0 0 1 40 24 Z"
                fill={color}
              />
            )}
          </pattern>
        </defs>
        <rect width="100%" height="24" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
