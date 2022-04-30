<template>
    <div class="login">
        <div class="">
            <div class="">
                <label for="email">Email</label>
                <input v-model="email" type="email">
            </div>
            <div class="">
                <label for="password">Password</label>
                <input v-model="password" type="password">
            </div>
            <div class="">
                <button @click="LoginRequest" >Se connecter</button>
            </div>
        </div>
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
  methods: {
     LoginRequest(){
        this.$store.dispatch('LoginRequest', {
           email: this.email,
           password: this.password
        })
     }
  },

}
</script>
