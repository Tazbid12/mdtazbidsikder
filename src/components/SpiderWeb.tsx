import { useEffect, useRef } from "react";

/**
 * Interactive spider-web particle network.
 * - Desktop: gradient blur follows mouse; nearby nodes are gently pulled.
 * - Mobile: DeviceOrientation (gyroscope) shifts the whole field for 3D parallax.
 */
export function SpiderWeb({
  color = "#222222",
  density = 0.00012,
  linkDistance = 140,
  className = "",
}: {
  color?: string;
  density?: number;
  linkDistance?: number;
  className?: string;
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
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      bx: number;
      by: number;
    }[] = [];
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(28, Math.min(90, Math.floor(width * height * density)));
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          bx: x,
          by: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
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
      const g = (e.gamma ?? 0) / 45; // -1..1
      const b = ((e.beta ?? 0) - 30) / 45; // center around a natural hold
      tiltRef.current.x = Math.max(-1.2, Math.min(1.2, g));
      tiltRef.current.y = Math.max(-1.2, Math.min(1.2, b));
    };

    const draw = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const tiltX = tiltRef.current.x * 28;
      const tiltY = tiltRef.current.y * 28;

      ctx.clearRect(0, 0, width, height);

      // gradient blur behind the web (desktop mouse only)
      if (mouseRef.current.active) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 260);
        grad.addColorStop(0, "rgba(34,34,34,0.10)");
        grad.addColorStop(1, "rgba(34,34,34,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // update
      for (const p of particles) {
        p.bx += p.vx;
        p.by += p.vy;
        if (p.bx < 0 || p.bx > width) p.vx *= -1;
        if (p.by < 0 || p.by > height) p.vy *= -1;

        // apply tilt (parallax) — deeper nodes move more via pseudo-depth from position
        const depth = 0.6 + ((p.bx + p.by) % 100) / 200;
        let x = p.bx + tiltX * depth;
        let y = p.by + tiltY * depth;

        // mouse attraction
        if (mouseRef.current.active) {
          const dx = mx - x;
          const dy = my - y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 180 * 180) {
            const f = (1 - Math.sqrt(d2) / 180) * 6;
            x += (dx / Math.sqrt(d2 || 1)) * f;
            y += (dy / Math.sqrt(d2 || 1)) * f;
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
            const alpha = (1 - dist / linkDistance) * 0.35;
            ctx.strokeStyle = `rgba(34,34,34,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      ctx.fillStyle = color;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
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
      // iOS 13+ needs permission; try silently, fall back gracefully
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
  }, [color, density, linkDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
