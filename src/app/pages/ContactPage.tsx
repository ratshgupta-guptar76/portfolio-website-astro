import { motion } from "motion/react";
import { PageHeader } from "../components/ui/PageHeader";
import { Footer } from "../components/Footer";

const METHODS = [
  { label: "Email", value: "ratish [at] example [dot] com", href: null },
  { label: "GitHub", value: "github.com/ratishgupta", href: "https://github.com" },
  { label: "LinkedIn", value: "linkedin.com/in/ratishgupta", href: "https://linkedin.com" },
  { label: "Scholar", value: "scholar.google.com/citations?user=…", href: "https://scholar.google.com" },
  { label: "CV", value: "ratish-gupta.pdf", href: "#" },
];

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[#040405]">
      <PageHeader
        kicker="Contact"
        title="Get in touch"
        lede="The fastest way to reach me is email. I read everything; I do not always reply quickly."
        back={{ to: "/", label: "Back to Home" }}
      />

      <section className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[68ch]"
        >
          <dl className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-y-6 gap-x-10 border-t border-white/[0.08] pt-10">
            {METHODS.map((m) => (
              <div key={m.label} className="contents">
                <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#706d65] pt-1">
                  {m.label}
                </dt>
                <dd className="font-mono text-[14px] text-[#ebe6dd]/85 break-all">
                  {m.href ? (
                    <a
                      href={m.href}
                      className="hover:text-white transition-colors border-b border-white/0 hover:border-white/30"
                    >
                      {m.value}
                    </a>
                  ) : (
                    m.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-16 pt-8 border-t border-white/[0.08] font-serif text-[16px] text-[#a8a39a] leading-[1.75]">
            Currently open to internship and full-time discussions for{" "}
            <span className="text-[#ebe6dd]">Summer 2026</span> in digital
            design, verification, or accelerator architecture. Recruiters are
            welcome; please mention the role and team in the first message.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
