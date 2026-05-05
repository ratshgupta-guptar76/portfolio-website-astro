import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Footer } from "../components/Footer";

// ─── Filter categories ───
const FILTERS = [
  "All",
  "FPGA",
  "RTL",
  "ASIC",
  "Embedded",
  "Architecture",
  "Research",
] as const;

type FilterType = (typeof FILTERS)[number];

// ─── Project data ───
interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: FilterType[];
  problem: string;
  architecture: string;
  tools: string[];
  verification: string;
  results: { label: string; value: string }[];
  image: string;
  featured?: boolean;
  status: "Verified" | "Taped Out" | "In Progress" | "Published";
  links?: { label: string; href: string }[];
}

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Systolic Array Accelerator",
    subtitle: "Edge ML inference engine with configurable datapath",
    category: ["ASIC", "Architecture", "RTL"],
    problem:
      "Dense matrix multiplication dominates inference latency in edge deployments. Standard architectures waste area on general-purpose logic that never executes during inference.",
    architecture:
      "8×8 weight-stationary systolic array with output-stationary accumulation. Configurable PE datapath supports INT8/INT16 precision. Double-buffered SRAM banks with DMA controller for continuous data streaming.",
    tools: ["SystemVerilog", "Synopsys DC", "VCS", "ICC2", "TSMC 7nm"],
    verification:
      "UVM testbench with constrained-random stimulus. Formal equivalence checking post-synthesis. Gate-level simulation with SDF back-annotation for timing verification.",
    results: [
      { label: "Clock", value: "800 MHz" },
      { label: "Area", value: "0.42 mm²" },
      { label: "Power", value: "85 mW" },
      { label: "Throughput", value: "102.4 GOPS" },
    ],
    image:
      "https://images.unsplash.com/photo-1768527858342-037cff722276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjBncmlkJTIwcGF0dGVybiUyMGxpbmVzfGVufDF8fHx8MTc3MjkwOTUwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
    status: "Taped Out",
    links: [
      { label: "Paper", href: "#" },
      { label: "Source", href: "#" },
    ],
  },
  {
    id: "02",
    title: "RISC-V Pipelined Core",
    subtitle: "5-stage RV32I with custom vector extensions",
    category: ["FPGA", "Architecture", "RTL"],
    problem:
      "Educational RISC-V cores lack production-quality hazard resolution and branch prediction. This project bridges academic ISA implementation and industry-grade pipeline design.",
    architecture:
      "Classic 5-stage pipeline (IF/ID/EX/MEM/WB) with full forwarding and stall logic. Gshare branch predictor with 1024-entry BHT. Custom V-extension subset for SIMD operations on 128-bit vectors.",
    tools: ["Verilog", "Vivado", "Xilinx UltraScale+", "Verilator", "GTKWave"],
    verification:
      "UVM-based verification with functional coverage model targeting all RV32I instructions and hazard scenarios. HW/SW co-simulation against RISC-V ISA compliance suite — 100% pass rate.",
    results: [
      { label: "Fmax", value: "210 MHz" },
      { label: "LUT", value: "12,847" },
      { label: "CPI", value: "1.18 avg" },
      { label: "Branch Acc.", value: "94.2%" },
    ],
    image:
      "https://images.unsplash.com/photo-1667264501379-c1537934c7ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwc2VydmVyJTIwaGFyZHdhcmUlMjByYWNrJTIwbWluaW1hbHxlbnwxfHx8fDE3NzI5MDk1MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Verified",
    links: [{ label: "Source", href: "#" }],
  },
  {
    id: "03",
    title: "UVM Verification Framework",
    subtitle: "Production-grade constrained-random environment for networking SoC",
    category: ["ASIC", "Research"],
    problem:
      "Manual directed testing cannot achieve the coverage depth required for complex SoC interconnects. The project demanded a reusable verification methodology for multi-protocol packet processing.",
    architecture:
      "Layered UVM testbench with protocol-aware agents for AXI4 and custom streaming interfaces. Scoreboard with reference model comparison. Coverage-driven regression with automated seed management.",
    tools: ["SystemVerilog", "UVM 1.2", "Synopsys VCS", "Verdi", "Python"],
    verification:
      "Achieved 100% functional coverage across 47 covergroups. Constrained-random stimulus with 50K+ seeds. Assertion-based protocol checking at all interface boundaries. Zero escaped bugs in 3 tape-out cycles.",
    results: [
      { label: "Coverage", value: "100%" },
      { label: "Seeds", value: "50,000+" },
      { label: "Bugs Found", value: "142" },
      { label: "Escaped", value: "0" },
    ],
    image:
      "https://images.unsplash.com/photo-1757492166984-ad7e6629ed3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvc2NpbGxvc2NvcGUlMjB3YXZlZm9ybSUyMGRhcmslMjBkaXNwbGF5fGVufDF8fHx8MTc3MjkwOTUwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Verified",
    links: [{ label: "Methodology", href: "#" }],
  },
  {
    id: "04",
    title: "AXI4 DMA Controller",
    subtitle: "High-throughput scatter-gather DMA with interrupt coalescing",
    category: ["RTL", "FPGA", "Embedded"],
    problem:
      "CPU-driven memory transfers bottleneck data-intensive FPGA accelerator pipelines. A dedicated DMA with descriptor-based operation frees the processor for control tasks.",
    architecture:
      "AXI4 master interface with 256-bit data bus. Scatter-gather descriptor chain stored in external DDR. Interrupt coalescing with configurable timer and packet thresholds. Back-pressure aware with credit-based flow control.",
    tools: ["SystemVerilog", "Vivado", "AXI VIP", "Zynq UltraScale+"],
    verification:
      "Directed and random testing via Xilinx AXI Verification IP. Protocol compliance verified against ARM AMBA AXI4 specification. Stress testing with concurrent read/write channels at saturation.",
    results: [
      { label: "Bandwidth", value: "12.8 GB/s" },
      { label: "Latency", value: "45 ns" },
      { label: "LUT", value: "3,214" },
      { label: "Fmax", value: "300 MHz" },
    ],
    image:
      "https://images.unsplash.com/photo-1684766462347-78b3bfc0995d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYWJzdHJhY3QlMjBjaXJjdWl0JTIwZ2VvbWV0cnklMjBtaW5pbWFsfGVufDF8fHx8MTc3MjkwOTUwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Verified",
  },
  {
    id: "05",
    title: "Cache Coherence Protocol Engine",
    subtitle: "MOESI-based coherence for multi-core research processor",
    category: ["Architecture", "Research", "RTL"],
    problem:
      "Multi-core systems require coherent shared memory to maintain correctness. Implementing MOESI at RTL level demands rigorous state machine design and exhaustive verification of all race conditions.",
    architecture:
      "Directory-based MOESI protocol with snooping fallback for 4-core configuration. L1 data cache 32KB 4-way set-associative. Coherence request/response network with ordered point-to-point links.",
    tools: ["SystemVerilog", "Cadence Xcelium", "JasperGold", "Murphi"],
    verification:
      "Formal verification of protocol invariants using JasperGold. Murphi model checking for deadlock and livelock freedom. Random multi-threaded test programs targeting coherence corner cases.",
    results: [
      { label: "States", value: "5 (MOESI)" },
      { label: "Cores", value: "4" },
      { label: "Deadlocks", value: "0 proven" },
      { label: "Transitions", value: "34 verified" },
    ],
    image:
      "https://images.unsplash.com/photo-1649297153348-061091e9aaa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmliZXIlMjBvcHRpYyUyMGxpZ2h0JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzcyOTA5NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Published",
    links: [
      { label: "Paper", href: "#" },
      { label: "Source", href: "#" },
    ],
  },
  {
    id: "06",
    title: "FPGA-Based Logic Analyzer",
    subtitle: "Embedded debug tool with 200 MHz capture and UART export",
    category: ["FPGA", "Embedded"],
    problem:
      "Commercial logic analyzers are expensive and inflexible for custom protocol debugging. An FPGA-resident analyzer provides cycle-accurate capture with application-specific trigger logic.",
    architecture:
      "Circular buffer capture engine with configurable trigger comparators. 32-channel input with 4K-sample depth per channel. UART-based host interface for waveform export. Trigger supports edge, pattern, and sequential conditions.",
    tools: ["Verilog", "Quartus Prime", "Intel Cyclone V", "Python"],
    verification:
      "Hardware-in-the-loop validation capturing known test patterns. Bit-exact comparison between captured waveforms and simulation references. Protocol decoder validation for SPI, I2C, and UART.",
    results: [
      { label: "Sample Rate", value: "200 MHz" },
      { label: "Channels", value: "32" },
      { label: "Depth", value: "4K samples" },
      { label: "Logic Cells", value: "1,892" },
    ],
    image:
      "https://images.unsplash.com/photo-1672689933227-2ce1249c46a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwY29tcG9uZW50cyUyMG1hY3JvJTIwZGFya3xlbnwxfHx8fDE3NzI5MDk1MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Verified",
  },
  {
    id: "07",
    title: "Neural Network Quantization Engine",
    subtitle: "Fixed-point inference accelerator with dynamic precision scaling",
    category: ["ASIC", "Architecture", "Research"],
    problem:
      "Floating-point neural network inference is area and power prohibitive at the edge. A quantization-aware accelerator must maintain accuracy while operating entirely in fixed-point arithmetic.",
    architecture:
      "Configurable MAC array supporting INT4/INT8/INT16 with per-layer precision control. Dynamic scaling unit adjusts quantization parameters at runtime. Activation memory with bank conflict avoidance scheme.",
    tools: ["SystemVerilog", "Synopsys DC", "PrimeTime", "TSMC 28nm"],
    verification:
      "Golden model comparison against PyTorch quantized inference. Layer-by-layer numerical accuracy validation. Post-layout timing analysis with multi-corner STA.",
    results: [
      { label: "Accuracy Loss", value: "<0.3%" },
      { label: "Power", value: "120 mW" },
      { label: "TOPS/W", value: "4.2" },
      { label: "Area", value: "0.68 mm²" },
    ],
    image:
      "https://images.unsplash.com/photo-1697135807547-5fa9fd22d9ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbWluaW1hbCUyMGFyY2hpdGVjdHVyZSUyMHN0cnVjdHVyZSUyMGNvbmNyZXRlfGVufDF8fHx8MTc3MjkwOTUwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
    status: "In Progress",
    links: [{ label: "Preprint", href: "#" }],
  },
  {
    id: "08",
    title: "Ethernet MAC & PHY Interface",
    subtitle: "1G/10G Ethernet with PCS and timestamping for precision networking",
    category: ["RTL", "FPGA", "Embedded"],
    problem:
      "Precision time protocol (PTP) networking requires hardware timestamping at the MAC layer. Commercial IP is expensive and opaque; an open implementation enables research into time-sensitive networking.",
    architecture:
      "IEEE 802.3 compliant MAC with 64b/66b PCS encoding. Hardware timestamp unit with sub-nanosecond resolution. TX/RX FIFOs with clock domain crossing. MDIO management interface for PHY configuration.",
    tools: ["SystemVerilog", "Vivado", "Xilinx GTH Transceivers", "Wireshark"],
    verification:
      "Loopback testing at 1G and 10G line rates. PTP timestamp accuracy measured against GPS reference. Packet error rate testing over 72-hour stress runs with zero frame loss.",
    results: [
      { label: "Line Rate", value: "10 Gbps" },
      { label: "Timestamp", value: "<1 ns" },
      { label: "Frame Loss", value: "0" },
      { label: "LUT", value: "8,445" },
    ],
    image:
      "https://images.unsplash.com/photo-1652724933904-37f1fc1170ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pY29uZHVjdG9yJTIwd2FmZXIlMjBkYXJrJTIwbWFjcm8lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MjkwOTUwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    status: "Verified",
  },
];

// ─── Status badge ───
function StatusBadge({ status }: { status: Project["status"] }) {
  const colors: Record<Project["status"], string> = {
    Verified: "text-emerald-400/70 border-emerald-400/20",
    "Taped Out": "text-amber-400/70 border-amber-400/20",
    "In Progress": "text-blue-400/70 border-blue-400/20",
    Published: "text-purple-400/70 border-purple-400/20",
  };
  return (
    <span
      className={`font-mono text-[9px] uppercase tracking-[0.2em] border px-2.5 py-1 ${colors[status]}`}
    >
      {status}
    </span>
  );
}

// ─── Featured project ───
function FeaturedProject({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative w-full mb-32 lg:mb-44"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Label */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-8 h-px bg-[#706d65]/40" />
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#706d65]">
          Featured Work
        </span>
      </div>

      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative w-full aspect-[21/9] overflow-hidden border border-white/[0.05]">
          <motion.img
            src={project.image}
            alt={project.title}
            style={{ y: imgY, scale: 1.1 }}
            className="w-full h-full object-cover transition-all duration-[1.5s] ease-out"
            animate={{
              filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
              opacity: hovered ? 0.6 : 0.3,
            }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040405] via-[#040405]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040405]/60 to-transparent" />

          {/* Scanlines */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
            }}
          />

          {/* Corner marks */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/[0.08] group-hover:border-white/20 transition-colors duration-700" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/[0.08] group-hover:border-white/20 transition-colors duration-700" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/[0.08] group-hover:border-white/20 transition-colors duration-700" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/[0.08] group-hover:border-white/20 transition-colors duration-700" />

          {/* Project number */}
          <div className="absolute top-6 right-8">
            <span className="font-mono text-[11px] tracking-[0.3em] text-white/15">
              {project.id}
            </span>
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <div className="flex items-center gap-4 mb-4">
            <StatusBadge status={project.status} />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#706d65]">
              {project.category.join(" / ")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#ebe6dd] leading-[1.05] tracking-tight mb-3 flex items-center gap-4">
            {project.title}
            <ArrowUpRight
              size={24}
              className="opacity-0 group-hover:opacity-50 transition-all duration-500 shrink-0"
            />
          </h2>

          <p className="text-sm md:text-base text-[#8a8680] font-sans font-light max-w-xl leading-relaxed mb-6">
            {project.subtitle}
          </p>

          {/* Results strip */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {project.results.map((r) => (
              <div key={r.label} className="flex items-baseline gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#5a5750]">
                  {r.label}
                </span>
                <span className="font-mono text-[12px] text-[#ebe6dd]/70">
                  {r.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Project detail card ───
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      className="relative w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className="relative border border-white/[0.04] hover:border-white/[0.08] transition-colors duration-700 cursor-pointer group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Top section — image + summary */}
        <div className="flex flex-col lg:flex-row">
          {/* Image */}
          <div className="relative w-full lg:w-[45%] aspect-[16/10] lg:aspect-auto overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              style={{ y: imgY, scale: 1.08 }}
              className="w-full h-full object-cover transition-all duration-[1.2s] ease-out"
              animate={{
                filter: hovered ? "grayscale(20%)" : "grayscale(100%)",
                opacity: hovered ? 0.55 : 0.25,
              }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#040405]/80 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040405]/80 to-transparent lg:hidden" />

            {/* Number */}
            <div className="absolute top-5 left-5">
              <span className="font-mono text-[10px] tracking-[0.3em] text-white/20">
                {project.id}
              </span>
            </div>

            {/* Corner marks */}
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="w-full lg:w-[55%] p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <StatusBadge status={project.status} />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#5a5750]">
                {project.category.join(" / ")}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-serif text-[#ebe6dd] leading-[1.15] tracking-tight mb-2 flex items-center gap-3">
              {project.title}
              <ArrowUpRight
                size={16}
                className="opacity-0 group-hover:opacity-40 transition-opacity duration-500 shrink-0"
              />
            </h3>

            <p className="text-[13px] text-[#706d65] font-sans font-light mb-6 leading-relaxed">
              {project.subtitle}
            </p>

            {/* Results grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 mb-5">
              {project.results.map((r) => (
                <div key={r.label} className="flex flex-col">
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#5a5750] mb-0.5">
                    {r.label}
                  </span>
                  <span className="font-mono text-[13px] text-[#ebe6dd]/60">
                    {r.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Tools */}
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#5a5750] border border-white/[0.04] px-2.5 py-0.5 group-hover:border-white/[0.08] transition-colors duration-500"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Expand indicator */}
            <div className="mt-5 flex items-center gap-2">
              <motion.div
                animate={{ rotate: expanded ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight size={12} className="text-[#5a5750]" />
              </motion.div>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#5a5750]">
                {expanded ? "Collapse" : "Details"}
              </span>
            </div>
          </div>
        </div>

        {/* Expanded detail panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/[0.04] p-6 md:p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                  {/* Problem */}
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#706d65] mb-3">
                      Problem
                    </span>
                    <p className="text-[13px] text-[#8a8680] font-sans leading-[1.8]">
                      {project.problem}
                    </p>
                  </div>

                  {/* Architecture */}
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#706d65] mb-3">
                      Architecture
                    </span>
                    <p className="text-[13px] text-[#8a8680] font-sans leading-[1.8]">
                      {project.architecture}
                    </p>
                  </div>

                  {/* Verification */}
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#706d65] mb-3">
                      Verification
                    </span>
                    <p className="text-[13px] text-[#8a8680] font-sans leading-[1.8]">
                      {project.verification}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.03] flex items-center gap-6 flex-wrap">
                  <Link
                    to={`/projects/${project.id === "01" ? "systolic-array-accelerator" : project.id === "02" ? "riscv-pipelined-core" : project.id === "03" ? "uvm-verification-framework" : project.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="group/link inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ebe6dd]/80 hover:text-[#ebe6dd] transition-colors duration-300 border-b border-white/15 hover:border-white/40 pb-0.5"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight size={10} className="opacity-70 group-hover/link:opacity-100" />
                  </Link>
                  {project.links?.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => e.stopPropagation()}
                      className="group/link inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#706d65] hover:text-[#ebe6dd] transition-colors duration-300"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        size={10}
                        className="opacity-50 group-hover/link:opacity-100 transition-opacity"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

// ─── Main page ───
export function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const featuredProject = PROJECTS.find((p) => p.featured);
  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "All") return true;
    return p.category.includes(activeFilter);
  });

  // Separate featured from list when showing "All"
  const listProjects =
    activeFilter === "All"
      ? filteredProjects.filter((p) => p !== featuredProject)
      : filteredProjects;

  return (
    <div className="min-h-screen bg-[#040405]">
      {/* ── Page Header ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 lg:px-16">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(235,230,221,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(235,230,221,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
          }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          {/* Back nav */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#5a5750] hover:text-[#ebe6dd] transition-colors duration-300 mb-16 group"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#706d65] mb-6 block">
              01 / Engineering Archive
            </span>

            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-serif text-[#ebe6dd] leading-[0.95] tracking-[-0.02em] mb-6">
              Selected
              <br />
              <span className="text-[#5a5750] italic font-normal text-[0.85em]">
                &
              </span>{" "}
              Verified Work
            </h1>

            {/* Decorative rule */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-px bg-gradient-to-r from-[#706d65]/30 to-transparent" />
              <span className="w-1.5 h-1.5 border border-[#706d65]/25 rotate-45" />
              <span className="w-12 h-px bg-gradient-to-l from-[#706d65]/30 to-transparent" />
            </div>

            <p className="text-[15px] text-[#8a8680] font-sans font-light leading-[1.75] max-w-lg">
              A curated archive of hardware engineering projects — from RTL
              architecture and FPGA prototyping to silicon-proven ASIC design
              and formal verification.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="sticky top-16 z-30 bg-[#040405]/90 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-4 -mx-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2 whitespace-nowrap transition-colors duration-300 ${
                  activeFilter === filter
                    ? "text-[#ebe6dd]"
                    : "text-[#5a5750] hover:text-[#8a8680]"
                }`}
              >
                {filter}
                {activeFilter === filter && (
                  <motion.div
                    layoutId="filter-indicator"
                    className="absolute bottom-0 left-2 right-2 h-px bg-[#ebe6dd]/30"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}

            {/* Count */}
            <span className="ml-auto font-mono text-[9px] tracking-[0.2em] text-[#5a5750] whitespace-nowrap pl-4">
              {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Project ── */}
      {activeFilter === "All" && featuredProject && (
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 pt-16 md:pt-24">
          <FeaturedProject project={featuredProject} />
        </section>
      )}

      {/* ── Project Grid ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {listProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom ornament */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#706d65]/20" />
            <span className="w-1 h-1 bg-[#706d65]/20 rounded-full" />
            <span className="w-8 h-px bg-[#706d65]/20" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#5a5750]">
            End of Archive
          </span>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
