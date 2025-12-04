/* eslint-env node */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(WORKSPACE_ROOT, 'blog');
const PUBLIC_DIR = path.join(WORKSPACE_ROOT, 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

function getSiteUrlFromPackageJson() {
  try {
    const pkgPath = path.join(WORKSPACE_ROOT, 'package.json');
    const data = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(data);
    return pkg.siteUrl || (pkg.homepage && pkg.homepage.replace(/\/$/, '')) || null;
  } catch {
    return null;
  }
}

const SITE_URL = (
  process.env.SITE_URL ||
  getSiteUrlFromPackageJson() ||
  'https://example.com'
).replace(/\/$/, '');

const STATIC_ROUTES = [
  { path: '/', priority: 1.0 },
  { path: '/about', priority: 0.8 },
  { path: '/projects', priority: 0.8 },
  { path: '/blog', priority: 0.9 },
  { path: '/tutos', priority: 0.7 },
  { path: '/herramientas', priority: 0.6 },
  { path: '/me', priority: 0.6 },
  { path: '/ues', priority: 0.5 },
];

function localePath(locale, basePath) {
  const normalized = basePath.startsWith('/') ? basePath : `/${basePath}`;
  if (locale === 'es') {
    return normalized === '/' ? '/es/' : `/es${normalized}`;
  }
  return normalized;
}

function toUrl(urlPath) {
  return SITE_URL + urlPath;
}

function fileLastMod(filePath) {
  try {
    const s = fs.statSync(filePath);
    return new Date(s.mtime).toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

function normalizeLastmod(value) {
  if (!value) return new Date().toISOString().split('T')[0];
  if (typeof value === 'string') {
    const isoMatch = value.match(/^(\d{4}-\d{2}-\d{2})/);
    if (isoMatch) return isoMatch[1];
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
  }
  if (value instanceof Date) {
    return value.toISOString().split('T')[0];
  }
  return new Date().toISOString().split('T')[0];
}

function readPostData(lang, filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);

    if (!data.id || !data.slug) {
      console.warn(`[WARN] Post "${filePath}" missing id or slug in frontmatter. Skipping.`);
      return null;
    }

    return {
      lang,
      id: data.id,
      slug: data.slug,
      lastmod: normalizeLastmod(data.lastmod) || fileLastMod(filePath),
    };
  } catch (e) {
    console.error(`Error reading: ${filePath}`, e);
    return null;
  }
}

function discoverBlogPairs() {
  const enDir = path.join(BLOG_DIR, 'en');
  const esDir = path.join(BLOG_DIR, 'es');

  const postsById = {}; // { id: { en: {...}, es: {...} } }

  // Inglés
  if (fs.existsSync(enDir)) {
    for (const f of fs.readdirSync(enDir).filter((x) => x.endsWith('.md'))) {
      const full = path.join(enDir, f);
      const post = readPostData('en', full);
      if (!post) continue;
      if (!postsById[post.id]) postsById[post.id] = {};
      postsById[post.id].en = post;
    }
  }

  // Español
  if (fs.existsSync(esDir)) {
    for (const f of fs.readdirSync(esDir).filter((x) => x.endsWith('.md'))) {
      const full = path.join(esDir, f);
      const post = readPostData('es', full);
      if (!post) continue;
      if (!postsById[post.id]) postsById[post.id] = {};
      postsById[post.id].es = post;
    }
  }

  const pairs = [];

  for (const id of Object.keys(postsById)) {
    const entry = postsById[id];
    const en = entry.en || null;
    const es = entry.es || null;

    if (!en && !es) continue;

    const enPath = en ? `/blog/${en.slug}` : `/blog/${es.slug}`;
    const esPath = es ? `/blog/${es.slug}` : `/blog/${en.slug}`;

    const lastmods = [en?.lastmod, es?.lastmod].filter(Boolean).map(normalizeLastmod);
    const lastmod = lastmods.length
      ? lastmods.sort().reverse()[0]
      : new Date().toISOString().split('T')[0];
    pairs.push({
      enPath: localePath('en', enPath),
      esPath: localePath('es', esPath),
      lastmod,
    });
  }

  return pairs;
}

function buildUrlEntriesForPair({ enPath, esPath, lastmod }, priority) {
  const alternates = [
    { locale: 'en', urlPath: enPath },
    { locale: 'es', urlPath: esPath },
    { locale: 'x-default', urlPath: enPath },
  ];

  const makeEntry = (urlPath) => {
    const loc = toUrl(urlPath);

    const xhtmlLinks = alternates
      .map(
        (a) => `    <xhtml:link rel="alternate" hreflang="${a.locale}" href="${toUrl(a.urlPath)}"/>`
      )
      .join('\n');

    return (
      `  <url>\n` +
      `    <loc>${loc}</loc>\n` +
      `${xhtmlLinks}\n` +
      `    <lastmod>${lastmod}</lastmod>\n` +
      `    <priority>${(priority || 0.5).toFixed(1)}</priority>\n` +
      `  </url>`
    );
  };

  return [makeEntry(enPath), makeEntry(esPath)];
}

function build() {
  const header =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  const entries = [];
  const seen = new Set();

  const routerFile = path.join(WORKSPACE_ROOT, 'src', 'router', 'index.js');
  const staticLastmod = fileLastMod(routerFile);

  for (const route of STATIC_ROUTES) {
    const enPath = localePath('en', route.path);
    const esPath = localePath('es', route.path);

    const pairEntries = buildUrlEntriesForPair(
      { enPath, esPath, lastmod: staticLastmod },
      route.priority
    );

    for (const e of pairEntries) {
      if (!seen.has(e)) {
        entries.push(e);
        seen.add(e);
      }
    }
  }

  // BLOG POSTS
  const blogPairs = discoverBlogPairs();
  for (const pair of blogPairs) {
    const pairEntries = buildUrlEntriesForPair(pair, 0.8);
    for (const e of pairEntries) {
      if (!seen.has(e)) {
        entries.push(e);
        seen.add(e);
      }
    }
  }

  const footer = `</urlset>\n`;
  const xml = [header, ...entries, footer].join('\n');

  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');

  console.warn(`Sitemap generado en: ${SITEMAP_PATH}`);
  console.warn(`Base URL: ${SITE_URL}`);
}

build();
