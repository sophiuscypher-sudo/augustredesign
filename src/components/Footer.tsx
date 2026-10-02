import { company } from "../data/company";
import { augustProducts, clientProjects } from "../data/projects";
import { useUI } from "../context/UIContext";

export default function Footer() {
  const { scrollToSection, openProject, openBrief, openAugness } = useUI();

  const offerings: { label: string; target: string }[] = [
    { label: "Bespoke Technology", target: "two-sides" },
    { label: "Digital Products", target: "products" },
    { label: "AI & Intelligence", target: "intelligence" },
    { label: "Integrations", target: "integrations" },
    { label: "Mobility", target: "capabilities" },
    { label: "Business Systems", target: "capabilities" },
    { label: "Creative Technology", target: "creative" },
  ];

  const link = "text-left text-[15px] text-bone/65 transition-colors hover:text-ember";

  return (
    <footer className="relative overflow-hidden border-t border-bone/12 px-6 pb-8 pt-20 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="display text-2xl" style={{ letterSpacing: "0.02em" }}>
              August Solutions
            </div>
            <p className="mt-4 max-w-xs leading-relaxed text-bone/55">
              Bespoke technology for organizations. Products we build ourselves. Technology, built around the problem.
            </p>
          </div>

          <div>
            <div className="eyebrow mb-5 text-ash">What we do</div>
            <ul className="space-y-3">
              {offerings.map((o) => (
                <li key={o.label}>
                  <button className={link} onClick={() => scrollToSection(o.target)}>
                    {o.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-5 text-ash">Client work</div>
            <ul className="space-y-3">
              {clientProjects.map((p) => (
                <li key={p.slug}>
                  <button className={link} onClick={() => openProject(p.slug)}>
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-5 text-ash">August products</div>
            <ul className="space-y-3">
              {augustProducts.map((p) => (
                <li key={p.slug}>
                  <button className={link} onClick={() => openProject(p.slug)}>
                    {p.name}
                  </button>
                </li>
              ))}
              <li>
                <button className={link} onClick={() => openAugness("What is Augness?")}>
                  Augness
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-5 text-ash">Contact</div>
            <ul className="space-y-3">
              <li>
                <button className={link} onClick={openBrief}>
                  Start a project
                </button>
              </li>
              <li>
                <button className={link} onClick={() => openAugness()}>
                  Talk to Augness
                </button>
              </li>
              {company.contact.email && (
                <li>
                  <a className={link} href={`mailto:${company.contact.email}`}>
                    {company.contact.email}
                  </a>
                </li>
              )}
              {company.socials.map((s) => (
                <li key={s.url}>
                  <a className={link} href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="display pointer-events-none mt-20 select-none text-center text-[clamp(4rem,24vw,22rem)] leading-[0.8] text-transparent"
          style={{ WebkitTextStroke: "1px rgba(242,239,232,0.12)", letterSpacing: "-0.06em" }}
          aria-hidden
        >
          AUGUST
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-bone/12 pt-6 md:flex-row md:items-center">
          <span className="eyebrow text-ash">© {new Date().getFullYear()} August Solutions</span>
          <span className="eyebrow flex items-center gap-3 text-bone/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            {company.statusLabel}
          </span>
        </div>
      </div>
    </footer>
  );
}
