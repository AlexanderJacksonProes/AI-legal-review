# The AI Legal Review

The website of **The AI Legal Review — a publication of the University of Nottingham AI in Law Society.**

It is a static site built with [Eleventy](https://www.11ty.dev/). Articles are plain Markdown files; the build turns them into fast, accessible HTML pages with their own URLs, footnotes, reading times and social-sharing previews. There is no database, server or CMS to maintain.

---

## File structure

```
ai-legal-review/
├── src/                                  ← everything that becomes the website
│   ├── _data/
│   │   └── site.js                       ← site-wide settings (URL, Instagram, submission link)
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk                  ← page shell: <head>, metadata, header, footer
│   │   │   └── article.njk               ← article page design (title, byline, notes, back button)
│   │   └── partials/
│   │       ├── header.njk                ← top bar and navigation
│   │       ├── footer.njk                ← footer and disclaimer
│   │       ├── publication-card.njk      ← reusable article listing used everywhere
│   │       └── instagram-icon.njk
│   ├── publications/
│   │   ├── index.njk                     ← the Publications archive page
│   │   ├── publications.11tydata.js      ← shared settings for every article (layout, URL)
│   │   └── ai-access-to-justice-legal-aid.md   ← the first article
│   ├── assets/
│   │   ├── css/style.css                 ← all styling; brand colours at the top
│   │   ├── fonts/                        ← self-hosted Newsreader and IBM Plex Sans
│   │   └── images/                       ← favicon and social-sharing images
│   ├── index.njk                         ← Home
│   ├── about.njk                         ← About
│   ├── submit.njk                        ← Write for The AI Legal Review
│   ├── 404.njk                           ← page-not-found
│   ├── sitemap.njk / robots.njk          ← generated sitemap.xml and robots.txt
├── templates/new-publication.md          ← copy this to start a new article
├── eleventy.config.js                    ← build settings, footnotes, date and reading-time filters
├── render.yaml                           ← Render deployment settings
└── package.json
```

The build output goes to `_site/` (not committed).

**URLs**

| Page | URL |
|---|---|
| Home | `/` |
| Publications archive | `/publications/` |
| An article | `/publications/<file-name>/` e.g. `/publications/ai-access-to-justice-legal-aid/` |
| About | `/about/` |
| Submit | `/submit/` |

---

## Deploying on Render (free static site)

You need a free GitHub account. Render builds the site from GitHub and rebuilds it automatically each time you change a file there.

### 1. Put the site on GitHub

1. Go to <https://github.com/new>.
2. Repository name: `ai-legal-review`. Choose **Public** (or Private — both work with Render). Leave "Add a README" unticked. Click **Create repository**.
3. On the empty repository page, click **uploading an existing file**.
4. Unzip `ai-legal-review.zip` on your computer. Open the unzipped `ai-legal-review` folder, select **everything inside it** (including the `src` and `templates` folders and `render.yaml`) and drag it onto the GitHub page. Do not drag the outer folder itself.
   - On a Mac, files starting with a dot (`.gitignore`) are hidden; press **Cmd + Shift + .** in Finder to show them. Missing it is not fatal.
5. Click **Commit changes**.

### 2. Connect it to Render

1. Sign in at <https://dashboard.render.com>.
2. Click **New +** → **Blueprint**.
3. Connect your GitHub account if asked, then choose the `ai-legal-review` repository.
4. Render reads `render.yaml` and shows one static site called `ai-legal-review`. Click **Apply** / **Deploy Blueprint**.
5. After a minute or two the site is live at `https://ai-legal-review.onrender.com` (or a similar address Render shows you if that name is taken).

**If you prefer not to use Blueprints:** New + → **Static Site** → choose the repository, then set
- Build Command: `npm ci && npm run build`
- Publish Directory: `_site`

### 3. (Optional) Custom domain

In Render: your site → **Settings** → **Custom Domains** → add your domain and follow the DNS instructions. Then in Render → **Environment**, add `SITE_URL` = `https://yourdomain.org` and redeploy, so share links and the sitemap use the new address.

Static sites on Render's free plan stay online without "sleeping", unlike free web services.

### Other hosts

The same folder works on Netlify or Vercel without changes: build command `npm run build`, output/publish directory `_site`. Set `SITE_URL` there to the site's address.

---

## Adding a second publication

Everything is done by adding one Markdown file. No design changes are needed.

1. In GitHub, open the `src/publications` folder.
2. Click **Add file** → **Create new file**.
3. Name it with the URL you want, in lower case with hyphens, ending in `.md`, e.g. `eu-ai-act-and-legal-services.md`. That article will live at `/publications/eu-ai-act-and-legal-services/`.
4. Paste in the contents of `templates/new-publication.md` and fill in the top section:

   ```yaml
   ---
   title: "The EU AI Act and Legal Services"
   author: "Author Name"
   date: 2026-11-15          # YYYY-MM-DD; shown as "November 2026"
   category: "AI Regulation"
   description: "One or two sentences for the homepage, archive and link previews."
   ---
   ```

5. Below the second `---`, write or paste the article:
   - `## Heading` for each section heading.
   - `*italics*` for case names and titles.
   - Footnotes: put `[^1]` in the text where the note number goes, and at the end of the article write `[^1]: The footnote text.` Notes are numbered automatically in the order they first appear.
   - Links in footnotes: wrap them in angle brackets, `<https://…>`.
6. Click **Commit changes**. Render rebuilds the site in about a minute.

The newest article (by `date`) automatically becomes the featured article on the homepage; older ones move into the list below it and remain in the archive. The reading time is calculated automatically.

**Optional extras**

- `question: "…"` shows an original essay question under the title.
- `draft: true` keeps an article off the site while you prepare it.
- `ogImage: "/assets/images/…png"` sets a custom link-preview image (1200 × 630 px). Without it, the site's default preview image is used.

**Converting from Word:** paste the text in, then add `##` before headings and convert footnotes to `[^n]` markers. Check every footnote against the original before committing.

---

## Changing site settings

Edit `src/_data/site.js`:

- `submissionUrl` — paste a Google Form link, or `mailto:address@example.com`. While it is empty, the Submit page's button points to the Society's Instagram.
- `instagram` — the Society's Instagram address.
- `url` — fallback public address (Render's address is detected automatically).

Brand colours and fonts: top of `src/assets/css/style.css` (`--accent` is the oxblood highlight colour).

---

## Working on the site locally (optional)

Requires [Node.js](https://nodejs.org/) 18 or later.

```bash
npm install
npm start        # preview at http://localhost:8080, reloads as you edit
npm run build    # produce the finished site in _site/
```
