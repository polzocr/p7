<template>
   <div class="composant">
      <form action="" @submit.prevent="LoginRequest" class="composant__form">
         <div class="form">
            <div class="form__input">
                <input v-model.trim="email" type="email" name="email" placeholder="E-mail">
            </div>
            <div class="form__input">
                <input v-model.trim="password" type="password" name="password" placeholder="Mot de passe">
                <p v-if="haveError()"> {{ $store.state.error }} </p>
            </div>
            <div class="">
               <button @blur="cleanStore()" type="submit" :disabled="isDisabled()" class=" btn form__button">
                  <span v-if="$store.state.status == 'loading'">Connexion en cours...</span>
                  <span v-else>Se connecter</span>
               </button>
            </div>
        </div>
      </form>
      <div class="logo">
          <img src="../../public/images/black-logo.png" alt="logo-groupomania"/>
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




.composant{
   height: 85%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   &__form{
     height: 100%;
     display: flex;
     align-items: center;
     justify-content: center;
   }
}
.logo{
   height:30%;
   width: 100%;
   img{
      object-fit: cover;
      width: 80%;
      max-width: 80%;
      max-height: 100%;
   }
}
.form{
   height: 80%;
   width: 60%;
   margin: 10% auto auto auto;
   display: flex;
   flex-direction: column;
   gap: 40px;
   &__input{
      label{
         font-size: 26px;
      }
      input{
         width: 85%;
         height: 40px;
         font-size:20px;
         border-radius:20px;
         padding-left:15px;
         color: $primary-color;
         &:focus{
            color:black;
            outline: 2px solid $primary-color;
            border: none;
         }
      }
   }
   &__button{
      margin: 5% auto 0 auto;
      &.btn-signup{
      }
   }
   &.signup{
      gap:30px;
      margin-top: 4%;
   }
}
.navigation{
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   &.left{
      border-right: 2px solid black;
   }
   i{
      margin-right:15px;
      color: $primary-color;
   };
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

.login{
   display: flex;
   align-items: center;
   height: 1000px;
   &__element{
      background-color: $secondary-color;
      border: 2px solid black;
      border-radius: 2%;
      width: 60%;
      margin: auto;
      padding: 0 0 2% 0;
      height: 70%;

      display:flex;
      flex-direction: column;
      justify-content: center;

      &__nav{
         height: 15%;
         display: flex;
         justify-content: space-evenly;
         align-items: center;

         border-bottom: 2px solid black
      }
      
   }
};
</style>
