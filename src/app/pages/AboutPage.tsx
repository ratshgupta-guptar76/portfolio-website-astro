import { motion } from "motion/react";
import { PageHeader } from "../components/ui/PageHeader";
import { Footer } from "../components/Footer";

const EDUCATION = [
  {
    years: "2023 — 2025",
    program: "M.A.Sc., Computer Engineering",
    institution: "University of Toronto",
  },
  {
    years: "2019 — 2023",
    program: "B.Eng., Electrical & Computer Engineering",
    institution: "McMaster University",
  },
];

const AWARDS = [
  "NSERC CGS-M, 2023 — 2024",
  "Dean's Honour List, McMaster University, 2020 — 2023",
  "ACM SIGARCH Travel Grant, ISCA 2024",
];

const TALKS = [
  "“Verifying Coherence Without Losing Your Sanity,” Hot Chips Student Forum, 2025",
  "“Weight-Stationary at 7nm,” MICRO Workshop on ML Hardware, 2024 (poster)",
  "“UVM Without the Cargo Cult,” Verification Academy Webinar, 2024",
];

const TEACHING = [
  "TA, ECE352 — Computer Organization, Univ. of Toronto, F2024 / W2025",
  "TA, COE3DQ5 — Digital Systems Design, McMaster, W2023",
  "Mentor, McMaster IEEE FPGA Bootcamp, 2021 — 2023",
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#040405]">
      <PageHeader
        kicker="About"
        title="Ratish Gupta"
        lede="Hardware engineer working on RTL, accelerators, and the verification methodology that ships them."
        back={{ to: "/", label: "Back to Home" }}
      />

      <section className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[68ch] flex flex-col gap-16"
        >
          <div className="font-serif text-[17px] text-[#cfc9bf] leading-[1.75] flex flex-col gap-6">
            <p>
              I design digital integrated circuits — accelerators, pipelined
              cores, and the verification environments needed to tape them out
              with confidence. My work sits between architecture and physical
              design, where decisions made in RTL outlive the engineer who
              wrote them.
            </p>
            <p>
              I am most interested in machine learning hardware: the tension
              between generality and efficiency, between formal correctness
              and engineering pragmatism, between what a paper claims and what
              the post-route timing report actually says.
            </p>
            <p>
              Outside of silicon, I read more philosophy than is strictly
              healthy and run long distances slowly.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-sans text-[22px] text-[#ebe6dd] tracking-[-0.01em] pb-4 mb-6 border-b border-white/[0.08]">
              Education
            </h2>
            <div className="border border-white/[0.08]">
              <table className="w-full font-mono text-[13px]" style={{ fontVariantNumeric: "tabular-nums" }}>
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left font-normal py-3 px-4 text-[#706d65] uppercase text-[10px] tracking-[0.18em]">
                      Years
                    </th>
                    <th className="text-left font-normal py-3 px-4 text-[#706d65] uppercase text-[10px] tracking-[0.18em]">
                      Program
                    </th>
                    <th className="text-left font-normal py-3 px-4 text-[#706d65] uppercase text-[10px] tracking-[0.18em]">
                      Institution
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {EDUCATION.map((row) => (
                    <tr key={row.program} className="border-b border-white/[0.04] last:border-b-0">
                      <td className="py-3 px-4 text-[#ebe6dd]/70">{row.years}</td>
                      <td className="py-3 px-4 text-[#ebe6dd]/85">{row.program}</td>
                      <td className="py-3 px-4 text-[#ebe6dd]/70">{row.institution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Awards */}
          <div>
            <h2 className="font-sans text-[22px] text-[#ebe6dd] tracking-[-0.01em] pb-4 mb-6 border-b border-white/[0.08]">
              Awards &amp; scholarships
            </h2>
            <ul className="font-serif text-[16px] text-[#a8a39a] leading-[1.75] list-disc pl-5 marker:text-[#5a5750]">
              {AWARDS.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>

          {/* Talks */}
          <div>
            <h2 className="font-sans text-[22px] text-[#ebe6dd] tracking-[-0.01em] pb-4 mb-6 border-b border-white/[0.08]">
              Talks &amp; posters
            </h2>
            <ul className="font-serif text-[16px] text-[#a8a39a] leading-[1.75] list-disc pl-5 marker:text-[#5a5750]">
              {TALKS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Teaching */}
          <div>
            <h2 className="font-sans text-[22px] text-[#ebe6dd] tracking-[-0.01em] pb-4 mb-6 border-b border-white/[0.08]">
              Teaching
            </h2>
            <ul className="font-serif text-[16px] text-[#a8a39a] leading-[1.75] list-disc pl-5 marker:text-[#5a5750]">
              {TEACHING.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          {/* CV */}
          <div className="pt-8 border-t border-white/[0.08]">
            <a
              href="#"
              className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#706d65] hover:text-[#ebe6dd] transition-colors"
            >
              <span>Download CV (PDF)</span>
              <span className="w-6 h-px bg-white/20 group-hover:w-10 group-hover:bg-primary transition-all duration-500" />
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
