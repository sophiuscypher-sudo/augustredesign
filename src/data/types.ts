/**
 * August Solutions — structured data layer.
 *
 * Everything the site renders (and everything Augness can reference) is
 * described by these types. Client work and August-owned products are
 * deliberately kept in separate collections and never mixed.
 */

export type ProjectType = "client" | "product";

/** Which bespoke interface illustration a project uses. */
export type VisualKey =
  | "teddy-cabs"
  | "skypaints"
  | "yancy-graphics"
  | "siaya"
  | "archways"
  | "azma-yetu"
  | "brownfleet"
  | "madis-pos"
  | "raiden-grid";

export type CapabilityId =
  | "digital-experiences"
  | "custom-platforms"
  | "business-systems"
  | "crm-integrations"
  | "ai-intelligence"
  | "mobility"
  | "commerce"
  | "creative-technology";

export interface ArchitectureDiagram {
  title: string;
  caption?: string;
  /** Ordered nodes, rendered as a connected system. */
  nodes: string[];
}

export interface Project {
  name: string;
  slug: string;
  type: ProjectType;
  /** Short label shown on tags: "CLIENT PROJECT" | "AUGUST PRODUCT" */
  label: string;
  category: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  /** The experience, in plain words. */
  experience: string;
  /** Confirmed, named technologies only. Leave empty until verified. */
  technologies: string[];
  /** What the build covers (technology domains, not stack claims). */
  highlights: string[];
  capabilities: CapabilityId[];
  architecture?: ArchitectureDiagram;
  /** Only ever populated with verified, real outcomes. */
  outcome: string | null;
  /** Add real assets here later: they are lazy-loaded by the case study. */
  images: string[];
  screenshots: string[];
  liveUrl: string | null;
  overviewUrl: string | null;
  visual: VisualKey;
  /** Optional free-form notes for editors/Augness (e.g. classification rationale). */
  note?: string;
}

export interface Capability {
  id: CapabilityId;
  index: string;
  name: string;
  summary: string;
  detail: string;
  ships: string[];
  /** project slugs that demonstrate this capability */
  projects: string[];
  /** extra honest note when there is no specific named project */
  note?: string;
}

export interface ProcessStep {
  code: string;
  name: string;
  description: string;
  artifacts: string[];
}

export interface BespokeStep {
  name: string;
  line: string;
}

export interface LabArea {
  name: string;
  line: string;
}

export interface KnowledgeAction {
  kind: "project" | "scroll" | "brief" | "ask";
  label: string;
  slug?: string;
  target?: string;
  query?: string;
}

export interface KnowledgeDoc {
  id: string;
  kind: "company" | "capability" | "project" | "product" | "process" | "ai" | "contact" | "technology" | "lab";
  title: string;
  text: string;
  keywords: string[];
  actions?: KnowledgeAction[];
}
