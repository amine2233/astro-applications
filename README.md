# apps-docs

Bilingual (EN/FR) documentation, support and legal site for all my apps.
Markdown only, no database. Built with [Astro Starlight](https://starlight.astro.build), deployed to GitHub Pages.

## Quick start

```bash
npm install
npm run dev          # http://localhost:4321/en/
npm run build        # static output in dist/
```

## Add an app

```bash
npm run new-app -- budget-pro "Budget Pro" "Personal finance tracker"
```

This copies `templates/sample-app/{en,fr}` to `src/content/docs/{en,fr}/budget-pro/`, registers it
as its own sidebar topic (`src/apps.config.mjs`) and adds a card on both home pages. Then edit the
Markdown. `templates/sample-app` lives outside `src/content/docs`, so it's never built as a page itself.

## Structure

```
src/
├── apps.config.mjs            # list of apps → one independent sidebar ("topic") per app
├── content/docs/
│   ├── en/
│   │   ├── index.mdx          # home (app grid)
│   │   └── <app-slug>/
│   │       ├── index.md       # overview          → App Store "Marketing URL"
│   │       ├── usage.md       # getting started
│   │       ├── help.md        # FAQ + contact     → App Store "Support URL"
│   │       ├── privacy.md     # privacy policy    → App Store "Privacy Policy URL"
│   │       ├── eula.md        # terms of use      → App Store "License Agreement" / paywall link
│   │       ├── license.md     # open-source acknowledgements
│   │       └── about.md       # about + release notes
│   └── fr/ …                  # same tree, translated
├── styles/custom.css          # colors, fonts
└── pages/index.astro          # "/" → /fr/ or /en/ based on browser language

templates/sample-app/{en,fr}    # scaffold source for `npm run new-app` (not a built page)
```

Each app's sidebar is fully independent — browsing one app's docs never shows another app's pages,
via the [starlight-sidebar-topics](https://starlight-sidebar-topics.netlify.app) plugin.

## App Store Connect URLs

With repo `apps-docs` under account `USER`:

| Field | URL |
| --- | --- |
| Support URL | `https://USER.github.io/apps-docs/en/<app>/help/` |
| Marketing URL | `https://USER.github.io/apps-docs/en/<app>/` |
| Privacy Policy URL | `https://USER.github.io/apps-docs/en/<app>/privacy/` |
| Terms of Use (EULA) | `https://USER.github.io/apps-docs/en/<app>/eula/` |

For the French localization in App Store Connect, use the `/fr/` equivalents.

## Deploy

1. Push to `main` on GitHub.
2. **Settings › Pages › Source: GitHub Actions**.
3. The workflow `.github/workflows/deploy.yml` builds and publishes on every push.

### Custom domain (recommended, e.g. `apps.example.com`)

1. Add `public/CNAME` containing `apps.example.com`.
2. Repo **Settings › Secrets and variables › Actions › Variables**:
   `SITE=https://apps.example.com`, `BASE=/`.
3. Set the domain in **Settings › Pages** and add the DNS `CNAME` record → `USER.github.io`.

A custom domain keeps your App Store URLs stable if you ever move off GitHub Pages.

## Customize

- **Theme**: `src/styles/custom.css` (Starlight CSS variables).
- **Logo / favicon**: `src/assets/logo.svg`, `public/favicon.svg`.
- **Components**: Starlight lets you override any UI component (`components:` in `astro.config.mjs`).
- **Front matter**: extra fields (`appVersion`, `effectiveDate`) are declared in `src/content.config.ts`.
- **Language**: add a locale in `astro.config.mjs` → `locales` and a matching folder.
