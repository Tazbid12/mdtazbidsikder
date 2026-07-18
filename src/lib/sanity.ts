import { createClient } from '@sanity/client';

// We name it sanityClient here to make your skills.tsx file happy
export const sanityClient = createClient({
  projectId: 'jbds1kqs', 
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2024-03-01',
  stega: {
    enabled: true,
    studioUrl: '/admin', 
  },
});

// We also export it as 'client' to make your index.tsx file happy!
export const client = sanityClient;

// Helper function to fetch the Overview data
export async function getOverviewData() {
  return sanityClient.fetch(`*[_type == "overview"][0]`);
}
