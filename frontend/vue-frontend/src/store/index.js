import router from '@/router';
import Vue from 'vue'
import Vuex from 'vuex'
const axios = require('axios').default;

Vue.use(Vuex)

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

 const instancePut = axios.create({
   baseURL: 'http://localhost:3000/',
   headers: { "Content-Type": "multipart/form-data" }
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
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + userLocal.token;
}



export default new Vuex.Store({
  state: {
    error: '',
    status: '',
    user: userLocal,
    posts: [{}],
    post : {

    },
    comments: {},
    postIdComments: ''
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
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      state.user = user;
      console.log(state.user)
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
    GetPostsRequest(context){
      instance.get('/')
      .then(posts => {
        context.state.posts = posts.data;
      })
      .catch(error => console.log(error));
    },
    GetPostRequest(context, id){
      instance.get('/' + id)
      .then(post => {
        context.state.post = post.data
      })
      .catch(error => console.log(error))
    },
    PutPostRequest(context, datas){
      instancePut.defaults.headers.common['Authorization'] = 'Bearer ' + userLocal.token;
      instancePut.put('/' + datas.data.id, datas.data)
      .then(data => {
        console.log(data);
        router.push('/')
      })
      .catch(error => console.log(error))
    },
    DeleteRequest(context, id){
      instance.delete('/' + id.id)
      .then(() => router.push('/'))
      .catch(error => console.log(error))
    },
    PostPostRequest(context, datas){
      instance.post('/', datas.data , { headers: {"Content-Type": "multipart/form-data"}})
      .then(res => {
        console.log("Post Crée avec succès")
        console.log(res)
        router.push('/')
      })
      .catch(error => console.log(error))
    },
    UpdateUserRequest(){

    },
    DeleteUserRequest(context, id){
      instance.delete('/user/' + id)
      .then(() => {
        console.log('Utilisateur supprimé avec succès');
        localStorage.removeItem('user');
        context.state.user = userInit;
        router.push('/login')
      })
      .catch(error => console.log(error));
    },
    CreateCommentRequest(context, data){
      instance.post('/'+ data.PostId + '/comment', {
        PostId: data.PostId,
        text: data.text
      })
      .then(comment => {
        console.log('Commentaire créé avec succès !');
        console.log(comment);
        router.push('/login');
      })
      .catch(error => console.log(error))
    },
    GetCommentsRequest(context, id){
      instance.get('/'+ id + '/comments')
      .then(comments => {
        context.state.comments = comments;
        console.log(context.state.comments.data)
      })
      .catch(error => console.log(error ,'Insuccès de lappel des commentaires'));
    }
  },
 
  modules: {
  }
})
