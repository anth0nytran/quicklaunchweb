import React from "react";
import { cn } from "@/lib/utils";

type BGVariantType =
  | "dots"
  | "diagonal-stripes"
  | "grid"
  | "horizontal-lines"
  | "vertical-lines"
  | "checkerboard";

type BGMaskType =
  | "fade-center"
  | "fade-edges"
  | "fade-top"
  | "fade-bottom"
  | "fade-left"
  | "fade-right"
  | "fade-x"
  | "fade-y"
  | "none";

type BGPatternProps = React.ComponentProps<"div"> & {
  variant?: BGVariantType;
  mask?: BGMaskType;
  size?: number;
  fill?: string;
};

const maskClasses: Record<BGMaskType, string> = {
  "fade-edges":
    "[mask-image:radial-gradient(ellipse_50%_50%_at_center,black,transparent)]",
  "fade-center":
    "[mask-image:radial-gradient(ellipse_100%_100%_at_center,transparent_0%,transparent_15%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.1)_40%,rgba(0,0,0,0.3)_55%,rgba(0,0,0,0.6)_70%,black_100%)]",
  "fade-top": "[mask-image:linear-gradient(to_bottom,transparent,black)]",
  "fade-bottom": "[mask-image:linear-gradient(to_bottom,black,transparent)]",
  "fade-left": "[mask-image:linear-gradient(to_right,transparent,black)]",
  "fade-right": "[mask-image:linear-gradient(to_right,black,transparent)]",
  "fade-x":
    "[mask-image:linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]",
  "fade-y":
    "[mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]",
  none: "",
};

function getBgImage(variant: BGVariantType, fill: string, size: number) {
  switch (variant) {
    case "dots":
      return `radial-gradient(${fill} 1px, transparent 1px)`;
    case "grid":
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case "diagonal-stripes":
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`;
    case "horizontal-lines":
      return `linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
    case "vertical-lines":
      return `linear-gradient(to right, ${fill} 1px, transparent 1px)`;
    case "checkerboard":
      return `linear-gradient(45deg, ${fill} 25%, transparent 25%), linear-gradient(-45deg, ${fill} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${fill} 75%), linear-gradient(-45deg, transparent 75%, ${fill} 75%)`;
    default:
      return undefined;
  }
}

const BGPattern = ({
  variant = "grid",
  mask = "none",
  size = 24,
  fill = "#252525",
  className,
  style,
  ...props
}: BGPatternProps) => {
  const bgSize = `${size}px ${size}px`;
  const backgroundImage = getBgImage(variant, fill, size);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 size-full",
        maskClasses[mask],
        className
      )}
      style={{
        backgroundImage,
        backgroundSize: bgSize,
        ...style,
      }}
      {...props}
    />
  );
};

BGPattern.displayName = "BGPattern";
export { BGPattern };
