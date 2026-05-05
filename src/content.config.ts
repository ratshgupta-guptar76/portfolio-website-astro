import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const status = z.enum(['Verified', 'Taped Out', 'In Progress', 'Published']);

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    status,
    stack: z.array(z.string()),
    tags: z.array(z.string()),
    source: z.string().optional(),
    paper: z.string().optional(),
    order: z.number().optional(),
    results: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    synthesis: z
      .array(
        z.object({
          stage: z.string(),
          frequency: z.string(),
          slack: z.string(),
          area: z.string(),
        }),
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()),
    lede: z.string(),
    references: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
