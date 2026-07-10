import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { FadeIn } from "../components/FadeIn";
import { chipPress, easeOut } from "../lib/motion";
import photo1 from "../assets/photo-1.jpg";
import photo2 from "../assets/photo-2.jpg";
import photo3 from "../assets/photo-3.jpg";
import photo4 from "../assets/photo-4.jpg";
import photo5 from "../assets/photo-5.jpg";
import photo6 from "../assets/photo-6.jpg";

export const Route = createFileRoute("/photography")({
  head: () => ({
    meta: [
      { title: "Photography — Md. Tazbid Sikder" },
      {
        name: "description",
        content: "An editorial gallery of frames — portraits, streets, and quiet corners.",
      },
      { property: "og:title", content: "Photography — Md. Tazbid Sikder" },
      {
        property: "og:description",
        content: "An editorial gallery of frames — portraits, streets, and quiet corners.",
      },
    ],
  }),
  component: Photography,
});

type Photo = {
  id: string;
  src: string;
  title: string;
  category: "Portrait" | "Street" | "Nature" | "Night" | "Detail";
  year: string;
  meta: string;
  layout: "full" | "left" | "right" | "square";
};

const photos: Photo[] = [
  { id: "p1", src: photo1, title: "Golden Hour", category: "Nature", year: "2026", meta: "Chittagong", layout: "full" },
  { id: "p2", src: photo2, title: "City Lines", category: "Street", year: "2025", meta: "Agrabad", layout: "left" },
  { id: "p3", src: photo3, title: "Quiet Portrait", category: "Portrait", year: "2025", meta: "Campus, CUET", layout: "right" },
  { id: "p4", src: photo4, title: "Night Signals", category: "Night", year: "2025", meta: "GEC circle", layout: "square" },
  { id: "p5", src: photo5, title: "Texture Study", category: "Detail", year: "2024", meta: "Lab bench", layout: "square" },
  { id: "p6", src: photo6, title: "Morning Mist", category: "Nature", year: "2024", meta: "Foy's Lake", layout: "full" },
];

const categories = ["All", "Portrait", "Street", "Nature", "Night", "Detail"] as const;

function Photography() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState<Photo | null>(null);
  const visible = filter === "All" ? photos : photos.filter((p) => p.category === filter);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
      {/* Header */}
      <div className="border-b border-border pb-8">
        <FadeIn>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            / 01 — Visual stories
          </p>
          <h1 className="mt-4 font-display font-medium leading-[0.9] tracking-[-0.03em] text-foreground [font-size:clamp(3.5rem,10vw,8rem)]">
            Photography
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Frames from campus evenings, city walks, and moments worth pausing for.
            A slow, growing archive.
          </p>
        </FadeIn>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 -mx-6 mt-6 border-b border-border bg-background/85 px-6 py-3 backdrop-blur md:-mx-12 md:top-20 md:px-12">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((c) => {
            const isActive = filter === c;
            return (
              <motion.button
                key={c}
                onClick={() => setFilter(c)}
                {...chipPress}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-background" />}
                {c}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Gallery */}
      <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">
        {visible.map((photo, i) => (
          <PhotoRow key={photo.id} photo={photo} index={i} onOpen={() => setActive(photo)} />
        ))}
      </div>

      <p className="mt-24 border-t border-border pt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        End of set · more soon
      </p>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white/85 hover:bg-white/10 hover:text-white md:right-8 md:top-8"
            >
              <X className="h-4 w-4" />
            </button>
            <motion.figure
              layoutId={`frame-${active.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-full max-w-full flex-col"
              transition={{ duration: 0.45, ease: easeOut }}
            >
              <img
                src={active.src}
                alt={active.title}
                className="max-h-[80vh] w-auto max-w-full object-contain"
              />
              <figcaption className="mt-4 flex items-baseline justify-between gap-6 text-white">
                <div>
                  <h3 className="font-display text-lg font-medium md:text-xl">{active.title}</h3>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.25em] text-white/60">
                    {active.category} · {active.meta}
                  </p>
                </div>
                <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/60">
                  {active.year}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PhotoRow({
  photo,
  index,
  onOpen,
}: {
  photo: Photo;
  index: number;
  onOpen: () => void;
}) {
  const number = String(index + 1).padStart(2, "0");

  const Frame = (
    <motion.button
      layoutId={`frame-${photo.id}`}
      onClick={onOpen}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="group block w-full overflow-hidden bg-muted focus-visible:outline-none"
    >
      <motion.img
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.8, ease: easeOut }}
        src={photo.src}
        alt={photo.title}
        loading="lazy"
        className={`w-full object-cover ${
          photo.layout === "full"
            ? "aspect-[16/9]"
            : photo.layout === "square"
              ? "aspect-square md:aspect-[4/5]"
              : "aspect-[4/5] md:aspect-[3/4]"
        }`}
      />
    </motion.button>
  );

  const caption = (
    <div className="flex items-baseline justify-between gap-4">
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          {number}
        </p>
        <h3 className="mt-2 truncate font-display text-lg font-medium tracking-tight text-foreground md:text-xl">
          {photo.title}
        </h3>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {photo.category} · {photo.meta}
        </p>
      </div>
      <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        {photo.year}
      </span>
    </div>
  );

  if (photo.layout === "full") {
    return (
      <FadeIn delay={index * 0.04}>
        <figure>
          {Frame}
          <figcaption className="mt-4 border-t border-border pt-4">{caption}</figcaption>
        </figure>
      </FadeIn>
    );
  }

  const alignRight = photo.layout === "right";
  return (
    <FadeIn delay={index * 0.04}>
      <figure
        className={`grid grid-cols-1 gap-6 md:grid-cols-12 ${
          alignRight ? "md:[&>*:first-child]:col-start-6" : ""
        }`}
      >
        <div className="md:col-span-7">{Frame}</div>
        <div className="flex items-end md:col-span-4 md:col-start-9">{caption}</div>
      </figure>
    </FadeIn>
  );
}
