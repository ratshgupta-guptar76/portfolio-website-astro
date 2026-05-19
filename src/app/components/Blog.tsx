import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "./ui/Section";

const WRITINGS = [
  {
    id: "01",
    href: "/blog/the-invisible-illness",
    title: "The Invisible Illness",
    venue: "Notes",
    date: "Oct 23, 2024",
  },
];

export function Blog() {
  return (
    <Section id="writing" className="bg-background">
      <SectionHeader title="Selected Writing" subtitle="03 / Thoughts" />

      <div className="w-full max-w-3xl">
        {WRITINGS.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="border-b border-white/[0.06] first:border-t hover:border-white/15 transition-colors duration-500"
          >
            <a
              href={post.href}
              className="group flex items-start justify-between gap-6 py-8 cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#706d65] uppercase">
                    {post.venue}
                  </span>
                  <span className="text-white/10">·</span>
                  <span className="font-mono text-[10px] tracking-[0.15em] text-[#706d65] uppercase">
                    {post.date}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-serif text-primary leading-[1.3] tracking-tight group-hover:text-white transition-colors duration-300">
                  {post.title}
                </h3>
              </div>

              <div className="shrink-0 mt-6">
                <ArrowUpRight
                  size={16}
                  className="text-[#706d65] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
                />
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 w-full max-w-3xl flex justify-end">
        <a
          href="/blog"
          className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <span>All Notes</span>
          <span className="w-6 h-px bg-white/20 group-hover:w-10 group-hover:bg-primary transition-all duration-500" />
        </a>
      </div>
    </Section>
  );
}
