import { motion } from "motion/react";
import { company } from "../data/company";
import { useUI } from "../context/UIContext";
import { MagneticButton, Reveal } from "./ui";

export default function CallToAction() {
  const { openBrief, openAugness } = useUI();
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32 md:px-10 md:py-48">
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-50" style={{ maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent 80%)" }} />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,75,36,0.2), transparent 65%)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-[1200px] text-center">
        <Reveal>
          <div className="eyebrow mb-8 text-ember">Action</div>
          <h2 className="display text-[clamp(2.4rem,7vw,7rem)]">
            Have a problem
            <br />
            worth <span className="serif-accent text-ember">building around?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-xl leading-snug text-bone/70">
            Tell us what you're trying to accomplish. We'll help turn the problem into a technology system.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <MagneticButton variant="primary" onClick={openBrief}>
              Start a project
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => openAugness()}>
              Talk to Augness
            </MagneticButton>
          </div>
          {company.contact.email && (
            <p className="mt-8 text-bone/55">
              Or write directly:{" "}
              <a className="text-bone underline decoration-ember underline-offset-4" href={`mailto:${company.contact.email}`}>
                {company.contact.email}
              </a>
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
