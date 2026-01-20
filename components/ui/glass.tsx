"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* =============================================================================
   Glass Design System Primitives
   Apple/VisionOS-inspired liquid glass components
   ============================================================================= */

// -----------------------------------------------------------------------------
// GlassCard - Frosted glass panel component
// -----------------------------------------------------------------------------

type GlassCardVariant = "default" | "elevated" | "solid";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassCardVariant;
  glow?: boolean;
  hover?: boolean;
}

const cardVariants: Record<GlassCardVariant, string> = {
  default: "bg-white/[0.03] backdrop-blur-md border-white/[0.08] shadow-glass",
  elevated: "bg-white/[0.06] backdrop-blur-xl border-white/[0.10] shadow-glass-md",
  solid: "bg-[rgba(10,10,12,0.95)] backdrop-blur-xl border-white/[0.08] shadow-glass-lg",
};

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", glow = false, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "relative rounded-2xl border",
          // Variant styles
          cardVariants[variant],
          // Glow effect
          glow && "shadow-glow",
          // Hover interactions
          hover && [
            "transition-all duration-300 ease-smooth",
            "hover:bg-white/[0.05] hover:border-white/[0.15] hover:shadow-glass-md",
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

// -----------------------------------------------------------------------------
// GlassButton - Frosted glass button with variants
// -----------------------------------------------------------------------------

type GlassButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type GlassButtonSize = "sm" | "md" | "lg";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}

const buttonVariants: Record<GlassButtonVariant, string> = {
  primary: cn(
    "bg-accent text-black font-semibold",
    "hover:bg-accent-hover hover:shadow-glow",
    "active:scale-[0.98]",
    "shadow-lg shadow-accent/25"
  ),
  secondary: cn(
    "bg-white text-black font-semibold",
    "hover:bg-accent hover:text-black",
    "active:scale-[0.98]"
  ),
  ghost: cn(
    "bg-white/[0.05] text-white/90 border border-white/[0.08]",
    "hover:bg-white/[0.10] hover:border-white/[0.15]",
    "active:scale-[0.98]"
  ),
  outline: cn(
    "bg-transparent text-white border border-white/[0.15]",
    "hover:bg-white/[0.05] hover:border-white/[0.25]",
    "active:scale-[0.98]"
  ),
};

const buttonSizes: Record<GlassButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-6 py-3 text-sm rounded-xl gap-2",
  lg: "px-8 py-4 text-base rounded-full gap-2",
};

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center",
          "font-medium transition-all duration-200 ease-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          "disabled:opacity-50 disabled:pointer-events-none",
          // Variant & size
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          <>
            {children}
            {icon}
          </>
        )}
      </button>
    );
  }
);
GlassButton.displayName = "GlassButton";

// -----------------------------------------------------------------------------
// GlassInput - Frosted glass input field
// -----------------------------------------------------------------------------

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          // Base styles
          "w-full rounded-xl border bg-white/[0.03] backdrop-blur-sm",
          "px-4 py-3 text-sm text-white",
          "placeholder:text-white/30",
          // Border states
          "border-white/[0.08]",
          "hover:border-white/[0.15]",
          "focus:border-accent/50 focus:bg-white/[0.05]",
          // Focus ring
          "focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-0",
          // Transition
          "transition-all duration-200 ease-smooth",
          // Error state
          error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
    );
  }
);
GlassInput.displayName = "GlassInput";

// -----------------------------------------------------------------------------
// GlassPill - Small badge/tag component
// -----------------------------------------------------------------------------

type GlassPillVariant = "default" | "accent" | "success" | "warning";

interface GlassPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: GlassPillVariant;
  pulse?: boolean;
}

const pillVariants: Record<GlassPillVariant, string> = {
  default: "bg-white/[0.05] border-white/[0.10] text-white/70",
  accent: "bg-accent/10 border-accent/20 text-accent",
  success: "bg-green-500/10 border-green-500/20 text-green-400",
  warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
};

export const GlassPill = React.forwardRef<HTMLSpanElement, GlassPillProps>(
  ({ className, variant = "default", pulse, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center gap-2 rounded-full border px-3 py-1",
          "text-xs font-medium uppercase tracking-wider",
          "backdrop-blur-md transition-colors duration-200",
          // Variant
          pillVariants[variant],
          // Hover
          "hover:bg-white/[0.08]",
          className
        )}
        {...props}
      >
        {pulse && (
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
          </span>
        )}
        {children}
      </span>
    );
  }
);
GlassPill.displayName = "GlassPill";

// -----------------------------------------------------------------------------
// GlassSelect - Option selection button (for modal choices)
// -----------------------------------------------------------------------------

interface GlassSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  label: string;
  description?: React.ReactNode;
  price?: React.ReactNode;
  priceColor?: "default" | "accent" | "success";
}

const priceColors = {
  default: "text-white/70",
  accent: "text-accent",
  success: "text-green-400",
};

export const GlassSelect = React.forwardRef<HTMLButtonElement, GlassSelectProps>(
  ({ className, selected, label, description, price, priceColor = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          // Base styles
          "w-full rounded-xl border p-4 text-left",
          "transition-all duration-200 ease-smooth",
          // Default state
          "bg-white/[0.03] border-white/[0.08]",
          "hover:bg-white/[0.06] hover:border-white/[0.15]",
          // Selected state
          selected && [
            "border-accent/50 bg-accent/10",
            "hover:border-accent/60 hover:bg-accent/15",
          ],
          // Focus
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-white">{label}</span>
          {price && (
            <span className={cn("font-semibold", priceColors[priceColor])}>{price}</span>
          )}
        </div>
        {description && (
          <div className="mt-1 text-xs text-white/50">{description}</div>
        )}
      </button>
    );
  }
);
GlassSelect.displayName = "GlassSelect";

// -----------------------------------------------------------------------------
// GlassDivider - Subtle divider line
// -----------------------------------------------------------------------------

interface GlassDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const GlassDivider = React.forwardRef<HTMLDivElement, GlassDividerProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white/[0.08]",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className
        )}
        {...props}
      />
    );
  }
);
GlassDivider.displayName = "GlassDivider";

// -----------------------------------------------------------------------------
// GlassOverlay - Background overlay for modals
// -----------------------------------------------------------------------------

interface GlassOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  blur?: boolean;
}

export const GlassOverlay = React.forwardRef<HTMLDivElement, GlassOverlayProps>(
  ({ className, blur = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 bg-black/70",
          blur && "backdrop-blur-sm",
          className
        )}
        {...props}
      />
    );
  }
);
GlassOverlay.displayName = "GlassOverlay";

// -----------------------------------------------------------------------------
// Ambient glow backgrounds
// -----------------------------------------------------------------------------

interface AmbientGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "accent" | "white";
  position?: "top" | "center" | "bottom";
  intensity?: "subtle" | "medium" | "strong";
}

export const AmbientGlow = React.forwardRef<HTMLDivElement, AmbientGlowProps>(
  ({ className, color = "accent", position = "top", intensity = "subtle", ...props }, ref) => {
    const colorStyles = {
      accent: "from-accent/10",
      white: "from-white/5",
    };
    
    const positionStyles = {
      top: "top-0 left-1/2 -translate-x-1/2",
      center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      bottom: "bottom-0 left-1/2 -translate-x-1/2",
    };
    
    const intensityStyles = {
      subtle: "opacity-50",
      medium: "opacity-75",
      strong: "opacity-100",
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-none absolute w-[600px] h-[400px]",
          "bg-gradient-radial to-transparent blur-3xl",
          colorStyles[color],
          positionStyles[position],
          intensityStyles[intensity],
          className
        )}
        style={{
          background: `radial-gradient(ellipse 50% 50% at center, ${
            color === "accent" ? "rgba(var(--color-accent-rgb), 0.12)" : "rgba(255, 255, 255, 0.05)"
          }, transparent 70%)`,
        }}
        {...props}
      />
    );
  }
);
AmbientGlow.displayName = "AmbientGlow";
