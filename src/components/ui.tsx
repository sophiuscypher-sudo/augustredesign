import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { cn } from "../utils/cn";
import type { ProjectType } from "../data/types";

/* ── hooks ─────────────────────────────────────────────── */

export function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches : false,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [breakpoint]);
  return mobile;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Lock page scroll while an overlay is open. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [active]);
}

/* ── layout primitives ─────────────────────────────────── */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Mounts children only once the placeholder is near the viewport. */
export function LazyMount({
  children,
  className,
  minHeight,
  margin = 400,
}: {
  children: ReactNode;
  className?: string;
  minHeight?: number | string;
  margin?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: `${margin}px 0px` as `${number}px ${number}px` });
  return (
    <div ref={ref} className={className} style={{ minHeight: inView ? undefined : minHeight }}>
      {inView ? children : null}
    </div>
  );
}

export function Eyebrow({
  children,
  index,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  index?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "dark" ? "text-ash" : "text-steel",
        className,
      )}
    >
      {index && <span className="text-ember">{index}</span>}
      <span className={cn("h-px w-8", tone === "dark" ? "bg-bone/25" : "bg-ink/25")} />
      <span>{children}</span>
    </div>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 10h13M11 4l6 6-6 6" />
    </svg>
  );
}

/** CLIENT PROJECT / AUGUST PRODUCT label. Used everywhere to keep the distinction visible. */
export function TypeTag({
  type,
  tone = "dark",
  className,
}: {
  type: ProjectType;
  tone?: "dark" | "light";
  className?: string;
}) {
  const isProduct = type === "product";
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] leading-none",
        isProduct
          ? "border-ember/60 bg-ember/10 text-ember"
          : tone === "dark"
            ? "border-bone/25 text-bone/80"
            : "border-ink/30 text-ink/80",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isProduct ? "bg-ember" : tone === "dark" ? "bg-bone/70" : "bg-ink/70",
        )}
      />
      {isProduct ? "AUGUST PRODUCT" : "CLIENT PROJECT"}
    </span>
  );
}

/* ── magnetic button ───────────────────────────────────── */

type Variant = "primary" | "ghost" | "light" | "dark" | "ghost-dark";

const variants: Record<Variant, string> = {
  primary: "bg-ember text-ink hover:bg-bone",
  light: "bg-bone text-ink hover:bg-ember",
  dark: "bg-ink text-bone hover:bg-ember hover:text-ink",
  ghost: "border border-bone/25 text-bone hover:border-bone hover:bg-bone/5",
  "ghost-dark": "border border-ink/30 text-ink hover:border-ink hover:bg-ink/5",
};

export function MagneticButton({
  children,
  variant = "primary",
  onClick,
  href,
  className,
  arrow = true,
  strength = 0.28,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  variant?: Variant;
  onClick?: () => void;
  href?: string;
  className?: string;
  arrow?: boolean;
  strength?: number;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const cls = cn(
    "group relative inline-flex select-none items-center justify-center gap-3 rounded-full px-6 py-4 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 disabled:opacity-50",
    variants[variant],
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ x, y }}
        className={cls}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      className={cls}
    >
      {inner}
    </motion.button>
  );
}

/** Wordmark — typographic, no raster asset needed. */
export function Wordmark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-medium tracking-[0.32em]",
        tone === "dark" ? "text-bone" : "text-ink",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
        <path d="M12 2 2.5 21h4.2l1.6-3.4h7.4l1.6 3.4h4.2L12 2Zm0 8.2 2.3 4.9H9.7L12 10.2Z" fill="currentColor" fillRule="evenodd" />
        <circle cx="12" cy="20.2" r="1.6" fill="#ff4b24" />
      </svg>
      <span className="text-[13px]">AUGUST</span>
    </span>
  );
}
