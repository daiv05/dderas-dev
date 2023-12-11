<template>
    <!-- Vista Mis Proyectos con cards con botones para rediriger al sitio de cada proyecto -->

    <section class="projects">
        <AnimateOnVisible name="slide-fade">
            <div class="title">
                <h2>Mis Proyectos</h2>
                <div class="wrapper">
                    <div class="text-wrapper">También puedes consultar el listado sin formato
                        <v-btn icon="mdi-open-in-new" size="large" variant="plain" density="compact"></v-btn>
                    </div>
                </div>
            </div>
        </AnimateOnVisible>

        <AnimateOnVisible v-for="proy in projects" name="slide-fade">
            <div class="projects-grid">
                <div id="item-0">
                    <div>
                        <div class="photo">
                            <a v-if="!(proy.link == '#')" :href="proy.link" target="_blank">
                                <img :src="proy.image" alt="photo" />
                            </a>
                            <a v-else>
                                <img :src="proy.image" alt="photo" />
                            </a>
                        </div>
                    </div>
                </div>
                <div id="item-1">
                    <div class="paragraph">
                        <h3>{{ proy.name }}</h3>
                        <v-divider></v-divider>
                        <div class="begin">{{ proy.category }}</div>
                        <p>{{ proy.description }}</p>
                        <div class="tags">
                            <v-chip v-for="tag in proy.tags" :key="tag" color="primary" text-color="white" small>
                                {{ tag }}
                            </v-chip>
                        </div>
                    </div>
                </div>
                <div id="item-2">
                    <div class="info">
                        <h3>Información</h3>
                        <v-divider></v-divider>
                        <div class="datas">
                            <div class="data"><strong>Fecha: </strong>{{ proy.date }}</div>
                        <div class="data"><strong>Cliente: </strong>{{ proy.client }}</div>
                        <div class="data"><strong>Categoría: </strong>{{ proy.category }}</div>
                        <div class="data"><strong>Tecnologías: </strong>{{ proy.technologies }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimateOnVisible>
        <!-- 
        <AnimateOnVisible name="slide-fade">
            <div class="projects-grid">
                <div id="item-0">
                    <div>
                        <div class="photo">
                            <a href="
                            https://davidderas.github.io/Proyecto-2-Portafolio/
                            " target="_blank">
                                <img src="../assets/project-wall.jpg" alt="photo" />
                            </a>
                        </div>
                    </div>
                </div>
                <div id="item-1">
                    <div class="paragraph">
                        <h3>Proyecto 2</h3>
                        <div class="begin">Portafolio</div>
                        <p>Portafolio de proyectos, con información sobre mi y mis proyectos.</p>
                    </div>
                </div>
                <div id="item-2">
                    <div>
                        <h3>Información</h3>
                        <div class="data"><strong>Fecha:</strong> 2021</div>
                        <div class="data"><strong>Cliente:</strong> Personal</div>
                        <div class="data"><strong>Categoría:</strong> Portafolio</div>
                        <div class="data"><strong>Tecnologías:</strong> HTML, CSS, JavaScript</div>
                    </div>
                </div>
            </div>
        </AnimateOnVisible>

        <AnimateOnVisible name="slide-fade">
            <div class="projects-grid">
                <div id="item-0">
                    <div>
                        <div class="photo">
                            <a href="
                            https://davidderas.github.io/Proyecto-3-Portafolio/
                            " target="_blank">
                                <img src="../assets/project-wall.jpg" alt="photo" />
                            </a>
                        </div>
                    </div>
                </div>
                <div id="item-1">
                    <div class="paragraph">
                        <h3>Proyecto 3</h3>
                        <div class="begin">Portafolio</div>
                        <p>Portafolio de proyectos, con información sobre mi y mis proyectos.</p>
                    </div>
                </div>
                <div id="item-2">
                    <div>
                        <h3>Información</h3>
                        <div class="data"><strong>Fecha:</strong> 2021</div>
                        <div class="data"><strong>Cliente:</strong> Personal</div>
                        <div class="data"><strong>Categoría:</strong> Portafolio</div>
                        <div class="data"><strong>Tecnologías:</strong> HTML, CSS, JavaScript</div>
                    </div>
                </div>
            </div>
        </AnimateOnVisible>

        <AnimateOnVisible name="slide-fade">
            <div class="projects-grid">
                <div id="item-0">
                    <div>
                        <div class="photo">
                            <a href="
                            https://davidderas.github.io/Proyecto-4-Portafolio/
                            " target="_blank">
                                <img src="../assets/project-wall.jpg" alt="photo" />
                            </a>
                        </div>
                    </div>
                </div>
                <div id="item-1">
                    <div class="paragraph">
                        <h3>Proyecto 4</h3>
                        <div class="begin">Portafolio</div>
                        <p>Portafolio de proyectos, con información sobre mi y mis proyectos.</p>
                    </div>
                </div>
                <div id="item-2">
                    <div>
                        <h3>Información</h3>
                        <div class="data"><strong>Fecha:</strong> 2021</div>
                        <div class="data"><strong>Cliente:</strong> Personal</div>
                        <div class="data"><strong>Categoría:</strong> Portafolio</div>
                        <div class="data"><strong>Tecnologías:</strong> HTML, CSS, JavaScript</div>
                    </div>
                </div>
            </div>
        </AnimateOnVisible> -->
    </section>
</template>

<script>

export default {
    name: 'Projects',
    data() {
        return {
            show: false,
            show_1: false,
            projects: [
                {
                    id: 1,
                    name: 'musycharts by dcdv',
                    description: 'Visualiza las canciones y géneros mas escuchados de tu Spotify. Utilizando la API de Spotify y amcharts.js para la visualización de datos.',
                    date: '2023',
                    client: 'Personal',
                    category: 'Portafolio',
                    tags: ['Vue.js', 'Vuetify'],
                    online: true,
                    repo: true,
                    technologies: 'Vue.js, Vuetify, Spotify API, amcharts.js',
                    image: '/img/projects/musylogo22.png',
                    link: 'https://musycharts-dcdv.vercel.app/'
                },
                {
                    id: 2,
                    name: 'Sistema de Gestión para la Tienda y Depósito "Carmencita"',
                    description: 'Plataforma de gestión comercial y administrativa para una tienda. Control de inventario, empleados, planilla, facturación y gestión de pedidos de domicilio',
                    date: '2023',
                    client: 'Tienda y Depósito "Carmencita"',
                    category: 'Privado',
                    tags: ['Vue.js', 'Laravel', 'MySQL', 'TailwindCSS'],
                    online: false,
                    repo: false,
                    technologies: 'Vue.js, TailwindCSS, Laravel',
                    image: '/img/projects/carmencita.jpg',
                    link: '#'
                },
                {
                    id: 3,
                    name: 'RatioInsights',
                    description: 'Sistema para el análisis financieros de una empresa. Calcula los ratios financieros y los compara con los de la industria. Registro de estados financieros desde Excel.',
                    date: '2023',
                    client: 'Personal',
                    category: 'Portafolio',
                    tags: ['Vue.js'],
                    online: false,
                    repo: true,
                    technologies: 'Vue.js, TailwindCSS, Laravel, MySQL, Excel',
                    image: '/img/projects/ues-wall.jpg',
                    link: 'https://github.com/daiv05/ratios-sis'
                },
                {
                    id: 4,
                    name: 'cherooms sv',
                    description: 'Plataforma para la busqueda de roomies en San Salvador.',
                    date: '2022',
                    client: 'Personal',
                    category: 'Portafolio',
                    tags: ['Vue.js', 'Django'],
                    online: false,
                    repo: true,
                    technologies: 'Vue.js, Django, PostgreSQL',
                    image: '/img/projects/ues-wall.jpg',
                    link: 'https://github.com/daiv05/cherooms-proy'
                }
            ]
        }
    }
}


</script>

<style scoped>
.projects {
    background-color: #ffffff;
    margin: 20px 10% 10% 10%;
}

.title {
    text-align: center;
    margin-bottom: 50px;
}

.title h2 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 10px;
}

.wrapper {
    display: flex;
    justify-content: center;
}

.text-wrapper {
    margin: 0 25% 0 25%;
    font-style: italic;
}

.text-wrapper &:after {
    content: "";
    width: 150px;
    display: block;
    margin: 20px auto;
    border-bottom: 1px solid #353535;
}

.projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 20px;
    margin-bottom: 50px;
}

.projects-grid #item-0 {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
}

.projects-grid #item-1 {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
}

.projects-grid #item-2 {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
}


.photo {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
}

.photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease-in-out;
}

.photo img:hover {
    transform: scale(1.1);
}

.paragraph {
    padding: 20px;
    border-radius: 10px;
    background-color: #353535;
    color: #ffffff;
}

.paragraph h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
}

.info h3 {
    margin-bottom: 10px;
}

.datas {
    margin-top: 10px;

}

.paragraph .begin {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
    margin-top: 10px;
}

.paragraph p {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 10px;
}

.projects-grid #item-2 {
    padding: 20px;
    border-radius: 10px;
    background-color: #353535;
    color: #ffffff;
}
</style>