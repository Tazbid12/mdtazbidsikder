import { createFileRoute } from '@tanstack/react-router';
import { Studio } from 'sanity';
import config from '../sanity.config';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className="h-[100svh] w-full">
      <Studio config={config} />
    </div>
  );
}
