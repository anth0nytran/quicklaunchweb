"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type ColorPreset = {
  name: string;
  rgb: string; // Format: "249, 115, 22"
  gradientTo: string; // Format: "249, 115, 22" (for gradient end)
};

const COLOR_PRESETS: ColorPreset[] = [
  { name: "Orange", rgb: "249, 115, 22", gradientTo: "251, 146, 60" },
  { name: "Blue", rgb: "59, 130, 246", gradientTo: "96, 165, 250" },
  { name: "Purple", rgb: "147, 51, 234", gradientTo: "168, 85, 247" },
  { name: "Green", rgb: "34, 197, 94", gradientTo: "74, 222, 128" },
  { name: "Red", rgb: "239, 68, 68", gradientTo: "248, 113, 113" },
  { name: "Pink", rgb: "236, 72, 153", gradientTo: "244, 114, 182" },
  { name: "Teal", rgb: "20, 184, 166", gradientTo: "45, 212, 191" },
];

const DEFAULT_COLOR = COLOR_PRESETS[0];

type ColorSwitcherContextType = {
  currentColor: ColorPreset;
  setColor: (color: ColorPreset) => void;
  presets: ColorPreset[];
};

const ColorSwitcherContext = createContext<ColorSwitcherContextType | undefined>(undefined);

export function ColorSwitcherProvider({ children }: { children: React.ReactNode }) {
  const [currentColor, setCurrentColorState] = useState<ColorPreset>(DEFAULT_COLOR);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("accent-color");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const preset = COLOR_PRESETS.find((p) => p.name === parsed.name) || DEFAULT_COLOR;
        setCurrentColorState(preset);
      } catch {
        // Invalid saved data, use default
      }
    }
  }, []);

  // Update CSS variables when color changes
  const updateCSSVariables = useCallback((color: ColorPreset) => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    
    // For Tailwind: format "249 115 22" (spaces, no commas)
    const accentTailwind = color.rgb.replace(/,/g, " ");
    root.style.setProperty("--color-accent", accentTailwind);
    
    // For rgba() usage: format "249, 115, 22" (with commas)
    root.style.setProperty("--color-accent-rgb", color.rgb);
    
    // Calculate hover color (lighter by ~10%)
    const [r, g, b] = color.rgb.split(",").map((v) => parseInt(v.trim()));
    const hoverR = Math.min(255, Math.round(r + (255 - r) * 0.1));
    const hoverG = Math.min(255, Math.round(g + (255 - g) * 0.1));
    const hoverB = Math.min(255, Math.round(b + (255 - b) * 0.1));
    const hoverRgb = `${hoverR}, ${hoverG}, ${hoverB}`;
    const hoverTailwind = hoverRgb.replace(/,/g, " ");
    
    // For Tailwind: format "251 146 60" (spaces, no commas)
    root.style.setProperty("--color-accent-hover", hoverTailwind);
    // For rgba() usage: format "251, 146, 60" (with commas)
    root.style.setProperty("--color-accent-hover-rgb", hoverRgb);
    root.style.setProperty("--color-accent-gradient-to", color.gradientTo);
  }, []);

  // Update CSS variables when currentColor changes
  useEffect(() => {
    if (mounted) {
      updateCSSVariables(currentColor);
    }
  }, [currentColor, mounted, updateCSSVariables]);

  const setColor = useCallback((color: ColorPreset) => {
    setCurrentColorState(color);
    localStorage.setItem("accent-color", JSON.stringify({ name: color.name }));
    updateCSSVariables(color);
  }, [updateCSSVariables]);

  // Initialize CSS variables on mount
  useEffect(() => {
    if (mounted) {
      updateCSSVariables(currentColor);
    }
  }, [mounted, currentColor, updateCSSVariables]);

  return (
    <ColorSwitcherContext.Provider
      value={{
        currentColor,
        setColor,
        presets: COLOR_PRESETS,
      }}
    >
      {children}
    </ColorSwitcherContext.Provider>
  );
}

export function useColorSwitcher() {
  const context = useContext(ColorSwitcherContext);
  if (context === undefined) {
    throw new Error("useColorSwitcher must be used within a ColorSwitcherProvider");
  }
  return context;
}
