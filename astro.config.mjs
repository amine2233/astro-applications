// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import { apps } from './src/apps.config.mjs';

// SITE / BASE are injected by the GitHub Action (see .github/workflows/deploy.yml).
// Custom domain (docs.example.com)  -> BASE="/"
// Project page (user.github.io/repo) -> BASE="/repo"
const site = process.env.SITE ?? 'http://localhost:4321';
const base = process.env.BASE ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: { en: 'My Apps', fr: 'Mes Apps' },
      logo: { src: './src/assets/logo.svg' },
      favicon: '/favicon.svg',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/amine2233' }],
      // --- i18n: /en/... and /fr/... ---------------------------------------
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        fr: { label: 'Français', lang: 'fr' },
      },
      // --- One independent sidebar per app, generated from src/apps.config.mjs -
      // Each app is its own "topic": browsing Markpages never shows Link Clipper
      // or QR Editor in the sidebar, and vice versa.
      plugins: [
        starlightSidebarTopics(
          apps.map((app) => ({
            label: { en: app.name, fr: app.nameFr ?? app.name },
            link: `/${app.slug}/`,
            items: [{ autogenerate: { directory: app.slug } }],
          })),
        ),
      ],
      customCss: ['./src/styles/custom.css'],
      lastUpdated: true,
      pagination: false,
    }),
  ],
});
