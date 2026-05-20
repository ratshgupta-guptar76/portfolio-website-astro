import { motion } from "motion/react";
import { Section } from "./ui/Section";

const DISCIPLINES = [
  { label: "RTL Design", detail: "SystemVerilog / Verilog" },
  { label: "Architecture", detail: "ML Accelerators / Systolic Arrays" },
  { label: "Verification", detail: "cocotb / Verilator" },
  { label: "Implementation", detail: "FPGA / Timing Closure" },
];

export function About() {
  return (
    <Section id="about" className="bg-background">
      <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left — Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="w-full lg:w-[45%] shrink-0"
        >
          <div className="aspect-[3/4] relative border border-white/[0.06] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1649649089599-59782dff8d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxpY29uJTIwY2hpcCUyMG1hY3JvfGVufDF8fHx8MTc3MjkwNTU1MHww&ixlib=rb-4.1.0&q=75&w=720"
              alt="Silicon architecture macro"
              decoding="async"
              loading="lazy"
              className="w-full h-full object-cover opacity-50 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#9a958c]">
                Fig. 01 — Cover image
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right — Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full lg:w-[55%] flex flex-col justify-center"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8 block">
            00 / About
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-primary leading-[1.2] tracking-tight mb-8">
            Designing digital RTL,
            <br className="hidden md:block" />
            end-to-end.
          </h2>

          <div className="font-sans text-[15px] text-muted-foreground leading-[1.8] space-y-5 max-w-lg">
            <p>
              I'm a Computer Engineering undergraduate at McMaster focused on
              digital RTL, hardware verification, and FPGA design. My current
              work centres on ML hardware accelerators — most recently an 8×8
              INT8 systolic MAC array, verified bit-exact against a NumPy
              reference and closing timing at 100 MHz on Xilinx Artix-7.
            </p>
            <p>
              Long-term, I'm aiming at graduate research in ML-accelerator
              microarchitecture — the part of the stack where algorithms,
              dataflow, and silicon constraints meet.
            </p>
          </div>

          {/* Discipline Grid */}
          <div className="mt-14 grid grid-cols-2 gap-x-12 gap-y-6">
            {DISCIPLINES.map((d, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  {d.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#9a958c]">
                  {d.detail}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
