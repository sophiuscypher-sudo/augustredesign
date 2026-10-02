import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { processSteps } from "../data/company";
import { cn } from "../utils/cn";
import { Eyebrow, Reveal, useIsMobile } from "./ui";

export default function Process() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const mobile = useIsMobile();
  const n = processSteps.length;

  useEffect(() => {
    if (!auto || !inView) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % n), 3400);
    return () => window.clearInterval(id);
  }, [auto, inView, n]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };
  const step = processSteps[active];
  const status = (i: number) => (i < active ? "Complete" : i === active ? "Active" : "Next");

  return (
    <section id="process" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <Eyebrow index="11">The process</Eyebrow>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(2.2rem,5.6vw,5.4rem)]">
                An engineering
                <br />
                <span className="serif-accent text-ember">pipeline.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-bone/65 md:justify-self-end">
              From the first conversation to a system that keeps evolving: seven connected stages, each feeding the
              next.
            </p>
          </Reveal>
        </div>

        <div ref={ref}>
          {!mobile ? (
            <>
              {/* pipeline */}
              <div className="relative">
                <div className="relative grid grid-cols-7 gap-3">
                  {processSteps.map((s, i) => {
                    const on = i === active;
                    const done = i < active;
                    return (
                      <button key={s.code} onClick={() => pick(i)} className="group text-left">
                        <div className="eyebrow mb-3 flex items-center justify-between text-[10px]">
                          <span className={cn(on ? "text-ember" : "text-ash")}>{s.code}</span>
                          <span className={cn(on ? "text-ember" : done ? "text-bone/60" : "text-bone/30")}>{status(i)}</span>
                        </div>
                        <div className="relative mb-5 flex h-6 items-center">
                          <span className="absolute -right-1.5 left-0 top-1/2 h-px bg-bone/15" />
                          <motion.span
                            className="absolute left-0 top-1/2 h-px bg-ember"
                            initial={false}
                            animate={{ width: done ? "calc(100% + 6px)" : on ? "24px" : "0px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                          <motion.span
                            className={cn("relative z-10 block h-3.5 w-3.5 rounded-full border-2", on ? "border-ember bg-ember" : done ? "border-bone/70 bg-bone/70" : "border-bone/30 bg-ink")}
                            animate={{ scale: on ? 1.35 : 1 }}
                          />
                          {on && (
                            <motion.span
                              className="absolute left-0 h-3.5 w-3.5 rounded-full border border-ember"
                              animate={{ scale: [1, 2.6], opacity: [0.7, 0] }}
                              transition={{ duration: 1.6, repeat: Infinity }}
                            />
                          )}
                        </div>
                        <div
                          className={cn(
                            "rounded-md border p-4 transition-colors duration-300",
                            on ? "border-ember bg-[#1c1411]" : "border-bone/12 bg-graphite group-hover:border-bone/35",
                          )}
                        >
                          <div className="display text-[15px] tracking-[0.04em]" style={{ letterSpacing: "0.06em" }}>
                            {s.name}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* detail */}
              <div className="mt-8 grid gap-6 rounded-md border border-bone/12 bg-coal p-8 md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-12 md:p-10">
                <AnimatePresence mode="wait">
                  <motion.div key={step.code} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="display text-[clamp(4rem,9vw,8rem)] text-ember">
                    {step.code}
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div key={step.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className="display text-3xl md:text-4xl">{step.name}</div>
                    <p className="mt-3 max-w-sm text-lg text-bone/70">{step.description}</p>
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div key={step.code + "a"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-md border border-bone/10 bg-ink p-5 font-mono text-[12px] leading-relaxed text-bone/70">
                    <div className="text-ash">{`> stage ${step.code} / ${step.name.toLowerCase()}`}</div>
                    {step.artifacts.map((a, i) => (
                      <motion.div key={a} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12 }}>
                        <span className="text-ember">+</span> {a}
                      </motion.div>
                    ))}
                    <div className="mt-1 text-ash">{active < n - 1 ? `> next: ${processSteps[active + 1].name.toLowerCase()}` : "> loop: back to stage 01"}</div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          ) : (
            <ol className="relative border-l border-bone/15 pl-6">
              {processSteps.map((s, i) => {
                const on = i === active;
                return (
                  <li key={s.code} className="relative pb-5 last:pb-0">
                    <span className={cn("absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2", on ? "border-ember bg-ember" : i < active ? "border-bone/70 bg-bone/70" : "border-bone/30 bg-ink")} />
                    <button onClick={() => pick(i)} className="w-full text-left">
                      <div className="flex items-baseline gap-3">
                        <span className={cn("eyebrow", on ? "text-ember" : "text-ash")}>{s.code}</span>
                        <span className={cn("display text-2xl", on ? "text-bone" : "text-bone/50")}>{s.name}</span>
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <p className="mt-2 text-bone/70">{s.description}</p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {s.artifacts.map((a) => (
                              <span key={a} className="rounded-full border border-bone/15 px-2.5 py-1 text-[12px] text-bone/65">
                                {a}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
