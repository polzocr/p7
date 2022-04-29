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
    postRequest(context , userInfo){
      context.commit;
      instance.post('/signup', {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password
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
