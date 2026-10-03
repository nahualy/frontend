import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'chiringuitoLukas',
    themes: {
      chiringuitoLukas: {
        dark: false,
        colors: {
          primary: '#C97B4A',
          secondary: '#E8A86C',
          background: '#F2E3CF',
          surface: '#FFFFFF',
          'on-primary': '#FFFFFF',
          'on-background': '#3A2A20',
          'on-surface': '#3A2A20',
          success: '#8FAE7E',
          error: '#D9534F',
          warning: '#E8A86C',
          info: '#C97B4A',
        },
      },
    },
  },
})