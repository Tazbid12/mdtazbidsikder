import { useEffect, useRef } from "react";

/**
 * Interactive spider-web particle network.
 * - Desktop: gradient blur follows mouse; nearby nodes are pulled toward it.
 * - Mobile: DeviceOrientation (gyroscope) shifts the field for 3D parallax.
 *
 * Renders `fixed inset-0` by default so a single instance can sit behind the
 * whole app. Pass `positionClass="absolute"` for scoped use.
 */
export function SpiderWeb({
  color = "#222222",
  density = 0.00028,
  linkDistance = 160,
  nodeRadius = 1.8,
  linkAlpha = 0.55,
  nodeAlpha = 0.9,
  mouseRadius = 260,
  mousePull = 12,
  tiltStrength = 60,
  blurPx = 0,
  className = "",
  positionClass = "fixed",
}: {
  color?: string;
  density?: number;
  linkDistance?: number;
  nodeRadius?: number;
  linkAlpha?: number;
  nodeAlpha?: number;
  mouseRadius?: number;
  mousePull?: number;
  tiltStrength?: number;
  blurPx?: number;
  className?: string;
  positionClass?: "fixed" | "absolute";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const tiltRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      bx: number;
      by: number;
    }[] = [];
    let raf = 0;

    // Parse the color into an rgb triple so alpha strokes match the theme.
    const rgb = (() => {
      const m = color.match(/^#([0-9a-f]{6})$/i);
      if (m) {
        const n = parseInt(m[1], 16);
        return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
      }
      return "34,34,34";
    })();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(60, Math.min(220, Math.floor(width * height * density)));
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          bx: x,
          by: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
        };
      });
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const onOrient = (e: DeviceOrientationEvent) => {
      // gamma: left/right [-90..90], beta: front/back [-180..180]
      const g = (e.gamma ?? 0) / 25; // more sensitive
      const b = ((e.beta ?? 0) - 30) / 25;
      tiltRef.current.x = Math.max(-1.6, Math.min(1.6, g));
      tiltRef.current.y = Math.max(-1.6, Math.min(1.6, b));
    };

    const draw = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const tiltX = tiltRef.current.x * tiltStrength;
      const tiltY = tiltRef.current.y * tiltStrength;

      ctx.clearRect(0, 0, width, height);

      // gradient blur behind the web (desktop mouse only)
      if (mouseRef.current.active) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 320);
        grad.addColorStop(0, `rgba(${rgb},0.14)`);
        grad.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // update
      for (const p of particles) {
        p.bx += p.vx;
        p.by += p.vy;
        if (p.bx < 0 || p.bx > width) p.vx *= -1;
        if (p.by < 0 || p.by > height) p.vy *= -1;

        // pseudo-depth from position → deeper nodes parallax more
        const depth = 0.5 + ((p.bx + p.by) % 100) / 140;
        let x = p.bx + tiltX * depth;
        let y = p.by + tiltY * depth;

        // mouse attraction
        if (mouseRef.current.active) {
          const dx = mx - x;
          const dy = my - y;
          const d2 = dx * dx + dy * dy;
          const R = mouseRadius;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) * mousePull;
            x += (dx / d) * f;
            y += (dy / d) * f;
          }
        }
        p.x = x;
        p.y = y;
      }

      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * linkAlpha;
            ctx.strokeStyle = `rgba(${rgb},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      ctx.fillStyle = `rgba(${rgb},${nodeAlpha})`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      const DOE = (window as unknown as {
        DeviceOrientationEvent?: { requestPermission?: () => Promise<string> };
      }).DeviceOrientationEvent;
      if (DOE && typeof DOE.requestPermission === "function") {
        DOE.requestPermission()
          .then((res) => {
            if (res === "granted") {
              window.addEventListener("deviceorientation", onOrient);
            }
          })
          .catch(() => {});
      } else {
        window.addEventListener("deviceorientation", onOrient);
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, [
    color,
    density,
    linkDistance,
    nodeRadius,
    linkAlpha,
    nodeAlpha,
    mouseRadius,
    mousePull,
    tiltStrength,
  ]);

  const posClasses =
    positionClass === "fixed" ? "fixed inset-0 h-full w-full" : "absolute inset-0 h-full w-full";

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${posClasses} ${className}`}
      style={blurPx > 0 ? { filter: `blur(${blurPx}px)` } : undefined}
      aria-hidden="true"
    />
  );
}
