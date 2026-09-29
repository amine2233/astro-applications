import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    // Extra front-matter fields you can use in any page (optional).
    schema: docsSchema({
      extend: z.object({
        appVersion: z.string().optional(),
        effectiveDate: z.string().optional(),
      }),
    }),
  }),
};
