<template>
    <app-loader v-if="loader_screen"></app-loader>
    <v-container>
        <div class="title pixedai-header">
            <h2>Pixedai</h2>
            <div class="wrapper">
                <div class="text-wrapper">Crea increíbles pixel arts a partir de cualquier imagen.<p>Basado en Pixelit
                        by giventofly.</p>
                    <h6 class="text-sm" style="margin: 10px 0 0 0; color:brown ">EN CONSTRUCCIÓN...</h6>
                </div>
            </div>
        </div>
        <div class="pixedai-content">
            <v-row justify="center">
                <v-col md="8" sm="12" xs="12" lg="8">
                    <v-file-input density="compact" label="Cargar imagen" variant="solo" v-model="img_file"></v-file-input>
                </v-col>
                <v-col md="4" sm="12" xs="12" lg="4">
                    <v-btn class="mx-4 my-2 px-2" @click="pixel()">Pixedai!</v-btn>
                    <v-btn class="mx-1 my-2 px-2" id="btn-save" @click="save()">Guardar</v-btn>
                </v-col>
            </v-row>
            <div class="custom-pixelart">
                <div class="options-slide my-2">
                    <v-slider id="slider_1" thumb-label label="Bloque" class="mx-2" v-model="cstm.bloque_t"
                        :color="color_bar" track-color="grey" min="2" max="25" :step="1">
                        <template v-slot:prepend>
                            <v-btn size="small" icon="mdi-minus" variant="text" :color="color_bar"
                                @click="decrement"></v-btn>
                        </template>
                        <template v-slot:append>
                            <v-btn size="small" icon="mdi-plus" variant="text" :color="color_bar"
                                @click="increment"></v-btn>
                        </template>
                    </v-slider>
                </div>
                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <v-checkbox class="mx-2" label="Escala de grises" v-model="cstm.greyscale"></v-checkbox>
                    </v-col>
                    <v-col cols="auto">
                        <v-text-field class="mx-2" variant="filled" v-model="cstm.altura_max" label="Altura max. (px)"
                            type="number" hide-spin-buttons></v-text-field>
                    </v-col>
                    <v-col cols="auto">
                        <v-text-field class="mx-2" variant="filled" v-model="cstm.ancho_max" label="Ancho max. (px)"
                            type="number" hide-spin-buttons></v-text-field>
                    </v-col>
                </v-row>
                <div class="infoselects">
                    <v-checkbox label="Aplicar otra paleta de colores" v-model="paleta"></v-checkbox>
                    <div class="palette-selector">
                        <v-select label="Paleta" :items="paleta_rgb_colors" v-model="paleta_selected">
                            <template v-slot:selection="{ item, index }">
                                <div v-for="col in item.raw.rgb_color"
                                    :style="{ backgroundColor: 'rgb(' + col[0] + ', ' + col[1] + ', ' + col[2] + ')', width: '20px', height: '20px' }">
                                </div>
                            </template>
                            <template v-slot:item="{ props, item }">
                                <v-list-item v-bind="props" title="" subtitle="">
                                    <template v-slot:append>
                                        <div v-for="col in item.raw.rgb_color"
                                            :style="{ backgroundColor: 'rgb(' + col[0] + ', ' + col[1] + ', ' + col[2] + ')', width: '20px', height: '20px' }">
                                        </div>
                                    </template>
                                </v-list-item>
                            </template>
                        </v-select>
                    </div>
                </div>
            </div>
            <img id="img-pixedai" :src="img_src" alt="Para pixelar" />
            <div class="result_pixelart" style="overflow: auto;">
                <canvas id="pixelitcanvas"></canvas>
            </div>
        </div>
    </v-container>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted, onUnmounted } from 'vue';
import AppLoader from '@/components/AppLoader.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

defineOptions({
  name: 'Pixedai'
});

const url = globalThis.location.href.split('/')[0] + '//' + globalThis.location.href.split('/')[2];
let px = null;
let ctx;

const loader_screen = ref(false);
const cstm = reactive({
    bloque_t: 7,
    greyscale: false,
    altura_max: 0,
    ancho_max: 0
});
const img_src = ref(url + '/img-pixelart/pixel-default.png');
const paleta = ref(false);
const img_file = ref([]);
const paleta_selected = ref(null);
const initial_palette = ref(null);

const paleta_rgb_colors = [
    {
        name: '',
        rgb_color: [
            [7, 5, 5],
            [33, 25, 25],
            [82, 58, 42],
            [138, 107, 62],
            [193, 156, 77],
            [234, 219, 116],
            [160, 179, 53],
            [83, 124, 68],
            [66, 60, 86],
            [89, 111, 175],
            [107, 185, 182],
            [251, 250, 249],
            [184, 170, 176],
            [121, 112, 126],
            [148, 91, 40],
        ]
    },
    {
        name: '',
        rgb_color: [
            [13, 43, 69],
            [32, 60, 86],
            [84, 78, 104],
            [141, 105, 122],
            [208, 129, 89],
            [255, 170, 94],
            [255, 212, 163],
            [255, 236, 214],
        ]
    },
    {
        name: '',
        rgb_color: [
            [43, 15, 84],
            [171, 31, 101],
            [255, 79, 105],
            [255, 247, 248],
            [255, 129, 66],
            [255, 218, 69],
            [51, 104, 220],
            [73, 231, 236],
        ]
    },
    {
        name: '',
        rgb_color: [
            [48, 0, 48],
            [96, 40, 120],
            [248, 144, 32],
            [248, 240, 136],
        ]
    },
    {
        name: '',
        rgb_color: [
            [239, 26, 26],
            [172, 23, 23],
            [243, 216, 216],
            [177, 139, 139],
            [53, 52, 65],
            [27, 26, 29],
        ]
    },
    {
        name: '',
        rgb_color: [
            [26, 28, 44],
            [93, 39, 93],
            [177, 62, 83],
            [239, 125, 87],
            [255, 205, 117],
            [167, 240, 112],
            [56, 183, 100],
            [37, 113, 121],
            [41, 54, 111],
            [59, 93, 201],
            [65, 166, 246],
            [115, 239, 247],
            [244, 244, 244],
            [148, 176, 194],
            [86, 108, 134],
            [51, 60, 87],
        ]
    },
    {
        name: '',
        rgb_color: [
            [44, 33, 55],
            [118, 68, 98],
            [237, 180, 161],
            [169, 104, 104],
        ]
    },
    {
        name: '',
        rgb_color: [
            [171, 97, 135],
            [235, 198, 134],
            [216, 232, 230],
            [101, 219, 115],
            [112, 157, 207],
            [90, 104, 125],
            [33, 30, 51],
        ]
    },
    {
        name: '',
        rgb_color: [
            [140, 143, 174],
            [88, 69, 99],
            [62, 33, 55],
            [154, 99, 72],
            [215, 155, 125],
            [245, 237, 186],
            [192, 199, 65],
            [100, 125, 52],
            [228, 148, 58],
            [157, 48, 59],
            [210, 100, 113],
            [112, 55, 127],
            [126, 196, 193],
            [52, 133, 157],
            [23, 67, 75],
            [31, 14, 28],
        ]
    },
    {
        name: '',
        rgb_color: [
            [94, 96, 110],
            [34, 52, 209],
            [12, 126, 69],
            [68, 170, 204],
            [138, 54, 34],
            [235, 138, 96],
            [0, 0, 0],
            [92, 46, 120],
            [226, 61, 105],
            [170, 92, 61],
            [255, 217, 63],
            [181, 181, 181],
            [255, 255, 255],
        ]
    },
    {
        name: '',
        rgb_color: [
            [49, 31, 95],
            [22, 135, 167],
            [31, 213, 188],
            [237, 255, 177],
        ]
    },
    {
        name: '',
        rgb_color: [
            [21, 25, 26],
            [138, 76, 88],
            [217, 98, 117],
            [230, 184, 193],
            [69, 107, 115],
            [75, 151, 166],
            [165, 189, 194],
            [255, 245, 247],
        ]
    }
];

const color_bar = computed(() => {
    if (cstm.bloque_t < 6) return 'indigo'
    if (cstm.bloque_t < 12) return 'teal'
    if (cstm.bloque_t < 18) return 'green'
    if (cstm.bloque_t < 25) return 'orange'
    return 'red'
});

const pixel = async () => {
    px.setScale(cstm.bloque_t)
        .setPalette(paleta_selected.value ? paleta_selected.value.rgb_color : null)
        .draw()
        .pixelate();
    initial_palette.value = px.getPalette();
    if (cstm.greyscale) px.convertGrayscale();
    if (paleta.value) px.convertPalette();
    if (cstm.altura_max > 0) px.setMaxHeight(cstm.altura_max).resizeImage();
    if (cstm.ancho_max > 0) px.setMaxWidth(cstm.ancho_max).resizeImage();
};

const save = () => {
    px.saveImage();
};

const decrement = () => {
    cstm.bloque_t--;
};

const increment = () => {
    cstm.bloque_t++;
};

watch(paleta, (val) => {
    if (val) {
        loader_screen.value = true;
        setTimeout(() => {
            loader_screen.value = false;
            pixel();
        }, 1000);

    } else {
        px.setPalette(paleta_rgb_colors[8].rgb_color).draw().pixelate();
    }
});

watch(img_file, (val) => {
    if (val.length > 0) {
        const img = new Image();
        img.src = URL.createObjectURL(val[0]);
        px.setFromImgSource(img.src);
        loader_screen.value = true;
        setTimeout(() => {
            img_src.value = img.src;
            pixel();
            loader_screen.value = false;
        }, 500);
    }
});

watch(cstm, () => {
    if (paleta.value) {
        paleta.value = false;
    } else {
        pixel();
    }
}, { deep: true });

watch(paleta_selected, () => {
    if (paleta.value) {
        loader_screen.value = true;
        setTimeout(() => {
            loader_screen.value = false;
            pixel();
        }, 1000);
    }
});

onMounted(() => {
    setTimeout(() => {
        paleta_selected.value = paleta_rgb_colors[0];
        const config = {
            to: document.getElementById("pixelitcanvas"),
            from: document.getElementById("img-pixedai")
        }
        px = new pixelit(config);
        pixel()
    }, 800);

    ctx = gsap.context(() => {
        gsap.from('.pixedai-header', {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.pixedai-header',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.from('.pixedai-content', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            scrollTrigger: {
                trigger: '.pixedai-content',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
});

onUnmounted(() => {
    ctx.revert();
});
</script>

<style scoped>
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
    margin: 0 20% 0 20%;
    font-style: italic;
}

.text-wrapper &:after {
    content: "";
    width: 150px;
    display: block;
    margin: 20px auto;
    border-bottom: 1px solid #353535;
}

#img-pixedai {
    display: none;
}

.control-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: normal;
}

.custom-pixelart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.options-slide {
    display: flex;
    flex-direction: row;
    width: 80%;
    justify-content: center;
    align-items: center;
}

@media (max-width: 960px) {
    .options-slide {
        width: 100%;
    }
}

.palette-selector {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.result_pixelart {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
