import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
  // This replaces the generic Lovable error with the EXACT crash reason
  errorComponent: ({ error }) => (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-red-50 p-6 text-center">
      <h1 className="mb-4 text-2xl font-bold text-red-600">Sanity Studio Crashed</h1>
      <p className="mb-4 text-sm font-medium text-red-800">Please send a screenshot of this exact error so I can fix it:</p>
      <pre className="max-w-2xl whitespace-pre-wrap rounded-lg bg-white p-4 text-left font-mono text-[11px] text-red-900 shadow border border-red-200">
        {error.message || String(error)}
      </pre>
    </div>
  ),
});

function AdminPage() {
  const [StudioComponent, setStudioComponent] = useState<any>(null);
  const [sanityConfig, setSanityConfig] = useState<any>(null);
  const [crashError, setCrashError] = useState<Error | null>(null);

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const sanityModule = await import('sanity');
        const configModule = await import('../sanity.config');
        
        setSanityConfig(configModule.default);
        setStudioComponent(() => sanityModule.Studio);
      } catch (err: any) {
        // If the files fail to load, catch it and trigger the error screen
        setCrashError(err);
      }
    };

    loadAdmin();
  }, []);

  // Throw the caught error so the errorComponent above can display it
  if (crashError) throw crashError;

  if (!StudioComponent || !sanityConfig) {
    return (
      <div className="flex h-[100svh] w-full items-center justify-center bg-background text-foreground font-medium">
        Booting Admin Panel...
      </div>
    );
  }

  return (
    <div className="h-[100svh] w-full" id="sanity-studio-root">
      <StudioComponent config={sanityConfig} />
    </div>
  );
}
