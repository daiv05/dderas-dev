<template>
    <section class="blog-section">
        <div class="blog-header">
            <div class="section-label" data-aos="fade-up">
                <v-icon icon="mdi-book-open-variant" size="20"></v-icon>
                <span>Blog & Tutoriales</span>
            </div>
            <h2 class="section-title" data-aos="fade-up" data-aos-delay="100">
                Conocimiento <span class="gradient-text">Compartido</span>
            </h2>
            <p class="section-description" data-aos="fade-up" data-aos-delay="200">
                Guías, tutoriales y recursos sobre desarrollo web, cloud computing y más.
            </p>
        </div>

        <div class="filter-section" data-aos="fade-up" data-aos-delay="300">
            <div class="filter-chips">
                <v-chip
                    :variant="selectedCategory === 'all' ? 'flat' : 'outlined'"
                    :color="selectedCategory === 'all' ? 'primary' : ''"
                    @click="filterByCategory('all')"
                    class="filter-chip"
                >
                    Todos
                </v-chip>
                <v-chip
                    v-for="category in categories"
                    :key="category"
                    :variant="selectedCategory === category ? 'flat' : 'outlined'"
                    :color="selectedCategory === category ? 'primary' : ''"
                    @click="filterByCategory(category)"
                    class="filter-chip"
                >
                    {{ category }}
                </v-chip>
            </div>

            <div class="search-box">
                <v-text-field
                    v-model="searchQuery"
                    prepend-inner-icon="mdi-magnify"
                    label="Buscar tutoriales..."
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    clearable
                    class="search-field"
                ></v-text-field>
            </div>
        </div>

        <div class="blog-grid">
            <div
                v-for="(tutorial, index) in filteredTutorials"
                :key="tutorial.id"
                class="blog-card"
                data-aos="fade-up"
                :data-aos-delay="index * 50"
                @click="openTutorial(tutorial)"
            >
                <div class="card-image">
                    <img :src="tutorial.image" :alt="tutorial.name" />
                    <div class="image-overlay">
                        <v-btn icon="mdi-arrow-right" size="large" class="read-btn"></v-btn>
                    </div>
                    <div class="category-badge">{{ tutorial.category }}</div>
                </div>

                <div class="card-content">
                    <div class="card-meta">
                        <span class="author">
                            <v-icon icon="mdi-account" size="16"></v-icon>
                            {{ tutorial.author }}
                        </span>
                        <span class="date">
                            <v-icon icon="mdi-calendar" size="16"></v-icon>
                            {{ tutorial.date }}
                        </span>
                    </div>

                    <h3 class="card-title">{{ tutorial.name }}</h3>
                    <p class="card-description">{{ tutorial.description }}</p>

                    <div class="card-tags">
                        <span v-for="tag in tutorial.tags.slice(0, 3)" :key="tag" class="tag">
                            {{ tag }}
                        </span>
                    </div>

                    <div class="card-footer">
                        <v-btn
                            variant="text"
                            class="read-more"
                            :href="tutorial.link"
                            target="_blank"
                            @click.stop
                        >
                            Leer más
                            <v-icon end icon="mdi-arrow-right"></v-icon>
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="filteredTutorials.length === 0" class="no-results">
            <v-icon icon="mdi-magnify" size="64" color="primary"></v-icon>
            <h3>No se encontraron tutoriales</h3>
            <p>Intenta con otros términos de búsqueda o categorías</p>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import tutos_list from '@/tutos.js';

const tutorials = ref(tutos_list);
const selectedCategory = ref('all');
const searchQuery = ref('');
let ctx;

const categories = computed(() => {
    const cats = new Set(tutorials.value.map(t => t.category));
    return Array.from(cats);
});

const filteredTutorials = computed(() => {
    let filtered = tutorials.value;

    if (selectedCategory.value !== 'all') {
        filtered = filtered.filter(t => t.category === selectedCategory.value);
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(t =>
            t.name.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query) ||
            t.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }

    return filtered;
});

const filterByCategory = (category) => {
    selectedCategory.value = category;
};

const openTutorial = (tutorial) => {
    window.open(tutorial.link, '_blank');
};

onMounted(() => {
    ctx = gsap.context(() => {
        gsap.from('.blog-header', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
});

onUnmounted(() => {
    ctx.revert();
});
</script>

<style scoped lang="scss">
.blog-section {
    padding: 120px 5%;
    min-height: 100vh;
}

.blog-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 60px;

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
    }

    .section-description {
        font-size: 1.125rem;
        line-height: 1.8;
        opacity: 0.7;
    }
}

.filter-section {
    max-width: 1400px;
    margin: 0 auto 60px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .filter-chips {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        justify-content: center;

        .filter-chip {
            font-weight: 600;
            text-transform: none;
            cursor: pointer;
            transition: all var(--transition-base);

            &:hover {
                transform: translateY(-2px);
            }
        }
    }

    .search-box {
        max-width: 500px;
        margin: 0 auto;
        width: 100%;

        .search-field {
            :deep(.v-field) {
                border-radius: 12px;
                background: rgba(22, 21, 20, 0.6);
                backdrop-filter: blur(10px);
            }
        }
    }
}

.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
}

.blog-card {
    background: rgba(22, 21, 20, 0.6);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-base);
    border: 1px solid var(--primary-opacity-10);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-8px);
        border-color: var(--primary-opacity-40);

        .card-image img {
            transform: scale(1.1);
        }

        .image-overlay {
            opacity: 1;
        }

        .read-more {
            color: rgb(var(--v-theme-primary));
        }
    }
}

.card-image {
    position: relative;
    height: 220px;
    overflow: hidden;
    background: rgba(10, 9, 8, 0.8);

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

        .read-btn {
            background: white;
            color: rgb(var(--v-theme-primary));
        }
    }

    .category-badge {
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 0.5rem 1rem;
        background: rgba(10, 9, 8, 0.9);
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

.card-content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;

    .card-meta {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        opacity: 0.6;

        span {
            display: flex;
            align-items: center;
            gap: 0.375rem;
            font-family: var(--font-mono);
        }
    }

    .card-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
        color: rgb(var(--v-theme-on-surface));
        line-height: 1.3;
    }

    .card-description {
        font-size: 0.9375rem;
        line-height: 1.6;
        margin-bottom: 1rem;
        opacity: 0.7;
        flex: 1;
    }

    .card-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;

        .tag {
            padding: 0.375rem 0.75rem;
            background: var(--primary-opacity-15);
            border-radius: 6px;
            font-size: 0.75rem;
            font-family: var(--font-mono);
            color: var(--color-accent);
            font-weight: 500;
        }
    }

    .card-footer {
        padding-top: 1rem;
        border-top: 1px solid var(--primary-opacity-10);

        .read-more {
            color: rgb(var(--v-theme-on-surface));
            opacity: 0.7;
            font-weight: 600;
            text-transform: none;
            transition: all var(--transition-base);
            padding: 0;
        }
    }
}

.no-results {
    text-align: center;
    padding: 4rem 2rem;
    opacity: 0.6;

    h3 {
        font-size: 1.5rem;
        margin: 1rem 0 0.5rem;
    }

    p {
        font-size: 1rem;
    }
}

@media (max-width: 768px) {
    .blog-section {
        padding: 60px 5%;
    }

    .blog-header {
        margin-bottom: 40px;
    }

    .filter-section {
        margin-bottom: 40px;

        .filter-chips {
            justify-content: flex-start;
        }
    }

    .blog-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
}
</style>
