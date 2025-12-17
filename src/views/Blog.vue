<template>
  <div class="page-frame-blog">
    <section class="section-stack blog-wrapper">
      <div>
        <v-alert class="text-body-2" density="compact" type="error" :icon="mdiAlertCircle">
          <template #title><span>Hey</span></template>
          {{ t('blog.constructionNotice') }}
        </v-alert>
      </div>
      <div v-if="!Current" class="blog-index-wrapper">
        <div class="blog-index-content">
          <ul v-if="pagedPosts.length > 0" class="post-index">
            <li v-for="post in pagedPosts" :key="post.slug" class="post-card">
              <router-link
                class="post-card-link"
                :to="{
                  name: 'BlogPost',
                  params: { locale: getLocale(true), slug: post.slug },
                }"
              >
                <div v-if="post.image" class="post-thumb">
                  <img :src="post.image" :alt="post.title" loading="lazy" />
                </div>
                <div class="post-body">
                  <h2 class="post-title">{{ post.title }}</h2>
                  <div class="post-meta">
                    <span v-if="post.date" class="meta-date">{{ formatDate(post.date) }}</span>
                  </div>
                  <p v-if="post.summary" class="post-summary">
                    {{ post.summary }}
                  </p>
                  <div v-if="post.tags?.length" class="post-tags">
                    <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
          <div v-else class="no-results">
            <p>{{ t('blog.noResults') }}</p>
          </div>

          <div v-if="totalPages > 1" class="pagination">
            <button
              class="pagination-btn"
              :disabled="page === 1"
              :aria-label="t('blog.pagination.prev')"
              @click="prevPage"
            >
              <v-icon :icon="mdiArrowLeft"></v-icon>
              {{ t('blog.pagination.prev') }}
            </button>
            <span class="pagination-info">
              {{ t('blog.pagination.page') }} {{ page }} {{ t('blog.pagination.of') }}
              {{ totalPages }}
            </span>
            <button
              class="pagination-btn"
              :disabled="page === totalPages"
              :aria-label="t('blog.pagination.next')"
              @click="nextPage"
            >
              {{ t('blog.pagination.next') }}
              <v-icon :icon="mdiArrowRight"></v-icon>
            </button>
          </div>
        </div>
      </div>

      <article v-else class="blog-post">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <router-link :to="getLocale() === 'es' ? '/es' : '/'">
            {{ t('navigation.items.home') }}
          </router-link>
          <span class="separator">/</span>
          <router-link :to="getLocale() === 'es' ? '/es/blog' : '/blog'">
            {{ t('navigation.items.blog') }}
          </router-link>
          <span class="separator">/</span>
          <span class="current">{{ currentPost?.title }}</span>
        </nav>

        <PostHeader
          :title="currentPost?.title || ''"
          :date="currentPost?.date || ''"
          :lastmod="currentPost?.lastmod || ''"
          :author="currentPost?.author || ''"
          :tags="currentPost?.tags || []"
          :image="currentPost?.image || ''"
          :summary="currentPost?.summary || ''"
        />

        <div class="markdown-body">
          <component :is="Current" />
        </div>

        <nav
          v-if="currentIndex !== -1 && (prevPost || nextPost)"
          class="post-navigation"
          aria-label="Post Navigation"
        >
          <router-link
            v-if="prevPost"
            class="post-nav-link prev"
            :to="{
              name: 'BlogPost',
              params: { locale: getLocale(true), slug: prevPost.slug },
            }"
          >
            <span class="nav-label">← {{ t('blog.nav.prev') }}</span>
            <span class="nav-title">{{ prevPost.title }}</span>
          </router-link>
          <router-link
            v-if="nextPost"
            class="post-nav-link next"
            :to="{
              name: 'BlogPost',
              params: { locale: getLocale(true), slug: nextPost.slug },
            }"
          >
            <span class="nav-label">{{ t('blog.nav.next') }} →</span>
            <span class="nav-title">{{ nextPost.title }}</span>
          </router-link>
        </nav>
      </article>
    </section>
  </div>
</template>

<script setup>
import { mdiAlertCircle, mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import { computed, watch, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import PostHeader from '@/components/PostHeader.vue';
import { useBlog } from '@/composables/useBlog';
import { useSeo } from '@/composables/useSeo';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { updateSeo, updateSeoWith } = useSeo();
const { posts: postList, getPostComponent, findEquivalentPost, getLocale } = useBlog();

// Función para formatear fecha
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const locale = getLocale();
  return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Paginación
const page = ref(1);
const pageSize = ref(6);
const totalPages = computed(() => Math.max(1, Math.ceil(postList.value.length / pageSize.value)));
const pagedPosts = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return postList.value.slice(start, start + pageSize.value);
});
const prevPage = () => {
  if (page.value > 1) {
    page.value -= 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value += 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const normalizeLocale = (locale) => (locale === 'es' ? 'es' : 'en');

const buildBlogPath = (locale, slug) => {
  return locale === 'es' ? `/es/blog/${slug}` : `/blog/${slug}`;
};

const Current = computed(() => getPostComponent(route.params.slug));

const currentIndex = computed(() => {
  const slug = route.params.slug;
  if (!slug) return -1;
  return postList.value.findIndex((p) => p.slug === slug);
});

const currentPost = computed(() => {
  const i = currentIndex.value;
  return i >= 0 ? postList.value[i] : null;
});

const prevPost = computed(() => {
  const i = currentIndex.value;
  return i > 0 ? postList.value[i - 1] : null;
});

const nextPost = computed(() => {
  const i = currentIndex.value;
  return i >= 0 && i < postList.value.length - 1 ? postList.value[i + 1] : null;
});

watch(
  () => route.params.slug,
  () => {
    const slug = route.params.slug;
    if (!slug) {
      updateSeo();
      return;
    }
    const post = postList.value.find((p) => p.slug === slug);
    if (!post) {
      updateSeo();
      return;
    }

    // Calcular alternate links correctos
    const currentLocale = getLocale();
    const SITE_URL = 'https://deras.dev';
    const SUPPORTED_LOCALES = ['en', 'es'];
    const alternateLinks = [];

    SUPPORTED_LOCALES.forEach((lang) => {
      let path = '';
      if (lang === currentLocale) {
        path = buildBlogPath(lang, slug);
      } else {
        const equivalent = findEquivalentPost(slug, currentLocale, lang);
        if (equivalent) {
          path = buildBlogPath(lang, equivalent.slug);
        } else {
          path = lang === 'es' ? '/es/blog' : '/blog';
        }
      }
      const url = new URL(path, SITE_URL).toString();
      alternateLinks.push({ hreflang: lang, href: url });

      if (lang === 'en') {
        alternateLinks.push({ hreflang: 'x-default', href: url });
      }
    });

    updateSeo();
    updateSeoWith({
      title: post.title || slug,
      description: post.summary || '',
      ogImage: post.image || '',
      author: post.author || '',
      lastmod: post.lastmod || '',
      alternateLinks,
    });
  },
  { immediate: true }
);

watch(
  () => route.params.locale,
  (newLocale, oldLocale) => {
    page.value = 1;

    const currentSlug = route.params.slug;
    if (!currentSlug || newLocale === oldLocale) return;

    const currentLocale = normalizeLocale(oldLocale);
    const targetLocale = normalizeLocale(newLocale);

    const equivalentPost = findEquivalentPost(currentSlug, currentLocale, targetLocale);

    if (equivalentPost && equivalentPost.slug !== currentSlug) {
      const newPath = buildBlogPath(targetLocale, equivalentPost.slug);
      router.replace(newPath);
    }
  }
);
</script>

<style scoped>
.blog-header {
  max-width: 820px;
  margin: 0 auto 2rem;
  text-align: center;
}

.blog-index-wrapper {
  display: grid;
  gap: 2rem;
}

.blog-index-content {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.post-index {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1.5rem;
}

.post-card {
  background: var(--bg-soft);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  overflow: hidden;
}

.post-card:hover {
  border-color: var(--line-strong);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.post-card-link {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1.25rem;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 0;
}

.post-thumb {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.post-thumb img {
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-card:hover .post-thumb img {
  transform: scale(1.05);
}

.post-body {
  padding: 1.25rem 1.25rem 1.25rem 0;
  display: grid;
  gap: 0.75rem;
  align-content: start;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
  color: var(--text-primary);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-subtle);
  font-family: var(--font-mono);
}

.meta-author {
  font-weight: 500;
}

.post-summary {
  color: var(--text-subtle);
  line-height: 1.6;
  margin: 0;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.25rem 0.6rem;
  background: var(--bg-muted);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-family: var(--font-mono);
  color: var(--text-subtle);
}

.no-results {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-subtle);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line-soft);
}

.pagination-btn {
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  background: var(--bg-soft);
  color: var(--text-primary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--line-strong);
  background: var(--bg-muted);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-family: var(--font-mono);
  color: var(--text-subtle);
  font-size: 0.95rem;
}

.blog-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 68ch;
  margin: 0 auto;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-subtle);
  margin-bottom: 1.5rem;
}

.breadcrumbs a {
  text-decoration: none;
  color: var(--text-subtle);
  transition: color 0.2s ease;
}

.breadcrumbs a:hover {
  color: var(--text-primary);
}

.breadcrumbs .separator {
  opacity: 0.5;
}

.breadcrumbs .current {
  color: var(--text-primary);
  font-weight: 500;
}

.markdown-body {
  margin: 2rem 0;
}

.floating-toc {
  position: fixed;
  right: 2rem;
  top: 8rem;
  width: 260px;
  max-height: 60vh;
  overflow: auto;
  background: var(--bg-elevated);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  padding: 1rem;
  z-index: 10;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.toc-toggle {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-sm);
  background: var(--bg-muted);
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toc-toggle:hover {
  border-color: var(--line-strong);
}

.toc-nav {
  margin-top: 0.75rem;
}

.toc-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 0.75rem;
  color: var(--text-primary);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-list li {
  margin: 0.35rem 0;
}

.toc-h3 {
  padding-left: 1rem;
}

.toc-link {
  color: var(--text-subtle);
  text-decoration: none;
  font-size: 0.9rem;
  line-height: 1.4;
  transition: color 0.2s ease;
  display: block;
}

.toc-link:hover {
  color: var(--text-primary);
}

.post-navigation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line-soft);
}

.post-nav-link {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.5rem 0;
  border: 0;
  background: transparent;
  text-decoration: none;
  transition: color 0.2s ease;
}

.post-nav-link:hover {
  background: transparent;
}

.post-nav-link.next {
  text-align: right;
  margin-left: auto;
}

.nav-label {
  font-size: 0.9rem;
  color: var(--text-subtle);
  font-weight: 500;
}

.nav-title {
  font-size: 1.1rem;
  color: var(--text-primary);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 1200px) {
  .floating-toc {
    display: none;
  }
}

@media (max-width: 768px) {
  .post-card-link {
    grid-template-columns: 1fr;
  }

  .post-thumb {
    height: 200px;
  }

  .post-body {
    padding: 1.25rem;
  }

  .post-title {
    font-size: 1.25rem;
  }

  .pagination {
    flex-direction: column;
    gap: 0.75rem;
  }

  .post-navigation {
    grid-template-columns: 1fr;
  }

  .post-nav-link.next {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .meta-date::before {
    display: none;
  }

  .pagination-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
