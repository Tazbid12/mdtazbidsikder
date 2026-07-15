import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect, lazy, Suspense } from 'react';

// 1. We tell Vite to bundle the Studio in a separate chunk that the server ignores
const ClientStudio = lazy(() => import('../components/SanityStudio'));

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

function AdminPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 2. This ONLY triggers in the user's browser
    setIsClient(true);
  }, []);

  // 3. The Server stops here. It never reaches the Sanity import.
  if (!isClient) {
    return (
      <div className="flex h-[100svh] w-full items-center justify-center font-mono text-sm text-muted-foreground">
        Loading Admin Environment...
      </div>
    );
  }

  // 4. The Browser takes over and safely mounts the heavy Sanity UI
  return (
    <div className="h-[100svh] w-full bg-background">
      <Suspense fallback={
        <div className="flex h-[100svh] w-full items-center justify-center font-mono text-sm text-muted-foreground">
          Loading Studio UI...
        </div>
      }>
        <ClientStudio />
      </Suspense>
    </div>
  );
}
