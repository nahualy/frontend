import { defineStore } from 'pinia'

export const useClienteGoogleStore = defineStore('clienteGoogle', {
  state: () => ({
    email: null,
    nombre: null,
    foto: null,
    disponible: false,
  }),
  actions: {
    establecerIdentidad({ email, nombre, foto }) {
      this.email = email || null
      this.nombre = nombre || null
      this.foto = foto || null
      this.disponible = true
    },
    limpiarIdentidad() {
      this.email = null
      this.nombre = null
      this.foto = null
      this.disponible = false
    },
  },
})
