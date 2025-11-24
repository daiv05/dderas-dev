<template>
    <section class="about-section">
        <div class="about-header">
            <div class="section-label" ref="label">
                <v-icon icon="mdi-account-outline" size="20"></v-icon>
                <span>Sobre mí</span>
            </div>
            <h2 class="section-title" ref="titleEl">
                Desarrollador <span class="gradient-text">Fullstack</span>
            </h2>
            <p class="section-subtitle" ref="subtitle">
                Creando soluciones digitales desde San Salvador
            </p>
        </div>

        <div class="about-content">
            <div class="content-grid">
                <div class="profile-section" ref="profileSection">
                    <div class="profile-image-wrapper">
                        <div class="image-decoration"></div>
                        <img src="/img/me/maki.jpg" alt="David Deras" class="profile-image" />
                        <div class="status-badge">
                            <div class="status-dot"></div>
                            Disponible para proyectos
                        </div>
                    </div>

                    <div class="quick-info">
                        <div class="info-item">
                            <v-icon icon="mdi-map-marker" color="primary"></v-icon>
                            <div>
                                <div class="info-label">Ubicación</div>
                                <div class="info-value">San Salvador, El Salvador</div>
                            </div>
                        </div>
                        <div class="info-item">
                            <v-icon icon="mdi-email" color="primary"></v-icon>
                            <div>
                                <div class="info-label">Email</div>
                                <div class="info-value">davidderas50@gmail.com</div>
                            </div>
                        </div>
                        <div class="info-item">
                            <v-icon icon="mdi-translate" color="primary"></v-icon>
                            <div>
                                <div class="info-label">Idiomas</div>
                                <div class="info-value">Español (Nativo), Inglés (B1)</div>
                            </div>
                        </div>
                    </div>

                    <div class="cta-section">
                        <v-btn
                            size="large"
                            class="download-cv"
                            href="/CV_David_Deras_carta.pdf"
                            download="CV_David_Deras_carta.pdf"
                        >
                            <v-icon start icon="mdi-download"></v-icon>
                            Descargar CV
                        </v-btn>
                        <v-btn
                            size="large"
                            variant="outlined"
                            class="contact-btn"
                            href="mailto:davidderas50@gmail.com"
                        >
                            <v-icon start icon="mdi-email-outline"></v-icon>
                            Contactar
                        </v-btn>
                    </div>
                </div>

                <div class="details-section" ref="detailsSection">
                    <div class="bio-card">
                        <h3 class="card-title">
                            <v-icon icon="mdi-account-circle" size="24"></v-icon>
                            ¿Quién soy?
                        </h3>
                        <p class="bio-text">
                            Desarrollador fullstack salvadoreño apasionado por crear experiencias web
                            excepcionales. Especializado en <strong>Vue.js</strong> y <strong>Laravel</strong>,
                            con un enfoque particular en el desarrollo frontend y la experiencia de usuario.
                        </p>
                        <p class="bio-text">
                            Me entusiasma enfrentar desafíos técnicos complejos, diseñar arquitecturas
                            escalables y aprender constantemente nuevas tecnologías. Cada proyecto es
                            una oportunidad para innovar y mejorar.
                        </p>
                    </div>

                    <div class="skills-card">
                        <h3 class="card-title">
                            <v-icon icon="mdi-code-braces" size="24"></v-icon>
                            Habilidades Técnicas
                        </h3>
                        <div class="skills-grid">
                            <div
                                v-for="skill in skills"
                                :key="skill.name"
                                class="skill-item"
                                :style="{ '--delay': skill.delay }"
                            >
                                <div class="skill-header">
                                    <div class="skill-name">
                                        <v-icon :icon="skill.icon" size="20"></v-icon>
                                        {{ skill.name }}
                                    </div>
                                    <div class="skill-level">{{ skill.level }}%</div>
                                </div>
                                <div class="skill-bar">
                                    <div
                                        class="skill-progress"
                                        :style="{ width: skill.level + '%' }"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="experience-card">
                        <h3 class="card-title">
                            <v-icon icon="mdi-briefcase" size="24"></v-icon>
                            Experiencia
                        </h3>
                        <div class="timeline">
                            <div
                                v-for="item in experience"
                                :key="item.title"
                                class="timeline-item"
                            >
                                <div class="timeline-dot"></div>
                                <div class="timeline-content">
                                    <div class="timeline-date">{{ item.date }}</div>
                                    <h4 class="timeline-title">{{ item.title }}</h4>
                                    <p class="timeline-description">{{ item.description }}</p>
                                    <div class="timeline-tags">
                                        <span
                                            v-for="tag in item.tags"
                                            :key="tag"
                                            class="tag"
                                        >
                                            {{ tag }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="interests-card">
                        <h3 class="card-title">
                            <v-icon icon="mdi-heart" size="24"></v-icon>
                            Intereses
                        </h3>
                        <div class="interests-grid">
                            <div
                                v-for="interest in interests"
                                :key="interest.name"
                                class="interest-item"
                            >
                                <v-icon :icon="interest.icon" size="32" color="primary"></v-icon>
                                <div class="interest-name">{{ interest.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const label = ref(null);
const titleEl = ref(null);
const subtitle = ref(null);
const profileSection = ref(null);
const detailsSection = ref(null);

const skills = [
    { name: 'Vue.js', level: 90, icon: 'mdi-vuejs', delay: '0s' },
    { name: 'Laravel', level: 85, icon: 'mdi-laravel', delay: '0.1s' },
    { name: 'JavaScript/TypeScript', level: 88, icon: 'mdi-language-typescript', delay: '0.2s' },
    { name: 'Node.js', level: 80, icon: 'mdi-nodejs', delay: '0.3s' },
    { name: 'MySQL/PostgreSQL', level: 85, icon: 'mdi-database', delay: '0.4s' },
    { name: 'Git & GitHub', level: 90, icon: 'mdi-git', delay: '0.5s' },
    { name: 'TailwindCSS', level: 92, icon: 'mdi-tailwind', delay: '0.6s' },
    { name: 'REST APIs', level: 88, icon: 'mdi-api', delay: '0.7s' },
];

const experience = [
    {
        date: '2023 - Presente',
        title: 'Freelance Fullstack Developer',
        description: 'Desarrollo de aplicaciones web personalizadas para clientes locales e internacionales. Especialización en sistemas de gestión empresarial y plataformas de e-commerce.',
        tags: ['Vue.js', 'Laravel', 'MySQL']
    },
    {
        date: '2022 - 2023',
        title: 'Proyectos Universitarios',
        description: 'Desarrollo de múltiples aplicaciones como parte de proyectos académicos, incluyendo sistemas de gestión financiera, plataformas sociales y herramientas de análisis de datos.',
        tags: ['Django', 'PostgreSQL', 'Vue.js']
    },
    {
        date: '2021 - 2022',
        title: 'Estudiante de Ingeniería',
        description: 'Ingeniería de Sistemas Informáticos en la Universidad de El Salvador. Enfoque en desarrollo de software, bases de datos y arquitectura de sistemas.',
        tags: ['Algoritmos', 'BD', 'Desarrollo Web']
    }
];

const interests = [
    { name: 'UI/UX Design', icon: 'mdi-palette' },
    { name: 'Cloud Computing', icon: 'mdi-cloud' },
    { name: 'Data Visualization', icon: 'mdi-chart-line' },
    { name: 'Open Source', icon: 'mdi-github' },
    { name: 'DevOps', icon: 'mdi-server' },
    { name: 'Mobile Dev', icon: 'mdi-cellphone' }
];

onMounted(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(label.value, { opacity: 0, y: 30, duration: 0.8 })
      .from(titleEl.value, { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
      .from(subtitle.value, { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
      .from(profileSection.value, { opacity: 0, x: -50, duration: 1 }, '-=0.5')
      .from(detailsSection.value, { opacity: 0, x: 50, duration: 1 }, '-=0.8');

    // Animar barras de habilidades
    gsap.from('.skill-progress', {
        scrollTrigger: {
            trigger: '.skills-card',
            start: 'top 80%',
        },
        width: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power2.out'
    });
});
</script>

<style scoped lang="scss">
.about-section {
    padding: 120px 5%;
    min-height: 100vh;
}

.about-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 80px;

    .section-label {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--primary-opacity-10);
        border-radius: 20px;
        font-family: var(--font-mono);
        font-size: 0.875rem;
        color: rgb(var(--v-theme-primary));
        margin-bottom: 1.5rem;
        font-weight: 500;
    }

    .section-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: 900;
        margin-bottom: 1rem;
    }

    .section-subtitle {
        font-size: 1.25rem;
        opacity: 0.7;
    }
}

.content-grid {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 4rem;
    max-width: 1400px;
    margin: 0 auto;
}

.profile-section {
    .profile-image-wrapper {
        position: relative;
        margin-bottom: 2rem;

        .image-decoration {
            position: absolute;
            top: -20px;
            left: -20px;
            width: 100%;
            height: 100%;
            border: 3px solid var(--color-primary);
            border-radius: 24px;
            z-index: 0;
        }

        .profile-image {
            position: relative;
            width: 100%;
            border-radius: 20px;
            display: block;
            z-index: 1;
            // box-shadow: var(--shadow-xl);
        }

        .status-badge {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: rgb(var(--v-theme-surface));
            backdrop-filter: blur(10px);
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 600;
            color: rgb(var(--v-theme-on-surface));
            border: 1px solid var(--primary-opacity-30);
            z-index: 2;

            .status-dot {
                width: 8px;
                height: 8px;
                background: #06A77D;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        }
    }

    .quick-info {
        background: rgb(var(--v-theme-surface));
        border-radius: 16px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        border: 1px solid var(--primary-opacity-20);
        box-shadow: 0 4px 20px var(--primary-opacity-10);

        .info-item {
            display: flex;
            gap: 1rem;
            padding: 1rem 0;

            &:not(:last-child) {
                border-bottom: 1px solid var(--primary-opacity-10);
            }

            .info-label {
                font-size: 0.75rem;
                opacity: 0.6;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 0.25rem;
            }

            .info-value {
                font-size: 0.9375rem;
                font-weight: 500;
                color: rgb(var(--v-theme-on-surface));
            }
        }
    }

    .cta-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .download-cv {
            background: rgb(var(--v-theme-primary)) !important;
            color: white !important;
            font-weight: 600;
            text-transform: none;
        }

        .contact-btn {
            border: 2px solid var(--color-primary);
            color: rgb(var(--v-theme-primary)) !important;
            font-weight: 600;
            text-transform: none;

            &:hover {
                background: var(--color-primary) !important;
                color: white !important;
            }
        }
    }
}

.details-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .bio-card,
    .skills-card,
    .experience-card,
    .interests-card {
        background: rgb(var(--v-theme-surface));
        border-radius: 16px;
        padding: 2rem;
        border: 1px solid var(--primary-opacity-20);
        box-shadow: 0 4px 20px var(--primary-opacity-10);

        .card-title {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: rgb(var(--v-theme-primary));
        }
    }

    .bio-text {
        font-size: 1.0625rem;
        line-height: 1.8;
        margin-bottom: 1rem;
        opacity: 0.8;

        strong {
            color: rgb(var(--v-theme-primary));
            font-weight: 600;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }

    .skills-grid {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .skill-item {
            animation: fadeInUp 0.6s ease-out backwards;
            animation-delay: var(--delay);

            .skill-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;

                .skill-name {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 600;
                    font-size: 0.9375rem;
                }

                .skill-level {
                    font-family: var(--font-mono);
                    font-size: 0.875rem;
                    color: rgb(var(--v-theme-primary));
                    font-weight: 600;
                }
            }

            .skill-bar {
                height: 8px;
                background: var(--primary-opacity-10);
                border-radius: 10px;
                overflow: hidden;

                .skill-progress {
                    height: 100%;
                    background: rgb(var(--v-theme-primary));
                    border-radius: 10px;
                    transition: width 1.5s ease-out;
                }
            }
        }
    }

    .timeline {
        position: relative;
        padding-left: 2rem;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2px;
            background: rgb(var(--v-theme-primary));
        }

        .timeline-item {
            position: relative;
            margin-bottom: 2.5rem;

            &:last-child {
                margin-bottom: 0;
            }

            .timeline-dot {
                position: absolute;
                left: -2.5rem;
                top: 0;
                width: 12px;
                height: 12px;
                background: rgb(var(--v-theme-primary));
                border-radius: 50%;
                border: 3px solid rgb(var(--v-theme-surface));
                box-shadow: 0 0 0 4px var(--primary-opacity-20);
            }

            .timeline-content {
                .timeline-date {
                    font-family: var(--font-mono);
                    font-size: 0.875rem;
                    color: rgb(var(--v-theme-primary));
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }

                .timeline-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    color: rgb(var(--v-theme-on-surface));
                }

                .timeline-description {
                    font-size: 0.9375rem;
                    line-height: 1.6;
                    color: rgb(var(--v-theme-on-surface));
                    opacity: 0.7;
                    margin-bottom: 1rem;
                }

                .timeline-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;

                    .tag {
                        padding: 0.375rem 0.75rem;
                        background: var(--primary-opacity-15);
                        border-radius: 6px;
                        font-size: 0.75rem;
                        font-family: var(--font-mono);
                        color: var(--color-accent);
                    }
                }
            }
        }
    }

    .interests-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;

        .interest-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
            padding: 1.5rem;
            background: var(--primary-opacity-05);
            border-radius: 12px;
            text-align: center;
            transition: all var(--transition-base);

            &:hover {
                background: var(--primary-opacity-15);
                transform: translateY(-4px);
            }

            .interest-name {
                font-size: 0.875rem;
                font-weight: 600;
                color: rgb(var(--v-theme-on-surface));
            }
        }
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 1024px) {
    .content-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    .profile-section {
        max-width: 500px;
        margin: 0 auto;
    }
}

@media (max-width: 768px) {
    .about-section {
        padding: 60px 5%;
    }

    .about-header {
        margin-bottom: 40px;
    }

    .details-section {
        .interests-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
}
</style>
