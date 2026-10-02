import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function SiayaShowcase() {
  const [activeModule, setActiveModule] = useState<"programs" | "impact" | "community">("programs");

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-bone/15 bg-[#141513] text-bone shadow-2xl">
      {/* Platform Header */}
      <div className="flex items-center justify-between border-b border-bone/10 bg-coal/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-600 text-bone font-bold text-xs">
            S
          </div>
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-bone">SIAYA EMPOWERMENT NETWORK</span>
            <span className="ml-2 rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] text-emerald-400">
              COMMUNITY IMPACT PORTAL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-bone/10 bg-graphite p-1 text-xs">
          <button
            onClick={() => setActiveModule("programs")}
            className={`rounded px-2.5 py-1 font-mono transition-colors ${
              activeModule === "programs" ? "bg-emerald-600 text-white font-bold" : "text-bone/60 hover:text-bone"
            }`}
          >
            INITIATIVES
          </button>
          <button
            onClick={() => setActiveModule("impact")}
            className={`rounded px-2.5 py-1 font-mono transition-colors ${
              activeModule === "impact" ? "bg-emerald-600 text-white font-bold" : "text-bone/60 hover:text-bone"
            }`}
          >
            METRICS
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 bg-[#0f110f]">
        <AnimatePresence mode="wait">
          {activeModule === "programs" && (
            <motion.div
              key="programs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid gap-3 sm:grid-cols-3"
            >
              {[
                { title: "Youth Agri-Tech Incubation", location: "Alego Usonga", beneficiaries: "1,200 Youth", tag: "Agricultural" },
                { title: "Digital Literacy & Coding", location: "Bondo Hub", beneficiaries: "850 Students", tag: "Education" },
                { title: "Clean Water Community Grid", location: "Rarieda Ward", beneficiaries: "4,600 Households", tag: "Infrastructure" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-bone/10 bg-graphite/60 p-4 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-wider">{item.tag}</span>
                    <h5 className="font-bold text-sm text-bone mt-1">{item.title}</h5>
                    <p className="font-mono text-xs text-bone/60 mt-2">Location: {item.location}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-bone/10 font-mono text-xs flex justify-between">
                    <span className="text-ash">Reach:</span>
                    <span className="font-bold text-emerald-300">{item.beneficiaries}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeModule === "impact" && (
            <motion.div
              key="impact"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-bone/10 bg-graphite/40 p-5 font-mono text-xs"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-emerald-400 font-bold uppercase">County Real-time Transparency Dashboard</span>
                <span className="text-ash">Verified Audit Pipeline</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="rounded bg-black/40 p-3 border border-bone/5">
                  <div className="text-2xl font-black text-bone">6,650+</div>
                  <div className="text-[10px] text-ash mt-1">DIRECT PARTICIPANTS</div>
                </div>
                <div className="rounded bg-black/40 p-3 border border-bone/5">
                  <div className="text-2xl font-black text-emerald-400">14</div>
                  <div className="text-[10px] text-ash mt-1">ACTIVE WARDS</div>
                </div>
                <div className="rounded bg-black/40 p-3 border border-bone/5">
                  <div className="text-2xl font-black text-bone">100%</div>
                  <div className="text-[10px] text-ash mt-1">MOBILE ACCESSIBLE</div>
                </div>
                <div className="rounded bg-black/40 p-3 border border-bone/5">
                  <div className="text-2xl font-black text-emerald-400">0</div>
                  <div className="text-[10px] text-ash mt-1">SERVER DOWNTIME</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ArchwaysShowcase() {
  const [activeTab, setActiveTab] = useState<"publications" | "analytics">("publications");

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-bone/15 bg-[#171715] text-bone shadow-2xl">
      <div className="flex items-center justify-between border-b border-bone/10 bg-coal/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-stone-200 text-ink font-bold text-xs">
            A
          </div>
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-bone">ARCHWAYS RESEARCH FIRM</span>
            <span className="ml-2 rounded bg-bone/10 px-1.5 py-0.5 font-mono text-[9px] text-bone/70">
              POLICY & MACRO-ECONOMIC REPOSITORY
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-bone/10 bg-graphite p-1 text-xs">
          <button
            onClick={() => setActiveTab("publications")}
            className={`rounded px-2.5 py-1 font-mono transition-colors ${
              activeTab === "publications" ? "bg-bone text-ink font-bold" : "text-bone/60 hover:text-bone"
            }`}
          >
            INDEXED PAPERS
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`rounded px-2.5 py-1 font-mono transition-colors ${
              activeTab === "analytics" ? "bg-bone text-ink font-bold" : "text-bone/60 hover:text-bone"
            }`}
          >
            DATA VISUALIZER
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 bg-[#111110]">
        <div className="space-y-2.5 font-mono text-xs">
          {[
            { id: "AW-2026-08", title: "Trade Flow Shifts in the East African Community Corridor", date: "Q1 2026", reads: "4.2k views" },
            { id: "AW-2025-41", title: "Monetary Policy Transmission & Mobile Liquidity Velociy in Kenya", date: "Q4 2025", reads: "8.9k views" },
            { id: "AW-2025-19", title: "Renewable Energy Transition in Sub-Saharan Heavy Manufacturing", date: "Q3 2025", reads: "6.1k views" },
          ].map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-bone/10 bg-graphite/50 hover:border-bone/30 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-ember font-bold">{doc.id}</span>
                <span className="font-sans font-medium text-bone text-sm">{doc.title}</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-ash">
                <span>{doc.date}</span>
                <span className="text-bone/80">{doc.reads}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AzmaShowcase() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-bone/15 bg-[#171615] text-bone shadow-2xl">
      <div className="flex items-center justify-between border-b border-bone/10 bg-coal/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-600 text-bone font-bold text-xs">
            AY
          </div>
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-bone">AZMA YETU CBO PLATFORM</span>
            <span className="ml-2 rounded bg-amber-500/15 px-1.5 py-0.5 font-mono text-[9px] text-amber-400">
              COMMUNITY-BASED ORGANIZATION PORTAL
            </span>
          </div>
        </div>
        <div className="font-mono text-[10px] text-ash">MOBILE-FIRST WEBAPP</div>
      </div>

      <div className="p-4 sm:p-6 bg-[#11110f] grid sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-bone/10 bg-graphite/60 p-4">
          <div className="font-mono text-[10px] text-ember font-bold">MEMBERSHIP SYNC</div>
          <div className="text-xl font-bold mt-1">2,480 Registered</div>
          <div className="text-xs text-bone/60 mt-1 font-sans">USSD + SMS fallback sync enabled for offline registration across villages.</div>
        </div>
        <div className="rounded-xl border border-bone/10 bg-graphite/60 p-4">
          <div className="font-mono text-[10px] text-emerald-400 font-bold">PROJECT TRACKER</div>
          <div className="text-xl font-bold mt-1">18 Active Initiatives</div>
          <div className="text-xs text-bone/60 mt-1 font-sans">Public ledger updates for donors and county oversight committees.</div>
        </div>
        <div className="rounded-xl border border-bone/10 bg-graphite/60 p-4">
          <div className="font-mono text-[10px] text-amber-400 font-bold">GRANTS & STEWARDSHIP</div>
          <div className="text-xl font-bold mt-1">100% Audited</div>
          <div className="text-xs text-bone/60 mt-1 font-sans">Automated receipt ledgering with multi-currency donor settlement.</div>
        </div>
      </div>
    </div>
  );
}
