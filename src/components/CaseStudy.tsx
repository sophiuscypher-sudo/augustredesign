import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { capabilities } from "../data/company";
import { augustProducts, clientProjects, getProject } from "../data/projects";
import { cn } from "../utils/cn";
import { useUI } from "../context/UIContext";
import { ArchitectureFlow } from "./ArchitectureFlow";
import { ArrowIcon, MagneticButton, TypeTag, useScrollLock } from "./ui";
import { ProjectVisual } from "./visuals/ProjectVisual";

function Block({ n, title, children, className }: { n: string; title: string; children: ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("border-t border-bone/12 py-12 md:py-16", className)}
    >
      <div className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-12">
        <div className="eyebrow flex items-center gap-3 text-ash">
          <span className="text-ember">{n}</span>
          {title}
        </div>
        <div>{children}</div>
      </div>
    </motion.section>
  );
}

export default function CaseStudy() {
  const { activeProject, closeProject, openProject, openBrief, openAugness } = useUI();
  const project = activeProject ? getProject(activeProject) : undefined;
  const scroller = useRef<HTMLDivElement>(null);

  useScrollLock(!!project);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [activeProject]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeProject();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, closeProject]);

  const pool = project ? (project.type === "client" ? clientProjects : augustProducts) : [];
  const idx = project ? pool.findIndex((p) => p.slug === project.slug) : 0;
  const prev = pool[(idx - 1 + pool.length) % pool.length];
  const next = pool[(idx + 1) % pool.length];
  const isProduct = project?.type === "product";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study"
          role="dialog"
          aria-label={`${project.name} — ${project.label}`}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] bg-ink"
        >
          <div ref={scroller} className="thin-scroll h-full overflow-y-auto">
            {/* top bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-bone/10 bg-ink/85 px-6 py-3.5 backdrop-blur-xl md:px-10">
              <button onClick={closeProject} className="eyebrow group flex items-center gap-3 text-bone/80 hover:text-ember">
                <ArrowIcon className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
                Back
              </button>
              <div className="hidden items-center gap-3 md:flex">
                <TypeTag type={project.type} />
                <span className="eyebrow text-bone/60">{project.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openProject(prev.slug)} aria-label={`Previous: ${prev.name}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 hover:border-ember hover:text-ember">
                  <ArrowIcon className="rotate-180" />
                </button>
                <button onClick={() => openProject(next.slug)} aria-label={`Next: ${next.name}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 hover:border-ember hover:text-ember">
                  <ArrowIcon />
                </button>
                <button onClick={closeProject} aria-label="Close case study" className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-bone text-ink hover:bg-ember">
                  <svg viewBox="0 0 14 14" width="11" height="11" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round">
                    <path d="M1 1l12 12M13 1L1 13" />
                  </svg>
                </button>
              </div>
            </div>

            <motion.div key={project.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
              {/* hero */}
              <header className="pb-12 pt-12 md:pb-16 md:pt-20">
                <div className="flex flex-wrap items-center gap-3">
                  <TypeTag type={project.type} />
                  <span className="eyebrow text-ash">{project.category}</span>
                </div>
                <h1 className="display mt-8 text-[clamp(2.8rem,10vw,9.5rem)]">{project.name}</h1>
                <p className={cn("serif-accent mt-5 max-w-3xl text-3xl leading-tight md:text-5xl", isProduct ? "text-ember" : "text-bone/80")}>{project.tagline}</p>

                <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-bone/12 pt-6 md:grid-cols-4">
                  <div>
                    <dt className="eyebrow text-[10px] text-ash">Type</dt>
                    <dd className="mt-1.5">{isProduct ? "August product" : "Client project"}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[10px] text-ash">Category</dt>
                    <dd className="mt-1.5">{project.category}</dd>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <dt className="eyebrow text-[10px] text-ash">Capabilities</dt>
                    <dd className="mt-1.5">{project.capabilities.map((c) => capabilities.find((x) => x.id === c)?.name).join(" · ")}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-[10px] text-ash">Live project</dt>
                    <dd className="mt-1.5">{project.liveUrl ? "Available" : "Link to be added"}</dd>
                  </div>
                </dl>
              </header>

              {/* experience / interface with High-Fidelity Interactive Showcase */}
              <div className="relative w-full overflow-hidden my-4">
                <ProjectVisual project={project} interactive={true} useShowcase={true} />
              </div>
              <p className="eyebrow mt-3 text-ash">
                Interactive live platform showcase rendered in code. Built with motion and bespoke African market telemetry.
              </p>

              {project.screenshots.length > 0 && (
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {project.screenshots.map((src, i) => (
                    <img key={src} src={src} alt={`${project.name} screenshot ${i + 1}`} loading="lazy" decoding="async" className="w-full rounded-md border border-bone/12" />
                  ))}
                </div>
              )}

              <div className="mt-16 md:mt-24">
                <Block n="01" title="Problem">
                  <p className="max-w-3xl text-2xl leading-snug md:text-3xl">{project.challenge}</p>
                </Block>
                <Block n="02" title="Approach">
                  <p className="max-w-3xl text-2xl leading-snug text-bone/85 md:text-3xl">{project.solution}</p>
                </Block>
                <Block n="03" title="Experience">
                  <p className="max-w-2xl text-lg leading-relaxed text-bone/70">{project.experience}</p>
                  <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3 border-b border-bone/10 pb-3 text-[15px]">
                        <span className="text-ember">✱</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </Block>
                <Block n="04" title="Technology">
                  {project.technologies.length > 0 ? (
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((t) => (
                          <span key={t} className="rounded-full border border-bone/20 px-4 py-2 text-[14px]">
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 text-[14px] text-bone/45">Further named technology details are added here once confirmed.</p>
                    </div>
                  ) : (
                    <p className="max-w-2xl text-lg leading-relaxed text-bone/60">
                      Named stack details for this {isProduct ? "product" : "project"} will be added once confirmed — August only lists technology it has verified.
                    </p>
                  )}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.capabilities.map((c) => (
                      <span key={c} className="eyebrow rounded-full bg-bone/[0.06] px-3 py-1.5 text-[10px] text-bone/70">
                        {capabilities.find((x) => x.id === c)?.name}
                      </span>
                    ))}
                  </div>
                </Block>
                {project.architecture && (
                  <Block n="05" title="Architecture">
                    <div className="rounded-md border border-bone/12 bg-coal p-6 md:p-10">
                      <div className="eyebrow text-ember">{project.architecture.title}</div>
                      {project.architecture.caption && <p className="mt-2 text-[14px] text-bone/50">{project.architecture.caption}</p>}
                      <div className="mt-8">
                        <ArchitectureFlow nodes={project.architecture.nodes} />
                      </div>
                    </div>
                  </Block>
                )}
                <Block n={project.architecture ? "06" : "05"} title="Outcome">
                  {project.outcome ? (
                    <p className="max-w-3xl text-2xl leading-snug md:text-3xl">{project.outcome}</p>
                  ) : (
                    <p className="max-w-2xl text-lg leading-relaxed text-bone/60">
                      {isProduct
                        ? "Milestones and outcomes will be published here as they are confirmed. August doesn't publish numbers it can't stand behind."
                        : "Outcomes will be published here once they are confirmed with the client. August doesn't publish numbers it can't stand behind."}
                    </p>
                  )}
                </Block>
                <Block n={project.architecture ? "07" : "06"} title="Live project">
                  {project.liveUrl ? (
                    <div className="flex flex-wrap items-center gap-4">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="eyebrow inline-flex items-center gap-3 rounded-full bg-ember px-6 py-4 text-ink transition-colors hover:bg-bone"
                      >
                        Visit live project <ArrowIcon />
                      </a>
                      {project.overviewUrl && (
                        <a href={project.overviewUrl} target="_blank" rel="noopener noreferrer" className="eyebrow text-bone/70 underline-offset-4 hover:text-ember hover:underline">
                          Product overview ↗
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                      <span className="eyebrow inline-flex items-center gap-3 rounded-full border border-dashed border-bone/25 px-5 py-3 text-bone/50">
                        <span className="h-1.5 w-1.5 rounded-full bg-bone/40" />
                        Live link — to be added
                      </span>
                      <button onClick={() => openAugness(`Tell me about ${project.name}`)} className="eyebrow text-left text-ember underline-offset-4 hover:underline">
                        Ask Augness about {project.name} →
                      </button>
                    </div>
                  )}
                </Block>
              </div>

              {/* closing */}
              <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr_1fr]">
                <div className="rounded-md border border-bone/12 bg-graphite p-8 md:p-10">
                  <div className="eyebrow text-ember">{isProduct ? "Curious about this product?" : "Have a similar problem?"}</div>
                  <p className="display mt-4 text-3xl md:text-4xl">{isProduct ? `Ask about ${project.name}.` : "Let's build around it."}</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {isProduct ? (
                      <MagneticButton variant="primary" onClick={() => openAugness(`Tell me about ${project.name}`)}>
                        Ask Augness
                      </MagneticButton>
                    ) : (
                      <MagneticButton variant="primary" onClick={openBrief}>
                        Build something like this
                      </MagneticButton>
                    )}
                    <MagneticButton variant="ghost" onClick={openBrief}>
                      Start a project
                    </MagneticButton>
                  </div>
                </div>
                <button onClick={() => openProject(next.slug)} className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-bone/12 p-8 text-left transition-colors hover:border-ember md:p-10">
                  <span className="eyebrow text-ash">Next {isProduct ? "product" : "project"}</span>
                  <span>
                    <TypeTag type={next.type} className="mb-4" />
                    <span className="display block text-3xl transition-colors group-hover:text-ember md:text-4xl">{next.name}</span>
                    <span className="mt-2 block text-bone/55">{next.category}</span>
                  </span>
                  <span className="absolute bottom-8 right-8 text-2xl transition-transform duration-300 group-hover:translate-x-1 md:bottom-10 md:right-10">→</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
