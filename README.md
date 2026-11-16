# St. Cyr Event Co. — Website

Text, colors and photos are edited in the **site admin** at **`/keystatic`** (for example `https://<your-domain>/keystatic`). No coding or file editing needed.

---

## Using the admin

1. Go to `/keystatic` and click **Sign in with GitHub**. Your GitHub account needs write access to the repository.
2. Pick a section from the left menu:

| Section | What you can edit |
|---|---|
| **Home, contact & site-wide** | Business name, email, location, menu links, social links, homepage hero, About text and headshot, Get In Touch page text and photo, the "Get In Touch" prompts at the bottom of pages |
| **Services page** | Banner text, each service (title, who it's for, bullet points), add-on note |
| **Work page & photo gallery** | Banner text, gallery heading, and every gallery photo |
| **Testimonials** | Quotes, names, titles, companies |
| **Theme colors** | All site colors, with a color picker |

3. Make your changes and click **Save**.
4. The live site updates in about a minute or two, once Vercel finishes rebuilding.

### Gallery photos

- **Add:** in *Work page & photo gallery*, click **Add** under *Gallery photos*. Give it a photo name (only shown in the admin, and it must be unique), upload the photo, and fill in the caption and category.
- **Edit:** click a photo to change it, its caption or its category.
- **Reorder:** drag photos up and down. The site shows them in this order.
- **Delete:** open the photo and remove it. The photo file is deleted too.

**Photo tips**
- Use **JPG, PNG or WebP**. iPhone **HEIC** photos won't show on the site. On a Mac, open the photo in Preview and choose *File → Export → JPEG*. On iPhone, set *Settings → Camera → Formats → Most Compatible*.
- Keep files under about **10 MB**. Very large originals upload slowly. The site resizes and compresses photos automatically, so a phone photo is plenty.
- **Categories** become the filter buttons on the Work page. To group photos together, type the category exactly the same each time, e.g. `Full Service Event Coordination`.

### Bold text in testimonials

Wrap words in `**` on both sides to make them bold: `** this part is bold **`.

---

## Things still edited directly on GitHub

- **Client logos:** `src/assets/images/logos/`. Every image in this folder appears on the homepage.
- **Site logo:** `public/images/logo.png` (keep the same filename).
- **Banner background images:** `public/images/` (`services-hero.jpg`, `heroshot_services.jpg`).

---

## For developers

- Astro static site; all content lives in `src/data/*.yaml`. `keystatic.config.tsx` defines the admin forms.
- Colors come from `src/data/theme.yaml` and are read by `tailwind.config.mjs` at build time.
- Uploaded images are stored under `src/assets/images/work/projects/<photo-name>/` and `src/assets/images/site/`, and resolved by `src/lib/images.ts`.
- `npm run dev`, then open `http://localhost:4321/keystatic` to edit local files without signing in.

### One-time GitHub setup for the live admin

The live admin signs in with a GitHub App. To create it:

1. Run `PUBLIC_KEYSTATIC_STORAGE=github npm run dev` and open `http://localhost:4321/keystatic`.
2. Follow the prompts to create the GitHub App. Keystatic writes `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` and `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` to `.env`.
3. Add those four variables to the Vercel project (Settings → Environment Variables) for Production and Preview.
4. In the GitHub App settings, add the production callback URL `https://<your-domain>/api/keystatic/github/oauth/callback`.
5. Install the GitHub App on the `stcyrevent` repository.
6. Redeploy.
