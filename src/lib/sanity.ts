import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "jbds1kqs",
  dataset: "production",
  useCdn: true,
  apiVersion: "2026-07-16",
});
