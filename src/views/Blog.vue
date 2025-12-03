<template>
  <div class="page-frame">
    <section class="section-stack">
      <header>
        <div class="eyebrow">Blog</div>
        <h1 class="section-title">Artículos</h1>
        <p class="section-lead">Publicaciones en formato Markdown renderizadas como componentes.</p>
      </header>

      <div class="grid-duo">
        <aside class="plain-sheet sticky-panel">
          <ul class="post-index">
            <li v-for="post in postList" :key="post.slug" class="post-item">
              <div class="post-item-head">
                <router-link
                  class="post-link"
                  :to="{ name: 'BlogPost', params: { slug: post.slug } }"
                >
                  {{ post.title }}
                </router-link>
                <span class="post-date mono">{{ post.date }}</span>
              </div>
              <p v-if="post.summary" class="post-summary">{{ post.summary }}</p>
              <div v-if="post.tags?.length" class="chipline">
                <span v-for="t in post.tags" :key="t">#{{ t }}</span>
              </div>
            </li>
          </ul>
        </aside>

        <article v-if="Current" class="plain-sheet markdown-body">
          <header class="post-header">
            <h1 class="post-title">{{ currentPost?.title }}</h1>
            <div class="inline-meta">
              <span v-if="currentPost?.date">{{ currentPost.date }}</span>
              <div v-if="currentPost?.tags?.length" class="chipline">
                <span v-for="t in currentPost.tags" :key="t">#{{ t }}</span>
              </div>
            </div>
            <img
              v-if="currentPost?.image"
              class="post-hero"
              :src="currentPost.image"
              :alt="currentPost.title"
            />
            <p v-if="currentPost?.summary" class="section-lead" style="margin-top: 0.5rem">
              {{ currentPost.summary }}
            </p>
          </header>

          <!-- Render del TOC si el post lo incluye via [toc] -->
          <component :is="Current" />

          <nav v-if="currentIndex !== -1" class="post-nav">
            <router-link
              v-if="prevPost"
              class="prev"
              :to="{ name: 'BlogPost', params: { slug: prevPost.slug } }"
            >
              ← {{ prevPost.title }}
            </router-link>
            <router-link
              v-if="nextPost"
              class="next"
              :to="{ name: 'BlogPost', params: { slug: nextPost.slug } }"
            >
              {{ nextPost.title }} →
            </router-link>
          </nav>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useSeo } from '@/composables/useSeo';

// Cargar todos los posts de /blog como componentes
const modules = import.meta.glob('/blog/*.md', { eager: true });

// Construir lista con slug y frontmatter si existe
const postList = Object.keys(modules)
  .map((path) => {
    const mod = modules[path];
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const fm = mod?.frontmatter || {};
    return {
      slug,
      title: fm.title || slug,
      date: fm.date || '',
      tags: fm.tags || [],
      summary: fm.summary || '',
    };
  })
  // Ordenar por fecha descendente si disponible
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

const route = useRoute();
const { updateSeo } = useSeo();

const Current = computed(() => {
  const slug = route.params.slug;
  if (!slug) return null;
  const match = Object.entries(modules).find(([path]) => path.endsWith(`${slug}.md`));
  return match ? match[1].default : null;
});

const currentIndex = computed(() => {
  const slug = route.params.slug;
  if (!slug) return -1;
  return postList.findIndex((p) => p.slug === slug);
});

const currentPost = computed(() => {
  const i = currentIndex.value;
  return i >= 0 ? postList[i] : null;
});

const prevPost = computed(() => {
  const i = currentIndex.value;
  return i > 0 ? postList[i - 1] : null;
});

const nextPost = computed(() => {
  const i = currentIndex.value;
  return i >= 0 && i < postList.length - 1 ? postList[i + 1] : null;
});

// SEO: usar frontmatter del post para título/descripcion
watch(
  () => route.params.slug,
  () => {
    const slug = route.params.slug;
    if (!slug) return;
    const post = postList.find((p) => p.slug === slug);
    if (!post) return;
    // Ajustar título simple; useSeo actualiza el resto con defaults
    if (typeof document !== 'undefined') {
      const siteName = 'deras-dev';
      const baseTitle = post.title || slug;
      document.title = `${baseTitle} | ${siteName}`;
    }
    // Metadatos enriquecidos desde frontmatter
    const description = post.summary || '';
    const ogImage = post.image || '';
    if (typeof document !== 'undefined') {
      const upsert = (sel, attr, val) => {
        if (!val) return;
        let el = document.head.querySelector(sel);
        if (!el) {
          el = document.createElement(sel.startsWith('meta') ? 'meta' : 'link');
          if (sel.startsWith('meta')) {
            const m = sel.match(/meta\[(name|property)="([^"]+)"\]/);
            if (m) el.setAttribute(m[1], m[2]);
          } else {
            el.setAttribute('rel', 'canonical');
          }
          document.head.appendChild(el);
        }
        el.setAttribute(attr, val);
      };
      upsert('meta[name="description"]', 'content', description);
      upsert('meta[property="og:title"]', 'content', post.title || slug);
      upsert('meta[property="og:description"]', 'content', description);
      upsert('meta[property="og:image"]', 'content', ogImage);
      upsert('meta[name="twitter:title"]', 'content', post.title || slug);
      upsert('meta[name="twitter:description"]', 'content', description);
      upsert('meta[name="twitter:image"]', 'content', ogImage);
    }
    updateSeo();
  },
  { immediate: true }
);
</script>

<style scoped>
.grid-duo {
  align-items: start;
}
.post-index {
  display: grid;
  gap: 1rem;
}
.post-item {
  display: grid;
  gap: 0.5rem;
}
.post-item-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.post-link {
  font-weight: 600;
}
.post-date {
  color: var(--text-subtle);
}
.post-summary {
  color: var(--text-subtle);
  font-size: 0.95rem;
}
.post-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
.post-header {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}
.post-title {
  font-size: clamp(2rem, 5vw, 2.6rem);
}
.post-hero {
  border-radius: var(--radius-md);
  border: 1px solid var(--line-soft);
  margin-top: 0.5rem;
}
.post-nav .prev,
.post-nav .next {
  font-weight: 600;
}
</style>
