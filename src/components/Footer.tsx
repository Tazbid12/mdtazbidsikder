import { Linkedin, Facebook, Instagram } from "lucide-react";
import { SOCIALS } from "../lib/socials";

export function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { href: SOCIALS.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: SOCIALS.facebook, label: "Facebook", Icon: Facebook },
    { href: SOCIALS.instagram, label: "Instagram", Icon: Instagram },
  ];

  return (
    <footer className="border-t border-border/40 bg-background/60 py-10 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {year} Md. Tazbid Sikder — ETE, CUET.
        </p>
        <div className="flex items-center gap-1">
          {links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
