import { motion } from "motion/react";
import { labAreas } from "../data/company";
import { augustProducts } from "../data/projects";
import { useUI } from "../context/UIContext";
import { Eyebrow, Reveal } from "./ui";

const STAGES = ["Idea", "Prototype", "Engineering", "Product"];

export default function Lab() {
  const { openProject, openAugness } = useUI();

  return (
    <section id="lab" className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <Eyebrow index="09">Internal engineering</Eyebrow>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(2.6rem,7vw,7rem)]">
                The <span className="serif-accent text-ember">lab.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-bone/65 md:justify-self-end">
              Where August experiments, prototypes and engineers its own technology. Ideas enter on the left. Some of
              them leave as products.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="thin-scroll -mx-6 overflow-x-auto px-6 pb-4 md:mx-0 md:px-0">
            <div className="relative min-w-[820px] overflow-hidden rounded-md border border-bone/12 bg-graphite">
              {/* header */}
              <div className="grid grid-cols-[170px_repeat(4,1fr)] border-b border-bone/12">
                <div className="eyebrow p-4 text-ash">Area</div>
                {STAGES.map((s, i) => (
                  <div key={s} className="relative border-l border-bone/12 p-4">
                    <span className="eyebrow text-ember">{String(i + 1).padStart(2, "0")}</span>
                    <span className="eyebrow ml-3 text-bone">{s}</span>
                    {i === 3 && (
                      <motion.span
                        className="absolute right-4 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ember"
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* lanes */}
              <div className="relative">
                {/* stage tints */}
                <div className="pointer-events-none absolute inset-y-0 left-[170px] right-0 grid grid-cols-4">
                  {[0.01, 0.025, 0.04, 0.09].map((a, i) => (
                    <div key={i} className="border-l border-bone/10" style={{ background: i === 3 ? `rgba(255,75,36,${a})` : `rgba(242,239,232,${a})` }} />
                  ))}
                </div>
                {/* scan line */}
                <div className="pointer-events-none absolute inset-y-0 left-[170px] right-0">
                  <motion.div
                    className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-ember/60 to-transparent"
                    initial={{ left: "0%" }}
                    animate={{ left: ["0%", "100%"] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {labAreas.map((a, i) => (
                  <div key={a.name} className="relative grid grid-cols-[170px_1fr] items-center border-b border-bone/8 last:border-b-0">
                    <div className="p-4">
                      <div className="text-[13px] font-medium uppercase tracking-[0.08em]">{a.name}</div>
                      <div className="mt-0.5 hidden text-[11px] leading-snug text-bone/40 xl:block">{a.line}</div>
                    </div>
                    <div className="relative h-[58px]">
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.1em]"
                        initial={{ left: "4%", opacity: 0 }}
                        animate={{
                          left: ["4%", "4%", "29%", "54%", "79%", "79%", "4%"],
                          opacity: [0, 1, 1, 1, 1, 0, 0],
                          backgroundColor: ["#1a1a18", "#1a1a18", "#1a1a18", "#262623", "#ff4b24", "#ff4b24", "#1a1a18"],
                          color: ["#f2efe8", "#f2efe8", "#f2efe8", "#f2efe8", "#0b0b0a", "#0b0b0a", "#f2efe8"],
                          borderColor: ["rgba(242,239,232,0.3)", "rgba(242,239,232,0.3)", "rgba(242,239,232,0.3)", "rgba(242,239,232,0.5)", "#ff4b24", "#ff4b24", "rgba(242,239,232,0.3)"],
                        }}
                        transition={{
                          duration: 12 + (i % 3) * 2,
                          times: [0, 0.06, 0.3, 0.55, 0.8, 0.92, 1],
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 1.3,
                        }}
                      >
                        {a.name}
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow mr-2 text-ash">August products</span>
              {augustProducts.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => openProject(p.slug)}
                  className="rounded-full border border-ember/50 bg-ember/10 px-4 py-2 text-[13px] text-ember transition-colors hover:bg-ember hover:text-ink"
                >
                  {p.name}
                </button>
              ))}
              <button
                onClick={() => openAugness("What is Augness?")}
                className="rounded-full border border-ember/50 bg-ember/10 px-4 py-2 text-[13px] text-ember transition-colors hover:bg-ember hover:text-ink"
              >
                Augness
              </button>
            </div>
            <p className="max-w-sm text-sm text-bone/45">Motion here shows how work flows through the lab — not development statistics.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
