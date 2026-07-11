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
} from "lucide-react";
import { SpiderWeb } from "../components/SpiderWeb";
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
      { property: "og:title", content: "Md. Tazbid Sikder — Portfolio" },
      {
        property: "og:description",
        content:
          "Engineering & photography portfolio of Md. Tazbid Sikder — ETE, CUET.",
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
    <div
      className="relative overflow-hidden bg-[#F8F8F8]"
      style={{ height: "calc(100svh - 4rem)" }}
    >
      {/* interactive spider-web background */}
      <SpiderWeb color="#222222" />

      {/* soft top vignette to seat the header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col px-4 py-4 md:px-8 md:py-6">
        {/* Meta strip */}
        <div className="flex shrink-0 items-center justify-between text-[10px] font-medium uppercase tracking-[0.28em] text-[#7B7B7B]">
          <span>Portfolio · 2026</span>
          <span className="hidden sm:inline">Chattogram, BD · 22°N 91°E</span>
          <span>ETE / CUET</span>
        </div>

        {/* Dashboard grid */}
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-12 grid-rows-6 gap-2 md:mt-4 md:gap-3">
          {/* INTRO */}
          <Tile className="col-span-12 row-span-3 md:col-span-5 md:row-span-6">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#7B7B7B]">
                  Md. Tazbid Sikder
                </p>
                <h1 className="mt-3 font-display text-[clamp(1.6rem,4vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#222222]">
                  Building systems &amp;
                  <br />
                  capturing quiet frames.
                </h1>
                <p className="mt-4 max-w-md text-[13px] leading-relaxed text-[#7B7B7B] md:text-sm">
                  Electronics &amp; Telecommunication Engineering student at CUET.
                  Building systems and circuits, while capturing quiet frames as a
                  passionate photographer.
                </p>
              </div>

              <div className="mt-4 flex items-end justify-between gap-4">
                <div className="flex items-center gap-2">
                  {socials.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#7B7B7B]/40 text-[#222222] transition-colors hover:bg-[#222222] hover:text-white"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
                <div className="hidden h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#7B7B7B]/30 md:block">
                  <img
                    src={portraitAsset.url}
                    alt="Md. Tazbid Sikder"
                    className="h-full w-full object-cover grayscale"
                  />
                </div>
              </div>
            </div>
          </Tile>

          {/* SKILLS — primary */}
          <TileLink
            to="/skills"
            className="col-span-6 row-span-2 md:col-span-4 md:row-span-4"
          >
            <TileHead
              label="01 · Primary"
              Icon={Cpu}
              title="Skills"
              subtitle="Circuits, code, craft."
            />
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Embedded", "Signals", "C/C++", "Python", "MATLAB", "Lightroom"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#7B7B7B]/40 bg-white px-2.5 py-1 text-[10px] font-medium tracking-wide text-[#222222]"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </TileLink>

          {/* LABS — primary */}
          <TileLink
            to="/labs"
            className="col-span-6 row-span-2 md:col-span-3 md:row-span-4"
          >
            <TileHead
              label="02 · Primary"
              Icon={FlaskConical}
              title="Labs"
              subtitle="Sessional benchwork."
            />
            <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
              <Metric value="12" label="Labs" />
              <Metric value="04" label="Semesters" />
            </div>
          </TileLink>

          {/* PHOTOGRAPHY — secondary */}
          <TileLink
            to="/photography"
            className="col-span-8 row-span-1 md:col-span-4 md:row-span-2"
          >
            <div className="flex h-full items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#7B7B7B]/40 text-[#222222]">
                <Camera className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#7B7B7B]">
                  Secondary
                </p>
                <p className="truncate font-display text-lg font-medium tracking-tight text-[#222222] md:text-xl">
                  Photography
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[#7B7B7B]" />
            </div>
          </TileLink>

          {/* BLOG / NOTES */}
          <TileLink
            to="/blog"
            className="col-span-4 row-span-1 md:col-span-3 md:row-span-2"
          >
            <div className="flex h-full items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#7B7B7B]/40 text-[#222222]">
                <NotebookPen className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#7B7B7B]">
                  Journal
                </p>
                <p className="truncate font-display text-lg font-medium tracking-tight text-[#222222] md:text-xl">
                  Blog
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[#7B7B7B]" />
            </div>
          </TileLink>
        </div>
      </div>
    </div>
  );
}

function Tile({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#7B7B7B]/25 bg-white/70 p-4 backdrop-blur-md md:p-5 ${className}`}
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
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#7B7B7B]/25 bg-white/70 p-4 backdrop-blur-md transition-colors group-hover:border-[#222222]/60 md:p-5"
      >
        {children}
      </motion.div>
    </Link>
  );
}

function TileHead({
  label,
  Icon,
  title,
  subtitle,
}: {
  label: string;
  Icon: typeof Cpu;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#7B7B7B]/40 text-[#222222]">
          <Icon className="h-4 w-4" />
        </span>
        <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#7B7B7B]">
          {label}
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-2xl font-medium tracking-tight text-[#222222] md:text-3xl">
          {title}
        </h2>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#7B7B7B] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#222222]" />
      </div>
      <p className="mt-1 text-xs text-[#7B7B7B] md:text-sm">{subtitle}</p>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-[#7B7B7B]/25 bg-[#F8F8F8] px-3 py-2">
      <div className="font-display text-xl font-medium leading-none tracking-tight text-[#222222]">
        {value}
      </div>
      <div className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.24em] text-[#7B7B7B]">
        {label}
      </div>
    </div>
  );
}
