import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Images, LibraryBig } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { cardPress } from "../lib/motion";
import { motion } from "framer-motion";
import { singles, stories } from "../lib/photography-data";

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
  component: Photography,
});

function Photography() {
  const heroSingle = singles[0];
  const heroStory = stories[0];

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
      <FadeIn>
        <h1 className="font-display font-medium leading-[0.9] tracking-[-0.03em] text-foreground [font-size:clamp(3rem,9vw,7rem)]">
          Photography
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Two tracks: single frames and short stories. Browse quickly here, then open each section
          for the full set.
        </p>
      </FadeIn>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
        <FadeIn className="md:col-span-7">
          <article className="overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-md">
            <img
              src={heroSingle.src}
              alt={heroSingle.title}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="p-5 md:p-6">
              <p className="text-xs text-muted-foreground">Featured single frame</p>
              <h2 className="mt-1 font-display text-2xl font-medium tracking-tight text-foreground">
                {heroSingle.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {heroSingle.location} · {heroSingle.year}
              </p>
            </div>
          </article>
        </FadeIn>

        <FadeIn className="md:col-span-5" delay={0.05}>
          <article className="overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-md">
            <img
              src={heroStory.src}
              alt={heroStory.title}
              className="aspect-[16/9] w-full object-cover"
            />
            <div className="p-5 md:p-6">
              <p className="text-xs text-muted-foreground">Featured photo story</p>
              <h2 className="mt-1 font-display text-2xl font-medium tracking-tight text-foreground">
                {heroStory.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{heroStory.story}</p>
            </div>
          </article>
        </FadeIn>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        <SectionPreview
          to="/photography/singles"
          title="Single Photo"
          subtitle="Standalone frames"
          Icon={Images}
          items={singles.map((item) => ({ id: item.id, src: item.src, title: item.title }))}
        />
        <SectionPreview
          to="/photography/stories"
          title="Photo Story"
          subtitle="Grouped visual narratives"
          Icon={LibraryBig}
          items={stories.map((item) => ({ id: item.id, src: item.src, title: item.title }))}
        />
      </div>
    </div>
  );
}

function SectionPreview({
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
  return (
    <FadeIn>
      <Link to={to} className="group block focus-visible:outline-none">
        <motion.section
          {...cardPress}
          className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-md transition-colors group-hover:border-foreground/60 md:p-6"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border">
              <Icon className="h-4 w-4 text-foreground" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-display text-2xl font-medium tracking-tight text-foreground">
                {title}
              </h2>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {items.slice(0, 3).map((item) => (
              <img
                key={item.id}
                src={item.src}
                alt={item.title}
                className="aspect-square w-full rounded-lg object-cover"
              />
            ))}
          </div>
        </motion.section>
      </Link>
    </FadeIn>
  );
}
