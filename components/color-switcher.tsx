"use client";

import React, { useState } from "react";
import { useColorSwitcher } from "./color-switcher-context";
import { cn } from "@/lib/utils";

export function ColorSwitcher() {
  const { currentColor, setColor, presets } = useColorSwitcher();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[9999]">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-12 h-12 rounded-full border-2 backdrop-blur-md transition-all duration-200",
          "bg-white/[0.03] border-white/[0.15] hover:border-white/[0.25]",
          "shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30",
          "flex items-center justify-center",
          "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-black"
        )}
        style={{
          backgroundColor: `rgba(${currentColor.rgb}, 0.1)`,
          borderColor: `rgba(${currentColor.rgb}, 0.3)`,
        }}
        aria-label="Toggle color switcher"
      >
        <div
          className="w-6 h-6 rounded-full border-2 border-white/20"
          style={{
            backgroundColor: `rgb(${currentColor.rgb})`,
          }}
        />
      </button>

      {/* Color Panel */}
      {isOpen && (
        <div
          className={cn(
            "absolute right-0 top-14 w-64 rounded-2xl border backdrop-blur-xl",
            "bg-white/[0.06] border-white/[0.15] shadow-2xl shadow-black/40",
            "p-4 space-y-3 animate-fadeIn"
          )}
          style={{ animationDelay: "0s" }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-white">Accent Color</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white/70 transition-colors"
              aria-label="Close color switcher"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => {
              const isSelected = preset.name === currentColor.name;
              return (
                <button
                  key={preset.name}
                  onClick={() => {
                    setColor(preset);
                  }}
                  className={cn(
                    "relative rounded-xl border-2 p-3 transition-all duration-200",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    "flex flex-col items-center gap-2",
                    isSelected
                      ? "border-white/30 bg-white/[0.08] shadow-lg"
                      : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.05]"
                  )}
                  style={
                    isSelected
                      ? {
                          borderColor: `rgba(${preset.rgb}, 0.4)`,
                          backgroundColor: `rgba(${preset.rgb}, 0.08)`,
                          boxShadow: `0 4px 16px rgba(${preset.rgb}, 0.15)`,
                        }
                      : undefined
                  }
                >
                  {/* Color Swatch */}
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white/20 shadow-inner"
                    style={{
                      backgroundColor: `rgb(${preset.rgb})`,
                    }}
                  />
                  
                  {/* Color Name */}
                  <span
                    className={cn(
                      "text-xs font-medium",
                      isSelected ? "text-white" : "text-white/70"
                    )}
                  >
                    {preset.name}
                  </span>

                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                        style={{ color: `rgb(${preset.rgb})` }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Current Color Info */}
          <div className="pt-2 border-t border-white/[0.08]">
            <p className="text-xs text-white/50 text-center">
              Current: <span className="text-white/70 font-medium">{currentColor.name}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
