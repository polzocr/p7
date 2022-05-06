<template>
  <div id="app"> 
    <div v-if="!connected()">
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Signup</router-link>
    </div>
    <div v-else>
      <router-link to="">Profil</router-link> |
      <router-link to="/">Accueil</router-link> |
      <router-link @click.native="deconnexion()" to="">Deconnexion</router-link> |
      <router-link to="/createpost">Create</router-link>
    </div> 
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
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
  color: #2c3e50;
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
