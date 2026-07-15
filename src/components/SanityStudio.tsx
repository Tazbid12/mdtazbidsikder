import { Studio, defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

const config = defineConfig({
  name: 'default',
  title: 'Portfolio Admin',
  projectId: 'jbds1kqs',
  dataset: 'production',
  basePath: '/admin',
  plugins: [structureTool()],
  schema: { types: [] }, // We will connect your forms here once it loads
});

export default function SanityStudio() {
  return <Studio config={config} />;
}
