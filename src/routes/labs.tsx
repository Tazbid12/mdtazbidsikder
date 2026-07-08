import { createFileRoute } from "@tanstack/react-router";
import { FadeIn } from "../components/FadeIn";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Labs — Portfolio" },
      {
        name: "description",
        content: "Sessional lab work in electronics and communication engineering.",
      },
      { property: "og:title", content: "Labs — Portfolio" },
      {
        property: "og:description",
        content: "Sessional lab work in electronics and communication engineering.",
      },
    ],
  }),
  component: Labs,
});

const labs = [
  {
    code: "ETE 201",
    title: "Electronics Lab I",
    description:
      "Diode characteristics, rectifiers, transistor biasing, and small-signal amplifiers.",
    status: "Completed",
  },
  {
    code: "ETE 202",
    title: "Electronics Lab II",
    description:
      "Op-amp applications, oscillators, active filters, and waveform generation circuits.",
    status: "Completed",
  },
  {
    code: "ETE 211",
    title: "Communication Lab I",
    description:
      "Amplitude and frequency modulation, demodulation techniques, and spectrum observation.",
    status: "In Progress",
  },
  {
    code: "ETE 212",
    title: "Communication Lab II",
    description:
      "Digital modulation, pulse code modulation, and introductory fiber-optic experiments.",
    status: "Upcoming",
  },
  {
    code: "ETE 220",
    title: "Digital Electronics Lab",
    description: "Logic gates, combinational and sequential circuits, flip-flops, and counters.",
    status: "Completed",
  },
  {
    code: "ETE 250",
    title: "Signal Processing Lab",
    description: "MATLAB-based signal analysis, FFT, filtering, and basic audio processing.",
    status: "In Progress",
  },
];

const statusStyles: Record<string, string> = {
  Completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "In Progress": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Upcoming: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

function Labs() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <FadeIn>
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Hands-on learning
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Sessional Labs
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          A record of the practical work I’ve done as part of my ETE degree at CUET.
        </p>
      </FadeIn>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab, index) => (
          <FadeIn key={lab.code} delay={index * 0.08}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs font-medium text-muted-foreground">
                  {lab.code}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[lab.status]}`}
                >
                  {lab.status}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-medium text-card-foreground">
                {lab.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {lab.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
