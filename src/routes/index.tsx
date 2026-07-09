import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Linkedin, Facebook, Instagram } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import portraitAsset from "../assets/portrait.jpg.asset.json";
import { SOCIALS } from "../lib/socials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Md. Tazbid Sikder — ETE, CUET & Photographer" },
      {
        name: "description",
        content:
          "Portfolio of Md. Tazbid Sikder — Electronics & Telecommunication Engineering student at CUET, and a photographer.",
      },
      { property: "og:title", content: "Md. Tazbid Sikder — ETE, CUET & Photographer" },
      {
        property: "og:description",
        content:
          "Portfolio of Md. Tazbid Sikder — Electronics & Telecommunication Engineering student at CUET, and a photographer.",
      },
      { property: "og:image", content: portraitAsset.url },
      { name: "twitter:image", content: portraitAsset.url },
    ],
  }),
  component: Index,
});

const sections = [
  { to: "/photography", label: "Photography" },
  { to: "/skills", label: "Skills" },
  { to: "/labs", label: "Labs" },
  { to: "/blog", label: "Blog" },
] as const;

const socialLinks = [
  { href: SOCIALS.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SOCIALS.facebook, label: "Facebook", Icon: Facebook },
  { href: SOCIALS.instagram, label: "Instagram", Icon: Instagram },
];

function Index() {
  return (
    <div className="relative">
      {/* MOBILE HERO — fullscreen portrait with intro overlay */}
      <section className="relative md:hidden">
        <div className="relative h-[100svh] w-full overflow-hidden bg-black">
          <img
            src={portraitAsset.url}
            alt="Portrait of Md. Tazbid Sikder holding a Yashica film camera"
            className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/90" />

          <div className="absolute inset-x-0 bottom-0 px-6 pb-10">
            <FadeIn>
              <h1 className="font-display text-3xl font-medium leading-tight tracking-tight text-white">
                Md. Tazbid Sikder
              </h1>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">
                ETE, CUET · Photographer
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-5 max-w-[22rem] text-sm leading-relaxed text-white/85">
                An Electronics &amp; Telecommunication Engineering student at CUET,
                and a photographer chasing quiet frames.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-5 flex items-center gap-3">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-4 text-white">
                <div className="flex items-center gap-8">
                  <MobileStat value="200" label="Frames" />
                  <MobileStat value="12" label="Labs" />
                </div>
                <a href="#explore" className="inline-flex items-center gap-2 text-xs font-medium">
                  Scroll
                  <ArrowDown className="h-3.5 w-3.5" />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* HERO (desktop / tablet) */}
      <section className="relative mx-auto hidden max-w-[1400px] px-6 pb-24 pt-12 md:block md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
          {/* Left column */}
          <div className="order-2 flex flex-col justify-between md:order-1 md:col-span-7">
            {/* Name + role */}
            <FadeIn>
              <div>
                <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground md:text-7xl">
                  Md. Tazbid Sikder
                </h1>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                  Electronics &amp; Telecommunication Engineering, CUET · Photographer
                </p>
              </div>
            </FadeIn>

            {/* Intro */}
            <FadeIn delay={0.1}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                I build with circuits and code, and photograph the quiet in between.
                This is a small archive of the work — engineering, frames, and notes.
              </p>
            </FadeIn>

            {/* Socials */}
            <FadeIn delay={0.15}>
              <div className="mt-8 flex items-center gap-2">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:bg-accent hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.2}>
              <div className="mt-12 flex items-start divide-x divide-border border-t border-border pt-6">
                <Stat value="200" label="Frames captured" />
                <Stat value="12" label="Lab projects" />
                <Stat value="B.Sc" label="ETE, CUET" />
              </div>
            </FadeIn>

            {/* Bottom row */}
            <FadeIn delay={0.25}>
              <div className="mt-10 flex items-center justify-end">
                <a
                  href="#explore"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  Scroll down
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right column — portrait */}
          <FadeIn direction="left" delay={0.15} className="order-1 md:order-2 md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
              <img
                src={portraitAsset.url}
                alt="Portrait of Md. Tazbid Sikder holding a Yashica film camera"
                className="h-full w-full object-cover grayscale contrast-[1.05]"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="explore" className="mx-auto max-w-[1400px] px-6 pb-32 md:px-12">
        <FadeIn>
          <div className="flex items-end justify-between border-b border-border pb-6">
            <h2 className="font-display text-4xl font-medium tracking-tight text-foreground md:text-6xl">
              Selected work
            </h2>
            <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
              Circuits, lenses, sessional benchwork, and words.
            </p>
          </div>
        </FadeIn>

        <div className="divide-y divide-border">
          {sections.map((s, i) => (
            <FadeIn key={s.to} delay={0.05 + i * 0.05}>
              <Link to={s.to} className="group block">
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-between py-8 md:py-10"
                >
                  <h3 className="font-display text-3xl font-medium tracking-tight text-foreground md:text-5xl">
                    {s.label}
                  </h3>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground md:h-6 md:w-6" />
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col px-6 first:pl-0 last:pr-0">
      <span className="font-display text-3xl font-medium leading-none tracking-tight text-foreground md:text-4xl">
        {value}
      </span>
      <span className="mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function MobileStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-2xl font-medium leading-none tracking-tight">
        {value}
      </span>
      <span className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-white/60">
        {label}
      </span>
    </div>
  );
}
