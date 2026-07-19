import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { client } from "../lib/sanity";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/photography/stories")({
  head: () => ({
    meta: [
      { title: "Photo Story — Md. Tazbid Sikder" },
      {
        name: "description",
        content: "Photo stories by Md. Tazbid Sikder.",
      },
    ],
  }),
  loader: async () => {
    const stories = await client.fetch(`*[_type == "photographyStory"] | order(sequence asc) {
      "id": _id,
      title,
      description,
      sequence,
      "src": coverImage.asset->url,
      photos[]{
        "src": image.asset->url,
        caption
      }
    }`);
    return { stories };
  },
  component: PhotographyStories,
});

function PhotographyStories() {
  const { stories } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
      <FadeIn>
        <Link
          to="/photography"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Photography
        </Link>
        <h1 className="mt-5 font-display font-medium leading-[0.9] tracking-[-0.03em] text-foreground [font-size:clamp(2.5rem,7vw,5rem)]">
          Photo Story
        </h1>
      </FadeIn>

      <div className="mt-8 space-y-4 md:space-y-5">
        {stories?.map((story: any, index: number) => (
          <StoryCard key={story.id} story={story} index={index} />
        ))}

        {stories?.length === 0 && (
          <p className="text-muted-foreground">No stories uploaded yet. Head to your admin panel!</p>
        )}
      </div>
    </div>
  );
}

function StoryCard({ story, index }: { story: any; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FadeIn delay={index * 0.05}>
      <article className="overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-md transition-colors hover:border-foreground/40">
        
        <div 
          className="grid grid-cols-1 md:grid-cols-12 cursor-pointer" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Replaced object-cover with object-contain to prevent cropping */}
          <img
            src={story.src}
            alt={story.title}
            className="w-full h-full object-contain bg-muted/10 md:col-span-5"
          />
          <div className="p-5 md:col-span-7 md:p-6 flex flex-col justify-center">
            <h2 className="font-display text-2xl font-medium tracking-tight text-foreground">
              {story.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {story.sequence ? `Story #${story.sequence}` : ""}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {story.description}
            </p>
            
            <button className="mt-6 text-sm font-bold text-foreground text-left flex items-center gap-2">
              {isOpen ? "Close Album ↑" : "Open Album ↓"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-6 md:p-8 border-t border-border bg-card/40">
                <p className="mb-8 text-sm leading-relaxed text-foreground/90 max-w-4xl whitespace-pre-wrap">
                  {story.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {story.photos?.map((photo: any, i: number) => (
                    <div key={i} className="flex flex-col gap-2">
                      {/* Removed aspect ratio and crop from inner photos */}
                      <img 
                        src={photo.src} 
                        alt={photo.caption || "Story photo"} 
                        className="rounded-xl w-full h-auto border border-border bg-muted/10"
                      />
                      {photo.caption && (
                        <p className="text-sm font-medium text-muted-foreground">{photo.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </article>
    </FadeIn>
  );
}
