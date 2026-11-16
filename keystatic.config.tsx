import { config, fields, singleton } from '@keystatic/core';
import { color } from './src/keystatic/color-field';

// Locally (`npm run dev`) the admin edits files on disk. On the live site it
// signs in with GitHub and saves each change as a commit, which Vercel deploys.
// Set PUBLIC_KEYSTATIC_STORAGE=github to use GitHub mode locally (needed once,
// to create the GitHub App — see README).
const storage = import.meta.env.DEV && import.meta.env.PUBLIC_KEYSTATIC_STORAGE !== 'github'
  ? ({ kind: 'local' } as const)
  : ({ kind: 'github', repo: 'tarunraja1/stcyrevent' } as const);

const PHOTO_HELP =
  'JPG, PNG or WebP. iPhone HEIC photos will not show on the site — export as JPG first. Keep files under about 10 MB.';

const sitePhoto = (label: string) =>
  fields.image({
    label,
    description: PHOTO_HELP,
    directory: 'src/assets/images/site',
    publicPath: '/src/assets/images/site',
    validation: { isRequired: true },
  });

const tint = (label: string) =>
  fields.object(
    {
      color: color({ label: 'Color' }),
      opacity: fields.integer({
        label: 'Strength (%)',
        description: '0 = invisible, 100 = solid color',
        validation: { min: 0, max: 100, isRequired: true },
        defaultValue: 10,
      }),
    },
    { label, layout: [6, 6] },
  );

export default config({
  storage,
  ui: {
    brand: { name: 'St. Cyr Event Co.' },
    navigation: {
      Pages: ['site', 'services', 'work', 'testimonials'],
      Design: ['theme'],
    },
  },
  singletons: {
    site: singleton({
      label: 'Home, contact & site-wide',
      path: 'src/data/site',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({ label: 'Business name', validation: { isRequired: true } }),
        email: fields.text({ label: 'Contact email', validation: { isRequired: true } }),
        location: fields.text({ label: 'Location (footer)' }),
        copyright: fields.text({ label: 'Copyright line' }),
        socials: fields.array(
          fields.object({
            platform: fields.text({ label: 'Platform name' }),
            url: fields.url({ label: 'Link' }),
            icon: fields.text({ label: 'Icon name' }),
          }),
          { label: 'Social links', itemLabel: (p) => p.fields.platform.value || 'Social link' },
        ),
        nav: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            href: fields.text({ label: 'Page path (e.g. /services)' }),
          }),
          { label: 'Menu links', itemLabel: (p) => p.fields.label.value || 'Link' },
        ),
        hero: fields.object(
          {
            headline: fields.text({ label: 'Headline' }),
            tagline: fields.text({ label: 'Tagline', multiline: true }),
          },
          { label: 'Homepage hero' },
        ),
        about: fields.object(
          {
            intro: fields.text({ label: 'First paragraph', multiline: true }),
            story: fields.text({ label: 'Second paragraph (italic)', multiline: true }),
            experience: fields.text({ label: 'Third paragraph', multiline: true }),
            headshot: sitePhoto('Headshot'),
          },
          { label: 'About section' },
        ),
        organizations: fields.object(
          {
            heading: fields.text({ label: 'Heading' }),
            description: fields.text({ label: 'Description', multiline: true }),
            logos: fields.array(fields.text({ label: 'Logo path' }), {
              label: 'Logo files (not used yet)',
              itemLabel: (p) => p.value,
            }),
          },
          { label: 'Organizations section' },
        ),
        contact: fields.object(
          {
            heading: fields.text({ label: 'Heading' }),
            intro: fields.text({ label: 'First paragraph', multiline: true }),
            closing: fields.text({ label: 'Second paragraph', multiline: true }),
            photo: sitePhoto('Photo'),
            photoAlt: fields.text({ label: 'Photo description (for screen readers)' }),
          },
          { label: 'Get In Touch page' },
        ),
        cta: fields.object(
          {
            home: fields.text({ label: 'Homepage' }),
            services: fields.text({ label: 'Services page' }),
            work: fields.text({ label: 'Work page' }),
          },
          { label: '"Get In Touch" prompts at the bottom of pages' },
        ),
      },
    }),

    services: singleton({
      label: 'Services page',
      path: 'src/data/services',
      format: { data: 'yaml' },
      schema: {
        hero_image: fields.text({ label: 'Banner background image path' }),
        intro: fields.text({ label: 'Banner text', multiline: true }),
        subtitle: fields.text({ label: 'Text above the list', multiline: true }),
        services: fields.array(
          fields.object({
            title: fields.text({ label: 'Title', validation: { isRequired: true } }),
            description: fields.text({ label: 'Who it is for', multiline: true }),
            items: fields.array(fields.text({ label: 'Bullet point' }), {
              label: 'Bullet points',
              itemLabel: (p) => p.value || 'Bullet point',
            }),
          }),
          { label: 'Services', itemLabel: (p) => p.fields.title.value || 'Service' },
        ),
        addons: fields.text({ label: 'Add-on services note', multiline: true }),
      },
    }),

    work: singleton({
      label: 'Work page & photo gallery',
      path: 'src/data/work',
      format: { data: 'yaml' },
      schema: {
        intro: fields.text({ label: 'Banner text', multiline: true }),
        heading: fields.text({ label: 'Gallery heading' }),
        subtitle: fields.text({ label: 'Gallery subheading', multiline: true }),
        projects: fields.array(
          fields.object({
            id: fields.slug({
              name: {
                label: 'Photo name (only shown here in the admin)',
                validation: { isRequired: true },
              },
            }),
            image: fields.image({
              label: 'Photo',
              description: PHOTO_HELP,
              directory: 'src/assets/images/work',
              publicPath: '/src/assets/images/work',
              validation: { isRequired: true },
            }),
            caption: fields.text({ label: 'Caption', validation: { isRequired: true } }),
            category: fields.text({
              label: 'Category',
              description:
                'Photos with the same category are grouped under one filter button. Match an existing one exactly, e.g. "Full Service Event Coordination".',
              validation: { isRequired: true },
            }),
          }),
          {
            label: 'Gallery photos',
            description: 'Drag to reorder. Remove a photo to delete it from the site.',
            slugField: 'id',
            itemLabel: (p) => `${p.fields.caption.value || 'New photo'} — ${p.fields.id.value.name}`,
          },
        ),
      },
    }),

    testimonials: singleton({
      label: 'Testimonials',
      path: 'src/data/testimonials',
      format: { data: 'yaml' },
      schema: {
        testimonials: fields.array(
          fields.object({
            quote: fields.text({
              label: 'Quote',
              description: 'Wrap text in ** on both sides to make it bold, like ** this part **.',
              multiline: true,
            }),
            name: fields.text({ label: 'Name' }),
            title: fields.text({ label: 'Job title' }),
            company: fields.text({ label: 'Company' }),
          }),
          {
            label: 'Testimonials',
            itemLabel: (p) => `${p.fields.name.value || 'New testimonial'}, ${p.fields.company.value}`,
          },
        ),
      },
    }),

    theme: singleton({
      label: 'Theme colors',
      path: 'src/data/theme',
      format: { data: 'yaml' },
      schema: {
        brand: fields.object(
          {
            teal: color({ label: 'Main text & headings', description: 'Named "teal"' }),
            salmon: color({ label: 'Accent (links, bullets, quote borders)', description: 'Named "salmon"' }),
            green: color({ label: 'Secondary accent (borders, headings)', description: 'Named "green"' }),
            cream: color({ label: 'Cream', description: 'Mobile menu border' }),
          },
          { label: 'Brand colors' },
        ),
        backgrounds: fields.object(
          {
            hero: color({ label: 'Homepage hero' }),
            banner: color({ label: 'Services & Work page banners' }),
            sidebarLeft: color({ label: 'Left side stripe (wide screens)' }),
            sidebarRight: color({ label: 'Right side stripe (wide screens)' }),
            footer: color({ label: 'Footer' }),
          },
          { label: 'Backgrounds' },
        ),
        buttons: fields.object(
          {
            primary: color({ label: 'Main buttons ("Get In Touch", "Send Message")' }),
            filterActive: color({ label: 'Selected filter button (Work page)' }),
          },
          { label: 'Buttons' },
        ),
        tints: fields.object(
          {
            sectionAlt: tint('Services preview & Work page prompt background'),
            cta: tint('Homepage & Services page prompt background'),
            blockquote: tint('Add-on services note background'),
            accordion: tint('Services list item background'),
            accordionHover: tint('Services list item background (hover)'),
            filterButton: tint('Unselected filter buttons (Work page)'),
          },
          { label: 'Light background tints' },
        ),
      },
    }),
  },
});
