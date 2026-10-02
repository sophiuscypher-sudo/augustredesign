import { motion } from "motion/react";
import { clientProjects } from "../data/projects";
import type { Project } from "../data/types";
import { cn } from "../utils/cn";
import { useUI } from "../context/UIContext";
import { Eyebrow, LazyMount, Reveal, TypeTag } from "./ui";
import { ProjectVisual } from "./visuals/ProjectVisual";

const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
];

function Card({ p, i }: { p: Project; i: number }) {
  const { openProject } = useUI();
  const interactiveVisual = p.visual === "skypaints";

  return (
    <Reveal delay={(i % 2) * 0.1} className={cn("md:col-span-1", SPANS[i])}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group flex h-full flex-col overflow-hidden rounded-md border border-bone/12 bg-graphite transition-colors duration-500 hover:border-bone/30"
      >
        <div
          className={cn(
            "relative h-[300px] overflow-hidden bg-coal sm:h-[360px] lg:h-[420px]",
            !interactiveVisual && "cursor-pointer",
          )}
          onClick={interactiveVisual ? undefined : () => openProject(p.slug)}
        >
          <LazyMount className="absolute inset-0" margin={300}>
            <ProjectVisual project={p} compact interactive={interactiveVisual} />
          </LazyMount>
          <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2">
            <TypeTag type="client" className="bg-ink/85 backdrop-blur" />
          </div>
          <div className="eyebrow pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-ink/85 px-2.5 py-1.5 text-[10px] text-bone/70 backdrop-blur">
            {String(i + 1).padStart(2, "0")} / {String(clientProjects.length).padStart(2, "0")}
          </div>
          {interactiveVisual && (
            <div className="eyebrow pointer-events-none absolute bottom-4 left-4 z-10 hidden rounded-full bg-ink/85 px-3 py-1.5 text-[10px] text-bone/80 backdrop-blur sm:block">
              Drag to compare before / after
            </div>
          )}
        </div>

        <button onClick={() => openProject(p.slug)} className="flex flex-1 flex-col p-6 text-left md:p-8">
          <span className="eyebrow text-ash">{p.category}</span>
          <span className="display mt-3 text-[clamp(1.5rem,2.4vw,2.2rem)] leading-[1] transition-colors group-hover:text-ember">
            {p.name}
          </span>
          <span className="mt-3 max-w-xl text-[15px] leading-relaxed text-bone/65">{p.description}</span>
          <span className="mt-5 flex flex-wrap gap-1.5">
            {p.highlights.slice(0, 4).map((h) => (
              <span key={h} className="rounded-full border border-bone/12 px-2.5 py-1 text-[12px] text-bone/60">
                {h}
              </span>
            ))}
          </span>
          <span className="eyebrow mt-auto flex items-center gap-2 pt-6 text-bone/80 transition-colors group-hover:text-ember">
            Open case study
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </button>
      </motion.article>
    </Reveal>
  );
}

export default function ClientWork() {
  return (
    <section id="work" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <Eyebrow index="06">Client work</Eyebrow>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(2.2rem,5.8vw,5.6rem)]">
                Built for real
                <br />
                <span className="serif-accent text-ember">organizations.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="md:justify-self-end">
              <p className="max-w-md text-xl leading-snug text-bone/80">Every organization has different problems. We build around them.</p>
              <div className="mt-6 flex items-center gap-3">
                <TypeTag type="client" />
                <span className="text-sm text-bone/50">Problems organizations trusted us to solve.</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-12">
          {clientProjects.map((p, i) => (
            <Card key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
