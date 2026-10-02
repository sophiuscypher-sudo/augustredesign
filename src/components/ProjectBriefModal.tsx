import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { capabilities, company } from "../data/company";
import { briefToText, submitBrief, type ProjectBrief } from "../lib/contact";
import { cn } from "../utils/cn";
import { useUI } from "../context/UIContext";
import { MagneticButton, useScrollLock } from "./ui";

type Status = "idle" | "sending" | "sent" | "mailto" | "unconfigured" | "error";

const field =
  "w-full rounded-md border border-bone/15 bg-ink px-4 py-3.5 text-[15px] text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-ember";

export default function ProjectBriefModal() {
  const { briefOpen, closeBrief, openAugness } = useUI();
  const [brief, setBrief] = useState<ProjectBrief>({ name: "", email: "", organization: "", needs: [], message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  useScrollLock(briefOpen);

  useEffect(() => {
    if (!briefOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeBrief();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstRef.current?.focus({ preventScroll: true }), 350);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [briefOpen, closeBrief]);

  const set = <K extends keyof ProjectBrief>(k: K, v: ProjectBrief[K]) => setBrief((b) => ({ ...b, [k]: v }));
  const toggle = (n: string) => set("needs", brief.needs.includes(n) ? brief.needs.filter((x) => x !== n) : [...brief.needs, n]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!brief.name.trim() || !/^\S+@\S+\.\S+$/.test(brief.email) || brief.message.trim().length < 10) {
      setError("Please add your name, a valid email and a short description of the problem (at least a sentence).");
      return;
    }
    setStatus("sending");
    const res = await submitBrief(brief);
    if (res.status === "error") {
      setStatus("error");
      setError(res.message);
    } else {
      setStatus(res.status);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(briefToText(brief));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  const reset = () => {
    setStatus("idle");
    setError("");
  };

  return (
    <AnimatePresence>
      {briefOpen && (
        <motion.div
          key="brief"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/80 backdrop-blur-md sm:items-center sm:p-6"
          onClick={closeBrief}
        >
          <motion.div
            role="dialog"
            aria-label="Start a project"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="thin-scroll relative max-h-[94svh] w-full max-w-2xl overflow-y-auto rounded-t-xl border border-bone/15 bg-coal p-6 sm:rounded-xl md:p-10"
          >
            <button
              onClick={closeBrief}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 text-bone/70 transition-colors hover:border-bone hover:text-bone"
            >
              <svg viewBox="0 0 14 14" width="12" height="12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>

            <div className="eyebrow text-ember">Start a project</div>
            <h3 className="display mt-4 text-[clamp(1.9rem,4vw,3rem)]">
              What problem are you
              <br />
              <span className="serif-accent text-ember">trying to solve?</span>
            </h3>

            {status === "idle" || status === "sending" || status === "error" ? (
              <form onSubmit={submit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow mb-2 block text-[10px] text-ash">Your name *</span>
                    <input ref={firstRef} className={field} value={brief.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                  </label>
                  <label className="block">
                    <span className="eyebrow mb-2 block text-[10px] text-ash">Email *</span>
                    <input type="email" className={field} value={brief.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                  </label>
                </div>
                <label className="block">
                  <span className="eyebrow mb-2 block text-[10px] text-ash">Organization</span>
                  <input className={field} value={brief.organization} onChange={(e) => set("organization", e.target.value)} autoComplete="organization" />
                </label>
                <div>
                  <span className="eyebrow mb-2 block text-[10px] text-ash">What are you looking for?</span>
                  <div className="flex flex-wrap gap-2">
                    {capabilities.map((c) => {
                      const on = brief.needs.includes(c.name);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => toggle(c.name)}
                          className={cn(
                            "rounded-full border px-3.5 py-2 text-[13px] transition-colors",
                            on ? "border-ember bg-ember text-ink" : "border-bone/15 text-bone/75 hover:border-bone/50",
                          )}
                        >
                          {c.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <label className="block">
                  <span className="eyebrow mb-2 block text-[10px] text-ash">The problem *</span>
                  <textarea
                    rows={5}
                    className={cn(field, "resize-y")}
                    placeholder="What are you trying to accomplish? Which systems are involved today?"
                    value={brief.message}
                    onChange={(e) => set("message", e.target.value)}
                  />
                </label>
                {error && <p className="rounded-md border border-ember/40 bg-ember/10 px-4 py-3 text-[14px] text-ember">{error}</p>}
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <MagneticButton type="submit" variant="primary" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send the brief"}
                  </MagneticButton>
                  <button
                    type="button"
                    onClick={() => openAugness("I want to start a project")}
                    className="eyebrow text-left text-ash underline-offset-4 hover:text-bone hover:underline"
                  >
                    Not sure yet? Talk to Augness →
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-8">
                {status === "sent" && (
                  <div className="rounded-md border border-ember/40 bg-ember/10 p-6">
                    <div className="display text-2xl">Brief received.</div>
                    <p className="mt-2 text-bone/75">Thank you — we'll review it and come back to you.</p>
                  </div>
                )}
                {status === "mailto" && (
                  <div className="rounded-md border border-ember/40 bg-ember/10 p-6">
                    <div className="display text-2xl">Opening your email app…</div>
                    <p className="mt-2 text-bone/75">Your brief has been prepared as an email to {company.contact.email}. Send it from your mail client to complete the request.</p>
                  </div>
                )}
                {status === "unconfigured" && (
                  <div>
                    <div className="rounded-md border border-bone/20 bg-ink p-6">
                      <div className="display text-2xl">Your brief is ready.</div>
                      <p className="mt-2 text-[15px] leading-relaxed text-bone/70">
                        This website doesn't have a contact channel connected yet, so <strong className="text-bone">nothing has been sent</strong>. Copy the brief below and send it to August directly.
                      </p>
                    </div>
                    <textarea readOnly rows={9} value={briefToText(brief)} className={cn(field, "mt-4 font-mono text-[12px] leading-relaxed")} />
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <MagneticButton variant="primary" onClick={copy} arrow={false}>
                        {copied ? "Copied" : "Copy brief"}
                      </MagneticButton>
                      <button onClick={reset} className="eyebrow text-ash underline-offset-4 hover:text-bone hover:underline">
                        Edit the brief
                      </button>
                    </div>
                  </div>
                )}
                {status !== "unconfigured" && (
                  <button onClick={closeBrief} className="eyebrow mt-6 text-ash underline-offset-4 hover:text-bone hover:underline">
                    Close
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
