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
    postRequest(context , user){
      instance.post('/signup', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      })
    .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    }
  },
  modules: {
  }
})
