import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function Loader({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Ease-out curve for more organic feel
      const t = currentStep / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.min(100, Math.floor(eased * 100)));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onLoadingComplete, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050506] flex flex-col items-center justify-center"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col items-center gap-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#706d65]">
          Initializing
        </span>

        <div className="font-mono text-7xl md:text-[10rem] font-light text-primary leading-none tracking-[-0.05em] tabular-nums">
          {progress.toString().padStart(3, "0")}
        </div>

        <div className="w-40 h-[1px] bg-white/[0.06] relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-white/30"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.08 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
