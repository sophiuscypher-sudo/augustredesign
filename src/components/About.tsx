import { technologyDomains } from "../data/company";
import { Eyebrow, Reveal } from "./ui";

const POINTS = [
  { t: "Problems first", b: "We start from what a business is trying to accomplish, then decide what to build." },
  { t: "Systems, not just screens", b: "Interfaces matter. So do the architecture, data and integrations underneath them." },
  { t: "Built to evolve", b: "Technology should grow with the organization instead of being rebuilt every few years." },
];

export default function About() {
  const strip = [...technologyDomains, ...technologyDomains];
  return (
    <section id="about" className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Eyebrow index="12">About August</Eyebrow>
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="display text-[clamp(2.2rem,5.6vw,5.6rem)]">
              A technology firm
              <br />
              <span className="serif-accent text-ember">that builds things.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-xl leading-snug text-bone/80">
              August Solutions designs and engineers bespoke digital solutions for clients — and builds its own
              technology products. Not a freelancer collective. Not a template studio. An engineering firm.
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-bone/55">
              Building for clients keeps us close to real organizational problems. Building for ourselves lets us solve
              the problems we believe are worth solving. Each side makes the other sharper.
            </p>
          </Reveal>

          <div className="border-t border-bone/12">
            {POINTS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08}>
                <div className="grid grid-cols-[auto_1fr] gap-5 border-b border-bone/12 py-6">
                  <span className="eyebrow pt-1 text-ember">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="display text-xl tracking-[0.02em]" style={{ letterSpacing: "0.02em" }}>
                      {p.t}
                    </div>
                    <p className="mt-2 text-bone/60">{p.b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 overflow-hidden border-y border-bone/12 py-5 md:mt-28">
        <div className="flex w-max animate-marquee items-center whitespace-nowrap">
          {strip.map((d, i) => (
            <span key={d + i} className="flex items-center">
              <span className="display px-8 text-3xl text-bone/25 md:text-5xl" style={{ letterSpacing: "-0.03em" }}>
                {d}
              </span>
              <span className="text-ember">✱</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
