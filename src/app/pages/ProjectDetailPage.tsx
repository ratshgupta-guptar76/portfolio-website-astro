import { useParams, Link, Navigate } from "react-router";
import { motion } from "motion/react";
import { findProject } from "../data/projects";
import { PageHeader, TagChip } from "../components/ui/PageHeader";
import { Footer } from "../components/Footer";

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#5a5750]">
        {label}
      </span>
      <div className="font-sans text-[13px] text-[#ebe6dd]/80 leading-[1.5]">
        {children}
      </div>
    </div>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? findProject(slug) : undefined;
  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="min-h-screen bg-[#040405]">
      <PageHeader
        kicker={`Project · ${project.id}`}
        title={project.title}
        lede={project.summary}
        back={{ to: "/projects", label: "All Projects" }}
      />

      <section className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-[14rem_1fr] gap-12 lg:gap-20">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="flex flex-row lg:flex-col flex-wrap gap-x-10 gap-y-7 pb-6 border-b lg:border-b-0 border-white/[0.06]">
              <MetaRow label="Date">{project.date}</MetaRow>
              {project.updated && <MetaRow label="Updated">{project.updated}</MetaRow>}
              <MetaRow label="Status">
                <span className="font-mono text-[12px] tracking-[0.08em] text-[#ebe6dd]/85">
                  {project.status}
                </span>
              </MetaRow>
              <MetaRow label="Stack">
                <ul className="flex flex-col gap-1 font-mono text-[12px] text-[#ebe6dd]/70">
                  {project.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </MetaRow>
              <MetaRow label="Tags">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <TagChip key={t} label={t} />
                  ))}
                </div>
              </MetaRow>
              {project.source && (
                <MetaRow label="Source">
                  <a
                    href={`https://${project.source}`}
                    className="font-mono text-[12px] text-[#ebe6dd]/70 hover:text-[#ebe6dd] transition-colors break-all"
                  >
                    {project.source}
                  </a>
                </MetaRow>
              )}
              {project.paper && (
                <MetaRow label="Paper">
                  <span className="font-mono text-[12px] text-[#ebe6dd]/70">
                    {project.paper}
                  </span>
                </MetaRow>
              )}
            </div>
          </motion.aside>

          {/* Body */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="max-w-[68ch]"
          >
            <p className="font-serif text-[18px] text-[#ebe6dd]/85 leading-[1.7] mb-12">
              {project.problem}
            </p>

            <h2 className="font-sans text-[22px] text-[#ebe6dd] tracking-[-0.01em] pt-10 mt-2 mb-5 border-t border-white/[0.08]">
              Architecture
            </h2>
            <p className="font-serif text-[16px] text-[#a8a39a] leading-[1.75] mb-10">
              {project.architecture}
            </p>

            <h2 className="font-sans text-[22px] text-[#ebe6dd] tracking-[-0.01em] pt-10 mt-2 mb-5 border-t border-white/[0.08]">
              Results
            </h2>
            <div className="border border-white/[0.08] mb-10">
              <table className="w-full font-mono text-[13px]" style={{ fontVariantNumeric: "tabular-nums" }}>
                <tbody>
                  {project.results.map((r) => (
                    <tr key={r.label} className="border-b border-white/[0.05] last:border-b-0">
                      <th className="text-left font-normal py-3 px-4 text-[#706d65] uppercase text-[10px] tracking-[0.18em] w-1/2">
                        {r.label}
                      </th>
                      <td className="py-3 px-4 text-[#ebe6dd]/85 text-right">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-sans text-[22px] text-[#ebe6dd] tracking-[-0.01em] pt-10 mt-2 mb-5 border-t border-white/[0.08]">
              Implementation
            </h2>
            <pre className="border border-white/[0.08] bg-black/30 p-5 mb-3 overflow-x-auto font-mono text-[12.5px] leading-[1.65] text-[#cfc9bf]">
              <code>{project.codeSnippet}</code>
            </pre>
            <p className="text-center font-sans text-[11px] tracking-[0.05em] text-[#706d65] mb-10">
              {project.codeCaption}
            </p>

            <h2 className="font-sans text-[22px] text-[#ebe6dd] tracking-[-0.01em] pt-10 mt-2 mb-5 border-t border-white/[0.08]">
              Synthesis &amp; timing
            </h2>
            <div className="border border-white/[0.08] mb-10 overflow-x-auto">
              <table className="w-full font-mono text-[13px]" style={{ fontVariantNumeric: "tabular-nums" }}>
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    <th className="text-left font-normal py-3 px-4 text-[#706d65] uppercase text-[10px] tracking-[0.18em]">
                      Stage
                    </th>
                    <th className="text-right font-normal py-3 px-4 text-[#706d65] uppercase text-[10px] tracking-[0.18em]">
                      Frequency
                    </th>
                    <th className="text-right font-normal py-3 px-4 text-[#706d65] uppercase text-[10px] tracking-[0.18em]">
                      Slack
                    </th>
                    <th className="text-right font-normal py-3 px-4 text-[#706d65] uppercase text-[10px] tracking-[0.18em]">
                      Area
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {project.synthesis.map((row) => (
                    <tr key={row.stage} className="border-b border-white/[0.04] last:border-b-0">
                      <td className="py-3 px-4 text-[#ebe6dd]/85">{row.stage}</td>
                      <td className="py-3 px-4 text-right text-[#ebe6dd]/70">{row.frequency}</td>
                      <td className="py-3 px-4 text-right text-[#ebe6dd]/70">{row.slack}</td>
                      <td className="py-3 px-4 text-right text-[#ebe6dd]/70">{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-sans text-[22px] text-[#ebe6dd] tracking-[-0.01em] pt-10 mt-2 mb-5 border-t border-white/[0.08]">
              Verification
            </h2>
            <p className="font-serif text-[16px] text-[#a8a39a] leading-[1.75] mb-12">
              {project.verification}
            </p>

            <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between">
              <Link
                to="/projects"
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#706d65] hover:text-[#ebe6dd] transition-colors"
              >
                ← Index
              </Link>
              <Link
                to="/contact"
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#706d65] hover:text-[#ebe6dd] transition-colors"
              >
                Discuss this project →
              </Link>
            </div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
