// Builds favicons and the default social share image from the logo and a job photo.
//   node scripts/make-brand-images.mjs
// Re-run after replacing src/assets/brand/logo.* or changing the share photo below.

import sharp from 'sharp';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const logo = path.join(root, 'src/assets/brand/logo.jpg');
const sharePhoto = path.join(root, 'src/assets/projects/roadside-clearance-boundary-fence/roadside-clearance-boundary-fence-after-1.jpg');
const out = (f) => path.join(root, 'public', f);

// Circular logo on transparent background
const circle = async (size) => {
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`);
  return sharp(logo).resize(size, size, { fit: 'cover' }).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
};

await sharp(await circle(64)).toFile(out('favicon.png'));
await sharp(await circle(180)).flatten({ background: '#0a0a0a' }).toFile(out('apple-touch-icon.png'));

// 1200x630 share image: photo on the right, black panel with logo and line on the left
const W = 1200, H = 630, panel = 520;
const photo = await sharp(sharePhoto).resize(W - panel, H, { fit: 'cover' }).toBuffer();
const text = Buffer.from(`<svg width="${panel}" height="${H}">
  <style>.t{font-family:Arial Narrow,Arial,sans-serif;font-weight:800;fill:#fff}.s{font-family:Arial,sans-serif;fill:#b9bcb7}</style>
  <text x="56" y="330" class="t" font-size="54">Tree work</text>
  <text x="56" y="392" class="t" font-size="54">and fencing</text>
  <text x="56" y="454" class="t" font-size="54">across West</text>
  <text x="56" y="516" class="t" font-size="54">Yorkshire</text>
  <rect x="56" y="552" width="80" height="6" fill="#d92128"/>
</svg>`);
await sharp({ create: { width: W, height: H, channels: 3, background: '#0a0a0a' } })
  .composite([
    { input: photo, left: panel, top: 0 },
    { input: text, left: 0, top: 0 },
    { input: await circle(150), left: 56, top: 70 },
  ])
  .jpeg({ quality: 85 })
  .toFile(out('og-default.jpg'));

console.log('Wrote public/favicon.png, public/apple-touch-icon.png, public/og-default.jpg');
