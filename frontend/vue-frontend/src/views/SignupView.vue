<template>
   <div class="signup">
        <div class="form">
            <div class="">
                <label for="lastName">Nom</label>
                <input v-model="lastName" type="text" name="lastName">
            </div>
            <div class="">
                <label for="firstName">Prénom</label>
                <input v-model="firstName" type="text" name="firstName">
            </div>
            <div class="">
                <label for="email">Email</label>
                <input v-model="email" type="email" name="email">
            </div>
            <div class="">
                <label for="password">Mot de passe</label>
                <input v-model="password" type="password" name="password">   
            </div>
            <div class="">
                <button @click="SignupRequest">S'enregistrer</button>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'SignupView',
  data: function(){ 
          return {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
          }
        },
  methods:{
      SignupRequest(){
          this.$store.dispatch('postRequest', {
              lastName: this.lastName,
              firstName: this.firstName,
              email: this.email,
              password: this.password
          })
      }
  }
}
</script>
