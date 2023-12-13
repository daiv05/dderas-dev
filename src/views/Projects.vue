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
                        <v-carousel cycle width="300px" height="300px" :show-arrows="false">
                            <v-carousel-item @click="open_dialog(proy)" v-for="image in proy.images" :src="image"
                                position="50"></v-carousel-item>
                        </v-carousel>
                    </div>
                </div>
                <div id="item-1">
                    <div class="paragraph">
                        <h3>{{ proy.name }}</h3>
                        <v-divider></v-divider>
                        <div class="begin">{{ proy.category }}</div>
                        <p>{{ proy.description }}</p>
                        <div class="tags">
                            <v-chip v-for="tag in proy.tags" :key="tag" class="ma-1" color="primary" label small>
                                <v-icon start icon="mdi-label"></v-icon>
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
                        <v-divider style="margin: 8px 0 8px 0;"></v-divider>
                        <div class="tags">
                            <a v-if="proy.online" :href="proy.link" target="_blank">
                                <v-chip class="ma-2" color="green-accent-4" label small link>
                                    <v-icon start icon="mdi-web"></v-icon>
                                    Online
                                </v-chip>
                            </a>
                            <v-chip v-else class="ma-2" color="red-darken-2" label small>
                                <v-icon start icon="mdi-web-off"></v-icon>
                                Offline
                            </v-chip>

                            <a v-if="proy.repo" :href="proy.link_repo" target="_blank">
                                <v-chip class="ma-2" color="grey-lighten-3" label small link>
                                    <v-icon start icon="mdi-github"></v-icon>
                                    GitHub
                                </v-chip>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AnimateOnVisible>
    </section>
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition" z-index="999">
        <v-card>
            <v-toolbar color="white">
                <v-btn icon @click="close()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-carousel hide-delimiters cycle>
                <v-carousel-item v-for="image in selected_proy.images" :src="image" height="95%" position="50"></v-carousel-item>
            </v-carousel>
        </v-card>
    </v-dialog>
</template>

<script>

import project_list from '@/projects.js'

export default {
    name: 'Projects',
    data() {
        return {
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            projects: project_list,
            selected_proy: {}
        }
    },
    methods: {
        open_dialog(current_proy) {
            console.log('dwwqwq');
            this.selected_proy = current_proy;
            this.dialog = true;
        },
        close() {
            this.dialog = false;
        }
    }
}


</script>

<style scoped>
.projects {
    background-color: #ffffff;
    margin: 20px 5% 10% 5%;
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
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 20px;
    margin-bottom: 50px;
}

.projects-grid #item-0 {
    grid-column: 1 / 5;
    grid-row: 1 / 2;
}

.projects-grid #item-1 {
    grid-column: 5 / 8;
    grid-row: 1 / 2;
}

.projects-grid #item-2 {
    grid-column: 8 / 11;
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
    font-size: 15px;
}

.info .datas strong {
    font-size: 13px;
}

.datas {
    margin-top: 10px;
    font-size: 13px;
}

.paragraph .begin {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 10px;
    margin-top: 10px;
}

.paragraph p {
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 10px;
}

.projects-grid #item-2 {
    padding: 20px;
    border-radius: 10px;
    background-color: #353535;
    color: #ffffff;
}

@media (max-width: 960px) {
    .projects {
        margin: 10px 5% 5% 5%;
    }

    .projects-grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }

    .projects-grid #item-0 {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }

    .projects-grid #item-1 {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
    }

    .projects-grid #item-2 {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
    }

    .photo {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 10px;
        display: flex;
        align-items: center;
        border: 1px solid #353535;
    }

    .photo img {
        object-fit: cover;
        transition: all 0.3s ease-in-out;
        border: 1px solid #d70606;
        justify-content: center;
    }

}
</style>