import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { bespokeSteps } from "../data/company";
import { cn } from "../utils/cn";
import { Eyebrow } from "./ui";

const MONO = '"Geist Mono", ui-monospace, monospace';

/* tangled "business need" cluster */
const PTS: [number, number][] = [
  [40, 250], [112, 228], [158, 292], [68, 322], [124, 352], [44, 392], [152, 410], [96, 286], [24, 320],
];
const LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 3], [1, 4], [2, 5], [4, 6], [5, 3], [7, 0], [7, 4], [7, 2], [8, 0], [8, 5], [6, 2],
];
const TAGS: { i: number; text: string; dx: number; dy: number }[] = [
  { i: 1, text: "WORKFLOWS", dx: -18, dy: -12 },
  { i: 4, text: "PEOPLE", dx: 10, dy: 20 },
  { i: 2, text: "SYSTEMS", dx: 8, dy: -10 },
  { i: 5, text: "DATA", dx: -4, dy: 22 },
];

const INTERFACES = [
  { x: 215, label: "WEB" },
  { x: 305, label: "MOBILE" },
  { x: 395, label: "DASHBOARD" },
];
const MODULES = [
  { x: 227, label: "LOGIC" },
  { x: 311, label: "USERS" },
  { x: 395, label: "WORKFLOW" },
];
const EXTERNAL = [
  { y: 130, label: "CRM" },
  { y: 215, label: "PAYMENTS" },
  { y: 300, label: "ANALYTICS" },
];

function Label({ x, y, children, fill = "#8d8a80", anchor = "start", size = 9 }: { x: number; y: number; children: React.ReactNode; fill?: string; anchor?: "start" | "middle" | "end"; size?: number }) {
  return (
    <text x={x} y={y} fill={fill} fontSize={size} fontFamily={MONO} letterSpacing="1.2" textAnchor={anchor} style={{ textTransform: "uppercase" }}>
      {children}
    </text>
  );
}

function System({ s }: { s: number }) {
  const dashed = (solid: boolean) => (solid ? undefined : "4 4");
  const stroke = (solid: boolean) => (solid ? "rgba(242,239,232,0.55)" : "rgba(141,138,128,0.7)");
  const fill = (solid: boolean) => (solid ? "#1a1a18" : "rgba(26,26,24,0)");

  return (
    <svg viewBox="0 0 640 520" className="h-full w-full" role="img" aria-label="A business problem progressively becoming a technology system">
      <defs>
        <pattern id="bp-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="rgba(242,239,232,0.05)" />
        </pattern>
      </defs>
      <rect width="640" height="520" fill="url(#bp-grid)" />

      {/* 0 — BUSINESS NEED */}
      <motion.g initial={false} animate={{ opacity: s === 0 ? 1 : s === 1 ? 0.95 : 0.28 }} transition={{ duration: 0.6 }}>
        {LINKS.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={PTS[a][0]}
            y1={PTS[a][1]}
            x2={PTS[b][0]}
            y2={PTS[b][1]}
            stroke="rgba(242,239,232,0.35)"
            strokeWidth="1"
            initial={false}
            animate={{ pathLength: 1, opacity: s >= 0 ? 1 : 0 }}
            transition={{ delay: i * 0.04, duration: 0.6 }}
          />
        ))}
        {PTS.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={s >= 2 ? 3 : 4.5}
            fill={s >= 1 ? "#ff4b24" : "#f2efe8"}
            animate={s === 0 ? { cx: [x, x + 4, x - 3, x], cy: [y, y - 4, y + 3, y] } : { cx: x, cy: y }}
            transition={{ duration: 3 + i * 0.3, repeat: s === 0 ? Infinity : 0, ease: "easeInOut" }}
          />
        ))}
        <Label x={24} y={216} fill="#f2efe8">
          Business need
        </Label>
      </motion.g>

      {/* 1 — DISCOVERY tags + scan */}
      <motion.g initial={false} animate={{ opacity: s >= 1 && s < 3 ? 1 : 0 }} transition={{ duration: 0.5 }}>
        {TAGS.map((t) => (
          <Label key={t.text} x={PTS[t.i][0] + t.dx} y={PTS[t.i][1] + t.dy} fill="#ff4b24">
            {t.text}
          </Label>
        ))}
        {s === 1 && (
          <motion.rect
            x={16}
            width={170}
            height={1.5}
            fill="#ff4b24"
            animate={{ y: [220, 420, 220] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.g>

      {/* 2 — ARCHITECTURE (dashed blueprint) → solid as built */}
      <motion.g initial={false} animate={{ opacity: s >= 2 ? 1 : 0 }} transition={{ duration: 0.6 }}>
        {/* interface layer */}
        {INTERFACES.map((b) => (
          <g key={b.label}>
            <motion.rect x={b.x} y={40} width={80} height={60} rx={4} strokeDasharray={dashed(s >= 3)} animate={{ fill: fill(s >= 3), stroke: stroke(s >= 3) }} strokeWidth={1} />
            <Label x={b.x + 40} y={92} anchor="middle" fill={s >= 3 ? "#f2efe8" : "#8d8a80"} size={8}>
              {b.label}
            </Label>
            {/* 3 — DESIGN wireframe */}
            <motion.g initial={false} animate={{ opacity: s >= 3 ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <rect x={b.x + 8} y={48} width={64} height={5} rx={1} fill="rgba(242,239,232,0.35)" />
              <rect x={b.x + 8} y={58} width={28} height={16} rx={1} fill="rgba(242,239,232,0.15)" />
              <rect x={b.x + 40} y={58} width={32} height={7} rx={1} fill="rgba(242,239,232,0.15)" />
              <rect x={b.x + 40} y={68} width={20} height={6} rx={1} fill="#ff4b24" opacity="0.8" />
            </motion.g>
          </g>
        ))}
        <Label x={215} y={32} fill="#8d8a80" size={8}>
          Interface layer
        </Label>

        {/* core platform */}
        <motion.rect x={215} y={150} width={260} height={205} rx={6} strokeDasharray={dashed(s >= 4)} animate={{ fill: fill(s >= 4), stroke: stroke(s >= 4) }} strokeWidth={1} />
        <Label x={227} y={170} fill={s >= 4 ? "#f2efe8" : "#8d8a80"}>
          August platform
        </Label>
        {MODULES.map((m) => (
          <g key={m.label}>
            <motion.rect x={m.x} y={185} width={74} height={88} rx={3} strokeDasharray={dashed(s >= 4)} animate={{ fill: s >= 4 ? "#262623" : "rgba(38,38,35,0)", stroke: stroke(s >= 4) }} strokeWidth={1} />
            <motion.rect x={m.x} y={185} width={74} height={2.5} fill="#ff4b24" initial={false} animate={{ opacity: s >= 4 ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.15 }} />
            <Label x={m.x + 37} y={232} anchor="middle" fill={s >= 4 ? "#f2efe8" : "#8d8a80"} size={8}>
              {m.label}
            </Label>
          </g>
        ))}
        <motion.rect x={227} y={284} width={236} height={22} rx={3} strokeDasharray={dashed(s >= 4)} animate={{ fill: s >= 4 ? "#262623" : "rgba(38,38,35,0)", stroke: stroke(s >= 4) }} strokeWidth={1} />
        <Label x={345} y={299} anchor="middle" fill={s >= 4 ? "#f2efe8" : "#8d8a80"} size={8}>
          API layer
        </Label>
        {/* 7 — EVOLUTION new module */}
        <motion.g initial={false} animate={{ opacity: s >= 7 ? 1 : 0, y: s >= 7 ? 0 : 10 }} transition={{ duration: 0.7 }}>
          <rect x={227} y={316} width={236} height={28} rx={3} fill="rgba(255,75,36,0.12)" stroke="#ff4b24" strokeDasharray="4 3" />
          <Label x={345} y={334} anchor="middle" fill="#ff4b24" size={8}>
            + New module
          </Label>
        </motion.g>

        {/* database */}
        <motion.rect x={215} y={400} width={260} height={64} rx={6} strokeDasharray={dashed(s >= 4)} animate={{ fill: fill(s >= 4), stroke: stroke(s >= 4) }} strokeWidth={1} />
        {[0, 1, 2].map((i) => (
          <motion.line key={i} x1={235} x2={455} y1={420 + i * 12} y2={420 + i * 12} stroke="rgba(242,239,232,0.18)" initial={false} animate={{ opacity: s >= 4 ? 1 : 0 }} />
        ))}
        <Label x={227} y={416} fill={s >= 4 ? "#f2efe8" : "#8d8a80"}>
          Database
        </Label>

        {/* external systems */}
        {EXTERNAL.map((e) => (
          <g key={e.label}>
            <motion.rect x={520} y={e.y} width={110} height={55} rx={4} strokeDasharray={dashed(s >= 5)} animate={{ fill: fill(s >= 5), stroke: stroke(s >= 5) }} strokeWidth={1} />
            <Label x={575} y={e.y + 32} anchor="middle" fill={s >= 5 ? "#f2efe8" : "#8d8a80"} size={9}>
              {e.label}
            </Label>
          </g>
        ))}
        <Label x={520} y={118} fill="#8d8a80" size={8}>
          Existing systems
        </Label>

        {/* 7 — AI */}
        <motion.g initial={false} animate={{ opacity: s >= 7 ? 1 : 0, x: s >= 7 ? 0 : 16 }} transition={{ duration: 0.7 }}>
          <rect x={520} y={395} width={110} height={55} rx={4} fill="rgba(255,75,36,0.12)" stroke="#ff4b24" />
          <Label x={575} y={427} anchor="middle" fill="#ff4b24" size={9}>
            AI
          </Label>
        </motion.g>
      </motion.g>

      {/* 4 — ENGINEERING connectors (interface ↔ platform ↔ db) */}
      <g stroke="rgba(242,239,232,0.5)" strokeWidth="1.2" fill="none">
        {[255, 345, 435].map((x, i) => (
          <motion.line key={x} x1={x} y1={100} x2={x} y2={150} initial={false} animate={{ pathLength: s >= 4 ? 1 : 0, opacity: s >= 4 ? 1 : 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} />
        ))}
        {[300, 390].map((x, i) => (
          <motion.line key={x} x1={x} y1={355} x2={x} y2={400} initial={false} animate={{ pathLength: s >= 4 ? 1 : 0, opacity: s >= 4 ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }} />
        ))}
      </g>

      {/* 5 — INTEGRATIONS */}
      <g stroke="#ff4b24" strokeWidth="1.4" fill="none">
        {EXTERNAL.map((e, i) => (
          <motion.line key={e.label} x1={475} y1={e.y + 27} x2={520} y2={e.y + 27} initial={false} animate={{ pathLength: s >= 5 ? 1 : 0, opacity: s >= 5 ? 1 : 0 }} transition={{ duration: 0.6, delay: i * 0.15 }} />
        ))}
        <motion.path d="M475 440 L520 422" initial={false} animate={{ pathLength: s >= 7 ? 1 : 0, opacity: s >= 7 ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.3 }} />
      </g>

      {/* 6 — DEPLOYMENT: live signal + badge */}
      {s >= 6 && (
        <g>
          {[
            "M255 100 L255 150",
            "M435 100 L435 150",
            "M300 355 L300 400",
            "M475 157 L520 157",
            "M475 242 L520 242",
            "M475 327 L520 327",
          ].map((d, i) => (
            <circle key={d} r="3" fill="#ff4b24">
              <animateMotion dur={`${1.6 + (i % 3) * 0.3}s`} repeatCount="indefinite" path={d} begin={`${i * 0.25}s`} />
            </circle>
          ))}
          {s >= 7 && (
            <circle r="3" fill="#ff4b24">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M475 440 L520 422" />
            </circle>
          )}
          <motion.g initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
            <rect x={520} y={44} width={66} height={22} rx={11} fill="rgba(255,75,36,0.14)" stroke="#ff4b24" />
            <circle cx={534} cy={55} r="3" fill="#ff4b24">
              <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <Label x={543} y={58} fill="#ff4b24" size={9}>
              Live
            </Label>
          </motion.g>
        </g>
      )}
    </svg>
  );
}

export default function BespokeBuild() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = bespokeSteps.length;
    setStep(Math.max(0, Math.min(n - 1, Math.floor(v * n * 0.999))));
  });

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + ((i + 0.5) / bespokeSteps.length) * total;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const current = bespokeSteps[step];

  return (
    <section ref={ref} id="bespoke" className="relative h-[560vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto grid w-full max-w-[1400px] gap-4 px-6 pb-4 pt-20 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:pt-16">
          <div className="flex flex-col justify-center">
            <Eyebrow index="02">Bespoke technology</Eyebrow>
            <h2 className="display mt-5 text-[clamp(1.9rem,4.8vw,4.6rem)]">
              Your business.
              <br />
              <span className="serif-accent text-ember">Your system.</span>
            </h2>
            <p className="mt-5 hidden max-w-md leading-relaxed text-bone/65 md:block">
              Off-the-shelf software rarely fits every business. We design technology around the way your
              organization actually works.
            </p>

            {/* desktop step list */}
            <ol className="mt-6 hidden grid-cols-2 gap-x-8 border-t border-bone/10 lg:grid">
              {bespokeSteps.map((b, i) => (
                <li key={b.name}>
                  <button
                    onClick={() => jump(i)}
                    className={cn(
                      "group flex w-full items-center gap-4 border-b border-bone/10 py-2.5 text-left transition-all duration-500",
                      i === step ? "text-bone" : i < step ? "text-bone/45" : "text-bone/25",
                    )}
                  >
                    <span className={cn("eyebrow w-6 text-[10px]", i === step && "text-ember")}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="display text-[13px] tracking-[0.08em]" style={{ letterSpacing: "0.1em", fontSize: 13 }}>
                      {b.name}
                    </span>
                    <span className="ml-auto h-px bg-ember transition-all duration-500" style={{ width: i === step ? 24 : 0 }} />
                  </button>
                </li>
              ))}
            </ol>

            {/* active step card */}
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-5 border-l-2 border-ember pl-4 lg:mt-6"
            >
              <div className="eyebrow text-ember">
                Stage {String(step + 1).padStart(2, "0")} / {String(bespokeSteps.length).padStart(2, "0")}
              </div>
              <div className="display mt-1.5 text-2xl md:text-3xl">{current.name}</div>
              <p className="mt-1.5 max-w-sm text-[15px] leading-snug text-bone/65">{current.line}</p>
            </motion.div>
          </div>

          <div className="relative min-h-0">
            <div className="relative mx-auto aspect-[640/520] max-h-[44svh] w-full lg:max-h-[74svh]">
              <System s={step} />
            </div>
            <div className="mt-3 h-px w-full bg-bone/10">
              <motion.div className="h-px origin-left bg-ember" style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
