import React, { useId } from 'react';

export function ScallopDivider({ color = '#0B3FBF', direction = 'down', className = '' }) {
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
              <path d="M 0 0 A 20 24 0 0 0 40 0 Z" fill={color} />
            ) : (
              <path d="M 0 24 A 20 24 0 0 1 40 24 Z" fill={color} />
            )}
          </pattern>
        </defs>
        <rect width="100%" height="24" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
