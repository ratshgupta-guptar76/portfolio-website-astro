import React from "react";
import { cn } from "../../../lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section className={cn("w-full py-24 md:py-40 scroll-mt-20 flex flex-col items-center justify-center relative", className)} {...props}>
      <div className="w-full max-w-[1200px] px-6 md:px-12 lg:px-16 flex flex-col relative z-10">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 mb-16 md:mb-24", className)}>
      {subtitle && (
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {subtitle}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-primary leading-[1.1]">
        {title}
      </h2>
    </div>
  );
}
