/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#0074ca', // Azul principal
          secondary: '#3077c2', // Azul para textos principales
          accent: '#0074ca', // Azul principal para CTAs
          error: '#F44336',
          warning: '#FF9800',
          info: '#2196F3',
          success: '#4CAF50',
          surface: '#FFFFFF',
          background: '#f0f1f2', // Gris claro para fondo
          'grey-light': '#777777', // Gris para textos secundarios
          'grey-lighter': '#f0f1f2' // Gris muy claro
        }
      }
    }
  },
})
