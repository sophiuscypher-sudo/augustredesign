import type { BespokeStep, Capability, LabArea, ProcessStep } from "./types";

type Env = Record<string, string | undefined>;
const env: Env = ((import.meta as unknown as { env?: Env }).env ?? {}) as Env;

export const company = {
  name: "August Solutions",
  short: "August",
  statusLabel: "AUGUST SYSTEMS / BUILDING",
  headline: "We build technology around your business.",
  heroHeadline: "Technology, built around the problem.",
  positioning:
    "August Solutions is a technology firm that designs and engineers bespoke digital solutions for clients while also building its own technology products.",
  heroStatement:
    "August Solutions designs and engineers bespoke digital products, platforms and intelligent systems for businesses and organizations — while building technology of our own.",
  /** Contact channels. Nothing here is invented: fill in when confirmed. */
  contact: {
    email: (env.VITE_CONTACT_EMAIL as string | undefined) || null,
    /** POST endpoint (form backend) for project briefs. */
    formEndpoint: (env.VITE_CONTACT_ENDPOINT as string | undefined) || null,
    website: "https://augustsolutions.netlify.app/",
  },
  /** Social links — only add verified ones. */
  socials: [] as { label: string; url: string }[],
};

/** Everything August engineers for clients (brief §1). */
export const services: string[] = [
  "Websites",
  "Web applications",
  "Digital platforms",
  "Business systems",
  "CRM integrations",
  "API integrations",
  "Automation",
  "AI-enabled systems",
  "Dashboards & analytics",
  "Mobility platforms",
  "Operational software",
  "E-commerce experiences",
  "Digital experiences",
];

export const capabilities: Capability[] = [
  {
    id: "digital-experiences",
    index: "01",
    name: "Digital Experiences",
    summary: "Websites and digital experiences designed around organizations, brands and audiences.",
    detail:
      "From organizational platforms to interactive brand experiences, we design the digital front door around who you serve and what you need them to do.",
    ships: ["Websites", "Interactive experiences", "Brand-led digital presence", "Content & communication"],
    projects: ["skypaints", "siaya-empowerment-network", "archways-research-firm", "azma-yetu-cbo"],
  },
  {
    id: "custom-platforms",
    index: "02",
    name: "Custom Platforms",
    summary: "Purpose-built platforms for specialized business and organizational needs.",
    detail:
      "When no off-the-shelf product fits, we architect and engineer the platform itself — the data, the logic and the interfaces around the way you work.",
    ships: ["Web applications", "Digital platforms", "Role-based experiences", "Platform architecture"],
    projects: ["teddy-cabs", "siaya-empowerment-network", "azma-yetu-cbo"],
  },
  {
    id: "business-systems",
    index: "03",
    name: "Business Systems",
    summary: "Operational software, dashboards, workflows and business applications.",
    detail:
      "Internal tools and operational software that give a business one connected view of how it runs — and a way to run it better.",
    ships: ["Operational software", "Dashboards & analytics", "Workflows", "Business applications"],
    projects: ["brownfleet", "madis-pos"],
    note: "Shown through August's own products, built on the same engineering we apply to client systems.",
  },
  {
    id: "crm-integrations",
    index: "04",
    name: "CRM & Integrations",
    summary: "Connect existing business systems through APIs, CRM integrations and automated workflows.",
    detail:
      "We connect the systems your business already uses — CRMs, payments, databases, analytics — and build new technology around them.",
    ships: ["CRM integrations", "API integrations", "Workflow automation", "Data synchronization"],
    projects: [],
    note: "See the reference integration architecture below. Specific integration work can be discussed directly.",
  },
  {
    id: "ai-intelligence",
    index: "05",
    name: "AI & Intelligence",
    summary: "AI assistants, intelligent workflows, analytics, recommendations and automation.",
    detail:
      "Practical intelligence placed where it improves a real workflow — assistants, search, recommendations, analytics and automation.",
    ships: ["AI assistants", "Intelligent workflows", "Analytics & recommendations", "Automation"],
    projects: ["madis-pos", "yancy-graphics"],
  },
  {
    id: "mobility",
    index: "06",
    name: "Mobility Technology",
    summary: "Ride-hailing, fleet, location and transportation systems.",
    detail:
      "Mapping, location, routing and operational systems for people and vehicles on the move.",
    ships: ["Ride-hailing platforms", "Fleet systems", "Location services", "Transportation software"],
    projects: ["teddy-cabs", "brownfleet", "raiden-grid"],
  },
  {
    id: "commerce",
    index: "07",
    name: "E-commerce & Commerce",
    summary: "Digital commerce experiences and transaction systems.",
    detail:
      "Storefronts, point-of-sale and transaction systems that keep sales, stock and payments in step.",
    ships: ["E-commerce experiences", "Point-of-sale systems", "Transaction systems", "Inventory"],
    projects: ["madis-pos"],
    note: "Shown through MADIS POS, August's own commerce product.",
  },
  {
    id: "creative-technology",
    index: "08",
    name: "Creative Technology",
    summary: "Branding, animation, AI-generated marketing content and interactive digital experiences.",
    detail:
      "Where engineering and creativity coexist: brand, motion, AI-assisted content and interactive experiences built as one.",
    ships: ["Branding", "Animation", "AI-generated marketing content", "Interactive experiences"],
    projects: ["yancy-graphics", "skypaints"],
  },
];

export const bespokeSteps: BespokeStep[] = [
  { name: "Business need", line: "It starts with a real problem inside a real business." },
  { name: "Discovery", line: "We map the workflows, people and constraints behind it." },
  { name: "Architecture", line: "The system is structured before a screen is drawn." },
  { name: "Design", line: "Interfaces are shaped around how your team actually works." },
  { name: "Engineering", line: "Modules are built, tested and made to last." },
  { name: "Integrations", line: "Your existing systems connect to the new platform." },
  { name: "Deployment", line: "The system goes live and is validated in use." },
  { name: "Evolution", line: "It keeps growing with the business — no rebuild required." },
];

export const processSteps: ProcessStep[] = [
  {
    code: "01",
    name: "Understand",
    description: "Understand the business and the problem.",
    artifacts: ["Business context", "Problem definition", "Constraints"],
  },
  {
    code: "02",
    name: "Architect",
    description: "Determine the technology and system architecture.",
    artifacts: ["System architecture", "Technology choices", "Integration map"],
  },
  {
    code: "03",
    name: "Design",
    description: "Design the experience and interface.",
    artifacts: ["Experience flows", "Interface design", "Design system"],
  },
  {
    code: "04",
    name: "Build",
    description: "Engineer the platform.",
    artifacts: ["Platform engineering", "Backend & data", "Interfaces"],
  },
  {
    code: "05",
    name: "Connect",
    description: "Integrate existing systems and services.",
    artifacts: ["APIs", "CRM & existing systems", "Payments & services"],
  },
  {
    code: "06",
    name: "Launch",
    description: "Deploy and validate.",
    artifacts: ["Deployment", "Validation", "Handover"],
  },
  {
    code: "07",
    name: "Evolve",
    description: "Continue improving the system.",
    artifacts: ["Iteration", "New capabilities", "Ongoing improvement"],
  },
];

export const labAreas: LabArea[] = [
  { name: "AI", line: "Assistants, search and intelligent interfaces." },
  { name: "Mobility", line: "Location, routing and fleet systems." },
  { name: "Energy", line: "EV infrastructure and power technology." },
  { name: "Business Systems", line: "Operational software and POS." },
  { name: "Automation", line: "Workflows that run themselves." },
  { name: "Data", line: "Analytics and operational intelligence." },
  { name: "Creative Technology", line: "Motion, brand and generative content." },
];

export const aiUses: string[] = [
  "AI assistants",
  "Search",
  "Recommendations",
  "Analytics",
  "Automation",
  "Content generation",
  "Business intelligence",
  "Workflow assistance",
  "Intelligent interfaces",
];

export const whyBespoke = [
  {
    title: "Your workflow is unique",
    body: "Technology should adapt to the business rather than forcing the business into a rigid system.",
  },
  {
    title: "Your systems should connect",
    body: "CRM, websites, payment systems, analytics, internal tools and other platforms should work together.",
  },
  {
    title: "Your technology should evolve",
    body: "Build systems that can grow instead of rebuilding everything every few years.",
  },
];

export const integrationLayers = [
  { name: "CRM", note: "Customer records, pipelines and communication history." },
  { name: "API", note: "The contracts that let systems talk to each other." },
  { name: "August Platform", note: "The bespoke core, built around your business." },
  { name: "Database", note: "Structured data your systems share." },
  { name: "Payments", note: "Transactions and settlement flows." },
  { name: "Analytics", note: "Reporting and operational insight." },
  { name: "AI", note: "Assistants, recommendations and automation on top of your data." },
];

export const crmArchitecture = {
  title: "Reference architecture — CRM-connected website",
  caption: "A reference pattern, not a client case study.",
  nodes: ["Customer", "Website", "CRM", "Automation", "Analytics"],
};

export const technologyDomains: string[] = [
  "Web",
  "Mobile",
  "Cloud",
  "APIs",
  "CRM",
  "Data",
  "AI",
  "Automation",
  "Mapping & location",
  "Payments",
];
