import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function TeddyShowcase() {
  const [stage, setStage] = useState<"matching" | "enroute" | "trip">("enroute");
  const [fare, setFare] = useState({ standard: 650, surge: 1.2, total: 780 });

  useEffect(() => {
    const timer = setInterval(() => {
      setFare((f) => ({
        ...f,
        total: Math.round(f.standard * f.surge + (Math.random() > 0.5 ? 20 : -20)),
      }));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-bone/15 bg-[#141412] text-bone shadow-2xl">
      {/* Phone/Tablet Mobility Frame */}
      <div className="flex items-center justify-between border-b border-bone/10 bg-coal/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ember text-ink font-bold text-xs">
            T
          </div>
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-bone">TEDDY CABS MOBILITY ENGINE</span>
            <span className="ml-2 rounded bg-ember/15 px-1.5 py-0.5 font-mono text-[9px] text-ember">
              NAIROBI METRO GEO-GRID
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-ash">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>SOCKET.IO REALTIME</span>
        </div>
      </div>

      {/* Dispatcher & Rider Dual Interface */}
      <div className="grid md:grid-cols-12 gap-0 bg-ink">
        {/* Left: Dispatch Map Simulation */}
        <div className="md:col-span-7 relative h-[280px] sm:h-[340px] overflow-hidden bg-[#0d0d0c] border-b md:border-b-0 md:border-r border-bone/10">
          <svg viewBox="0 0 400 300" className="h-full w-full object-cover">
            {/* Grid Arteries */}
            <path d="M0 60 H400 M0 140 H400 M0 220 H400" stroke="#1f1f1d" strokeWidth="8" />
            <path d="M80 0 V300 M180 0 V300 M290 0 V300" stroke="#1f1f1d" strokeWidth="8" />
            <path d="M30 280 L350 40" stroke="#1f1f1d" strokeWidth="12" />

            {/* Glowing Active Route */}
            <path
              d="M80 220 L180 220 L180 140 L290 60"
              fill="none"
              stroke="rgba(255,75,36,0.3)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <motion.path
              d="M80 220 L180 220 L180 140 L290 60"
              fill="none"
              stroke="#ff4b24"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Pickup Node */}
            <circle cx="80" cy="220" r="8" fill="#f2efe8" />
            <circle cx="80" cy="220" r="16" fill="none" stroke="#f2efe8" strokeWidth="1.5" className="animate-ping" />

            {/* Destination Node */}
            <rect x="282" y="52" width="16" height="16" rx="3" fill="#ff4b24" />

            {/* Live Moving Cab */}
            <circle r="6" fill="#f2efe8" stroke="#ff4b24" strokeWidth="2">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M80 220 L180 220 L180 140 L290 60"
              />
            </circle>

            {/* Fleet Cabs on Grid */}
            {[
              { x: 180, y: 70 },
              { x: 290, y: 190 },
              { x: 120, y: 140 },
              { x: 340, y: 220 },
            ].map((c, i) => (
              <circle key={i} cx={c.x} cy={c.y} r="4" fill="#8d8a80" />
            ))}
          </svg>

          {/* Floating Telemetry Callout */}
          <div className="absolute left-3 bottom-3 rounded-lg bg-coal/90 p-2.5 backdrop-blur border border-bone/10 font-mono text-[10px] space-y-1">
            <div className="text-ember font-bold">ROUTE: Kilimani → Westlands</div>
            <div className="text-bone/70">ETA: 14 mins • 8.4 km</div>
            <div className="text-emerald-400">Driver: John M. (Toyota Fielder)</div>
          </div>
        </div>

        {/* Right: Pricing Engine & Fare Breakdown */}
        <div className="md:col-span-5 p-5 flex flex-col justify-between bg-coal/60">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-bone uppercase tracking-wider">Dynamic Fare Engine</span>
              <span className="rounded bg-ember/20 px-2 py-0.5 font-mono text-[10px] text-ember">
                Surge x{fare.surge}
              </span>
            </div>

            <div className="mt-4 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-bone/60">
                <span>Base Distance Rate:</span>
                <span>KES {fare.standard}</span>
              </div>
              <div className="flex justify-between text-bone/60">
                <span>Traffic Density Index:</span>
                <span className="text-amber-400">+20% (Uhuru Hwy congestion)</span>
              </div>
              <div className="flex justify-between text-bone/60">
                <span>Platform Commission:</span>
                <span>15%</span>
              </div>
              <div className="flex justify-between border-t border-bone/10 pt-2 text-sm font-bold text-bone">
                <span>Estimated Passenger Fare:</span>
                <span className="text-ember text-base">KES {fare.total}</span>
              </div>
            </div>

            {/* Interactive Control */}
            <div className="mt-4 flex gap-1.5">
              {(["matching", "enroute", "trip"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStage(s)}
                  className={`flex-1 rounded py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                    stage === s ? "bg-ember text-ink font-bold" : "bg-graphite text-bone/60 hover:text-bone"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded border border-bone/10 bg-graphite/60 p-2.5 font-mono text-[10px] text-bone/70">
            <div className="text-ember font-bold mb-0.5">AUGUST MOBILITY ARCHITECTURE</div>
            Continuous driver web-socket heartbeats with automated Geo-fence routing & dynamic urban tolling calculation.
          </div>
        </div>
      </div>
    </div>
  );
}
