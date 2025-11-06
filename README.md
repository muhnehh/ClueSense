# DODO — AI Internship Simulator (Site)

**Live site hosted on GitHub Pages.**  
This repository contains the static website and assets for the DODO AI internship simulator landing page (simulations, mentorship, pricing, sprint program). Use this README to run, edit, and deploy the site on GitHub Pages.

<img width="3240" height="3240" alt="vibe-code-camp-mune (1)" src="https://github.com/user-attachments/assets/8f5d5c90-b234-4734-bad4-86931cef9694" />


## Quick links

- **Live demo**: (your GitHub Pages URL — configure in repository settings)
- **Hero screenshot / current build asset**: [Download hero image](sandbox:/mnt/data/fe35dec7-a740-4c91-8e1a-b8d6751936e2.png)

---

## Project description

DODO is a marketing and product site describing an AI-powered internship simulator (features include interview simulations, AI mentors, project workflows, and a 2–4 week sprint program). This repository stores the static site source (HTML/CSS/JS), images, and deployment configuration for GitHub Pages.

Primary objectives of the site:
- Present product features and value proposition (Simulations, Mentorship, Pricing, Live Skills Assessments).
- Capture leads (waitlist / email collection).
- Provide information for cohorts and sprint applications.
- Serve as a landing page for marketing, community, and partnerships.

---

## Features shown on the site

- Hero section with call-to-action (Join Waitlist, Watch Demo)
- Product features (Code analysis, Live interviews, Skill dashboards)
- Mentorship and project highlights
- Pricing tiers (Starter / Professional / Enterprise)
- Cohort / sprint program details and FAQ
- Contact and footer with social links

---

## Repository layout (recommended)

```
.
├── docs/                     # (optional) site content (if using docs/ for GitHub Pages)
│   ├── index.html
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   │       └── hero.png
│   └── .nojekyll
├── public/                   # (optional) built site if using a static build step
├── src/                      # (optional) source files (if site built with a generator)
├── .github/
│   └── workflows/
│       └── deploy.yml        # (optional) GitHub Actions for deployment
├── README.md                 # this file
└── LICENSE
```

**Notes**
- If you want GitHub Pages to serve the site from `/docs`, place `index.html` and `assets/` inside `docs/`.
- If you prefer the `gh-pages` branch workflow, use the GitHub Actions deploy flow shown below.

---

## Local development

If the site consists of static files (HTML/CSS/JS), you can preview locally with a simple static server.

### Option A — Python (no build step)

```bash
# from repository root (where index.html is located)
python3 -m http.server 8000
# open http://localhost:8000
```

### Option B — Node (live reload)

Install `live-server` (npm):

```bash
npm install -g live-server
live-server --port=8000
```

### Option C — If using a static site generator (Hugo/Eleventy/VitePress)
Follow your framework's dev instructions (e.g., `hugo server`, `npm run dev`).

---

## Deploy to GitHub Pages

Two common options:

### 1) Publish from `docs/` folder on `main`
1. Put your site files (index.html, assets) in `docs/`.
2. In GitHub repository settings -> Pages, set "Source" to `main` branch and `docs/` folder.
3. Optionally add a `.nojekyll` file to `docs/` to prevent Jekyll processing.

### 2) Use `gh-pages` branch with GitHub Actions (recommended for CI/CD)
Create `.github/workflows/deploy.yml` with the following sample workflow. This will run on pushes to `main` and publish the contents of `public/` (or root) to GitHub Pages.

```yaml
name: Deploy static site to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      # If you have a build step (npm run build), run it here and ensure
      # the final artifact is in ./public or ./docs.
      # - name: Build
      #   run: npm ci && npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs  # change to ./public or ./ (repo root) as appropriate
```

**Notes**
- If the site files live in `docs/`, set `publish_dir: ./docs`. If built output is in `public/`, use `./public`.
- You do not need a personal access token; `GITHUB_TOKEN` provides sufficient permission for a single repo deployment.

---

## Suggested changes for better production readiness

- Add a `CNAME` file in `docs/` if using a custom domain.
- Add a privacy policy and terms pages if you collect emails.
- Add meta tags for SEO and OpenGraph images for social sharing.
- Include a `robots.txt` and `sitemap.xml` if applicable.
- Ensure contact endpoints (forms) are backed by a secure server or a third-party provider (e.g., Netlify Forms, Formspree) — do not store emails in plain client-side code.

---

## Accessibility & privacy

- Use semantic HTML and ARIA attributes where necessary.
- Ensure form inputs have labels and CAPTCHA or rate-limiting for spam protection.
- If storing user emails, comply with GDPR/CCPA as relevant and provide a privacy policy.

---

## Editing copy and content

- Content is typically in `docs/index.html` or a template in `src/`. Edit text, pricing, or feature sections there.
- For images, put optimized PNG/WebP assets under `docs/assets/images/`.
- Keep hero images < 200 KB for fast first paint and mobile performance.

---

## Analytics and error monitoring

- Add Google Analytics / GTM snippet in `head` if you track visitors.
- Optional: Sentry (browser) for capturing runtime JS errors.

---

## Troubleshooting

- If GitHub Pages shows a 404, confirm the selected branch and folder in repository settings.
- If the site is not updated after Action runs, check workflow logs and the `gh-pages` branch for the deployed files.
- For Jekyll-related build errors, add an empty `.nojekyll` in the published folder.

---

## License

MIT License. Update `LICENSE` file as required.

---

## Contact

For repository or content updates, add a maintainer email or GitHub handle in this section.
