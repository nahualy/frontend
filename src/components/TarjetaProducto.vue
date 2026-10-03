<template>
  <v-card
    class="tarjeta-producto h-100 d-flex flex-column"
    hover
    elevation="2"
    @click="alHacerClick"
  >
    <v-img
      :src="fotoUrl"
      height="200"
      cover
      class="bg-grey-lighten-4"
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular indeterminate color="primary" />
        </div>
      </template>
    </v-img>

    <v-card-item class="pb-1">
      <div class="d-flex justify-space-between align-start ga-2 mb-1">
        <v-card-title class="text-subtitle-1 font-weight-bold text-truncate" :title="producto.nombre">
          {{ producto.nombre }}
        </v-card-title>
        <v-chip
          :color="estaDisponible ? 'success' : 'error'"
          size="x-small"
          class="font-weight-medium flex-shrink-0 mt-1"
          variant="flat"
        >
          {{ estaDisponible ? 'Disponible' : 'Agotado' }}
        </v-chip>
      </div>

      <div class="text-h6 font-weight-bold text-primary">
        {{ precioFormateado }}
      </div>
    </v-card-item>

    <v-card-text class="pt-0 pb-3 flex-grow-1">
      <p v-if="tieneVariantesActivas" class="text-caption text-medium-emphasis mb-0">
        Disponible en varias opciones
      </p>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  producto: {
    type: Object,
    required: true,
  },
})

// Determina si el producto tiene variantes activas
const tieneVariantesActivas = computed(() => {
  return (
    Array.isArray(props.producto.variantes) &&
    props.producto.variantes.length > 0 &&
    props.producto.variantes.some((v) => v.activo !== false)
  )
})

// Disponibilidad: si tiene variantes, al menos una activa debe tener stock > 0;
// si no tiene variantes, valida stock simple > 0.
const estaDisponible = computed(() => {
  if (Array.isArray(props.producto.variantes) && props.producto.variantes.length > 0) {
    return props.producto.variantes.some(
      (v) => v.activo !== false && Number(v.stock) > 0
    )
  }
  return Number(props.producto.stock) > 0
})

// Formato de moneda ($XX.XX)
const precioFormateado = computed(() => {
  const precio = Number(props.producto.precio)
  if (isNaN(precio)) return '$0.00'
  return `$${precio.toFixed(2)}`
})

// Imagen o placeholder por defecto
const fotoUrl = computed(() => {
  if (props.producto.foto) {
    return props.producto.foto
  }
  return 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22400%22%20height%3D%22300%22%20viewBox%3D%220%200%20400%20300%22%3E%3Crect%20fill%3D%22%23F2E3CF%22%20width%3D%22400%22%20height%3D%22300%22%2F%3E%3Ctext%20fill%3D%22%23C97B4A%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3ESin%20imagen%3C%2Ftext%3E%3C%2Fsvg%3E'
})

function alHacerClick() {
  console.log('ID del producto:', props.producto.id)
}
</script>

<style scoped>
.tarjeta-producto {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tarjeta-producto:hover {
  transform: translateY(-4px);
}
</style>
