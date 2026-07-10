import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { SOCIALS } from "../lib/socials";
import { cardPress } from "../lib/motion";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Md. Tazbid Sikder" },
      {
        name: "description",
        content:
          "Notes on engineering and photography — posts live on LinkedIn, Facebook, and Instagram.",
      },
      { property: "og:title", content: "Blog — Md. Tazbid Sikder" },
      {
        property: "og:description",
        content:
          "Notes on engineering and photography — posts live on LinkedIn, Facebook, and Instagram.",
      },
    ],
  }),
  component: Blog,
});

const channels = [
  {
    href: SOCIALS.linkedin,
    label: "LinkedIn",
    handle: "md-tazbid-sikder",
    note: "Engineering notes, coursework write-ups, and long-form thinking.",
    Icon: Linkedin,
  },
  {
    href: SOCIALS.facebook,
    label: "Facebook",
    handle: "Md. Tazbid Sikder",
    note: "Casual updates and short posts from campus and the road.",
    Icon: Facebook,
  },
  {
    href: SOCIALS.instagram,
    label: "Instagram",
    handle: "@md.tazbid",
    note: "Frames — portraits, streets, and the occasional lab bench.",
    Icon: Instagram,
  },
];

function Blog() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
      <FadeIn>
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          / 04 — Words & posts
        </p>
        <h1 className="mt-4 font-display font-medium leading-[0.9] tracking-[-0.03em] text-foreground [font-size:clamp(3rem,9vw,7rem)]">
          Blog
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Rather than mirror everything here, my writing lives where the conversation is.
          Pick the channel that fits.
        </p>
      </FadeIn>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {channels.map(({ href, label, handle, note, Icon }, i) => (
          <FadeIn key={label} delay={i * 0.06}>
            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              {...cardPress}
              className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 md:min-h-[280px] md:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border">
                  <Icon className="h-4 w-4 text-foreground" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
              </div>
              <div className="mt-10">
                <h2 className="font-display text-3xl font-medium tracking-tight text-card-foreground">
                  {label}
                </h2>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {handle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{note}</p>
              </div>
            </motion.a>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Notes
            </p>
            <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
              Writing on this site — soon.
            </h3>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Longer essays on circuits, photography, and everything in between will land here.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
