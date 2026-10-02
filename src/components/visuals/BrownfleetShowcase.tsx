import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BrownfleetShowcaseProps {
  compact?: boolean;
}

export function BrownfleetShowcase({ compact = false }: BrownfleetShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"live" | "fuel" | "safety">("live");

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-bone/15 bg-[#faf9f5] text-zinc-900 shadow-2xl transition-all">
      {/* Browser chrome header */}
      <div className="flex items-center justify-between border-b border-zinc-200/80 bg-white/95 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <div className="ml-3 hidden sm:flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 font-mono text-[11px] text-zinc-500">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="7" width="12" height="7" rx="1.5" />
              <path d="M4.5 7V4.5a3.5 3.5 0 017 0V7" />
            </svg>
            <span>brownfleet.co.ke</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase text-zinc-400">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          <span>Interactive Showcase • August Product</span>
        </div>
      </div>

      {/* Website Frame (Authentic recreation of Brownfleet site from user screenshot) */}
      <div className="p-4 sm:p-7 md:p-9 bg-[#faf9f5]">
        {/* Sub-badge */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-3.5 py-1 text-[11px] font-medium text-zinc-600 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Trusted by 340+ Kenyan fleets • Nairobi • Mombasa • Eldoret</span>
          </motion.div>
        </div>

        {/* Hero Title */}
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl"
            style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}
          >
            Control your fleet <br />
            <span className="text-zinc-950">like never before.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-zinc-600"
          >
            Real-time GPS tracking, fuel-theft alerts and driver analytics built for Kenyan
            roads — from the Northern Corridor to the last mile in Nairobi CBD. All in one platform.
          </motion.p>
        </div>

        {/* Floating Mini Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="mx-auto mt-6 flex max-w-3xl items-center justify-between rounded-xl border border-zinc-200 bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-zinc-950">
              <rect x="2" y="7" width="20" height="13" rx="2" />
              <path d="M16 7V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v3" />
              <circle cx="12" cy="13" r="2" />
            </svg>
            <span className="font-mono text-xs font-bold tracking-widest text-zinc-950">BROWNFLEET</span>
          </div>

          <div className="hidden md:flex items-center gap-6 font-medium text-xs text-zinc-600">
            <button
              onClick={() => setActiveTab("live")}
              className={`transition-colors hover:text-zinc-950 ${activeTab === "live" ? "font-bold text-zinc-950" : ""}`}
            >
              Live Tracking
            </button>
            <button
              onClick={() => setActiveTab("fuel")}
              className={`transition-colors hover:text-zinc-950 ${activeTab === "fuel" ? "font-bold text-zinc-950" : ""}`}
            >
              Fuel Intelligence
            </button>
            <button
              onClick={() => setActiveTab("safety")}
              className={`transition-colors hover:text-zinc-950 ${activeTab === "safety" ? "font-bold text-zinc-950" : ""}`}
            >
              Driver Safety
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-[11px] text-zinc-400">EN / SW</span>
            <button className="rounded-lg bg-zinc-950 px-3.5 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-105 active:scale-95 shadow-sm">
              Book a Demo
            </button>
          </div>
        </motion.div>

        {/* The Live Hero Vehicle Showcase with telemetry overlay */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="relative mx-auto mt-6 overflow-hidden rounded-2xl border border-zinc-800/10 shadow-xl"
        >
          {/* Truck Image Banner */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-zinc-900">
            <img
              src="https://images.pexels.com/photos/8994766/pexels-photo-8994766.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
              alt="Brownfleet commercial haulage tracking across African corridor"
              className="h-full w-full object-cover object-center filter saturate-110"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

            {/* Top telemetry tag */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="absolute left-3 top-3 sm:left-5 sm:top-5 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-1.5 text-[11px] font-medium text-zinc-800 shadow-md backdrop-blur"
            >
              <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
              <span className="font-semibold text-zinc-950">LIVE • KDG 482T</span>
              <span className="text-zinc-500">Mai Mahiu → Naivasha • 78 km/h</span>
            </motion.div>

            {/* Right Telemetry Badge */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="absolute right-3 top-3 sm:right-5 sm:top-5 hidden sm:flex items-center gap-2 rounded-lg bg-zinc-950/80 px-3 py-1.5 text-[11px] text-zinc-100 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="font-mono text-zinc-400">FUEL LEVEL:</span>
              <span className="font-bold text-emerald-400">94% (Nominal)</span>
            </motion.div>

            {/* Interactive Mode Callout */}
            <AnimatePresence mode="wait">
              {activeTab === "fuel" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-zinc-900/90 p-4 text-white backdrop-blur-md border border-zinc-700/60 shadow-2xl max-w-xs text-center"
                >
                  <div className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">ULTRASONIC TANK TELEMETRY</div>
                  <div className="text-2xl font-black mt-1">420 Litres</div>
                  <div className="text-xs text-zinc-300 mt-1">Anti-siphoning sensor active • Zero fuel dips detected</div>
                </motion.div>
              )}
              {activeTab === "safety" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-zinc-900/90 p-4 text-white backdrop-blur-md border border-zinc-700/60 shadow-2xl max-w-xs text-center"
                >
                  <div className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">DRIVER SCORECARD</div>
                  <div className="text-2xl font-black mt-1">98 / 100</div>
                  <div className="text-xs text-zinc-300 mt-1">Safe braking • Speed compliance on Great Rift Valley Escarpment</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom 4 Key Stats Bar in Truck Frame */}
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 sm:grid-cols-4 divide-x divide-zinc-700/60 border-t border-zinc-700/50 bg-zinc-950/75 p-3 text-white backdrop-blur-md">
              <div className="px-3 py-1">
                <div className="font-mono text-base sm:text-xl font-bold tracking-tight">12,480</div>
                <div className="font-mono text-[9px] sm:text-[10px] uppercase text-zinc-400">Vehicles tracked</div>
              </div>
              <div className="px-3 py-1">
                <div className="font-mono text-base sm:text-xl font-bold tracking-tight text-emerald-400">99.4%</div>
                <div className="font-mono text-[9px] sm:text-[10px] uppercase text-zinc-400">Signal uptime</div>
              </div>
              <div className="px-3 py-1">
                <div className="font-mono text-base sm:text-xl font-bold tracking-tight">47</div>
                <div className="font-mono text-[9px] sm:text-[10px] uppercase text-zinc-400">Counties covered</div>
              </div>
              <div className="px-3 py-1">
                <div className="font-mono text-base sm:text-xl font-bold tracking-tight text-amber-300">24/7</div>
                <div className="font-mono text-[9px] sm:text-[10px] uppercase text-zinc-400">Nairobi control room</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Partners Marquee */}
        <div className="mt-8 text-center">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            MOVING GOODS FOR EAST AFRICA'S BEST-RUN FLEETS
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
            <span className="hover:text-zinc-800 transition-colors">SUPERIOR TRANSPORT</span>
            <span className="hover:text-zinc-800 transition-colors">FARMERS CHOICE</span>
            <span className="hover:text-zinc-800 transition-colors">SIGINON LOGISTICS</span>
            <span className="hover:text-zinc-800 transition-colors">MULTIPLE HAULIERS</span>
            <span className="hover:text-zinc-800 transition-colors">TWIGA FOODS</span>
            <span className="hover:text-zinc-800 transition-colors">BOLLORÉ</span>
          </div>
        </div>

        {/* "Useful for business." Section from screenshot */}
        {!compact && (
          <div className="mt-12 rounded-2xl bg-white p-6 sm:p-9 shadow-sm border border-zinc-200/80">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                Useful for business.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500">
                Our telematics improve efficiency, protect your cargo and keep drivers safe on every corridor.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {/* Metric Card 1 */}
              <motion.div
                whileHover={{ y: -4, borderColor: "#ff4b24" }}
                className="rounded-xl border border-zinc-200/90 bg-zinc-50/50 p-5 transition-all hover:shadow-md"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold">TIME SAVING</div>
                <div className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tighter text-zinc-950">20%</div>
                <div className="mt-1 font-semibold text-xs sm:text-sm text-zinc-800">less manual admin</div>
                <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                  Automated trip sheets, fuel reports and mileage logs free your office team for work that matters.
                </p>
              </motion.div>

              {/* Metric Card 2 */}
              <motion.div
                whileHover={{ y: -4, borderColor: "#ff4b24" }}
                className="rounded-xl border border-zinc-200/90 bg-zinc-50/50 p-5 transition-all hover:shadow-md"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 font-bold">SAFETY</div>
                <div className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tighter text-zinc-950">50%</div>
                <div className="mt-1 font-semibold text-xs sm:text-sm text-zinc-800">fewer road incidents</div>
                <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                  Harsh braking, speeding and night-driving alerts change driver behaviour within the first month.
                </p>
              </motion.div>

              {/* Metric Card 3 */}
              <motion.div
                whileHover={{ y: -4, borderColor: "#ff4b24" }}
                className="rounded-xl border border-zinc-200/90 bg-zinc-50/50 p-5 transition-all hover:shadow-md"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-amber-600 font-bold">EFFICIENCY</div>
                <div className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tighter text-zinc-950">30%</div>
                <div className="mt-1 font-semibold text-xs sm:text-sm text-zinc-800">cut in fuel spend</div>
                <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                  Route optimisation plus siphoning detection stops litres disappearing between depots.
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {/* Footer info from screenshot */}
        <div className="mt-8 border-t border-zinc-200 pt-6 text-[11px] text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-zinc-900">BROWNFLEET KENYA</span>
              <span>• Fleet telematics engineered in Nairobi for African roads.</span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-400">
              <span className="hover:text-zinc-700 cursor-pointer">SOLUTIONS</span>
              <span className="hover:text-zinc-700 cursor-pointer">PLATFORM</span>
              <span className="hover:text-zinc-700 cursor-pointer">COMPANY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
