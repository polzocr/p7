<template>
   <div class="login">
      <form action="" @submit.prevent="LoginRequest">
         <div class="">
            <div class="">
                <label for="email" id="email">Email</label>
                <input v-model.trim="email" type="email" name="email">
            </div>
            <div class="">
                <label for="password">Password</label>
                <input v-model.trim="password" type="password" name="password">
                <p v-if="haveError()"> {{ $store.state.error }} </p>
            </div>
            <div class="">
               <button @blur="cleanStore()" type="submit" :disabled="isDisabled()">
                  <span v-if="$store.state.status == 'loading'">Connexion en cours...</span>
                  <span v-else>Se connecter</span>
               </button>
            </div>
        </div>
      </form>
   </div>
</template>

<script>
// @ is an alias to /src
//import LoginComp from '@/components/LoginComp.vue'

export default {
  name: 'LoginView',
  data: function(){
     return {
        email: '',
        password: '',
     }
  },
  mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && this.$store.state.user.userId == user.userId){
            console.log(user)
            this.$router.push('/');
            return ;
        }
    },
  computed: {

    
  },
  methods: {
      haveError(){
         if(this.$store.state.error){
            return true
         }else {
            return false
         }
      },
      cleanStore(){
         this.$store.commit('clearError');
      },
      isDisabled(){
         if(this.email == "" || this.password == ""){
               return true;
         }else {
               return false;
         }
      },
      
      LoginRequest(){
         this.$store.dispatch('LoginRequest', {
            email: this.email,
            password: this.password
         })
      }
  },

}
</script>

<style lang="scss">

#email{
   color:$primary-color;
}

</style>
