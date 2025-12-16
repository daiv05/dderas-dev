import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Cargar posts fuera del composable para que sea singleton (cacheado)
const modules = import.meta.glob('/blog/**/*.md', { eager: true });

const allPosts = Object.keys(modules).map((path) => {
  const mod = modules[path];
  const segments = path.split('/').filter(Boolean);
  const fileName = segments.pop() || '';
  const slug = fileName.replace(/\.md$/, '');
  const detectedLocaleEn = segments.includes('en') ? 'en' : null;
  const detectedLocale = segments.includes('es') ? 'es' : detectedLocaleEn;

  const fm = mod?.frontmatter || mod || {};

  return {
    slug: fm.slug || slug,
    title: fm.title || slug,
    date: fm.date || '',
    lastmod: fm.lastmod || '',
    author: fm.author || '',
    tags: fm.tags || [],
    summary: fm.summary || '',
    image: fm.image || '',
    id: fm.id || null,
    detectedLocale,
    mod,
    path,
  };
});

export function useBlog() {
  const route = useRoute();

  const getLocale = () => {
    const isSpanish = route.params.locale === 'es';
    return isSpanish ? 'es' : 'en';
  };

  const posts = computed(() => {
    const locale = getLocale();
    return allPosts
      .filter((post) => post.detectedLocale === locale)
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
  });

  const findEquivalentPost = (currentSlug, fromLocale, toLocale) => {
    const currentPost = allPosts.find(
      (p) => p.slug === currentSlug && p.detectedLocale === fromLocale
    );

    if (!currentPost?.id) return null;

    return allPosts.find((p) => p.id === currentPost.id && p.detectedLocale === toLocale);
  };

  const getPostComponent = (slug) => {
    if (!slug) return null;
    const locale = getLocale();

    const byLocale = Object.entries(modules).find(([path]) =>
      path.endsWith(`/blog/${locale}/${slug}.md`)
    );
    if (byLocale) return byLocale[1].default;

    const any = Object.entries(modules).find(([path]) => path.endsWith(`${slug}.md`));
    return any ? any[1].default : null;
  };

  return {
    allPosts,
    posts,
    findEquivalentPost,
    getPostComponent,
    getLocale,
  };
}
