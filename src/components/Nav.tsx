import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "../utils/cn";
import { useUI } from "../context/UIContext";
import { Wordmark } from "./ui";

const LINKS: { label: string; id: string }[] = [
  { label: "Work", id: "work" },
  { label: "Capabilities", id: "capabilities" },
  { label: "Products", id: "products" },
  { label: "Lab", id: "lab" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

function AugnessSpark() {
  return (
    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
    </span>
  );
}

export default function Nav() {
  const { openAugness, scrollToSection, openBrief } = useUI();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 420 && y > prev + 2 && !open);
    if (y < prev - 2) setHidden(false);
  });

  useEffect(() => {
    const ids = LINKS.map((l) => l.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => {
      if (window.scrollY < 200) setActive("");
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? "-110%" : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "transition-all duration-500",
            scrolled ? "border-b border-bone/10 bg-ink/70 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
          )}
        >
          <div
            className={cn(
              "mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-all duration-500 md:px-10",
              scrolled ? "h-14" : "h-20",
            )}
          >
            <button onClick={() => go("top")} aria-label="August Solutions — back to top" className="shrink-0">
              <Wordmark />
            </button>

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={cn(
                    "eyebrow relative py-2 transition-colors duration-300",
                    active === l.id ? "text-bone" : "text-ash hover:text-bone",
                  )}
                >
                  {l.label}
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-ember"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => openAugness()}
                className="group eyebrow flex items-center gap-2.5 rounded-full border border-ember/50 bg-ember/10 px-4 py-2.5 text-ember transition-all duration-300 hover:bg-ember hover:text-ink"
              >
                <AugnessSpark />
                <span>Augness</span>
              </button>
              <button
                onClick={() => setOpen((o) => !o)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <span className="relative block h-3 w-4">
                  <span className={cn("absolute left-0 h-px w-4 bg-bone transition-all duration-300", open ? "top-1.5 rotate-45" : "top-0")} />
                  <span className={cn("absolute left-0 h-px w-4 bg-bone transition-all duration-300", open ? "top-1.5 -rotate-45" : "top-3")} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
          >
            <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-40" />
            <nav className="relative flex flex-1 flex-col justify-center gap-1">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(l.id)}
                  className="display flex items-baseline gap-4 border-b border-bone/10 py-4 text-left text-4xl"
                >
                  <span className="eyebrow text-ember">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </motion.button>
              ))}
            </nav>
            <div className="relative flex flex-col gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  openBrief();
                }}
                className="eyebrow rounded-full bg-ember py-4 text-center text-ink"
              >
                Start a project
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  openAugness();
                }}
                className="eyebrow rounded-full border border-ember/50 py-4 text-center text-ember"
              >
                Talk to Augness
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
