import { aiUses, capabilities, company, crmArchitecture, labAreas, processSteps, services, technologyDomains, whyBespoke } from "./company";
import { allProjects, augustProducts, clientProjects } from "./projects";
import type { KnowledgeDoc } from "./types";

/**
 * The Augness knowledge base is *derived* from the structured data layer.
 * Nothing about August is hard-coded in the chat UI: add a project or a
 * capability to the data files and Augness can reference it automatically.
 */

const kw = (...parts: (string | string[])[]) =>
  parts
    .flat()
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9+&]+/)
    .filter((w) => w.length > 2);

export const knowledgeBase: KnowledgeDoc[] = [
  {
    id: "company",
    kind: "company",
    title: "About August Solutions",
    text: `${company.positioning} Two sides define the company: Bespoke Technology (built around your business) and August Products (technology we are building ourselves).`,
    keywords: kw("august solutions company about who what is august technology firm engineering studio bespoke products"),
    actions: [
      { kind: "scroll", label: "Read about August", target: "about" },
      { kind: "scroll", label: "See the two sides", target: "two-sides" },
    ],
  },
  {
    id: "services",
    kind: "company",
    title: "What August can build",
    text: `August designs and engineers: ${services.join(", ")}. These are grouped into ${capabilities.length} capability areas: ${capabilities
      .map((c) => c.name)
      .join(", ")}.`,
    keywords: kw("build make services offer capabilities what can august build websites apps web application platforms systems software develop"),
    actions: [
      { kind: "scroll", label: "Explore what we build", target: "capabilities" },
      { kind: "brief", label: "Start a project" },
    ],
  },
  ...capabilities.map<KnowledgeDoc>((c) => {
    const related = c.projects
      .map((slug) => allProjects.find((p) => p.slug === slug))
      .filter(Boolean)
      .map((p) => `${p!.name} (${p!.label.toLowerCase()})`);
    return {
      id: `cap-${c.id}`,
      kind: "capability",
      title: c.name,
      text: `${c.summary} ${c.detail} Includes: ${c.ships.join(", ")}.${
        related.length ? ` Related work: ${related.join(", ")}.` : ""
      }${c.note ? ` ${c.note}` : ""}`,
      keywords: kw(c.name, c.summary, c.ships, c.id.replace(/-/g, " ")),
      actions: [
        { kind: "scroll", label: `See ${c.name}`, target: "capabilities" },
        ...c.projects.slice(0, 2).map((slug) => ({
          kind: "project" as const,
          slug,
          label: `Open ${allProjects.find((p) => p.slug === slug)?.name ?? slug}`,
        })),
      ],
    };
  }),
  {
    id: "client-work",
    kind: "company",
    title: "Client work",
    text: `August has built for real organizations. Client projects: ${clientProjects
      .map((p) => `${p.name} — ${p.category}`)
      .join("; ")}. Client projects are always labelled CLIENT PROJECT.`,
    keywords: kw("client clients work portfolio projects built case studies examples customers proof references"),
    actions: clientProjects.map((p) => ({ kind: "project" as const, slug: p.slug, label: p.name })),
  },
  {
    id: "products",
    kind: "company",
    title: "August products",
    text: `August also builds its own technology. August products: ${augustProducts
      .map((p) => `${p.name} — ${p.tagline}`)
      .join("; ")}. These are labelled AUGUST PRODUCT and are never client work.`,
    keywords: kw("products product own initiatives built by august madis brownfleet raiden grid pos fleet ev"),
    actions: augustProducts.map((p) => ({ kind: "project" as const, slug: p.slug, label: p.name })),
  },
  ...allProjects.map<KnowledgeDoc>((p) => ({
    id: `project-${p.slug}`,
    kind: p.type === "client" ? "project" : "product",
    title: `${p.name} (${p.label})`,
    text: `${p.description} Problem: ${p.challenge} Approach: ${p.solution}${
      p.technologies.length ? ` Confirmed technologies: ${p.technologies.join(", ")}.` : " Named technology stack details have not been published yet."
    } Covers: ${p.highlights.join(", ")}.${p.outcome ? ` Outcome: ${p.outcome}` : " No outcomes have been published for this project."}${
      p.liveUrl ? "" : " A live link has not been added yet."
    }`,
    keywords: kw(p.name, p.slug.replace(/-/g, " "), p.category, p.highlights, p.description),
    actions: [
      { kind: "project", slug: p.slug, label: `Open ${p.name} case study` },
      ...(p.type === "client" ? [{ kind: "brief" as const, label: "Build something like this" }] : []),
    ],
  })),
  {
    id: "crm",
    kind: "capability",
    title: "CRM & API integrations",
    text: `Yes — connecting existing systems is a core August capability. We integrate CRMs and other systems through APIs and automated workflows, and build new technology around them. A reference pattern: ${crmArchitecture.nodes.join(
      " → ",
    )}. The exact CRM and the shape of your workflow decide the approach, so the best next step is to describe your setup in a project brief.`,
    keywords: kw("crm integrate integration integrations api apis hubspot salesforce zoho connect connected systems automation workflow sync existing"),
    actions: [
      { kind: "scroll", label: "See the integration architecture", target: "integrations" },
      { kind: "brief", label: "Describe your CRM setup" },
    ],
  },
  {
    id: "ai",
    kind: "ai",
    title: "AI & intelligence at August",
    text: `August applies AI where it matters: ${aiUses.join(", ")}. Examples inside August's own work: MADIS POS (analytics and AI capabilities), AI marketing video for Yancy Graphics, and Augness itself.`,
    keywords: kw("ai artificial intelligence machine learning assistant chatbot llm smart intelligent automation recommendation generative"),
    actions: [
      { kind: "scroll", label: "Intelligence, where it matters", target: "intelligence" },
      { kind: "brief", label: "Scope an AI system" },
    ],
  },
  {
    id: "augness",
    kind: "ai",
    title: "About Augness",
    text: "Augness is the August Intelligence Layer — August's own assistant experience for exploring what the company builds. Right now it runs in guided knowledge mode: it answers from August's structured project and capability data. It is not connected to a language model yet, and the interface is built so a model can be connected through a provider layer.",
    keywords: kw("augness assistant who are you what are you bot ai model gpt llm real intelligence layer"),
  },
  {
    id: "process",
    kind: "process",
    title: "How August works",
    text: `The August process runs as an engineering pipeline: ${processSteps.map((s) => `${s.code} ${s.name}`).join(" → ")}.`,
    keywords: kw("process how work method approach steps stages workflow timeline engineering pipeline discovery"),
    actions: [{ kind: "scroll", label: "See the process", target: "process" }],
  },
  {
    id: "why",
    kind: "company",
    title: "Why bespoke?",
    text: whyBespoke.map((w) => `${w.title}. ${w.body}`).join(" "),
    keywords: kw("why bespoke custom off the shelf unique tailored different rigid"),
    actions: [{ kind: "scroll", label: "Why bespoke?", target: "why-bespoke" }],
  },
  {
    id: "lab",
    kind: "lab",
    title: "The Lab",
    text: `The Lab is August's internal experimentation and product-development environment. Areas: ${labAreas
      .map((l) => l.name)
      .join(", ")}. Concepts move from idea to prototype to engineering to product.`,
    keywords: kw("lab research experiment prototype innovation r&d future"),
    actions: [{ kind: "scroll", label: "Visit the Lab", target: "lab" }],
  },
  {
    id: "technology",
    kind: "technology",
    title: "Technology domains",
    text: `August works across: ${technologyDomains.join(", ")}. Named technology stacks are shared per project once confirmed, rather than guessed.`,
    keywords: kw("technology tech stack stacks languages frameworks react node cloud mobile developers engineers"),
  },
  {
    id: "contact",
    kind: "contact",
    title: "Start a project",
    text: `The best way to begin is a short project brief: what you are trying to accomplish and what systems are involved.${
      company.contact.email ? ` You can also email ${company.contact.email}.` : ""
    }`,
    keywords: kw("contact start project hire quote price cost pricing email reach talk get in touch begin brief proposal budget"),
    actions: [{ kind: "brief", label: "Start a project" }],
  },
];

/** Compact, serializable snapshot — what a real LLM provider would receive as grounding context. */
export function knowledgeSnapshot() {
  return {
    company: { name: company.name, positioning: company.positioning, contact: company.contact },
    services,
    capabilities: capabilities.map(({ id, name, summary, ships, projects }) => ({ id, name, summary, ships, projects })),
    clientProjects: clientProjects.map(({ name, slug, category, description, challenge, solution, technologies, highlights }) => ({
      name,
      slug,
      type: "client",
      category,
      description,
      challenge,
      solution,
      technologies,
      highlights,
    })),
    augustProducts: augustProducts.map(({ name, slug, category, description, challenge, solution, technologies, highlights }) => ({
      name,
      slug,
      type: "product",
      category,
      description,
      challenge,
      solution,
      technologies,
      highlights,
    })),
    process: processSteps,
    rules: [
      "Never invent client results, metrics, partnerships, awards or testimonials.",
      "Always distinguish CLIENT PROJECT from AUGUST PRODUCT.",
      "If something is not in the knowledge base, say so and offer to start a project brief.",
    ],
  };
}
