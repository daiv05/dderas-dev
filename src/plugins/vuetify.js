/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          // ═══════════════════════════════════════════════════════════════
          // PALETA ACTUAL: Naranja/Rojo Quemado (Energía y Creatividad)
          // ═══════════════════════════════════════════════════════════════
          // primary: '#E85D04',
          // secondary: '#DC2F02',
          // accent: '#F48C06',

          // ═══════════════════════════════════════════════════════════════
          // ALT
          // ═══════════════════════════════════════════════════════════════

          // Azul Oceánico (Confianza y Profesionalismo)
          // primary: '#0077B6',
          // secondary: '#023E8A',
          // accent: '#00B4D8',

          // Verde Esmeralda (Crecimiento y Innovación)
          // primary: '#06A77D',
          // secondary: '#048A6C',
          // accent: '#52B788',

          // Morado Profundo (Creatividad y Sofisticación)
          // primary: '#7209B7',
          // secondary: '#560BAD',
          // accent: '#B5179E',

          // Negro/Oro (Lujo y Elegancia)
          // primary: '#D4AF37',
          // secondary: '#C5A028',
          // accent: '#F1C40F',

          // Rojo Carmesí (Pasión y Determinación)
          // primary: '#D00000',
          // secondary: '#9D0208',
          // accent: '#E85D75',

          // Azul Eléctrico (Tecnología y Modernidad)
          // primary: '#3A86FF',
          // secondary: '#1E5EFF',
          // accent: '#8338EC',

          // Coral Vibrante (Energía Positiva)
          // primary: '#FF6B6B',
          // secondary: '#EE5A6F',
          // accent: '#FFB3BA',

          // Cian/Magenta (Futurista y Dinámico)
          // primary: '#06FFA5',
          // secondary: '#00D9FF',
          // accent: '#FF006E',

          // Terracota/Ocre (Cálido y Terroso)
          // primary: '#C1666B',
          // secondary: '#A44A3F',
          // accent: '#D4A373',

          // Índigo Tech (Profesional y Confiable)
          primary: '#4361EE',
          secondary: '#3F37C9',
          accent: '#7209B7',

          background: '#FAF9F6',
          surface: '#FFFFFF',
          'surface-variant': '#F5F1ED',
          'on-surface': '#1A1818',
          'on-background': '#1A1818',
          'on-primary': '#FFFFFF',
          error: '#D00000',
          info: '#0077B6',
          success: '#06A77D',
          warning: '#F48C06',
        },
      },
      dark: {
        colors: {
          // ═══════════════════════════════════════════════════════════════
          // PALETA ACTUAL: Naranja/Rojo Quemado
          // ═══════════════════════════════════════════════════════════════
          // primary: '#E85D04',
          // secondary: '#DC2F02',
          // accent: '#F48C06',

          // ═══════════════════════════════════════════════════════════════
          // ALT
          // ═══════════════════════════════════════════════════════════════

          // Azul Oceánico
          // primary: '#0077B6',
          // secondary: '#023E8A',
          // accent: '#00B4D8',

          // Verde Esmeralda
          // primary: '#06A77D',
          // secondary: '#048A6C',
          // accent: '#52B788',

          // Morado Profundo
          // primary: '#7209B7',
          // secondary: '#560BAD',
          // accent: '#B5179E',

          // Negro/Oro
          // primary: '#D4AF37',
          // secondary: '#C5A028',
          // accent: '#F1C40F',

          // Rojo Carmesí
          // primary: '#D00000',
          // secondary: '#9D0208',
          // accent: '#E85D75',

          // Azul Eléctrico
          // primary: '#3A86FF',
          // secondary: '#1E5EFF',
          // accent: '#8338EC',

          // Coral Vibrante
          // primary: '#FF6B6B',
          // secondary: '#EE5A6F',
          // accent: '#FFB3BA',

          // Cian/Magenta
          // primary: '#06FFA5',
          // secondary: '#00D9FF',
          // accent: '#FF006E',

          // Terracota/Ocre
          // primary: '#C1666B',
          // secondary: '#A44A3F',
          // accent: '#D4A373',

          // Índigo Tech
          primary: '#4361EE',
          secondary: '#3F37C9',
          accent: '#7209B7',

          background: '#0A0908',
          surface: '#161514',
          'surface-variant': '#1F1D1C',
          'on-surface': '#E8E6E3',
          'on-primary': '#0A0908',
          error: '#D00000',
          info: '#0096C7',
          success: '#06A77D',
          warning: '#F48C06',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});
