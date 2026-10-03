<template>
  <div class="filtro-categorias py-2">
    <v-chip-group
      v-model="seleccion"
      mandatory
      selected-class="bg-primary text-white font-weight-bold"
      @update:model-value="alSeleccionar"
    >
      <v-chip
        value="todas"
        filter
        variant="tonal"
      >
        Todas
      </v-chip>

      <v-chip
        v-for="cat in categoriasRaiz"
        :key="cat.id"
        :value="cat.id"
        filter
        variant="tonal"
      >
        {{ cat.nombre }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  categorias: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['categoria-seleccionada'])

const seleccion = ref('todas')

// Filtra solo las categorías raíz (categoria_padre_id === null)
const categoriasRaiz = computed(() => {
  return (props.categorias || [])
    .filter((cat) => !cat.categoria_padre_id)
    .sort((a, b) => a.id - b.id)
})

function alSeleccionar(val) {
  const categoriaId = val === 'todas' || val === null || val === undefined ? null : val
  emit('categoria-seleccionada', categoriaId)
}
</script>
