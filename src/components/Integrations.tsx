import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "motion/react";
import { crmArchitecture, integrationLayers } from "../data/company";
import { cn } from "../utils/cn";
import { useUI } from "../context/UIContext";
import { ArchitectureFlow } from "./ArchitectureFlow";
import { Eyebrow, MagneticButton, Reveal } from "./ui";

export default function Integrations() {
  const { openAugness, openBrief } = useUI();
  const [active, setActive] = useState(2);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });

  // subtle 3D tilt following the pointer
  const BASE_Y = -14;
  const BASE_X = 8;
  const px = useMotionValue(BASE_Y);
  const py = useMotionValue(BASE_X);
  const rx = useSpring(py, { stiffness: 90, damping: 18 });
  const ry = useSpring(px, { stiffness: 90, damping: 18 });

  useEffect(() => {
    if (!auto || !inView) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % integrationLayers.length), 2200);
    return () => window.clearInterval(id);
  }, [auto, inView]);

  const layer = integrationLayers[active];
  const prev = integrationLayers[active - 1]?.name;
  const next = integrationLayers[active + 1]?.name;

  return (
    <section id="integrations" className="relative overflow-hidden bg-coal px-6 py-28 md:px-10 md:py-40">
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="flex flex-col justify-center">
            <Eyebrow index="04">CRM &amp; integrations</Eyebrow>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(2.2rem,5.4vw,5rem)]">
                Your systems,
                <br />
                <span className="serif-accent text-ember">connected.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-xl leading-snug text-bone/80">
                We can connect the systems your business already uses and build new technology around them.
              </p>
              <p className="mt-4 max-w-md leading-relaxed text-bone/55">
                CRMs, payment systems, databases, analytics and AI — joined through APIs and automated workflows into
                one platform that moves information where it needs to go.
              </p>
            </Reveal>

            <div className="mt-8 min-h-[116px] rounded-md border border-bone/12 bg-ink/60 p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="eyebrow text-ember">
                    Layer {String(active + 1).padStart(2, "0")} — {layer.name}
                  </div>
                  <p className="mt-2 text-bone/75">{layer.note}</p>
                  <p className="mt-2 text-[13px] text-bone/45">
                    {prev && next ? `Connected to ${prev} and ${next}.` : prev ? `Connected to ${prev}.` : `Connected to ${next}.`}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton variant="primary" onClick={() => openAugness("Can you integrate our CRM?")}>
                Ask Augness about your CRM
              </MagneticButton>
              <MagneticButton variant="ghost" onClick={openBrief}>
                Start a project
              </MagneticButton>
            </div>
          </div>

          {/* 3D layered stack */}
          <div
            ref={ref}
            className="relative flex items-center justify-center py-6"
            style={{ perspective: 1400 }}
            onPointerMove={(e) => {
              if (e.pointerType !== "mouse") return;
              const r = e.currentTarget.getBoundingClientRect();
              px.set(BASE_Y + ((e.clientX - r.left) / r.width - 0.5) * 14);
              py.set(BASE_X - ((e.clientY - r.top) / r.height - 0.5) * 8);
            }}
            onPointerLeave={() => {
              px.set(BASE_Y);
              py.set(BASE_X);
            }}
          >
            <motion.div
              style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
              className="w-full max-w-[480px]"
            >
              {integrationLayers.map((l, i) => {
                const on = i === active;
                const core = l.name === "August Platform";
                return (
                  <div key={l.name}>
                    <motion.button
                      onClick={() => {
                        setAuto(false);
                        setActive(i);
                      }}
                      onPointerEnter={(e) => {
                        if (e.pointerType === "mouse") {
                          setAuto(false);
                          setActive(i);
                        }
                      }}
                      animate={{ z: on ? 26 : 0, x: on ? 10 : 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      className={cn(
                        "relative flex w-full items-center justify-between rounded-md border px-6 text-left transition-colors duration-300",
                        core ? "py-6" : "py-4",
                        on ? "border-ember bg-[#1f1411]" : core ? "border-bone/35 bg-graphite-2" : "border-bone/15 bg-graphite",
                      )}
                    >
                      <span className="flex items-center gap-4">
                        <span className={cn("eyebrow text-[10px]", on ? "text-ember" : "text-ash")}>{String(i + 1).padStart(2, "0")}</span>
                        <span className={cn("display tracking-[0.04em]", core ? "text-xl md:text-2xl" : "text-base md:text-lg")}>{l.name}</span>
                      </span>
                      <span className={cn("h-2 w-2 rounded-full", on ? "bg-ember" : "bg-bone/25")} />
                      {on && <span className="pointer-events-none absolute -inset-px rounded-md shadow-[0_0_50px_-6px_rgba(255,75,36,0.55)]" />}
                    </motion.button>

                    {i < integrationLayers.length - 1 && (
                      <div className="relative mx-auto flex h-7 w-px items-center justify-center bg-bone/25">
                        <span className="absolute -left-[5px] bg-coal text-[10px] leading-none text-bone/60">↕</span>
                        <motion.span
                          className="absolute -left-[2px] h-1 w-1 rounded-full bg-ember"
                          animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }}
                        />
                        <motion.span
                          className="absolute -left-[2px] h-1 w-1 rounded-full bg-bone"
                          animate={{ top: ["100%", "0%"], opacity: [0, 1, 0] }}
                          transition={{ duration: 1.4, repeat: Infinity, delay: 0.7 + i * 0.18 }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* reference architecture */}
        <Reveal className="mt-20 md:mt-28">
          <div className="rounded-md border border-bone/12 bg-ink/70 p-6 md:p-10">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div className="eyebrow text-ember">Reference architecture</div>
                <h3 className="display mt-2 text-2xl md:text-3xl">{crmArchitecture.title.replace("Reference architecture — ", "")}</h3>
              </div>
              <span className="eyebrow text-ash">{crmArchitecture.caption}</span>
            </div>
            <ArchitectureFlow nodes={crmArchitecture.nodes} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
