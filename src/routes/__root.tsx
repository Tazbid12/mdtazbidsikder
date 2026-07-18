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
import { VisualEditing } from "@sanity/visual-editing";

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
import { ThemeProvider, useTheme } from "../components/ThemeProvider";
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
          "Md. Tazbid Sikder — Electronics & Telecommunication Engineering student at CUET. Building systems and circuits, capturing quiet frames as a passionate photographer.",
      },
      { name: "author", content: "Md. Tazbid Sikder" },
      { property: "og:title", content: "Md. Tazbid Sikder — ETE, CUET & Photographer" },
      {
        property: "og:description",
        content:
          "Md. Tazbid Sikder — Electronics & Telecommunication Engineering student at CUET. Building systems and circuits, capturing quiet frames as a passionate photographer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Md. Tazbid Sikder — ETE, CUET & Photographer" },
      { name: "twitter:description", content: "Md. Tazbid Sikder — Electronics & Telecommunication Engineering student at CUET. Building systems and circuits, capturing quiet frames as a passionate photographer." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b31684f4-8beb-46d8-a643-122d7f10656b/id-preview-0134fbed--dfc81836-aa02-4ba0-b8dd-73e81a601da7.lovable.app-1783998372435.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b31684f4-8beb-46d8-a643-122d7f10656b/id-preview-0134fbed--dfc81836-aa02-4ba0-b8dd-73e81a601da7.lovable.app-1783998372435.png" },
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
        <ThemedBackground isPhotography={isPhotography} />
        {/* The visual editing listener that connects the live preview in Sanity */}
        <VisualEditing />
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

function ThemedBackground({ isPhotography }: { isPhotography: boolean }) {
  const { theme } = useTheme();
  const webColor = theme === "dark" ? "#FFFFFF" : "#222222";
  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-background">
      <SpiderWeb
        color={webColor}
        density={isPhotography ? 0.00024 : 0.00042}
        linkDistance={isPhotography ? 150 : 180}
        linkAlpha={isPhotography ? 0.28 : theme === "dark" ? 0.45 : 0.55}
        nodeAlpha={isPhotography ? 0.5 : theme === "dark" ? 0.75 : 0.9}
        nodeRadius={isPhotography ? 1.4 : 1.9}
        blurPx={isPhotography ? 2.5 : 0}
      />
    </div>
  );
}
