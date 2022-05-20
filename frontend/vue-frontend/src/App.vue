<template>
  <div id="app">
    <div v-if="!connected()" class="login">
      <div class="login__element">
        <div class="login__element__nav">
          <div class="navigation left" :class="{'active':loginPage()}">
            <router-link to="/login" id="login--signup"  ><i class="fa fa-user-circle"></i>Se connecter</router-link> 
          </div>
          <div class="navigation" :class="{'active':signupPage()}" >
            <router-link to="/signup" id="login--signup"><i class="fa fa-list-alt" aria-hidden="true"></i>S'inscrire</router-link>
          </div>
        </div>
        <router-view/>
      </div>
    </div>
    <div v-else>
      <router-link :to="'/profile/' + this.$store.state.user.userId">Profil</router-link> |
      <router-link to="/">Accueil</router-link> |
      <router-link @click.native="deconnexion()" to="">Deconnexion</router-link> |
      <router-link to="/createpost">Create</router-link>
      <router-view/>
    </div> 
    
    
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function(){
    return {
    }
  },
  methods: {
    loginPage(){
      if(this.$route.path == '/login'){
        return true
      } else {
        return false
      }  
    },
    signupPage(){
      if(this.$route.path == '/signup'){
        return true
      } else {
        return false
      }  
    },
    connected(){
      const user = JSON.parse(localStorage.getItem('user'));
      if(user && this.$store.state.user.userId == user.userId ){
        return true;
      } else {
        return false;
      }
    },
    deconnexion(){
            this.$store.dispatch('deconnexion', {
                userId: -1,
                token: ''
            });
            this.$router.push('/login')
        },
  },
}
</script>


<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  box-sizing: border-box; 
}

body{
  background: url('../public/images/bc1.png') no-repeat;
  background-size: 100% 100%;
  object-fit: cover;
  margin: 0;

}

.login{
   display: flex;
   align-items: center;
   height: 1704px;
   
   @include mobiles{
     height: 852px;
   }
   @include tablets{
     height: 852px;
   }
   @include small-desktop{
     height: 946px;
   }
   @include normal-desktop{
     height: 946px;
   }
   &__element{
      width: 60%;
      margin: auto;
      height: 70%;
      @include tablets{
        height: 75%;
        width: 70%;
      }
      @include mobiles{
      height: 100%;
      width: 100%;
      }
      

      display:flex;
      flex-direction: column;
      justify-content: center;

      &__nav{
         height: 15%;
         display: flex;
         justify-content: space-evenly;
         align-items: center;
        @include tablets{
          height: 12%;
        }
        @include mobiles{
          height: 10%;
        }
      }
      
   }
}

#login--signup{
   font-size: 30px;
   color: black;
   text-decoration: none;
   &:hover{
      font-size: 36px;
      transition: all 450ms ease ;
      cursor: pointer;
   }
}

.navigation{
   width: 100%;
   height: 101%;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #CAD2E7;
   border-top-left-radius: 20px;
    border-top-right-radius: 20px;
   &.left{
   }
   i{
      margin-right:15px;
      color: $primary-color;
   };
}
.active{
  background-color: $secondary-color;
}



.btn{
  background-color: $primary-color;
  border: 2px solid $primary-color;
  border-radius: 30px;
  box-shadow: 0 0 40px 40px $primary-color inset, 0 0 0 0 primary-color;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  color: black;

  cursor: pointer;
  text-decoration: none;

  display: flex;
  align-self: center;
  text-align: center;
  text-transform: uppercase;

  
  
  padding: 19px 45px;
  
  transition: all 150ms ease-in-out;
  &:hover {
    box-shadow: 0 0 10px 0 $primary-color inset, 0 0 10px 4px $primary-color;
    background-color: transparent;
  }
}

.focus{
  background-color: $primary-color;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
