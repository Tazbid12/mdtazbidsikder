import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { client } from "../lib/sanity";

export const Route = createFileRoute("/photography/singles")({
  head: () => ({
    meta: [
      { title: "Single Photo — Md. Tazbid Sikder" },
      {
        name: "description",
        content: "Single photo collection by Md. Tazbid Sikder.",
      },
    ],
  }),
  loader: async () => {
    // Fetch all singles from Sanity
    const singles = await client.fetch(`*[_type == "photographySingle"] | order(date desc) {
      "id": _id,
      title,
      caption,
      date,
      "src": image.asset->url
    }`);
    return { singles };
  },
  component: PhotographySingles,
});

function PhotographySingles() {
  const { singles } = Route.useLoaderData();

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
          Single Photo
        </h1>
      </FadeIn>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {singles?.map((photo: any, index: number) => (
          <FadeIn key={photo.id} delay={index * 0.05}>
            <article className="overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-md">
              <img src={photo.src} alt={photo.title} className="aspect-[4/5] w-full object-cover" />
              <div className="p-5">
                <h2 className="font-display text-xl font-medium tracking-tight text-foreground">
                  {photo.title}
                </h2>
                <div className="mt-1 flex justify-between items-center text-sm text-muted-foreground">
                  <span>{photo.caption || "No caption"}</span>
                  <span>{photo.date ? new Date(photo.date).getFullYear() : ""}</span>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
        
        {/* Placeholder if database is empty */}
        {singles?.length === 0 && (
          <p className="text-muted-foreground">No photos uploaded yet. Head to your admin panel!</p>
        )}
      </div>
    </div>
  );
}
