import { useEffect, useRef } from "react";

// Throttles high-frequency events to save performance
function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  } as T;
}

// Linear interpolation for buttery smooth gyro movements
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

export function SpiderWeb({
  color = "#222222",
  density = 0.0004, // Increased by ~20%
  linkDistance = 140,
  nodeRadius = 1.7,
  linkAlpha = 0.35,
  nodeAlpha = 0.7,
  mouseRadius = 300, // Larger net to grab more particles
  mousePull = 1.5, // Strong, permanent physical pull
  tiltStrength = 100, 
  overscan = 300, 
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
  overscan?: number;
  className?: string;
  positionClass?: "fixed" | "absolute";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const targetTilt = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentTilt = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; bx: number; by: number; depth: number }[]>([]);

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

      fieldMinX = -overscan;
      fieldMaxX = width + overscan;
      fieldMinY = -overscan;
      fieldMaxY = height + overscan;
      const fieldW = fieldMaxX - fieldMinX;
      const fieldH = fieldMaxY - fieldMinY;

      if (particlesRef.current.length === 0) {
        const isMobile = window.innerWidth < 768;
        // Increased max particle limits by ~25%
        const maxParticles = isMobile ? 75 : 150; 
        const count = Math.max(50, Math.min(maxParticles, Math.floor(fieldW * fieldH * density)));
        
        particlesRef.current = Array.from({ length: count }, () => {
          const x = fieldMinX + Math.random() * fieldW;
          const y = fieldMinY + Math.random() * fieldH;
          return {
            x, y, bx: x, by: y,
            // Increased base velocity by ~25%
            vx: (Math.random() - 0.5) * 0.1, 
            vy: (Math.random() - 0.5) * 0.1,
            depth: 0.3 + Math.random() * 0.7 
          };
        });
      }
    };

    const onMouse = throttle((e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    }, 16);

    const onLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const onOrient = throttle((e: DeviceOrientationEvent) => {
      const g = (e.gamma ?? 0) / 45; 
      const b = ((e.beta ?? 0) - 45) / 45; 
      targetTilt.current.x = Math.max(-1.5, Math.min(1.5, g));
      targetTilt.current.y = Math.max(-1.5, Math.min(1.5, b));
    }, 16);

    const draw = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      
      currentTilt.current.x = lerp(currentTilt.current.x, targetTilt.current.x, 0.05);
      currentTilt.current.y = lerp(currentTilt.current.y, targetTilt.current.y, 0.05);
      
      const tiltX = currentTilt.current.x * tiltStrength;
      const tiltY = currentTilt.current.y * tiltStrength;

      ctx.clearRect(0, 0, width, height);
      const fieldW = fieldMaxX - fieldMinX;
      const fieldH = fieldMaxY - fieldMinY;

      const particles = particlesRef.current;

      for (const p of particles) {
        // MOUSE INTERACTION - Physically drag the particles and alter their momentum
        if (mouseRef.current.active && window.matchMedia("(hover: hover)").matches) {
          const currentRenderX = p.bx + tiltX * p.depth;
          const currentRenderY = p.by + tiltY * p.depth;
          const dx = mx - currentRenderX;
          const dy = my - currentRenderY;
          const distSq = dx * dx + dy * dy;
          const R = mouseRadius;
          
          if (distSq < R * R) {
            const dist = Math.sqrt(distSq) || 1;
            const force = (1 - dist / R) * mousePull;
            
            // Drag the actual base coordinates
            p.bx += (dx / dist) * force;
            p.by += (dy / dist) * force;
            
            // Inject momentum so they continue flowing in the direction of the mouse
            p.vx += (dx / dist) * force * 0.008;
            p.vy += (dy / dist) * force * 0.008;
            
            // Speed limit to prevent particles from flying off too fast
            const maxV = 0.5;
            p.vx = Math.max(-maxV, Math.min(maxV, p.vx));
            p.vy = Math.max(-maxV, Math.min(maxV, p.vy));
          }
        }

        // Base continuous movement
        p.bx += p.vx;
        p.by += p.vy;
        
        // Wrap around the infinite 360 space
        if (p.bx < fieldMinX) p.bx += fieldW;
        else if (p.bx > fieldMaxX) p.bx -= fieldW;
        if (p.by < fieldMinY) p.by += fieldH;
        else if (p.by > fieldMaxY) p.by -= fieldH;

        // Apply gyro parallax
        p.x = p.bx + tiltX * p.depth;
        p.y = p.by + tiltY * p.depth;
      }

      // Filter visible nodes to optimize rendering
      const margin = linkDistance;
      const visible = particles.filter(
        (p) => p.x > -margin && p.x < width + margin && p.y > -margin && p.y < height + margin
      );

      // Draw connections
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

      // Draw nodes
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

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      const DOE = (window as any).DeviceOrientationEvent;
      if (DOE && typeof DOE.requestPermission === "function") {
        DOE.requestPermission().then((res: string) => {
          if (res === "granted") {
            window.addEventListener("deviceorientation", onOrient);
          }
        }).catch(() => {});
      } else {
        window.addEventListener("deviceorientation", onOrient);
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, [color, density, linkDistance, nodeRadius, linkAlpha, nodeAlpha, mouseRadius, mousePull, tiltStrength, overscan]);

  const posClasses = positionClass === "fixed" ? "fixed inset-0 h-full w-full" : "absolute inset-0 h-full w-full";

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none z-[-1] ${posClasses} ${className}`}
      aria-hidden="true"
    />
  );
}
