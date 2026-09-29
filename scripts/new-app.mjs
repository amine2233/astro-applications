#!/usr/bin/env node
// Scaffold a new app from the sample-app template (EN + FR).
// Usage: npm run new-app -- my-app "My App" ["Short pitch"]
import { cpSync, existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [slug, name, pitch = 'Short pitch of the app.'] = process.argv.slice(2);
if (!slug || !name || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('Usage: npm run new-app -- <slug-kebab-case> "<App Name>" ["Short pitch"]');
  process.exit(1);
}

const docs = 'src/content/docs';
for (const locale of ['en', 'fr']) {
  const src = join(docs, locale, 'sample-app');
  const dest = join(docs, locale, slug);
  if (existsSync(dest)) {
    console.error(`${dest} already exists`);
    process.exit(1);
  }
  cpSync(src, dest, { recursive: true });
  for (const file of readdirSync(dest)) {
    const p = join(dest, file);
    writeFileSync(p, readFileSync(p, 'utf8').replaceAll('Sample App', name));
  }

  // Add a card on the locale home page.
  const home = join(docs, locale, 'index.mdx');
  const card = `  <LinkCard title="${name}" description="${pitch}" href="./${slug}/" />\n</CardGrid>`;
  writeFileSync(home, readFileSync(home, 'utf8').replace('</CardGrid>', card));
}

// Register the app in the sidebar config.
const cfg = 'src/apps.config.mjs';
const entry = `  {\n    slug: '${slug}',\n    name: '${name}',\n    nameFr: '${name}',\n  },\n];`;
writeFileSync(cfg, readFileSync(cfg, 'utf8').replace(/\n\];\s*$/, `\n${entry}\n`));

console.log(`✔ ${name} created in ${docs}/{en,fr}/${slug}/ — edit the Markdown, then commit.`);
