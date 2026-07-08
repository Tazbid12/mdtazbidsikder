import { createFileRoute } from "@tanstack/react-router";
import { FadeIn } from "../components/FadeIn";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Portfolio" },
      {
        name: "description",
        content:
          "Engineering, programming, and creative skills of an ETE student and photographer.",
      },
      { property: "og:title", content: "Skills — Portfolio" },
      {
        property: "og:description",
        content:
          "Engineering, programming, and creative skills of an ETE student and photographer.",
      },
    ],
  }),
  component: Skills,
});

const engineeringSkills = [
  "Circuit Analysis & Design",
  "Analog & Digital Electronics",
  "Signal Processing",
  "Communication Systems",
  "MATLAB & Simulink",
  "Embedded Systems (Arduino, ESP32)",
  "PCB Design",
  "Python & C/C++",
];

const creativeSkills = [
  "Digital Photography",
  "Lightroom & Photoshop",
  "Color Grading",
  "Composition & Visual Storytelling",
  "Portrait & Street Photography",
  "Adobe Premiere Basics",
  "UI/UX Sensibility",
  "Technical Writing",
];

function Skills() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <FadeIn>
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          What I bring
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Skills
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          A mix of hardware thinking, software tools, and visual craft — built through coursework,
          personal projects, and countless hours behind the camera.
        </p>
      </FadeIn>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-2xl font-medium text-card-foreground">Engineering</h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {engineeringSkills.map((skill) => (
                <li key={skill} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-2xl font-medium text-card-foreground">Creative</h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {creativeSkills.map((skill) => (
                <li key={skill} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-ring" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
