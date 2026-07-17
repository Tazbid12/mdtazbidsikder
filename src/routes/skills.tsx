import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Cpu, Code2, Camera, Wrench, LucideIcon } from "lucide-react";
import { FadeIn } from "../components/FadeIn";
import { cardPress } from "../lib/motion";
import { sanityClient } from "../sanity";

// Map strings from Sanity to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Code2,
  Camera,
  Wrench,
};

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
  // The loader fetches data before the component renders
  loader: async () => {
    try {
      const groups = await sanityClient.fetch(
        `*[_type == "skillGroup"] | order(_createdAt asc)`
      );
      const highlightsDoc = await sanityClient.fetch(
        `*[_type == "skillHighlights"][0]`
      );

      return {
        groups,
        // Fallback to your default array if Sanity hasn't been populated yet
        highlights: highlightsDoc?.items || [
          "Embedded systems",
          "Communication theory",
          "Python + C/C++",
          "Lightroom",
        ],
      };
    } catch (error) {
      console.error("Failed to fetch skills from Sanity:", error);
      return { groups: [], highlights: [] }; // Safe fallback
    }
  },
  component: Skills,
});

function Skills() {
  // Pull the fetched data from the TanStack route loader
  const { groups, highlights } = Route.useLoaderData();

  // Fallback to default groups if nothing is fetched yet
  const displayGroups = groups && groups.length > 0 ? groups : [
    {
      id: "electronics-communication",
      label: "Core discipline",
      title: "Electronics & Communication",
      blurb: "Circuits, signals, and systems — the theory behind every board I've ever soldered.",
      items: ["Circuit analysis & design", "Analog & digital electronics", "Signal processing", "Communication systems", "Embedded systems (Arduino, ESP32)", "PCB design"],
      span: "md:col-span-2 md:row-span-2",
      iconName: "Cpu"
    },
    {
      id: "code",
      label: "Programming",
      title: "Code",
      blurb: "Comfortable moving between low-level firmware and higher-level scripts.",
      items: ["Python", "C / C++", "MATLAB & Simulink", "Git"],
      span: "md:col-span-2",
      iconName: "Code2"
    },
    {
      id: "photography",
      label: "Craft",
      title: "Photography",
      blurb: "Frames, light, and the patience to wait for both.",
      items: ["Portrait & street", "Lightroom", "Photoshop", "Color grading", "Composition"],
      span: "md:col-span-2",
      iconName: "Camera"
    },
    {
      id: "tools-extras",
      label: "Toolkit",
      title: "Tools & extras",
      blurb: "The small things that keep the work moving.",
      items: ["Figma", "Notion", "Premiere Pro", "LaTeX", "Technical writing"],
      span: "md:col-span-2",
      iconName: "Wrench"
    }
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
      <FadeIn>
        <h1 className="font-display font-medium leading-[0.9] tracking-[-0.03em] text-foreground [font-size:clamp(3rem,9vw,7rem)]">
          Skills
        </h1>
        <p className="mt-6 max-w-2xl text-base font-semibold leading-relaxed text-muted-foreground md:text-lg">
          My core stack spans electronics, embedded work, and software tools, supported by visual
          craft through photography.
        </p>
      </FadeIn>

      <FadeIn delay={0.06}>
        <section className="mt-8 rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-md md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Top tools / current focus
            </span>
            {highlights.map((item: string) => (
              <span
                key={item}
                className="rounded-full border border-border px-3 py-1 text-[11px] font-medium tracking-wide text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </FadeIn>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5">
        {displayGroups.map((g: any, i: number) => {
          const IconComponent = iconMap[g.iconName] || Cpu;

          return (
            <FadeIn key={g.title} delay={i * 0.06} className={g.span}>
              <motion.article
                id={g.id}
                {...cardPress}
                className="group scroll-mt-24 flex h-full flex-col justify-between rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-md md:p-8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border">
                      <IconComponent className="h-4 w-4 text-foreground" />
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                      {g.label}
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-medium tracking-tight text-card-foreground md:text-3xl">
                    {g.title}
                  </h2>
                  <p className="mt-3 max-w-md text-sm font-semibold leading-relaxed text-foreground/85">
                    {g.blurb}
                  </p>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {g.items?.map((it: string) => (
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
          );
        })}
      </div>
    </div>
  );
}
