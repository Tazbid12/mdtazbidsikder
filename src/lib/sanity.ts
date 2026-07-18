import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'jbds1kqs', // Your specific project ID from sanity.config.ts
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2024-03-01',
  stega: {
    enabled: true,
    studioUrl: '/admin', // This tells the live site where your editor lives
  },
});

// Helper function to fetch the Overview data
export async function getOverviewData() {
  return client.fetch(`*[_type == "overview"][0]`);
}
