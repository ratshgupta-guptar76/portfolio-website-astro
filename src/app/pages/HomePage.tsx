import { Hero } from "../components/Hero";
import { Projects } from "../components/Projects";
import { About } from "../components/About";
import { Experience } from "../components/Experience";
import { Blog } from "../components/Blog";
import { Footer } from "../components/Footer";

export function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Blog />
      <Footer />
    </>
  );
}
