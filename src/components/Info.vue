<template>
  <section class="about-shell">
    <div class="about-header">
      <p ref="label" class="eyebrow">Perfil profesional</p>
      <h2 ref="titleEl" class="section-title">Full Stack orientado a Vue, Laravel y producto</h2>
      <p ref="subtitle" class="section-lead">
        Ingeniero con más de dos años construyendo sistemas para gobierno, retail y plataformas
        colaborativas. Me enfoco en accesibilidad, SEO y despliegues cloud que mantienen el ritmo de
        equipos multidisciplinarios.
      </p>
    </div>

    <div class="about-grid">
      <div ref="profileSection" class="profile-column">
        <div class="profile-card">
          <img src="/img/me/maki.jpg" alt="David Deras" />
          <ul class="fact-list">
            <li v-for="fact in quickFacts" :key="fact.label">
              <span class="label">{{ fact.label }}</span>
              <span class="value">{{ fact.value }}</span>
            </li>
          </ul>
          <div class="profile-actions">
            <v-btn
              variant="flat"
              color="primary"
              rounded="pill"
              href="/David_Deras_Frontend_Engineer.pdf"
              download="David_Deras_Frontend_Engineer.pdf"
            >
              Descargar CV
            </v-btn>
            <v-btn variant="outlined" rounded="pill" href="mailto:davidderas50@gmail.com">
              Contactar
            </v-btn>
          </div>
        </div>
      </div>

      <div ref="detailsSection" class="details-column">
        <div class="detail-block">
          <h3>Enfoque</h3>
          <p>
            Diseño y programo productos que automatizan procesos institucionales: expedientes
            clínicos, ERP para retail costero o plataformas de matching. Parto de investigación,
            defino acuerdos de API y documento para que equipos de diseño, QA y operaciones puedan
            iterar sin fricción.
          </p>
        </div>

        <div class="detail-block">
          <div class="block-header">
            <h3>Competencias principales</h3>
            <span class="mono">Actualizado 2025</span>
          </div>
          <div class="skill-list">
            <div v-for="skill in skills" :key="skill.name" class="skill-item">
              <div class="skill-legend">
                <span>{{ skill.name }}</span>
                <span class="mono">{{ skill.level }}%</span>
              </div>
              <div class="skill-track">
                <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="detail-block">
          <h3>Experiencia y entregables</h3>
          <ul class="timeline">
            <li v-for="item in experience" :key="item.title">
              <div class="timeline-head">
                <span class="mono">{{ item.date }}</span>
                <strong>{{ item.title }}</strong>
              </div>
              <p>{{ item.description }}</p>
              <div class="chipline">
                <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="detail-block">
          <h3>Intereses actuales</h3>
          <div class="chipline">
            <span v-for="interest in interests" :key="interest">{{ interest }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ref, onMounted, onUnmounted } from 'vue';

gsap.registerPlugin(ScrollTrigger);

const label = ref(null);
const titleEl = ref(null);
const subtitle = ref(null);
const profileSection = ref(null);
const detailsSection = ref(null);
let ctx;

const quickFacts = [
  { label: 'Ubicación', value: 'San Salvador, El Salvador' },
  { label: 'Teléfono', value: '+503 7464-1460' },
  { label: 'Email', value: 'davidderas50@gmail.com' },
  { label: 'Idiomas', value: 'Español (nativo) · Inglés (A2)' },
  { label: 'Modalidad', value: 'Remoto · Híbrido' },
];

const skills = [
  { name: 'Vue 3 + TypeScript + Vite', level: 93 },
  { name: 'Laravel 11 · PHP 8 APIs', level: 90 },
  { name: 'Integración REST / GraphQL', level: 84 },
  { name: 'Node.js tooling & tests', level: 80 },
  { name: 'UX / UI & accesibilidad', level: 82 },
];

const experience = [
  {
    date: 'Jan 2024 - Presente',
    title: 'Full Stack Engineer · DTIC - MINSAL',
    description:
      'Desarrollo de plataformas públicas y sistemas internos para el Ministerio de Salud: nuevas funcionalidades, integraciones, monitoreo y mejoras de performance/SEO en Vue 3 y Laravel.',
    tags: ['Vue 3', 'Laravel', 'GovTech'],
  },
  {
    date: 'Mar 2023 - Jun 2023',
    title: 'Full Stack Developer · Carmencita Store',
    description:
      'Construcción de un ERP para inventario, RRHH y delivery en la zona costera. Planeación SCRUM, interfaces en Figma y despliegues coordinados con el equipo administrativo.',
    tags: ['Laravel', 'Vue', 'ERP'],
  },
  {
    date: 'Jun 2023 - Dec 2023',
    title: 'Frontend Intern · Presidencia / CASATIC',
    description:
      'Programa de habilidades digitales con enfoque en testing, despliegue y metodologías ágiles para innovación pública.',
    tags: ['Vue', 'Testing', 'Agile'],
  },
  {
    date: 'Sept 2022 - Dec 2022',
    title: 'Web Developer · Proyecto CheRooms',
    description:
      'Plataforma de roomies con Django + Vue, matching inteligente y chat en tiempo real para estudiantes en San Salvador.',
    tags: ['Django', 'Vue', 'WebSockets'],
  },
  {
    date: '2019 - Actualidad',
    title: 'Computer Systems Engineering · UES',
    description:
      'Último año de la carrera, reforzando algoritmos, bases de datos y liderazgo estudiantil en comunidades tech.',
    tags: ['Academia', 'Liderazgo'],
  },
];

const interests = [
  'GovTech & salud digital',
  'Playbooks JS/TS',
  'Automation con Node',
  'Accesibilidad y SEO',
  'Mentorías y educación abierta',
];

onMounted(() => {
  ctx = gsap.context(() => {
    const headerTargets = [label.value, titleEl.value, subtitle.value];

    gsap.from(headerTargets, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    gsap.from(profileSection.value, {
      opacity: 0,
      x: -40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: profileSection.value,
        start: 'top 80%',
        once: true,
      },
    });

    gsap.from(detailsSection.value, {
      opacity: 0,
      x: 40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: detailsSection.value,
        start: 'top 80%',
        once: true,
      },
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped lang="scss">
.about-shell {
  padding: var(--section-gap) var(--shell-padding);
}

.about-header {
  max-width: 840px;
  margin: 0 auto 3rem;
  text-align: center;
}

.about-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 2rem;
  align-items: start;
}

.profile-card {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  background: rgba(var(--v-theme-surface), 0.7);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.profile-card img {
  width: 100%;
  border-radius: var(--radius-md);
}

.fact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.fact-list li {
  border-bottom: 1px solid var(--line-soft);
  padding-bottom: 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.fact-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.fact-list .label {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.details-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-block {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  background: rgba(var(--v-theme-surface), 0.7);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-legend {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
}

.skill-track {
  width: 100%;
  height: 6px;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
}

.skill-progress {
  height: 100%;
  background: rgb(var(--v-theme-primary));
  border-radius: 999px;
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.timeline p {
  color: var(--text-subtle);
  margin: 0.35rem 0 0.5rem;
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .profile-card {
    max-width: 420px;
    margin: 0 auto;
  }
}
</style>
