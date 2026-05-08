import { motion } from "motion/react";
import { Section, SectionHeader } from "./ui/Section";

const EXPERIENCE = [
  {
    id: "01",
    role: "Software Developer Intern",
    company: "Bank of Montreal (BMO)",
    period: "May 2025 — Aug 2025",
    description:
      "Backend microservices in a regulated, distributed environment. Built automated test frameworks that lifted regression coverage past 80% and added edge-case validation across distribution services. Performed root-cause debugging across distributed systems, working with cross-functional teams under production deadlines.",
  },
  {
    id: "02",
    role: "B.Eng. Computer Engineering",
    company: "McMaster University",
    period: "Sept 2023 — Apr 2027",
    description:
      "Dean's Honour List (2024), Engineering International Scholar Award, Faculty of Engineering Award of Excellence, Dean's Global Distinction. Coursework: Electronic Devices & Circuits (A), Microprocessor Systems (A), Communication Systems (A+), Signals & Systems (A), Data Structures and Algorithms (A), Control Systems.",
  },
  {
    id: "03",
    role: "Attendee — AI Accelerator & Compute-in-Memory Sessions",
    company: "IEEE ISSCC 2026, San Francisco, CA",
    period: "Feb 2026",
    description:
      "Sessions on SRAM constraints, KV-cache scaling, and TOPS/W vs TOPS/mm² trade-offs. Discussed silicon implementation and system-level design considerations with engineers from Qualcomm, IBM, Samsung, Synopsys, GSMC, and others.",
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      className="bg-[#070709] relative overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <SectionHeader title="Experience" subtitle="02 / Career" />

      <div className="w-full max-w-3xl">
        {EXPERIENCE.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            className={`relative flex gap-8 md:gap-12 ${
              index !== EXPERIENCE.length - 1
                ? "pb-14 md:pb-20 border-l border-white/[0.06] ml-[4px]"
                : "ml-[4px]"
            }`}
          >
            {/* Timeline node */}
            <div className="absolute left-0 top-[2px] -translate-x-1/2 flex flex-col items-center">
              <div className="size-[9px] border border-white/20 rotate-45 bg-background" />
            </div>

            {/* Content */}
            <div className="flex-1 pl-8 md:pl-12">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-3">
                <div>
                  <h4 className="text-lg md:text-xl font-serif text-primary leading-tight">
                    {exp.role}
                  </h4>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#b08d57] mt-1 block">
                    {exp.company}
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground whitespace-nowrap">
                  {exp.period}
                </span>
              </div>

              <p className="text-[14px] text-muted-foreground font-sans leading-[1.8] max-w-lg">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
