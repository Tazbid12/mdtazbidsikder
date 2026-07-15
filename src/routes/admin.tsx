import { createFileRoute } from '@tanstack/react-router';
import { Studio } from 'sanity';
import config from '../sanity.config';
import { useState, useEffect } from 'react';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

function AdminPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex h-[100svh] w-full items-center justify-center bg-background text-foreground">
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <div className="h-[100svh] w-full">
      <Studio config={config} />
    </div>
  );
}
