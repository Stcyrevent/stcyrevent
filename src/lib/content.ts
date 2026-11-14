// Shared helpers that read the editable YAML files and image folders.
// Kendra never needs to edit this file.
import { readFileSync } from 'fs';
import { parse } from 'yaml';
import type { ImageMetadata } from 'astro';

export const load = (name: string): any =>
  parse(readFileSync(`src/data/${name}.yaml`, 'utf-8'));

export const site = () => load('site');
export const services = () => load('services');
export const clients = (): any[] => load('clients').clients ?? [];
export const testimonials = (): any[] => load('testimonials').testimonials ?? [];

/** Turn **bold** markers into <b> tags (text is our own YAML, so it's safe). */
export const boldify = (s: string = '') =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/\*\*\s*(.+?)\s*\*\*/g, '<b>$1</b>');

export const SERVICE_NAMES: Record<string, string> = {
  FS: 'Full Service Coordination',
  PE: 'Pre-Event Coordination',
  OS: 'On-Site',
  VC: 'Virtual Consultation',
};

// ---------- Logos ----------
const logoFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/logos/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
  { eager: true },
);

/**
 * Logos listed in clients.yaml (in that order), each sized so they look
 * roughly equal in visual weight: same area, capped width/height.
 */
export function logoWall() {
  const byFile = new Map(
    Object.entries(logoFiles).map(([p, m]) => [p.split('/').pop()!.toLowerCase(), m.default]),
  );
  const AREA = 4600, MAX_W = 150, MAX_H = 62;
  return clients()
    .filter((c) => c.logo && byFile.has(String(c.logo).toLowerCase()))
    .map((c) => {
      const img = byFile.get(String(c.logo).toLowerCase())!;
      const ratio = img.width / img.height;
      let w = Math.sqrt(AREA * ratio);
      let h = w / ratio;
      if (w > MAX_W) { w = MAX_W; h = w / ratio; }
      if (h > MAX_H) { h = MAX_H; w = h * ratio; }
      return { name: c.name, src: img, w: Math.round(w), h: Math.round(h) };
    });
}

// ---------- Work photos ----------
const workFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/work/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

/**
 * Reads photos from src/assets/images/work/ named
 *   CLIENT_Event Title_SERVICE_number.jpg
 * and returns them with caption, client, sector and service.
 * Photos are interleaved across clients so the gallery feels varied.
 */
export function workPhotos() {
  const cl = new Map(clients().map((c) => [String(c.code).toUpperCase(), c]));
  const items = Object.entries(workFiles)
    .map(([path, mod]) => {
      const file = path.split('/').pop()!;
      const base = file.replace(/\.[^.]+$/, '');
      const [code = '', title = '', svc = ''] = base.split('_').map((s) => s.trim());
      const client = cl.get(code.toUpperCase());
      const service = svc.toUpperCase();
      return {
        file,
        src: mod.default,
        title: title || base,
        client: client?.name ?? code,
        sector: client?.sector ?? '',
        service: SERVICE_NAMES[service] ? service : '',
        serviceName: SERVICE_NAMES[service] ?? '',
      };
    })
    .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }));

  // Round-robin by client so one client doesn't fill the whole strip.
  const groups = new Map<string, typeof items>();
  for (const it of items) {
    if (!groups.has(it.client)) groups.set(it.client, []);
    groups.get(it.client)!.push(it);
  }
  const out: typeof items = [];
  const lists = [...groups.values()];
  let added = true;
  for (let i = 0; added; i++) {
    added = false;
    for (const l of lists) if (l[i]) { out.push(l[i]); added = true; }
  }
  return out;
}
