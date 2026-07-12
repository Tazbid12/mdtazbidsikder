import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";

import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "../components/ThemeProvider";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { SpiderWeb } from "../components/SpiderWeb";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Md. Tazbid Sikder — ETE, CUET & Photographer" },
      {
        name: "description",
        content:
          "Portfolio of Md. Tazbid Sikder — Electronics & Telecommunication Engineering student at CUET, and a photographer.",
      },
      { name: "author", content: "Md. Tazbid Sikder" },
      { property: "og:title", content: "Md. Tazbid Sikder — ETE, CUET & Photographer" },
      {
        property: "og:description",
        content:
          "Portfolio of Md. Tazbid Sikder — Electronics & Telecommunication Engineering student at CUET, and a photographer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const isHome = pathname === "/";
  const isPhotography = pathname.startsWith("/photography");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* Global spider-web background — sits behind every page. */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-[#F8F8F8]">
          <SpiderWeb
            color="#222222"
            // On photography, keep the web present but softer so images dominate.
            density={isPhotography ? 0.00018 : 0.00028}
            linkDistance={isPhotography ? 140 : 170}
            linkAlpha={isPhotography ? 0.28 : 0.55}
            nodeAlpha={isPhotography ? 0.55 : 0.9}
            nodeRadius={isPhotography ? 1.4 : 1.9}
            blurPx={isPhotography ? 2.5 : 0}
          />
        </div>
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-16">
            <AnimatePresence mode="wait">
              <PageTransition key={pathname}>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          </main>
          {!isHome && <Footer />}
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
