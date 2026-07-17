import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

// Dynamically load Sanity only in the browser
const LazyStudio = lazy(async () => {
  const { Studio } = await import('sanity');
  const config = (await import('../../../sanity.config')).default;
  return { default: () => <Studio config={config} /> };
});

// The '$' tells TanStack to catch all URLs after /admin/
export const Route = createFileRoute('/admin/$')({
  component: AdminPanel,
  ssr: false, 
});

function AdminPanel() {
  return (
    <div className="h-screen w-full">
      <Suspense fallback={<div className="p-4 text-sm">Loading Sanity Studio...</div>}>
        <LazyStudio />
      </Suspense>
    </div>
  );
}
