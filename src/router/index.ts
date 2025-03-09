import { createRouter, createWebHistory } from 'vue-router'
import AccountManager from '../components/AccountManager.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AccountManager,
    },
  ],
})

export default router
