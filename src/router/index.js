import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/produtos',
      name: 'produtos',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/produtos/:category',
      name: 'category',
      component: () => import('../views/ProductsView.vue'),
      props: true
    },
    {
      path: '/produtos/item/:id',
      name: 'ProductDetail',
      component: () => import('../views/ProductDetailView.vue'),
      props: true
    },
    {
      path: '/contato',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      props: true
    }
  ]
})

export default router
