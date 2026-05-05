import { useParams, Link, Navigate } from "react-router";
import { motion } from "motion/react";
import { findPost } from "../data/posts";
import { PageHeader, TagChip } from "../components/ui/PageHeader";
import { Footer } from "../components/Footer";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? findPost(slug) : undefined;
  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-[#040405]">
      <PageHeader
        kicker="Note"
        title={post.title}
        lede={post.lede}
        back={{ to: "/blog", label: "All Notes" }}
      />

      <section className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 pb-24 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-[68ch]"
        >
          <div className="flex flex-wrap items-center gap-4 pb-6 mb-12 border-b border-white/[0.08]">
            <span className="font-mono text-[11px] tracking-[0.1em] text-[#706d65]">
              {post.date}
            </span>
            {post.updated && (
              <>
                <span className="text-[#3f3d38]">·</span>
                <span className="font-mono text-[11px] tracking-[0.1em] text-[#706d65]">
                  Updated {post.updated}
                </span>
              </>
            )}
            <div className="flex flex-wrap gap-1.5 ml-auto">
              {post.tags.map((t) => (
                <TagChip key={t} label={t} />
              ))}
            </div>
          </div>

          <article className="font-serif text-[17px] text-[#cfc9bf] leading-[1.75]">
            {post.body.map((block, i) => {
              if (block.kind === "h2") {
                return (
                  <h2
                    key={i}
                    className="font-sans text-[22px] text-[#ebe6dd] tracking-[-0.01em] pt-10 mt-2 mb-5 border-t border-white/[0.08]"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.kind === "code") {
                return (
                  <pre
                    key={i}
                    className="border border-white/[0.08] bg-black/30 p-5 my-7 overflow-x-auto font-mono text-[12.5px] leading-[1.65] text-[#cfc9bf]"
                  >
                    <code>{block.text}</code>
                  </pre>
                );
              }
              if (block.kind === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="my-7 pl-5 border-l border-white/[0.15] text-[#a8a39a] italic"
                  >
                    {block.text}
                  </blockquote>
                );
              }
              return (
                <p key={i} className="mb-6">
                  {block.text}
                </p>
              );
            })}
          </article>

          {post.references && post.references.length > 0 && (
            <div className="mt-16 pt-8 border-t border-white/[0.08]">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#706d65] mb-4 block">
                References
              </span>
              <ol className="font-sans text-[13px] text-[#8a8680] leading-[1.7] space-y-2 list-decimal pl-5">
                {post.references.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-white/[0.08] flex items-center justify-between">
            <Link
              to="/blog"
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#706d65] hover:text-[#ebe6dd] transition-colors"
            >
              ← All Notes
            </Link>
            <Link
              to="/contact"
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#706d65] hover:text-[#ebe6dd] transition-colors"
            >
              Send a reply →
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
