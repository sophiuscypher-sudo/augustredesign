import { motion } from "motion/react";
import { Eyebrow, MagneticButton, Reveal, TypeTag } from "./ui";
import { augustProducts } from "../data/projects";
import { useUI } from "../context/UIContext";

const BESPOKE_EXAMPLES = [
  "Websites",
  "Platforms",
  "Business applications",
  "CRM integrations",
  "API integrations",
  "Workflow automation",
  "AI integration",
  "Data systems",
  "Custom dashboards",
  "Digital transformation",
];

export default function TwoSides() {
  const { openBrief, scrollToSection, openProject } = useUI();

  return (
    <section id="two-sides" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1.1fr_1fr] md:items-end">
          <div>
            <Eyebrow index="01">The two sides of August</Eyebrow>
            <Reveal>
              <h2 className="display mt-6 text-[clamp(2.2rem,5.6vw,5.4rem)]">
                We build technology
                <br />
                <span className="serif-accent text-ember">around your business.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-bone/65 md:justify-self-end">
              August is an engineering firm with two sides: bespoke technology engineered for clients, and
              products we conceive and build ourselves. We keep them clearly apart — and they make each other
              better.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* BESPOKE */}
          <Reveal>
            <motion.article
              whileHover="hover"
              className="group relative flex h-full flex-col overflow-hidden rounded-md border border-bone/12 bg-graphite p-8 md:p-12"
            >
              <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative flex items-center justify-between">
                <span className="eyebrow text-ash">Side A / For clients</span>
                <TypeTag type="client" />
              </div>
              <h3 className="display relative mt-16 text-[clamp(2rem,3.8vw,3.6rem)]">
                Bespoke
                <br />
                technology
              </h3>
              <p className="serif-accent relative mt-3 text-3xl text-ember md:text-4xl">Built around your business.</p>
              <p className="relative mt-6 max-w-md leading-relaxed text-bone/65">
                August works with organizations to understand their requirements and engineer technology
                specifically for their needs.
              </p>

              <ul className="relative mt-10 flex flex-wrap gap-2">
                {BESPOKE_EXAMPLES.map((e, i) => (
                  <motion.li
                    key={e}
                    variants={{ hover: { y: -2 } }}
                    transition={{ delay: i * 0.015 }}
                    className="rounded-full border border-bone/15 px-3.5 py-1.5 text-[13px] text-bone/80 transition-colors hover:border-ember/60 hover:text-bone"
                  >
                    {e}
                  </motion.li>
                ))}
              </ul>

              <div className="relative mt-auto pt-12">
                <MagneticButton variant="primary" onClick={openBrief}>
                  Build something for us
                </MagneticButton>
              </div>
            </motion.article>
          </Reveal>

          {/* PRODUCTS */}
          <Reveal delay={0.12}>
            <motion.article
              whileHover="hover"
              className="group relative flex h-full flex-col overflow-hidden rounded-md bg-bone p-8 text-ink md:p-12"
            >
              <div className="bg-blueprint-light pointer-events-none absolute inset-0 opacity-70" />
              <div className="relative flex items-center justify-between">
                <span className="eyebrow text-steel">Side B / Our own</span>
                <TypeTag type="product" tone="light" />
              </div>
              <h3 className="display relative mt-16 text-[clamp(2rem,3.8vw,3.6rem)]">
                August
                <br />
                products
              </h3>
              <p className="serif-accent relative mt-3 text-3xl text-ember-deep md:text-4xl">
                Technology we are building ourselves.
              </p>
              <p className="relative mt-6 max-w-md leading-relaxed text-ink/70">
                Products and platforms conceived and developed by August Solutions — not client work.
              </p>

              <ul className="relative mt-10 divide-y divide-ink/12 border-y border-ink/12">
                {augustProducts.map((p) => (
                  <li key={p.slug}>
                    <button
                      onClick={() => openProject(p.slug)}
                      className="group/row flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-ember-deep"
                    >
                      <span>
                        <span className="block text-lg font-medium tracking-tight">{p.name}</span>
                        <span className="block text-sm text-ink/60">{p.category}</span>
                      </span>
                      <span className="text-xl transition-transform duration-300 group-hover/row:translate-x-1">→</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="relative mt-auto pt-12">
                <MagneticButton variant="dark" onClick={() => scrollToSection("products")}>
                  Explore August products
                </MagneticButton>
              </div>
            </motion.article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
