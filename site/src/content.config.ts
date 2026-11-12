import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { serviceSlugs } from './data/business';

const service = z.enum(serviceSlugs);

// One entry per job. Photos live in src/assets/projects/<slug>/ (see scripts/prepare-photos.mjs).
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(200),
      date: z.coerce.date(),
      town: z.string().optional(), // town only, never a street address. Added after client review
      services: z.array(service).min(1),
      pairs: z
        .array(
          z.object({
            before: image(),
            after: image(),
            caption: z.string().optional(),
            focus: z.string().optional(), // CSS object-position to line up the pair, e.g. "50% 70%"
          }),
        )
        .default([]),
      gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    answer: z.string().max(500), // the direct answer shown at the top of the guide (aim for 40-80 words)
    category: z.enum(['residential', 'commercial']),
    services: z.array(service).default([]),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    reviewedBy: z.string(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

const reviews = defineCollection({
  loader: file('./src/content/reviews.json'),
  schema: z.object({
    author: z.string(),
    rating: z.number().int().min(1).max(5),
    text: z.string(),
    date: z.coerce.date(),
    source: z.enum(['google', 'facebook', 'checkatrade', 'direct']),
    services: z.array(service).default([]),
    project: reference('projects').optional(),
  }),
});

// Area pages only exist where there are real jobs, so at least one project is required.
const areas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/areas' }),
  schema: z.object({
    town: z.string(),
    council: z.string(),
    description: z.string().max(160),
    projects: z.array(reference('projects')).min(1),
  }),
});

export const collections = { projects, guides, reviews, areas };
