import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function MouseFollower() {
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useSpring(0, { stiffness: 50, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 50, damping: 30 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    setIsTouch(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsVisible(false), 2000);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isTouch, cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-0 mix-blend-multiply dark:mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ opacity: { duration: 0.6 } }}
      >
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/15"
          style={{ width: 320, height: 320 }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-0"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ opacity: { duration: 0.8 } }}
      >
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-ring/30 blur-2xl dark:bg-ring/20"
          style={{ width: 160, height: 160, translate: "-30% -30%" }}
        />
      </motion.div>
    </>
  );
}
