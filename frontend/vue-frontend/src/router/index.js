import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import PostView from '../views/PostView.vue'
import CreateView from '../views/CreateView.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminView from '../views/AdminView.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

Vue.use(VueRouter)

 const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: ProfileView,
    props: true
  },
  {
    path: '/createpost',
    name: 'Create',
    component: CreateView
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: PostView
  },
  {
    path: '/users',
    name: 'Admin',
    component: AdminView,
    beforeEnter(to, from, next){
      to.name
      from.name
      const user = JSON.parse(localStorage.getItem('user'))
      if(user.userId !== 1){
        next('/')
      } else {
        next(true)
      }
    }
  },
  {
    path :'*',
    name: 'All',
    component: NotFound
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

router.beforeEach((to, from, next) => {
  const userStore = store.state.user;
  const user = JSON.parse(localStorage.getItem('user'));
  from.name
  if(to.name !== 'Login' && to.name !== 'Signup'){
    if(userStore.userId == -1){
      next('/login')
    } else if(user && userStore.userId == user.userId){
        next(true) 
    } else {
      next('/login')
    }
  } else if(user){
    next('/')
  } else {
    next(true)
  }
})

router.afterEach((to, from, failure) => {
  if(!failure) {
    console.log(failure)
  }
})





export default router
