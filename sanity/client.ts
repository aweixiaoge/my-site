import { createClient } from "next-sanity";
export const client = createClient({
  projectId: "hgjts5tp",
  dataset: "production",
  apiVersion: "2026-09-25",
  useCdn: false,
});
