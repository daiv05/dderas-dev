<template>
    <!-- Vista Tutoriales y guias varias -->

    <section class="tutos">
        <AnimateOnVisible name="slide-fade">
            <div class="title">
                <h2>Tutoriales y guias</h2>
                <div class="wrapper">
                    <div class="text-wrapper">Tutoriales varios </div>
                </div>
            </div>
        </AnimateOnVisible>
    </section>

    <AnimateOnVisible name="slide-fade">
        <v-card class="mx-auto card-container">
            <v-container>
                <v-row dense>
                    <v-col cols="12" v-for="tuto in tutos">
                        <v-card :color="tuto.color" theme="dark">
                            <div class="d-flex flex-no-wrap justify-space-between overflow-auto">
                                <div>
                                    <v-card-title class="text-h5 text-break">
                                        {{ tuto.name }}
                                    </v-card-title>

                                    <v-card-subtitle>Autor: {{ tuto.author }}</v-card-subtitle>

                                    <v-card-text>{{ tuto.description }}</v-card-text>

                                    <v-card-actions>
                                        <a :href="tuto.link" target="_blank">
                                            <v-btn class="ms-2" color="blue-grey-darken-4" variant="tonal" size="small">
                                                VER
                                            </v-btn>
                                        </a>
                                    </v-card-actions>
                                </div>

                                <v-avatar class="ma-3 avatar" size="200" rounded="0.5">
                                    <v-img :src="tuto.image" cover></v-img>
                                </v-avatar>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </AnimateOnVisible>
</template>
<script>
import tutos_list from "@/tutos.js";
export default {
    name: 'Tutos',
    data() {
        return {
            tutos: tutos_list,
        }
    },
    methods: {
    }
}
</script>

<style scoped>
.tutos {
    background-color: #ffffff;
    margin: 20px 5% 30px 5%;
}

.title {
    text-align: center;
    margin-bottom: 10px;
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

.tutos-grid {
    margin: 0 10% 30px 10%;
}

.card-container {
    width: 80%;
    margin: 0 0 30px 0;
}

.avatar {
    width: 200px;
}

@media (max-width: 960px) {
    .card-container {
        width: 100%;
    }
}
</style>