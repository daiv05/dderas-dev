<template>
    <section class="projects-section">
        <div class="projects-header">
            <div class="section-label" data-aos="fade-up">
                <v-icon icon="mdi-briefcase-variant" size="20"></v-icon>
                <span>Portfolio</span>
            </div>
            <h2 class="section-title" data-aos="fade-up" data-aos-delay="100">
                Proyectos Destacados
            </h2>
            <p class="section-description" data-aos="fade-up" data-aos-delay="200">
                Una selección de trabajos que demuestran mi experiencia en desarrollo fullstack,
                desde aplicaciones empresariales hasta proyectos de data visualization.
            </p>
        </div>

        <div class="projects-grid">
            <div
                v-for="(project, index) in projects"
                :key="project.id"
                class="project-card"
                :class="`card-${index % 3}`"
                data-aos="fade-up"
                :data-aos-delay="index * 100"
                @click="openProject(project)"
            >
                <div class="project-image-wrapper">
                    <div class="project-image">
                        <img :src="project.images[0]" :alt="project.name" />
                        <div class="image-overlay">
                            <v-btn
                                icon="mdi-arrow-expand"
                                size="large"
                                class="expand-btn"
                            ></v-btn>
                        </div>
                    </div>
                    <div class="project-category">{{ project.category }}</div>
                </div>

                <div class="project-content">
                    <div class="project-meta">
                        <span class="project-date">{{ project.date }}</span>
                        <div class="project-status">
                            <v-chip
                                v-if="project.online"
                                size="small"
                                color="success"
                                variant="flat"
                            >
                                <v-icon start icon="mdi-circle" size="8"></v-icon>
                                Online
                            </v-chip>
                        </div>
                    </div>

                    <h3 class="project-title">{{ project.name }}</h3>
                    <p class="project-description">{{ project.description }}</p>

                    <div class="project-tags">
                        <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="tag">
                            {{ tag }}
                        </span>
                        <span v-if="project.tags.length > 3" class="tag-more">
                            +{{ project.tags.length - 3 }}
                        </span>
                    </div>

                    <div class="project-actions">
                        <v-btn
                            variant="text"
                            class="view-details"
                            @click.stop="openProject(project)"
                        >
                            Ver detalles
                            <v-icon end icon="mdi-arrow-right"></v-icon>
                        </v-btn>

                        <div class="project-links">
                            <v-btn
                                v-if="project.online"
                                icon
                                size="small"
                                variant="text"
                                :href="project.link"
                                target="_blank"
                                @click.stop
                            >
                                <v-icon icon="mdi-open-in-new"></v-icon>
                            </v-btn>
                            <v-btn
                                v-if="project.repo"
                                icon
                                size="small"
                                variant="text"
                                :href="project.link_repo"
                                target="_blank"
                                @click.stop
                            >
                                <v-icon icon="mdi-github"></v-icon>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de detalles del proyecto -->
        <v-dialog
            v-model="dialog"
            max-width="1200"
            :scrim="true"
            transition="dialog-bottom-transition"
            class="project-dialog"
        >
            <v-card class="project-modal" v-if="selectedProject">
                <v-btn
                    icon="mdi-close"
                    class="close-btn"
                    @click="closeProject"
                    size="large"
                ></v-btn>

                <div class="modal-content">
                    <div class="modal-gallery">
                        <v-carousel
                            height="500"
                            hide-delimiters
                            show-arrows="hover"
                            cycle
                        >
                            <v-carousel-item
                                v-for="(image, i) in selectedProject.images"
                                :key="i"
                                :src="image"
                                cover
                            ></v-carousel-item>
                        </v-carousel>
                    </div>

                    <div class="modal-details">
                        <div class="modal-header">
                            <div class="project-category-badge">
                                {{ selectedProject.category }}
                            </div>
                            <h2 class="modal-title">{{ selectedProject.name }}</h2>
                            <p class="modal-client">{{ selectedProject.client }} · {{ selectedProject.date }}</p>
                        </div>

                        <div class="modal-description">
                            <p>{{ selectedProject.longDescription || selectedProject.description }}</p>
                        </div>

                        <div v-if="selectedProject.features" class="modal-section">
                            <h3 class="section-subtitle">
                                <v-icon icon="mdi-star-outline" size="20"></v-icon>
                                Características principales
                            </h3>
                            <ul class="features-list">
                                <li v-for="feature in selectedProject.features" :key="feature">
                                    <v-icon icon="mdi-check-circle" size="16" color="success"></v-icon>
                                    {{ feature }}
                                </li>
                            </ul>
                        </div>

                        <div v-if="selectedProject.challenges" class="modal-section">
                            <h3 class="section-subtitle">
                                <v-icon icon="mdi-lightbulb-outline" size="20"></v-icon>
                                Desafíos técnicos
                            </h3>
                            <ul class="challenges-list">
                                <li v-for="challenge in selectedProject.challenges" :key="challenge">
                                    {{ challenge }}
                                </li>
                            </ul>
                        </div>

                        <div v-if="selectedProject.impact" class="modal-section impact-section">
                            <h3 class="section-subtitle">
                                <v-icon icon="mdi-chart-line" size="20"></v-icon>
                                Impacto
                            </h3>
                            <p class="impact-text">{{ selectedProject.impact }}</p>
                        </div>

                        <div class="modal-section">
                            <h3 class="section-subtitle">
                                <v-icon icon="mdi-hammer-wrench" size="20"></v-icon>
                                Tecnologías
                            </h3>
                            <div class="tech-tags">
                                <v-chip
                                    v-for="tag in selectedProject.tags"
                                    :key="tag"
                                    class="tech-chip"
                                    variant="outlined"
                                >
                                    {{ tag }}
                                </v-chip>
                            </div>
                        </div>

                        <div class="modal-actions">
                            <v-btn
                                v-if="selectedProject.online"
                                size="large"
                                class="action-btn primary-action"
                                :href="selectedProject.link"
                                target="_blank"
                            >
                                <v-icon start icon="mdi-web"></v-icon>
                                Ver proyecto en vivo
                            </v-btn>
                            <v-btn
                                v-if="selectedProject.repo"
                                size="large"
                                variant="outlined"
                                class="action-btn"
                                :href="selectedProject.link_repo"
                                target="_blank"
                            >
                                <v-icon start icon="mdi-github"></v-icon>
                                Ver código fuente
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import project_list from '@/projects.js';

gsap.registerPlugin(ScrollTrigger);

const projects = ref(project_list);
const dialog = ref(false);
const selectedProject = ref(null);

const openProject = (project) => {
    selectedProject.value = project;
    dialog.value = true;
};

const closeProject = () => {
    dialog.value = false;
    setTimeout(() => {
        selectedProject.value = null;
    }, 300);
};

onMounted(() => {
    // Forzar estado visible inicial
    gsap.set(['.projects-header', '.project-card'], {
        opacity: 1,
        y: 0
    });

    // Animaciones con GSAP y ScrollTrigger
    gsap.from('.projects-header', {
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
    });
});
</script>

<style scoped lang="scss">
.projects-section {
    padding: 120px 5%;
    min-height: 100vh;
    background: rgb(var(--v-theme-background));
}

.projects-header {
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
        margin-bottom: 1.5rem;
        background: rgb(var(--v-theme-primary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .section-description {
        font-size: 1.125rem;
        line-height: 1.8;
        color: rgb(var(--v-theme-on-surface));
        opacity: 0.7;
    }
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.project-card {
    background: rgb(var(--v-theme-surface));
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-base);
    border: 1px solid var(--primary-opacity-20);
    box-shadow: 0 4px 20px var(--primary-opacity-10);

    &:hover {
        transform: translateY(-8px);
        border-color: var(--primary-opacity-40);
        // box-shadow: 0 20px 60px var(--primary-opacity-20);

        .project-image img {
            transform: scale(1.1);
        }

        .image-overlay {
            opacity: 1;
        }

        .view-details {
            color: rgb(var(--v-theme-primary));
        }
    }
}

.project-image-wrapper {
    position: relative;

    .project-image {
        position: relative;
        height: 300px;
        overflow: hidden;
        background: rgb(var(--v-theme-surface-variant));

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform var(--transition-slow);
        }

        .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-opacity-90);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity var(--transition-base);

            .expand-btn {
                background: white;
                color: rgb(var(--v-theme-primary));
            }
        }
    }

    .project-category {
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 0.5rem 1rem;
        background: rgb(var(--v-theme-surface));
        backdrop-filter: blur(10px);
        border-radius: 8px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: rgb(var(--v-theme-primary));
        border: 1px solid var(--primary-opacity-30);
    }
}

.project-content {
    padding: 2rem;

    .project-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        .project-date {
            font-family: var(--font-mono);
            font-size: 0.875rem;
            opacity: 0.6;
        }
    }

    .project-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: rgb(var(--v-theme-on-surface));
    }

    .project-description {
        font-size: 0.9375rem;
        line-height: 1.6;
        margin-bottom: 1.5rem;
        color: rgb(var(--v-theme-on-surface));
        opacity: 0.7;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;

        .tag {
            padding: 0.375rem 0.75rem;
            background: var(--primary-opacity-15);
            border-radius: 6px;
            font-size: 0.75rem;
            font-family: var(--font-mono);
            color: var(--color-accent);
            font-weight: 500;
        }

        .tag-more {
            padding: 0.375rem 0.75rem;
            background: var(--primary-opacity-10);
            border-radius: 6px;
            font-size: 0.75rem;
            font-family: var(--font-mono);
            opacity: 0.6;
        }
    }

    .project-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;
        border-top: 1px solid var(--primary-opacity-10);

        .view-details {
            color: rgb(var(--v-theme-on-surface));
            opacity: 0.7;
            font-weight: 600;
            text-transform: none;
            transition: all var(--transition-base);
        }

        .project-links {
            display: flex;
            gap: 0.5rem;
        }
    }
}

.project-modal {
    background: rgb(var(--v-theme-surface)) !important;
    border: 1px solid var(--primary-opacity-20);
    max-height: 90vh;
    overflow-y: auto;

    .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 10;
        background: rgb(var(--v-theme-surface-variant));
    }

    .modal-content {
        padding: 2rem;
    }

    .modal-gallery {
        margin-bottom: 2rem;
        border-radius: 12px;
        overflow: hidden;
    }

    .modal-details {
        .modal-header {
            margin-bottom: 2rem;

            .project-category-badge {
                display: inline-block;
                padding: 0.5rem 1rem;
                background: var(--primary-opacity-15);
                border-radius: 8px;
                font-size: 0.875rem;
                font-weight: 600;
                color: rgb(var(--v-theme-primary));
                margin-bottom: 1rem;
            }

            .modal-title {
                font-size: 2.5rem;
                font-weight: 900;
                margin-bottom: 0.5rem;
            }

            .modal-client {
                font-family: var(--font-mono);
                font-size: 1rem;
                opacity: 0.6;
            }
        }

        .modal-description {
            font-size: 1.125rem;
            line-height: 1.8;
            margin-bottom: 2.5rem;
            opacity: 0.8;
        }

        .modal-section {
            margin-bottom: 2rem;

            .section-subtitle {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-size: 1.25rem;
                font-weight: 700;
                margin-bottom: 1rem;
                color: rgb(var(--v-theme-primary));
            }

            .features-list,
            .challenges-list {
                list-style: none;
                padding: 0;

                li {
                    padding: 0.75rem 0;
                    padding-left: 2rem;
                    position: relative;
                    line-height: 1.6;
                    opacity: 0.8;

                    .v-icon {
                        position: absolute;
                        left: 0;
                        top: 0.75rem;
                    }
                }
            }

            &.impact-section {
                padding: 1.5rem;
                background: var(--primary-opacity-10);
                border-left: 4px solid var(--color-primary);
                border-radius: 8px;

                .impact-text {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: rgb(var(--v-theme-primary));
                    margin: 0;
                }
            }

            .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.75rem;

                .tech-chip {
                    border-color: var(--primary-opacity-30);
                    color: var(--color-accent);
                }
            }
        }

        .modal-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            margin-top: 2.5rem;
            padding-top: 2rem;
            border-top: 1px solid var(--primary-opacity-10);

            .action-btn {
                flex: 1;
                min-width: 200px;
                text-transform: none;
                font-weight: 600;

                &.primary-action {
                    background: rgb(var(--v-theme-primary)) !important;
                    color: white !important;
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .projects-section {
        padding: 60px 5%;
    }

    .projects-header {
        margin-bottom: 40px;
    }

    .projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .modal-content {
        padding: 1rem;
    }

    .modal-details .modal-header .modal-title {
        font-size: 1.75rem;
    }

    .modal-actions {
        flex-direction: column;

        .action-btn {
            width: 100%;
        }
    }
}
</style>
