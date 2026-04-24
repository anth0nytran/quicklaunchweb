"use client";

import React, { useEffect, useState } from "react";

export const ExperienceHeroBackground = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const canUseMotion = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
    ).matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

    if (!canUseMotion || connection?.saveData) return;

    const loadVideo = () => setShouldLoadVideo(true);
    const idleId =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(loadVideo, { timeout: 1800 })
        : window.setTimeout(loadVideo, 1400);

    return () => {
      if ("cancelIdleCallback" in window && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId as number);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ backgroundColor: "#21346e" }}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero-poster.jpg')",
          transform: "scale(1.04)",
          transformOrigin: "center 40%",
        }}
      />

      {shouldLoadVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
          aria-hidden="true"
          className="absolute hidden h-full w-full object-cover md:block"
          style={{
            transform: "scale(1.15)",
            transformOrigin: "center 40%",
          }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260206_044704_dd33cb15-c23f-4cfc-aa09-a0465d4dcb54.mp4"
            type="video/mp4"
          />
        </video>
      )}

      <div className="absolute inset-0 bg-black/45" />
      <div
        className="absolute left-0 right-0 top-0 h-40"
        style={{ background: "linear-gradient(to bottom, rgba(8,14,36,0.6), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 md:h-56"
        style={{ background: "linear-gradient(to bottom, transparent, #080e24)" }}
      />
    </div>
  );
};
