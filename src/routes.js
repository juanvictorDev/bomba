import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from './App.vue'
import Home from './components/HomeComponent.vue'
import Login from './components/LoginComponent.vue'
import Register from './components/RegisterComponent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/' ,
    component: Home
  },

  { 
    path: '/login',
    component: Login
  },

  { 
    path: '/register',
    component: Register
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})

export default router