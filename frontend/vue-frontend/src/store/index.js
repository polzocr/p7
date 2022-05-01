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
  },
  getters: {
  },
  mutations: {
   
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
      })
    }
  },
  modules: {
  }
})
