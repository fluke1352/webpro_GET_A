import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue') // set home as path '/'
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue') // set home as path '/'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue') // set home as path '/'
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue') // set home as path '/'
  },
  {
    path: '/editaccount',
    name: 'editaccount',
    component: () => import('../views/editaccount.vue') // set home as path '/'
  },
  {
    path: '/inflowhistory',
    name: 'inflowhistory',
    component: () => import('../views/inflowhistory.vue') // set home as path '/'
  },
  {
    path: '/addproduct',
    name: 'addproduct',
    component: () => import('../views/addproduct.vue') // set home as path '/'
  },
  {
    path: '/allproduct',
    name: 'allproduct',
    component: () => import('../views/allproduct.vue') // set home as path '/'
  },
  {
    path: '/showproduct/:category',
    name: 'showproduct',
    component: () => import('../views/showproduct.vue') // set home as path '/'
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router