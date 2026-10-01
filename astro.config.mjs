// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
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
      title: { en: 'Amine Bensalah', fr: 'Amine Bensalah' },
      logo: { src: './src/assets/logo.svg' },
      favicon: '/favicon.svg',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/amine2233' },
        { icon: 'email', label: 'Support', href: 'mailto:amine.bensalah@intech-consulting.fr' },
      ],
      // --- i18n: /en/... and /fr/... ---------------------------------------
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        fr: { label: 'Français', lang: 'fr' },
      },
      // --- One sidebar group per app, generated from src/apps.config.mjs -------
      sidebar: apps.map((app) => ({
        label: app.name,
        translations: { fr: app.nameFr ?? app.name },
        items: [{ autogenerate: { directory: app.slug } }],
      })),
      customCss: ['./src/styles/custom.css'],
      lastUpdated: true,
      pagination: false,
    }),
  ],
});
