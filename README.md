# apps-docs

Bilingual (EN/FR) documentation, support and legal site for Markpages, Link Clipper and QR Editor.
Built with [Astro Starlight](https://starlight.astro.build), deployed to GitHub Pages.

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

Push to `main` — the GitHub Actions workflow builds and publishes to GitHub Pages automatically.
