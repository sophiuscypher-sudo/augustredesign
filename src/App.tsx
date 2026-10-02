import { UIProvider } from "./context/UIContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TwoSides from "./components/TwoSides";
import BespokeBuild from "./components/BespokeBuild";
import WhatWeBuild from "./components/WhatWeBuild";
import Integrations from "./components/Integrations";
import WhyBespoke from "./components/WhyBespoke";
import ClientWork from "./components/ClientWork";
import CreativeTech from "./components/CreativeTech";
import Products from "./components/Products";
import Lab from "./components/Lab";
import Intelligence from "./components/Intelligence";
import Process from "./components/Process";
import About from "./components/About";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Augness from "./components/Augness";
import CaseStudy from "./components/CaseStudy";
import ProjectBriefModal from "./components/ProjectBriefModal";

/**
 * Visitor journey:
 * ARRIVAL → DISCOVERY → CAPABILITY → PROOF → OWNERSHIP → INTELLIGENCE → ACTION
 */
export default function App() {
  return (
    <UIProvider>
      <div className="relative min-h-screen bg-ink text-bone">
        <Nav />
        <main>
          {/* arrival */}
          <Hero />
          <TwoSides />
          {/* discovery & capability */}
          <BespokeBuild />
          <WhatWeBuild />
          <Integrations />
          <WhyBespoke />
          {/* proof */}
          <ClientWork />
          <CreativeTech />
          {/* ownership */}
          <Products />
          <Lab />
          {/* intelligence */}
          <Intelligence />
          <Process />
          <About />
          {/* action */}
          <CallToAction />
        </main>
        <Footer />

        <Augness />
        <CaseStudy />
        <ProjectBriefModal />
      </div>
    </UIProvider>
  );
}
