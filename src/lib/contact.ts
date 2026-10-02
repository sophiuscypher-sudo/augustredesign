import { company } from "../data/company";

/**
 * Project brief submission — a small adapter so the delivery channel can be
 * swapped without touching the UI.
 *
 *  - VITE_CONTACT_ENDPOINT → POSTs JSON to your form backend.
 *  - VITE_CONTACT_EMAIL    → opens the visitor's mail client with the brief.
 *  - neither               → the brief is composed and can be copied; the UI
 *                            says plainly that no channel is configured.
 */

export interface ProjectBrief {
  name: string;
  email: string;
  organization: string;
  needs: string[];
  message: string;
}

export type SubmitResult =
  | { status: "sent" }
  | { status: "mailto" }
  | { status: "unconfigured"; text: string }
  | { status: "error"; message: string };

export function briefToText(b: ProjectBrief): string {
  return [
    "PROJECT BRIEF — August Solutions",
    "",
    `Name: ${b.name}`,
    `Email: ${b.email}`,
    `Organization: ${b.organization || "—"}`,
    `Looking for: ${b.needs.length ? b.needs.join(", ") : "—"}`,
    "",
    "The problem:",
    b.message,
  ].join("\n");
}

export async function submitBrief(b: ProjectBrief): Promise<SubmitResult> {
  const text = briefToText(b);

  if (company.contact.formEndpoint) {
    try {
      const res = await fetch(company.contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...b, text }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      return { status: "sent" };
    } catch (e) {
      return { status: "error", message: e instanceof Error ? e.message : "Submission failed" };
    }
  }

  if (company.contact.email) {
    const href = `mailto:${company.contact.email}?subject=${encodeURIComponent(
      `Project brief — ${b.organization || b.name}`,
    )}&body=${encodeURIComponent(text)}`;
    window.location.href = href;
    return { status: "mailto" };
  }

  return { status: "unconfigured", text };
}
