import { useState } from "react";

interface RaidenShowcaseProps {
  compact?: boolean;
}

export function RaidenShowcase({ compact = false }: RaidenShowcaseProps) {
  const [selectedStation, setSelectedStation] = useState<number>(0);
  const [vehicleSoc, setVehicleSoc] = useState<number>(38);

  const stations = [
    {
      id: "hub-01",
      name: "Sarit Centre Mega Hub",
      location: "Westlands, Nairobi",
      type: "DC Ultra-Fast (120 kW)",
      available: "4 / 6 Ports",
      powerSource: "70% Geothermal Grid + Solar Rooftop",
      rate: "KES 42 / kWh",
    },
    {
      id: "hub-02",
      name: "The Hub Karen Depot",
      location: "Karen, Nairobi",
      type: "DC Fast (60 kW)",
      available: "2 / 4 Ports",
      powerSource: "100% Green Tariff (EPRA certified)",
      rate: "KES 38 / kWh",
    },
    {
      id: "hub-03",
      name: "Mombasa Road Logistics Center",
      location: "Industrial Area / JKIA corridor",
      type: "Commercial Heavy Fleet (180 kW Dual)",
      available: "3 / 3 Ports",
      powerSource: "Dedicated Substation Feeder",
      rate: "KES 35 / kWh",
    },
  ];

  const curr = stations[selectedStation];

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-bone/15 bg-[#0b0f14] text-bone shadow-2xl">
      {/* Grid Network Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 bg-[#0e1620] px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-cyan-400 text-ink font-bold text-xs">
            ⚡
          </div>
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-cyan-300">RAIDEN GRID EV INFRASTRUCTURE</span>
            <span className="ml-2 rounded bg-cyan-500/15 px-1.5 py-0.5 font-mono text-[9px] text-cyan-400">
              KENYA POWER E-MOBILITY TARIFF COMPLIANT
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-cyan-400/80">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>GRID FREQUENCY: 50.02 Hz</span>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-0">
        {/* Left: Energy Map View */}
        <div className="md:col-span-7 relative h-[280px] sm:h-[340px] overflow-hidden bg-[#070b0e] border-b md:border-b-0 md:border-r border-cyan-500/10">
          <svg viewBox="0 0 500 320" className="h-full w-full object-cover">
            {/* Grid Mesh */}
            {[60, 120, 180, 240].map((y) => (
              <line key={`gy-${y}`} x1="0" y1={y} x2="500" y2={y} stroke="rgba(6,182,212,0.08)" strokeDasharray="4 6" />
            ))}
            {[100, 200, 300, 400].map((x) => (
              <line key={`gx-${x}`} x1={x} y1="0" x2={x} y2="320" stroke="rgba(6,182,212,0.08)" strokeDasharray="4 6" />
            ))}

            {/* Interconnected high voltage corridors */}
            <path
              d="M60 260 L180 180 L290 220 L420 100 L320 60 L180 180"
              fill="none"
              stroke="rgba(6,182,212,0.25)"
              strokeWidth="2"
            />
            <path
              d="M60 260 L180 180 L290 220 L420 100"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
              className="flow-line"
            />

            {/* Charging Hub Stations */}
            {[
              { x: 180, y: 180, idx: 0 },
              { x: 290, y: 220, idx: 1 },
              { x: 420, y: 100, idx: 2 },
            ].map((st) => {
              const isSel = selectedStation === st.idx;
              return (
                <g
                  key={st.idx}
                  onClick={() => setSelectedStation(st.idx)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  {isSel && (
                    <circle cx={st.x} cy={st.y} r="22" fill="none" stroke="#06b6d4" strokeWidth="1.5" className="animate-ping" />
                  )}
                  <circle
                    cx={st.x}
                    cy={st.y}
                    r="12"
                    fill={isSel ? "#06b6d4" : "#0e1620"}
                    stroke="#06b6d4"
                    strokeWidth="2"
                  />
                  <text
                    x={st.x}
                    y={st.y + 4}
                    textAnchor="middle"
                    fontSize="10"
                    fill={isSel ? "#0b0f14" : "#06b6d4"}
                    fontWeight="bold"
                  >
                    ⚡
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick HUD Tag */}
          <div className="absolute left-3 bottom-3 rounded-lg bg-black/85 p-3 backdrop-blur border border-cyan-500/20 font-mono text-[11px] space-y-1">
            <div className="text-cyan-400 font-bold">{curr.name}</div>
            <div className="text-bone/70">{curr.location} • {curr.type}</div>
            <div className="text-emerald-400">Available: {curr.available}</div>
          </div>
        </div>

        {/* Right: Smart Dispatch & Power Component Recommendation */}
        <div className="md:col-span-5 p-5 flex flex-col justify-between bg-[#0e1620]">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider">EV Discovery Engine</span>
              <span className="font-mono text-[10px] text-cyan-400/90 rounded bg-cyan-500/20 px-2 py-0.5">
                Live Tariff
              </span>
            </div>

            {/* Station Details */}
            <div className="mt-4 rounded-lg border border-cyan-500/20 bg-black/40 p-3 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-bone/60">
                <span>Power Source:</span>
                <span className="text-emerald-300 text-right max-w-[150px]">{curr.powerSource}</span>
              </div>
              <div className="flex justify-between text-bone/60">
                <span>Tariff Rate:</span>
                <span className="text-cyan-300 font-bold">{curr.rate}</span>
              </div>
              <div className="flex justify-between text-bone/60">
                <span>Recommended Port:</span>
                <span className="text-bone">CCS2 Type 2 Plug</span>
              </div>
            </div>

            {/* Simulated EV battery slider */}
            {!compact && (
              <div className="mt-4 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-bone/70">
                  <span>Current Vehicle SoC:</span>
                  <span className="text-cyan-400 font-bold">{vehicleSoc}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={vehicleSoc}
                  onChange={(e) => setVehicleSoc(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-bone/40">
                  <span>Est. Charge Time: ~24 min to 80%</span>
                  <span>Battery Health: 99.2%</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            {stations.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setSelectedStation(idx)}
                className={`flex-1 rounded py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  selectedStation === idx
                    ? "bg-cyan-400 text-ink font-bold shadow-md shadow-cyan-500/30"
                    : "bg-black/40 text-cyan-400/70 border border-cyan-500/20 hover:text-cyan-300"
                }`}
              >
                Hub {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
