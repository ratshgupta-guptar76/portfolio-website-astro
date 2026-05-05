import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Section } from "./ui/Section";
import { useState } from "react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

export function Footer() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-5b156abf/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        throw new Error("Failed to submit");
      }
      
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Transmission failed. Please try again.");
    }
  };

  return (
    <Section
      id="contact"
      className="bg-[#050506] relative overflow-hidden !py-24 md:!py-32"
    >
      <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
        {/* Left — CTA */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8 block">
            04 / Contact
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary leading-[1.1] tracking-tight mb-10">
            Let's build
            <br />
            something reliable.
          </h2>

          <div className="flex flex-col gap-4 mt-auto">
            <a
              href="mailto:hello@ratishgupta.com"
              className="group inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Mail
                size={14}
                className="text-muted-foreground group-hover:text-primary transition-colors"
              />
              <span className="font-mono text-[11px] tracking-[0.15em] text-primary">
                hello@ratishgupta.com
              </span>
            </a>

            <div className="flex items-center gap-6 mt-4">
              {[
                { Icon: Github, label: "Github" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="group flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon size={12} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — Contact Form */}
        <motion.div
          className="w-full lg:w-1/2 border border-white/[0.06] p-8 md:p-10 relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <h3 className="text-xl font-serif text-primary mb-3">
                Message Received.
              </h3>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                I'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-7 relative z-10"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Name
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-transparent border-b border-white/10 pb-2 text-primary text-sm font-sans focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Email
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-transparent border-b border-white/10 pb-2 text-primary text-sm font-sans focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  required
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-transparent border-b border-white/10 pb-2 text-primary text-sm font-sans focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              {status === "error" && (
                <div className="text-red-400 font-mono text-[10px] tracking-[0.1em] mt-2">
                  {errorMessage}
                </div>
              )}

              <button
                disabled={status === "submitting"}
                type="submit"
                className="mt-4 self-start font-mono text-[10px] uppercase tracking-[0.25em] border border-white/10 px-8 py-3 text-muted-foreground hover:text-primary hover:border-white/25 transition-all duration-300 disabled:opacity-40"
              >
                {status === "submitting" ? "Transmitting..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="w-full mt-20 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between gap-2">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#706d65] uppercase">
          &copy; {new Date().getFullYear()} Ratish Gupta
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#706d65] uppercase">
          Designed & Engineered
        </span>
      </div>
    </Section>
  );
}
