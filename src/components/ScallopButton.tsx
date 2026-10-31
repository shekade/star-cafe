import React from 'react';

interface ScallopButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'lime' | 'cobalt' | 'cream' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function ScallopButton({
  variant = 'lime',
  size = 'md',
  href,
  children,
  className = '',
  icon,
  ...props
}: ScallopButtonProps) {
  // Color configuration
  const colorStyles = {
    lime: {
      fill: '#E6F55A',
      stroke: '#0B3FBF',
      text: 'text-[#0B3FBF]',
    },
    cobalt: {
      fill: '#0B3FBF',
      stroke: '#E6F55A',
      text: 'text-white',
    },
    cream: {
      fill: '#FFF8E7',
      stroke: '#0B3FBF',
      text: 'text-[#0B3FBF]',
    },
    white: {
      fill: '#FFFFFF',
      stroke: '#0B3FBF',
      text: 'text-[#0B3FBF]',
    },
  }[variant];

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs font-bold',
    md: 'px-6 py-3 text-sm font-bold',
    lg: 'px-8 py-4 text-base font-bold',
  }[size];

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2 select-none tracking-tight">
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );

  const buttonClasses = `group relative inline-flex items-center justify-center font-display uppercase tracking-wide cursor-pointer transition-all duration-200 transform hover:scale-105 hover:-rotate-1 active:scale-95 ${colorStyles.text} ${sizeStyles} ${className}`;

  // Scalloped cloud-biscuit background SVG
  const svgBackground = (
    <svg
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm transition-transform duration-200 group-hover:drop-shadow-md"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 32 4
           C 42 -2, 58 -2, 68 4
           C 78 -2, 94 -2, 104 4
           C 114 -2, 130 -2, 140 4
           C 150 -2, 166 -2, 176 6
           C 192 12, 198 22, 196 30
           C 198 38, 192 48, 176 54
           C 166 62, 150 62, 140 56
           C 130 62, 114 62, 104 56
           C 94 62, 78 62, 68 56
           C 58 62, 42 62, 32 56
           C 22 62, 6 58, 2 48
           C -2 40, -2 20, 2 12
           C 6 2, 22 -2, 32 4 Z"
        fill={colorStyles.fill}
        stroke={colorStyles.stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {svgBackground}
        {content}
      </a>
    );
  }

  return (
    <button className={buttonClasses} {...props}>
      {svgBackground}
      {content}
    </button>
  );
}
