// Prepares a job's raw photos for the site.
//
//   node scripts/prepare-photos.mjs <input-folder> <project-slug> [town] [service]
//   e.g. node scripts/prepare-photos.mjs ../photos/smith-fence close-board-fence-wakefield Wakefield garden-fencing
//
// - Strips ALL metadata (EXIF/GPS), so customers' home locations don't leak from phone photos
// - Applies the phone's rotation, caps size at 2400px (Astro makes the AVIF/WebP sizes at build)
//   and evens out levels so before/after pairs match
// - Names files <slug>-before-1.jpg / <slug>-after-1.jpg when "before"/"after" is in the original name
// - Writes src/assets/projects/<slug>/ and a draft src/content/projects/<slug>.md if one doesn't exist

import { readdir, mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [input, slug, town, service = 'TODO'] = process.argv.slice(2);
if (!input || !slug) {
  console.error('Usage: node scripts/prepare-photos.mjs <input-folder> <project-slug> [town] [service]');
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error('Slug must be lowercase letters, numbers and hyphens, e.g. close-board-fence-wakefield');
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'src/assets/projects', slug);
const mdPath = path.join(root, 'src/content/projects', `${slug}.md`);
await mkdir(outDir, { recursive: true });

const files = (await readdir(input))
  .filter((f) => /\.(jpe?g|png|heic|heif|webp)$/i.test(f))
  .sort();

const counts = { before: 0, after: 0, photo: 0 };
const written = { before: [], after: [], photo: [] };

for (const f of files) {
  const kind = /before/i.test(f) ? 'before' : /after/i.test(f) ? 'after' : 'photo';
  const name = `${slug}-${kind}-${++counts[kind]}.jpg`;
  await sharp(path.join(input, f))
    .rotate() // apply EXIF orientation before the metadata is dropped
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    .normalise({ lower: 1, upper: 99 }) // gentle levels so before/after shots match in brightness and contrast
    .jpeg({ quality: 82, mozjpeg: true }) // sharp drops metadata unless told to keep it
    .toFile(path.join(outDir, name));
  written[kind].push(name);
  console.log(`${f} -> ${name}`);
}

const exists = await access(mdPath).then(() => true, () => false);
if (!exists) {
  const rel = (n) => `../../assets/projects/${slug}/${n}`;
  const pairs = written.before
    .map((b, i) => written.after[i] && `  - before: ${rel(b)}\n    after: ${rel(written.after[i])}`)
    .filter(Boolean);
  const gallery = written.photo.map((p) => `  - src: ${rel(p)}\n    alt: TODO`);
  const md = `---
title: TODO
summary: TODO, one or two sentences on the job
date: ${new Date().toISOString().slice(0, 10)}
${town ? `town: ${town}` : '# town: added after client review'}
services: [${service}]
pairs:
${pairs.join('\n') || '  []'}
gallery:
${gallery.join('\n') || '  []'}
draft: true
---

What the customer needed, what we did, how long it took.
`;
  await mkdir(path.dirname(mdPath), { recursive: true });
  await writeFile(mdPath, md);
  console.log(`Draft project created: ${path.relative(root, mdPath)}`);
}

console.log(`Done: ${files.length} photos, metadata stripped.`);
