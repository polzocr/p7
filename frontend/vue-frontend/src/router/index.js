import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import PostView from '../views/PostView.vue'
import CreateView from '../views/CreateView.vue'

Vue.use(VueRouter)

 const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView
  },
  {
    path: '/createpost',
    name: 'CreateView',
    component: CreateView
  },
  {
    path: '/:id',
    name: 'PostView',
    component: PostView
  },
  
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
