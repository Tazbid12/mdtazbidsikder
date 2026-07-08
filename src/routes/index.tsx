import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Camera, Cpu, FlaskConical, PenTool, ArrowRight } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import heroImage from "../assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview — Portfolio" },
      {
        name: "description",
        content:
          "Overview of a creative portfolio blending electronics engineering and photography.",
      },
      { property: "og:title", content: "Overview — Portfolio" },
      {
        property: "og:description",
        content:
          "Overview of a creative portfolio blending electronics engineering and photography.",
      },
    ],
  }),
  component: Index,
});

const sections = [
  {
    to: "/photography",
    label: "Photography",
    description: "Light, shadow, and stories captured through the lens.",
    icon: Camera,
  },
  {
    to: "/skills",
    label: "Skills",
    description: "Engineering foundations, code, and creative tools.",
    icon: Cpu,
  },
  {
    to: "/labs",
    label: "Labs",
    description: "Sessional work in electronics and communication labs.",
    icon: FlaskConical,
  },
  {
    to: "/blog",
    label: "Blog",
    description: "Notes, thoughts, and experiments worth sharing.",
    icon: PenTool,
  },
];

function Index() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl grid-cols-1 items-center gap-12 px-6 py-12 md:grid-cols-2">
        <FadeIn className="order-2 md:order-1">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Electronics & Telecommunication
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Engineering mind. Creative eye.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            I’m a student at CUET studying Electronics and Telecommunication Engineering, with
            photography as my passionate hobby. This space is where circuits meet composition.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/photography"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              See my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
            >
              Explore skills
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} direction="left" className="order-1 md:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted md:aspect-[3/4]">
            <img
              src={heroImage}
              alt="Featured photography"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </FadeIn>
      </section>

      {/* Section tabs */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <FadeIn>
          <h2 className="font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Explore
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Jump into any section to see what I’m working on, learning, and capturing.
          </p>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((section, index) => (
            <FadeIn key={section.to} delay={0.1 + index * 0.08}>
              <Link to={section.to}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20 hover:bg-accent"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-medium text-card-foreground">
                    {section.label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {section.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                    Open
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
