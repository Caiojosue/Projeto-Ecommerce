import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import ContactView from '../views/ContactView.vue'

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
      component: ProductsView
    },
    {
      path: '/produtos/:category',
      name: 'category',
      component: ProductsView
    },
    {
      path: '/produtos/item/:id',
      name: 'ProductDetail',
      component: ProductDetailView
    },
    {
      path: '/contato',
      name: 'contact',
      component: ContactView

    }
  ]
})

export default router
