# St. Cyr Event Co. — Website

How to update your website. No coding needed: everything is done by uploading files or editing text on GitHub. After each change the site rebuilds automatically (about 1–2 minutes).

**Quick reference**

| I want to… | Go to | Do this |
|---|---|---|
| Add event photos | `src/assets/images/work/` | Upload, named `CLIENT_Event Title_SERVICE_1.jpg` |
| Change a colour | `src/styles/theme.css` | Replace a hex code like `#FFFA64` |
| Edit homepage or contact text | `src/data/site.yaml` | Edit the text after the colon |
| Edit services | `src/data/services.yaml` | Edit the text after the colon |
| Edit questions & answers | `src/data/faq.yaml` | Edit the text after the colon |
| Add a testimonial | `src/data/testimonials.yaml` | Copy a block and change it |
| Add a client logo | `src/assets/images/logos/` + `src/data/clients.yaml` | Upload the logo, add one entry |
| Swap the headshot | `src/assets/images/headshot.jpg` | Upload a new file with the same name |
| Change the rotating event words | `src/data/site.yaml` → `hero.rotating_words` | Add or remove a line |
| Swap the homepage photo | `src/assets/images/home/` | Replace `feature.jpg` |
| Swap the site logo | `public/images/logo.png` | Upload a new file with the same name |

---

## How to edit on GitHub

**Edit text:** open the file → click the **pencil icon** → change the text → **Commit changes**.

**Upload a file:** open the folder → **Add file → Upload files** → drag your files in → **Commit changes**.

**Replace a file:** upload a file with *exactly the same name* into the same folder. GitHub replaces the old one.

**Delete a file:** open the file → **⋯ menu → Delete file** → **Commit changes**.

---

## Adding event photos

Upload photos to **`src/assets/images/work/`**. The file name tells the website everything it needs:

```
CLIENT_Event Title_SERVICE_number.jpg
```

| Part | What to write | Example |
|---|---|---|
| CLIENT | The client's code from `src/data/clients.yaml` | `PBP`, `SHOPIFY`, `EFRY`, `BCSS`, `TEMPO` |
| Event Title | The caption shown under the photo | `Client Appreciation` |
| SERVICE | `FS` Full Service · `PE` Pre-Event · `OS` On-Site · `VC` Virtual | `FS` |
| number | Any number, so file names stay unique | `8` |

Examples: `PBP_Client Appreciation_FS_8.jpg`, `SHOPIFY_Offsite_FS_9.jpg`, `TEMPO_Community Event_PE_7.jpg`

That's it: no other file to edit. The photo appears in the gallery with the right caption, and in the right filters (service and Corporate/Nonprofit/Community).

**Tips**
- Use **JPG or PNG**. iPhone photos are sometimes saved as **HEIC**, which won't show up. On iPhone, set *Settings → Camera → Formats → Most Compatible*, or export the photo as JPG first.
- Big files are fine. The website resizes and compresses them automatically.
- Use underscores `_` only between the four parts (spaces inside the title are fine).
- To remove a photo, delete the file.
- Photos that aren't ready to show can go in `src/assets/images/work-unsorted/`. That folder is ignored by the website.

---

## Changing colours

Open **`src/styles/theme.css`**. Each colour has a name and a hex code:

```css
--yellow: #FFFA64;   /* "How we'll work together", Full Service */
```

Change only the code after the colon (keep the `#` and the `;`). Every place that colour is used updates. To find a hex code, search "color picker" on Google and copy the HEX value.

| Name | Used for |
|---|---|
| `--ink` | Text, buttons, icons |
| `--paper` | Page background |
| `--white` | Cards |
| `--muted` | Secondary text |
| `--yellow` `--lime` `--pink` `--sky` | Colour sections, service colours, tiles and tags |

Fonts are set in the same file. They're all free Google Fonts (Anton, Geist, Geist Mono).

---

## Editing text

All text lives in **`src/data/`**:

- **`site.yaml`**: homepage (hero headline and rotating event words, logo wall heading, About, process steps), the closing "Have an event coming up?" block, footer, contact page and checklist, and the main button label.
- **`services.yaml`**: the four services: client quote, description, bullet points, colour and the involvement meter (`level` 1–4).
- **`faq.yaml`**: questions and answers on the Services page.
- **`work.yaml`**: Work page heading, intro and the three stats.
- **`testimonials.yaml`**: client quotes.

**Rules for these files**
- Only change text **after** the colon. Don't change the indentation (spaces at the start of lines).
- If your text contains a colon `:` or starts with a quote mark, wrap the whole thing in double quotes: `"Like this: example"`.

---

## Testimonials

Each testimonial in **`src/data/testimonials.yaml`** has:

```yaml
  - name: First Last
    title: "Job Title"
    company: "Company"
    excerpt: "The short version shown on the site. Wrap the **key phrase** in double asterisks to make it bold."
    quote: "The full original quote (kept for reference)."
```

Keep excerpts to one or two sentences. Card colours rotate automatically.

---

## Client logos

1. Upload the logo to **`src/assets/images/logos/`**. A PNG with a transparent background works best. Crop it tight, with no extra space around the logo.
2. Add or update the client in **`src/data/clients.yaml`**:

```yaml
  - code: ACME
    name: Acme Corp
    sector: Corporate
    logo: acme.png
```

Logos are shown in grey and sized automatically so they look balanced. The homepage shows them in the order of this list. `code` is also what you use at the start of photo names.

---

## Technical notes (for whoever maintains the code)

- Built with [Astro](https://astro.build) + Tailwind, hosted on Vercel. Every push rebuilds; every branch gets a preview link.
- Content is read from `src/data/*.yaml` and image folders by `src/lib/content.ts`.
- Styles: `src/styles/theme.css` (tokens) and `src/styles/global.css` (layout).
- Contact form posts to Formspree (URL in `site.yaml → contact.formspree_url`).
- Run locally: `npm install`, then `npm run dev`.
