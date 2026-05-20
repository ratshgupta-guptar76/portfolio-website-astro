import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useRef, useEffect, useState } from "react";

// --- Static Star Field (baked into /public/starfield.svg)
// Replaces the previous canvas-based animation; lost the twinkle/drift
// but gained zero per-frame paint cost during scroll.
function StarField() {
  return (
    <img
      src="/starfield.svg"
      alt=""
      aria-hidden="true"
      className="absolute inset-0 z-[1] pointer-events-none w-full h-full object-cover"
    />
  );
}

// --- Geometric Grid Accent (structural, not a circuit board) ---
function StructuralGrid() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      {/* Primary architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(235,230,221,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(235,230,221,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
        }}
      />
      {/* Finer sub-grid (registers / modularity feel) */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(235,230,221,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(235,230,221,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />
      {/* Horizontal timing-line accents */}
      <motion.div
        className="absolute left-0 right-0 top-[38%] h-px bg-gradient-to-r from-transparent via-[#ebe6dd]/[0.04] to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 3, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute left-0 right-0 top-[62%] h-px bg-gradient-to-r from-transparent via-[#ebe6dd]/[0.03] to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 3, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Vertical structural lines */}
      <motion.div
        className="absolute top-0 bottom-0 left-[20%] w-px bg-gradient-to-b from-transparent via-[#ebe6dd]/[0.03] to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2.5, delay: 2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute top-0 bottom-0 right-[20%] w-px bg-gradient-to-b from-transparent via-[#ebe6dd]/[0.03] to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2.5, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

// --- Floating Panel ---
function FloatingPanel({
  className,
  imgSrc,
  label,
  delay,
  parallaxY,
}: {
  className: string;
  imgSrc: string;
  label: string;
  delay: number;
  parallaxY: any;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      // aria-hidden="true"
      className={`absolute hidden lg:block ${className}`}
      style={{ y: parallaxY }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-full border border-white/[0.06] hover:border-[#ebe6dd]/15 overflow-hidden cursor-pointer group transition-colors duration-500">
        {/* Image */}
        <motion.img
          src={imgSrc}
          alt=""
          decoding="async"
          className="w-full h-full object-cover"
          animate={{
            filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
            opacity: hovered ? 0.5 : 0.2,
            scale: hovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
          }}
        />
        {/* Corner marks (precision / alignment reference) */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#ebe6dd]/[0.15] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#ebe6dd]/[0.15] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#ebe6dd]/[0.15] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#ebe6dd]/[0.15] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Label reveal on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-3 py-2"
          initial={{ opacity: 0, y: 4 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#ebe6dd]/60">
            {label}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// --- Main Hero ---
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const smoothScrollY = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 140,
    mass: 0.25,
  });

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let latestX = 0;
    let latestY = 0;
    let attached = false;

    const update = () => {
      rafId = null;
      mouseX.set(latestX);
      mouseY.set(latestY);
    };

    const handleMouse = (e: MouseEvent) => {
      latestX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      latestY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    const attach = () => {
      if (attached) return;
      window.addEventListener("mousemove", handleMouse, { passive: true });
      attached = true;
    };
    const detach = () => {
      if (!attached) return;
      window.removeEventListener("mousemove", handleMouse);
      attached = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    // Only listen to mousemove when the Hero is actually on-screen.
    // Doesn't fire during scroll within Hero (still intersecting); only when
    // Hero leaves/enters the viewport entirely.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) attach();
        else detach();
      },
      { threshold: 0 },
    );
    io.observe(container);

    return () => {
      io.disconnect();
      detach();
    };
  }, [mouseX, mouseY]);

  // Background layers keep the loose, floaty spring for that cinematic feel.
  // Text gets a tighter, fast-settling spring: smooth enough to soften
  // wheel-tick stutter, stiff/damped enough that it stops updating within
  // a frame or two of scroll-end (no trail-off jitter).
  const textSmooth = useSpring(scrollYProgress, {
    damping: 45,
    stiffness: 240,
    mass: 0.12,
    restDelta: 0.001,
  });

  const bgScrollY = useTransform(smoothScrollY, [0, 1], ["0%", "20%"]);
  const midScrollY = useTransform(smoothScrollY, [0, 1], ["0%", "35%"]);
  const fgScrollY = useTransform(smoothScrollY, [0, 1], ["0%", "55%"]);
  const textScrollY = useTransform(textSmooth, [0, 1], ["0%", "95%"]);
  const textOpacity = useTransform(textSmooth, [0, 0.4], [1, 0]);

  // Floating panel parallax (midground speed)
  const panelLeftY = useTransform(smoothScrollY, [0, 1], ["0%", "30%"]);
  const panelRightY = useTransform(smoothScrollY, [0, 1], ["0%", "40%"]);
  const panelTopY = useTransform(smoothScrollY, [0, 1], ["0%", "25%"]);

  // Mouse-driven foreground drift
  const driftX = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const driftY = useTransform(smoothMouseY, [-1, 1], [-6, 6]);

  return (
    <>
      <section
        ref={containerRef}
        className="relative h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#040405]"
      >
      {/* === LAYER 0: Deep background glow === */}
      <motion.div
        style={{ y: bgScrollY, willChange: "transform" }}
        className="absolute inset-0 z-0"
      >
        {/* Cosmic background image */}
        <img
          src="https://images.unsplash.com/photo-1767188789485-54e0922d76a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY29zbW9zJTIwZGVlcCUyMHNwYWNlJTIwc3RhcnMlMjBuZWJ1bGF8ZW58MXx8fHwxNzcyOTA3MTE4fDA&ixlib=rb-4.1.0&q=80&w=1920"
          alt=""
          className="w-full h-[130%] object-cover opacity-[0.12]"
        />
        {/* Top / bottom fade to black */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040405] via-transparent to-[#040405]" />
        {/* Radial glow — soft lunar warmth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(180,160,130,0.04),transparent_70%)]" />
      </motion.div>

      {/* === LAYER 1: Star field canvas === */}
      <StarField />

      {/* === LAYER 2: Structural grid === */}
      <motion.div style={{ y: midScrollY }} className="absolute inset-0">
        <StructuralGrid />
      </motion.div>

      {/* === LAYER 2.5: Midground glow accents === */}
      <motion.div
        style={{ y: midScrollY }}
        className="absolute inset-0 z-[3] pointer-events-none"
      >
        {/* Soft amber/warm glow off-center — like distant light on silicon */}
        <div className="absolute top-[30%] left-[15%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(200,170,120,0.025),transparent_60%)]" />
        <div className="absolute bottom-[25%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(160,150,180,0.02),transparent_60%)]" />
      </motion.div>

      {/* === LAYER 3: Floating panels (midground objects) === */}
      <FloatingPanel
        className="top-[14%] left-[4%] w-[140px] h-[200px] z-[5]"
        imgSrc="https://images.unsplash.com/photo-1652724933904-37f1fc1170ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxpY29uJTIwd2FmZXIlMjBtYWNybyUyMHNlbWljb25kdWN0b3IlMjBkYXJrfGVufDF8fHx8MTc3MjkwNzExOHww&ixlib=rb-4.1.0&q=80&w=400"
        label="Silicon"
        delay={1.4}
        parallaxY={panelLeftY}
      />
      <FloatingPanel
        className="bottom-[12%] right-[3%] w-[160px] h-[220px] z-[5]"
        imgSrc="https://images.unsplash.com/photo-1649182784901-48f5f2d40ecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGFyY2hpdGVjdHVyZSUyMGRhcmslMjBtaW5pbWFsfGVufDF8fHx8MTc3MjkwNzExOXww&ixlib=rb-4.1.0&q=80&w=400"
        label="Structure"
        delay={1.6}
        parallaxY={panelRightY}
      />
      {/* Third smaller panel — top right, adds asymmetric balance */}
      <FloatingPanel
        className="top-[22%] right-[12%] w-[100px] h-[130px] z-[5]"
        imgSrc="https://images.unsplash.com/photo-1767188789485-54e0922d76a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY29zbW9zJTIwZGVlcCUyMHNwYWNlJTIwc3RhcnMlMjBuZWJ1bGF8ZW58MXx8fHwxNzcyOTA3MTE4fDA&ixlib=rb-4.1.0&q=80&w=400"
        label="Depth"
        delay={2.0}
        parallaxY={panelTopY}
      />

      {/* === LAYER 4: Foreground content === */}
      <motion.div
        style={{
          y: textScrollY,
          opacity: textOpacity,
          x: driftX,
          willChange: "transform, opacity",
        }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-[960px] mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="w-8 h-px bg-[#9a958c]/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#9a958c]">
            RTL Design
          </span>
          <span className="inline-block w-1 h-1 bg-[#9a958c]/50 rounded-full" />
          <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-[#9a958c]">
            Hardware Verification
          </span>
          <span className="w-8 h-px bg-[#9a958c]/40" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="text-[clamp(2.8rem,8.5vw,7rem)] font-serif text-[#ebe6dd] leading-[0.92] tracking-[-0.03em]"
        >
          <span className="block">Silicon Systems</span>
          <span className="block mt-1">
            <span className="text-[#7a766e] italic font-normal text-[0.85em]">
              &amp;
            </span>{" "}
            Architecture
          </span>
        </motion.h1>

        {/* Decorative rule under title */}
        <motion.div
          className="mt-8 flex items-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#9a958c]/30" />
          <span className="w-1.5 h-1.5 border border-[#9a958c]/30 rotate-45" />
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#9a958c]/30" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-[15px] md:text-[17px] text-[#8a8680] font-sans font-normal leading-[1.7] max-w-[480px] tracking-[0.01em]"
        >
          RTL design and verification on FPGA.
          <br className="hidden md:block" /> Aiming for graduate research in
          ML-accelerator microarchitecture.
        </motion.p>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-20 group flex flex-col items-center gap-3 cursor-pointer"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#7a766e] group-hover:text-[#ebe6dd]/60 transition-colors duration-700">
            Begin
          </span>
          <div className="w-px h-10 bg-white/[0.06] relative overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 bg-[#9a958c]/60 group-hover:bg-[#ebe6dd]/40 transition-colors duration-700"
              animate={{
                height: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.a>
      </motion.div>

      {/* === LAYER 5: Foreground ambient geometry === */}
      <motion.div
        style={{ y: fgScrollY, x: driftX }}
        className="absolute inset-0 z-[4] pointer-events-none hidden lg:block"
      >
        {/* Tiny crosshair markers — precision / alignment cues */}
        <motion.div
          className="absolute top-[28%] left-[22%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
        >
          <div className="w-5 h-px bg-[#ebe6dd]/[0.06]" />
          <div className="w-px h-5 bg-[#ebe6dd]/[0.06] absolute top-[-10px] left-[10px]" />
        </motion.div>
        <motion.div
          className="absolute bottom-[32%] right-[18%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.8 }}
        >
          <div className="w-5 h-px bg-[#ebe6dd]/[0.05]" />
          <div className="w-px h-5 bg-[#ebe6dd]/[0.05] absolute top-[-10px] left-[10px]" />
        </motion.div>
        {/* Small dot cluster — like test points or via pads */}
        <motion.div
          className="absolute bottom-[40%] left-[8%] flex gap-[6px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
        >
          {[0.03, 0.05, 0.04, 0.03].map((o, i) => (
            <div
              key={i}
              className="w-[3px] h-[3px] rounded-full"
              style={{ backgroundColor: `rgba(235,230,221,${o})` }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* === Film grain overlay === */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* === LAYER 6: Bottom vignette === */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent z-20" />
      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#040405] to-transparent z-20" />
      {/* Side vignettes */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#040405]/60 to-transparent z-[2]" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#040405]/60 to-transparent z-[2]" />
    </section>
    </>
  );
}