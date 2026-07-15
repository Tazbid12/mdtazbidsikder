import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

function AdminPage() {
  const [StudioComponent, setStudioComponent] = useState<any>(null);
  const [sanityConfig, setSanityConfig] = useState<any>(null);

  useEffect(() => {
    // This strictly forces Sanity and your config to only load in the browser
    const loadAdmin = async () => {
      const sanityModule = await import('sanity');
      const configModule = await import('../sanity.config');
      
      setSanityConfig(configModule.default);
      setStudioComponent(() => sanityModule.Studio);
    };

    loadAdmin();
  }, []);

  if (!StudioComponent || !sanityConfig) {
    return (
      <div className="flex h-[100svh] w-full items-center justify-center bg-background text-foreground font-medium">
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <div className="h-[100svh] w-full">
      <StudioComponent config={sanityConfig} />
    </div>
  );
}
