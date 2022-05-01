<template>
   <div class="login">
      <form action="" @submit.prevent="LoginRequest">
         <div class="">
            <div class="">
                <label for="email">Email</label>
                <input v-model.trim="email" type="email" name="email">
            </div>
            <div class="">
                <label for="password">Password</label>
                <input v-model.trim="password" type="password" name="password">
                <p v-if="haveError()"> {{ $store.state.error }} </p>
            </div>
            <div class="">
                <button @blur="cleanStore()" type="submit" :disabled="isDisabled()">Se connecter</button>
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
