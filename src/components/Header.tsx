import { Link } from "@tanstack/react-router";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Overview" },
  { to: "/skills", label: "Skills" },
  { to: "/labs", label: "Labs" },
  { to: "/photography", label: "Photography" },
  { to: "/blog", label: "Blog" },
  { href: "YOUR_OVERLEAF_LINK_HERE", label: "CV", external: true },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-display text-lg font-medium tracking-tight text-foreground">
          Md. Tazbid Sikder
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to!}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                activeOptions={{ exact: true }}
                className="relative px-3 py-2 text-sm font-medium transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground transition-colors hover:bg-accent"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-secondary-foreground transition-colors hover:bg-accent md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/50 bg-background md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to!}
                    onClick={() => setMobileOpen(false)}
                    activeProps={{ className: "text-foreground" }}
                    inactiveProps={{ className: "text-muted-foreground" }}
                    activeOptions={{ exact: true }}
                    className="py-2 text-sm font-medium transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
