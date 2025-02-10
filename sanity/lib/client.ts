// lib/sanity.js
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'jzdxb64c', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your dataset name, usually 'production'
  apiVersion: '2025-02-10', // Specify the API version (can be a date)
  useCdn: true, // true if you want to use the CDN, false for fresh data
});
