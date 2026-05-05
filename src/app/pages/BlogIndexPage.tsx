import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { POSTS } from "../data/posts";
import { PageHeader, TagChip } from "../components/ui/PageHeader";
import { Footer } from "../components/Footer";

export function BlogIndexPage() {
  const grouped = POSTS.reduce<Record<number, typeof POSTS>>((acc, p) => {
    (acc[p.year] ||= []).push(p);
    return acc;
  }, {});
  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-[#040405]">
      <PageHeader
        kicker="Index · Writing"
        title="Notes & Essays"
        lede="Short pieces on RTL, verification, and the work of turning architecture into silicon."
        back={{ to: "/", label: "Back to Home" }}
      />

      <section className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-40">
        {years.map((year, gi) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: gi * 0.05 }}
            className="mb-16 last:mb-0"
          >
            <div className="flex items-baseline gap-4 mb-4 pb-3 border-b border-white/[0.06]">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#706d65]">
                {year}
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#3f3d38]">
                ·  {grouped[year].length} {grouped[year].length === 1 ? "entry" : "entries"}
              </span>
            </div>

            <ul>
              {grouped[year].map((post) => (
                <li
                  key={post.slug}
                  className="border-b border-white/[0.05] last:border-b-0"
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block py-7 hover:bg-white/[0.015] transition-colors duration-500 -mx-3 px-3"
                  >
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="font-serif text-[22px] text-[#ebe6dd] leading-[1.25] tracking-tight group-hover:text-white transition-colors flex items-center gap-3">
                        {post.title}
                        <ArrowUpRight
                          size={14}
                          className="opacity-0 group-hover:opacity-50 transition-opacity duration-500 shrink-0"
                        />
                      </h3>
                      <span className="font-mono text-[11px] tracking-[0.1em] text-[#706d65] whitespace-nowrap shrink-0">
                        {post.date}
                      </span>
                    </div>
                    <p className="font-serif text-[15px] text-[#8a8680] leading-[1.6] mt-2 max-w-2xl">
                      {post.lede}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {post.tags.map((t) => (
                        <TagChip key={t} label={t} />
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
