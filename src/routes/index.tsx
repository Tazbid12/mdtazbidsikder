import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Cpu,
  FlaskConical,
  Camera,
  Linkedin,
  Facebook,
  Instagram,
  NotebookPen,
  FileText,
} from "lucide-react";
import { SOCIALS } from "../lib/socials";
import portraitAsset from "../assets/portrait.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Md. Tazbid Sikder — ETE, CUET & Photographer" },
      {
        name: "description",
        content:
          "Md. Tazbid Sikder — Electronics & Telecommunication Engineering student at CUET. Building systems and circuits, capturing quiet frames as a passionate photographer.",
      },
      { property: "og:title", content: "Md. Tazbid Sikder — ETE, CUET & Photographer" },
      {
        property: "og:description",
        content:
          "Md. Tazbid Sikder — Electronics & Telecommunication Engineering student at CUET. Building systems and circuits, capturing quiet frames as a passionate photographer.",
      },
      { property: "og:image", content: portraitAsset.url },
      { name: "twitter:image", content: portraitAsset.url },
    ],
  }),
  component: Index,
});

const socials = [
  { href: SOCIALS.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SOCIALS.instagram, label: "Instagram", Icon: Instagram },
  { href: SOCIALS.facebook, label: "Facebook", Icon: Facebook },
];

function Index() {
  return (
    <div className="relative min-h-[calc(100svh-4rem-12px)] overflow-x-hidden">
      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-[1400px] flex-col px-4 py-4 md:px-8 md:py-6">
        <div className="flex shrink-0 items-center justify-between text-xs uppercase tracking-[0.24em] text-muted-foreground md:text-[13px]">
          <span className="font-semibold text-foreground">Portfolio · 2026</span>
          <span className="hidden sm:inline">Chattogram, BD · 22°N 91°E</span>
          <span className="font-semibold text-foreground">ETE / CUET</span>
        </div>

        <div className="mt-3 grid min-h-0 flex-1 grid-cols-1 gap-2 md:mt-4 md:grid-cols-12 md:grid-rows-6 md:gap-3">
          <Tile className="md:col-span-5 md:row-span-6">
            <div className="flex h-full min-w-0 flex-col gap-2 md:gap-3">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-muted-foreground">
                    Md. Tazbid Sikder
                  </p>
                  <h1 className="mt-2 font-display font-medium leading-[1.05] tracking-[-0.02em] text-foreground [font-size:clamp(1.2rem,2.3vw,2.4rem)]">
                    Building systems &amp;
                    <br />
                    capturing quiet frames.
                  </h1>
                </div>
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border md:h-24 md:w-24">
                  <img
                    src={portraitAsset.url}
                    alt="Md. Tazbid Sikder"
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
              </div>

              <p className="max-w-md text-[12px] leading-relaxed text-muted-foreground md:text-sm">
                Electronics &amp; Telecommunication Engineering student at CUET. Building systems
                and circuits, while capturing quiet frames as a passionate photographer.
              </p>

              <div className="mt-auto flex items-center gap-2 pt-1">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/70 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground hover:text-background"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </Tile>

          <TileLink to="/skills" className="md:col-span-4 md:row-span-3">
            <TileHead Icon={Cpu} title="Skills" subtitle="Circuits, code, craft." />
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Embedded", "Signals", "C/C++", "Python", "MATLAB", "Lightroom"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-card/70 px-2 py-0.5 text-[9px] font-medium tracking-wide text-foreground backdrop-blur-sm md:px-2.5 md:py-1 md:text-[10px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </TileLink>

          <TileLink to="/labs" className="md:col-span-3 md:row-span-3">
            <TileHead Icon={FlaskConical} title="Labs" subtitle="Sessional benchwork." />
            <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
              <Metric value="12" label="Labs" />
              <Metric value="04" label="Semesters" />
            </div>
          </TileLink>

          <TileLink to="/photography" className="md:col-span-4 md:row-span-3">
            <CompactTile Icon={Camera} title="Photography" />
          </TileLink>

          <TileLink to="/blog" className="md:col-span-2 md:row-span-3">
            <CompactTile Icon={NotebookPen} title="Blog" />
          </TileLink>

          <TileLink to="/cv" className="md:col-span-1 md:row-span-3">
            <CompactTile Icon={FileText} title="CV" />
          </TileLink>
        </div>
      </div>
    </div>
  );
}

function Tile({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border bg-card/70 p-3 backdrop-blur-md md:p-5 ${className}`}
    >
      {children}
    </div>
  );
}

function TileLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} className={`group focus-visible:outline-none ${className}`}>
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-3 backdrop-blur-md transition-colors group-hover:border-foreground/60 md:p-5"
      >
        {children}
      </motion.div>
    </Link>
  );
}

function TileHead({
  Icon,
  title,
  subtitle,
}: {
  Icon: typeof Cpu;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border md:h-9 md:w-9">
          <Icon className="h-4 w-4" />
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
      <div className="mt-3 md:mt-4">
        <h2 className="truncate font-display text-xl font-medium tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
        <p className="mt-1 truncate text-[11px] text-muted-foreground md:text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

function CompactTile({ Icon, title }: { Icon: typeof Cpu; title: string }) {
  return (
    <div className="flex h-full min-w-0 items-center gap-2 md:gap-3">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground md:h-9 md:w-9">
        <Icon className="h-4 w-4" />
      </span>
      <p className="truncate font-display text-base font-medium tracking-tight text-foreground md:text-xl">
        {title}
      </p>
      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-card/70 px-2.5 py-2 backdrop-blur-md md:px-3">
      <div className="font-display text-lg font-medium leading-none tracking-tight text-foreground md:text-xl">
        {value}
      </div>
      <div className="mt-1 truncate text-[8px] font-medium uppercase tracking-[0.24em] text-muted-foreground md:text-[9px]">
        {label}
      </div>
    </div>
  );
}
