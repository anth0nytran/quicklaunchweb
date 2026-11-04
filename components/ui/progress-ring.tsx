"use client";

import React from "react";

/**
 * Circular progress ring driven by CSS (see .animate-ringFill in globals.css)
 * so an auto-advancing stepper doesn't re-render on every frame.
 */
export function ProgressRingCSS({
  isActive = false,
  isPast = false,
  duration = 5000,
  size = 48,
  strokeWidth = 2,
}: {
  isActive?: boolean;
  isPast?: boolean;
  duration?: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      className={`absolute inset-0 -rotate-90 transition-opacity duration-300 ${
        isActive || isPast ? "opacity-100" : "opacity-40"
      }`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={strokeWidth}
      />
      {(isActive || isPast) && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(var(--color-accent-rgb))"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={isPast ? 0 : circumference}
          strokeLinecap="round"
          className={isActive ? "animate-ringFill" : ""}
          style={
            isActive
              ? ({
                  "--ring-duration": `${duration}ms`,
                  "--circumference": circumference,
                } as React.CSSProperties)
              : undefined
          }
        />
      )}
    </svg>
  );
}
