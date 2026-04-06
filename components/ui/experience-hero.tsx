"use client";

import React from "react";

export const ExperienceHeroBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ backgroundColor: "#21346e" }}>
      {/* Background video — scaled down to show more of the scene */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute w-full h-full object-cover"
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

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to bottom, rgba(8,14,36,0.6), transparent)" }} />

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 md:h-56" style={{ background: "linear-gradient(to bottom, transparent, #080e24)" }} />
    </div>
  );
};
