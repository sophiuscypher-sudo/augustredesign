import { augustProducts } from "../data/projects";
import type { Project } from "../data/types";
import { cn } from "../utils/cn";
import { useUI } from "../context/UIContext";
import { ArchitectureFlow } from "./ArchitectureFlow";
import { Eyebrow, LazyMount, MagneticButton, Reveal, TypeTag } from "./ui";
import { ProjectVisual, PRODUCT_ASPECT as ASPECT } from "./visuals/ProjectVisual";

function ProductBlock({ p, i }: { p: Project; i: number }) {
  const { openProject } = useUI();
  const flip = i % 2 === 1;

  return (
    <article className="grid gap-10 border-t border-ink/15 py-16 md:py-24 lg:grid-cols-12 lg:gap-14">
      <div className={cn("lg:col-span-5", flip && "lg:order-2")}>
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <div className="flex items-center justify-between">
              <TypeTag type="product" tone="light" />
              <span className="eyebrow text-steel">P / {String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="display mt-8 text-[clamp(2.6rem,6vw,5.4rem)]">{p.name}</h3>
            <p className="serif-accent mt-3 text-3xl leading-tight text-ember-deep md:text-4xl">{p.tagline}</p>
            <p className="mt-6 max-w-md leading-relaxed text-ink/70">{p.description}</p>

            <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-[15px] text-ink/80">
                  <span className="h-1.5 w-1.5 shrink-0 bg-ember" />
                  {h}
                </li>
              ))}
            </ul>

            {p.architecture && (
              <div className="mt-10 hidden rounded-md border border-ink/15 p-5 md:block">
                <div className="eyebrow mb-4 text-steel">{p.architecture.title}</div>
                <ArchitectureFlow nodes={p.architecture.nodes} tone="light" vertical />
              </div>
            )}

            <div className="mt-8">
              <MagneticButton variant="dark" onClick={() => openProject(p.slug)}>
                View product overview
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>

      <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
        <Reveal delay={0.1}>
          <div className={cn("relative w-full", ASPECT[p.slug])}>
            <LazyMount className="absolute inset-0" margin={300}>
              <ProjectVisual project={p} />
            </LazyMount>
          </div>
          <p className="eyebrow mt-3 text-steel">Interface illustration — August product, not client work.</p>
        </Reveal>
      </div>
    </article>
  );
}

export default function Products() {
  const { openAugness } = useUI();
  return (
    <section id="products" className="relative bg-bone px-6 py-28 text-ink md:px-10 md:py-40">
      <div className="bg-blueprint-light pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-16 grid gap-8 md:mb-20 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <Eyebrow index="08" tone="light">
              August products
            </Eyebrow>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(2.6rem,7vw,7rem)]">
                Built by
                <br />
                <span className="serif-accent text-ember-deep">August.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="md:justify-self-end">
              <p className="max-w-md text-xl leading-snug text-ink/80">
                We don't only build technology for clients. We build products to solve problems we believe are worth solving.
              </p>
              <div className="mt-6">
                <TypeTag type="product" tone="light" />
              </div>
            </div>
          </Reveal>
        </div>

        {augustProducts.map((p, i) => (
          <ProductBlock key={p.slug} p={p} i={i} />
        ))}

        <div className="flex flex-col items-start justify-between gap-6 border-t border-ink/15 pt-10 md:flex-row md:items-center">
          <p className="max-w-lg text-lg leading-snug text-ink/75">
            Curious about what we're building, or how it could connect to your business?
          </p>
          <MagneticButton variant="ghost-dark" onClick={() => openAugness("Show me August products")}>
            Ask Augness about our products
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
