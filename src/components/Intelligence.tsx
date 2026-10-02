import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { aiUses } from "../data/company";
import { activeProvider, knowledgeProvider, SUGGESTED_QUESTIONS } from "../lib/assistant";
import { cn } from "../utils/cn";
import { useUI } from "../context/UIContext";
import { Eyebrow, MagneticButton, Reveal } from "./ui";

const DEMO_QUESTIONS = ["What can August build?", "Show me August products", "Can you integrate our CRM?"];

const CAN_DO = [
  "Understand August Solutions",
  "Explore projects",
  "Understand capabilities",
  "Find relevant services",
  "Explore August products",
  "Ask technical and business questions",
  "Check whether August can solve a problem",
  "Start a project",
];

/** A live preview that runs real questions through the knowledge provider. */
function AugnessPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [q, setQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState<"asking" | "typing">("asking");

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    setPhase("asking");
    setShown(0);
    setAnswer("");
    knowledgeProvider.ask(DEMO_QUESTIONS[q], []).then((r) => {
      if (cancelled) return;
      const t = r.text.replace(/\s+/g, " ");
      setAnswer(t.length > 210 ? t.slice(0, 207).trimEnd() + "…" : t);
      setPhase("typing");
    });
    return () => {
      cancelled = true;
    };
  }, [q, inView]);

  useEffect(() => {
    if (phase !== "typing" || !inView) return;
    if (shown >= answer.length) {
      const id = window.setTimeout(() => setQ((n) => (n + 1) % DEMO_QUESTIONS.length), 3200);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setShown((s) => Math.min(answer.length, s + 3)), 16);
    return () => window.clearTimeout(id);
  }, [phase, shown, answer, inView]);

  return (
    <div ref={ref} className="flex min-h-[250px] flex-col justify-end gap-3 p-5 md:p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={q}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-3"
        >
          <div className="self-end rounded-2xl rounded-br-sm bg-bone px-4 py-2.5 text-[14px] text-ink">{DEMO_QUESTIONS[q]}</div>
          <div className="max-w-[92%] self-start rounded-2xl rounded-bl-sm border border-bone/12 bg-graphite-2 px-4 py-3 text-[14px] leading-relaxed text-bone/85">
            {phase === "asking" ? (
              <span className="flex gap-1 py-1">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-ember" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }} />
                ))}
              </span>
            ) : (
              <>
                {answer.slice(0, shown)}
                {shown < answer.length && <span className="ml-0.5 inline-block h-3.5 w-px animate-blink bg-ember align-middle" />}
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Intelligence() {
  const { openAugness } = useUI();
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="intelligence" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow index="10">Artificial intelligence</Eyebrow>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(2.2rem,5.4vw,5.2rem)]">
                Intelligence,
                <br />
                <span className="serif-accent text-ember">where it matters.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-bone/65">
                AI is useful when it is placed inside a real workflow. We implement it practically — as assistants,
                search, recommendations, analytics and automation — connected to the systems your business already runs on.
              </p>
            </Reveal>

            <ol className="mt-10 border-t border-bone/12">
              {aiUses.map((u, i) => (
                <li
                  key={u}
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover(null)}
                  className="group flex items-center gap-5 border-b border-bone/12 py-3.5"
                >
                  <span className={cn("eyebrow w-6 transition-colors", hover === i ? "text-ember" : "text-ash")}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("text-lg transition-all duration-300", hover === i ? "translate-x-2 text-bone" : "text-bone/70")}>{u}</span>
                  <span className={cn("ml-auto h-px bg-ember transition-all duration-500", hover === i ? "w-12" : "w-0")} />
                </li>
              ))}
            </ol>
          </div>

          {/* Augness */}
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-md border border-bone/15 bg-coal">
                <div className="relative border-b border-bone/12 p-6 md:p-8">
                  <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-40" />
                  <div className="relative flex items-center justify-between">
                    <span className="eyebrow text-ember">The August intelligence layer</span>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
                    </span>
                  </div>
                  <h3 className="display relative mt-5 text-[clamp(2.4rem,5vw,4.4rem)]">Augness</h3>
                  <p className="relative mt-3 max-w-md leading-relaxed text-bone/65">
                    August's own assistant experience. Not a support widget — a way to explore what August builds, test
                    whether we can solve your problem, and start a project.
                  </p>
                </div>

                <AugnessPreview />

                <div className="border-t border-bone/12 p-5 md:p-6">
                  <div className="eyebrow mb-3 text-ash">Try asking</div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.slice(0, 5).map((s) => (
                      <button
                        key={s}
                        onClick={() => openAugness(s)}
                        className="rounded-full border border-bone/15 px-3.5 py-1.5 text-[13px] text-bone/80 transition-colors hover:border-ember hover:text-ember"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <MagneticButton variant="primary" onClick={() => openAugness()}>
                      Talk to Augness
                    </MagneticButton>
                    <div className="max-w-[250px] text-[12px] leading-snug text-bone/45">
                      <span className="eyebrow mb-1 block text-[10px] text-ember">{activeProvider.statusLabel}</span>
                      {activeProvider.statusDetail}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 px-1">
                {CAN_DO.map((c) => (
                  <div key={c} className="flex items-start gap-2.5 text-[13px] leading-snug text-bone/60">
                    <span className="mt-1.5 h-1 w-1 shrink-0 bg-ember" />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
