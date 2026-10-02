import { motion } from "motion/react";
import { whyBespoke } from "../data/company";
import { Eyebrow, Reveal } from "./ui";

const RECT = "M12 14 L70 14 L128 14 L128 86 L70 86 L12 86 Z";
const FIT = "M12 34 L58 8 L128 24 L112 86 L62 70 L12 86 Z";

/** 01 — a rigid template vs. a workflow that is its own shape */
function UniqueVisual() {
  return (
    <svg viewBox="0 0 140 100" className="h-full w-full">
      <path d={RECT} fill="none" stroke="rgba(242,239,232,0.3)" strokeDasharray="3 4" />
      <motion.path
        d={RECT}
        fill="rgba(255,75,36,0.1)"
        stroke="#ff4b24"
        strokeWidth="1.6"
        animate={{ d: [RECT, FIT, FIT, RECT] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.75, 1] }}
      />
      <text x="12" y="98" fontSize="6" fontFamily="'Geist Mono', monospace" fill="#8d8a80" letterSpacing="1">
        RIGID SYSTEM → YOUR WORKFLOW
      </text>
    </svg>
  );
}

/** 02 — isolated systems become connected */
function ConnectVisual() {
  const nodes: [number, number, string][] = [
    [24, 26, "CRM"],
    [116, 26, "WEB"],
    [24, 72, "PAY"],
    [116, 72, "BI"],
  ];
  const links: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3], [0, 3], [1, 2]];
  return (
    <svg viewBox="0 0 140 100" className="h-full w-full">
      {links.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#ff4b24"
          strokeWidth="1.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.35, 0.8, 1], delay: i * 0.18 }}
        />
      ))}
      {nodes.map(([x, y, l]) => (
        <g key={l}>
          <circle cx={x} cy={y} r="11" fill="#11110f" stroke="rgba(242,239,232,0.6)" />
          <text x={x} y={y + 2.5} fontSize="6" textAnchor="middle" fontFamily="'Geist Mono', monospace" fill="#f2efe8">
            {l}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** 03 — a system that grows instead of being rebuilt */
function EvolveVisual() {
  return (
    <svg viewBox="0 0 140 100" className="h-full w-full">
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={14 + i * 8}
          y={78 - i * 17}
          width={112 - i * 16}
          height={13}
          rx={2}
          fill={i === 3 ? "rgba(255,75,36,0.2)" : "rgba(242,239,232,0.06)"}
          stroke={i === 3 ? "#ff4b24" : "rgba(242,239,232,0.4)"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 1, 1, 1, 0], y: [10, 0, 0, 0, 0] }}
          transition={{ duration: 7, repeat: Infinity, times: [0, 0.12, 0.7, 0.92, 1], delay: i * 0.7 }}
        />
      ))}
      <text x="14" y="98" fontSize="6" fontFamily="'Geist Mono', monospace" fill="#8d8a80" letterSpacing="1">
        EACH LAYER BUILDS ON THE LAST
      </text>
    </svg>
  );
}

const VISUALS = [UniqueVisual, ConnectVisual, EvolveVisual];

export default function WhyBespoke() {
  return (
    <section id="why-bespoke" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 md:mb-20">
          <Eyebrow index="05">Why bespoke?</Eyebrow>
          <Reveal>
            <h2 className="display mt-6 max-w-5xl text-[clamp(2.2rem,5.6vw,5.4rem)]">
              Software should fit the business,
              <br />
              <span className="serif-accent text-ember">not the other way round.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid border-y border-bone/12 md:grid-cols-3 md:divide-x md:divide-bone/12">
          {whyBespoke.map((w, i) => {
            const V = VISUALS[i];
            return (
              <Reveal key={w.title} delay={i * 0.1}>
                <div className="group flex h-full flex-col border-b border-bone/12 p-8 last:border-b-0 md:border-b-0 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="display text-6xl text-bone/15 transition-colors duration-500 group-hover:text-ember md:text-7xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="my-8 aspect-[7/5] w-full max-w-[300px]">
                    <V />
                  </div>
                  <h3 className="display text-2xl leading-[1] md:text-[1.7rem]">{w.title}</h3>
                  <p className="mt-4 max-w-sm leading-relaxed text-bone/65">{w.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
