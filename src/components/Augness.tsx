import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { activeProvider, OPENING_MESSAGE, SUGGESTED_QUESTIONS } from "../lib/assistant";
import type { KnowledgeAction } from "../data/types";
import { cn } from "../utils/cn";
import { useUI } from "../context/UIContext";
import { useScrollLock } from "./ui";

interface Msg {
  id: number;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  actions?: KnowledgeAction[];
  degraded?: boolean;
}

function Spark({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-2.5 w-2.5 items-center justify-center", className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
    </span>
  );
}

export default function Augness() {
  const { augnessOpen, augnessSeed, openAugness, closeAugness, runAction, activeProject, briefOpen } = useUI();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [showLauncher, setShowLauncher] = useState(false);
  const idRef = useRef(0);
  const msgsRef = useRef<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const seedRef = useRef(0);
  const { scrollY } = useScroll();

  useScrollLock(augnessOpen && typeof window !== "undefined" && window.innerWidth < 640);

  useMotionValueEvent(scrollY, "change", (y) => setShowLauncher(y > 500));

  useEffect(() => {
    msgsRef.current = msgs;
  }, [msgs]);

  const ask = useCallback(async (q: string) => {
    const text = q.trim();
    if (!text) return;
    const user: Msg = { id: ++idRef.current, role: "user", content: text };
    const history = [...msgsRef.current, user].map((m) => ({ role: m.role, content: m.content }));
    setMsgs((m) => [...m, user]);
    setInput("");
    setPending(true);
    try {
      const reply = await activeProvider.ask(text, history.slice(0, -1));
      setMsgs((m) => [
        ...m,
        {
          id: ++idRef.current,
          role: "assistant",
          content: reply.text,
          sources: reply.sources,
          actions: reply.actions,
          degraded: reply.degraded,
        },
      ]);
    } finally {
      setPending(false);
    }
  }, []);

  const askRef = useRef(ask);
  useEffect(() => {
    askRef.current = ask;
  }, [ask]);

  // questions launched from elsewhere on the site
  useEffect(() => {
    if (augnessSeed && augnessSeed.n !== seedRef.current) {
      seedRef.current = augnessSeed.n;
      askRef.current(augnessSeed.q);
    }
  }, [augnessSeed]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, pending, augnessOpen]);

  useEffect(() => {
    if (!augnessOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAugness();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 350);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [augnessOpen, closeAugness]);

  const chipClass =
    "rounded-full border border-bone/15 px-3.5 py-2 text-left text-[13px] text-bone/80 transition-colors hover:border-ember hover:text-ember";

  return (
    <>
      {/* launcher */}
      <AnimatePresence>
        {showLauncher && !augnessOpen && !activeProject && !briefOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            whileHover={{ scale: 1.04 }}
            onClick={() => openAugness()}
            className="eyebrow fixed bottom-5 right-5 z-[55] flex items-center gap-3 rounded-full bg-ember px-5 py-3.5 text-ink shadow-[0_10px_40px_-8px_rgba(255,75,36,0.6)]"
            aria-label="Open Augness, the August intelligence layer"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
            </span>
            Ask Augness
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {augnessOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAugness}
              className="fixed inset-0 z-[64] bg-ink/60 backdrop-blur-[2px]"
            />
            <motion.aside
              key="panel"
              role="dialog"
              aria-label="Augness — the August intelligence layer"
              initial={{ x: "100%", opacity: 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.6 }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[65] flex w-full flex-col border-l border-bone/12 bg-coal shadow-2xl sm:w-[460px]"
            >
              {/* header */}
              <div className="relative border-b border-bone/12 px-6 pb-5 pt-6">
                <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-30" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <Spark />
                      <span className="display text-2xl" style={{ letterSpacing: "0.04em" }}>
                        Augness
                      </span>
                    </div>
                    <div className="eyebrow mt-2 text-[10px] text-ash">The August intelligence layer</div>
                  </div>
                  <button
                    onClick={closeAugness}
                    aria-label="Close Augness"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 text-bone/70 transition-colors hover:border-bone hover:text-bone"
                  >
                    <svg viewBox="0 0 14 14" width="12" height="12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round">
                      <path d="M1 1l12 12M13 1L1 13" />
                    </svg>
                  </button>
                </div>
                <div className="relative mt-4 rounded-md border border-bone/10 bg-ink/70 px-3.5 py-2.5">
                  <div className="eyebrow flex items-center gap-2 text-[10px] text-ember">
                    <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                    {activeProvider.statusLabel}
                  </div>
                  <p className="mt-1 text-[12px] leading-snug text-bone/50">{activeProvider.statusDetail}</p>
                </div>
              </div>

              {/* messages */}
              <div ref={scrollRef} className="thin-scroll flex-1 space-y-4 overflow-y-auto px-6 py-6">
                <div className="max-w-[92%] rounded-2xl rounded-bl-sm border border-bone/12 bg-graphite px-4 py-3.5">
                  <div className="display text-lg" style={{ letterSpacing: "0.01em" }}>
                    {OPENING_MESSAGE.title}
                  </div>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-bone/75">{OPENING_MESSAGE.body}</p>
                </div>

                {msgs.length === 0 && (
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="eyebrow text-[10px] text-ash">Suggested questions</div>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_QUESTIONS.map((s, i) => (
                        <motion.button
                          key={s}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 + i * 0.05 }}
                          onClick={() => ask(s)}
                          className={chipClass}
                        >
                          {s}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {msgs.map((m) =>
                  m.role === "user" ? (
                    <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-bone px-4 py-2.5 text-[14px] text-ink">
                      {m.content}
                    </motion.div>
                  ) : (
                    <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-[94%]">
                      <div className="rounded-2xl rounded-bl-sm border border-bone/12 bg-graphite px-4 py-3.5 text-[14px] leading-relaxed text-bone/85">
                        <p className="whitespace-pre-line">{m.content}</p>
                        {m.degraded && (
                          <p className="eyebrow mt-3 text-[10px] text-ash">Model unavailable — answered from August's data.</p>
                        )}
                      </div>
                      {m.sources && m.sources.length > 0 && (
                        <div className="eyebrow mt-2 px-1 text-[10px] text-ash">From: {m.sources.join(" · ")}</div>
                      )}
                      {m.actions && m.actions.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {m.actions.map((a, i) => (
                            <button
                              key={a.label + i}
                              onClick={() => runAction(a)}
                              className={cn(
                                "rounded-full border px-3.5 py-2 text-[13px] transition-colors",
                                a.kind === "brief"
                                  ? "border-ember bg-ember text-ink hover:bg-bone hover:border-bone"
                                  : "border-ember/50 text-ember hover:bg-ember hover:text-ink",
                              )}
                            >
                              {a.label} →
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ),
                )}

                {pending && (
                  <div className="flex w-fit gap-1.5 rounded-2xl rounded-bl-sm border border-bone/12 bg-graphite px-4 py-3.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-ember" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }} />
                    ))}
                  </div>
                )}
              </div>

              {/* quick questions after first message */}
              {msgs.length > 0 && (
                <div className="thin-scroll flex gap-2 overflow-x-auto border-t border-bone/10 px-6 py-3">
                  {SUGGESTED_QUESTIONS.map((s) => (
                    <button key={s} onClick={() => ask(s)} className={cn(chipClass, "shrink-0 whitespace-nowrap py-1.5")}>
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(input);
                }}
                className="flex items-center gap-2 border-t border-bone/12 p-4"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about August, our work or your project…"
                  className="min-w-0 flex-1 rounded-full border border-bone/15 bg-ink px-5 py-3.5 text-[14px] text-bone outline-none placeholder:text-bone/35 focus:border-ember"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || pending}
                  aria-label="Send"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ember text-ink transition-opacity disabled:opacity-40"
                >
                  <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 10h13M11 4l6 6-6 6" />
                  </svg>
                </button>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
