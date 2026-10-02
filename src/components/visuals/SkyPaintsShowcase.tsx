import { useState } from "react";

export function SkyPaintsShowcase() {
  const [sliderPos, setSliderPos] = useState(55);
  const [activePalette, setActivePalette] = useState(0);

  const colors = [
    { name: "Savannah Terracotta", hex: "#b45339", accent: "#f5eee9" },
    { name: "Rift Valley Sage", hex: "#607c65", accent: "#f0f4f1" },
    { name: "Ochre Earth", hex: "#c98f3b", accent: "#fcf6ed" },
    { name: "Nairobi Slate Teal", hex: "#2f5660", accent: "#edf4f5" },
  ];

  const current = colors[activePalette];

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-bone/15 bg-[#181816] text-bone shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-bone/10 bg-coal/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-500 text-ink font-bold text-xs">
            🎨
          </div>
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-bone">SKYPAINTS COLOR LAB</span>
            <span className="ml-2 rounded bg-amber-500/15 px-1.5 py-0.5 font-mono text-[9px] text-amber-400">
              REAL-TIME ARCHITECTURAL SHIELD
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-ash">
          <span>DRAG SLIDER TO REVEAL TRANSFORMATION</span>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-0">
        {/* Interactive Comparison Canvas */}
        <div className="md:col-span-8 relative h-[280px] sm:h-[340px] overflow-hidden bg-[#242420] select-none border-b md:border-b-0 md:border-r border-bone/10">
          {/* Base Unpainted/Old House */}
          <div className="absolute inset-0 flex items-center justify-center bg-stone-300">
            <svg viewBox="0 0 500 320" className="h-full w-full object-cover">
              {/* Sky background */}
              <rect width="500" height="320" fill="#d9d5c7" />
              {/* Ground */}
              <rect y="240" width="500" height="80" fill="#9e9885" />
              {/* Roof */}
              <polygon points="120,140 250,50 380,140" fill="#54524c" />
              {/* Walls Before */}
              <rect x="150" y="140" width="200" height="110" fill="#b8b3a0" />
              {/* Door & Windows */}
              <rect x="230" y="180" width="40" height="70" fill="#787363" />
              <rect x="175" y="160" width="35" height="40" fill="#d0cbba" stroke="#787363" strokeWidth="3" />
              <rect x="290" y="160" width="35" height="40" fill="#d0cbba" stroke="#787363" strokeWidth="3" />
              <text x="250" y="295" textAnchor="middle" fill="#54524c" fontSize="13" fontFamily="monospace" fontWeight="bold">
                BEFORE: WEATHERED CONCRETE / OXIDIZED
              </text>
            </svg>
          </div>

          {/* New Transformed/Painted Overlay clipped by slider */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 500 320" className="h-full w-full object-cover">
                {/* Sun & Sky */}
                <rect width="500" height="320" fill="#e8f0f2" />
                <circle cx="420" cy="60" r="30" fill="#ff4b24" opacity="0.85" />
                {/* Clean Landscaping */}
                <rect y="240" width="500" height="80" fill="#4d6642" />
                {/* Architectural Roof */}
                <polygon points="120,140 250,50 380,140" fill="#1f2426" />
                {/* Transformed Wall with Selected Pigment */}
                <rect x="150" y="140" width="200" height="110" fill={current.hex} />
                {/* Premium Teak Door & White Trim Windows */}
                <rect x="230" y="180" width="40" height="70" fill="#fcfcfc" />
                <rect x="233" y="183" width="34" height="67" fill="#5a331a" />
                <rect x="175" y="160" width="35" height="40" fill="#ffffff" stroke="#1f2426" strokeWidth="3" />
                <rect x="290" y="160" width="35" height="40" fill="#ffffff" stroke="#1f2426" strokeWidth="3" />
                <text x="250" y="295" textAnchor="middle" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold">
                  AFTER: SKYPAINTS RESIN PROTECTION ({current.name.toUpperCase()})
                </text>
              </svg>
            </div>
          </div>

          {/* Draggable Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-2xl"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-950 font-bold shadow-lg text-xs">
              ↔
            </div>
          </div>

          {/* Interactive touch slider helper */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
            aria-label="Color before after transformation"
          />
        </div>

        {/* Right: Architectural Swatch Palette Picker */}
        <div className="md:col-span-4 p-5 flex flex-col justify-between bg-coal/70">
          <div>
            <span className="font-mono text-xs font-bold text-bone uppercase tracking-wider">Pigment Formulations</span>
            <p className="mt-1 text-xs text-bone/60">Select an August-engineered weather coat to test live on the facade.</p>

            <div className="mt-4 space-y-2">
              {colors.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={() => setActivePalette(idx)}
                  className={`flex w-full items-center justify-between rounded-lg border p-2.5 text-left transition-all ${
                    activePalette === idx
                      ? "border-ember bg-graphite shadow-sm"
                      : "border-bone/10 bg-coal/40 hover:border-bone/30"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-5 w-5 rounded-md border border-white/20 shadow-inner"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="font-medium text-xs text-bone">{c.name}</span>
                  </div>
                  {activePalette === idx && (
                    <span className="font-mono text-[10px] text-ember font-bold">APPLIED</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded border border-bone/10 bg-graphite/50 p-2.5 font-mono text-[10px] text-bone/70">
            <span className="text-ember font-bold block mb-0.5">AUGUST CREATIVE TECH</span>
            Custom WebGL/SVG shader rendering with UV weather-simulation layers, developed for SkyPaints Kenya.
          </div>
        </div>
      </div>
    </div>
  );
}
