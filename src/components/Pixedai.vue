<template>
  <app-loader v-if="loader_screen" />

  <section class="page-frame pixedai-shell">
    <header ref="headerEl" class="pixedai-header">
      <div>
        <p class="eyebrow">{{ t('tools.pixedai.eyebrow') }}</p>
        <h2 class="section-title">{{ t('tools.pixedai.title') }}</h2>
        <p class="section-lead">
          {{ t('tools.pixedai.lead') }}
        </p>
      </div>
      <div class="plain-sheet status-card">
        <span class="mono">{{ t('tools.pixedai.status.label') }}</span>
        <p class="text-muted">
          {{ t('tools.pixedai.status.body') }}
        </p>
        <div class="chipline">
          <span v-for="chip in statusChips" :key="chip">{{ chip }}</span>
        </div>
      </div>
    </header>

    <div ref="contentEl" class="pixedai-grid">
      <v-sheet
        :ref="registerPanel"
        class="pixedai-panel controls-panel"
        rounded="lg"
        border
        color="transparent"
      >
        <div class="panel-head">
          <div>
            <h3>{{ t('tools.pixedai.panels.inputs.title') }}</h3>
            <p class="text-muted">
              {{ t('tools.pixedai.panels.inputs.body') }}
            </p>
          </div>
          <v-btn variant="text" size="small" class="mono" @click="resetControls">
            {{ t('tools.pixedai.panels.inputs.reset') }}
          </v-btn>
        </div>

        <v-file-input
          v-model="img_file"
          :label="t('tools.pixedai.panels.inputs.uploadLabel')"
          accept="image/*"
          variant="outlined"
          prepend-inner-icon=""
          clearable
          density="comfortable"
          hide-details
        />

        <div class="slider-card plain-sheet">
          <div class="panel-head">
            <div>
              <span class="mono text-muted">{{ t('tools.pixedai.panels.inputs.blockLabel') }}</span>
              <p class="slider-value">{{ cstm.bloque_t }} px</p>
            </div>
            <span class="resolution-pill">{{ resolutionLabel }}</span>
          </div>
          <v-slider
            v-model="cstm.bloque_t"
            thumb-label
            :color="color_bar"
            track-color="var(--line-soft)"
            min="2"
            max="25"
            step="1"
            hide-details
          >
            <template #prepend>
              <v-btn size="small" variant="text" class="mini-step" @click="decrement">−</v-btn>
            </template>
            <template #append>
              <v-btn size="small" variant="text" class="mini-step" @click="increment">+</v-btn>
            </template>
          </v-slider>
        </div>

        <div class="preset-row">
          <span class="mono text-muted">{{ t('tools.pixedai.panels.inputs.presets') }}</span>
          <div class="chipline">
            <v-chip
              v-for="preset in quickPresets"
              :key="preset.label"
              variant="tonal"
              size="small"
              @click="applyPreset(preset)"
            >
              {{ preset.label }}
            </v-chip>
          </div>
        </div>

        <v-row class="control-grid" density="compact">
          <v-col cols="12" md="4">
            <v-checkbox
              v-model="cstm.greyscale"
              :label="t('tools.pixedai.panels.inputs.greyscale')"
              density="comfortable"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model.number="cstm.altura_max"
              :label="t('tools.pixedai.panels.inputs.maxHeight')"
              type="number"
              min="0"
              variant="outlined"
              density="comfortable"
              suffix="px"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model.number="cstm.ancho_max"
              :label="t('tools.pixedai.panels.inputs.maxWidth')"
              type="number"
              min="0"
              variant="outlined"
              density="comfortable"
              suffix="px"
              hide-details
            />
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <div class="palette-block">
          <div class="palette-head">
            <div>
              <h4>{{ t('tools.pixedai.panels.palette.title') }}</h4>
              <p class="text-muted">
                {{ t('tools.pixedai.panels.palette.body') }}
              </p>
            </div>
            <v-switch
              v-model="paleta"
              :label="t('tools.pixedai.panels.palette.switch')"
              inset
              density="compact"
              hide-details
            />
          </div>

          <v-select
            v-model="paleta_selected"
            :items="paleta_rgb_colors"
            item-title="name"
            :label="t('tools.pixedai.panels.palette.select')"
            variant="outlined"
            density="comfortable"
            :disabled="!paleta"
            return-object
            hide-details
          >
            <template #selection="{ item }">
              <div class="palette-selection">
                <span>{{ item.title }}</span>
                <div class="palette-sample">
                  <span
                    v-for="(col, idx) in item.raw.rgb_color"
                    :key="idx"
                    class="palette-dot"
                    :style="{ backgroundColor: `rgb(${col[0]}, ${col[1]}, ${col[2]})` }"
                  ></span>
                </div>
              </div>
            </template>
            <template #item="{ props, item }">
              <v-list-item v-bind="props">
                <template #append>
                  <div class="palette-sample">
                    <span
                      v-for="(col, idx) in item.raw.rgb_color"
                      :key="idx"
                      class="palette-dot"
                      :style="{ backgroundColor: `rgb(${col[0]}, ${col[1]}, ${col[2]})` }"
                    ></span>
                  </div>
                </template>
              </v-list-item>
            </template>
          </v-select>
        </div>
      </v-sheet>

      <v-sheet
        :ref="registerPanel"
        class="pixedai-panel preview-panel"
        rounded="lg"
        border
        color="transparent"
      >
        <div class="panel-head">
          <div>
            <h3>{{ t('tools.pixedai.panels.preview.title') }}</h3>
            <p class="text-muted">
              {{ t('tools.pixedai.panels.preview.body') }}
            </p>
          </div>
          <span class="resolution-pill">{{ resolutionLabel }}</span>
        </div>

        <div class="preview-stage plain-sheet">
          <canvas id="pixelitcanvas"></canvas>
        </div>
        <img id="img-pixedai" :src="img_src" :alt="t('tools.pixedai.imageAlt')" class="sr-only" />

        <div class="actions-row">
          <v-btn color="primary" rounded="pill" @click="pixel">
            {{ t('tools.pixedai.panels.preview.actions.process') }}
          </v-btn>
          <v-btn variant="outlined" rounded="pill" @click="save">
            {{ t('tools.pixedai.panels.preview.actions.download') }}
          </v-btn>
        </div>

        <ul class="tips-list">
          <li v-for="tip in previewTips" :key="tip">{{ tip }}</li>
        </ul>
      </v-sheet>
    </div>
  </section>
</template>

<script setup>
import {
  ref,
  reactive,
  watch,
  computed,
  onMounted,
  onUnmounted,
  onBeforeUpdate,
  nextTick,
} from 'vue';
import { useI18n } from 'vue-i18n';

import AppLoader from '@/components/AppLoader.vue';
import { gsap, getMainScroller, gsapDefaults } from '@/plugins/gsap';

defineOptions({
  name: 'Pixedai',
});

const headerEl = ref(null);
const contentEl = ref(null);
let panelRefs = [];
const { t, tm, locale } = useI18n();
const statusChips = computed(() => {
  locale.value;
  return tm('tools.pixedai.status.chips') ?? [];
});
const previewTips = computed(() => {
  locale.value;
  return tm('tools.pixedai.panels.preview.tips') ?? [];
});

const registerPanel = (el) => {
  if (!el) return;
  const target = el.$el ?? el;
  if (!panelRefs.includes(target)) {
    panelRefs.push(target);
  }
};

onBeforeUpdate(() => {
  panelRefs = [];
});

const createDefaults = () => ({
  bloque_t: 7,
  greyscale: false,
  altura_max: 0,
  ancho_max: 0,
});

const loader_screen = ref(false);
const cstm = reactive(createDefaults());
const img_file = ref([]);
const paleta = ref(false);

const url = `${globalThis.location.protocol}//${globalThis.location.host}`;
const img_src = ref(`${url}/img-pixelart/pixel-default.png`);

const paleta_rgb_colors = [
  {
    name: 'Tierra tostada',
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
    ],
  },
  {
    name: 'Atardecer suave',
    rgb_color: [
      [13, 43, 69],
      [32, 60, 86],
      [84, 78, 104],
      [141, 105, 122],
      [208, 129, 89],
      [255, 170, 94],
      [255, 212, 163],
      [255, 236, 214],
    ],
  },
  {
    name: 'Neón coral',
    rgb_color: [
      [43, 15, 84],
      [171, 31, 101],
      [255, 79, 105],
      [255, 247, 248],
      [255, 129, 66],
      [255, 218, 69],
      [51, 104, 220],
      [73, 231, 236],
    ],
  },
  {
    name: 'Retro púrpura',
    rgb_color: [
      [48, 0, 48],
      [96, 40, 120],
      [248, 144, 32],
      [248, 240, 136],
    ],
  },
  {
    name: 'Rojo urbano',
    rgb_color: [
      [239, 26, 26],
      [172, 23, 23],
      [243, 216, 216],
      [177, 139, 139],
      [53, 52, 65],
      [27, 26, 29],
    ],
  },
  {
    name: 'Arcade',
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
    ],
  },
  {
    name: 'Rosa humo',
    rgb_color: [
      [44, 33, 55],
      [118, 68, 98],
      [237, 180, 161],
      [169, 104, 104],
    ],
  },
  {
    name: 'Bosque pastel',
    rgb_color: [
      [171, 97, 135],
      [235, 198, 134],
      [216, 232, 230],
      [101, 219, 115],
      [112, 157, 207],
      [90, 104, 125],
      [33, 30, 51],
    ],
  },
  {
    name: 'Sensorial',
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
    ],
  },
  {
    name: 'Synthwave',
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
    ],
  },
  {
    name: 'Galaxia',
    rgb_color: [
      [49, 31, 95],
      [22, 135, 167],
      [31, 213, 188],
      [237, 255, 177],
    ],
  },
  {
    name: 'Marisma',
    rgb_color: [
      [21, 25, 26],
      [138, 76, 88],
      [217, 98, 117],
      [230, 184, 193],
      [69, 107, 115],
      [75, 151, 166],
      [165, 189, 194],
      [255, 245, 247],
    ],
  },
];

const defaultPaletteIndex = 8;
const paleta_selected = ref(paleta_rgb_colors[defaultPaletteIndex]);

const presetDefinitions = [
  { key: 'sticker', block: 4, width: 128, height: 128 },
  { key: 'icon', block: 7, width: 256, height: 256 },
  { key: 'poster', block: 12, width: 420, height: 420 },
  { key: 'banner', block: 18, width: 640, height: 360 },
];

const quickPresets = computed(() => {
  locale.value;
  return presetDefinitions.map((preset) => ({
    ...preset,
    label: t(`tools.pixedai.presets.${preset.key}`),
  }));
});

const color_bar = computed(() => {
  if (cstm.bloque_t < 6) return 'indigo';
  if (cstm.bloque_t < 12) return 'teal';
  if (cstm.bloque_t < 18) return 'green';
  if (cstm.bloque_t < 25) return 'orange';
  return 'red';
});

const resolutionLabel = computed(() => {
  locale.value;
  const block = String(cstm.bloque_t).padStart(2, '0');
  const width = cstm.ancho_max > 0 ? `${cstm.ancho_max}px` : 'auto';
  const height = cstm.altura_max > 0 ? `${cstm.altura_max}px` : 'auto';
  return t('tools.pixedai.resolution', { block, width, height });
});

let px = null;
let ctx;

const pixel = () => {
  if (!px) return;

  const palette =
    paleta.value && paleta_selected.value
      ? paleta_selected.value.rgb_color
      : paleta_rgb_colors[defaultPaletteIndex].rgb_color;

  px.setScale(cstm.bloque_t).setPalette(palette).draw().pixelate();

  if (cstm.greyscale) px.convertGrayscale();
  if (paleta.value) px.convertPalette();
  if (cstm.altura_max > 0) px.setMaxHeight(cstm.altura_max).resizeImage();
  if (cstm.ancho_max > 0) px.setMaxWidth(cstm.ancho_max).resizeImage();
};

const save = () => {
  if (!px) return;
  px.saveImage();
};

const decrement = () => {
  cstm.bloque_t = Math.max(2, cstm.bloque_t - 1);
};

const increment = () => {
  cstm.bloque_t = Math.min(25, cstm.bloque_t + 1);
};

const applyPreset = (preset) => {
  cstm.bloque_t = preset.block;
  cstm.altura_max = preset.height ?? 0;
  cstm.ancho_max = preset.width ?? 0;
};

const resetControls = () => {
  Object.assign(cstm, createDefaults());
  paleta.value = false;
  paleta_selected.value = paleta_rgb_colors[defaultPaletteIndex];
  img_file.value = [];
  img_src.value = `${url}/img-pixelart/pixel-default.png`;
  if (px) {
    px.setFromImgSource(img_src.value);
    pixel();
  }
};

watch(paleta, () => {
  if (!px) return;
  loader_screen.value = true;
  setTimeout(() => {
    loader_screen.value = false;
    pixel();
  }, 500);
});

watch(img_file, (val) => {
  if (!val || val.length === 0) return;
  const file = val[0];
  const objectURL = URL.createObjectURL(file);
  loader_screen.value = true;
  setTimeout(() => {
    img_src.value = objectURL;
    if (px) {
      px.setFromImgSource(objectURL);
      pixel();
    }
    loader_screen.value = false;
    URL.revokeObjectURL(objectURL);
  }, 400);
});

watch(
  cstm,
  () => {
    pixel();
  },
  { deep: true }
);

watch(paleta_selected, () => {
  if (!px || !paleta.value) return;
  loader_screen.value = true;
  setTimeout(() => {
    loader_screen.value = false;
    pixel();
  }, 400);
});

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    const config = {
      to: document.getElementById('pixelitcanvas'),
      from: document.getElementById('img-pixedai'),
    };
    px = new globalThis.pixelit(config);
    pixel();
  }, 800);

  const scroller = getMainScroller();

  ctx = gsap.context(() => {
    if (headerEl.value) {
      gsap.from(headerEl.value, {
        ...gsapDefaults,
        opacity: 0,
        y: 32,
        duration: 0.9,
        scrollTrigger: {
          trigger: headerEl.value,
          start: 'top 80%',
          once: true,
          scroller: scroller,
        },
      });
    }

    if (panelRefs.length) {
      gsap.from(panelRefs, {
        ...gsapDefaults,
        opacity: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.15,
        scrollTrigger: {
          trigger: contentEl.value,
          start: 'top 80%',
          once: true,
          scroller: scroller,
        },
      });
    }
  });
});

onUnmounted(() => {
  ctx?.revert();
  panelRefs = [];
});
</script>

<style scoped>
.pixedai-shell {
  display: flex;
  flex-direction: column;
  gap: var(--section-gap);
}

.pixedai-header {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  align-items: flex-start;
}

.status-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-card .chipline {
  flex-wrap: wrap;
}

.pixedai-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.pixedai-panel {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background-color: rgba(var(--v-theme-surface), 0.85);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.slider-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.slider-value {
  font-size: 1.5rem;
  font-weight: 600;
}

.mini-step {
  min-width: 32px;
}

.preset-row {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.control-grid {
  margin-top: 0.25rem;
}

.palette-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.palette-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.palette-selection {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.palette-sample {
  display: flex;
  gap: 0.25rem;
}

.palette-dot {
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px solid var(--line-soft);
}

.preview-stage {
  width: 100%;
  aspect-ratio: 4 / 3;
  border: 1px dashed var(--line-soft);
  border-radius: var(--radius-md);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--surface-faint);
  padding: 1rem;
}

.preview-stage canvas {
  width: 100%;
  height: 100%;
}

.actions-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tips-list {
  margin: 0;
  padding-left: 1rem;
  list-style: disc;
  color: var(--text-subtle);
  font-size: 0.9rem;
}

.resolution-pill {
  font-size: 0.85rem;
  color: var(--text-subtle);
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  padding: 0.2rem 0.75rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 640px) {
  .panel-head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
