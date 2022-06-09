import router from '@/router';
import Vue from 'vue'
import Vuex from 'vuex'
import Toasted from 'vue-toasted'
const axios = require('axios').default;

//package des toster
Vue.use(Toasted, {
    iconPack : 'fontawesome' 
});


Vue.use(Vuex)


//initialisation instance axios générale
const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

//initialisation instance axios requête necessitant un type particulier
 const instancePut = axios.create({
   baseURL: 'http://localhost:3000/',
   headers: { "Content-Type": "multipart/form-data" }
});


//////////////////////////////////////////////////////////////////
//au refresh de la page, on vérifie que l'utilisateur est connecté
//////////////////////////////////////////////////////////////////

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
  instancePut.defaults.headers.common['Authorization'] = 'Bearer ' + userLocal.token;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default new Vuex.Store({
  state: {
    error: '',
    status: '',
    user: userLocal,
    users: [{}],
    posts: [{}],
    comments: {},
    postIdComments: '',
    postUserId: '',
    postFirstName: '',
    postLastName: '',
    connected: false
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
    //connexion
    userLogin(state, user){
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      instancePut.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user))
    },
    //toasters
    toasting(state, msg){
      this._vm.$toasted.show(msg, {
        icon : {
            name : 'check',
        },
        position : 'top-left',
        duration: 2500,
        keepOnHover: true,
        containerClass: 'toast-container',
        className: 'toast',
        theme:'bubble'
      });
    },
    error_toasting(state, msg){
      this._vm.$toasted.show(msg, {
        icon : {
            name : 'exclamation-triangle',
        },
        position : 'top-left',
        duration: 2500,
        keepOnHover: true,
        containerClass: 'toast-container',
        className: 'toast error',
        type: "error",
        theme:'bubble'
      });
    }
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
    .then(() => {
      context.dispatch('LoginRequest', user);
      context.commit('changeStatus', 'created');
    })
    .catch(() => {
      context.commit('changeStatus', 'error_signup');
      context.commit('error_toasting','Inscription raté')
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
        context.commit('changeStatus', 'logged');
        context.commit('userLogin', res.data);
        context.commit('toasting','Connexion réussie')
        router.push('/');

      })
      .catch(error => {
        this.state.error = error.response.data.error;
        context.commit('changeStatus', 'error_login');
        context.commit('error_toasting', error.response.data.error)
      })
    },
    deconnexion(context, user){
      context.commit('userLogin', user);
      context.commit('changeStatus', '');
      localStorage.removeItem('user');
      context.state.user = userInit;
      context.commit('toasting','Deconnecté')
    },
    GetAllUsersRequest(context){
      instance.get('/users')
      .then(users => {
        context.state.users = users.data
      })
      .catch(error => console.log(error))
    },
    GetPostsRequest(context){
      instance.get('/')
      .then(posts => {
        context.state.posts = posts.data;
      })
      .catch(error => console.log(error));
    },
    PutPostRequest(context, datas){   
      instancePut.put('/' + datas.data.id, datas.data)
      .then(() => router.push('/createPost').then(() => {
        router.push('/')
        context.commit('toasting','Modification réussie !')
      }))
      .catch(() => {
        context.commit('error_toasting','La modification a échoué')
      })
    },
    DeleteRequest(context, id){
      instance.delete('/' + id.id)
      .then(() => router.push('/createPost').then(() => {
        router.push('/');
        context.commit('toasting','Article supprimé !')
      }))
      .catch(() => {
        context.commit('error_toasting','Une erreur est survenue')
      })
    },
    PostPostRequest(context, datas){
      instance.post('/', datas.data , { headers: {"Content-Type": "multipart/form-data"}})
      .then(() => {
        router.push('/');
        context.commit('toasting','Article créé avec succès')
      })
      .catch(() => context.commit('error_toasting','Une erreur est survenue'))
    },
    DeleteUserRequest(context, id){
      instance.delete('/user/' + id)
      .then(() => {
        if(context.state.user.userId == 1){
          router.push('/')
          .then(() => {
            router.push('/users')
            context.commit('toasting','Utilisateur supprimé !')
          })
          .catch(() => context.commit('error_toasting','Erreur lors de la suppression'))          
        } else {
          localStorage.removeItem('user');
          context.state.user = userInit;
          router.push('/login');
          context.commit('toasting','A très vite !')
        }
      })
      .catch(() => context.commit('error_toasting','Erreur lors de la suppression'));
    },
    CreateCommentRequest(context, data){
      instance.post('/'+ data.PostId + '/comment', {
        PostId: data.PostId,
        text: data.text
      })
      .then(() => router.push('/createPost').then(() => {
        router.push('/');
        context.commit('toasting','Commentaire créé avec succès')
      }))
      .catch(() => {context.commit('error_toasting','Une erreur est survenue')})
    },
    LikePostRequest(context, data){
      instance.post('/' + data.id + '/like' , {
        like: data.like
      })
      .then(() => {
        router.push('/createpost').then(() => {
          router.push('/')
        })
      })
      .catch(error => console.log(error))
    }
  },
 
  modules: {
  }
})

