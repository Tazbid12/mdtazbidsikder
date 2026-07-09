import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { FadeIn } from "../components/FadeIn";
import photo1 from "../assets/photo-1.jpg";
import photo2 from "../assets/photo-2.jpg";
import photo3 from "../assets/photo-3.jpg";
import photo4 from "../assets/photo-4.jpg";
import photo5 from "../assets/photo-5.jpg";
import photo6 from "../assets/photo-6.jpg";

export const Route = createFileRoute("/photography")({
  head: () => ({
    meta: [
      { title: "Photography — Portfolio" },
      {
        name: "description",
        content: "An editorial gallery of frames — portraits, streets, and quiet corners.",
      },
      { property: "og:title", content: "Photography — Portfolio" },
      {
        property: "og:description",
        content: "An editorial gallery of frames — portraits, streets, and quiet corners.",
      },
    ],
  }),
  component: Photography,
});

type Photo = {
  src: string;
  title: string;
  category: "Portrait" | "Street" | "Nature" | "Night" | "Detail";
  year: string;
  meta: string;
  layout: "full" | "left" | "right" | "pair-a" | "pair-b";
};

// Replace src fields with your own photos when ready.
const photos: Photo[] = [
  { src: photo1, title: "Golden Hour", category: "Nature", year: "2026", meta: "Chittagong", layout: "full" },
  { src: photo2, title: "City Lines", category: "Street", year: "2025", meta: "Agrabad", layout: "left" },
  { src: photo3, title: "Quiet Portrait", category: "Portrait", year: "2025", meta: "Campus, CUET", layout: "right" },
  { src: photo4, title: "Night Signals", category: "Night", year: "2025", meta: "GEC circle", layout: "pair-a" },
  { src: photo5, title: "Texture Study", category: "Detail", year: "2024", meta: "Lab bench", layout: "pair-b" },
  { src: photo6, title: "Morning Mist", category: "Nature", year: "2024", meta: "Foy's Lake", layout: "full" },
];

const categories = ["All", "Portrait", "Street", "Nature", "Night", "Detail"] as const;

function Photography() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const visible = filter === "All" ? photos : photos.filter((p) => p.category === filter);

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
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Frames from campus evenings, city walks, and moments worth pausing for. A slow,
            growing archive.
          </p>
        </FadeIn>
      </div>

      {/* Filters */}
      <FadeIn delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                filter === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Gallery */}
      <div className="mt-16 space-y-20 md:space-y-28">
        {visible.map((photo, i) => (
          <PhotoRow key={photo.title} photo={photo} index={i} />
        ))}
      </div>

      <p className="mt-24 border-t border-border pt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        End of set · more soon
      </p>
    </div>
  );
}

function PhotoRow({ photo, index }: { photo: Photo; index: number }) {
  if (photo.layout === "full") {
    return (
      <FadeIn delay={index * 0.05}>
        <figure className="group">
          <div className="overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
          <Caption photo={photo} />
        </figure>
      </FadeIn>
    );
  }

  if (photo.layout === "left" || photo.layout === "right") {
    const alignRight = photo.layout === "right";
    return (
      <FadeIn delay={index * 0.05}>
        <figure
          className={`grid grid-cols-1 gap-6 md:grid-cols-12 ${
            alignRight ? "md:[&>*:first-child]:col-start-6" : ""
          }`}
        >
          <div className={`overflow-hidden md:col-span-7`}>
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover md:aspect-[3/4]"
            />
          </div>
          <div className="flex items-end md:col-span-4 md:col-start-9">
            <Caption photo={photo} inline />
          </div>
        </figure>
      </FadeIn>
    );
  }

  // pair-a / pair-b handled by consumer grouping — render as single square
  return (
    <FadeIn delay={index * 0.05}>
      <figure>
        <div className="overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            src={photo.src}
            alt={photo.title}
            loading="lazy"
            className="aspect-square w-full object-cover md:aspect-[4/5]"
          />
        </div>
        <Caption photo={photo} />
      </figure>
    </FadeIn>
  );
}

function Caption({ photo, inline }: { photo: Photo; inline?: boolean }) {
  return (
    <figcaption
      className={`flex items-baseline justify-between gap-4 ${
        inline ? "" : "mt-4 border-t border-border pt-4"
      }`}
    >
      <div>
        <h3 className="font-display text-lg font-medium tracking-tight text-foreground md:text-xl">
          {photo.title}
        </h3>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {photo.category} · {photo.meta}
        </p>
      </div>
      <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        {photo.year}
      </span>
    </figcaption>
  );
}
