import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function MadisShowcase() {
  const [activeScreen, setActiveScreen] = useState<"pos" | "inventory" | "daraja">("pos");
  const [cart, setCart] = useState<{ name: string; price: number; qty: number }[]>([
    { name: "Motor Oil 15W-40 (5L)", price: 3400, qty: 2 },
    { name: "Heavy Duty Air Filter", price: 1850, qty: 1 },
    { name: "Hydraulic Fluid (1L)", price: 950, qty: 3 },
  ]);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaid(true);
      setTimeout(() => setPaid(false), 3000);
    }, 1200);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-bone/15 bg-[#121210] text-bone shadow-2xl">
      {/* POS Device Top Bar */}
      <div className="flex items-center justify-between border-b border-bone/10 bg-coal/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-ember text-ink font-mono font-bold text-xs">
            M
          </div>
          <div>
            <span className="font-mono text-xs font-bold tracking-wider text-bone">MADIS POS OS</span>
            <span className="ml-2 rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] text-emerald-400">
              OFFLINE-READY SYNC
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-bone/10 bg-graphite p-1 text-xs">
          <button
            onClick={() => setActiveScreen("pos")}
            className={`rounded px-2.5 py-1 font-mono transition-colors ${
              activeScreen === "pos" ? "bg-ember text-ink font-bold" : "text-bone/60 hover:text-bone"
            }`}
          >
            TERMINAL
          </button>
          <button
            onClick={() => setActiveScreen("inventory")}
            className={`rounded px-2.5 py-1 font-mono transition-colors ${
              activeScreen === "inventory" ? "bg-ember text-ink font-bold" : "text-bone/60 hover:text-bone"
            }`}
          >
            INVENTORY AI
          </button>
          <button
            onClick={() => setActiveScreen("daraja")}
            className={`rounded px-2.5 py-1 font-mono transition-colors ${
              activeScreen === "daraja" ? "bg-ember text-ink font-bold" : "text-bone/60 hover:text-bone"
            }`}
          >
            DARAJA M-PESA
          </button>
        </div>
      </div>

      {/* Screen Area */}
      <div className="p-4 sm:p-6 bg-[#0f0f0e]">
        <AnimatePresence mode="wait">
          {activeScreen === "pos" && (
            <motion.div
              key="pos"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid gap-4 md:grid-cols-[1.3fr_1fr]"
            >
              {/* Quick catalogue items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-ash uppercase tracking-wider">Fast Catalogue (Barcode & Touch)</span>
                  <span className="font-mono text-[10px] text-ember">Online / Offline synced</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { name: "Spark Plug Kit (4pc)", price: 2200, category: "Ignition" },
                    { name: "Brake Pads Front", price: 4600, category: "Braking" },
                    { name: "Battery 12V 70Ah", price: 14500, category: "Electrical" },
                    { name: "LED Fog Lamp Set", price: 3800, category: "Lighting" },
                  ].map((item) => (
                    <motion.button
                      key={item.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setCart((c) => {
                          const existing = c.find((i) => i.name === item.name);
                          if (existing) {
                            return c.map((i) => (i.name === item.name ? { ...i, qty: i.qty + 1 } : i));
                          }
                          return [...c, { name: item.name, price: item.price, qty: 1 }];
                        });
                      }}
                      className="flex flex-col justify-between rounded-lg border border-bone/10 bg-graphite/60 p-3 text-left transition-colors hover:border-ember/60"
                    >
                      <span className="font-mono text-[9px] uppercase tracking-wider text-ash">{item.category}</span>
                      <span className="mt-1 font-medium text-xs text-bone">{item.name}</span>
                      <span className="mt-2 font-mono text-xs font-bold text-ember">
                        KES {item.price.toLocaleString()}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Order checkout cart */}
              <div className="flex flex-col justify-between rounded-xl border border-bone/12 bg-graphite p-4">
                <div>
                  <div className="flex items-center justify-between border-b border-bone/10 pb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-bone font-bold">Active Receipt</span>
                    <span className="font-mono text-[10px] text-emerald-400">#MD-9841</span>
                  </div>

                  <div className="mt-3 space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-bone/5">
                        <span className="truncate max-w-[150px] text-bone/80">{item.name}</span>
                        <div className="flex items-center gap-2 font-mono">
                          <span className="text-ash">x{item.qty}</span>
                          <span className="font-semibold text-bone">
                            KES {(item.price * item.qty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 border-t border-bone/10 pt-3">
                  <div className="flex items-center justify-between font-mono text-xs text-ash">
                    <span>16% VAT Incl.</span>
                    <span>KES {(subtotal * 0.16).toFixed(0)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between font-mono text-base font-bold text-bone">
                    <span>TOTAL</span>
                    <span className="text-ember">KES {subtotal.toLocaleString()}</span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    disabled={paying || paid}
                    onClick={handlePay}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2.5 font-mono text-xs font-bold tracking-wider text-zinc-950 uppercase shadow-lg transition-transform hover:bg-emerald-400"
                  >
                    {paying ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
                        Prompting M-Pesa STK Push...
                      </span>
                    ) : paid ? (
                      <span className="text-zinc-950 font-bold">✓ Transaction Settled & Syncing</span>
                    ) : (
                      <span>Instant Daraja API Settlement</span>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {activeScreen === "inventory" && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-3"
            >
              <div className="rounded-lg border border-bone/10 bg-graphite p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ember font-bold uppercase tracking-wider">AI Predictive Reordering</span>
                  <span className="font-mono text-[10px] text-ash">Updated: Just now</span>
                </div>
                <p className="mt-1 text-xs text-bone/70">
                  MADIS AI monitors velocity across all registered retail terminals and auto-drafts supplier POs before stockouts occur.
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-xs">
                  <div className="rounded border border-bone/10 bg-coal p-2">
                    <span className="text-[10px] text-ash block">FASTEST MOVING</span>
                    <span className="font-bold text-bone">Diesel Fuel Filters</span>
                  </div>
                  <div className="rounded border border-bone/10 bg-coal p-2">
                    <span className="text-[10px] text-ash block">DEPOT SYNC STATUS</span>
                    <span className="font-bold text-emerald-400">100% In Sync</span>
                  </div>
                  <div className="rounded border border-bone/10 bg-coal p-2">
                    <span className="text-[10px] text-ash block">PREDICTED RUNOUT</span>
                    <span className="font-bold text-amber-400">In 4 Days</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeScreen === "daraja" && (
            <motion.div
              key="daraja"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="rounded-lg border border-bone/10 bg-graphite p-4 font-mono text-xs"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Safaricom Daraja 2.0 Webhook Stream</span>
              </div>
              <div className="rounded bg-black/80 p-3 font-mono text-[11px] text-emerald-300/90 overflow-x-auto space-y-1">
                <div>[2026-04-18 14:22:04] POST /api/daraja/c2b-callback</div>
                <div className="text-zinc-400">{`{ "TransID": "RJK9281X", "Amount": ${subtotal}, "MSISDN": "254712***890", "BillRef": "MADIS-STORE-01" }`}</div>
                <div className="text-ember">[AUTOMATION] Ledger balanced. POS inventory decremented locally and queued to cloud.</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
