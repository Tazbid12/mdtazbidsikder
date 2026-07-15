import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "../components/FadeIn";
import { easeOut } from "../lib/motion";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Labs — Md. Tazbid Sikder" },
      {
        name: "description",
        content:
          "Sessional lab record — electronics, communication, and signal processing benchwork at CUET.",
      },
      { property: "og:title", content: "Labs — Md. Tazbid Sikder" },
      {
        property: "og:description",
        content:
          "Sessional lab record — electronics, communication, and signal processing benchwork at CUET.",
      },
    ],
  }),
  component: Labs,
});

type Lab = {
  code: string;
  title: string;
  status: "Completed" | "In Progress" | "Upcoming";
  summary: string;
  objective: string;
  tools: string[];
  tags: string[];
};

const labs: Lab[] = [
  {
    code: "ETE 201",
    title: "Electronics Lab I",
    status: "Completed",
    summary: "Diode characteristics, rectifiers, transistor biasing, and small-signal amplifiers.",
    objective: "Characterize discrete semiconductor devices and design basic amplifier stages.",
    tools: ["Oscilloscope", "Function generator", "Multisim", "Breadboard"],
    tags: ["Analog", "Devices"],
  },
  {
    code: "ETE 202",
    title: "Electronics Lab II",
    status: "Completed",
    summary: "Op-amp applications, oscillators, active filters, and waveform generation.",
    objective: "Build and test op-amp circuits and analyze their frequency behavior.",
    tools: ["Oscilloscope", "LTspice", "Bode plotter"],
    tags: ["Op-amp", "Filters"],
  },
  {
    code: "ETE 211",
    title: "Communication Lab I",
    status: "In Progress",
    summary: "AM/FM modulation, demodulation, and spectrum observation.",
    objective: "Observe modulation schemes on hardware and correlate with spectrum analysis.",
    tools: ["Spectrum analyzer", "Signal generator", "MATLAB"],
    tags: ["Modulation", "Signals"],
  },
  {
    code: "ETE 212",
    title: "Communication Lab II",
    status: "Upcoming",
    summary: "Digital modulation, PCM, and introductory fiber-optic experiments.",
    objective: "Extend analog work into digital carriers and optical links.",
    tools: ["Fiber trainer", "PCM kit", "MATLAB"],
    tags: ["Digital", "Optical"],
  },
  {
    code: "ETE 220",
    title: "Digital Electronics Lab",
    status: "Completed",
    summary: "Logic gates, combinational and sequential circuits, flip-flops, and counters.",
    objective: "Design and verify combinational and sequential logic on breadboard and FPGA.",
    tools: ["Logic analyzer", "Xilinx ISE", "74-series ICs"],
    tags: ["Logic", "FPGA"],
  },
  {
    code: "ETE 250",
    title: "Signal Processing Lab",
    status: "In Progress",
    summary: "MATLAB-based signal analysis, FFT, filtering, and basic audio processing.",
    objective: "Implement DSP fundamentals and analyze real-world audio signals.",
    tools: ["MATLAB", "Python (SciPy)", "Audacity"],
    tags: ["DSP", "MATLAB"],
  },
];

const statusDot: Record<Lab["status"], string> = {
  Completed: "bg-foreground",
  "In Progress": "bg-foreground/60",
  Upcoming: "bg-foreground/25",
};

function Labs() {
  const [open, setOpen] = useState<string | null>("ETE 201");
  const currentLab = labs.find((lab) => lab.status === "In Progress") ?? labs[0];

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
      <FadeIn>
        <h1 className="font-display font-medium leading-[0.9] tracking-[-0.03em] text-foreground [font-size:clamp(3rem,9vw,7rem)]">
          Sessional Labs
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Benchwork from the ETE curriculum at CUET, with objectives and tools captured per lab.
        </p>
      </FadeIn>

      <FadeIn delay={0.06}>
        <section className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
          <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-md md:col-span-4 md:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Overview
            </p>
            <div className="mt-3 flex items-end gap-6">
              <div>
                <p className="font-display text-3xl font-medium tracking-tight text-foreground">
                  04
                </p>
                <p className="text-xs text-muted-foreground">Semesters</p>
              </div>
              <div>
                <p className="font-display text-3xl font-medium tracking-tight text-foreground">
                  {labs.length}
                </p>
                <p className="text-xs text-muted-foreground">Labs</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Focus: analog, digital, communication, DSP
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-md md:col-span-8 md:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Current lab
            </p>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-foreground">
              {currentLab.code} — {currentLab.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {currentLab.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {currentLab.tools.slice(0, 4).map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <ul className="mt-10 space-y-3">
        {labs.map((lab, i) => {
          const isOpen = open === lab.code;
          return (
            <li
              key={lab.code}
              className="overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-md"
            >
              <button
                onClick={() => setOpen(isOpen ? null : lab.code)}
                className="group flex w-full items-center gap-4 px-5 py-5 text-left focus-visible:outline-none md:gap-8 md:px-8 md:py-7"
                aria-expanded={isOpen}
              >
                <span className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground md:w-12">
                  0{i + 1}
                </span>
                <span className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:w-24">
                  {lab.code}
                </span>
                <span className="min-w-0 flex-1">
                  <h2 className="truncate font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
                    {lab.title}
                  </h2>
                  <p className="mt-1 hidden text-sm text-muted-foreground md:block">
                    {lab.summary}
                  </p>
                </span>
                <span className="hidden items-center gap-2 md:flex">
                  <span className={`h-1.5 w-1.5 rounded-full ${statusDot[lab.status]}`} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {lab.status}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground group-hover:border-foreground/40 group-hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: easeOut }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-6 px-5 pb-6 md:grid-cols-12 md:gap-10 md:px-8 md:pb-8">
                      <div className="md:col-span-4 md:col-start-3">
                        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                          Objective
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground">
                          {lab.objective}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:hidden">
                          {lab.summary}
                        </p>
                      </div>
                      <div className="md:col-span-4">
                        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                          Tools
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {lab.tools.map((t) => (
                            <li
                              key={t}
                              className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:col-span-3">
                        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                          Tags
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {lab.tags.map((t) => (
                            <li
                              key={t}
                              className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:hidden">
                          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[lab.status]}`} />
                          {lab.status}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
