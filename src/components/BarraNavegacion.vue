<template>
  <v-app-bar color="primary" flat>
    <template #prepend>
      <v-icon icon="mdi-paw" class="ml-2 mr-2" />
    </template>

    <v-app-bar-title class="titulo-barra font-weight-bold flex-0-1-auto mr-4">
      El Chiringuito de Lukas
    </v-app-bar-title>

    <v-btn to="/" variant="text" class="text-capitalize font-weight-bold">
      Inicio
    </v-btn>
    <v-btn to="/productos" variant="text" class="text-capitalize font-weight-bold">
      Catálogo
    </v-btn>

    <v-spacer />
  </v-app-bar>
</template>

<script setup>
</script>

<style scoped>
.titulo-barra {
  font-family: 'Fraunces', Georgia, serif !important;
  font-weight: 700 !important;
  font-size: 1.35rem !important;
  letter-spacing: -0.02em;
}
</style>

