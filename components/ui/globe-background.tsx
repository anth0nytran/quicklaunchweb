"use client";

import React from "react";

export function GlobeBackground() {
  // Precomputed rx values for perfect 3D cosine rotation on the Y axis
  // 24 steps = 15 degrees per step, guaranteeing perfectly smooth constant angular velocity
  // cos(0...360) * 160
  const rxValues = "160;154.5;138.6;113.1;80.0;41.4;0;41.4;80.0;113.1;138.6;154.5;160;154.5;138.6;113.1;80.0;41.4;0;41.4;80.0;113.1;138.6;154.5;160";

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center mix-blend-screen -translate-y-[5%]">

      {/* Dark overlay specifically targeting the center so text pops, softened further */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5)_20%,transparent_75%)] z-10 translate-y-[5%]"></div>

      {/* 3D Network Globe SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
        className="absolute w-full h-full max-w-[1000px] opacity-100 z-0"
      >
        <defs>
          {/* Intense neon glow for nodes */}
          <filter id="neonGlowNetwork" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Very subtle edge glow to give sphere definition without crowding the center */}
          <radialGradient id="edgeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="85%" stopColor="#14B8A6" stopOpacity="0.0" />
            <stop offset="97%" stopColor="#14B8A6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        <g transform="translate(200, 200)">
          {/* Base Edge Volume to fake 3D depth, completely hollow center */}
          <circle r="160" fill="url(#edgeGlow)" />

          <g>
            {/* Outer Edge */}
            <circle r="160" strokeWidth="1.5" stroke="#5EEAD4" fill="none" opacity="0.9" filter="url(#neonGlowNetwork)" />
            <circle r="160" strokeWidth="1" fill="none" stroke="#14B8A6" opacity="0.85" />

            {/* Static Latitudes (These define the horizontal curved layers) */}
            <g stroke="#14B8A6" fill="none" opacity="0.85">
              <ellipse cx="0" cy="0" rx="160" ry="20" strokeWidth="1" stroke="#5EEAD4" opacity="0.9" filter="url(#neonGlowNetwork)" />
              <ellipse cx="0" cy="-60" rx="148" ry="18.5" strokeWidth="1" />
              <ellipse cx="0" cy="60" rx="148" ry="18.5" strokeWidth="1" />
              <ellipse cx="0" cy="-120" rx="105.8" ry="13.2" strokeWidth="1" />
              <ellipse cx="0" cy="120" rx="105.8" ry="13.2" strokeWidth="1" />
            </g>

            {/* Spinning 3D Longitudes (The pure mathematical engine for fake 3D spin!) */}
            {/* 6 ellipses mapped perfectly phase-separated by 2 seconds over a 24s 360-degree rotation */}
            <g stroke="#14B8A6" fill="none" opacity="0.85">
              <ellipse cx="0" cy="0" rx="160" ry="160" strokeWidth="1">
                <animate attributeName="rx" values={rxValues} dur="24s" repeatCount="indefinite" begin="0s" />
              </ellipse>
              <ellipse cx="0" cy="0" rx="160" ry="160" strokeWidth="1">
                <animate attributeName="rx" values={rxValues} dur="24s" repeatCount="indefinite" begin="-2s" />
              </ellipse>
              <ellipse cx="0" cy="0" rx="160" ry="160" strokeWidth="1">
                <animate attributeName="rx" values={rxValues} dur="24s" repeatCount="indefinite" begin="-4s" />
              </ellipse>
              <ellipse cx="0" cy="0" rx="160" ry="160" strokeWidth="1">
                <animate attributeName="rx" values={rxValues} dur="24s" repeatCount="indefinite" begin="-6s" />
              </ellipse>
              <ellipse cx="0" cy="0" rx="160" ry="160" strokeWidth="1">
                <animate attributeName="rx" values={rxValues} dur="24s" repeatCount="indefinite" begin="-8s" />
              </ellipse>
              <ellipse cx="0" cy="0" rx="160" ry="160" strokeWidth="1">
                <animate attributeName="rx" values={rxValues} dur="24s" repeatCount="indefinite" begin="-10s" />
              </ellipse>
            </g>

            {/* Major Intersections - Solid Pulses */}
            <g fill="#5EEAD4" filter="url(#neonGlowNetwork)">
              <circle cx="-160" cy="0" r="3" opacity="1" fill="#fff" />
              <circle cx="160" cy="0" r="3" opacity="1" fill="#fff" />
              <circle cx="0" cy="-160" r="3" opacity="0.8" fill="#fff" />
              <circle cx="0" cy="160" r="3" opacity="0.8" fill="#fff" />

              <circle cx="0" cy="-60" r="2.5" opacity="0.8">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="60" r="2.5" opacity="0.8">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" begin="1.5s" />
              </circle>

              {/* Pulsing "Stars" / Data Traffic moving along paths to feel like spherical orbit */}

              {/* Equator Traffic */}
              <circle r="3" fill="#fff" opacity="0.9">
                <animateMotion
                  path="M -160,0 A 160,20 0 1,1 160,0 A 160,20 0 1,1 -160,0"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="2.5" fill="#5EEAD4" opacity="0.8">
                <animateMotion
                  path="M 160,0 A 160,20 0 1,1 -160,0 A 160,20 0 1,1 160,0"
                  dur="15s"
                  repeatCount="indefinite"
                  begin="2s"
                />
              </circle>

              {/* Latitude Traffic (Upper / Lower - giving the sphere turning illusion) */}
              <circle r="2" fill="#a5f3fc" opacity="0.8">
                <animateMotion
                  path="M -148,-60 A 148,18.5 0 1,1 148,-60 A 148,18.5 0 1,1 -148,-60"
                  dur="10s"
                  repeatCount="indefinite"
                  begin="1s"
                />
              </circle>
              <circle r="2" fill="#5EEAD4" opacity="0.9">
                <animateMotion
                  path="M 148,60 A 148,18.5 0 1,1 -148,60 A 148,18.5 0 1,1 148,60"
                  dur="14s"
                  repeatCount="indefinite"
                  begin="3s"
                />
              </circle>

              {/* Longitude Traffic (Poles) */}
              <circle r="2" fill="#fff" opacity="0.7">
                <animateMotion
                  path="M 0,-160 A 70,160 0 1,1 0,160 A 70,160 0 1,1 0,-160"
                  dur="18s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>
              <circle r="1.5" fill="#5EEAD4" opacity="1">
                <animateMotion
                  path="M 0,160 A 140,160 0 1,1 0,-160 A 140,160 0 1,1 0,160"
                  dur="20s"
                  repeatCount="indefinite"
                  begin="7s"
                />
              </circle>
            </g>

            {/* Background subtle dust/stars forming loose space/network connections outside */}
            <g fill="#14B8A6" opacity="0.5">
              <circle cx="-160" cy="-160" r="1.5">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="170" cy="-140" r="1.5">
                <animate attributeName="opacity" values="0.1;0.8;0.1" dur="5s" repeatCount="indefinite" begin="1s" />
              </circle>
              <circle cx="-140" cy="150" r="1.5">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" begin="2s" />
              </circle>
              <circle cx="150" cy="160" r="1.5">
                <animate attributeName="opacity" values="0.2;0.9;0.2" dur="6s" repeatCount="indefinite" begin="0.5s" />
              </circle>

              <circle cx="-190" cy="-10" r="1">
                <animate attributeName="opacity" values="0;1;0" dur="4.5s" repeatCount="indefinite" begin="1s" />
              </circle>
              <circle cx="200" cy="30" r="1">
                <animate attributeName="opacity" values="0;0.7;0" dur="5.5s" repeatCount="indefinite" begin="2.5s" />
              </circle>
            </g>

          </g>
        </g>
      </svg>
    </div>
  );
}
