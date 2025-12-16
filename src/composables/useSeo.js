import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const SITE_URL = 'https://deras.dev';
const SUPPORTED_LOCALES = ['en', 'es'];
const OG_LOCALE_MAP = {
  en: 'en_US',
  es: 'es_SV',
};
const SAME_AS_PROFILES = [
  'https://github.com/daiv05',
  'https://linkedin.com/in/dderas',
  'https://twitter.com/daiv_09',
];
const CONTACT_EMAIL = 'davidderas50@gmail.com';

const upsertMetaTag = ({ name, property, content }) => {
  if (typeof document === 'undefined' || !content) return;
  const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    if (name) tag.setAttribute('name', name);
    if (property) tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const upsertLinkTag = ({ rel, href, hreflang }) => {
  if (typeof document === 'undefined' || !rel || !href) return;
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    if (hreflang) tag.setAttribute('hreflang', hreflang);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
};

const ensureLocalePath = (path, lang) => {
  const cleaned = path.replace(/^\/es(?=\/|$)/, '') || '/';
  const pathCleanedToAdd = cleaned === '/' ? '' : cleaned;
  return lang === 'es' ? `/es${pathCleanedToAdd}` : cleaned;
};

const buildUrl = (fullPath, lang) => {
  const localizedPath = ensureLocalePath(fullPath, lang);
  const url = new URL(localizedPath, SITE_URL);
  return url.toString();
};

const upsertStructuredData = (description, keywords, image) => {
  if (typeof document === 'undefined') return;
  const existing = document.head.querySelector('#seo-structured-data');
  const script = existing ?? document.createElement('script');
  if (!existing) {
    script.id = 'seo-structured-data';
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'David Deras',
    jobTitle: 'Full Stack Developer',
    url: SITE_URL,
    image,
    email: `mailto:${CONTACT_EMAIL}`,
    sameAs: SAME_AS_PROFILES,
    description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Salvador',
      addressCountry: 'SV',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'DTIC - MINSAL',
    },
    knowsAbout: keywords,
    knowsLanguage: ['es', 'en'],
  };

  script.textContent = JSON.stringify(schema);
};

export function useSeo() {
  const route = useRoute();
  const { t, tm, locale } = useI18n();
  const seoKey = computed(() => route.meta?.seoKey ?? 'home');

  const applySeo = () => {
    if (typeof document === 'undefined') return;

    const defaults = tm('seo.defaults') ?? {};
    const page = tm(`seo.pages.${seoKey.value}`) ?? {};
    const siteName = t('seo.siteName');

    const baseTitle = page.title ?? defaults.title ?? siteName;
    const fullTitle = `${baseTitle} | ${siteName}`;
    document.title = fullTitle;

    const description = page.description ?? defaults.description ?? siteName;
    upsertMetaTag({ name: 'description', content: description });

    const keywords = Array.from(
      new Set([...(defaults.keywords ?? []), ...(page.keywords ?? [])].filter(Boolean))
    );
    if (keywords.length) {
      upsertMetaTag({ name: 'keywords', content: keywords.join(', ') });
    }

    if (defaults.author) {
      upsertMetaTag({ name: 'author', content: defaults.author });
    }

    upsertMetaTag({ name: 'robots', content: 'index, follow' });
    upsertMetaTag({ name: 'application-name', content: siteName });

    const ogImage = page.ogImage ?? defaults.ogImage ?? `${SITE_URL}/punpun_OG.jpg`;
    const ogImageAlt = page.ogImageAlt ?? defaults.ogImageAlt ?? siteName;
    const pathWithoutHash = route.fullPath.split('#')[0];
    const localizedUrl = buildUrl(pathWithoutHash, locale.value);

    upsertMetaTag({ property: 'og:title', content: page.ogTitle ?? fullTitle });
    upsertMetaTag({ property: 'og:description', content: description });
    upsertMetaTag({ property: 'og:image', content: ogImage });
    upsertMetaTag({ property: 'og:image:alt', content: ogImageAlt });
    upsertMetaTag({ property: 'og:url', content: localizedUrl });
    upsertMetaTag({ property: 'og:type', content: 'website' });
    upsertMetaTag({ property: 'og:site_name', content: siteName });
    upsertMetaTag({ property: 'og:locale', content: OG_LOCALE_MAP[locale.value] ?? 'en_US' });

    upsertMetaTag({ name: 'twitter:card', content: 'summary_large_image' });
    upsertMetaTag({ name: 'twitter:title', content: page.twitterTitle ?? fullTitle });
    upsertMetaTag({ name: 'twitter:description', content: page.twitterDescription ?? description });
    upsertMetaTag({ name: 'twitter:image', content: ogImage });
    upsertMetaTag({ name: 'twitter:image:alt', content: ogImageAlt });

    const rawHandle = t('seo.twitterHandle');
    const twitterHandle = rawHandle ? `@${String(rawHandle).replace(/^@+/, '')}` : '';
    if (twitterHandle) {
      upsertMetaTag({ name: 'twitter:creator', content: twitterHandle });
      upsertMetaTag({ name: 'twitter:site', content: twitterHandle });
    }

    upsertLinkTag({ rel: 'canonical', href: localizedUrl });

    SUPPORTED_LOCALES.forEach((lang) => {
      upsertLinkTag({ rel: 'alternate', hreflang: lang, href: buildUrl(pathWithoutHash, lang) });
    });

    upsertLinkTag({ rel: 'alternate', hreflang: 'x-default', href: buildUrl(pathWithoutHash) });

    upsertStructuredData(description, keywords, ogImage);
  };

  watch(
    [() => route.path, () => locale.value],
    () => {
      applySeo();
    },
    { immediate: true }
  );

  return {
    updateSeo: applySeo,
    updateSeoWith(overrides = {}) {
      // Aplicar overrides desde frontmatter
      if (typeof document === 'undefined') return;
      const { title, description, ogImage, lastmod, author, alternateLinks } = overrides;
      if (title) {
        document.title = `${title} | ${t('seo.siteName')}`;
        upsertMetaTag({ property: 'og:title', content: title });
        upsertMetaTag({ name: 'twitter:title', content: title });
      }
      if (description) {
        upsertMetaTag({ name: 'description', content: description });
        upsertMetaTag({ property: 'og:description', content: description });
        upsertMetaTag({ name: 'twitter:description', content: description });
      }
      if (ogImage) {
        upsertMetaTag({ property: 'og:image', content: ogImage });
        upsertMetaTag({ name: 'twitter:image', content: ogImage });
      }
      if (author) {
        upsertMetaTag({ name: 'author', content: author });
        upsertMetaTag({ name: 'article:author', content: author });
      }
      if (lastmod) {
        upsertMetaTag({ name: 'article:modified_time', content: lastmod });
        upsertMetaTag({ property: 'og:updated_time', content: lastmod });
      }
      if (alternateLinks && Array.isArray(alternateLinks)) {
        alternateLinks.forEach(({ hreflang, href }) => {
          upsertLinkTag({ rel: 'alternate', hreflang, href });
        });
      }
    },
  };
}
