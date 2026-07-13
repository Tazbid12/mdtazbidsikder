import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Cpu, Code2, Camera, Wrench } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { cardPress } from "../lib/motion";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Md. Tazbid Sikder" },
      {
        name: "description",
        content:
          "Engineering, programming, photography, and tool skills — an ETE student's working set.",
      },
      { property: "og:title", content: "Skills — Md. Tazbid Sikder" },
      {
        property: "og:description",
        content:
          "Engineering, programming, photography, and tool skills — an ETE student's working set.",
      },
    ],
  }),
  component: Skills,
});

type Group = {
  Icon: typeof Cpu;
  label: string;
  title: string;
  blurb: string;
  items: string[];
  span: string;
};

const groups: Group[] = [
  {
    Icon: Cpu,
    label: "Core discipline",
    title: "Electronics & Communication",
    blurb:
      "Circuits, signals, and systems — the theory behind every board I've ever soldered.",
    items: [
      "Circuit analysis & design",
      "Analog & digital electronics",
      "Signal processing",
      "Communication systems",
      "Embedded systems (Arduino, ESP32)",
      "PCB design",
    ],
    span: "md:col-span-2 md:row-span-2",
  },
  {
    Icon: Code2,
    label: "Programming",
    title: "Code",
    blurb: "Comfortable moving between low-level firmware and higher-level scripts.",
    items: ["Python", "C / C++", "MATLAB & Simulink", "Git"],
    span: "md:col-span-2",
  },
  {
    Icon: Camera,
    label: "Craft",
    title: "Photography",
    blurb: "Frames, light, and the patience to wait for both.",
    items: [
      "Portrait & street",
      "Lightroom",
      "Photoshop",
      "Color grading",
      "Composition",
    ],
    span: "md:col-span-2",
  },
  {
    Icon: Wrench,
    label: "Toolkit",
    title: "Tools & extras",
    blurb: "The small things that keep the work moving.",
    items: ["Figma", "Notion", "Premiere Pro", "LaTeX", "Technical writing"],
    span: "md:col-span-2",
  },
];

function Skills() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
      <FadeIn>
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          / 02 — What I bring
        </p>
        <h1 className="mt-4 font-display font-medium leading-[0.9] tracking-[-0.03em] text-foreground [font-size:clamp(3rem,9vw,7rem)]">
          Skills
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A working set built between the lab bench, my editor, and long walks with a camera.
        </p>
      </FadeIn>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5">
        {groups.map((g, i) => (
          <FadeIn key={g.title} delay={i * 0.06} className={g.span}>
            <motion.article
              {...cardPress}
              className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-md md:p-8"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border">
                    <g.Icon className="h-4 w-4 text-foreground" />
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                    {g.label}
                  </span>
                </div>
                <h2 className="mt-6 font-display text-2xl font-medium tracking-tight text-card-foreground md:text-3xl">
                  {g.title}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {g.blurb}
                </p>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-full border border-border px-3 py-1 text-[11px] font-medium tracking-wide text-muted-foreground transition-colors group-hover:border-foreground/30 group-hover:text-foreground"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </motion.article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
