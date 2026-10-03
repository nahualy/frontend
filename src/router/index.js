import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () => import('../views/publico/InicioView.vue'),
    },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/publico/CatalogoView.vue'),
    },
  ],
})

export default router