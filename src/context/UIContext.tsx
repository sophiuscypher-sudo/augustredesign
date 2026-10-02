import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { KnowledgeAction } from "../data/types";

interface UIState {
  augnessOpen: boolean;
  augnessSeed: { q: string; n: number } | null;
  openAugness: (question?: string) => void;
  closeAugness: () => void;
  activeProject: string | null;
  openProject: (slug: string) => void;
  closeProject: () => void;
  briefOpen: boolean;
  openBrief: () => void;
  closeBrief: () => void;
  scrollToSection: (id: string) => void;
  runAction: (a: KnowledgeAction) => void;
}

const Ctx = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [augnessOpen, setAugnessOpen] = useState(false);
  const [augnessSeed, setSeed] = useState<{ q: string; n: number } | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [briefOpen, setBriefOpen] = useState(false);

  const openAugness = useCallback((question?: string) => {
    setAugnessOpen(true);
    if (question) setSeed({ q: question, n: Date.now() });
  }, []);
  const closeAugness = useCallback(() => setAugnessOpen(false), []);

  const openProject = useCallback((slug: string) => {
    setAugnessOpen(false);
    setActiveProject(slug);
  }, []);
  const closeProject = useCallback(() => setActiveProject(null), []);

  const openBrief = useCallback(() => {
    setAugnessOpen(false);
    setBriefOpen(true);
  }, []);
  const closeBrief = useCallback(() => setBriefOpen(false), []);

  const scrollToSection = useCallback((id: string) => {
    setActiveProject(null);
    setBriefOpen(false);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }, []);

  const runAction = useCallback(
    (a: KnowledgeAction) => {
      switch (a.kind) {
        case "project":
          if (a.slug) openProject(a.slug);
          break;
        case "scroll":
          if (a.target) {
            setAugnessOpen(false);
            scrollToSection(a.target);
          }
          break;
        case "brief":
          openBrief();
          break;
        case "ask":
          openAugness(a.query ?? a.label);
          break;
      }
    },
    [openAugness, openBrief, openProject, scrollToSection],
  );

  const value = useMemo<UIState>(
    () => ({
      augnessOpen,
      augnessSeed,
      openAugness,
      closeAugness,
      activeProject,
      openProject,
      closeProject,
      briefOpen,
      openBrief,
      closeBrief,
      scrollToSection,
      runAction,
    }),
    [
      augnessOpen,
      augnessSeed,
      openAugness,
      closeAugness,
      activeProject,
      openProject,
      closeProject,
      briefOpen,
      openBrief,
      closeBrief,
      scrollToSection,
      runAction,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUI(): UIState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useUI must be used inside UIProvider");
  return v;
}
