import type { ImageMetadata } from 'astro';

// Photos uploaded through the admin are saved under src/assets/images and the
// YAML stores their path, e.g. "/src/assets/images/work/projects/<slug>/image.jpg".
// HEIC isn't listed: browsers can't show it and the image optimizer can't read it.
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/{work,site}/**/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}',
  { eager: true },
);

/** Look up an uploaded image by the path stored in the YAML. Returns null (and warns) if it can't be used. */
export function getImage(path: string | null | undefined): ImageMetadata | null {
  if (!path) return null;
  const match = images[path];
  if (!match) {
    console.warn(`[images] Skipping "${path}": file missing or not a JPG/PNG/WebP/AVIF/GIF.`);
    return null;
  }
  return match.default;
}
