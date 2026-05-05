import { motion } from "motion/react";
import { PageHeader } from "../components/ui/PageHeader";
import { Footer } from "../components/Footer";

const INTERESTS = [
  {
    lead: "ML hardware acceleration.",
    detail:
      "Quantization-aware datapaths, sparsity-aware dispatch, and the architectural cost of supporting both dense and sparse workloads on the same fabric.",
  },
  {
    lead: "Memory hierarchies for accelerators.",
    detail:
      "Bank-conflict avoidance, scratchpad vs. coherent caches, and the design of activation memory for systolic and dataflow engines.",
  },
  {
    lead: "Verification methodology.",
    detail:
      "Formal property decomposition, coverage models that survive scope creep, and the ergonomics of scaling UVM across multi-tape-out programs.",
  },
];

const READING = [
  {
    citation: "Jouppi, N. P. et al.",
    title: "In-datacenter performance analysis of a Tensor Processing Unit",
    venue: "ISCA",
    year: "2017",
    note: "Still the cleanest published account of weight-stationary systolic design at scale. Read the area breakdown carefully.",
  },
  {
    citation: "Chen, Y.-H., Krishna, T., Emer, J., Sze, V.",
    title: "Eyeriss: A spatial architecture for energy-efficient dataflow for CNNs",
    venue: "ISSCC",
    year: "2016",
    note: "The argument for row-stationary dataflow as an energy-first design. Pair with the journal extension for the modeling.",
  },
  {
    citation: "Mutlu, O.",
    title: "Memory systems and memory-centric computing",
    venue: "Lecture series, ETH Zürich",
    year: "2023",
    note: "The framing of \"the memory wall as a budget\" is what most architectural papers are implicitly arguing about.",
  },
  {
    citation: "Patterson, D. A. & Hennessy, J. L.",
    title: "Computer Architecture: A Quantitative Approach",
    venue: "Morgan Kaufmann, 6th ed.",
    year: "2017",
    note: "The reference, not the textbook. Chapter 5 on memory hierarchy is worth annual re-reading.",
  },
];

const QUESTIONS = [
  "What is the cleanest verification model for accelerators where the spec is the reference Python implementation?",
  "How do we make sparsity-aware dispatch tractable to verify formally?",
  "Is there a useful middle ground between fully coherent and fully scratchpad memory for ML accelerators?",
  "Why does industry RTL still look so much like 1995 RTL?",
];

export function ResearchPage() {
  return (
    <div className="min-h-screen bg-[#040405]">
      <PageHeader
        kicker="Research"
        title="Interests & Reading"
        lede="A working list of what I am thinking about, what I am reading, and what I do not yet know."
        back={{ to: "/", label: "Back to Home" }}
      />

      <section className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-40">
        <div className="max-w-[68ch] flex flex-col gap-20">
          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-sans text-[22px] text-[#ebe6dd] tracking-[-0.01em] pb-4 mb-8 border-b border-white/[0.08]">
              Current interests
            </h2>
            <ul className="flex flex-col gap-7">
              {INTERESTS.map((it) => (
                <li key={it.lead} className="font-serif text-[16px] text-[#a8a39a] leading-[1.75]">
                  <span className="font-sans text-[#ebe6dd] font-medium tracking-[-0.005em]">
                    {it.lead}
                  </span>{" "}
                  {it.detail}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Reading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-sans text-[22px] text-[#ebe6dd] tracking-[-0.01em] pb-4 mb-8 border-b border-white/[0.08]">
              Selected reading
            </h2>
            <ol className="flex flex-col gap-8 list-decimal pl-6 marker:font-mono marker:text-[#5a5750] marker:text-[12px]">
              {READING.map((r) => (
                <li key={r.title} className="pl-2">
                  <p className="font-serif text-[16px] text-[#cfc9bf] leading-[1.7]">
                    {r.citation}{" "}
                    <em className="text-[#ebe6dd]">{r.title}</em>.{" "}
                    <span className="text-[#8a8680]">
                      {r.venue}, {r.year}.
                    </span>
                  </p>
                  <p className="font-serif text-[14px] text-[#7d7972] italic leading-[1.7] mt-2">
                    {r.note}
                  </p>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Open questions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-sans text-[22px] text-[#ebe6dd] tracking-[-0.01em] pb-4 mb-8 border-b border-white/[0.08]">
              Open questions
            </h2>
            <ol className="flex flex-col gap-5 list-decimal pl-6 marker:font-mono marker:text-[#5a5750] marker:text-[12px]">
              {QUESTIONS.map((q) => (
                <li key={q} className="pl-2 font-serif text-[16px] text-[#a8a39a] leading-[1.7]">
                  {q}
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
