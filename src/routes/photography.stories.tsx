import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { stories } from "../lib/photography-data";

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
  component: PhotographyStories,
});

function PhotographyStories() {
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
        {stories.map((story, index) => (
          <FadeIn key={story.id} delay={index * 0.05}>
            <article className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-md md:grid-cols-12">
              <img
                src={story.src}
                alt={story.title}
                className="aspect-[16/10] w-full object-cover md:col-span-5 md:aspect-auto md:h-full"
              />
              <div className="p-5 md:col-span-7 md:p-6">
                <h2 className="font-display text-2xl font-medium tracking-tight text-foreground">
                  {story.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {story.location} · {story.year}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{story.story}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
