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
  density = 0.0003,
  linkDistance = 140,
  nodeRadius = 1.7,
  linkAlpha = 0.35,
  nodeAlpha = 0.7,
  mouseRadius = 240,
  mousePull = 8, // Gentle pull towards the mouse
  tiltStrength = 100, // How far the camera pans on tilt
  overscan = 300, // Massive off-screen generation for 360 feel
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
  
  // Track mouse position
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  // Target tilt (from sensors) and Current tilt (smoothed)
  const targetTilt = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentTilt = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Store particles persistently to prevent the "scroll shuffle"
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

      // ONLY generate particles if the array is empty (initial load).
      // This permanently fixes the scroll shuffle bug on mobile.
      if (particlesRef.current.length === 0) {
        const isMobile = window.innerWidth < 768;
        const maxParticles = isMobile ? 60 : 120; 
        const count = Math.max(40, Math.min(maxParticles, Math.floor(fieldW * fieldH * density)));
        
        particlesRef.current = Array.from({ length: count }, () => {
          const x = fieldMinX + Math.random() * fieldW;
          const y = fieldMinY + Math.random() * fieldH;
          return {
            x, y, bx: x, by: y,
            vx: (Math.random() - 0.5) * 0.08, // VERY slow drift
            vy: (Math.random() - 0.5) * 0.08,
            depth: 0.3 + Math.random() * 0.7 // Parallax depth layer
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

    // Device Gyroscope tracking
    const onOrient = throttle((e: DeviceOrientationEvent) => {
      const g = (e.gamma ?? 0) / 45; // Left/Right tilt
      const b = ((e.beta ?? 0) - 45) / 45; // Forward/Back tilt
      // Clamp values so it doesn't spin out of control
      targetTilt.current.x = Math.max(-1.5, Math.min(1.5, g));
      targetTilt.current.y = Math.max(-1.5, Math.min(1.5, b));
    }, 16);

    const draw = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      
      // Smooth out the gyro data
      currentTilt.current.x = lerp(currentTilt.current.x, targetTilt.current.x, 0.05);
      currentTilt.current.y = lerp(currentTilt.current.y, targetTilt.current.y, 0.05);
      
      const tiltX = currentTilt.current.x * tiltStrength;
      const tiltY = currentTilt.current.y * tiltStrength;

      ctx.clearRect(0, 0, width, height);
      const fieldW = fieldMaxX - fieldMinX;
      const fieldH = fieldMaxY - fieldMinY;

      const particles = particlesRef.current;

      for (const p of particles) {
        // Base slow continuous movement
        p.bx += p.vx;
        p.by += p.vy;
        
        // Wrap around the infinite 360 space
        if (p.bx < fieldMinX) p.bx += fieldW;
        else if (p.bx > fieldMaxX) p.bx -= fieldW;
        if (p.by < fieldMinY) p.by += fieldH;
        else if (p.by > fieldMaxY) p.by -= fieldH;

        // Apply gyro parallax (closer nodes move more)
        let x = p.bx + tiltX * p.depth;
        let y = p.by + tiltY * p.depth;

        // Mouse pull effect
        if (mouseRef.current.active && window.matchMedia("(hover: hover)").matches) {
          const dx = mx - x;
          const dy = my - y;
          const distSq = dx * dx + dy * dy;
          const R = mouseRadius;
          
          if (distSq < R * R) {
            const dist = Math.sqrt(distSq) || 1;
            const force = (1 - dist / R) * mousePull;
            x += (dx / dist) * force;
            y += (dy / dist) * force;
          }
        }
        
        p.x = x;
        p.y = y;
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

    // Initialize Gyroscope for Mobile
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
