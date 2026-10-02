import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { cn } from "../../utils/cn";

const MONO = '"Geist Mono", ui-monospace, monospace';

/** shared wrapper: every visual fills its parent and sizes type via container units */
function Stage({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)} style={{ containerType: "inline-size" }}>
      {children}
    </div>
  );
}

const chip =
  "absolute rounded-md border border-bone/15 bg-ink/85 px-[2.4cqw] py-[1.6cqw] text-[2.5cqw] uppercase tracking-[0.14em] text-bone/80 backdrop-blur-sm";

/* ═══════════════════════════ TEDDY CABS — animated map ═══════════════════════════ */

export function TeddyVisual({ compact }: { compact?: boolean }) {
  const route = "M70 235 L70 130 L240 130 L240 60 L330 60";
  const H = [60, 130, 200, 262];
  const V = [70, 150, 240, 330];
  return (
    <Stage className="bg-[#10100f]">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <path d="M-10 222 C 60 236, 120 256, 200 246 S 340 276, 410 256 L410 310 L-10 310Z" fill="rgba(242,239,232,0.05)" />
        <rect x="165" y="75" width="60" height="45" rx="6" fill="rgba(242,239,232,0.035)" />
        {H.map((y) => (
          <path key={`h${y}`} d={`M-10 ${y} H410`} stroke="#222220" strokeWidth="9" />
        ))}
        {V.map((x) => (
          <path key={`v${x}`} d={`M${x} -10 V310`} stroke="#222220" strokeWidth="9" />
        ))}
        <path d="M150 -10 L410 190" stroke="#222220" strokeWidth="6" />
        {H.map((y) => (
          <path key={`hd${y}`} d={`M-10 ${y} H410`} stroke="rgba(242,239,232,0.1)" strokeWidth="0.7" strokeDasharray="4 7" />
        ))}
        {V.map((x) => (
          <path key={`vd${x}`} d={`M${x} -10 V310`} stroke="rgba(242,239,232,0.1)" strokeWidth="0.7" strokeDasharray="4 7" />
        ))}

        {/* ambient traffic */}
        {[
          { d: "M-10 200 H410", dur: 15, b: -3 },
          { d: "M240 310 V-10", dur: 12, b: -6 },
          { d: "M410 262 H-10", dur: 18, b: -9 },
          { d: "M150 -10 V310", dur: 14, b: -2 },
        ].map((c, i) => (
          <circle key={i} r="2.6" fill="rgba(242,239,232,0.55)">
            <animateMotion dur={`${c.dur}s`} repeatCount="indefinite" path={c.d} begin={`${c.b}s`} />
          </circle>
        ))}

        {/* route */}
        <path d={route} fill="none" stroke="rgba(255,75,36,0.22)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <motion.path
          d={route}
          fill="none"
          stroke="#ff4b24"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1] }}
          transition={{ duration: 5, times: [0, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="70"
          cy="235"
          fill="none"
          stroke="#f2efe8"
          strokeWidth="1"
          animate={{ r: [6, 20], opacity: [0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <circle cx="70" cy="235" r="6" fill="#f2efe8" />
        <rect x="323" y="53" width="14" height="14" rx="2" fill="#ff4b24" />
        <circle r="5.5" fill="#f2efe8" stroke="#ff4b24" strokeWidth="2">
          <animateMotion dur="5s" repeatCount="indefinite" path={route} keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear" />
        </circle>
      </svg>

      <div className={cn(chip, "left-[4%] top-[6%] w-[44%]")}>
        <div className="mb-[1.2cqw] text-[2.2cqw] text-ash">Rider</div>
        <div className="flex items-center gap-[1.6cqw]">
          <span className="h-[1.8cqw] w-[1.8cqw] rounded-full bg-bone" />
          <span className="h-[1.1cqw] w-[60%] rounded-full bg-bone/30" />
        </div>
        <div className="mt-[1.4cqw] flex items-center gap-[1.6cqw]">
          <span className="h-[1.8cqw] w-[1.8cqw] rounded-[0.4cqw] bg-ember" />
          <span className="h-[1.1cqw] w-[44%] rounded-full bg-bone/30" />
        </div>
      </div>

      <div className={cn(chip, "bottom-[6%] right-[4%] flex items-center gap-[2cqw]")}>
        <span className="text-ember">Fare engine</span>
        <span className="flex gap-[0.8cqw]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-[1.6cqw] w-[1.6cqw] rounded-full bg-ember"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </span>
      </div>

      {!compact && (
        <div className={cn(chip, "bottom-[6%] left-[4%] flex items-center gap-[2cqw]")}>
          <span className="h-[1.8cqw] w-[1.8cqw] rounded-full bg-ember" />
          Driver · en route
        </div>
      )}
    </Stage>
  );
}

/* ═══════════════════════════ SKYPAINTS — before / after house ═══════════════════════════ */

const PALETTE = [
  { name: "Terracotta", hex: "#c65d3b" },
  { name: "Sage", hex: "#8da384" },
  { name: "Ochre", hex: "#d6a23f" },
  { name: "Deep teal", hex: "#2c5f60" },
  { name: "Clay rose", hex: "#c98f84" },
];

function House({ wall, roof = "#3a3a35", trim = "#f2efe8" }: { wall: string; roof?: string; trim?: string }) {
  return (
    <g>
      <rect x="248" y="78" width="20" height="46" fill={roof} />
      <motion.rect x="100" y="128" width="200" height="118" fill={wall} initial={false} animate={{ fill: wall }} transition={{ duration: 0.7 }} />
      <polygon points="84,132 200,62 316,132" fill={roof} />
      <rect x="100" y="238" width="200" height="8" fill="rgba(0,0,0,0.16)" />
      <rect x="182" y="176" width="36" height="62" rx="2" fill={trim} />
      <circle cx="211" cy="208" r="2" fill="#3a3a35" />
      {[124, 236].map((x) => (
        <g key={x}>
          <rect x={x} y="156" width="42" height="38" fill={trim} />
          <rect x={x + 3} y="159" width="36" height="32" fill="#bcc7c9" opacity="0.85" />
          <path d={`M${x + 21} 159V191M${x + 3} 175H${x + 39}`} stroke={trim} strokeWidth="2" />
        </g>
      ))}
    </g>
  );
}

export function SkyVisual({ interactive, compact }: { interactive?: boolean; compact?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "100px" });
  const [split, setSplit] = useState(52);
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const drag = useRef(false);

  // gentle auto sweep until the visitor takes over
  useEffect(() => {
    if (!auto || !inView) return;
    let raf = 0;
    let t0 = performance.now();
    let lastSet = 0;
    const loop = (t: number) => {
      if (t - lastSet > 33) {
        lastSet = t;
        setSplit(50 + 36 * Math.sin((t - t0) / 1100));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [auto, inView]);

  // cycle color automatically until the visitor picks one
  useEffect(() => {
    if (!inView) return;
    if (interactive && !auto) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % PALETTE.length), 2600);
    return () => window.clearInterval(id);
  }, [inView, interactive, auto]);

  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setSplit(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  };

  const color = PALETTE[idx].hex;
  const sx = split * 4;

  return (
    <Stage className="bg-paper">
      <div
        ref={ref}
        className={cn("absolute inset-0", interactive ? "cursor-ew-resize touch-pan-y" : "")}
        onPointerDown={(e) => {
          if (!interactive) return;
          drag.current = true;
          setAuto(false);
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => {
          if (!interactive) return;
          if (drag.current || e.pointerType === "mouse") {
            setAuto(false);
            move(e.clientX);
          }
        }}
        onPointerUp={() => (drag.current = false)}
      >
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id={`sky${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f3eee2" />
              <stop offset="1" stopColor="#ddd5c2" />
            </linearGradient>
            <clipPath id={`clip${uid}`}>
              <rect x="0" y="0" width={sx} height="300" />
            </clipPath>
          </defs>
          <rect width="400" height="300" fill={`url(#sky${uid})`} />
          <circle cx="330" cy="62" r="22" fill="#ff4b24" opacity="0.9" />
          <rect y="246" width="400" height="60" fill="#b9b19b" />
          <rect y="246" width="400" height="3" fill="rgba(0,0,0,0.12)" />

          {/* AFTER (full) */}
          <House wall={color} />
          {/* BEFORE (left of the divider) */}
          <g clipPath={`url(#clip${uid})`}>
            <rect width="400" height="300" fill={`url(#sky${uid})`} />
            <circle cx="330" cy="62" r="22" fill="#ff4b24" opacity="0.9" />
            <rect y="246" width="400" height="60" fill="#b9b19b" />
            <House wall="#e6e1d4" />
            <rect width="400" height="300" fill="rgba(11,11,10,0.04)" />
          </g>

          {/* divider */}
          <line x1={sx} y1="0" x2={sx} y2="300" stroke="#0b0b0a" strokeWidth="1.5" />
          <g transform={`translate(${sx} 150)`}>
            <circle r="13" fill="#0b0b0a" />
            <path d="M-4 -4 L-8 0 L-4 4 M4 -4 L8 0 L4 4" stroke="#f2efe8" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <text x="12" y="20" fontSize="8" fontFamily={MONO} letterSpacing="1.6" fill="#0b0b0a" opacity={split > 14 ? 0.8 : 0}>
            BEFORE
          </text>
          <text x="388" y="20" fontSize="8" fontFamily={MONO} letterSpacing="1.6" fill="#0b0b0a" textAnchor="end" opacity={split < 86 ? 0.8 : 0}>
            AFTER
          </text>
        </svg>
      </div>

      {/* swatches */}
      {!compact && (
        <div className="absolute bottom-[3%] left-1/2 flex -translate-x-1/2 items-center gap-[1.6cqw] rounded-full bg-ink/85 px-[2.4cqw] py-[1.6cqw] backdrop-blur">
          {PALETTE.map((p, i) => (
            <button
              key={p.name}
              aria-label={`Preview ${p.name}`}
              onClick={(e) => {
                e.stopPropagation();
                setAuto(false);
                setIdx(i);
              }}
              className={cn(
                "h-[4.2cqw] w-[4.2cqw] min-h-5 min-w-5 rounded-full border-2 transition-transform duration-200 hover:scale-110",
                i === idx ? "border-bone" : "border-transparent",
              )}
              style={{ background: p.hex }}
            />
          ))}
        </div>
      )}
      <div className="eyebrow absolute right-[3%] top-[3%] hidden rounded-full bg-ink/85 px-3 py-1.5 text-[9px] text-bone/80 sm:block" style={{ opacity: interactive ? 1 : 0 }}>
        {PALETTE[idx].name}
      </div>
    </Stage>
  );
}

/* ═══════════════════════════ YANCY GRAPHICS — creative assets ═══════════════════════════ */

function Layer({
  mx,
  my,
  depth,
  className,
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className?: string;
  children: ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

export function YancyVisual() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 16 });
  const sy = useSpring(my, { stiffness: 70, damping: 16 });
  const words = ["BRAND", "MOTION", "AI", "DESIGN", "TECHNOLOGY"];

  return (
    <Stage className="bg-ember">
      <div
        className="absolute inset-0"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
          my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
      >
        {/* marquee */}
        <div className="absolute inset-x-0 top-[34%] overflow-hidden text-ink">
          <div className="flex w-max animate-marquee whitespace-nowrap font-medium uppercase" style={{ fontSize: "19cqw", letterSpacing: "-0.05em", lineHeight: 1 }}>
            {[0, 1].map((k) => (
              <span key={k} className="flex items-center">
                {words.map((w) => (
                  <span key={w + k} className="flex items-center">
                    <span className={w === "AI" || w === "DESIGN" ? "serif-accent normal-case" : ""}>{w}</span>
                    <span className="mx-[3cqw] inline-block text-[10cqw]">✱</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <Layer mx={sx} my={sy} depth={-16} className="absolute left-[7%] top-[7%] w-[30%]">
          <motion.div animate={{ y: [0, -8, 0], rotate: [-8, -5, -8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="aspect-[3/4] rounded-[1.2cqw] bg-bone p-[2.4cqw] shadow-[0_2cqw_5cqw_-1cqw_rgba(0,0,0,0.35)]">
            <div className="h-[55%] rounded-full bg-ember" />
            <div className="mt-[3cqw] h-[1.4cqw] w-3/4 rounded-full bg-ink" />
            <div className="mt-[1.4cqw] h-[1.4cqw] w-1/2 rounded-full bg-ink/40" />
          </motion.div>
        </Layer>

        <Layer mx={sx} my={sy} depth={22} className="absolute right-[9%] top-[5%] w-[25%]">
          <motion.div animate={{ y: [0, 8, 0], rotate: [7, 4, 7] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="aspect-[3/4] rounded-[1.2cqw] bg-ink p-[2cqw] shadow-[0_2cqw_5cqw_-1cqw_rgba(0,0,0,0.5)]">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {[40, 30, 20, 10].map((r) => (
                <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#f2efe8" strokeWidth="1.5" opacity={0.25 + (40 - r) / 50} />
              ))}
              <circle cx="50" cy="50" r="4" fill="#ff4b24" />
            </svg>
          </motion.div>
        </Layer>

        <Layer mx={sx} my={sy} depth={14} className="absolute bottom-[9%] right-[7%] w-[46%]">
          <div className="aspect-video overflow-hidden rounded-[1.2cqw] bg-bone shadow-[0_2cqw_5cqw_-1cqw_rgba(0,0,0,0.4)]">
            <div className="relative flex h-[84%] items-center justify-center bg-gradient-to-br from-graphite to-ink">
              <motion.div className="absolute h-[46%] w-[46%] rounded-full border border-bone/30" animate={{ scale: [0.8, 1.4], opacity: [0.7, 0] }} transition={{ duration: 2.2, repeat: Infinity }} />
              <div className="flex h-[12cqw] w-[12cqw] items-center justify-center rounded-full bg-ember">
                <span className="ml-[0.8cqw] block h-0 w-0 border-y-[2.2cqw] border-l-[3.4cqw] border-y-transparent border-l-ink" />
              </div>
            </div>
            <div className="mx-[2cqw] mt-[1.2cqw] h-[1cqw] overflow-hidden rounded-full bg-ink/15">
              <motion.div className="h-full bg-ember" animate={{ width: ["0%", "100%"] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
            </div>
          </div>
          <div className="eyebrow mt-[1.6cqw] text-[2.2cqw] text-ink">AI marketing video</div>
        </Layer>

        <Layer mx={sx} my={sy} depth={-26} className="absolute bottom-[10%] left-[10%] w-[20%]">
          <motion.div animate={{ rotate: [4, -4, 4] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="flex aspect-square items-center justify-center rounded-[1.2cqw] bg-bone shadow-[0_2cqw_5cqw_-1cqw_rgba(0,0,0,0.35)]">
            <span className="serif-accent text-ink" style={{ fontSize: "10cqw", lineHeight: 1 }}>Aa</span>
          </motion.div>
        </Layer>

        <motion.div className="absolute left-[45%] top-[12%] text-ink" style={{ fontSize: "12cqw", lineHeight: 1 }} animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
          ✱
        </motion.div>
      </div>
    </Stage>
  );
}

/* ═══════════════════════════ SIAYA — community network web experience ═══════════════════════════ */

const NET: [number, number][] = [
  [30, 40], [80, 22], [130, 52], [190, 28], [250, 48], [300, 24], [352, 50],
  [52, 96], [112, 110], [172, 88], [232, 112], [292, 92], [346, 108], [200, 62],
];
const NET_LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [0, 7], [2, 8], [3, 9], [4, 10], [5, 11], [6, 12], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [13, 3], [13, 9], [13, 2], [13, 4],
];

export function SiayaVisual({ compact }: { compact?: boolean }) {
  return (
    <Stage className="bg-[#171715]">
      <div className="bg-blueprint absolute inset-0 opacity-50" />
      <div className="absolute inset-x-[7%] bottom-0 top-[9%] overflow-hidden rounded-t-md border border-bone/15 bg-ink shadow-2xl">
        {/* browser chrome */}
        <div className="flex items-center gap-[1.4cqw] border-b border-bone/10 px-[2.4cqw] py-[1.8cqw]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[1.6cqw] w-[1.6cqw] rounded-full bg-bone/20" />
          ))}
          <span className="ml-[2cqw] h-[2.4cqw] flex-1 rounded-full bg-bone/8" />
        </div>
        {/* hero with network */}
        <div className="relative h-[46%] overflow-hidden border-b border-bone/10">
          <svg viewBox="0 0 380 130" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
            {NET_LINKS.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={NET[a][0]}
                y1={NET[a][1]}
                x2={NET[b][0]}
                y2={NET[b][1]}
                stroke="rgba(242,239,232,0.22)"
                strokeWidth="0.8"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.15, 0.6, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, delay: (i % 7) * 0.4 }}
              />
            ))}
            {NET.map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={i === 13 ? 5 : 3}
                fill={i === 13 || i % 5 === 0 ? "#ff4b24" : "#f2efe8"}
                animate={{ r: [i === 13 ? 5 : 3, i === 13 ? 7 : 4.2, i === 13 ? 5 : 3] }}
                transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.25 }}
              />
            ))}
          </svg>
          <div className="absolute inset-x-[5%] bottom-[10%]">
            <div className="h-[3cqw] w-[48%] rounded-full bg-bone" />
            <div className="mt-[1.6cqw] h-[3cqw] w-[34%] rounded-full bg-bone/70" />
            <div className="mt-[2.4cqw] h-[4.4cqw] w-[16%] rounded-full bg-ember" />
          </div>
        </div>
        {/* sections */}
        <div className="grid grid-cols-3 gap-[2cqw] p-[3cqw]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="rounded-[0.8cqw] border border-bone/10 bg-bone/[0.04] p-[2cqw]"
              animate={{ borderColor: ["rgba(242,239,232,0.1)", "rgba(255,75,36,0.5)", "rgba(242,239,232,0.1)"] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
            >
              <div className="h-[5cqw] w-[5cqw] rounded-full bg-bone/20" />
              <div className="mt-[2cqw] h-[1.2cqw] w-full rounded-full bg-bone/30" />
              <div className="mt-[1cqw] h-[1.2cqw] w-2/3 rounded-full bg-bone/15" />
            </motion.div>
          ))}
        </div>
        {!compact && <div className="mx-[3cqw] h-[1.4cqw] w-1/2 rounded-full bg-bone/15" />}
      </div>
    </Stage>
  );
}

/* ═══════════════════════════ ARCHWAYS — research / data ═══════════════════════════ */

export function ArchwaysVisual({ compact }: { compact?: boolean }) {
  const bars = [32, 48, 40, 62, 55, 74, 66, 88, 80];
  const dots: [number, number][] = [[70, 190], [96, 160], [128, 176], [150, 130], [182, 148], [214, 112], [240, 134], [268, 96], [296, 118], [322, 80]];
  return (
    <Stage className="bg-paper text-ink">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`g${i}`} x1="30" x2="370" y1={40 + i * 24} y2={40 + i * 24} stroke="rgba(11,11,10,0.08)" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`v${i}`} y1="40" y2="232" x1={30 + i * 37.7} x2={30 + i * 37.7} stroke="rgba(11,11,10,0.06)" />
        ))}
        <line x1="30" x2="370" y1="232" y2="232" stroke="#0b0b0a" strokeWidth="1.2" />
        <line x1="30" x2="30" y1="40" y2="232" stroke="#0b0b0a" strokeWidth="1.2" />

        {bars.map((h, i) => (
          <motion.rect
            key={i}
            x={44 + i * 36}
            width="16"
            rx="1"
            fill="rgba(11,11,10,0.14)"
            style={{ originY: 1, transformBox: "fill-box" }}
            y={232 - h * 0.9}
            height={h * 0.9}
            animate={{ scaleY: [0.6, 1, 0.6] }}
            transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
          />
        ))}

        <motion.path
          d="M30 200 C 80 190, 110 215, 150 160 S 220 120, 260 138 S 330 76, 370 62"
          fill="none"
          stroke="#0b0b0a"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 9, times: [0, 0.4, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M30 224 C 90 210, 130 226, 180 190 S 260 170, 310 130 S 350 110, 370 100"
          fill="none"
          stroke="#ff4b24"
          strokeWidth="1.6"
          strokeDasharray="3 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 9, times: [0.1, 0.5, 0.9, 1], repeat: Infinity, ease: "easeInOut" }}
        />
        {dots.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r="3"
            fill={i % 3 === 0 ? "#ff4b24" : "#0b0b0a"}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.4] }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            transition={{ duration: 6, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        <text x="30" y="26" fontSize="8" fontFamily={MONO} letterSpacing="1.6" fill="#0b0b0a" opacity="0.7">
          FIG. 01 — RESEARCH
        </text>
        <text x="370" y="26" fontSize="8" fontFamily={MONO} letterSpacing="1.6" fill="#0b0b0a" opacity="0.45" textAnchor="end">
          ARCHWAYS
        </text>
        {!compact &&
          [0, 1, 2, 3].map((i) => <rect key={i} x="30" y={252 + i * 9} width={[210, 170, 190, 120][i]} height="3" rx="1.5" fill="rgba(11,11,10,0.18)" />)}
        {!compact && <rect x="300" y="248" width="70" height="30" rx="2" fill="none" stroke="rgba(11,11,10,0.35)" />}
        {!compact && <path d="M310 270 L322 258 L334 266 L346 254 L360 262" fill="none" stroke="#ff4b24" strokeWidth="1.5" />}
      </svg>
    </Stage>
  );
}

/* ═══════════════════════════ AZMA YETU — organizational platform ═══════════════════════════ */

export function AzmaVisual() {
  return (
    <Stage className="bg-graphite-2">
      <div className="bg-blueprint absolute inset-0 opacity-40" />

      {/* desktop panel behind */}
      <div className="absolute right-[5%] top-[12%] h-[62%] w-[56%] overflow-hidden rounded-md border border-bone/15 bg-ink">
        <div className="flex h-full">
          <div className="w-[22%] space-y-[2cqw] border-r border-bone/10 p-[2cqw]">
            <div className="h-[3cqw] w-[3cqw] rounded-full bg-ember" />
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={cn("h-[1.4cqw] rounded-full", i === 1 ? "bg-bone/70" : "bg-bone/20")} style={{ width: `${70 - i * 6}%` }} />
            ))}
          </div>
          <div className="flex-1 space-y-[2cqw] p-[2.4cqw]">
            <div className="h-[2.4cqw] w-1/2 rounded-full bg-bone/60" />
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="flex items-center gap-[2cqw] rounded-[0.8cqw] border border-bone/10 p-[1.6cqw]"
                animate={{ backgroundColor: ["rgba(242,239,232,0)", "rgba(242,239,232,0.06)", "rgba(242,239,232,0)"] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 1.2 }}
              >
                <span className="h-[3.4cqw] w-[3.4cqw] rounded-[0.6cqw] bg-bone/20" />
                <span className="flex-1 space-y-[1cqw]">
                  <span className="block h-[1.2cqw] w-3/4 rounded-full bg-bone/30" />
                  <span className="block h-[1.2cqw] w-1/2 rounded-full bg-bone/15" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* phone in front */}
      <motion.div
        className="absolute bottom-[6%] left-[10%] h-[82%] w-[31%] overflow-hidden rounded-[3.4cqw] border-[0.8cqw] border-bone/80 bg-ink shadow-[0_3cqw_8cqw_-2cqw_rgba(0,0,0,0.7)]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div className="p-[2cqw]" animate={{ y: ["0%", "-22%", "0%"] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}>
          <div className="flex items-center justify-between">
            <span className="h-[3cqw] w-[3cqw] rounded-full bg-ember" />
            <span className="flex flex-col gap-[0.6cqw]">
              <span className="h-[0.4cqw] w-[3cqw] bg-bone/70" />
              <span className="h-[0.4cqw] w-[3cqw] bg-bone/70" />
            </span>
          </div>
          <div className="mt-[3cqw] rounded-[1cqw] bg-gradient-to-br from-ember/80 to-ember-deep/60 p-[2cqw]">
            <div className="h-[1.8cqw] w-4/5 rounded-full bg-ink" />
            <div className="mt-[1cqw] h-[1.8cqw] w-3/5 rounded-full bg-ink/70" />
          </div>
          <div className="mt-[2.4cqw] grid grid-cols-2 gap-[1.6cqw]">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-[0.8cqw] border border-bone/12 p-[1.6cqw]">
                <div className="h-[3cqw] w-[3cqw] rounded-full bg-bone/25" />
                <div className="mt-[1.2cqw] h-[1cqw] w-full rounded-full bg-bone/30" />
                <div className="mt-[0.8cqw] h-[1cqw] w-2/3 rounded-full bg-bone/15" />
              </div>
            ))}
          </div>
          <div className="mt-[2.4cqw] h-[4.4cqw] rounded-full bg-bone" />
          <div className="mt-[2.4cqw] space-y-[1cqw]">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[1cqw] rounded-full bg-bone/15" style={{ width: `${95 - i * 12}%` }} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Stage>
  );
}
