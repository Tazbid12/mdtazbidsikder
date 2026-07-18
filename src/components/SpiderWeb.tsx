import { useEffect, useRef } from "react";

export function SpiderWeb({
  color = "#222222",
  linkDistance = 140, // Perfect distance for a structured look
  nodeRadius = 1.5,
  linkAlpha = 0.25, // Subtle lines
  nodeAlpha = 0.6,
  className = "",
}: {
  color?: string;
  linkDistance?: number;
  nodeRadius?: number;
  linkAlpha?: number;
  nodeAlpha?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    // Nodes have an origin to spring back to
    let particles: {
      x: number;
      y: number;
      originX: number;
      originY: number;
    }[] = [];
    let raf = 0;

    // Convert hex color to rgb for alpha manipulation
    const rgb = (() => {
      const m = color.match(/^#([0-9a-f]{6})$/i);
      if (m) {
        const n = parseInt(m[1], 16);
        return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
      }
      return "34,34,34";
    })();

    const generateParticles = () => {
      const area = width * height;
      // Responsive density: less nodes on mobile, spread out cleanly on desktop
      const isMobile = width < 768;
      const count = isMobile ? Math.floor(area / 12000) : Math.floor(area / 18000);
      
      particles = Array.from({ length: Math.min(count, 150) }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return { x, y, originX: x, originY: y };
      });
    };

    let lastWidth = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      
      // ONLY regenerate if the width changes significantly to prevent the "scroll shuffle"
      const widthChanged = Math.abs(rect.width - lastWidth) > 50;
      
      width = rect.width;
      height = rect.height;
      lastWidth = width;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (widthChanged || particles.length === 0) {
        generateParticles();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      // Update positions with Spring Physics
      for (const p of particles) {
        let targetX = p.originX;
        let targetY = p.originY;

        if (mouseActive) {
          const dx = mx - p.originX;
          const dy = my - p.originY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // If mouse is near, gently repel the node
          const interactionRadius = 120;
          if (dist < interactionRadius) {
            const force = (interactionRadius - dist) / interactionRadius;
            targetX -= (dx / dist) * force * 30; // Push distance
            targetY -= (dy / dist) * force * 30;
          }
        }

        // Ease node towards target (smooth spring effect)
        p.x += (targetX - p.x) * 0.1;
        p.y += (targetY - p.y) * 0.1;
      }

      // Draw lines
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
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      ctx.fillStyle = `rgba(${rgb}, ${nodeAlpha})`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    // Event Listeners
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    
    window.addEventListener("resize", handleResize);
    
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [color, linkDistance, nodeRadius, linkAlpha, nodeAlpha]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 h-full w-full pointer-events-none z-[-1] ${className}`}
      aria-hidden="true"
    />
  );
}
