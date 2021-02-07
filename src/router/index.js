import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import History from '../views/History.vue'
import Detail from '../views/Detail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import Swal from 'sweetalert2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { auth: true }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
    meta: { auth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { auth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { auth: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to.matched[0].meta.auth)
  if (to.matched[0].meta.auth === true) {
    if (store.getters['auth/getKodeToken']) {
      next()
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'error',
        title: 'You are not logged in!'
      })
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
