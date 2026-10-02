import { motion } from "motion/react";
import HeroSystem from "./HeroSystem";
import { MagneticButton } from "./ui";
import { company } from "../data/company";
import { useUI } from "../context/UIContext";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { openBrief, scrollToSection } = useUI();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-[290px] pt-28 md:pb-20"
    >
      {/* ambient blueprint */}
      <div
        className="bg-blueprint pointer-events-none absolute inset-0 opacity-70"
        style={{ maskImage: "radial-gradient(ellipse 70% 60% at 68% 52%, black 0%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 68% 52%, black 0%, transparent 75%)" }}
      />
      <HeroSystem className="absolute inset-0" />
      {/* readability veil behind copy */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-ink via-ink/55 to-transparent md:w-[62%]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <p className="sr-only">
        Animated system diagram: Client, Discovery, Design, Engineering, Integrations, Intelligence, System — connected by
        web, CRM, API, AI, data, mobile, cloud and automation.
      </p>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="eyebrow mb-8 inline-flex items-center gap-3 rounded-full border border-bone/15 bg-ink/60 py-2 pl-3 pr-4 text-bone/80 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
          </span>
          {company.statusLabel}
        </motion.div>

        <h1 className="display text-[clamp(2.6rem,7.2vw,7.4rem)] text-bone">
          <Line delay={0.15}>Technology,</Line>
          <Line delay={0.27}>built around</Line>
          <Line delay={0.39}>
            <span className="serif-accent text-ember">the problem.</span>
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
          className="mt-8 max-w-[34rem] text-[17px] leading-relaxed text-bone/70 md:text-lg"
        >
          {company.heroStatement}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
          className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
        >
          <MagneticButton variant="primary" onClick={openBrief}>
            Start a project
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => scrollToSection("two-sides")}>
            Explore our technology
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="eyebrow pointer-events-none absolute bottom-8 left-10 hidden items-center gap-3 text-ash md:flex"
      >
        <span className="relative block h-8 w-px overflow-hidden bg-bone/20">
          <span className="absolute inset-x-0 top-0 h-3 animate-[scan_2.2s_ease-in-out_infinite] bg-ember" />
        </span>
        Scroll
      </motion.div>
    </section>
  );
}
