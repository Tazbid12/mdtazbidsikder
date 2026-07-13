import { useEffect, useRef } from "react";

/**
 * Interactive spider-web particle network.
 * - Desktop: gradient blur follows mouse; nearby nodes are pulled toward it.
 * - Mobile: DeviceOrientation (gyroscope) shifts the field for 3D parallax.
 *
 * Particles are spawned across an oversized virtual field (viewport + margin)
 * so mouse pulls and device tilt never expose empty edges.
 */
export function SpiderWeb({
  color = "#222222",
  density = 0.00042,
  linkDistance = 170,
  nodeRadius = 1.9,
  linkAlpha = 0.55,
  nodeAlpha = 0.9,
  mouseRadius = 300,
  mousePull = 18,
  tiltStrength = 90,
  blurPx = 0,
  className = "",
  positionClass = "fixed",
  overscan = 260,
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
  overscan?: number;
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
    let fieldMinX = 0;
    let fieldMaxX = 0;
    let fieldMinY = 0;
    let fieldMaxY = 0;
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

      // Oversized virtual field so tilt/mouse never reveal empty edges.
      fieldMinX = -overscan;
      fieldMaxX = width + overscan;
      fieldMinY = -overscan;
      fieldMaxY = height + overscan;
      const fieldW = fieldMaxX - fieldMinX;
      const fieldH = fieldMaxY - fieldMinY;

      const count = Math.max(90, Math.min(360, Math.floor(fieldW * fieldH * density)));
      particles = Array.from({ length: count }, () => {
        const x = fieldMinX + Math.random() * fieldW;
        const y = fieldMinY + Math.random() * fieldH;
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
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouseRef.current.x = t.clientX - rect.left;
      mouseRef.current.y = t.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onOrient = (e: DeviceOrientationEvent) => {
      // More sensitive: smaller divisor → more movement per degree of tilt.
      const g = (e.gamma ?? 0) / 18;
      const b = ((e.beta ?? 0) - 30) / 18;
      tiltRef.current.x = Math.max(-2, Math.min(2, g));
      tiltRef.current.y = Math.max(-2, Math.min(2, b));
    };

    const draw = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const tiltX = tiltRef.current.x * tiltStrength;
      const tiltY = tiltRef.current.y * tiltStrength;

      ctx.clearRect(0, 0, width, height);

      if (mouseRef.current.active) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 340);
        grad.addColorStop(0, `rgba(${rgb},0.14)`);
        grad.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      const fieldW = fieldMaxX - fieldMinX;
      const fieldH = fieldMaxY - fieldMinY;

      for (const p of particles) {
        p.bx += p.vx;
        p.by += p.vy;
        // Wrap around the oversized field so the mesh never depletes.
        if (p.bx < fieldMinX) p.bx += fieldW;
        else if (p.bx > fieldMaxX) p.bx -= fieldW;
        if (p.by < fieldMinY) p.by += fieldH;
        else if (p.by > fieldMaxY) p.by -= fieldH;

        const depth = 0.5 + ((p.bx + p.by) % 100) / 140;
        let x = p.bx + tiltX * depth;
        let y = p.by + tiltY * depth;

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

      // Only draw links for particles reasonably close to the viewport.
      const margin = linkDistance;
      const visible = particles.filter(
        (p) => p.x > -margin && p.x < width + margin && p.y > -margin && p.y < height + margin,
      );

      ctx.lineWidth = 1;
      for (let i = 0; i < visible.length; i++) {
        for (let j = i + 1; j < visible.length; j++) {
          const a = visible[i];
          const b = visible[j];
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

      ctx.fillStyle = `rgba(${rgb},${nodeAlpha})`;
      for (const p of visible) {
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
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);

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
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchend", onLeave);
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
    overscan,
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
