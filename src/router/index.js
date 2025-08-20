import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/analysis',
    name: 'analysis',
    component: () => import('@/views/analysis.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/mine/index.vue')
  },
  {
    path: '/service',
    name: 'service',
    component: () => import('@/views/service/index.vue')
  },
  {
    path: '/service/weibaoyy',
    name: 'weibaoyy',
    component: () => import('@/views/service/weibaoyy.vue')
  },
  {
    path: '/service/weibaols',
    name: 'weibaols',
    component: () => import('@/views/service/weibaols.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
