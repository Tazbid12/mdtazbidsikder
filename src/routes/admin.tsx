import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, lazy, Suspense } from 'react';

// VITE FIX: Sanity requires Node environment variables that Vite removes.
// This injects a safe fallback into the browser so Sanity doesn't instantly crash.
if (typeof window !== 'undefined' && !(window as any).process) {
  (window as any).process = { env: { NODE_ENV: 'production' } };
}

// Load the studio component from your components folder
const ClientStudio = lazy(() => import('../components/SanityStudio'));

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

function AdminPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 1. If the server is rendering, return an empty div to prevent SSR crashes
  if (!isClient) {
    return <div className="h-[100svh] w-full bg-background" />;
  }

  // 2. Once the browser takes over, safely load the polyfilled Studio
  return (
    <div className="h-[100svh] w-full bg-background">
      <Suspense fallback={
        <div className="flex h-full w-full items-center justify-center font-mono text-sm text-muted-foreground">
          Loading Admin Interface...
        </div>
      }>
        <ClientStudio />
      </Suspense>
    </div>
  );
}
