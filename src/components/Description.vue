<template>
    <section class="features-section">
        <div class="features-header">
            <h2 class="section-title" ref="titleEl">
                ¿Qué encontrarás aquí?
            </h2>
            <p class="section-description" ref="descriptionEl">
                Este espacio reúne proyectos, tutoriales y recursos diseñados para la comunidad de desarrolladores.
                Desde aplicaciones fullstack hasta guías técnicas prácticas.
            </p>
        </div>

        <div class="features-grid">
            <div
                class="feature-card card-projects"
                ref="card1"
                @click="navigateTo('/proyectos')"
            >
                <div class="card-icon">
                    <v-icon icon="mdi-briefcase-variant" size="48"></v-icon>
                </div>
                <div class="card-content">
                    <h3 class="card-title">Proyectos & Portfolio</h3>
                    <p class="card-description">
                        Aplicaciones web fullstack, desde sistemas empresariales hasta
                        herramientas de visualización de datos. Cada proyecto con su historia técnica.
                    </p>
                    <div class="card-tags">
                        <span class="tag">Vue.js</span>
                        <span class="tag">Laravel</span>
                        <span class="tag">MySQL</span>
                    </div>
                </div>
                <div class="card-footer">
                    <span class="explore-link">
                        Explorar proyectos
                        <v-icon icon="mdi-arrow-right" size="20"></v-icon>
                    </span>
                </div>
                <div class="card-glow"></div>
            </div>

            <div
                class="feature-card card-blog"
                ref="card2"
                @click="navigateTo('/tutoriales')"
            >
                <div class="card-icon">
                    <v-icon icon="mdi-book-open-page-variant" size="48"></v-icon>
                </div>
                <div class="card-content">
                    <h3 class="card-title">Blog & Tutoriales</h3>
                    <p class="card-description">
                        Guías técnicas, tutoriales paso a paso sobre cloud computing,
                        deployment y desarrollo web moderno.
                    </p>
                    <div class="card-tags">
                        <span class="tag">Azure</span>
                        <span class="tag">Deployment</span>
                        <span class="tag">DevOps</span>
                    </div>
                </div>
                <div class="card-footer">
                    <span class="explore-link">
                        Leer tutoriales
                        <v-icon icon="mdi-arrow-right" size="20"></v-icon>
                    </span>
                </div>
                <div class="card-glow"></div>
            </div>

            <div
                class="feature-card card-resources"
                ref="card3"
                @click="navigateTo('/documentos-y-guias')"
            >
                <div class="card-icon">
                    <v-icon icon="mdi-folder-multiple" size="48"></v-icon>
                </div>
                <div class="card-content">
                    <h3 class="card-title">Recursos UES</h3>
                    <p class="card-description">
                        Repositorio de materiales académicos, guías de estudio y recursos
                        para estudiantes de Ingeniería de Sistemas.
                    </p>
                    <div class="card-tags">
                        <span class="tag">Documentos</span>
                        <span class="tag">Guías</span>
                        <span class="tag">Academia</span>
                    </div>
                </div>
                <div class="card-footer">
                    <span class="explore-link">
                        Ver recursos
                        <v-icon icon="mdi-arrow-right" size="20"></v-icon>
                    </span>
                </div>
                <div class="card-glow"></div>
            </div>
        </div>

        <div class="cta-section" ref="ctaSection">
            <div class="cta-content">
                <h3 class="cta-title">¿Listo para colaborar?</h3>
                <p class="cta-description">
                    Siempre abierto a nuevos proyectos y oportunidades de colaboración
                </p>
                <v-btn
                    size="x-large"
                    class="cta-button"
                    href="mailto:davidderas50@gmail.com"
                >
                    <v-icon start icon="mdi-email-outline"></v-icon>
                    Contáctame
                </v-btn>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
const titleEl = ref(null);
const descriptionEl = ref(null);
const card1 = ref(null);
const card2 = ref(null);
const card3 = ref(null);
const ctaSection = ref(null);
let ctx;

const navigateTo = (path) => {
    router.push(path);
};

onMounted(() => {
    // Pequeño delay para asegurar que el DOM esté listo y el layout estabilizado
    setTimeout(() => {
        ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.features-section',
                    start: 'top 90%', // Disparar antes
                    toggleActions: 'play none none none'
                }
            });

            // Usar fromTo para asegurar el estado final
            tl.fromTo(titleEl.value,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            )
            .fromTo(descriptionEl.value,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                '-=0.4'
            )
            .fromTo([card1.value, card2.value, card3.value],
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
                '-=0.2'
            )
            .fromTo(ctaSection.value,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                '-=0.4'
            );
        });

        ScrollTrigger.refresh();
    }, 100);
});

onUnmounted(() => {
    ctx.revert();
});
</script>

<style scoped lang="scss">
.features-section {
    padding: 120px 5%;
    background: transparent;
}

.features-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 80px;

    .section-title {
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        font-weight: 900;
        margin-bottom: 1.5rem;
        color: rgb(var(--v-theme-on-surface));
    }

    .section-description {
        font-size: 1.125rem;
        line-height: 1.8;
        color: rgb(var(--v-theme-on-surface));
        opacity: 0.7;
    }
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto 100px;
}

.feature-card {
    position: relative;
    background: rgb(var(--v-theme-surface));
    border-radius: 20px;
    padding: 2.5rem;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
    cursor: pointer;
    transition: all var(--transition-base);
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgb(var(--v-theme-primary));
        transform: scaleX(0);
        transition: transform var(--transition-base);
        transform-origin: left;
    }

    &:hover {
        transform: translateY(-12px);
        border-color: var(--primary-opacity-40);

        &::before {
            transform: scaleX(1);
        }

        .card-glow {
            opacity: 1;
        }

        .card-icon {
            transform: scale(1.1) rotate(5deg);
        }

        .explore-link {
            color: rgb(var(--v-theme-primary));
            transform: translateX(4px);
        }
    }

    .card-glow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
            circle at 50% 0%,
            var(--primary-opacity-15),
            transparent 60%
        );
        opacity: 0;
        transition: opacity var(--transition-base);
        pointer-events: none;
    }

    .card-icon {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--primary-opacity-10);
        border-radius: 16px;
        color: rgb(var(--v-theme-primary));
        margin-bottom: 1.5rem;
        transition: all var(--transition-base);
    }

    .card-content {
        margin-bottom: 2rem;

        .card-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: rgb(var(--v-theme-on-surface));
        }

        .card-description {
            font-size: 1rem;
            line-height: 1.6;
            color: rgb(var(--v-theme-on-surface));
            opacity: 0.7;
            margin-bottom: 1.5rem;
        }

        .card-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;

            .tag {
                padding: 0.375rem 0.75rem;
                background: var(--primary-opacity-15);
                border-radius: 6px;
                font-size: 0.75rem;
                font-family: var(--font-mono);
                color: rgb(var(--v-theme-primary));
                font-weight: 500;
            }
        }
    }

    .card-footer {
        padding-top: 1.5rem;
        border-top: 1px solid var(--primary-opacity-10);

        .explore-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
            color: rgb(var(--v-theme-on-surface));
            transition: all var(--transition-base);
        }
    }
}

.cta-section {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 4rem 2rem;
    background: rgb(var(--v-theme-surface));
    border-radius: 24px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(
            circle,
            var(--primary-opacity-10) 0%,
            transparent 70%
        );
        animation: pulse 8s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 0.5;
        }
        50% {
            transform: scale(1.1);
            opacity: 0.8;
        }
    }

    .cta-content {
        position: relative;
        z-index: 1;

        .cta-title {
            font-size: 2rem;
            font-weight: 900;
            margin-bottom: 1rem;
            color: rgb(var(--v-theme-primary));
        }

        .cta-description {
            font-size: 1.125rem;
            color: rgb(var(--v-theme-on-surface));
            opacity: 0.7;
            margin-bottom: 2rem;
        }

        .cta-button {
            background: rgb(var(--v-theme-primary)) !important;
            color: white !important;
            font-weight: 600;
            text-transform: none;
            padding: 0 3rem;
            transition: all var(--transition-base);

            &:hover {
                transform: translateY(-4px);
            }
        }
    }
}

@media (max-width: 768px) {
    .features-section {
        padding: 60px 5%;
    }

    .features-header {
        margin-bottom: 40px;
    }

    .features-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-bottom: 60px;
    }

    .cta-section {
        padding: 3rem 1.5rem;

        .cta-content .cta-title {
            font-size: 1.5rem;
        }
    }
}
</style>
