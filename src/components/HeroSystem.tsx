import { useEffect, useRef } from "react";

/**
 * HERO SYSTEM — a living architecture diagram.
 *
 * CLIENT → DISCOVERY → DESIGN → ENGINEERING → INTEGRATIONS → INTELLIGENCE → SYSTEM
 * with small capability nodes (WEB, CRM, API, AI, DATA, MOBILE, CLOUD, AUTOMATION)
 * attached to the stage they belong to.
 *
 * Rendered on a 2D canvas using a lightweight 3D projection (perspective +
 * yaw/pitch). This gives depth and cursor-driven parallax at a fraction of
 * the cost of shipping a full WebGL stack. It pauses when off-screen or when
 * the tab is hidden, drops to ~30fps and a simplified graph on mobile, and
 * renders a single static frame for users who prefer reduced motion.
 */

type Dir = "below" | "above" | "left" | "right";

interface GNode {
  id: string;
  label: string;
  kind: "main" | "sat";
  nx: number;
  ny: number;
  nz: number;
  parent?: number;
  dir: Dir;
  blurb?: string;
  phase: number;
  sx: number;
  sy: number;
  s: number;
  glow: number;
}

interface Edge {
  a: number;
  b: number;
  kind: "chain" | "sat" | "cross";
}

interface Pulse {
  a: number;
  b: number;
  p: number;
  speed: number;
}

interface Dust {
  x: number;
  y: number;
  z: number;
  r: number;
  a: number;
  ph: number;
}

const MAIN = ["CLIENT", "DISCOVERY", "DESIGN", "ENGINEERING", "INTEGRATIONS", "INTELLIGENCE", "SYSTEM"];
const BLURB = [
  "A business problem",
  "Requirements & workflows",
  "Experience & interface",
  "Platforms & systems",
  "CRM · API · automation",
  "AI · data · analytics",
  "Built around you",
];

const D_MAIN: [number, number, number][] = [
  [0.04, 0.6, 0.2],
  [0.19, 0.38, -0.1],
  [0.34, 0.5, 0.25],
  [0.5, 0.15, -0.15],
  [0.64, 0.3, 0.15],
  [0.77, -0.15, -0.1],
  [0.9, -0.38, 0.2],
];

const SAT_D: { label: string; parent: number; pos: [number, number, number] }[] = [
  { label: "WEB", parent: 2, pos: [0.4, 0.26, 0.3] },
  { label: "MOBILE", parent: 3, pos: [0.44, -0.1, 0.2] },
  { label: "AUTOMATION", parent: 4, pos: [0.67, 0.02, -0.2] },
  { label: "CRM", parent: 4, pos: [0.6, 0.6, 0.1] },
  { label: "API", parent: 4, pos: [0.77, 0.47, 0.25] },
  { label: "DATA", parent: 5, pos: [0.66, -0.42, 0.1] },
  { label: "AI", parent: 5, pos: [0.89, 0.05, -0.1] },
  { label: "CLOUD", parent: 6, pos: [0.76, -0.62, 0.2] },
];

const SAT_M: { label: string; parent: number; pos: [number, number, number] }[] = [
  { label: "WEB", parent: 2, pos: [-0.26, -1.7, 0.1] },
  { label: "API", parent: 4, pos: [0.26, -1.7, 0.1] },
  { label: "AI", parent: 5, pos: [0.52, 1.7, 0.1] },
  { label: "DATA", parent: 3, pos: [0, 1.7, 0.1] },
];

function buildGraph(mobile: boolean) {
  const nodes: GNode[] = [];
  MAIN.forEach((label, i) => {
    const p: [number, number, number] = mobile
      ? [-0.78 + i * 0.26, i % 2 === 0 ? -0.6 : 0.6, i % 2 ? 0.1 : -0.1]
      : D_MAIN[i];
    nodes.push({
      id: label,
      label,
      kind: "main",
      nx: p[0],
      ny: p[1],
      nz: p[2],
      dir: mobile ? (i % 2 === 0 ? "below" : "above") : "below",
      blurb: BLURB[i],
      phase: i * 1.7,
      sx: 0,
      sy: 0,
      s: 1,
      glow: 0,
    });
  });
  (mobile ? SAT_M : SAT_D).forEach((s, j) => {
    nodes.push({
      id: s.label,
      label: s.label,
      kind: "sat",
      nx: s.pos[0],
      ny: s.pos[1],
      nz: s.pos[2],
      parent: s.parent,
      dir: "below",
      phase: 3 + j * 1.3,
      sx: 0,
      sy: 0,
      s: 1,
      glow: 0,
    });
  });

  const edges: Edge[] = [];
  for (let i = 0; i < MAIN.length - 1; i++) edges.push({ a: i, b: i + 1, kind: "chain" });
  nodes.forEach((n, i) => {
    if (n.kind === "sat" && n.parent !== undefined) edges.push({ a: n.parent, b: i, kind: "sat" });
  });
  const find = (l: string) => nodes.findIndex((n) => n.label === l);
  const cross: [string, string][] = mobile ? [] : [["API", "CRM"], ["AI", "DATA"], ["WEB", "DISCOVERY"]];
  cross.forEach(([x, y]) => {
    const a = find(x);
    const b = find(y);
    if (a >= 0 && b >= 0) edges.push({ a, b, kind: "cross" });
  });
  return { nodes, edges };
}

function buildDust(count: number): Dust[] {
  // deterministic pseudo-random so the layout is stable between renders
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: count }, () => ({
    x: rnd() * 2 - 1,
    y: rnd() * 2 - 1,
    z: rnd() * 1.4 - 0.8,
    r: 0.6 + rnd() * 1.1,
    a: 0.12 + rnd() * 0.25,
    ph: rnd() * 6.28,
  }));
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const TRAVEL = 5.6;
const HOLD = 1.3;
const PAUSE = 1.4;
const CYCLE = TRAVEL + HOLD + PAUSE;

export default function HeroSystem({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let mobile = false;
    let graph = buildGraph(false);
    let dust = buildDust(40);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: false };
    const cam = { yaw: 0, pitch: 0 };
    let pulses: Pulse[] = [];
    let t = reduced ? TRAVEL : 0;
    let lastNode = -1;
    let prevC = 0;
    let ambient = 0;
    let hovered = -1;
    let running = false;
    let visible = true;
    let raf = 0;
    let last = 0;
    let lastDraw = 0;

    const FONT_MONO = '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      const nextMobile = W < 768;
      if (nextMobile !== mobile || graph.nodes.length === 0) {
        mobile = nextMobile;
        graph = buildGraph(mobile);
        dust = buildDust(mobile ? 22 : 44);
      }
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!mouse.active) {
        mouse.x = mouse.tx = W * 0.7;
        mouse.y = mouse.ty = H * 0.45;
      }
      if (reduced || !running) draw();
    };

    // world → screen
    const project = (wx: number, wy: number, wz: number) => {
      const cy = Math.cos(cam.yaw);
      const sy = Math.sin(cam.yaw);
      const cp = Math.cos(cam.pitch);
      const sp = Math.sin(cam.pitch);
      const x1 = wx * cy + wz * sy;
      const z1 = -wx * sy + wz * cy;
      const y1 = wy * cp - z1 * sp;
      const z2 = wy * sp + z1 * cp;
      const f = 900;
      const s = f / (f + z2);
      return { x: W / 2 + x1 * s, y: H / 2 + y1 * s, s };
    };

    const layoutNodes = () => {
      const ux = W / 2;
      const uy = H / 2;
      const uz = Math.min(W, H) / 2;
      graph.nodes.forEach((n) => {
        const fx = Math.sin(t * 0.55 + n.phase) * (mobile ? 3 : 6);
        const fy = Math.cos(t * 0.45 + n.phase * 1.3) * (mobile ? 3 : 6);
        const fz = Math.sin(t * 0.35 + n.phase) * 18;
        let wx: number;
        let wy: number;
        let wz: number;
        if (mobile) {
          wx = n.nx * ux;
          // mobile band sits ~150px above the bottom edge: screen y = H - 150 + ny*60 → world y = screen - H/2
          wy = H - 150 + n.ny * 60 - H / 2;
          wz = n.nz * uz * 0.5;
        } else {
          wx = n.nx * ux;
          wy = n.ny * uy;
          wz = n.nz * uz;
        }
        const p = project(wx + fx, wy + fy, wz + fz);
        let sx = p.x;
        let sy = p.y;
        // cursor attraction
        if (mouse.active && !mobile) {
          const dx = mouse.x - sx;
          const dy = mouse.y - sy;
          const d = Math.hypot(dx, dy);
          const R = 170;
          if (d < R) {
            const k = (1 - d / R) ** 2 * 14;
            sx += (dx / (d || 1)) * k;
            sy += (dy / (d || 1)) * k;
          }
        }
        n.sx = sx;
        n.sy = sy;
        n.s = p.s;
      });
    };

    const pill = (x: number, y: number, w: number, h: number) => {
      const r = h / 2;
      ctx.beginPath();
      ctx.moveTo(x - w / 2 + r, y - h / 2);
      ctx.lineTo(x + w / 2 - r, y - h / 2);
      ctx.arc(x + w / 2 - r, y, r, -Math.PI / 2, Math.PI / 2);
      ctx.lineTo(x - w / 2 + r, y + h / 2);
      ctx.arc(x - w / 2 + r, y, r, Math.PI / 2, (Math.PI * 3) / 2);
      ctx.closePath();
    };

    const glowDot = (x: number, y: number, rad: number, alpha: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, `rgba(255,75,36,${alpha})`);
      g.addColorStop(1, "rgba(255,75,36,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    };

    const signal = () => {
      const c = t % CYCLE;
      if (c < TRAVEL) return { sig: (c / TRAVEL) * 6, fade: 1, c, phase: 0 as const };
      if (c < TRAVEL + HOLD) return { sig: 6, fade: 1 - 0.7 * ((c - TRAVEL) / HOLD), c, phase: 1 as const };
      return { sig: 6, fade: 0.3 * (1 - (c - TRAVEL - HOLD) / PAUSE), c, phase: 2 as const };
    };

    const update = (dt: number) => {
      // camera follows cursor
      if (mouse.active && !mobile) {
        mouse.tx = mouse.x;
        mouse.ty = mouse.y;
      }
      const targetYaw = mouse.active && !mobile ? clamp((mouse.x / W - 0.5) * 0.32, -0.16, 0.16) : Math.sin(t * 0.12) * 0.03;
      const targetPitch = mouse.active && !mobile ? clamp((mouse.y / H - 0.5) * -0.18, -0.09, 0.09) : Math.cos(t * 0.1) * 0.015;
      cam.yaw += (targetYaw - cam.yaw) * Math.min(1, dt * 3);
      cam.pitch += (targetPitch - cam.pitch) * Math.min(1, dt * 3);

      const s = signal();
      if (s.c < prevC) lastNode = -1;
      prevC = s.c;
      const cur = s.phase === 0 ? Math.floor(s.sig + 0.0001) : 6;
      if (cur !== lastNode) {
        lastNode = cur;
        const n = graph.nodes[cur];
        if (n) n.glow = 1;
        graph.edges.forEach((e) => {
          if (e.kind === "sat" && e.a === cur) pulses.push({ a: e.a, b: e.b, p: 0, speed: 0.75 + Math.random() * 0.35 });
        });
      }

      ambient += dt;
      if (ambient > 1.4) {
        ambient = 0;
        const pool = graph.edges.filter((e) => e.kind !== "chain");
        const e = pool[Math.floor(Math.random() * pool.length)];
        if (e) {
          const flip = Math.random() > 0.5;
          pulses.push({ a: flip ? e.b : e.a, b: flip ? e.a : e.b, p: 0, speed: 0.45 + Math.random() * 0.3 });
        }
      }

      pulses = pulses.filter((p) => {
        p.p += p.speed * dt;
        if (p.p >= 1) {
          const target = graph.nodes[p.b];
          if (target) target.glow = Math.max(target.glow, 0.85);
          return false;
        }
        return true;
      });

      graph.nodes.forEach((n) => {
        n.glow = Math.max(0, n.glow - dt * 0.85);
      });

      // hover detection
      hovered = -1;
      if (mouse.active && !mobile) {
        let best = 40;
        graph.nodes.forEach((n, i) => {
          const d = Math.hypot(n.sx - mouse.x, n.sy - mouse.y);
          if (d < best) {
            best = d;
            hovered = i;
          }
        });
      }
    };

    function draw() {
      ctx.clearRect(0, 0, W, H);
      layoutNodes();
      const { sig, fade, phase, c } = signal();
      const nodes = graph.nodes;
      const sizeK = mobile ? 0.8 : 1;

      // dust field
      const ux = W / 2;
      const uy = H / 2;
      const uz = Math.min(W, H) / 2;
      dust.forEach((d) => {
        const p = project(d.x * ux + Math.sin(t * 0.2 + d.ph) * 10, d.y * uy + Math.cos(t * 0.17 + d.ph) * 10, d.z * uz);
        ctx.fillStyle = `rgba(242,239,232,${d.a * clamp(p.s, 0.6, 1.3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, d.r * p.s, 0, Math.PI * 2);
        ctx.fill();
      });

      // cursor halo
      if (mouse.active && !mobile) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 190);
        g.addColorStop(0, "rgba(255,75,36,0.09)");
        g.addColorStop(1, "rgba(255,75,36,0)");
        ctx.fillStyle = g;
        ctx.fillRect(mouse.x - 190, mouse.y - 190, 380, 380);
      }

      // edges
      graph.edges.forEach((e) => {
        const A = nodes[e.a];
        const B = nodes[e.b];
        const depth = 0.55 + 0.45 * clamp(((A.s + B.s) / 2 - 0.85) / 0.3, 0, 1);
        let alpha = e.kind === "chain" ? 0.3 : e.kind === "sat" ? 0.16 : 0.1;
        if (hovered === e.a || hovered === e.b) alpha *= 2.2;
        ctx.strokeStyle = `rgba(242,239,232,${alpha * depth})`;
        ctx.lineWidth = e.kind === "chain" ? 1.1 : 0.8;
        if (e.kind !== "chain") ctx.setLineDash([2, 5]);
        ctx.beginPath();
        ctx.moveTo(A.sx, A.sy);
        ctx.lineTo(B.sx, B.sy);
        ctx.stroke();
        ctx.setLineDash([]);

        if (e.kind === "chain") {
          const fill = clamp(sig - e.a, 0, 1);
          if (fill > 0 && fade > 0.02) {
            ctx.strokeStyle = `rgba(255,75,36,${0.75 * fade})`;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(A.sx, A.sy);
            ctx.lineTo(lerp(A.sx, B.sx, fill), lerp(A.sy, B.sy, fill));
            ctx.stroke();
          }
        }
      });

      // cursor → nearest nodes
      if (mouse.active && !mobile) {
        const near = nodes
          .map((n, i) => ({ i, d: Math.hypot(n.sx - mouse.x, n.sy - mouse.y) }))
          .filter((x) => x.d < 230)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2);
        near.forEach(({ i, d }) => {
          ctx.strokeStyle = `rgba(242,239,232,${0.2 * (1 - d / 230)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(nodes[i].sx, nodes[i].sy);
          ctx.stroke();
        });
      }

      // pulses
      pulses.forEach((p) => {
        const A = nodes[p.a];
        const B = nodes[p.b];
        const x = lerp(A.sx, B.sx, p.p);
        const y = lerp(A.sy, B.sy, p.p);
        const tx = lerp(A.sx, B.sx, Math.max(0, p.p - 0.12));
        const ty = lerp(A.sy, B.sy, Math.max(0, p.p - 0.12));
        ctx.strokeStyle = "rgba(255,75,36,0.55)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        glowDot(x, y, 9, 0.8);
        ctx.fillStyle = "#fff4ee";
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // master signal
      if (phase === 0) {
        const i = Math.min(5, Math.floor(sig));
        const A = nodes[i];
        const B = nodes[i + 1];
        const f = sig - i;
        const x = lerp(A.sx, B.sx, f);
        const y = lerp(A.sy, B.sy, f);
        glowDot(x, y, 22 * sizeK, 0.85);
        ctx.fillStyle = "#fff4ee";
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      // arrival flare on SYSTEM
      if (phase === 1) {
        const sysN = nodes[6];
        const k = (c - TRAVEL) / HOLD;
        ctx.strokeStyle = `rgba(255,75,36,${0.6 * (1 - k)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(sysN.sx, sysN.sy, (14 + k * 70) * sizeK, 0, Math.PI * 2);
        ctx.stroke();
      }

      // nodes
      ctx.textBaseline = "middle";
      nodes.forEach((n, i) => {
        const g = clamp(n.glow + (hovered === i ? 0.7 : 0), 0, 1);
        const col = `rgba(${Math.round(lerp(242, 255, g))},${Math.round(lerp(239, 75, g))},${Math.round(lerp(232, 36, g))},`;

        if (n.kind === "sat") {
          ctx.font = `500 ${mobile ? 8.5 : 9.5}px ${FONT_MONO}`;
          const w = ctx.measureText(n.label).width + (mobile ? 12 : 16);
          const h = mobile ? 16 : 19;
          if (g > 0.03) glowDot(n.sx, n.sy, 26 * n.s, 0.28 * g);
          pill(n.sx, n.sy, w, h);
          ctx.fillStyle = "rgba(11,11,10,0.88)";
          ctx.fill();
          ctx.strokeStyle = `${col}${0.3 + 0.6 * g})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = `${col}${0.62 + 0.38 * g})`;
          ctx.textAlign = "center";
          ctx.fillText(n.label, n.sx, n.sy + 0.5);
          return;
        }

        const isSys = i === 6;
        const r = (isSys ? 11 : 8) * n.s * sizeK;
        if (g > 0.02) glowDot(n.sx, n.sy, 40 * n.s * (0.7 + g * 0.5) * sizeK, 0.4 * g);
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = "#0b0b0a";
        ctx.fill();
        ctx.strokeStyle = `${col}${0.5 + 0.45 * g})`;
        ctx.lineWidth = isSys ? 1.6 : 1.2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, 2.6 * n.s * sizeK, 0, Math.PI * 2);
        ctx.fillStyle = g > 0.3 ? "#ff4b24" : "rgba(242,239,232,0.85)";
        ctx.fill();
        if (isSys) {
          ctx.save();
          ctx.setLineDash([3, 5]);
          ctx.lineDashOffset = -t * 10;
          ctx.strokeStyle = "rgba(255,75,36,0.55)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.sx, n.sy, r + 7 * sizeK, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // label
        ctx.font = `500 ${mobile ? 8.5 : 10}px ${FONT_MONO}`;
        ctx.fillStyle = `${col}${hovered === i ? 1 : 0.55 + 0.45 * g})`;
        ctx.textAlign = "center";
        const ly = n.dir === "above" ? n.sy - r - 11 : n.sy + r + 14;
        ctx.fillText(n.label.split("").join(mobile ? "" : "\u200A"), n.sx, ly);
        if (hovered === i && n.blurb) {
          ctx.font = `400 10px ${FONT_MONO}`;
          ctx.fillStyle = "rgba(141,138,128,1)";
          ctx.fillText(n.blurb, n.sx, ly + 15);
        }
      });
    }

    const schedule = () => {
      if (running && !raf) raf = requestAnimationFrame(frame);
    };

    function frame(now: number) {
      raf = 0;
      if (!running) return;
      if (!last) last = now;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (mobile && now - lastDraw < 32) {
        schedule();
        return;
      }
      lastDraw = now;
      t += dt;
      update(dt);
      draw();
      schedule();
    }

    const start = () => {
      if (reduced || running || !visible || document.hidden) return;
      running = true;
      last = 0;
      schedule();
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = canvas.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      mouse.active = inside;
      if (inside) {
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      }
    };
    const onVis = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(wrap);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    resize();
    if (reduced) {
      layoutNodes();
      draw();
    } else {
      start();
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
