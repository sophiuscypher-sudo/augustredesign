import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { capabilities } from "../data/company";
import { getProject } from "../data/projects";
import { cn } from "../utils/cn";
import { useUI } from "../context/UIContext";
import { Eyebrow, Reveal, TypeTag } from "./ui";

export default function WhatWeBuild() {
  const { openProject, scrollToSection, openAugness } = useUI();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });

  useEffect(() => {
    if (!auto || !inView) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % capabilities.length), 5200);
    return () => window.clearInterval(id);
  }, [auto, inView]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const cap = capabilities[active];
  const projects = cap.projects.map(getProject).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const pos = (i: number) => {
    const a = ((-90 + i * (360 / capabilities.length)) * Math.PI) / 180;
    return { x: 50 + 39 * Math.cos(a), y: 50 + 39 * Math.sin(a) };
  };

  return (
    <section id="capabilities" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <Eyebrow index="03">Capabilities</Eyebrow>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(2.4rem,6.4vw,6.2rem)]">
                What we <span className="serif-accent text-ember">build.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-bone/65 md:justify-self-end">
              Eight areas of technology, mapped around your business. Select any one to see what it covers — and the
              work behind it.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* technology map (desktop) */}
          <div className="relative hidden md:block">
            <div className="relative mx-auto aspect-square w-full max-w-[640px]">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
                <circle cx="50" cy="50" r="39" fill="none" stroke="rgba(242,239,232,0.1)" vectorEffect="non-scaling-stroke" strokeDasharray="2 6" />
                <circle cx="50" cy="50" r="24" fill="none" stroke="rgba(242,239,232,0.06)" vectorEffect="non-scaling-stroke" />
                {capabilities.map((c, i) => {
                  const p = pos(i);
                  const on = i === active;
                  return (
                    <line
                      key={c.id}
                      x1="50"
                      y1="50"
                      x2={p.x}
                      y2={p.y}
                      stroke={on ? "#ff4b24" : "rgba(242,239,232,0.2)"}
                      strokeWidth={on ? 1.6 : 1}
                      vectorEffect="non-scaling-stroke"
                      className={on ? "flow-line" : ""}
                    />
                  );
                })}
              </svg>

              <div className="absolute left-1/2 top-1/2 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ember/50 bg-ink text-center">
                <motion.span
                  className="absolute inset-0 rounded-full border border-ember/40"
                  animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                />
                <span className="eyebrow leading-snug text-bone">
                  Your
                  <br />
                  business
                </span>
              </div>

              {capabilities.map((c, i) => {
                const p = pos(i);
                const on = i === active;
                return (
                  <button
                    key={c.id}
                    onClick={() => pick(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && pick(i)}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    className={cn(
                      "absolute w-[27%] max-w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-md border px-3 py-2.5 text-left transition-all duration-300",
                      on ? "border-ember bg-ember text-ink shadow-[0_0_40px_-8px_rgba(255,75,36,0.6)]" : "border-bone/20 bg-ink text-bone/80 hover:border-bone/60",
                    )}
                  >
                    <span className={cn("eyebrow block text-[10px]", on ? "text-ink/70" : "text-ember")}>{c.index}</span>
                    <span className="mt-0.5 block text-[12px] font-medium uppercase leading-tight tracking-[0.06em]">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* mobile selector */}
          <div className="grid grid-cols-2 gap-2 md:hidden">
            {capabilities.map((c, i) => (
              <button
                key={c.id}
                onClick={() => pick(i)}
                className={cn(
                  "rounded-md border px-3 py-3 text-left transition-colors",
                  i === active ? "border-ember bg-ember text-ink" : "border-bone/15 text-bone/80",
                )}
              >
                <span className={cn("eyebrow block text-[10px]", i === active ? "text-ink/70" : "text-ember")}>{c.index}</span>
                <span className="mt-0.5 block text-[12px] font-medium uppercase leading-tight tracking-[0.06em]">{c.name}</span>
              </button>
            ))}
          </div>

          {/* detail */}
          <div className="relative min-h-[420px] rounded-md border border-bone/12 bg-graphite p-7 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow text-ember">{cap.index} / {String(capabilities.length).padStart(2, "0")}</span>
                  <span className="eyebrow text-ash">Technology map</span>
                </div>
                <h3 className="display mt-6 text-[clamp(1.8rem,3.2vw,2.8rem)]">{cap.name}</h3>
                <p className="mt-4 text-bone/75">{cap.summary}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-bone/55">{cap.detail}</p>

                <div className="eyebrow mt-8 text-ash">What we engineer</div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cap.ships.map((s) => (
                    <li key={s} className="rounded-full border border-bone/15 px-3 py-1.5 text-[13px] text-bone/80">
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="eyebrow mt-8 text-ash">Examples of actual work</div>
                {projects.length > 0 ? (
                  <ul className="mt-3 divide-y divide-bone/10 border-y border-bone/10">
                    {projects.map((p) => (
                      <li key={p.slug}>
                        <button
                          onClick={() => openProject(p.slug)}
                          className="group flex w-full items-center justify-between gap-4 py-3.5 text-left"
                        >
                          <span className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                            <TypeTag type={p.type} className="shrink-0 self-start" />
                            <span className="truncate font-medium transition-colors group-hover:text-ember">{p.name}</span>
                          </span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-3 rounded-md border border-dashed border-bone/20 p-4 text-[15px] text-bone/60">
                    {cap.note}
                    <div className="mt-3 flex flex-wrap gap-4">
                      <button onClick={() => scrollToSection("integrations")} className="eyebrow text-ember underline-offset-4 hover:underline">
                        See the architecture →
                      </button>
                      <button onClick={() => openAugness("Can you integrate our CRM?")} className="eyebrow text-ember underline-offset-4 hover:underline">
                        Ask Augness →
                      </button>
                    </div>
                  </div>
                )}
                {projects.length > 0 && cap.note && <p className="mt-3 text-[13px] text-bone/45">{cap.note}</p>}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
