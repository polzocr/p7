import router from '@/router';
import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios').default;

Vue.use(Vuex)

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

export default new Vuex.Store({
  state: {
    error: '',
  },
  getters: {
  },
  mutations: {
    clearError(state){
      state.error = '';
    },
  },
  actions: {
    SignupRequest(context , user){
      
      instance.post('/signup', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      })
    .then(res => {
      console.log("Inscription réussie", res);
      context.dispatch('LoginRequest', user);
    })
    .catch(error => {
      console.log("Inscription ratée", error );
    });
    },
    LoginRequest(context, user){
      context.commit('clearError')
      instance.post('/login', {
        email: user.email,
        password: user.password
      })
      .then(res => {
        console.log("Connexion réussie", res);
        router.push('/')
      })
      .catch(error => {
        console.log('Inconnexion réussie', error);
        this.state.error = error.response.data.error;
        console.log(this.state.error)
      })
    }
  },
  modules: {
  }
})
