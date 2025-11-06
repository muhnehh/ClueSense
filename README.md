# DODO — AI Internship Simulator (Site) — Published

**Status:** The site is published and served via GitHub Pages.  
Replace `https://<username>.github.io/<repo>` below with your repository's Pages URL.

**Live demo:** https://<username>.github.io/<repo>  <!-- update this with your actual URL -->

---

## About this repository

This repository contains the static site source and assets for the DODO landing page. The live site presents a product mockup for an AI-powered internship simulator and a companion two-week build sprint program. The current repository is the production-ready static site (HTML, CSS, JS, image assets) already deployed to GitHub Pages.

---

## Published site (what visitors see)

- Hero: “Practice at FAANG companies without the rejection.” Primary CTAs: Join Waitlist, Watch Demo.  
- Product features: Code analysis, Live interview simulations, AI mentorship, Skill dashboards.  
- Program pitch and cohort information: a live cohort sprint (4-week program with an optional prep week).  
- Pricing: Starter (free), Professional ($49/month), Enterprise (custom).  
- Lead capture: Waitlist and application form for sprint cohorts.

---

## Program mockup & pitch (included on the site)

The site and copy function as both product marketing and a pitch for a short cohort program that helps builders find first users and ship an MVP.

**Program overview (mockup):**
- Title: Two-week Product Sprint (with optional Week 0 ideation).  
- Dates (example from mockup): July 7 — August 4 (4-week cohort); core sprint is two weeks for rapid shipping.  
- Format: Live cohort with mandatory check-ins, hands-on prototyping sessions, and weekly demos.  
- Outcomes: Ship an MVP, get first users or first dollar, and prepare a final pitch for a showcase.  
- Audience: Open to all builders (students, founders, creators) — no prior coding experience required.  
- Cost model: Free initial cohorts (as in mockup) with select mentorship upgrades or paid pro options.

**Weekly structure (mockup):**
- Week 0 (optional): Idea generation and team formation.  
- Week 1: Validate idea, map MVP, start prototyping.  
- Week 2: Build, test, refine, and pitch.  
- Ongoing: Community check-ins, mentor office hours, and post-sprint scaling support.

**Why this program (pitch language included in the repo):**
- The sprint provides accountability, hands-on feedback, and a community of builders. It reduces time-to-first-user by focusing teams on a single coherent milestone each week.
- Top projects receive mentorship, potential follow-on support, and a chance for seed funding (example prize pool shown in mockup).

**How the site supports applications:**
- Application form and FAQ (hosted on the site) capture candidate emails and project summaries.  
- The marketing pages and pricing section describe cohort benefits and provide a clear CTA to apply or join the waitlist.  
- For production use, wire the form to a server-side handler or a third-party service (Netlify Forms, Formspree, or a serverless endpoint).

---

## Developer notes — small checklist after publishing

- Replace the placeholder Pages URL at the top with your actual GitHub Pages URL.  
- Confirm the Pages source (main/docs or gh-pages branch) and that the published commit includes an up-to-date `index.html`.  
- Add a `CNAME` if using a custom domain and update repository Pages settings.  
- Ensure the waitlist/application form posts to a secure backend or third-party form service. Avoid storing emails in client-side code.  
- Hook analytics and monitoring (Google Analytics, Sentry) if desired.

---

## Where the program copy & pitch lives in the repo

- `docs/index.html` (or `index.html`): primary copy and CTAs.  
- `docs/assets/images/hero.png` (or equivalent): hero image (preview stored in `/mnt/data/fe35dec7-a740-4c91-8e1a-b8d6751936e2.png`).  
- `docs/sections/program.html` (recommended): standalone program pitch, outcomes, and application form. Add this file if you want the program page separate from the landing homepage.

---

## Small recommended additions for the program page

1. **Application form** with required fields:
   - Name, email, project idea (short), experience level, timezone, GitHub/portfolio link.
2. **Consent checkbox** for communications and data storage (link to privacy policy).  
3. **Automated confirmation email** for received applications (send via serverless function).  
4. **Mentor availability and selection process** description to set expectations.  
5. **Public schedule** for cohort check-ins and demo day.

---

## Contact and next steps

If you want, I can:
- Add the exact GitHub Pages URL into this README and replace the hero screenshot link with the live image.  
- Generate a ready-to-paste program application form (HTML + Netlify/Formspree integration) and a privacy policy stub.  
- Create a `.github/workflows/deploy.yml` if you prefer automatic CI/CD deployments to Pages.

Tell me which of the above you want me to add and I will prepare the files (deploy workflow, form handler, or program page).
