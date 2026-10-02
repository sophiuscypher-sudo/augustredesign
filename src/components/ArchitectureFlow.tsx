import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "../utils/cn";

/**
 * A simplified architecture diagram: nodes connected by pulses that travel
 * through the system. Responsive — horizontal on desktop, vertical on mobile.
 */
export function ArchitectureFlow({
  nodes,
  tone = "dark",
  vertical,
  className,
}: {
  nodes: string[];
  tone?: "dark" | "light";
  vertical?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(0);

  // fall back to a vertical flow whenever the container is too narrow for a horizontal one
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const needed = nodes.length * 158 + (nodes.length - 1) * 28;
  const isVertical = vertical ?? (width > 0 && width < needed);

  useEffect(() => {
    if (!inView) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % nodes.length), 1100);
    return () => window.clearInterval(id);
  }, [inView, nodes.length]);

  const dark = tone === "dark";

  return (
    <div
      ref={ref}
      className={cn("flex", isVertical ? "flex-col items-stretch" : "flex-row items-center", className)}
    >
      {nodes.map((n, i) => {
        const on = i === active;
        return (
          <div
            key={n + i}
            className={cn("flex", isVertical ? "flex-col items-stretch" : "flex-1 flex-row items-center", i === nodes.length - 1 && !isVertical && "flex-none")}
          >
            <motion.div
              animate={{ scale: on ? 1.04 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className={cn(
                "relative flex shrink-0 items-center gap-3 rounded-md border px-4 py-3 transition-colors duration-500",
                dark ? "bg-coal" : "bg-bone",
                on
                  ? "border-ember"
                  : dark
                    ? "border-bone/15"
                    : "border-ink/20",
              )}
            >
              <span className={cn("eyebrow text-[10px]", on ? "text-ember" : dark ? "text-ash" : "text-steel")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={cn("text-[12px] font-medium uppercase tracking-[0.12em]", dark ? "text-bone" : "text-ink")}>
                {n}
              </span>
              {on && (
                <span className="pointer-events-none absolute -inset-px rounded-md ring-1 ring-ember/40" />
              )}
            </motion.div>

            {i < nodes.length - 1 && (
              <div
                className={cn(
                  "relative",
                  isVertical ? "mx-auto h-8 w-px" : "mx-1 h-px min-w-6 flex-1",
                  dark ? "bg-bone/20" : "bg-ink/25",
                )}
              >
                <motion.span
                  className="absolute h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_10px_2px_rgba(255,75,36,0.6)]"
                  style={isVertical ? { left: -2.5, top: 0 } : { top: -2.5, left: 0 }}
                  animate={isVertical ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : { left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
