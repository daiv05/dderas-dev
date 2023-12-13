<template>
    <section class="about">
        <AnimateOnVisible name="slide-fade">
            <div class="title">
                <h2>¿Que encontrarás aqui?</h2>
                <div class="wrapper">
                    <div class="text-wrapper">La idea de este sitio es compartir documentos, tutoriales y
                        guías que pueden ser de interés para cualquier estudiante.
                        Así mismo, publicar distintos proyectos en los que he trabajado y que
                        pueden ser de utilidad.</div>
                </div>
            </div>
        </AnimateOnVisible>
        <v-divider></v-divider>
        <AnimateOnVisible name="slide-fade">
            <v-row align="center" justify="center">
                <v-col cols="auto">
                    <v-card class="mx-8 my-8" max-width="344" min-width="344">
                        <v-img src="/img/dev/books-repo.jpg" height="200px" cover></v-img>
                        <v-card-title>
                            Repositorio UES
                        </v-card-title>
                        <v-card-subtitle>
                            Documentos, guías y pruebas.
                        </v-card-subtitle>
                        <v-card-actions>
                            <v-btn color="orange-lighten-2" variant="text" to="/documentos-y-guias">
                                Explorar
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn :icon="show_1 ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show_1 = !show_1"></v-btn>
                        </v-card-actions>
                        <v-expand-transition>
                            <div v-show="show_1">
                                <v-divider></v-divider>

                                <v-card-text>
                                    Recopilación de varios archivos, herramientas, guias y exámenes de la carrera de Ing de
                                    Sistemas Informáticos.
                                </v-card-text>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-col>
                <v-col cols="auto">
                    <v-card class="mx-8 my-8" max-width="344" min-width="344">
                        <v-img src="/img/dev/projects.jpg" height="200px" cover></v-img>
                        <v-card-title>
                            Proyectos y Utilidades
                        </v-card-title>
                        <v-card-subtitle>
                            Aplicaciones web y otras herramientas.
                        </v-card-subtitle>
                        <v-card-actions>
                            <v-btn color="orange-lighten-2" variant="text" to="/proyectos">
                                Explorar
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
                        </v-card-actions>
                        <v-expand-transition>
                            <div v-show="show">
                                <v-divider></v-divider>
                                <v-card-text>
                                    Aplicaciones (mayormente WebApps) creadas por mi persona.
                                </v-card-text>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>
        </AnimateOnVisible>
        <v-divider></v-divider>
        <!-- Contacto -->
        <div class="title">
            <div class="wrapper">
                <div class="text-wrapper-contact">
                    <a href="mailto:davidderas50@gmail.com">
                        <v-btn color="primary" dark>Contáctame</v-btn>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: 'Description',
    data() {
        return {
            show: false,
            show_1: false,
        }
    }
}
</script>

<style scoped>
.about {
    background-color: #ffffff;
}

.title {
    text-align: center;
    color: #353535;
    margin: 40px 0 40px 0;
}

.title h2 {
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: bold;
    color: #7f1a30;
    margin-bottom: 10px;
    padding: 0 10px 0 10px;
}

h3 {
    margin-bottom: 10px;
}

.text-wrapper {
    margin: 0 25% 0 25%;
    font-style: italic;
}

.text-wrapper-contact {
    margin: 0 25% 0 25%;
}

.text-wrapper &:after {
    content: "";
    width: 150px;
    display: block;
    margin: 20px auto;
    border-bottom: 1px solid #353535;
}

.photo a:focus {
    outline: none;
}

.photo img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: inline-block;
}

.paragraph {
    color: #353535;
}

.paragraph .begin {
    color: #3C6E71;
}

.data {
    margin-bottom: 5px;
}



/* PARA GRID */
.angry-grid {
    display: grid;

    grid-template-rows: 10% 10% 10% 10% 10% 10% 10% 10%;
    grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;

    gap: 0px;
    height: 100%;

}

#item-0 {

    /* background-color: #955799; */
    grid-row-start: 1;
    grid-column-start: 5;

    grid-row-end: 5;
    grid-column-end: 8;

    margin-top: 10px;
    margin-bottom: 100px;

}

#item-1 {

    /* background-color: #cbdbec; */
    grid-row-start: 5;
    grid-column-start: 2;

    grid-row-end: 8;
    grid-column-end: 6;

}

#item-2 {

    /* background-color: #cbd875; */
    grid-row-start: 5;
    grid-column-start: 7;

    grid-row-end: 8;
    grid-column-end: 10;

}

/* FIN PARA GRID */

/* PARA GRID MD */
@media (max-width: 768px) {
    .angry-grid {
        display: inline-block;
        height: 100%;
        margin-left: 15%;
        margin-right: 15%;
        margin-top: 10%;

    }

    .text-wrapper {
        margin: 0 10% 0 10%;
        font-style: italic;
    }

    #item-0 {

        /* background-color: #955799; */
        display: flex;
        justify-content: center;
        align-items: center;

        margin-top: 10px;

    }

    #item-1 {

        /* background-color: #cbdbec; */
        display: flex;
        justify-content: center;
        align-items: center;

    }

    #item-2 {

        /* background-color: #cbd875; */
        display: flex;
        margin-top: 10%;

    }
}
</style>