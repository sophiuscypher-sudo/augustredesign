import { knowledgeBase, knowledgeSnapshot } from "../data/knowledge";
import { allProjects, augustProducts, clientProjects } from "../data/projects";
import { capabilities, company } from "../data/company";
import type { KnowledgeAction, KnowledgeDoc } from "../data/types";

/**
 * AUGNESS — assistant backend abstraction.
 *
 * The UI only talks to an `AssistantProvider`. Two providers exist:
 *
 *  1. KnowledgeProvider  (default)  — deterministic retrieval over August's
 *     structured data. It is NOT a language model and is labelled honestly
 *     as "guided knowledge mode" in the interface.
 *
 *  2. RemoteModelProvider           — used automatically when
 *     VITE_AUGNESS_ENDPOINT is set. It POSTs the conversation plus a
 *     compact knowledge snapshot to your endpoint:
 *
 *       POST { messages: [{role, content}], knowledge: {...}, mode: "august-augness" }
 *       →    { reply: string, actions?: KnowledgeAction[] }
 *
 *     If the endpoint fails, the UI falls back to the knowledge provider
 *     and says so.
 */

export interface AssistantMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AssistantReply {
  text: string;
  sources: string[];
  actions: KnowledgeAction[];
  mode: "knowledge" | "model";
  degraded?: boolean;
}

export interface AssistantProvider {
  id: string;
  mode: "knowledge" | "model";
  /** Honest, user-facing description of how answers are produced. */
  statusLabel: string;
  statusDetail: string;
  ask(question: string, history: AssistantMessage[]): Promise<AssistantReply>;
}

/* ── knowledge provider ─────────────────────────────────── */

const STOP = new Set([
  "the", "and", "for", "you", "your", "our", "can", "does", "what", "with", "that", "this", "have", "need", "want",
  "show", "tell", "about", "how", "are", "who", "which", "from", "into", "any", "get", "all", "has", "was", "would",
  "could", "should", "please", "me", "us", "we", "do", "is", "it", "to", "a", "an", "of", "in", "on", "i",
]);

const tokenize = (s: string) =>
  s
    .toLowerCase()
    .split(/[^a-z0-9+&]+/)
    .filter((w) => w.length > 1 && !STOP.has(w));

function scoreDoc(doc: KnowledgeDoc, tokens: string[], raw: string): number {
  let score = 0;
  const title = doc.title.toLowerCase();
  for (const t of tokens) {
    if (title.includes(t)) score += 4;
    if (doc.keywords.includes(t)) score += 2;
    else if (doc.keywords.some((k) => k.startsWith(t) && t.length > 3)) score += 1;
  }
  // exact project name mention is a strong signal
  if (doc.id.startsWith("project-")) {
    const slug = doc.id.replace("project-", "").replace(/-/g, " ");
    if (raw.includes(slug) || raw.includes(slug.replace(/ /g, ""))) score += 12;
  }
  return score;
}

const dedupe = (actions: KnowledgeAction[]) => {
  const seen = new Set<string>();
  return actions.filter((a) => {
    const key = `${a.kind}:${a.slug ?? a.target ?? a.query ?? a.label}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const byId = (id: string) => knowledgeBase.find((d) => d.id === id)!;

const START: KnowledgeAction = { kind: "brief", label: "Start a project" };

function answerFromDocs(docs: KnowledgeDoc[]): AssistantReply {
  const text = docs.map((d) => d.text).join("\n\n");
  return {
    text,
    sources: docs.map((d) => d.title),
    actions: dedupe([...docs.flatMap((d) => d.actions ?? []), START]).slice(0, 5),
    mode: "knowledge",
  };
}

/** Curated routes for the suggested questions, still sourced from the data layer. */
function routeIntent(q: string): AssistantReply | null {
  const s = q.toLowerCase();

  if (/(start|begin|kick ?off|launch) (a |the |my )?project|get started|work with (you|august)|hire|quote/.test(s)) {
    return {
      text: "Good — the best way to begin is a short project brief. Tell us what you're trying to accomplish and which systems are involved, and we'll help turn the problem into a technology system.",
      sources: ["Start a project"],
      actions: [{ kind: "brief", label: "Open the project brief" }],
      mode: "knowledge",
    };
  }

  if (/what can (august|you|we) build|what do you (build|make|do)|capabilit|services/.test(s)) {
    const text = `August designs and engineers bespoke technology around a business — ${capabilities
      .map((c) => c.name)
      .join(", ")}. We also build our own products: ${augustProducts.map((p) => p.name).join(", ")}.`;
    return {
      text,
      sources: ["What August can build"],
      actions: dedupe([
        { kind: "scroll", label: "Explore what we build", target: "capabilities" },
        { kind: "scroll", label: "See August products", target: "products" },
        START,
      ]),
      mode: "knowledge",
    };
  }

  if (/client (work|projects?)|portfolio|show me (your |the )?work|case stud/.test(s)) {
    const d = byId("client-work");
    return {
      text: `${d.text}\n\nOpen any of them for the problem, approach and architecture.`,
      sources: [d.title],
      actions: dedupe(d.actions ?? []),
      mode: "knowledge",
    };
  }

  if (/(august|your) products?|own products?|built by august|what are you building|show me products/.test(s)) {
    const d = byId("products");
    return { text: d.text, sources: [d.title], actions: dedupe(d.actions ?? []), mode: "knowledge" };
  }

  if (/custom platform|bespoke platform|build (me )?a platform|platform for/.test(s)) {
    const cap = byId("cap-custom-platforms");
    return {
      text: `${cap.text}\n\nIf you tell us what the platform needs to do and who uses it, we can shape the architecture around that.`,
      sources: [cap.title],
      actions: dedupe([
        { kind: "project", slug: "teddy-cabs", label: "See Teddy Cabs (client project)" },
        { kind: "scroll", label: "How we work", target: "process" },
        START,
      ]),
      mode: "knowledge",
    };
  }

  if (/augness|who are you|what are you\b|are you (an? )?(ai|bot|real|human)/.test(s)) {
    const d = byId("augness");
    return { text: d.text, sources: [d.title], actions: dedupe([...(d.actions ?? []), { kind: "scroll", label: "Meet Augness", target: "intelligence" }, START]), mode: "knowledge" };
  }

  if (/\bcrm\b|integrat|\bapis?\b|zoho|hubspot|salesforce/.test(s)) {
    const d = byId("crm");
    return { text: d.text, sources: [d.title], actions: dedupe(d.actions ?? []), mode: "knowledge" };
  }

  if (/\bai\b|artificial intelligence|machine learning|\bllm\b|ai-powered|intelligent system/.test(s)) {
    const d = byId("ai");
    return {
      text: `${d.text}\n\nIf you describe the workflow you want to improve, the team can scope where AI genuinely helps.`,
      sources: [d.title],
      actions: dedupe([...(d.actions ?? []), { kind: "project", slug: "madis-pos", label: "See MADIS POS (August product)" }]),
      mode: "knowledge",
    };
  }

  return null;
}

export const knowledgeProvider: AssistantProvider = {
  id: "august-knowledge",
  mode: "knowledge",
  statusLabel: "GUIDED KNOWLEDGE MODE",
  statusDetail:
    "Answers come from August's structured project and capability data. No language model is connected yet.",
  async ask(question) {
    // tiny delay so the interface reads as a considered response
    await new Promise((r) => setTimeout(r, 420));
    const routed = routeIntent(question);
    if (routed) return routed;

    const tokens = tokenize(question);
    const raw = question.toLowerCase();
    const ranked = knowledgeBase
      .map((d) => ({ d, s: scoreDoc(d, tokens, raw) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s);

    if (ranked.length === 0 || ranked[0].s < 2) {
      return {
        text: "I couldn't find that in what August has published, and I don't want to guess. I can show you what August builds, walk through client projects or August products — or you can describe the problem in a project brief and the team will take it from there.",
        sources: [],
        actions: dedupe([
          { kind: "ask", label: "What can August build?", query: "What can August build?" },
          { kind: "ask", label: "Show me client work", query: "Show me client work" },
          START,
        ]),
        mode: "knowledge",
      };
    }

    const best = ranked[0];
    const second = ranked[1];
    const takeTwo = !!second && best.s < 12 && second.s >= best.s * 0.75;
    return answerFromDocs(takeTwo ? [best.d, second.d] : [best.d]);
  },
};

/* ── remote model provider (ready for a real LLM) ───────── */

export function createRemoteProvider(endpoint: string): AssistantProvider {
  return {
    id: "august-remote-model",
    mode: "model",
    statusLabel: "AI MODEL CONNECTED",
    statusDetail: "Answers are generated by a language model grounded in August's structured data.",
    async ask(question, history) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "august-augness",
            messages: [...history, { role: "user", content: question }],
            knowledge: knowledgeSnapshot(),
          }),
        });
        if (!res.ok) throw new Error(`Augness endpoint responded ${res.status}`);
        const data = (await res.json()) as { reply?: string; actions?: KnowledgeAction[]; sources?: string[] };
        if (!data.reply) throw new Error("Empty reply");
        return {
          text: data.reply,
          sources: data.sources ?? [],
          actions: data.actions ?? [START],
          mode: "model",
        };
      } catch {
        const fallback = await knowledgeProvider.ask(question, history);
        return { ...fallback, degraded: true };
      }
    },
  };
}

const endpoint = ((import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {})
  .VITE_AUGNESS_ENDPOINT;

/** The active provider. Swap or extend here — the UI does not change. */
export const activeProvider: AssistantProvider = endpoint ? createRemoteProvider(endpoint) : knowledgeProvider;

export const OPENING_MESSAGE = {
  title: "Hi, I'm Augness.",
  body: "I can show you what August builds, explore our technology, or help you figure out what we could build for your business.",
};

export const SUGGESTED_QUESTIONS = [
  "What can August build?",
  "Show me client work",
  "Show me August products",
  "I need a custom platform",
  "Can you integrate our CRM?",
  "I need an AI-powered system",
  "I want to start a project",
];

/** Exposed for debugging / future tooling. */
export const assistantContext = {
  company: company.name,
  clientProjects: clientProjects.length,
  products: augustProducts.length,
  documents: knowledgeBase.length,
  projects: allProjects.map((p) => p.slug),
};
