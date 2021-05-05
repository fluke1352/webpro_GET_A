import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "@/plugins/axios";
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
    path: '/detail/:id',
    name: 'detail',
    meta: { login: true },
    component: () => import('../views/detail.vue') // set home as path '/'
  },
  {
    path: '/editaccount',
    name: 'editaccount',
    meta: { login: true },
    component: () => import('../views/editaccount.vue') // set home as path '/'
  },
  {
    path: '/editproduct',
    name: 'editproduct',
    meta: { admin : true },
    component: () => import('../views/editproduct.vue') // set home as path '/'
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
    path: '/orderhistory',
    name: 'orderhistory',
    component: () => import('../views/orderhistory.vue') // set home as path '/'
  },
  {
    path: '/showproduct/:category',
    name: 'showproduct',

    component: () => import('../views/showproduct.vue') // set home as path '/'
  },
  {
    path: '/usercart',
    name: 'usercart',
    meta: { login: true },
    component: () => import('../views/usercart.vue') // set home as path '/'
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

 router.beforeEach((to, from, next) => {
    axios.get("/user/me").then((res) => {
      const info = res.data;
      const isLoggedIn = !!localStorage.getItem('token')
      if (to.meta.login && !isLoggedIn) {
        alert('Please login first!')
        next({ path: '/' })
      }
      if (to.meta.admin && info.user_status != 'owner' && isLoggedIn) {
        alert("You don't have a permission")
        next({ path: '/'})
      }
      
    });
    next()
})
export default router