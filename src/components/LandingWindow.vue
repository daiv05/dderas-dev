<template>
  <section class="hero-section">
    <div class="hero-background">
      <div class="gradient-mesh"></div>
      <div class="pattern-overlay"></div>
      <div class="floating-elements">
        <div class="element" v-for="n in 6" :key="n" :style="getElementStyle(n)"></div>
      </div>
    </div>

    <div class="hero-content">
      <div class="hero-text">
        <div class="greeting" ref="greeting">Hola, soy</div>
        <h1 class="name" ref="name">
          <span class="gradient-text">David Deras</span>
        </h1>
        <h2 class="title" ref="title">
          <span class="typed-text">{{ currentRole }}</span>
          <span class="cursor">|</span>
        </h2>
        <p class="description" ref="description">
          Creando experiencias web excepcionales con código limpio y diseño innovador.
          Especializado en desarrollo fullstack con enfoque en frontend moderno.
        </p>
        <div class="cta-buttons" ref="buttons">
          <v-btn
            size="large"
            class="cta-primary"
            :ripple="false"
            @click="scrollToProjects"
          >
            <v-icon left>mdi-briefcase-outline</v-icon>
            Ver Proyectos
          </v-btn>
          <v-btn
            size="large"
            variant="outlined"
            class="cta-secondary"
            :ripple="false"
            href="mailto:davidderas50@gmail.com"
          >
            <v-icon left>mdi-email-outline</v-icon>
            Contactar
          </v-btn>
        </div>

        <div class="tech-stack" ref="techStackRef">
          <div class="stack-label">Stack principal:</div>
          <div class="stack-items">
            <div class="stack-item" v-for="tech in techStack" :key="tech.name">
              <v-icon :icon="tech.icon" size="20"></v-icon>
              <span>{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-visual" ref="visual">
        <div class="code-window">
          <div class="window-header">
            <div class="window-controls">
              <span class="control close"></span>
              <span class="control minimize"></span>
              <span class="control maximize"></span>
            </div>
            <div class="window-title">portfolio.js</div>
          </div>
          <div class="window-content">
            <pre><code class="code-snippet">
<span class="keyword">const</span> <span class="variable">developer</span> = {
  <span class="property">name</span>: <span class="string">"David Deras"</span>,
  <span class="property">location</span>: <span class="string">"San Salvador, SV"</span>,
  <span class="property">role</span>: <span class="string">"Fullstack Developer"</span>,
  <span class="property">skills</span>: [
    <span class="string">"Vue.js"</span>, <span class="string">"Laravel"</span>,
    <span class="string">"Node.js"</span>, <span class="string">"MySQL"</span>
  ],
  <span class="property">passion</span>: <span class="string">"Frontend & UX"</span>,
  <span class="method">build</span>: <span class="keyword">function</span>() {
    <span class="keyword">return</span> <span class="string">"amazing projects"</span>;
  }
};</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="scroll-indicator" ref="scrollIndicator">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <div class="arrow-down"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const greeting = ref(null);
const name = ref(null);
const title = ref(null);
const description = ref(null);
const buttons = ref(null);
const techStackRef = ref(null);
const visual = ref(null);
const scrollIndicator = ref(null);
let ctx;

const techStack = [
  { name: 'Vue.js', icon: 'mdi-vuejs' },
  { name: 'Laravel', icon: 'mdi-laravel' },
  { name: 'Node.js', icon: 'mdi-nodejs' },
  { name: 'MySQL', icon: 'mdi-database' },
];

const currentRole = ref('');
const roles = [
  'Fullstack Developer',
  'Frontend Specialist',
  'Vue.js Enthusiast',
  'Problem Solver'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeWriter = () => {
  const current = roles[roleIndex];

  if (isDeleting) {
    currentRole.value = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    currentRole.value = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === current.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
};

const getElementStyle = (n) => {
  const size = 100 + (n * 50);
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const delay = n * 0.5;

  return {
    width: `${size}px`,
    height: `${size}px`,
    top: `${top}%`,
    left: `${left}%`,
    animationDelay: `${delay}s`
  };
};

const scrollToProjects = () => {
  const projectsSection = document.querySelector('.projects');
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  // Animaciones GSAP
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(greeting.value, {
      opacity: 0,
      y: 30,
      duration: 0.8
    })
  .from(name.value, {
    opacity: 0,
    y: 30,
    duration: 0.8
  }, '-=0.5')
  .from(title.value, {
    opacity: 0,
    y: 30,
    duration: 0.8
  }, '-=0.5')
  .from(description.value, {
    opacity: 0,
    y: 30,
    duration: 0.8
  }, '-=0.5')
  .from(buttons.value, {
    opacity: 0,
    y: 30,
    duration: 0.8
  }, '-=0.5')
  .from(techStackRef.value, {
    opacity: 0,
    y: 30,
    duration: 0.8
  }, '-=0.5')
  .from(visual.value, {
    opacity: 0,
    x: 50,
    duration: 1
  }, '-=1')
  .from(scrollIndicator.value, {
    opacity: 0,
    y: -20,
    duration: 0.8
  }, '-=0.3');
  });

  // Iniciar efecto typewriter
  setTimeout(typeWriter, 1000);

  // Animación de scroll para parallax
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
});

onUnmounted(() => {
  ctx.revert();
});
</script>

<style scoped lang="scss">
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 3%;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  .gradient-mesh {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(at 0% 0%, var(--primary-opacity-30) 0px, transparent 50%),
                radial-gradient(at 100% 0%, var(--secondary-opacity-20) 0px, transparent 50%),
                radial-gradient(at 100% 100%, var(--accent-opacity-30) 0px, transparent 50%),
                radial-gradient(at 0% 100%, var(--primary-opacity-20) 0px, transparent 50%);
    opacity: 0.6;
  }

  .pattern-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(var(--primary-opacity-03) 1px, transparent 1px),
      linear-gradient(90deg, var(--primary-opacity-03) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  .floating-elements {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .element {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, var(--primary-opacity-10), transparent);
      animation: float 30s infinite ease-in-out alternate;

      @keyframes float {
        0% {
          transform: translate(0, 0) scale(1) rotate(0deg);
        }
        25% {
          transform: translate(30px, -30px) scale(1.1) rotate(90deg);
        }
        50% {
          transform: translate(-20px, 20px) scale(0.9) rotate(180deg);
        }
        75% {
          transform: translate(40px, 10px) scale(1.05) rotate(270deg);
        }
        100% {
          transform: translate(0, 0) scale(1) rotate(360deg);
        }
      }
    }
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1400px;
  width: 100%;
  align-items: center;
}

.hero-text {
  .greeting {
    font-family: var(--font-mono);
    font-size: 1.125rem;
    color: rgb(var(--v-theme-primary));
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .name {
    font-size: clamp(3rem, 8vw, 5rem);
    margin-bottom: 1rem;
    line-height: 1;
    font-weight: 900;
    letter-spacing: -0.02em;
  }

  .title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    margin-bottom: 2rem;
    font-weight: 600;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.8;
    min-height: 60px;

    .cursor {
      color: rgb(var(--v-theme-primary));
      animation: blink 1s infinite;
    }

    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  }

  .description {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.7;
    max-width: 600px;
  }

  .cta-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;

    .cta-primary {
      background: rgb(var(--v-theme-primary)) !important;
      color: white !important;
      font-weight: 600;
      text-transform: none;
      letter-spacing: 0;
      padding: 0 2rem;
      transition: all var(--transition-base);

      &:hover {
        transform: translateY(-2px);
      }
    }

    .cta-secondary {
      border: 2px solid rgb(var(--v-theme-primary));
      color: rgb(var(--v-theme-primary)) !important;
      font-weight: 600;
      text-transform: none;
      letter-spacing: 0;
      padding: 0 2rem;
      transition: all var(--transition-base);

      &:hover {
        background: rgb(var(--v-theme-primary)) !important;
        color: white !important;
        transform: translateY(-2px);
      }
    }
  }

  .tech-stack {
    .stack-label {
      font-family: var(--font-mono);
      font-size: 0.875rem;
      color: rgb(var(--v-theme-on-surface));
      opacity: 0.6;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stack-items {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;

      .stack-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--primary-opacity-10);
        border-radius: 8px;
        font-family: var(--font-mono);
        font-size: 0.875rem;
        font-weight: 500;
        color: rgb(var(--v-theme-primary));
        transition: all var(--transition-base);

        &:hover {
          background: var(--primary-opacity-20);
          transform: translateY(-2px);
        }
      }
    }
  }
}

.hero-visual {
  .code-window {
    background: rgba(22, 21, 20, 0.95);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--primary-opacity-20);
    backdrop-filter: blur(10px);

    .window-header {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      background: rgba(10, 9, 8, 0.8);
      border-bottom: 1px solid var(--primary-opacity-10);

      .window-controls {
        display: flex;
        gap: 0.5rem;
        margin-right: 1rem;

        .control {
          width: 12px;
          height: 12px;
          border-radius: 50%;

          &.close { background: #ff5f56; }
          &.minimize { background: #ffbd2e; }
          &.maximize { background: #27c93f; }
        }
      }

      .window-title {
        font-family: var(--font-mono);
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.6);
      }
    }

    .window-content {
      padding: 1.5rem;

      pre {
        margin: 0;

        code {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          line-height: 1.6;

          .keyword { color: #ff6b6b; }
          .variable { color: #4ecdc4; }
          .property { color: #ffe66d; }
          .string { color: #95e1d3; }
          .method { color: #f38181; }
        }
      }
    }
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  animation: bounce 2s infinite;

  .mouse {
    width: 24px;
    height: 40px;
    border: 2px solid rgb(var(--v-theme-primary));
    border-radius: 12px;
    display: flex;
    justify-content: center;
    padding-top: 8px;

    .wheel {
      width: 3px;
      height: 8px;
      background: rgb(var(--v-theme-primary));
      border-radius: 2px;
      animation: scroll 1.5s infinite;
    }
  }

  .arrow-down {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid rgb(var(--v-theme-primary));
  }

  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-10px); }
  }

  @keyframes scroll {
    0% { opacity: 0; transform: translateY(0); }
    50% { opacity: 1; }
    100% { opacity: 0; transform: translateY(8px); }
  }
}

@media (max-width: 960px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .hero-text {
    .description {
      max-width: 100%;
    }

    .cta-buttons {
      justify-content: center;
    }

    .tech-stack {
      .stack-items {
        justify-content: center;
      }
    }
  }

  .hero-visual {
    order: -1;
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>
