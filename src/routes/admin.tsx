import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

function AdminPage() {
  const [Studio, setStudio] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Apply ALL Vite browser polyfills FIRST before Sanity even exists
    if (typeof window !== 'undefined') {
      (window as any).global = window;
      (window as any).process = (window as any).process || {
        env: { NODE_ENV: 'production' },
      };
    }

    // 2. Fetch the modules DYNAMICALLY so Vite cannot hoist them to the server
    const loadStudio = async () => {
      try {
        const sanity = await import('sanity');
        const sanityStructure = await import('sanity/structure');

        const studioConfig = sanity.defineConfig({
          name: 'default',
          title: 'Portfolio Admin',
          projectId: 'jbds1kqs',
          dataset: 'production',
          basePath: '/admin',
          plugins: [sanityStructure.structureTool()],
          schema: { types: [] }, // We will hook up your forms here next
        });

        setConfig(studioConfig);
        setStudio(() => sanity.Studio);
      } catch (err: any) {
        // If it fails, catch the exact error so we can read it on the screen
        setError(err.message || String(err));
      }
    };

    loadStudio();
  }, []);

  // 3. Render any crashes directly to the screen instead of the generic Lovable error
  if (error) {
    return (
      <div className="flex min-h-[100svh] flex-col items-center justify-center bg-red-50 p-6 text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Studio Failed to Load</h1>
        <pre className="max-w-2xl whitespace-pre-wrap rounded-lg bg-white p-4 text-left font-mono text-[11px] text-red-900 shadow border border-red-200">
          {error}
        </pre>
      </div>
    );
  }

  // 4. Show a safe loading screen while the massive Sanity package downloads
  if (!Studio || !config) {
    return (
      <div className="flex h-[100svh] w-full items-center justify-center bg-background font-mono text-sm text-muted-foreground">
        Booting Admin Dashboard...
      </div>
    );
  }

  // 5. Mount the dashboard
  return (
    <div className="h-[100svh] w-full bg-background overflow-hidden" id="sanity-root">
      <Studio config={config} />
    </div>
  );
}
