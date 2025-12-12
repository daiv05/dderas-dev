// Styles
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          primary: '#4361EE',
          secondary: '#3F37C9',
          accent: '#7209B7',

          background: '#F8F9FC',
          surface: '#FFFFFF',
          'surface-variant': '#F1F3F5',
          'on-surface': '#111827',
          'on-background': '#111827',
          'on-primary': '#FFFFFF',
          error: '#EF4444',
          info: '#3B82F6',
          success: '#10B981',
          warning: '#F59E0B',
        },
      },
      dark: {
        colors: {
          primary: '#5B7BF7',
          secondary: '#4C6EF5',
          accent: '#9775FA',

          background: '#0B0E14',
          surface: '#151920',
          'surface-variant': '#1E2329',
          'on-surface': '#E2E8F0',
          'on-background': '#E2E8F0',
          'on-primary': '#FFFFFF',
          error: '#F87171',
          info: '#60A5FA',
          success: '#34D399',
          warning: '#FBBF24',
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
