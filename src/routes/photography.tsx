import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Images, LibraryBig } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { cardPress } from "../lib/motion";
import { motion } from "framer-motion";
import { client } from "../lib/sanity";

export const Route = createFileRoute("/photography")({
  head: () => ({
    meta: [
      { title: "Photography — Md. Tazbid Sikder" },
      {
        name: "description",
        content: "Photography at a glance — single frames and short visual stories.",
      },
      { property: "og:title", content: "Photography — Md. Tazbid Sikder" },
      {
        property: "og:description",
        content: "Photography at a glance — single frames and short visual stories.",
      },
    ],
  }),
  loader: async () => {
    // Now ordering by the new 'sequence' number
    const data = await client.fetch(`{
      "singles": *[_type == "photographySingle"] | order(sequence asc)[0...4] {
        "id": _id,
        "src": image.asset->url,
        title
      },
      "stories": *[_type == "photographyStory"] | order(sequence asc)[0...4] {
        "id": _id,
        "src": coverImage.asset->url,
        title
      }
    }`);
    return data;
  },
  component: Photography,
});

function Photography() {
  const location = useLocation();
  const isMainPage = location.pathname === "/photography" || location.pathname === "/photography/";
  const { singles, stories } = Route.useLoaderData();

  if (!isMainPage) {
    return <Outlet />;
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
      <FadeIn>
        <h1 className="font-display font-medium leading-[0.9] tracking-[-0.03em] text-foreground [font-size:clamp(3rem,9vw,7rem)]">
          Photography
        </h1>
        <p className="mt-6 max-w-2xl text-base font-semibold leading-relaxed text-muted-foreground md:text-lg">
          Two tracks: single frames and short stories. Browse the rolling previews below, and click to explore the full galleries.
        </p>
      </FadeIn>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <InteractivePreviewCard
          to="/photography/singles"
          title="Single Category"
          subtitle="Standalone frames captured in quiet moments."
          Icon={Images}
          items={singles}
        />
        <InteractivePreviewCard
          to="/photography/stories"
          title="Photo Story"
          subtitle="Grouped visual narratives and thematic collections."
          Icon={LibraryBig}
          items={stories}
        />
      </div>
    </div>
  );
}

function InteractivePreviewCard({
  to,
  title,
  subtitle,
  Icon,
  items,
}: {
  to: "/photography/singles" | "/photography/stories";
  title: string;
  subtitle: string;
  Icon: typeof Images;
  items: { id: string; src: string; title: string }[];
}) {
  const safeItems = items?.length > 0 ? items : [{ id: "fallback", src: "/portrait.jpg", title: "Upload in Admin" }];
  const marqueeItems = [...safeItems, ...safeItems, ...safeItems, ...safeItems];

  return (
    <FadeIn delay={0.1}>
      <Link to={to} className="group block focus-visible:outline-none">
        <motion.section
          {...cardPress}
          className="relative flex h-[450px] flex-col overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-md transition-colors group-hover:border-foreground/60"
        >
          <div className="relative z-10 flex items-start justify-between border-b border-border/50 bg-card/70 p-6 backdrop-blur-md md:p-8">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-background/50">
                <Icon className="h-5 w-5 text-foreground" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  {title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
            <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground" />
          </div>

          <div className="relative flex-1 overflow-hidden bg-background/30 py-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-card/80 to-transparent md:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-card/80 to-transparent md:w-24" />

            <motion.div
              className="flex w-max items-center gap-4 px-4"
              animate={{ x: ["0%", "-25%"] }} 
              transition={{
                duration: 20, 
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {marqueeItems.map((item, idx) => (
                <img
                  key={`${item.id}-${idx}`}
                  src={item.src}
                  alt={item.title}
                  className="aspect-[4/3] h-48 w-64 shrink-0 rounded-xl object-cover shadow-sm md:h-56 md:w-72"
                />
              ))}
            </motion.div>
          </div>
        </motion.section>
      </Link>
    </FadeIn>
  );
}
