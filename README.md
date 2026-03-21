# St. Cyr Event Co. — Website

This guide explains how to update text, images, and logos on the website. All changes are made by editing files directly on GitHub — no coding required.

---

## How to Edit Files on GitHub

1. Go to the project on GitHub
2. Navigate to the file you want to edit
3. Click the **pencil icon** (Edit this file) in the top-right corner
4. Make your changes
5. Click **"Commit changes"**, add a short description of what you changed, and confirm

---

## Updating Text Content

All of the website text lives in simple data files inside the **`src/data/`** folder. Open any of these files and edit the text between the quotes.

### `src/data/site.yaml` — General Site Info

This controls the homepage hero section, about section, and site-wide details.

| Field | What it controls |
|---|---|
| `name` | Business name shown in the footer |
| `email` | Contact email |
| `location` | Location shown in the footer |
| `hero.headline` | Large text on the homepage hero |
| `hero.tagline` | Smaller text below the hero headline |
| `about.intro` | First paragraph in the About section |
| `about.story` | Italic paragraph in the About section |
| `about.experience` | Third paragraph in the About section |
| `organizations.heading` | Heading above the client logos |
| `organizations.description` | Description below that heading |
| `socials` | Social media links (update the `url` value) |

### `src/data/services.yaml` — Services Page

| Field | What it controls |
|---|---|
| `intro` | Text in the hero banner at the top |
| `subtitle` | Text below the hero on the services list |
| `addons` | The quote block at the bottom about add-on services |
| `services` | Each service has a `title`, `description`, and `items` (bullet points) |

**To edit a service's bullet points**, find the service by its title, then update the lines under `items:`. Each bullet starts with `- ` (dash and space).

**To add a new service**, copy an existing service block and change the text.

**To remove a service**, delete the entire block from `- title:` down to the last item.

### `src/data/work.yaml` — Work / Portfolio Page

| Field | What it controls |
|---|---|
| `intro` | Text in the hero banner |
| `heading` | Subheading below the hero |
| `subtitle` | Text under the subheading |
| `projects` | List of portfolio items |

Each project has:
- `image`: path to the image (see "Updating Work/Portfolio Images" below)
- `caption`: text shown below the image
- `category`: which filter tab it appears under

### `src/data/testimonials.yaml` — Testimonials on Homepage

Each testimonial has:
- `quote`: the testimonial text
- `name`: person's name
- `title`: their job title
- `company`: their company name

**To add a new testimonial**, add a new block at the end:
```yaml
- quote: "Your testimonial text here."
  name: First Last
  title: Job Title
  company: Company Name
```

**To remove a testimonial**, delete the entire block from `- quote:` to `company:`.

---

## Updating Images

### Logos (Organizations You've Worked With)

Logo files live in **`src/assets/images/logos/`**.

**To add a logo:**
1. Go to `src/assets/images/logos/` on GitHub
2. Click **"Add file" > "Upload files"**
3. Drag and drop your logo image (PNG, JPG, or WebP)
4. Commit the change

The logo will automatically appear on the homepage. No other changes needed.

**To remove a logo:**
1. Go to `src/assets/images/logos/`
2. Click on the file you want to remove
3. Click the **trash can icon** (Delete this file)
4. Commit the change

**Tips for logos:**
- PNG with a transparent background works best
- Keep file sizes reasonable (under 200KB)
- The logos are automatically resized to a consistent height

### Work / Portfolio Images

Portfolio images live in **`src/assets/images/work/`**.

**To add a new portfolio image:**
1. Upload the image to `src/assets/images/work/` on GitHub
2. Then edit `src/data/work.yaml` and add a new project entry:
```yaml
- image: /images/work/your-new-image.jpg
  caption: Description of the event
  category: Full Service Event Coordination
```

Available categories (must match exactly):
- `Full Service Event Coordination`
- `Pre-Event Support`
- `On-Site Support`
- `Full Service Coordination / Virtual Consultation`

**To remove a portfolio image:**
1. Delete the image file from `src/assets/images/work/`
2. Remove the matching entry from `src/data/work.yaml`

### Headshot Photo

Replace the file at **`src/assets/images/headshot.jpg`** with a new image. Keep the same filename.

### Contact Page Image

Replace the file at **`src/assets/images/contact-hero.jpg`** with a new image. Keep the same filename.

### Site Logo

Replace the file at **`public/images/logo.png`** with your new logo. Keep the same filename.

---

## Important Tips

- **YAML formatting matters.** Don't change the indentation (the spaces at the beginning of lines). Only change the text after the colons.
- **Quotes in text.** If your text contains a colon `:` or special characters, wrap it in double quotes: `"Your text here"`
- **After committing changes**, the site will automatically rebuild and deploy (this may take a minute or two).
- **Test on the live site** after making changes to make sure everything looks right.
