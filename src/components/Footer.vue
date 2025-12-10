<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <p class="eyebrow">{{ t('navigation.brand.name') }}</p>
        <p>
          {{ t('footer.description') }}
        </p>
      </div>

      <div class="footer-links">
        <p class="mono">{{ t('footer.quickMap') }}</p>
        <div class="nav-pills">
          <router-link to="/">{{ t('footer.links.home') }}</router-link>
          <router-link to="/projects">{{ t('footer.links.projects') }}</router-link>
          <router-link to="/resources">{{ t('footer.links.ues') }}</router-link>
          <router-link to="/tools">{{ t('footer.links.tools') }}</router-link>
        </div>
        <a class="cv-link" href="/cv/David_Deras_Frontend_Engineer.pdf" download>
          {{ t('footer.downloadCv') }}
        </a>
      </div>

      <div class="footer-contact">
        <p class="mono">{{ t('footer.contact') }}</p>
        <a href="tel:+50374641460">(+503) 7464-1460</a>
        <a href="mailto:davidderas50@gmail.com">davidderas50@gmail.com</a>
        <div class="social-inline">
          <a href="https://github.com/daiv05" target="_blank" rel="noopener">GitHub</a>
          <a href="https://linkedin.com/in/dderas" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://twitter.com/daiv_09" target="_blank" rel="noopener">Twitter</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="mono">© deras.dev - {{ currentYear }}</span>
      <span>{{ t('footer.builtWith') }}</span>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const currentYear = computed(() => new Date().getFullYear());
const { t } = useI18n();
</script>

<style scoped lang="scss">
.site-footer {
  border-top: 1px solid var(--line-soft);
  padding: 2.5rem var(--shell-padding);
}

.footer-inner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.footer-brand p:last-child {
  color: var(--text-subtle);
}

.footer-links,
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.nav-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.nav-pills a {
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  padding: 0.35rem 0.85rem;
  font-size: 0.85rem;
}

.cv-link {
  font-size: 0.9rem;
  text-decoration: underline;
  width: fit-content;
}

.footer-links a,
.footer-contact a {
  text-decoration: none;
}

.social-inline {
  display: flex;
  gap: 0.75rem;
}

.footer-bottom {
  border-top: 1px solid var(--line-soft);
  padding-right: 60px;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  color: var(--text-subtle);
}
</style>
