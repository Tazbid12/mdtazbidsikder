import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
        content: "A curated collection of photographs capturing light, people, and places.",
      },
      { property: "og:title", content: "Photography — Portfolio" },
      {
        property: "og:description",
        content: "A curated collection of photographs capturing light, people, and places.",
      },
    ],
  }),
  component: Photography,
});

const photos = [
  { src: photo1, title: "Golden Hour", category: "Landscape", span: "row-span-2" },
  { src: photo2, title: "City Lines", category: "Urban", span: "" },
  { src: photo3, title: "Quiet Portrait", category: "Portrait", span: "row-span-2" },
  { src: photo4, title: "Night Signals", category: "Night", span: "" },
  { src: photo5, title: "Texture Study", category: "Detail", span: "" },
  { src: photo6, title: "Morning Mist", category: "Nature", span: "row-span-2" },
];

function Photography() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <FadeIn>
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Visual stories
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Photography
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Frames that caught my eye — from campus evenings to quiet corners of the city. Replace
          these placeholders with your own shots.
        </p>
      </FadeIn>

      <div className="mt-12 columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, index) => (
          <FadeIn key={photo.title} delay={index * 0.08}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`group relative overflow-hidden rounded-2xl bg-muted ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {photo.category}
                </p>
                <h3 className="mt-1 font-display text-lg font-medium text-foreground">
                  {photo.title}
                </h3>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
