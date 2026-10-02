import { useState } from "react";
import { motion } from "motion/react";
import { getProject } from "../data/projects";
import { cn } from "../utils/cn";
import { useUI } from "../context/UIContext";
import { ArchitectureFlow } from "./ArchitectureFlow";
import { Eyebrow, MagneticButton, Reveal, TypeTag } from "./ui";

const ROWS = [
  { word: "Brand", note: "Branding · Graphics", style: "solid" },
  { word: "Motion", note: "Animation · Advertising", style: "outline" },
  { word: "AI", note: "AI marketing video · Digital content", style: "serif" },
  { word: "Design", note: "Interfaces · Layout · Visual systems", style: "solid" },
  { word: "Technology", note: "Platforms · Integrations · Engineering", style: "outline" },
] as const;

export default function CreativeTech() {
  const { openProject } = useUI();
  const [hover, setHover] = useState<number | null>(null);
  const yancy = getProject("yancy-graphics")!;

  return (
    <section id="creative" className="relative overflow-hidden bg-ember px-6 py-28 text-ink md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <div>
            <Eyebrow index="07" tone="light" className="text-ink/70">
              Creative technology
            </Eyebrow>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(2.2rem,5.6vw,5.4rem)]">
                Engineering and
                <br />
                <span className="serif-accent">creativity, coexisting.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-lg leading-snug text-ink/80">
              Brand, motion, AI, design and technology are not separate departments. They are one build.
            </p>
          </Reveal>
        </div>

        <div className="border-b border-ink/25">
          {ROWS.map((r, i) => (
            <motion.div
              key={r.word}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              onClick={() => setHover(hover === i ? null : i)}
              className={cn(
                "group relative flex cursor-default items-center justify-between gap-6 overflow-hidden border-t border-ink/25 px-1 py-2 transition-colors duration-500 md:py-3",
                hover === i ? "bg-ink text-ember" : "text-ink",
              )}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex items-center gap-4 md:gap-8">
                <span className="eyebrow w-6 shrink-0 opacity-60 md:w-8">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={cn(
                    "display text-[clamp(2.4rem,10.5vw,10rem)] leading-[0.95] transition-transform duration-500",
                    r.style === "outline" && "outline-text",
                    r.style === "serif" && "serif-accent uppercase-none normal-case",
                    hover === i && "translate-x-3",
                  )}
                  style={r.style === "outline" && hover === i ? { WebkitTextStroke: "1px #ff4b24", color: "transparent" } : undefined}
                >
                  {r.word}
                </span>
              </span>
              <span className="flex items-center gap-5">
                <span className={cn("eyebrow hidden max-w-[220px] text-right transition-opacity duration-500 md:block", hover === i ? "opacity-100" : "opacity-0")}>
                  {r.note}
                </span>
                <motion.span
                  className="text-3xl md:text-5xl"
                  animate={{ rotate: hover === i ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  ✱
                </motion.span>
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div>
              <TypeTag type="client" tone="light" className="border-ink/40 text-ink" />
              <h3 className="display mt-5 text-3xl md:text-4xl">Yancy Graphics</h3>
              <p className="mt-4 max-w-md text-lg leading-snug text-ink/80">{yancy.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {yancy.highlights.map((h) => (
                  <span key={h} className="rounded-full border border-ink/35 px-3 py-1.5 text-[13px]">
                    {h}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <MagneticButton variant="dark" onClick={() => openProject(yancy.slug)}>
                  Open the case study
                </MagneticButton>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="rounded-md bg-ink/[0.06] p-6 md:p-8">
              <div className="eyebrow mb-6 text-ink/70">{yancy.architecture?.title}</div>
              <ArchitectureFlow nodes={yancy.architecture?.nodes ?? []} tone="light" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
