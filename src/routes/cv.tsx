import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, GraduationCap, Mail, Target } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { cardPress } from "../lib/motion";
import { motion } from "framer-motion";

const OVERLEAF_CV_URL = "https://www.overleaf.com/read/TODO";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Md. Tazbid Sikder" },
      {
        name: "description",
        content:
          "At-a-glance CV overview for Md. Tazbid Sikder, with education, focus areas, and contact.",
      },
      { property: "og:title", content: "CV — Md. Tazbid Sikder" },
      {
        property: "og:description",
        content:
          "At-a-glance CV overview for Md. Tazbid Sikder, with education, focus areas, and contact.",
      },
    ],
  }),
  component: CV,
});

function CV() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
      <FadeIn>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <h1 className="mt-5 font-display font-medium leading-[0.9] tracking-[-0.03em] text-foreground [font-size:clamp(3rem,8vw,6rem)]">
          CV
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Electronics &amp; Telecommunication Engineering student at CUET focused on circuits,
          communication systems, embedded development, and visual storytelling through
          photography.
        </p>
      </FadeIn>

      <FadeIn delay={0.08}>
        <motion.a
          {...cardPress}
          href={OVERLEAF_CV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 px-5 py-3 text-sm font-medium text-foreground backdrop-blur-md transition-colors hover:border-foreground/60"
        >
          View CV on Overleaf
          <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </FadeIn>

      <FadeIn delay={0.12}>
        <p className="mt-3 text-xs text-muted-foreground">
          TODO: Replace placeholder Overleaf URL with public share link.
        </p>
      </FadeIn>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        <InfoCard
          Icon={GraduationCap}
          title="Education"
          points={[
            "B.Sc. in Electronics & Telecommunication Engineering",
            "Chittagong University of Engineering & Technology (CUET)",
            "Sessional lab and project-based training",
          ]}
        />
        <InfoCard
          Icon={Target}
          title="Focus areas"
          points={[
            "Electronics and communication systems",
            "Embedded systems and practical prototyping",
            "Signal processing and technical storytelling",
          ]}
        />
        <InfoCard
          Icon={Mail}
          title="Contact"
          points={[
            "LinkedIn, Facebook, and Instagram are active channels",
            "Open to collaboration and project discussions",
            "Portfolio pages provide current work snapshots",
          ]}
        />
      </div>
    </div>
  );
}

function InfoCard({
  Icon,
  title,
  points,
}: {
  Icon: typeof GraduationCap;
  title: string;
  points: string[];
}) {
  return (
    <FadeIn>
      <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-md md:p-8">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border">
          <Icon className="h-4 w-4 text-foreground" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-medium tracking-tight text-foreground">{title}</h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>
    </FadeIn>
  );
}
