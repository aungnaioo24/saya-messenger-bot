import { createRouter, createWebHistory } from 'vue-router'
import DashboardViewVue from '../views/DashboardView.vue'
import BotFlowView from '../views/BotFlowView.vue'
import UsersView from '../views/UsersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardViewVue
    },
    {
      path: '/bot',
      name: 'bot',
      component: BotFlowView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    }
  ]
})

export default router
