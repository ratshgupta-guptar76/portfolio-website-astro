import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  kicker,
  title,
  lede,
  back,
}: {
  kicker: string;
  title: ReactNode;
  lede?: string;
  back?: { to: string; label: string };
}) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(235,230,221,0.12) 1px, transparent 1px),linear-gradient(90deg, rgba(235,230,221,0.12) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
        }}
      />
      <div className="max-w-[1200px] mx-auto relative z-10">
        {back && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href={back.to}
              className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#5a5750] hover:text-[#ebe6dd] transition-colors duration-300 mb-12 group"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              <span>{back.label}</span>
            </a>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#706d65] mb-6 block">
            {kicker}
          </span>
          <h1 className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-serif text-[#ebe6dd] leading-[0.98] tracking-[-0.02em] mb-6">
            {title}
          </h1>
          {lede && (
            <p className="text-[15px] text-[#8a8680] font-sans font-light leading-[1.75] max-w-xl">
              {lede}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export function TagChip({ label }: { label: string }) {
  return (
    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#706d65] border border-white/[0.08] px-2.5 py-0.5 hover:border-white/[0.18] hover:text-[#ebe6dd]/80 transition-colors duration-500">
      {label}
    </span>
  );
}
