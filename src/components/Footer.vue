<template>
    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="brand-logo">
                        <span class="logo-bracket">&lt;</span>
                        <span class="logo-text">David Deras</span>
                        <span class="logo-bracket">/&gt;</span>
                    </div>
                    <p class="brand-tagline">
                        Fullstack Developer creando experiencias web excepcionales
                    </p>
                    <div class="social-links">
                        <a
                            href="https://github.com/daiv05"
                            target="_blank"
                            rel="noopener"
                            class="social-link"
                            aria-label="GitHub"
                        >
                            <v-icon icon="mdi-github" size="20"></v-icon>
                        </a>
                        <a
                            href="https://twitter.com/daiv_09"
                            target="_blank"
                            rel="noopener"
                            class="social-link"
                            aria-label="Twitter"
                        >
                            <v-icon icon="mdi-twitter" size="20"></v-icon>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener"
                            class="social-link"
                            aria-label="LinkedIn"
                        >
                            <v-icon icon="mdi-linkedin" size="20"></v-icon>
                        </a>
                        <a
                            href="mailto:davidderas50@gmail.com"
                            class="social-link"
                            aria-label="Email"
                        >
                            <v-icon icon="mdi-email" size="20"></v-icon>
                        </a>
                    </div>
                </div>

                <div class="footer-links">
                    <h3 class="links-title">Navegación</h3>
                    <ul class="links-list">
                        <li><router-link to="/inicio">Inicio</router-link></li>
                        <li><router-link to="/me">Sobre mí</router-link></li>
                        <li><router-link to="/proyectos">Proyectos</router-link></li>
                        <li><router-link to="/tutoriales">Blog</router-link></li>
                    </ul>
                </div>

                <div class="footer-links">
                    <h3 class="links-title">Recursos</h3>
                    <ul class="links-list">
                        <li><router-link to="/documentos-y-guias">UES Drive</router-link></li>
                        <li><router-link to="/herramientas">Herramientas</router-link></li>
                        <li><a href="/David_Deras_Frontend_Engineer.pdf" download>Descargar CV</a></li>
                    </ul>
                </div>

                <div class="footer-contact">
                    <h3 class="links-title">Contacto</h3>
                    <div class="contact-info">
                        <div class="contact-item">
                            <v-icon icon="mdi-email-outline" size="18" color="primary"></v-icon>
                            <a href="mailto:davidderas50@gmail.com">davidderas50@gmail.com</a>
                        </div>
                        <div class="contact-item">
                            <v-icon icon="mdi-map-marker-outline" size="18" color="primary"></v-icon>
                            <span>San Salvador, El Salvador</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="divider"></div>
                <div class="bottom-content">
                    <p class="copyright">
                        &copy; {{ currentYear }} David Deras. Todos los derechos reservados.
                    </p>
                    <p class="built-with">
                        Hecho con
                        <v-icon icon="mdi-heart" size="16" color="error"></v-icon>
                        usando <strong>Vue.js</strong> & <strong>Vuetify</strong>
                    </p>
                </div>
            </div>
        </div>

        <div class="footer-pattern"></div>
    </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped lang="scss">
.site-footer {
    position: relative;
    background: rgb(var(--v-theme-surface));
    border-top: 1px solid var(--primary-opacity-20);
    padding: 4rem 5% 2rem;
    margin-top: 6rem;
    overflow: hidden;
    color: rgb(var(--v-theme-on-surface));
}

.footer-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
        linear-gradient(var(--primary-opacity-02) 1px, transparent 1px),
        linear-gradient(90deg, var(--primary-opacity-02) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
    opacity: 0.5;
}

.footer-content {
    position: relative;
    z-index: 1;
    max-width: 1400px;
    margin: 0 auto;
}

.footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 3rem;
    margin-bottom: 3rem;
}

.footer-brand {
    .brand-logo {
        font-family: var(--font-mono);
        font-weight: 700;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;

        .logo-bracket {
            color: rgb(var(--v-theme-primary));
            font-size: 1.75rem;
        }

        .logo-text {
            letter-spacing: -0.02em;
        }
    }

    .brand-tagline {
        font-size: 0.9375rem;
        line-height: 1.6;
        opacity: 0.7;
        margin-bottom: 1.5rem;
        max-width: 320px;
    }

    .social-links {
        display: flex;
        gap: 1rem;

        .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background: var(--primary-opacity-10);
            color: rgb(var(--v-theme-on-surface));
            transition: all var(--transition-base);
            text-decoration: none;

            &:hover {
                background: var(--gradient-primary);
                color: white;
                transform: translateY(-4px);
                // box-shadow: 0 8px 16px var(--primary-opacity-40);
            }
        }
    }
}

.footer-links {
    .links-title {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 1.25rem;
        color: rgb(var(--v-theme-primary));
    }

    .links-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            margin-bottom: 0.75rem;

            a {
                color: rgb(var(--v-theme-on-surface));
                text-decoration: none;
                font-size: 0.9375rem;
                opacity: 0.7;
                transition: all var(--transition-base);
                display: inline-block;

                &:hover {
                    opacity: 1;
                    color: rgb(var(--v-theme-primary));
                    transform: translateX(4px);
                }
            }
        }
    }
}

.footer-contact {
    .links-title {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 1.25rem;
        color: rgb(var(--v-theme-primary));
    }

    .contact-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .contact-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.9375rem;

            a {
                color: rgb(var(--v-theme-on-surface));
                text-decoration: none;
                opacity: 0.7;
                transition: all var(--transition-base);

                &:hover {
                    opacity: 1;
                    color: rgb(var(--v-theme-primary));
                }
            }

            span {
                opacity: 0.7;
            }
        }
    }
}

.footer-bottom {
    .divider {
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent 0%,
            var(--primary-opacity-30) 50%,
            transparent 100%
        );
        margin-bottom: 2rem;
    }

    .bottom-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.875rem;
        opacity: 0.6;

        .copyright {
            margin: 0;
        }

        .built-with {
            display: flex;
            align-items: center;
            gap: 0.375rem;
            margin: 0;

            strong {
                color: rgb(var(--v-theme-primary));
                font-weight: 600;
            }
        }
    }
}

@media (max-width: 1024px) {
    .footer-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }

    .footer-brand {
        grid-column: 1 / -1;
    }
}

@media (max-width: 600px) {
    .site-footer {
        padding: 3rem 5% 1.5rem;
        margin-top: 4rem;
    }

    .footer-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
    }

    .footer-bottom .bottom-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
}
</style>
