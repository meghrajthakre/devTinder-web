import React from 'react'

const BackgroundPattern = ({ children }) => {
  return (
    <div className="relative bg-base-100 overflow-hidden min-h-screen">
      {/* SVG */}
      <svg
        viewBox="0 0 1440 600"
        className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* lines */}
        <path
          d="M0,200 C300,350 700,100 1440,250"
          fill="none"
          stroke="hsl(var(--p))"
          strokeWidth="2"
          strokeDasharray="6 10"
        />
        <path
          d="M0,350 C400,150 900,450 1440,200"
          fill="none"
          stroke="hsl(var(--s))"
          strokeWidth="1.5"
          strokeDasharray="4 12"
          opacity="0.7"
        />

        {/* hearts */}
        <g fill="hsl(var(--p))" opacity="0.6">
          <path transform="translate(300 220) scale(0.12)"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 5.42 4.42 3 7.5 3 
              c1.74 0 3.41.81 4.5 2.09 
              C13.09 3.81 14.76 3 16.5 3 
              19.58 3 22 5.42 22 8.5 
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </g>
      </svg>

      {/* Actual Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundPattern;

