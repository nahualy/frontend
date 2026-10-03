<template>
  <v-container class="py-8">
    <!-- Encabezado y Filtro de Categorías -->
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-2">Catálogo de Productos</h1>
        <p class="text-body-1 text-medium-emphasis mb-4">
          Descubre los mejores productos para tus michis y para ti.
        </p>
        <FiltroCategorias
          :categorias="categorias"
          @categoria-seleccionada="alCambiarCategoria"
        />
      </v-col>
    </v-row>

    <!-- Indicador de carga -->
    <div v-if="cargando" class="d-flex justify-center align-center py-16">
      <v-progress-circular indeterminate color="primary" size="64" width="4" />
    </div>

    <!-- Error de carga -->
    <v-alert
      v-else-if="error"
      type="error"
      variant="tonal"
      class="my-6"
    >
      {{ error }}
    </v-alert>

    <!-- Mensaje si no hay productos -->
    <v-alert
      v-else-if="productos.length === 0"
      type="info"
      variant="tonal"
      class="my-6"
    >
      No encontramos productos en esta categoría todavía
    </v-alert>

    <!-- Grid responsive de productos (cols="12" sm="6" md="4" lg="3") -->
    <v-row v-else class="mt-2">
      <v-col
        v-for="prod in productos"
        :key="prod.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <TarjetaProducto :producto="prod" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { obtenerCategorias } from '../../api/categorias'
import { obtenerProductos } from '../../api/productos'
import FiltroCategorias from '../../components/FiltroCategorias.vue'
import TarjetaProducto from '../../components/TarjetaProducto.vue'

const categorias = ref([])
const productos = ref([])
const cargando = ref(true)
const error = ref(null)
const categoriaIdSeleccionada = ref(null)

async function cargarProductos() {
  try {
    cargando.value = true
    error.value = null
    const filtros = {}
    if (categoriaIdSeleccionada.value) {
      filtros.categoria_id = categoriaIdSeleccionada.value
    }
    const resultado = await obtenerProductos(filtros)
    productos.value = resultado.productos
  } catch (err) {
    error.value = err.message || 'Error al cargar los productos'
  } finally {
    cargando.value = false
  }
}

async function alCambiarCategoria(categoriaId) {
  categoriaIdSeleccionada.value = categoriaId
  await cargarProductos()
}

onMounted(async () => {
  try {
    const [cats] = await Promise.all([
      obtenerCategorias().catch((err) => {
        console.error('Error cargando categorías:', err)
        return []
      }),
      cargarProductos(),
    ])
    categorias.value = cats
  } catch (err) {
    console.error('Error inicializando el catálogo:', err)
  }
})
</script>