import type { Project } from "../../data/types";
import { ArchwaysVisual, AzmaVisual, SiayaVisual, SkyVisual, TeddyVisual, YancyVisual } from "./ClientVisuals";
import { MadisVisual, RaidenVisual } from "./ProductVisuals";
import { BrownfleetShowcase } from "./BrownfleetShowcase";
import { MadisShowcase } from "./MadisShowcase";
import { TeddyShowcase } from "./TeddyShowcase";
import { RaidenShowcase } from "./RaidenShowcase";
import { SkyPaintsShowcase } from "./SkyPaintsShowcase";
import { YancyShowcase } from "./YancyShowcase";
import { SiayaShowcase, ArchwaysShowcase, AzmaShowcase } from "./OrganizationVisuals";

/** Aspect ratios that suit each August product's interface illustration. */
export const PRODUCT_ASPECT: Record<string, string> = {
  brownfleet: "w-full",
  "madis-pos": "w-full",
  "raiden-grid": "w-full",
};

/** Resolves a project to its bespoke visual identity or showcase. */
export function ProjectVisual({
  project,
  compact = false,
  interactive = false,
  useShowcase = false,
}: {
  project: Project;
  compact?: boolean;
  interactive?: boolean;
  useShowcase?: boolean;
}) {
  // When high-fidelity showcase is requested (e.g. within CaseStudy or detailed view)
  if (useShowcase) {
    switch (project.visual) {
      case "brownfleet":
        return <BrownfleetShowcase compact={compact} />;
      case "madis-pos":
        return <MadisShowcase />;
      case "teddy-cabs":
        return <TeddyShowcase />;
      case "raiden-grid":
        return <RaidenShowcase compact={compact} />;
      case "skypaints":
        return <SkyPaintsShowcase />;
      case "yancy-graphics":
        return <YancyShowcase />;
      case "siaya":
        return <SiayaShowcase />;
      case "archways":
        return <ArchwaysShowcase />;
      case "azma-yetu":
        return <AzmaShowcase />;
    }
  }

  // Default interactive card visuals
  switch (project.visual) {
    case "teddy-cabs":
      return <TeddyVisual compact={compact} />;
    case "skypaints":
      return <SkyVisual compact={compact} interactive={interactive} />;
    case "yancy-graphics":
      return <YancyVisual />;
    case "siaya":
      return <SiayaVisual compact={compact} />;
    case "archways":
      return <ArchwaysVisual compact={compact} />;
    case "azma-yetu":
      return <AzmaVisual />;
    case "brownfleet":
      return <BrownfleetShowcase compact={true} />;
    case "madis-pos":
      return <MadisVisual />;
    case "raiden-grid":
      return <RaidenVisual />;
  }
}
