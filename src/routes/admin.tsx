import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

function AdminPage() {
  const [StudioComponent, setStudioComponent] = useState<any>(null);
  const [sanityConfig, setSanityConfig] = useState<any>(null);

  useEffect(() => {
    const initSanity = async () => {
      try {
        // 1. We load the packages ONLY inside this browser environment
        const { Studio, defineConfig } = await import('sanity');
        const { structureTool } = await import('sanity/structure');

        // 2. We build the config inline so the server never sees it
        const config = defineConfig({
          name: 'default',
          title: 'Portfolio Admin',
          projectId: 'jbds1kqs',
          dataset: 'production',
          basePath: '/admin',
          plugins: [structureTool()],
          schema: {
            types: [], // We will hook up your pageContent/tabs here next
          },
        });

        setSanityConfig(config);
        setStudioComponent(() => Studio);
      } catch (error) {
        console.error("Sanity failed to load:", error);
      }
    };

    initSanity();
  }, []);

  if (!StudioComponent || !sanityConfig) {
    return (
      <div className="flex h-[100svh] w-full items-center justify-center font-mono text-sm text-muted-foreground">
        Booting Studio Environment...
      </div>
    );
  }

  return (
    <div className="h-[100svh] w-full">
      <StudioComponent config={sanityConfig} />
    </div>
  );
}
