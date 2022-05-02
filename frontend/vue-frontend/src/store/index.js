import router from '@/router';
import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios').default;

Vue.use(Vuex)

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

const userInit = {
  userId: -1,
  token: ''
};

let userLocal = localStorage.getItem('user');
if(!userLocal){
  userLocal = userInit;
} else {
  userLocal = JSON.parse(userLocal);
}



export default new Vuex.Store({
  state: {
    error: '',
    status: '',
    user: userLocal,
  },
  getters: {
  },
  mutations: {
    clearError(state){
      state.error = '';
    },
    changeStatus(state, status){
      state.status = status;
    },
    userLogin(state, user){
      instance.defaults.headers.common['Authorization'] = user.token;
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user))
    },
  },
  actions: {
    SignupRequest(context , user){
      context.commit('changeStatus', 'loading');
      instance.post('/signup', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      })
    .then(res => {
      console.log("Inscription réussie", res);
      context.dispatch('LoginRequest', user);
      context.commit('changeStatus', 'created');
    })
    .catch(error => {
      console.log("Inscription ratée", error );
      context.commit('changeStatus', 'error_signup');
    });
    },
    LoginRequest(context, user){
      context.commit('clearError');
      context.commit('changeStatus', 'loading');
      instance.post('/login', {
        email: user.email,
        password: user.password
      })
      .then(res => {
        console.log("Connexion réussie");
        context.commit('changeStatus', 'logged');
        context.commit('userLogin', res.data);
        router.push('/');

      })
      .catch(error => {
        console.log('Inconnexion réussie', error);
        this.state.error = error.response.data.error;
        context.commit('changeStatus', 'error_login');
      })
    },
    deconnexion(context, user){
      context.commit('userLogin', user);
      context.commit('changeStatus', '');
      localStorage.removeItem('user');
      context.state.user = userInit;
    },
  },
 
  modules: {
  }
})
