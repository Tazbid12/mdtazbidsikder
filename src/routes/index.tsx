import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import portraitAsset from "../assets/portrait.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hello — ETE Student & Photographer, CUET" },
      {
        name: "description",
        content:
          "Portfolio of an Electronics & Telecommunication Engineering student at CUET, and a passionate photographer.",
      },
      { property: "og:title", content: "Hello — ETE Student & Photographer, CUET" },
      {
        property: "og:description",
        content:
          "Portfolio of an Electronics & Telecommunication Engineering student at CUET, and a passionate photographer.",
      },
      { property: "og:image", content: portraitAsset.url },
      { name: "twitter:image", content: portraitAsset.url },
    ],
  }),
  component: Index,
});

const sections = [
  { to: "/photography", label: "Photography", meta: "01 — Frames & stories" },
  { to: "/skills", label: "Skills", meta: "02 — Hardware & code" },
  { to: "/labs", label: "Labs", meta: "03 — Sessional work" },
  { to: "/blog", label: "Blog", meta: "04 — Notes & writing" },
] as const;

function Index() {
  return (
    <div className="relative">
      {/* HERO */}
      {/* MOBILE HERO — fullscreen portrait with intro overlay */}
      <section className="relative md:hidden">
        <div className="relative h-[100svh] w-full overflow-hidden bg-black">
          <img
            src={portraitAsset.url}
            alt="Self portrait holding a Yashica film camera"
            className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05]"
          />
          {/* gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/85" />

          {/* top meta */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-20 text-[10px] font-medium uppercase tracking-[0.3em] text-white/80">
            <span>/ 01 — Hello</span>
            <span>2026</span>
          </div>

          {/* rotated side label */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 origin-left -rotate-90 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.3em] text-white/70">
            Photographer / ETE Student
          </span>

          {/* bottom content */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-10">
            <FadeIn>
              <h1 className="font-display font-medium leading-[0.85] tracking-[-0.04em] text-white [font-size:clamp(4.5rem,26vw,8rem)]">
                Hello
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-5 max-w-[22rem] text-sm leading-relaxed text-white/85">
                <span className="mr-2 text-white">—</span>
                I&apos;m an Electronics &amp; Telecommunication Engineering student at CUET,
                and a photographer chasing quiet frames.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4">
                <div className="flex items-center gap-6 text-white">
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <span className="mt-1 text-xs font-medium">+</span>
                      <span className="font-display text-2xl font-medium leading-none tracking-tight">200</span>
                    </div>
                    <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white/60">Frames</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <span className="mt-1 text-xs font-medium">+</span>
                      <span className="font-display text-2xl font-medium leading-none tracking-tight">12</span>
                    </div>
                    <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white/60">Labs</span>
                  </div>
                </div>
                <a href="#explore" className="inline-flex items-center gap-2 text-xs font-medium text-white">
                  Scroll
                  <ArrowDown className="h-3.5 w-3.5" />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* HERO (desktop / tablet) */}
      <section className="relative mx-auto hidden max-w-[1400px] px-6 pb-24 pt-8 md:block md:px-12">
        {/* Vertical side label */}
        <div className="pointer-events-none absolute left-3 top-24 hidden select-none md:block">
          <span className="block origin-top-left -rotate-90 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Photographer / ETE Student
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-8 right-3 hidden select-none md:block">
          <span className="block origin-bottom-right rotate-90 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            2026 — Portfolio
          </span>
        </div>


        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Left column */}
          <div className="order-2 flex flex-col justify-between md:order-1 md:col-span-7">
            {/* Stats */}
            <FadeIn>
              <div className="flex items-start gap-10 border-b border-border pb-6">
                <Stat sup="+" value="200" label="Frames captured" />
                <Stat sup="+" value="12" label="Lab projects" />
                <Stat sup="" value="B.Sc" label="ETE, CUET" />
              </div>
            </FadeIn>

            {/* Big Hello */}
            <FadeIn delay={0.1}>
              <div className="mt-10 md:mt-16">
                <h1 className="font-display font-medium leading-[0.85] tracking-[-0.04em] text-foreground [font-size:clamp(5rem,14vw,12rem)]">
                  Hello
                </h1>
                <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
                  <span className="mr-2 text-foreground">—</span>
                  I&apos;m an Electronics &amp; Telecommunication Engineering student at CUET,
                  and a photographer chasing quiet frames.
                </p>
              </div>
            </FadeIn>

            {/* Bottom row */}
            <FadeIn delay={0.2}>
              <div className="mt-12 flex items-center justify-between border-t border-border pt-6 md:mt-24">
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                  2026
                </span>
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
                alt="Self portrait holding a Yashica film camera"
                className="h-full w-full object-cover grayscale contrast-[1.05]"
              />
              <div className="absolute left-4 top-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/80 mix-blend-difference">
                / 01
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/80 mix-blend-difference">
                Yashica · 38mm
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EXPLORE */}
      <section id="explore" className="mx-auto max-w-[1400px] px-6 pb-32 md:px-12">
        <FadeIn>
          <div className="flex items-end justify-between border-b border-border pb-6">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Index
              </p>
              <h2 className="mt-2 font-display text-4xl font-medium tracking-tight text-foreground md:text-6xl">
                Explore
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
              Four rooms. Circuits, lenses, sessional benchwork, and words.
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
                  <div className="flex items-baseline gap-6 md:gap-10">
                    <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-3xl font-medium tracking-tight text-foreground md:text-5xl">
                      {s.label}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground md:inline">
                      {s.meta}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground md:h-6 md:w-6" />
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ sup, value, label }: { sup: string; value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-start">
        {sup && (
          <span className="mt-2 text-lg font-medium text-foreground md:text-2xl">{sup}</span>
        )}
        <span className="font-display text-3xl font-medium leading-none tracking-tight text-foreground md:text-5xl">
          {value}
        </span>
      </div>
      <span className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
