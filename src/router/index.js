import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: () => import('../views/CatalogView.vue')
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: () => import('../views/admin/AdminLogin.vue')
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('../views/admin/AdminDashboard.vue'),
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem('sinar-pagi-admin') === 'true'
  if (to.meta.requiresAdmin && !isAdmin) {
    next('/admin')
  } else {
    next()
  }
})

export default router
