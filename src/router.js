import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home.vue'

import { asistenciaRouter } from './components/asistencia'
import { classroomsRouter } from './components/classrooms'
import { authRouter } from './components/auth'

import auth from './service/auth'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    ...asistenciaRouter,
    ...classroomsRouter,
    ...authRouter
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

  router.beforeEach((to, from, next) => {
    const publicPages = ['login', 'join']
    if (publicPages.includes(to.name)) {
      next()
      return
    }
    if (auth.isLoggedIn()) {
      next()
      return
    }
    router.push({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  })  

  export default router