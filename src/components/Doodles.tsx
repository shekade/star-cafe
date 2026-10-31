import React from 'react';

// Hand-drawn blue line art style SVG doodles matching Sunday Crumb aesthetic
export function CroissantDoodle({ className = "w-12 h-12", stroke = "#0B3FBF" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M20 52C16 46 16 35 24 24C32 13 46 12 58 16C70 20 84 32 86 46C88 56 80 64 70 63C62 62 58 52 54 44C50 36 42 34 34 38C26 42 22 48 20 52Z"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 22C40 28 44 38 46 50"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M52 20C58 28 62 38 64 52"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M68 28C72 35 75 44 76 54"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M22 36C26 42 28 48 30 54"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PretzelDoodle({ className = "w-12 h-12", stroke = "#0B3FBF" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M50 24C38 12 20 12 12 26C4 40 12 60 28 66C38 70 48 64 50 56C52 64 62 70 72 66C88 60 96 40 88 26C80 12 62 12 50 24Z"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 38C44 48 56 48 62 38"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M30 46C24 40 24 30 32 26C40 22 48 28 50 36"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M70 46C76 40 76 30 68 26C60 22 52 28 50 36"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Salt crystals */}
      <circle cx="28" cy="24" r="1.5" fill={stroke} />
      <circle cx="72" cy="24" r="1.5" fill={stroke} />
      <circle cx="22" cy="52" r="1.5" fill={stroke} />
      <circle cx="78" cy="52" r="1.5" fill={stroke} />
      <circle cx="50" cy="18" r="1.5" fill={stroke} />
    </svg>
  );
}

export function CookieDoodle({ className = "w-12 h-12", stroke = "#0B3FBF" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M48 10C26 10 10 26 10 48C10 70 28 88 50 88C72 88 88 72 88 50C88 44 86 40 82 38C76 35 74 28 78 22C80 18 78 14 74 12C66 8 58 10 48 10Z"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Chocolate chips */}
      <circle cx="34" cy="36" r="3.5" fill={stroke} />
      <circle cx="58" cy="32" r="3" fill={stroke} />
      <circle cx="44" cy="54" r="4" fill={stroke} />
      <circle cx="30" cy="66" r="3" fill={stroke} />
      <circle cx="64" cy="62" r="3.5" fill={stroke} />
      <circle cx="52" cy="74" r="2.5" fill={stroke} />
    </svg>
  );
}

export function BreadLoafDoodle({ className = "w-12 h-12", stroke = "#0B3FBF" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 45C10 32 20 18 50 18C80 18 90 32 88 45C86 52 78 56 50 56C22 56 14 52 12 45Z"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Scoring marks */}
      <path d="M28 26C32 30 34 38 34 46" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M42 24C46 30 48 38 48 48" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M58 24C62 30 64 38 64 48" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M72 26C74 32 76 38 76 46" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function RollingPinDoodle({ className = "w-12 h-12", stroke = "#0B3FBF" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Left handle */}
      <path d="M8 25C8 22 14 22 18 22L24 22L24 28L18 28C14 28 8 28 8 25Z" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Main roller */}
      <rect x="24" y="16" width="52" height="18" rx="4" stroke={stroke} strokeWidth="3.5" />
      {/* Right handle */}
      <path d="M76 22L82 22C86 22 92 22 92 25C92 28 86 28 82 28L76 28" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TakeawayBagDoodle({ className = "w-12 h-12", stroke = "#0B3FBF" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Bag body */}
      <path
        d="M16 32L24 88C24 90 28 92 40 92C52 92 56 90 56 88L64 32"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Folded top */}
      <path
        d="M12 32L68 32L64 24L16 24L12 32Z"
        stroke={stroke}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Small heart on bag */}
      <path
        d="M40 56C36 50 30 52 30 58C30 65 40 72 40 72C40 72 50 65 50 58C50 52 44 50 40 56Z"
        fill={stroke}
      />
    </svg>
  );
}

export function CoffeeCupDoodle({ className = "w-12 h-12", stroke = "#0B3FBF" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Steam */}
      <path d="M34 14C32 20 38 24 36 30" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M48 10C46 18 52 22 50 30" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M62 14C60 20 66 24 64 30" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      {/* Cup body */}
      <path
        d="M20 34H72L66 74C65 78 60 82 52 82H40C32 82 27 78 26 74L20 34Z"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Handle */}
      <path
        d="M72 40C82 40 86 48 86 54C86 64 78 66 68 66"
        stroke={stroke}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WhiskDoodle({ className = "w-12 h-12", stroke = "#0B3FBF" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Handle */}
      <rect x="26" y="8" width="8" height="28" rx="4" stroke={stroke} strokeWidth="3" />
      {/* Loops */}
      <path d="M30 36C14 46 14 74 30 92C46 74 46 46 30 36Z" stroke={stroke} strokeWidth="3" />
      <path d="M30 36C20 48 20 72 30 88C40 72 40 48 30 36Z" stroke={stroke} strokeWidth="2.5" />
      <path d="M30 36V90" stroke={stroke} strokeWidth="2.5" />
    </svg>
  );
}

export function SparkleDoodle({ className = "w-6 h-6", fill = "#E6F55A" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
        fill={fill}
      />
    </svg>
  );
}

// Circular rotating sticker badge ("CRUMB CLUB" or custom cafe name)
export function CrumbClubBadge({ text = "CRUMB CLUB", className = "w-28 h-28" }: { text?: string; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Rotating Scalloped / Starburst Yellow Badge */}
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* 16-point scalloped star badge */}
          <path
            d="M60 0 
               C65 0 68 8 73 9 
               C78 10 84 5 88 8 
               C93 11 94 19 98 23 
               C102 27 110 27 112 32 
               C115 37 111 44 113 49 
               C114 55 120 60 120 65 
               C120 70 112 73 111 78 
               C110 84 115 90 112 94 
               C109 99 101 100 97 104 
               C93 108 93 116 88 118 
               C83 121 76 117 71 119 
               C65 120 60 126 55 126 
               C50 126 47 118 42 117 
               C36 116 30 121 26 118 
               C21 115 20 107 16 103 
               C12 99 4 99 2 94 
               C-1 89 3 82 1 77 
               C0 71 -6 66 -6 61 
               C-6 56 2 53 3 48 
               C4 42 -1 36 2 32 
               C5 27 13 26 17 22 
               C21 18 21 10 26 8 
               C31 5 38 9 43 7 
               C49 6 54 0 60 0 Z"
            fill="#E6F55A"
            stroke="#0B3FBF"
            strokeWidth="3.5"
            transform="translate(6, 6) scale(0.9)"
          />
        </svg>
      </div>
      
      {/* Center text lockup with bubbly font */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <span className="font-display font-black text-xs uppercase tracking-tight text-[#0B3FBF] leading-none">
          {text.split(' ')[0] || 'CRUMB'}
        </span>
        <span className="font-display font-black text-sm uppercase tracking-tight text-[#0B3FBF] leading-none mt-0.5">
          {text.split(' ')[1] || 'CLUB'}
        </span>
        {/* Tiny bakery crumb dots */}
        <div className="flex gap-1 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0B3FBF]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#0B3FBF]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#0B3FBF]" />
        </div>
      </div>
    </div>
  );
}
