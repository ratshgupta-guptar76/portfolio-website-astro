import React from "react";
import { cn } from "../../../lib/utils";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] transition-colors",
          {
            "bg-white/5 text-muted-foreground": variant === "default",
            "border border-white/10 text-muted-foreground": variant === "outline",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Chip.displayName = "Chip";
