import { createFileRoute } from '@tanstack/react-router';
import { Studio } from 'sanity';
import config from '../../sanity.config';

export const Route = createFileRoute('/admin')({
  component: AdminPanel,
});

function AdminPanel() {
  return (
    <div className="h-screen w-full">
      <Studio config={config} />
    </div>
  );
}
