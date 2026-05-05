import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "./ui/Section";
import { useRef } from "react";

const PROJECTS = [
  {
    id: "01",
    slug: "int8-systolic-mac-array",
    title: "INT8 Systolic MAC Array",
    category: "Architecture / FPGA",
    description:
      "High-performance matrix multiplication engine implemented in SystemVerilog. Designed for edge ML inference with configurable data paths and aggressive timing closure.",
    image:
      "https://images.unsplash.com/photo-1768527858342-037cff722276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMGdyaWQlMjBkYXJrfGVufDF8fHx8MTc3MjkwNTU1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["SystemVerilog", "FPGA", "Synthesis"],
  },
  {
    id: "02",
    slug: "riscv-pipelined-core",
    title: "RISC-V Pipelined Core",
    category: "Digital Logic / FPGA",
    description:
      "5-stage pipelined RV32I core with custom vector extensions and branch prediction. Verified via UVM and deployed on Xilinx UltraScale+ with full HW/SW co-simulation.",
    image:
      "https://images.unsplash.com/photo-1762163516269-3c143e04175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByYWNrJTIwZGFyayUyMGxpZ2h0c3xlbnwxfHx8fDE3NzI5MDU1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Verilog", "RISC-V", "FPGA"],
  },
  {
    id: "03",
    slug: "uvm-verification-framework",
    title: "UVM Verification Framework",
    category: "Verification / Methodology",
    description:
      "Production-grade constrained-random verification environment for a networking SoC. Achieved 100% functional coverage with automated regression and assertion-based checks.",
    image:
      "https://images.unsplash.com/photo-1698714260145-7b4f36737f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwaGFyZHdhcmUlMjB0ZXJtaW5hbHxlbnwxfHx8fDE3NzI5MDU1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["UVM", "SystemVerilog", "Coverage"],
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const reversed = index % 2 !== 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col gap-8 group cursor-pointer ${
        reversed ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <a href={`/projects/${project.slug}`} className="absolute inset-0 z-20" aria-label={project.title} />
      {/* Image */}
      <div className="w-full lg:w-[58%] shrink-0 relative overflow-hidden border border-white/[0.06] aspect-[16/10]">
        <motion.img
          style={{ y: imgY, scale: 1.08 }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-[1.2s] ease-out opacity-70 grayscale group-hover:opacity-90 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-background/40 mix-blend-multiply group-hover:bg-transparent transition-all duration-700" />

        {/* Project number overlay */}
        <div className="absolute top-0 left-0 p-5">
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/30">
            {project.id}
          </span>
        </div>
      </div>

      {/* Text */}
      <div
        className={`w-full lg:w-[42%] flex flex-col justify-center ${
          reversed ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left"
        }`}
      >
        <div className="flex flex-col justify-center w-full">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#706d65] mb-4 block">
            {project.category}
          </span>

          <h3 className="text-2xl md:text-3xl font-serif text-primary leading-[1.15] tracking-tight mb-5 flex items-center gap-3">
            <span>{project.title}</span>
            <ArrowUpRight
              size={20}
              className="opacity-0 group-hover:opacity-60 transition-all duration-500 shrink-0"
            />
          </h3>

          <p className="text-[14px] text-muted-foreground font-sans leading-[1.8] mb-8 max-w-md">
            {project.description}
          </p>

          <div className={`flex flex-wrap gap-2 ${reversed ? "lg:justify-end" : ""}`}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#706d65] border border-white/[0.06] px-3 py-1 group-hover:border-white/15 transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <Section id="projects" className="bg-background">
      <SectionHeader title="Selected Work" subtitle="01 / Projects" />

      <div className="flex flex-col gap-20 lg:gap-32 w-full">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="mt-20 lg:mt-28 w-full flex justify-center">
        <a
          href="/projects"
          className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <span>View Full Archive</span>
          <span className="w-6 h-[1px] bg-white/20 group-hover:w-10 group-hover:bg-primary transition-all duration-500" />
        </a>
      </div>
    </Section>
  );
}