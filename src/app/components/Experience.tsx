import { motion } from "motion/react";
import { Section, SectionHeader } from "./ui/Section";

const EXPERIENCE = [
  {
    id: "01",
    role: "Contributing Writer",
    company: "Tellura",
    location: "Hamilton, ON",
    period: "Sep 2025 — Apr 2026",
    bullets: [
      "Researched and wrote articles on AI, healthcare, and emerging medical technology for a youth-focused platform.",
      "Translated technical concepts into clear, engaging content for non-technical audiences.",
      "Strengthened written communication and technical reasoning through editorial review cycles.",
    ],
  },
  {
    id: "02",
    role: "Software Developer Intern",
    company: "Bank of Montreal (BMO)",
    location: "Toronto, ON",
    period: "May 2025 — Aug 2025",
    bullets: [
      "Developed and validated backend microservices with an emphasis on correctness, structured testing, and failure-mode analysis.",
      "Designed automated test frameworks that raised regression coverage to 80%+ and added edge-case validation across distribution services.",
      "Performed root-cause debugging across distributed systems while collaborating with cross-functional teams under production deadlines.",
    ],
  },
  {
    id: "03",
    role: "Technical Assistant",
    company: "Down Syndrome Association of Hamilton",
    location: "Hamilton, ON",
    period: "Sep 2023",
    bullets: [
      "Ran activities and acted as an event ambassador, interacting with attendees throughout the day.",
      "Provided live-feed captions to improve event accessibility.",
    ],
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
        {EXPERIENCE.map((exp, index) => {
          const isLast = index === EXPERIENCE.length - 1;
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`relative flex gap-8 md:gap-12 ${
                !isLast ? "pb-14 md:pb-20" : ""
              }`}
            >
              {/* Timeline line (animated grow-in) */}
              {!isLast && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.1 + 0.25,
                    ease: "easeOut",
                  }}
                  style={{ originY: 0 }}
                  className="absolute left-[4px] top-3 bottom-0 w-px bg-gradient-to-b from-white/15 via-white/[0.06] to-transparent"
                />
              )}

              {/* Timeline node (scale + rotate in) */}
              <motion.div
                initial={{ scale: 0, rotate: 0, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 45, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1 + 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-0 top-[6px] size-[9px] border border-white/30 bg-background"
              />

              {/* Content */}
              <div className="flex-1 pl-8 md:pl-12">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-4">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1 + 0.2,
                    }}
                  >
                    <h4 className="text-lg md:text-xl font-serif text-primary leading-tight">
                      {exp.role}
                    </h4>
                    <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#b08d57]">
                        {exp.company}
                      </span>
                      <span className="text-[#b08d57]/30">/</span>
                      <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/70">
                        {exp.location}
                      </span>
                    </div>
                  </motion.div>

                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1 + 0.3,
                    }}
                    className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground whitespace-nowrap"
                  >
                    {exp.period}
                  </motion.span>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 max-w-xl">
                  {exp.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1 + 0.35 + i * 0.07,
                        ease: "easeOut",
                      }}
                      className="relative pl-5 text-[15px] text-muted-foreground font-sans leading-[1.75]"
                    >
                      <span className="absolute left-0 top-[10px] size-[4px] rotate-45 bg-[#b08d57]/70" />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
