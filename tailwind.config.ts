import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base backgrounds
        base: "#0a0a0c",
        elevated: "#111113",
        
        // Accent system
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          hover: "rgb(var(--color-accent-hover) / <alpha-value>)",
        },
        
        // Semantic surface colors
        surface: {
          DEFAULT: "rgba(255, 255, 255, 0.03)",
          elevated: "rgba(255, 255, 255, 0.06)",
          solid: "rgba(10, 10, 12, 0.95)",
        },
        
        // Border colors
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.15)",
          active: "rgba(249, 115, 22, 0.5)",
        },
      },
      
      textColor: {
        primary: "rgba(255, 255, 255, 0.95)",
        secondary: "rgba(255, 255, 255, 0.70)",
        muted: "rgba(255, 255, 255, 0.50)",
        faint: "rgba(255, 255, 255, 0.30)",
      },
      
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      
      backdropBlur: {
        xs: "4px",
      },
      
      boxShadow: {
        "glass": "inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.3)",
        "glass-md": "inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 4px 16px rgba(0, 0, 0, 0.4)",
        "glass-lg": "inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.5)",
        "glow": "0 0 40px rgba(249, 115, 22, 0.15)",
        "glow-lg": "0 0 60px rgba(249, 115, 22, 0.25)",
      },
      
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
      },
      
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      
      fontFamily: {
        sans: [
          "var(--font-lato)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        heading: [
          "var(--font-montserrat)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
