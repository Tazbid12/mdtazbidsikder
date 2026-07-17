import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Studio } from 'sanity';
import config from '../../sanity.config';

export const Route = createFileRoute('/admin')({
  component: AdminPanel,
});

function AdminPanel() {
  const [isClient, setIsClient] = useState(false);

  // This forces the Studio to ONLY load in the browser, preventing the server crash
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="h-screen w-full">
      <Studio config={config} />
    </div>
  );
}
