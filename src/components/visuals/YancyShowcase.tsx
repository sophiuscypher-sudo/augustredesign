import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function YancyShowcase() {
  const [activeMedia, setActiveMedia] = useState<"video" | "brand" | "campaign">("video");

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-bone/15 bg-[#120a08] text-bone shadow-2xl">
      {/* Studio Header */}
      <div className="flex items-center justify-between border-b border-ember/20 bg-coal/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-ember text-ink font-bold text-xs">
            Y
          </div>
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-bone">YANCY GRAPHICS CREATIVE PIPELINE</span>
            <span className="ml-2 rounded bg-ember/20 px-1.5 py-0.5 font-mono text-[9px] text-ember">
              GEN-AI VIDEO & MOTION SUITE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-bone/10 bg-graphite p-1 text-xs">
          <button
            onClick={() => setActiveMedia("video")}
            className={`rounded px-2.5 py-1 font-mono transition-colors ${
              activeMedia === "video" ? "bg-ember text-ink font-bold" : "text-bone/60 hover:text-bone"
            }`}
          >
            AI VIDEO
          </button>
          <button
            onClick={() => setActiveMedia("brand")}
            className={`rounded px-2.5 py-1 font-mono transition-colors ${
              activeMedia === "brand" ? "bg-ember text-ink font-bold" : "text-bone/60 hover:text-bone"
            }`}
          >
            BRAND SYSTEM
          </button>
          <button
            onClick={() => setActiveMedia("campaign")}
            className={`rounded px-2.5 py-1 font-mono transition-colors ${
              activeMedia === "campaign" ? "bg-ember text-ink font-bold" : "text-bone/60 hover:text-bone"
            }`}
          >
            CAMPAIGN
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 bg-gradient-to-b from-[#180d0a] to-[#0e0705]">
        <AnimatePresence mode="wait">
          {activeMedia === "video" && (
            <motion.div
              key="video"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-12 gap-5 items-center"
            >
              {/* Generative Video Viewport */}
              <div className="md:col-span-7 relative aspect-video overflow-hidden rounded-xl border border-ember/30 bg-black shadow-inner">
                {/* Simulated generative frames */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#ff4b24_0%,_transparent_60%)] opacity-30 animate-pulse" />

                <div className="relative z-10 text-center p-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-black/60 px-3 py-1 font-mono text-[10px] text-ember backdrop-blur mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-ember animate-ping" />
                    <span>AI AD GENERATION RENDERER • 60 FPS</span>
                  </div>
                  <h4 className="font-extrabold text-2xl tracking-tighter text-bone">
                    DYNAMIC SOCIAL CAMPAIGN
                  </h4>
                  <p className="font-mono text-xs text-bone/60 mt-1">Multi-format vertical and wide banner rendering</p>
                </div>

                {/* Simulated playback bar */}
                <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-lg bg-black/70 p-2 backdrop-blur border border-white/10 font-mono text-[10px]">
                  <span className="text-ember font-bold">▶ 00:08 / 00:30</span>
                  <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-ember w-1/3 animate-pulse" />
                  </div>
                  <span className="text-bone/50">4K PRORES</span>
                </div>
              </div>

              {/* Pipeline Breakdown */}
              <div className="md:col-span-5 space-y-3 font-mono text-xs">
                <div className="rounded-lg border border-bone/10 bg-coal/80 p-3">
                  <span className="text-[10px] text-ash uppercase block">PIPELINE STAGE</span>
                  <span className="text-ember font-bold text-sm">Automated Creative Synthesis</span>
                  <p className="font-sans text-xs text-bone/70 mt-1">
                    August built a customized pipeline linking generative models with brand token constraints to produce rapid commercial variants for social ad networks.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="rounded border border-bone/10 bg-coal/60 p-2">
                    <span className="text-[10px] text-ash block">RENDER ACCELERATION</span>
                    <span className="font-bold text-bone">4x Faster</span>
                  </div>
                  <div className="rounded border border-bone/10 bg-coal/60 p-2">
                    <span className="text-[10px] text-ash block">ASPECT VARIANTS</span>
                    <span className="font-bold text-emerald-400">1:1, 9:16, 16:9</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeMedia === "brand" && (
            <motion.div
              key="brand"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center"
            >
              {["Visual Tokenology", "Typography Rules", "Generative Motion", "Export Engine"].map((item, i) => (
                <div key={item} className="rounded-xl border border-ember/20 bg-coal/60 p-5">
                  <span className="font-mono text-ember font-bold text-lg block mb-1">0{i + 1}</span>
                  <span className="font-semibold text-sm text-bone">{item}</span>
                  <p className="text-[11px] text-bone/60 mt-2 font-mono">Engineered design system synced with React components.</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeMedia === "campaign" && (
            <motion.div
              key="campaign"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-bone/10 bg-coal/60 p-5 font-mono text-xs space-y-2"
            >
              <div className="text-ember font-bold">AUTOMATED OMNICHANNEL AD DISTRIBUTION</div>
              <p className="text-bone/70 font-sans">
                Digital assets deployed across TikTok, Instagram Reels and Billboard networks with real-time impression analytics dashboards.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
