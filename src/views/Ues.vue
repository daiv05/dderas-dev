<template>
    <section class="ues-section">
        <div class="ues-header">
            <div class="section-label">
                <v-icon icon="mdi-school-outline" size="20"></v-icon>
                <span>Recursos Académicos</span>
            </div>
            <h2 class="section-title">Repositorio UES</h2>
            <p class="section-subtitle">
                Ingeniería de Sistemas Informáticos - Pensum 1998
            </p>
            <p class="section-description">
                Una colección organizada de material de estudio, guías y recursos compartidos por la comunidad estudiantil.
                Selecciona una categoría para explorar.
            </p>
        </div>

        <div class="categories-grid">
            <div
                v-for="(category, index) in categories"
                :key="index"
                class="category-card"
                :class="`card-${index}`"
            >
                <div class="card-header">
                    <div class="icon-wrapper" :class="category.colorClass">
                        <v-icon :icon="category.icon" size="32"></v-icon>
                    </div>
                    <h3 class="category-title">{{ category.title }}</h3>
                </div>

                <p class="category-description">{{ category.description }}</p>

                <div class="featured-list">
                    <span class="list-label">Destacados:</span>
                    <ul>
                        <li v-for="(item, i) in category.featured" :key="i">
                            <a :href="item.link" target="_blank" class="featured-link">
                                <v-icon icon="mdi-file-document-outline" size="16" start></v-icon>
                                {{ item.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="card-actions">
                    <v-btn
                        :href="category.driveLink"
                        target="_blank"
                        variant="tonal"
                        block
                        class="action-btn"
                        :color="category.color"
                    >
                        Ver carpeta completa
                        <v-icon end icon="mdi-open-in-new"></v-icon>
                    </v-btn>
                </div>
            </div>
        </div>

        <div class="global-access">
            <v-card class="access-card" elevation="0">
                <div class="access-content">
                    <div class="access-text">
                        <h3>¿Buscas algo más específico?</h3>
                        <p>Accede a la raíz del repositorio en Google Drive para ver todo el contenido disponible.</p>
                    </div>
                    <v-btn
                        href="https://drive.google.com/drive/folders/1w7WfrEShtjBharxYq_qDqs4lXH1Ao00h?usp=drive_link"
                        target="_blank"
                        size="large"
                        color="primary"
                        prepend-icon="mdi-google-drive"
                    >
                        Ir al Drive Principal
                    </v-btn>
                </div>
            </v-card>
        </div>

        <v-divider class="my-12"></v-divider>

        <!-- Disclaimer / Contacto -->
        <div class="disclaimer-section">
            <div class="disclaimer-content">
                <v-icon icon="mdi-information-outline" color="primary" size="32" class="mb-4"></v-icon>
                <p class="disclaimer-text">
                    <strong>Nota Importante:</strong> Este repositorio es una recopilación colaborativa de recursos y no representa un sitio oficial de la Universidad de El Salvador.
                    El material es compartido con fines educativos.
                </p>
                <div class="contact-action">
                    <p>¿Tienes material para aportar o encontraste un enlace roto?</p>
                    <v-btn
                        href="mailto:davidderas50@gmail.com"
                        variant="text"
                        color="primary"
                        prepend-icon="mdi-email-outline"
                    >
                        Contáctame
                    </v-btn>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let ctx;

// DATOS EDITABLES
const categories = ref([
    {
        title: 'Modalidad Presencial',
        description: 'Material de apoyo, parciales pasados, guías de laboratorio y libros para asignaturas impartidas en el campus.',
        icon: 'mdi-account-group',
        color: 'primary',
        colorClass: 'text-primary',
        driveLink: 'LINK_A_CARPETA_PRESENCIAL', // TODO: Reemplazar con enlace real
        featured: [
            { name: 'Matemática I - Guías', link: '#' },
            { name: 'Programación I - Ejemplos', link: '#' },
            { name: 'Física I - Laboratorios', link: '#' }
        ]
    },
    {
        title: 'Modalidad a Distancia',
        description: 'Recursos digitales optimizados para el autoestudio, tutorías grabadas y material específico de la modalidad en línea.',
        icon: 'mdi-laptop-account',
        color: 'secondary',
        colorClass: 'text-secondary',
        driveLink: 'LINK_A_CARPETA_DISTANCIA', // TODO: Reemplazar con enlace real
        featured: [
            { name: 'Material Didáctico', link: '#' },
            { name: 'Guías de Estudio', link: '#' },
            { name: 'Tutorías', link: '#' }
        ]
    },
    {
        title: 'Extras y Utilidades',
        description: 'Herramientas de software, formatos administrativos, pensum detallado y otros recursos de utilidad general.',
        icon: 'mdi-folder-star-outline',
        color: 'info',
        colorClass: 'text-info',
        driveLink: 'LINK_A_CARPETA_EXTRAS', // TODO: Reemplazar con enlace real
        featured: [
            { name: 'Pensum 1998 PDF', link: '#' },
            { name: 'Formatos de Solicitud', link: '#' },
            { name: 'Software Recomendado', link: '#' }
        ]
    }
]);

onMounted(() => {
    ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Header Animation
        tl.from('.ues-header > *', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1
        });

        // Cards Animation
        gsap.set('.category-card', { y: 50, opacity: 0 });

        ScrollTrigger.batch('.category-card', {
            start: 'top 85%',
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out',
                overwrite: true
            }),
            once: true
        });

        // Global Access Animation
        gsap.from('.access-card', {
            scrollTrigger: {
                trigger: '.global-access',
                start: 'top 90%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2
        });
    });
});

onUnmounted(() => {
    ctx.revert();
});
</script>

<style scoped lang="scss">
.ues-section {
    padding: 120px 5% 60px;
    min-height: 100vh;
    background: rgb(var(--v-theme-background));
}

.ues-header {
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
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        font-weight: 900;
        margin-bottom: 0.5rem;
        color: rgb(var(--v-theme-on-surface));
    }

    .section-subtitle {
        font-size: 1.5rem;
        font-weight: 600;
        color: rgb(var(--v-theme-primary));
        margin-bottom: 1.5rem;
        opacity: 0.9;
    }

    .section-description {
        font-size: 1.125rem;
        line-height: 1.8;
        color: rgb(var(--v-theme-on-surface));
        opacity: 0.7;
    }
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto 80px;
}

.category-card {
    background: rgb(var(--v-theme-surface));
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;

    &:hover {
        transform: translateY(-8px);
        border-color: var(--primary-opacity-40);
        box-shadow: 0 12px 30px var(--primary-opacity-10);

        .icon-wrapper {
            transform: scale(1.1) rotate(5deg);
        }
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;

        .icon-wrapper {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--primary-opacity-10);
            transition: transform 0.3s ease;

            &.text-primary { color: rgb(var(--v-theme-primary)); background: rgba(var(--v-theme-primary), 0.1); }
            &.text-secondary { color: rgb(var(--v-theme-secondary)); background: rgba(var(--v-theme-secondary), 0.1); }
            &.text-info { color: rgb(var(--v-theme-info)); background: rgba(var(--v-theme-info), 0.1); }
        }

        .category-title {
            font-size: 1.25rem;
            font-weight: 700;
            line-height: 1.3;
        }
    }

    .category-description {
        font-size: 0.95rem;
        line-height: 1.6;
        opacity: 0.7;
        margin-bottom: 2rem;
        flex-grow: 1;
    }

    .featured-list {
        background: rgb(var(--v-theme-surface-variant));
        padding: 1rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;

        .list-label {
            display: block;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            opacity: 0.6;
            margin-bottom: 0.5rem;
            letter-spacing: 0.05em;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                margin-bottom: 0.5rem;
                &:last-child { margin-bottom: 0; }

                .featured-link {
                    display: flex;
                    align-items: center;
                    font-size: 0.9rem;
                    color: rgb(var(--v-theme-on-surface));
                    text-decoration: none;
                    opacity: 0.8;
                    transition: opacity 0.2s;

                    &:hover {
                        opacity: 1;
                        color: rgb(var(--v-theme-primary));
                    }
                }
            }
        }
    }
}

.global-access {
    max-width: 800px;
    margin: 0 auto;

    .access-card {
        background: linear-gradient(135deg, var(--primary-opacity-10) 0%, rgba(var(--v-theme-surface), 0.5) 100%);
        border: 1px solid var(--primary-opacity-20);
        border-radius: 20px;
        padding: 2rem;

        .access-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            flex-wrap: wrap;

            .access-text {
                flex: 1;
                min-width: 250px;

                h3 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                p {
                    opacity: 0.7;
                    font-size: 0.95rem;
                }
            }
        }
    }
}

.disclaimer-section {
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;

    .disclaimer-text {
        font-size: 0.9rem;
        opacity: 0.6;
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }

    .contact-action {
        p {
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            opacity: 0.8;
        }
    }
}

@media (max-width: 768px) {
    .ues-section {
        padding: 80px 5% 40px;
    }

    .ues-header {
        margin-bottom: 40px;
        .section-title { font-size: 2rem; }
        .section-subtitle { font-size: 1.2rem; }
    }

    .access-content {
        flex-direction: column;
        text-align: center;

        .v-btn {
            width: 100%;
        }
    }
}
</style>
