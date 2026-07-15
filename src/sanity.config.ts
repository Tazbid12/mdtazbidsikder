import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'Portfolio Admin',
  projectId: 'jbds1kqs',
  dataset: 'production',
  basePath: '/admin',
  plugins: [structureTool()],
  schema: {
    types: [], // We will add your schemas here in the next step
  },
});
