import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { cn } from "../../utils/cn";
import { useIsMobile } from "../ui";

const MONO = '"Geist Mono", ui-monospace, monospace';
const T = "text-[max(9px,2.1cqw)]";

function Stage({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)} style={{ containerType: "inline-size" }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════ BROWNFLEET — fleet dashboard ═══════════════════════════ */

const BF_TABS = [
  { key: "Dashboard", d: "M3 3h7v7H3zM14 3h7v4h-7zM14 10h7v11h-7zM3 13h7v8H3z" },
  { key: "Vehicles", d: "M4 16V11l2-5h12l2 5v5M4 16h16M7 19a1 1 0 100-2 1 1 0 000 2zM17 19a1 1 0 100-2 1 1 0 000 2z" },
  { key: "Drivers", d: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-6 8-6s8 2 8 6" },
  { key: "Maintenance", d: "M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" },
  { key: "Analytics", d: "M4 20V10M10 20V4M16 20v-8M22 20H2" },
  { key: "Monitoring", d: "M2 12h4l3-8 4 16 3-8h6" },
] as const;

const pill = (tone: "ok" | "idle" | "warn") =>
  cn(
    "inline-flex items-center gap-[0.8cqw] rounded-full border px-[1.4cqw] py-[0.5cqw] uppercase tracking-[0.1em]",
    T,
    tone === "ok" && "border-bone/25 text-bone/80",
    tone === "idle" && "border-bone/10 text-bone/40",
    tone === "warn" && "border-ember/60 text-ember",
  );

function Dot({ tone }: { tone: "ok" | "idle" | "warn" }) {
  return (
    <span
      className={cn(
        "h-[1.1cqw] min-h-1 w-[1.1cqw] min-w-1 rounded-full",
        tone === "ok" ? "bg-bone/70" : tone === "idle" ? "bg-bone/25" : "bg-ember",
      )}
    />
  );
}

function BFPanel({ k }: { k: string }) {
  switch (k) {
    case "Vehicles":
      return (
        <div>
          <div className={cn("mb-[1.6cqw] grid grid-cols-[1.4fr_1fr_1fr] px-[1.6cqw] uppercase tracking-[0.14em] text-ash", T)}>
            <span>Vehicle</span>
            <span>Status</span>
            <span>Assigned</span>
          </div>
          {(
            [
              ["ok", "Active"],
              ["ok", "Active"],
              ["idle", "Idle"],
              ["warn", "Service"],
              ["ok", "Active"],
              ["idle", "Idle"],
            ] as const
          ).map(([tone, label], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="mb-[1cqw] grid grid-cols-[1.4fr_1fr_1fr] items-center rounded-[0.8cqw] border border-bone/8 bg-bone/[0.03] px-[1.6cqw] py-[1.3cqw]"
            >
              <span className={cn("text-bone/85", T)}>Vehicle {String(i + 1).padStart(2, "0")}</span>
              <span className={pill(tone)}>
                <Dot tone={tone} />
                {label}
              </span>
              <span className={cn("text-bone/50", T)}>Driver {String((i % 5) + 1).padStart(2, "0")}</span>
            </motion.div>
          ))}
        </div>
      );
    case "Drivers":
      return (
        <div className="space-y-[1cqw]">
          {(["ok", "ok", "idle", "ok", "idle"] as const).map((tone, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-[2cqw] rounded-[0.8cqw] border border-bone/8 bg-bone/[0.03] p-[1.6cqw]"
            >
              <span className="flex h-[5cqw] min-h-6 w-[5cqw] min-w-6 items-center justify-center rounded-full bg-bone/12 text-bone/70">
                <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d={BF_TABS[2].d} />
                </svg>
              </span>
              <span className="flex-1">
                <span className={cn("block text-bone/85", T)}>Driver {String(i + 1).padStart(2, "0")}</span>
                <span className="mt-[0.8cqw] block h-[0.9cqw] w-1/3 rounded-full bg-bone/15" />
              </span>
              <span className={pill(tone)}>
                <Dot tone={tone} />
                {tone === "ok" ? "On duty" : "Off duty"}
              </span>
            </motion.div>
          ))}
        </div>
      );
    case "Maintenance":
      return (
        <div className="space-y-[1.4cqw]">
          {[
            { l: "Scheduled service", w: 34, tone: "idle" as const },
            { l: "In service", w: 68, tone: "warn" as const },
            { l: "Inspection", w: 52, tone: "ok" as const },
            { l: "Completed", w: 100, tone: "ok" as const },
          ].map((m, i) => (
            <div key={m.l} className="rounded-[0.8cqw] border border-bone/8 bg-bone/[0.03] p-[1.8cqw]">
              <div className={cn("mb-[1.2cqw] flex items-center justify-between uppercase tracking-[0.12em]", T)}>
                <span className="text-bone/80">{m.l}</span>
                <span className={pill(m.tone)}>
                  <Dot tone={m.tone} />
                  Vehicle {String(i + 2).padStart(2, "0")}
                </span>
              </div>
              <div className="h-[1.1cqw] min-h-1 overflow-hidden rounded-full bg-bone/10">
                <motion.div
                  className={cn("h-full rounded-full", m.tone === "warn" ? "bg-ember" : "bg-bone/60")}
                  initial={{ width: 0 }}
                  animate={{ width: `${m.w}%` }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    case "Analytics":
      return (
        <div className="grid grid-cols-[1.4fr_1fr] gap-[1.6cqw]">
          <div className="rounded-[0.8cqw] border border-bone/8 bg-bone/[0.03] p-[2cqw]">
            <div className={cn("mb-[2cqw] uppercase tracking-[0.14em] text-ash", T)}>Utilization</div>
            <div className="flex h-[22cqw] items-end gap-[1.4cqw]">
              {[40, 62, 48, 74, 58, 86, 70, 92, 64, 80].map((h, i) => (
                <motion.div
                  key={i}
                  className={cn("flex-1 rounded-t-[0.4cqw]", i === 7 ? "bg-ember" : "bg-bone/30")}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-[0.8cqw] border border-bone/8 bg-bone/[0.03] p-[2cqw]">
            <div className={cn("mb-[2cqw] uppercase tracking-[0.14em] text-ash", T)}>Trend</div>
            <svg viewBox="0 0 120 70" className="h-[22cqw] w-full">
              <motion.path
                d="M2 56 C 22 50, 30 20, 52 28 S 84 56, 100 22 L118 8"
                fill="none"
                stroke="#ff4b24"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4 }}
              />
              <path d="M2 66 H118" stroke="rgba(242,239,232,0.15)" />
            </svg>
          </div>
        </div>
      );
    case "Monitoring":
      return (
        <div className="space-y-[1.4cqw]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-[0.8cqw] border border-bone/8 bg-bone/[0.03] p-[1.8cqw]">
              <div className={cn("mb-[0.8cqw] flex items-center justify-between uppercase tracking-[0.12em]", T)}>
                <span className="text-bone/80">Vehicle {String(i + 1).padStart(2, "0")}</span>
                <span className="flex items-center gap-[0.8cqw] text-ember">
                  <motion.span className="h-[1.1cqw] min-h-1 w-[1.1cqw] min-w-1 rounded-full bg-ember" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3 }} />
                  Live
                </span>
              </div>
              <svg viewBox="0 0 200 26" className="h-[7cqw] w-full" preserveAspectRatio="none">
                <motion.path
                  d={
                    [
                      "M0 13 H30 L36 4 L44 22 L50 13 H90 L96 6 L104 20 L110 13 H150 L156 4 L164 22 L170 13 H200",
                      "M0 13 C 20 4, 40 22, 60 13 S 100 4, 120 13 S 160 22, 200 13",
                      "M0 13 H50 L56 8 L62 18 L68 13 H130 L136 5 L144 21 L150 13 H200",
                    ][i]
                  }
                  fill="none"
                  stroke={i === 1 ? "#ff4b24" : "rgba(242,239,232,0.75)"}
                  strokeWidth="1.4"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                />
              </svg>
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className="space-y-[1.6cqw]">
          <div className="grid grid-cols-4 gap-[1.4cqw]">
            {["Vehicles", "Drivers", "Service due", "Alerts"].map((l, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-[0.8cqw] border border-bone/8 bg-bone/[0.03] p-[1.6cqw]"
              >
                <div className={cn("uppercase tracking-[0.1em] text-ash", T)}>{l}</div>
                <svg viewBox="0 0 60 20" className="mt-[1.4cqw] h-[4cqw] w-full">
                  <motion.path
                    d={["M0 14 L12 10 L24 12 L36 5 L48 8 L60 2", "M0 8 L12 12 L24 6 L36 9 L48 4 L60 7", "M0 16 L12 14 L24 15 L36 10 L48 11 L60 6", "M0 10 L12 10 L24 14 L36 8 L48 14 L60 12"][i]}
                    fill="none"
                    stroke={i === 3 ? "#ff4b24" : "rgba(242,239,232,0.7)"}
                    strokeWidth="1.4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: i * 0.1 }}
                  />
                </svg>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-[1.5fr_1fr] gap-[1.6cqw]">
            <div className="relative h-[27cqw] overflow-hidden rounded-[0.8cqw] border border-bone/8 bg-[#0e0e0d]">
              <svg viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
                {[40, 80, 120].map((y) => (
                  <path key={y} d={`M0 ${y} H300`} stroke="#1f1f1d" strokeWidth="7" />
                ))}
                {[60, 140, 220].map((x) => (
                  <path key={x} d={`M${x} 0 V160`} stroke="#1f1f1d" strokeWidth="7" />
                ))}
                <path d="M20 120 H140 V40 H280" fill="none" stroke="rgba(255,75,36,0.5)" strokeWidth="2" strokeDasharray="4 4" className="flow-line" />
                <path d="M60 10 V80 H220 V150" fill="none" stroke="rgba(242,239,232,0.3)" strokeWidth="1.5" strokeDasharray="3 5" className="flow-line" />
                <circle r="4" fill="#ff4b24">
                  <animateMotion dur="7s" repeatCount="indefinite" path="M20 120 H140 V40 H280" />
                </circle>
                <circle r="3.4" fill="#f2efe8">
                  <animateMotion dur="9s" repeatCount="indefinite" path="M60 10 V80 H220 V150" />
                </circle>
                <circle r="3" fill="rgba(242,239,232,0.6)">
                  <animateMotion dur="11s" repeatCount="indefinite" path="M280 120 H60 V160" />
                </circle>
              </svg>
              <span className={cn("absolute left-[1.6cqw] top-[1.4cqw] uppercase tracking-[0.14em] text-ash", T)}>Fleet map</span>
            </div>
            <div className="space-y-[1cqw]">
              {(["ok", "ok", "warn", "idle"] as const).map((tone, i) => (
                <div key={i} className="flex items-center justify-between rounded-[0.8cqw] border border-bone/8 bg-bone/[0.03] px-[1.6cqw] py-[1.5cqw]">
                  <span className={cn("text-bone/80", T)}>Vehicle {String(i + 1).padStart(2, "0")}</span>
                  <Dot tone={tone} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
  }
}

export function BrownfleetVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [tab, setTab] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || !inView) return;
    const id = window.setInterval(() => setTab((t) => (t + 1) % BF_TABS.length), 4200);
    return () => window.clearInterval(id);
  }, [auto, inView]);

  return (
    <Stage className="rounded-lg border border-bone/12 bg-ink text-bone shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
      <div ref={ref} className="flex h-full flex-col">
        <div className="flex items-center gap-[1.4cqw] border-b border-bone/10 px-[2.4cqw] py-[1.8cqw]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[1.4cqw] min-h-1.5 w-[1.4cqw] min-w-1.5 rounded-full bg-bone/20" />
          ))}
          <span className={cn("ml-[2cqw] uppercase tracking-[0.16em] text-ash", T)}>Brownfleet / {BF_TABS[tab].key}</span>
          <span className={cn("ml-auto flex items-center gap-[0.8cqw] uppercase tracking-[0.14em] text-ember", T)}>
            <span className="h-[1.1cqw] min-h-1 w-[1.1cqw] min-w-1 animate-blink rounded-full bg-ember" />
            Interface illustration
          </span>
        </div>
        <div className="flex min-h-0 flex-1">
          <div className="flex w-[11cqw] min-w-11 shrink-0 flex-col gap-[0.6cqw] border-r border-bone/10 p-[1.2cqw] @md:w-[22cqw]">
            {BF_TABS.map((t, i) => (
              <button
                key={t.key}
                onClick={() => {
                  setAuto(false);
                  setTab(i);
                }}
                className={cn(
                  "flex items-center justify-center gap-[1.4cqw] rounded-[0.8cqw] px-[1cqw] py-[1.4cqw] text-left transition-colors @md:justify-start",
                  i === tab ? "bg-bone/10 text-bone" : "text-bone/45 hover:text-bone/80",
                )}
                aria-label={t.key}
              >
                <svg viewBox="0 0 24 24" className="h-[3.2cqw] min-h-3.5 w-[3.2cqw] min-w-3.5 shrink-0" fill="none" stroke={i === tab ? "#ff4b24" : "currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d={t.d} />
                </svg>
                <span className={cn("hidden uppercase tracking-[0.12em] @md:block", T)}>{t.key}</span>
              </button>
            ))}
          </div>
          <div className="min-w-0 flex-1 overflow-hidden p-[2.4cqw]">
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                <BFPanel k={BF_TABS[tab].key} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ═══════════════════════════ MADIS POS — synchronized system ═══════════════════════════ */

const MADIS_NODES = [
  { key: "POS", note: "Sales on any platform, in the same system." },
  { key: "INVENTORY", note: "Stock stays in step with every sale." },
  { key: "ANALYTICS", note: "Sales and operations turned into business intelligence." },
  { key: "AI", note: "AI capabilities layered over the business data." },
  { key: "BUSINESS", note: "Built to serve multiple business types." },
];

export function MadisVisual() {
  const mobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || !inView) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % MADIS_NODES.length), 2400);
    return () => window.clearInterval(id);
  }, [auto, inView]);

  const D = !mobile;
  const vb = D ? "0 0 800 440" : "0 0 360 600";
  const pos = (i: number) => (D ? { x: 90 + i * 155, y: 214 } : { x: 130, y: 120 + i * 84 });
  const bw = D ? 124 : 150;
  const bh = D ? 64 : 54;

  const devices = D
    ? [
        { x: 30, w: 44, h: 30, label: "DESKTOP" },
        { x: 84, w: 28, h: 38, label: "TABLET" },
        { x: 122, w: 18, h: 34, label: "PHONE" },
      ]
    : [
        { x: 60, w: 44, h: 28, label: "DESKTOP" },
        { x: 118, w: 28, h: 36, label: "TABLET" },
        { x: 160, w: 18, h: 32, label: "PHONE" },
      ];
  const dy = D ? 52 : 34;

  const bar = D ? { x: 30, y: 350, w: 740, h: 34 } : { x: 290, y: 100, w: 36, h: 404 };

  return (
    <Stage className="rounded-lg border border-bone/12 bg-ink text-bone shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
      <div ref={ref} className="bg-blueprint absolute inset-0 opacity-40" />
      <svg viewBox={vb} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="MADIS: POS, inventory, analytics, AI and business, synchronized">
        {/* devices */}
        {devices.map((d) => (
          <g key={d.label}>
            <rect x={d.x} y={dy} width={d.w} height={d.h} rx={3} fill="none" stroke="rgba(242,239,232,0.5)" strokeWidth="1.2" />
            <text x={d.x + d.w / 2} y={dy + d.h + 13} textAnchor="middle" fontSize="7.5" fontFamily={MONO} letterSpacing="1" fill="#8d8a80">
              {d.label}
            </text>
          </g>
        ))}
        <text x={D ? 30 : 60} y={dy - 12} fontSize="8" fontFamily={MONO} letterSpacing="1.6" fill="#ff4b24">
          MULTI-PLATFORM
        </text>
        {/* devices → POS */}
        <path
          d={D ? `M${devices[1].x + 14} ${dy + 50} V${pos(0).y - bh / 2}` : `M${devices[1].x + 14} ${dy + 52} V${pos(0).y - bh / 2}`}
          stroke="rgba(242,239,232,0.35)"
          fill="none"
          className="flow-line"
        />

        {/* sync bar */}
        <rect x={bar.x} y={bar.y} width={bar.w} height={bar.h} rx={D ? 6 : 6} fill="rgba(255,75,36,0.07)" stroke="rgba(255,75,36,0.5)" strokeDasharray="4 4" />
        <text
          x={bar.x + bar.w / 2}
          y={bar.y + bar.h / 2 + 3}
          textAnchor="middle"
          fontSize="8.5"
          fontFamily={MONO}
          letterSpacing="2"
          fill="#ff4b24"
          transform={D ? undefined : `rotate(-90 ${bar.x + bar.w / 2} ${bar.y + bar.h / 2})`}
        >
          SYNCHRONIZATION · CLOUD
        </text>

        {/* chain connectors + vertical sync lines */}
        {MADIS_NODES.map((_, i) => {
          const p = pos(i);
          const q = i < MADIS_NODES.length - 1 ? pos(i + 1) : null;
          const toBar = D ? `M${p.x} ${p.y + bh / 2} V${bar.y}` : `M${p.x + bw / 2} ${p.y} H${bar.x}`;
          return (
            <g key={i}>
              {q && (
                <>
                  <path
                    d={D ? `M${p.x + bw / 2} ${p.y} H${q.x - bw / 2}` : `M${p.x} ${p.y + bh / 2} V${q.y - bh / 2}`}
                    stroke="rgba(242,239,232,0.4)"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  {/* bidirectional arrowheads */}
                  {D ? (
                    <>
                      <path d={`M${q.x - bw / 2 - 5} ${q.y - 4} l5 4 l-5 4`} stroke="rgba(242,239,232,0.7)" fill="none" />
                      <path d={`M${p.x + bw / 2 + 5} ${p.y - 4} l-5 4 l5 4`} stroke="rgba(242,239,232,0.7)" fill="none" />
                    </>
                  ) : (
                    <>
                      <path d={`M${q.x - 4} ${q.y - bh / 2 - 5} l4 5 l4 -5`} stroke="rgba(242,239,232,0.7)" fill="none" />
                      <path d={`M${p.x - 4} ${p.y + bh / 2 + 5} l4 -5 l4 5`} stroke="rgba(242,239,232,0.7)" fill="none" />
                    </>
                  )}
                  <circle r="2.6" fill="#ff4b24">
                    <animateMotion
                      dur="2.2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.4}s`}
                      path={D ? `M${p.x + bw / 2} ${p.y} H${q.x - bw / 2}` : `M${p.x} ${p.y + bh / 2} V${q.y - bh / 2}`}
                    />
                  </circle>
                  <circle r="2.6" fill="#f2efe8">
                    <animateMotion
                      dur="2.2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.4 + 1.1}s`}
                      path={D ? `M${q.x - bw / 2} ${q.y} H${p.x + bw / 2}` : `M${q.x} ${q.y - bh / 2} V${p.y + bh / 2}`}
                    />
                  </circle>
                </>
              )}
              <path d={toBar} stroke="rgba(255,75,36,0.45)" strokeWidth="1" fill="none" className={i % 2 ? "flow-line" : "flow-line-rev"} />
            </g>
          );
        })}

        {/* nodes */}
        {MADIS_NODES.map((n, i) => {
          const p = pos(i);
          const on = i === active;
          return (
            <g
              key={n.key}
              style={{ cursor: "pointer" }}
              onPointerEnter={() => {
                setAuto(false);
                setActive(i);
              }}
              onClick={() => {
                setAuto(false);
                setActive(i);
              }}
            >
              <motion.rect
                x={p.x - bw / 2}
                y={p.y - bh / 2}
                width={bw}
                height={bh}
                rx={6}
                animate={{ fill: on ? "#2a1712" : "#141413", stroke: on ? "#ff4b24" : "rgba(242,239,232,0.35)" }}
                strokeWidth={on ? 1.6 : 1}
              />
              <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fontFamily={MONO} letterSpacing="2" fill={on ? "#ff4b24" : "#f2efe8"}>
                {n.key}
              </text>
              <text x={p.x - bw / 2 + 8} y={p.y - bh / 2 + 13} fontSize="7" fontFamily={MONO} fill="#8d8a80">
                {String(i + 1).padStart(2, "0")}
              </text>
              {on && <rect x={p.x - bw / 2 - 4} y={p.y - bh / 2 - 4} width={bw + 8} height={bh + 8} rx={9} fill="none" stroke="rgba(255,75,36,0.35)" />}
            </g>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-[3cqw]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cn("max-w-[70%] uppercase leading-snug tracking-[0.1em] text-bone/75 text-[max(10px,2cqw)]")}
          >
            <span className="text-ember">{MADIS_NODES[active].key}</span> — {MADIS_NODES[active].note}
          </motion.div>
        </AnimatePresence>
      </div>
    </Stage>
  );
}

/* ═══════════════════════════ RAIDEN GRID — energy & mobility network ═══════════════════════════ */

const GRID: { id: string; x: number; y: number }[] = [
  { id: "a", x: 70, y: 320 },
  { id: "b", x: 170, y: 170 },
  { id: "c", x: 290, y: 280 },
  { id: "d", x: 250, y: 90 },
  { id: "e", x: 410, y: 190 },
  { id: "f", x: 500, y: 320 },
  { id: "g", x: 480, y: 70 },
  { id: "h", x: 90, y: 70 },
];
const GRID_EDGES: [string, string][] = [
  ["a", "c"], ["a", "b"], ["b", "d"], ["b", "c"], ["c", "e"], ["c", "f"], ["d", "e"], ["e", "f"], ["e", "g"], ["d", "h"], ["b", "h"], ["d", "g"],
];
const EV_PATH = "M70 320 L290 280 L410 190 L480 70";

const COMPONENTS = [
  { name: "Battery", d: "M4 8h14v8H4zM18 10h2v4h-2zM8 10v4M11 10v4M14 10v4" },
  { name: "Connector", d: "M8 4v6M16 4v6M6 10h12v3a6 6 0 01-12 0zM12 19v3" },
  { name: "Charger", d: "M6 3h9v18H6zM15 8h3a2 2 0 012 2v6M10 9l-2 4h3l-1 4" },
  { name: "Cable", d: "M3 8c6 0 3 8 9 8s3-8 9-8M3 8h0M21 8h0" },
];

export function RaidenVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [view, setView] = useState<"infra" | "power">("infra");
  const [active, setActive] = useState("c");
  const [auto, setAuto] = useState(true);
  const byId = (id: string) => GRID.find((g) => g.id === id)!;

  useEffect(() => {
    if (!auto || !inView) return;
    const order = ["a", "c", "e", "g", "d", "b"];
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % order.length;
      setActive(order[i]);
    }, 2200);
    return () => window.clearInterval(id);
  }, [auto, inView]);

  const act = byId(active);

  return (
    <Stage className="rounded-lg border border-bone/12 bg-[#0c0c0b] text-bone shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
      <div ref={ref} className="absolute inset-0">
        {/* tabs */}
        <div className="absolute left-[3cqw] top-[3cqw] z-10 flex gap-[1cqw] rounded-full border border-bone/15 bg-ink/80 p-[0.8cqw] backdrop-blur">
          {(
            [
              ["infra", "Charging infrastructure"],
              ["power", "EV power components"],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setView(k)}
              className={cn(
                "rounded-full px-[2cqw] py-[1cqw] uppercase tracking-[0.12em] transition-colors",
                T,
                view === k ? "bg-ember text-ink" : "text-bone/60 hover:text-bone",
              )}
            >
              {l}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {view === "infra" ? (
            <motion.svg
              key="infra"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              viewBox="0 0 580 400"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
            >
              {/* topographic rings */}
              {[60, 110, 170, 240].map((r) => (
                <ellipse key={r} cx="300" cy="210" rx={r * 1.7} ry={r} fill="none" stroke="rgba(242,239,232,0.05)" />
              ))}
              {GRID_EDGES.map(([a, b], i) => {
                const A = byId(a);
                const B = byId(b);
                const lit = a === active || b === active;
                return (
                  <line
                    key={i}
                    x1={A.x}
                    y1={A.y}
                    x2={B.x}
                    y2={B.y}
                    stroke={lit ? "#ff4b24" : "rgba(242,239,232,0.2)"}
                    strokeWidth={lit ? 1.6 : 1}
                    className={i % 2 ? "flow-line" : "flow-line-rev"}
                  />
                );
              })}
              {GRID.map((g) => {
                const on = g.id === active;
                return (
                  <g
                    key={g.id}
                    style={{ cursor: "pointer" }}
                    onPointerEnter={() => {
                      setAuto(false);
                      setActive(g.id);
                    }}
                    onClick={() => {
                      setAuto(false);
                      setActive(g.id);
                    }}
                  >
                    {on && (
                      <motion.circle cx={g.x} cy={g.y} fill="none" stroke="#ff4b24" animate={{ r: [14, 32], opacity: [0.7, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
                    )}
                    <circle cx={g.x} cy={g.y} r="14" fill="#141413" stroke={on ? "#ff4b24" : "rgba(242,239,232,0.5)"} strokeWidth="1.4" />
                    <path d="M0 -6 L-4 1 H0 L-1 6 L4 -2 H0 Z" transform={`translate(${g.x} ${g.y})`} fill={on ? "#ff4b24" : "#f2efe8"} />
                  </g>
                );
              })}
              {/* EV */}
              <path d={EV_PATH} fill="none" stroke="rgba(255,75,36,0.28)" strokeWidth="2" strokeDasharray="2 6" />
              <g>
                <rect x="-9" y="-5" width="18" height="10" rx="3" fill="#f2efe8" />
                <circle cx="-5" cy="6" r="2" fill="#f2efe8" />
                <circle cx="5" cy="6" r="2" fill="#f2efe8" />
                <animateMotion dur="9s" repeatCount="indefinite" path={EV_PATH} rotate="0" />
              </g>
              {/* callout */}
              <g transform={`translate(${Math.min(act.x + 22, 410)} ${Math.max(act.y - 46, 54)})`}>
                <rect width="140" height="38" rx="5" fill="rgba(11,11,10,0.92)" stroke="#ff4b24" />
                <text x="10" y="16" fontSize="7.5" fontFamily={MONO} letterSpacing="1.4" fill="#ff4b24">
                  CHARGING OPTION
                </text>
                <rect x="10" y="22" width="86" height="4" rx="2" fill="rgba(242,239,232,0.35)" />
                <rect x="10" y="29" width="54" height="3" rx="1.5" fill="rgba(242,239,232,0.18)" />
              </g>
            </motion.svg>
          ) : (
            <motion.div
              key="power"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center px-[4cqw] pt-[10cqw]"
            >
              <div className="grid w-full max-w-[86cqw] grid-cols-2 gap-[2.4cqw] @md:grid-cols-4">
                {COMPONENTS.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="relative rounded-md border border-bone/12 bg-bone/[0.03] p-[3cqw]"
                  >
                    <svg viewBox="0 0 24 24" className="h-[9cqw] min-h-8 w-[9cqw] min-w-8" fill="none" stroke={i === 2 ? "#ff4b24" : "#f2efe8"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d={c.d} />
                    </svg>
                    <div className={cn("mt-[2cqw] uppercase tracking-[0.14em] text-bone/80", T)}>{c.name}</div>
                    <motion.span
                      className="absolute right-[2cqw] top-[2cqw] h-[1.2cqw] min-h-1 w-[1.2cqw] min-w-1 rounded-full bg-ember"
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={cn("absolute bottom-[2.4cqw] left-[3cqw] uppercase tracking-[0.14em] text-ash", T)}>Interface illustration · Raiden Grid</div>
      </div>
    </Stage>
  );
}
