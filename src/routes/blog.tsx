import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "../components/FadeIn";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Portfolio" },
      {
        name: "description",
        content: "Notes, thoughts, and experiments from an engineering student and photographer.",
      },
      { property: "og:title", content: "Blog — Portfolio" },
      {
        property: "og:description",
        content: "Notes, thoughts, and experiments from an engineering student and photographer.",
      },
    ],
  }),
  component: Blog,
});

const posts = [
  {
    title: "Why I Shoot in Manual Mode",
    excerpt:
      "Understanding exposure triangle made me a better photographer and a more patient engineer.",
    date: "June 2026",
    platform: "LinkedIn",
    url: "https://www.linkedin.com",
  },
  {
    title: "My First PCB Design",
    excerpt:
      "Lessons learned from routing traces, choosing components, and debugging a power supply board.",
    date: "May 2026",
    platform: "Facebook",
    url: "https://www.facebook.com",
  },
  {
    title: "Signal vs Noise",
    excerpt: "A short reflection on filtering — both in circuits and in daily life.",
    date: "April 2026",
    platform: "LinkedIn",
    url: "https://www.linkedin.com",
  },
  {
    title: "Campus Photography Walk",
    excerpt: "A collection of frames from an evening walk around CUET.",
    date: "March 2026",
    platform: "Facebook",
    url: "https://www.facebook.com",
  },
];

function Blog() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <FadeIn>
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Notes & stories
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Blog
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Thoughts on engineering, photography, and everything in between. Links open on LinkedIn or
          Facebook.
        </p>
      </FadeIn>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post, index) => (
          <FadeIn key={post.title} delay={index * 0.08}>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/20 hover:bg-accent"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-muted-foreground">{post.date}</span>
                <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {post.platform}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-medium text-card-foreground group-hover:underline">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                Read post
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
