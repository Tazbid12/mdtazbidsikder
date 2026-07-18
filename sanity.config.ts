import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './src/schemas';

export default defineConfig({
  name: 'default',
  title: 'My Admin Panel',
  projectId: 'jbds1kqs',
  dataset: 'production',
  basePath: '/admin',
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: '/', // This loads your live frontend inside the admin panel
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
